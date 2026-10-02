import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const VISITOR_KEY = "am:visitor-id";
const voteKey = (slug) => `am:vote:${slug}`;
const viewedKey = (slug) => `am:viewed:${slug}`;

const EMPTY = { up: 0, down: 0, views: 0 };

function safeStorage(kind) {
  try {
    const storage = window[kind];
    const probe = "__am_probe__";
    storage.setItem(probe, probe);
    storage.removeItem(probe);
    return storage;
  } catch {
    return null;
  }
}

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

let memoryVisitorId;

export function getVisitorId() {
  const storage = safeStorage("localStorage");
  if (!storage) return (memoryVisitorId ??= generateId());
  let id = storage.getItem(VISITOR_KEY);
  if (!id || !/^[A-Za-z0-9_-]{16,64}$/.test(id)) {
    id = generateId();
    storage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export class StatsError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = "GET", body } = {}) {
  const response = await fetch(`/api/${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new StatsError(response.status, data.error || "Request failed");
  return data;
}

/* ── Shared cache so the home page, blog index, and post page agree on numbers ── */

const store = {
  posts: {},
  status: "idle",
  listeners: new Set(),
  snapshot: { posts: {}, status: "idle" },
};

function emit() {
  store.snapshot = { posts: store.posts, status: store.status };
  store.listeners.forEach((listener) => listener());
}

function patchPost(slug, stats) {
  const { up, down, views } = { ...EMPTY, ...store.posts[slug], ...stats };
  store.posts = { ...store.posts, [slug]: { up, down, views } };
  emit();
}

let inflight = null;
let lastLoaded = 0;

function loadAllStats({ force = false } = {}) {
  if (inflight) return inflight;
  if (!force && Date.now() - lastLoaded < 30_000 && store.status === "ready") return Promise.resolve();

  if (store.status !== "ready") {
    store.status = "loading";
    emit();
  }
  inflight = request("stats")
    .then(({ posts }) => {
      store.posts = { ...store.posts, ...posts };
      store.status = "ready";
      lastLoaded = Date.now();
    })
    .catch(() => {
      if (store.status !== "ready") store.status = "unavailable";
    })
    .finally(() => {
      inflight = null;
      emit();
    });
  return inflight;
}

const subscribe = (listener) => {
  store.listeners.add(listener);
  return () => store.listeners.delete(listener);
};
const getSnapshot = () => store.snapshot;

/** Live counts for every post: { posts: { [slug]: { up, down, views } }, status } */
export function useAllPostStats() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  useEffect(() => {
    loadAllStats();
  }, []);
  return snapshot;
}

export function usePostStatsFromCache(slug) {
  const { posts, status } = useAllPostStats();
  return { stats: posts[slug] ?? null, status };
}

/**
 * Live counts for a single post plus this visitor's vote.
 * Records a unique read on mount and applies votes optimistically.
 */
export function usePostStats(slug) {
  const { posts } = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [vote, setVoteState] = useState(() => safeStorage("localStorage")?.getItem(voteKey(slug)) || null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const pending = useRef(false);

  const persistVote = useCallback(
    (value) => {
      const storage = safeStorage("localStorage");
      if (!storage) return;
      if (value) storage.setItem(voteKey(slug), value);
      else storage.removeItem(voteKey(slug));
    },
    [slug]
  );

  useEffect(() => {
    let cancelled = false;
    const visitorId = getVisitorId();
    const session = safeStorage("sessionStorage");
    const alreadyViewed = session?.getItem(viewedKey(slug));

    setStatus("loading");
    setError(null);
    setVoteState(safeStorage("localStorage")?.getItem(voteKey(slug)) || null);

    const load = alreadyViewed
      ? request(`vote?slug=${encodeURIComponent(slug)}&visitorId=${encodeURIComponent(visitorId)}`)
      : request("view", { method: "POST", body: { slug, visitorId } }).then((data) => {
          session?.setItem(viewedKey(slug), "1");
          return data;
        });

    load
      .then((data) => {
        if (cancelled) return;
        patchPost(slug, data);
        setVoteState(data.vote);
        persistVote(data.vote);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });

    return () => {
      cancelled = true;
    };
  }, [slug, persistVote]);

  const castVote = useCallback(
    async (type) => {
      if (pending.current) return;
      const previousVote = vote;
      const previousStats = { ...EMPTY, ...store.posts[slug] };
      const nextVote = previousVote === type ? null : type;

      const optimistic = { ...previousStats };
      if (previousVote) optimistic[previousVote] = Math.max(0, optimistic[previousVote] - 1);
      if (nextVote) optimistic[nextVote] += 1;

      pending.current = true;
      setError(null);
      setVoteState(nextVote);
      patchPost(slug, optimistic);

      try {
        const data = await request("vote", {
          method: "POST",
          body: { slug, visitorId: getVisitorId(), vote: nextVote },
        });
        patchPost(slug, data);
        setVoteState(data.vote);
        persistVote(data.vote);
        setStatus("ready");
      } catch (err) {
        patchPost(slug, previousStats);
        setVoteState(previousVote);
        setError(
          err.status === 429
            ? "Easy there. Too many votes in a short time, try again in a few minutes."
            : "Couldn't save your vote right now. Please try again."
        );
      } finally {
        pending.current = false;
      }
    },
    [slug, vote, persistVote]
  );

  return {
    stats: posts[slug] ?? null,
    vote,
    status,
    error,
    castVote,
  };
}

export function formatCount(value) {
  if (value == null) return "–";
  if (value < 1000) return String(value);
  if (value < 10_000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  if (value < 1_000_000) return `${Math.round(value / 1000)}k`;
  return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
}
