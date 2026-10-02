const metas = import.meta.glob("../content/blog/*/index.md", { query: "?meta", import: "default", eager: true });
const bodies = import.meta.glob("../content/blog/*/index.md", { query: "?body", import: "default" });
const assets = import.meta.glob("../content/blog/*/*.{webp,avif,jpg,jpeg,png,gif}", {
  query: "?url",
  import: "default",
  eager: true,
});

const folderOf = (file) => file.slice(0, file.lastIndexOf("/"));

/** Resolves `./photo.webp` against the post's folder; absolute and remote URLs pass through. */
const resolveAsset = (folder, src) => {
  if (!src) return null;
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return src;
  return assets[`${folder}/${src.replace(/^\.\//, "")}`] ?? null;
};

export const POSTS = Object.entries(metas)
  .filter(([, meta]) => import.meta.env.DEV || !meta.draft)
  .map(([file, meta]) => {
    const folder = folderOf(file);
    return {
      ...meta,
      tags: meta.tags ?? [],
      summary: meta.summary ?? [],
      coverImage: resolveAsset(folder, meta.cover),
      loadBody: () => bodies[file]().then((body) => parseContent(body, folder)),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const LATEST_SLUG = POSTS[0]?.slug;

export const getPost = (slug) => POSTS.find((post) => post.slug === slug);

export const getAdjacentPosts = (slug) => {
  const index = POSTS.findIndex((post) => post.slug === slug);
  return {
    newer: index > 0 ? POSTS[index - 1] : null,
    older: index >= 0 && index < POSTS.length - 1 ? POSTS[index + 1] : null,
  };
};

/** Posts sharing the most tags with `post`, newest first, topped up with the latest posts. */
export const getRelatedPosts = (post, limit = 3) => {
  const others = POSTS.filter((candidate) => candidate.slug !== post.slug);
  const scored = others
    .map((candidate) => ({ candidate, score: candidate.tags.filter((tag) => post.tags.includes(tag)).length }))
    .sort((a, b) => b.score - a.score || b.candidate.date.localeCompare(a.candidate.date))
    .map(({ candidate }) => candidate);
  return scored.slice(0, limit);
};

export const ALL_TAGS = Array.from(new Set(POSTS.flatMap((post) => post.tags)));

export const searchPosts = (posts, query) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return posts;
  return posts.filter((post) => {
    const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
};

export function formatDate(dateString, { month = "short" } = {}) {
  const [year, monthIndex, day] = dateString.split("-").map(Number);
  return new Date(year, monthIndex - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month,
    year: "numeric",
  });
}

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\*\*/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const DIALOGUE_LINE = /^[A-Z][A-Za-z ]{1,24}:\s/;
const IMAGE = /^!\[([^\]]*)\]\(\s*(\S+?)(?:\s+"([^"]*)")?\s*\)$/;

/**
 * Parses the lightweight markdown used in posts into typed blocks:
 * ## / ### headings, "- " lists, "1." ordered lists, speaker transcripts, one-line "quotes",
 * images as `![alt](./file.webp "Caption | Photo credit")`, and paragraphs.
 */
export function parseContent(content, folder = "") {
  const blocks = [];
  const chunks = content
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((line) => line.trim());
    const image = lines.length === 1 && chunk.match(IMAGE);

    if (image) {
      const [caption, credit] = (image[3] ?? "").split("|").map((part) => part.trim());
      blocks.push({ type: "figure", alt: image[1], src: resolveAsset(folder, image[2]), caption, credit });
    } else if (chunk.startsWith("### ")) {
      const text = chunk.slice(4).trim();
      blocks.push({ type: "h3", text, id: slugify(text) });
    } else if (chunk.startsWith("## ")) {
      const text = chunk.slice(3).trim();
      blocks.push({ type: "h2", text, id: slugify(text) });
    } else if (lines.every((line) => line.startsWith("- "))) {
      blocks.push({ type: "ul", items: lines.map((line) => line.slice(2)) });
    } else if (/^\d+\.\s/.test(chunk)) {
      const item = chunk.replace(/^\d+\.\s/, "");
      const previous = blocks[blocks.length - 1];
      if (previous?.type === "ol") previous.items.push(item);
      else blocks.push({ type: "ol", items: [item] });
    } else if (lines.length > 1 && lines.every((line) => DIALOGUE_LINE.test(line))) {
      blocks.push({
        type: "dialogue",
        lines: lines.map((line) => {
          const [speaker, ...rest] = line.split(":");
          return { speaker: speaker.trim(), text: rest.join(":").trim() };
        }),
      });
    } else if (/^".+"$/.test(chunk) && lines.length === 1 && chunk.length < 160) {
      blocks.push({ type: "quote", text: chunk.slice(1, -1) });
    } else {
      blocks.push({ type: "p", lines });
    }
  }

  return blocks;
}
