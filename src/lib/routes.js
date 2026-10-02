import { WORK } from "../constants";

/** Name shown on the page-transition curtain for a pathname. */
export const routeLabel = (pathname) => {
  const [, section, slug] = pathname.split("/");
  if (!section) return "About";
  if (section === "work") return (slug && WORK.find((item) => item.slug === slug)?.title) || "Work";
  if (section === "blog") return "Blog";
  if (section === "case-studies") return "Case Studies";
  return "Lost";
};

/** Accent theme for a pathname; matches the [data-accent] blocks in index.css. */
export const accentFor = (pathname) => {
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/case-studies")) return "cases";
  return "";
};
