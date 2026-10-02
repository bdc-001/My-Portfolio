import { assertSlug, assertVisitorId, assertVote, requireStore } from "../server/blogStore.js";
import { HttpError, clientFingerprint, getQuery, handle, methodNotAllowed, readJson, sendJson } from "../server/http.js";

const VOTE_LIMIT = 30;
const VOTE_WINDOW_SECONDS = 10 * 60;

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handle(res, async () => {
      const { slug, visitorId } = getQuery(req);
      assertSlug(slug);
      if (visitorId) assertVisitorId(visitorId);
      const stats = await requireStore().getPost(slug, visitorId);
      sendJson(res, 200, { slug, ...stats }, { "Cache-Control": "no-store" });
    });
  }

  if (req.method === "POST") {
    return handle(res, async () => {
      const body = await readJson(req);
      const slug = assertSlug(body.slug);
      const visitorId = assertVisitorId(body.visitorId);
      const vote = assertVote(body.vote ?? null);

      const store = requireStore();
      const allowed = await store.allow(`vote:${clientFingerprint(req)}`, VOTE_LIMIT, VOTE_WINDOW_SECONDS);
      if (!allowed) throw new HttpError(429, "Too many votes, try again in a few minutes");

      const stats = await store.setVote(slug, visitorId, vote);
      sendJson(res, 200, { slug, ...stats }, { "Cache-Control": "no-store" });
    });
  }

  return methodNotAllowed(res, ["GET", "POST"]);
}
