import { requireStore } from "../server/blogStore.js";
import { handle, methodNotAllowed, sendJson } from "../server/http.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  await handle(res, async () => {
    const posts = await requireStore().getAll();
    sendJson(res, 200, { posts }, { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60" });
  });
}
