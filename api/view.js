import { assertSlug, assertVisitorId, requireStore } from "../server/blogStore.js";
import { HttpError, clientFingerprint, handle, methodNotAllowed, readJson, sendJson } from "../server/http.js";

const VIEW_LIMIT = 120;
const VIEW_WINDOW_SECONDS = 10 * 60;

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  await handle(res, async () => {
    const body = await readJson(req);
    const slug = assertSlug(body.slug);
    const visitorId = assertVisitorId(body.visitorId);

    const store = requireStore();
    const allowed = await store.allow(`view:${clientFingerprint(req)}`, VIEW_LIMIT, VIEW_WINDOW_SECONDS);
    if (!allowed) throw new HttpError(429, "Too many requests");

    const stats = await store.recordView(slug, visitorId);
    sendJson(res, 200, { slug, ...stats }, { "Cache-Control": "no-store" });
  });
}
