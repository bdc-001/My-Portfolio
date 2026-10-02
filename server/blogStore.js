import fs from "node:fs";
import path from "node:path";
import { BLOG_SLUGS as SLUGS } from "./blogSlugs.js";
import { HttpError } from "./http.js";

const SLUG_SET = new Set(SLUGS);
const VISITOR_ID = /^[A-Za-z0-9_-]{16,64}$/;
const VOTES = new Set(["up", "down"]);

export function assertSlug(slug) {
  if (typeof slug !== "string" || !SLUG_SET.has(slug)) {
    throw new HttpError(404, "Unknown post");
  }
  return slug;
}

export function assertVisitorId(visitorId) {
  if (typeof visitorId !== "string" || !VISITOR_ID.test(visitorId)) {
    throw new HttpError(400, "Invalid visitor id");
  }
  return visitorId;
}

export function assertVote(vote) {
  if (vote === null || VOTES.has(vote)) return vote;
  throw new HttpError(400, "Vote must be 'up', 'down' or null");
}

const toCount = (value) => Math.max(0, Number(value) || 0);

/* ───────────────────────── Redis (Upstash REST) ───────────────────────── */

const KEY_PREFIX = "blog";
const keys = (slug) => ({
  counts: `${KEY_PREFIX}:${slug}:counts`,
  voters: `${KEY_PREFIX}:${slug}:voters`,
  readers: `${KEY_PREFIX}:${slug}:readers`,
});

// Runs atomically inside Redis so concurrent clicks can never double count.
// KEYS[1] voters hash (visitor -> up|down), KEYS[2] counts hash (up, down)
// ARGV[1] visitor id, ARGV[2] next vote: up | down | none
const VOTE_SCRIPT = `
local prev = redis.call('HGET', KEYS[1], ARGV[1])
local nextVote = ARGV[2]
if prev ~= nextVote then
  if prev then
    redis.call('HINCRBY', KEYS[2], prev, -1)
  end
  if nextVote == 'none' then
    redis.call('HDEL', KEYS[1], ARGV[1])
  else
    redis.call('HSET', KEYS[1], ARGV[1], nextVote)
    redis.call('HINCRBY', KEYS[2], nextVote, 1)
  end
end
return { tonumber(redis.call('HGET', KEYS[2], 'up') or 0), tonumber(redis.call('HGET', KEYS[2], 'down') or 0) }
`;

function createRedisStore(url, token) {
  const base = url.replace(/\/+$/, "");

  async function post(pathname, body) {
    const response = await fetch(`${base}${pathname}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Redis request failed with ${response.status}: ${await response.text()}`);
    }
    return response.json();
  }

  async function pipeline(commands) {
    const results = await post("/pipeline", commands);
    return results.map((entry) => {
      if (entry.error) throw new Error(`Redis error: ${entry.error}`);
      return entry.result;
    });
  }

  return {
    kind: "redis",

    async getAll() {
      const commands = SLUGS.flatMap((slug) => {
        const k = keys(slug);
        return [
          ["HMGET", k.counts, "up", "down"],
          ["PFCOUNT", k.readers],
        ];
      });
      const results = await pipeline(commands);
      return Object.fromEntries(
        SLUGS.map((slug, i) => {
          const [up, down] = results[i * 2] ?? [];
          return [slug, { up: toCount(up), down: toCount(down), views: toCount(results[i * 2 + 1]) }];
        })
      );
    },

    async getPost(slug, visitorId) {
      const k = keys(slug);
      const [[up, down], views, vote] = await pipeline([
        ["HMGET", k.counts, "up", "down"],
        ["PFCOUNT", k.readers],
        visitorId ? ["HGET", k.voters, visitorId] : ["ECHO", ""],
      ]);
      return { up: toCount(up), down: toCount(down), views: toCount(views), vote: vote || null };
    },

    async setVote(slug, visitorId, vote) {
      const k = keys(slug);
      const [[up, down], , views] = await pipeline([
        ["EVAL", VOTE_SCRIPT, "2", k.voters, k.counts, visitorId, vote ?? "none"],
        ["PFADD", k.readers, visitorId],
        ["PFCOUNT", k.readers],
      ]);
      return { up: toCount(up), down: toCount(down), views: toCount(views), vote };
    },

    async recordView(slug, visitorId) {
      const k = keys(slug);
      const [, views, [up, down], vote] = await pipeline([
        ["PFADD", k.readers, visitorId],
        ["PFCOUNT", k.readers],
        ["HMGET", k.counts, "up", "down"],
        ["HGET", k.voters, visitorId],
      ]);
      return { up: toCount(up), down: toCount(down), views: toCount(views), vote: vote || null };
    },

    async allow(bucket, limit, windowSeconds) {
      const key = `ratelimit:${bucket}`;
      const [, count] = await pipeline([
        ["SET", key, "0", "EX", String(windowSeconds), "NX"],
        ["INCR", key],
      ]);
      return Number(count) <= limit;
    },
  };
}

/* ───────────────────────── Local JSON file (dev only) ───────────────────────── */

function createFileStore(filePath) {
  const read = () => {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {
      return {};
    }
  };
  const write = (data) => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  };
  const entry = (data, slug) => {
    data[slug] ??= { up: 0, down: 0, voters: {}, readers: [] };
    return data[slug];
  };
  const snapshot = (post, visitorId) => ({
    up: toCount(post.up),
    down: toCount(post.down),
    views: post.readers.length,
    vote: (visitorId && post.voters[visitorId]) || null,
  });

  return {
    kind: "file",

    async getAll() {
      const data = read();
      return Object.fromEntries(
        SLUGS.map((slug) => {
          const { up, down, views } = snapshot(entry(data, slug));
          return [slug, { up, down, views }];
        })
      );
    },

    async getPost(slug, visitorId) {
      return snapshot(entry(read(), slug), visitorId);
    },

    async setVote(slug, visitorId, vote) {
      const data = read();
      const post = entry(data, slug);
      const prev = post.voters[visitorId] || null;
      if (prev !== vote) {
        if (prev) post[prev] -= 1;
        if (vote) {
          post.voters[visitorId] = vote;
          post[vote] += 1;
        } else {
          delete post.voters[visitorId];
        }
      }
      if (!post.readers.includes(visitorId)) post.readers.push(visitorId);
      write(data);
      return snapshot(post, visitorId);
    },

    async recordView(slug, visitorId) {
      const data = read();
      const post = entry(data, slug);
      if (!post.readers.includes(visitorId)) {
        post.readers.push(visitorId);
        write(data);
      }
      return snapshot(post, visitorId);
    },

    async allow() {
      return true;
    },
  };
}

let cachedStore;

export function getStore() {
  if (cachedStore !== undefined) return cachedStore;

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    cachedStore = createRedisStore(url, token);
  } else if (process.env.VERCEL) {
    // Serverless filesystems are ephemeral, so a deployment without Redis has nowhere durable to count votes.
    cachedStore = null;
  } else {
    cachedStore = createFileStore(path.join(process.cwd(), ".data", "blog-stats.json"));
  }
  return cachedStore;
}

export function requireStore() {
  const store = getStore();
  if (!store) {
    throw new HttpError(503, "Blog stats storage is not configured");
  }
  return store;
}
