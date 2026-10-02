import { createHash } from "node:crypto";

export function sendJson(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  res.end(JSON.stringify(body));
}

export function methodNotAllowed(res, allowed) {
  sendJson(res, 405, { error: "Method not allowed" }, { Allow: allowed.join(", ") });
}

export function getQuery(req) {
  return Object.fromEntries(new URL(req.url, "http://localhost").searchParams);
}

const MAX_BODY_BYTES = 4 * 1024;

export async function readJson(req) {
  // Vercel pre-parses JSON bodies (and throws on malformed ones); the local dev server hands us the raw stream.
  let parsed;
  try {
    parsed = req.body;
  } catch {
    throw new HttpError(400, "Invalid JSON body");
  }
  if (parsed !== undefined) {
    if (typeof parsed === "string") return JSON.parse(parsed || "{}");
    if (Buffer.isBuffer(parsed)) return JSON.parse(parsed.toString("utf8") || "{}");
    return parsed ?? {};
  }

  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new HttpError(413, "Request body too large");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function clientFingerprint(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    (typeof forwarded === "string" && forwarded.split(",")[0].trim()) ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "unknown";
  const salt = process.env.BLOG_STATS_SALT || "keephustling.in";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export async function handle(res, fn) {
  try {
    await fn();
  } catch (error) {
    if (error instanceof HttpError) {
      sendJson(res, error.status, { error: error.message });
      return;
    }
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { error: "Invalid JSON body" });
      return;
    }
    console.error("[blog-stats]", error);
    sendJson(res, 500, { error: "Something went wrong" });
  }
}
