import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { POSTS, ALL_TAGS, searchPosts } from "../lib/posts";
import { formatCount, useAllPostStats } from "../lib/blogStats";
import { EASE, ScrollTrigger } from "../lib/motion";
import BlogCard from "../components/BlogCard";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import CountUp from "../components/motion/CountUp";
import SplitReveal from "../components/motion/SplitReveal";

const PAGE_SIZE = 9;

const SORTS = [
  { id: "latest", label: "Latest" },
  { id: "views", label: "Most read" },
  { id: "up", label: "Most liked" },
];

const pill = { type: "spring", stiffness: 420, damping: 34 };

const Counter = ({ label, value, ready }) => (
  <div>
    <p className="display text-3xl leading-none md:text-4xl">
      {ready ? (
        <CountUp value={value} />
      ) : (
        <span className="inline-block h-8 w-14 animate-pulse rounded-lg bg-white/[0.06] align-middle" aria-hidden />
      )}
    </p>
    <p className="mt-2 text-sm text-neutral-500">{label}</p>
  </div>
);

const SortButton = ({ selected, onClick, disabled, children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={selected}
    onClick={onClick}
    disabled={disabled}
    className={`relative isolate whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
      selected ? "text-ink" : "text-neutral-400 hover:text-bone"
    }`}
  >
    {selected && <motion.span layoutId="blog-sort" className="absolute inset-0 -z-10 rounded-full bg-bone" transition={pill} />}
    {children}
  </button>
);

const TopicButton = ({ selected, onClick, children }) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onClick}
    className={`shrink-0 border-b py-2 text-sm transition-colors duration-300 ${
      selected ? "border-bone text-bone" : "border-transparent text-neutral-500 hover:text-neutral-200"
    }`}
  >
    {children}
  </button>
);

const featuredPost = () => POSTS.find((post) => post.featured) ?? POSTS[0];

const Blog = () => {
  const { posts: stats, status } = useAllPostStats();
  const [sort, setSort] = useState("latest");
  const [tag, setTag] = useState(null);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const statsReady = status === "ready";

  const totals = useMemo(
    () =>
      Object.values(stats).reduce(
        (acc, s) => ({ views: acc.views + s.views, votes: acc.votes + s.up + s.down }),
        { views: 0, votes: 0 }
      ),
    [stats]
  );

  const browsing = !query.trim() && !tag && sort === "latest";
  const feature = browsing ? featuredPost() : null;

  const results = useMemo(() => {
    const byTag = tag ? POSTS.filter((post) => post.tags.includes(tag)) : POSTS;
    const matched = searchPosts(byTag, query);
    const sorted =
      sort === "latest"
        ? matched
        : [...matched].sort(
            (a, b) => (stats[b.slug]?.[sort] ?? 0) - (stats[a.slug]?.[sort] ?? 0) || b.date.localeCompare(a.date)
          );
    return feature ? sorted.filter((post) => post.slug !== feature.slug) : sorted;
  }, [tag, query, sort, stats, feature]);

  useEffect(() => setLimit(PAGE_SIZE), [tag, query, sort]);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(id);
  }, [results.length, limit]);

  const shown = results.slice(0, limit);
  const remaining = results.length - shown.length;
  const useRows = shown.length > 0 && shown.length < 3 && browsing;

  return (
    <>
      <SEO
        title="Blog by Arsalaan Mohammed: Stories from the Journey"
        description="Personal reflections on product, AI, growth, and the unexpected paths that lead us where we are. From the hills of Darjeeling to IIT, and beyond."
      />

      <section className="relative isolate overflow-hidden">
        <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="container-site pt-36 md:pt-44">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SplitReveal
                as="h1"
                trigger="load"
                delay={0.1}
                className="display text-pretty text-[clamp(2.8rem,6.4vw,5.25rem)] leading-[1.0]"
              >
                Stories &amp; <span className="text-neutral-500">shared lessons.</span>
              </SplitReveal>
              <Reveal as="p" delay={0.3} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-neutral-400">
                Honest reflections on product, AI, and the long way round, mostly written so I don&apos;t forget them myself.
              </Reveal>
            </div>
            <Reveal delay={0.4} className="flex gap-10 lg:col-span-4 lg:justify-end">
              <Counter label="Stories" value={String(POSTS.length)} ready />
              <Counter label="Reads" value={formatCount(totals.views)} ready={statsReady} />
              <Counter label="Votes" value={formatCount(totals.votes)} ready={statsReady} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-site pb-20 pt-12 md:pb-28 md:pt-16">
        {feature && (
          <Reveal className="mb-14 md:mb-20">
            <BlogCard post={feature} variant="feature" eyebrow={feature.featured ? "Featured story" : "Latest story"} />
          </Reveal>
        )}

        <div className="mb-10 border-b border-white/[0.07]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="relative flex w-full items-center md:max-w-sm">
              <span className="sr-only">Search stories</span>
              <FiSearch className="pointer-events-none absolute left-4 h-4 w-4 text-neutral-500" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search stories, topics…"
                className="w-full rounded-full bg-white/[0.04] py-2.5 pl-11 pr-10 text-sm text-bone ring-1 ring-inset ring-white/10 transition-shadow placeholder:text-neutral-500 focus:outline-none focus:ring-white/30 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 rounded-full p-1 text-neutral-500 hover:text-bone"
                  aria-label="Clear search"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </label>

            <div className="inline-flex w-max rounded-full p-1 ring-1 ring-inset ring-white/10" role="tablist" aria-label="Sort stories">
              {SORTS.map((option) => (
                <SortButton
                  key={option.id}
                  selected={sort === option.id}
                  disabled={option.id !== "latest" && !statsReady}
                  onClick={() => setSort(option.id)}
                >
                  {option.label}
                </SortButton>
              ))}
            </div>
          </div>

          <div
            className="-mx-5 mt-5 flex gap-6 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            aria-label="Filter by topic"
          >
            {[null, ...ALL_TAGS].map((value) => (
              <TopicButton key={value ?? "all"} selected={tag === value} onClick={() => setTag(value)}>
                {value ?? "All topics"}
              </TopicButton>
            ))}
          </div>
        </div>

        {!browsing && (
          <p className="mb-6 text-sm text-neutral-500" aria-live="polite">
            {results.length} {results.length === 1 ? "story" : "stories"}
            {tag && <> in {tag}</>}
            {query.trim() && <> matching &ldquo;{query.trim()}&rdquo;</>}
          </p>
        )}

        {shown.length > 0 ? (
          <div className={useRows ? "grid gap-5" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="h-full"
                >
                  <BlogCard post={post} variant={useRows ? "row" : "tile"} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          !feature && (
            <div className="rounded-card py-20 text-center ring-1 ring-inset ring-white/[0.07]">
              <p className="text-neutral-400">No stories match that yet.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTag(null);
                  setSort("latest");
                }}
                className="link-underline mt-3 text-sm text-bone"
              >
                Clear filters
              </button>
            </div>
          )
        )}

        {remaining > 0 && (
          <div className="mt-12 flex justify-center">
            <button type="button" onClick={() => setLimit((n) => n + PAGE_SIZE)} className="btn-ghost">
              Load more stories <span className="text-neutral-500">({remaining})</span>
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Blog;
