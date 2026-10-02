import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useAllPostStats } from "../lib/blogStats";
import { formatDate } from "../lib/posts";
import GlowCard from "./motion/GlowCard";
import PostStats from "./PostStats";

const Cover = ({ post, className = "", eager = false }) => (
  <img
    src={post.coverImage}
    alt={post.coverAlt ?? ""}
    className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.04] ${className}`}
    loading={eager ? "eager" : "lazy"}
    fetchPriority={eager ? "high" : undefined}
    decoding="async"
  />
);

const Meta = ({ post, className = "" }) => (
  <span className={`whitespace-nowrap text-[13px] ${className}`}>
    {formatDate(post.date)} · {post.readTime}
  </span>
);

/** Magazine-style lead story: full-bleed photo with the headline set over it. */
const FeatureCard = ({ post, stats, status, eyebrow }) => (
  <Link
    to={`/blog/${post.slug}`}
    data-cursor="Read"
    className="group relative isolate block overflow-hidden rounded-card bg-ink-800 ring-1 ring-inset ring-white/[0.08]"
  >
    <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[21/10]">
      <Cover post={post} eager />
    </div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" aria-hidden />
    <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink/75 via-ink/10 to-transparent lg:block" aria-hidden />

    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:max-w-[44rem] lg:p-12">
      <p className="font-mono text-[11px] uppercase tracking-label text-neutral-300">
        {eyebrow}
        {post.tags[0] && <span className="text-neutral-500"> · {post.tags[0]}</span>}
      </p>
      <h2 className="display mt-4 text-balance text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.04] text-white">{post.title}</h2>
      <p className="mt-4 line-clamp-2 max-w-2xl text-pretty leading-relaxed text-neutral-300 md:text-lg">{post.excerpt}</p>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-neutral-400">
        <Meta post={post} />
        <PostStats stats={stats} status={status} className="text-neutral-400" />
        <span className="inline-flex items-center gap-2 text-sm font-medium text-white sm:ml-auto">
          Read story
          <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </Link>
);

/** Wide horizontal card, used when a list has too few posts to fill a grid. */
const RowCard = ({ post, stats, status }) => (
  <GlowCard as={Link} to={`/blog/${post.slug}`} data-cursor="Read" className="group grid gap-0 p-2 md:grid-cols-12">
    <div className="relative aspect-[3/2] overflow-hidden rounded-[16px] bg-ink-700 md:col-span-5 md:aspect-auto md:min-h-[300px]">
      <Cover post={post} />
    </div>
    <div className="flex flex-col p-5 md:col-span-7 md:p-9">
      <p className="label">{post.tags.slice(0, 2).join("  /  ")}</p>
      <h3 className="display mt-4 text-balance text-[1.8rem] leading-[1.08] md:text-[2.3rem]">{post.title}</h3>
      <p className="mt-4 line-clamp-3 text-pretty leading-relaxed text-neutral-400">{post.excerpt}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8 text-neutral-500">
        <Meta post={post} />
        <PostStats stats={stats} status={status} />
      </div>
    </div>
  </GlowCard>
);

const TileCard = ({ post, stats, status }) => (
  <GlowCard as={Link} to={`/blog/${post.slug}`} data-cursor="Read" className="group flex h-full flex-col p-2">
    <div className="relative aspect-[3/2] overflow-hidden rounded-[16px] bg-ink-700">
      <Cover post={post} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
      {post.tags[0] && (
        <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-label text-white/90">
          {post.tags[0]}
        </span>
      )}
    </div>
    <div className="flex flex-1 flex-col px-3 pb-3 pt-5 md:px-4">
      <h3 className="display text-balance text-[1.5rem] leading-[1.12] md:text-[1.65rem]">{post.title}</h3>
      <p className="mt-3 line-clamp-2 text-pretty text-[15px] leading-relaxed text-neutral-400">{post.excerpt}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 text-neutral-500">
        <Meta post={post} />
        <PostStats stats={stats} status={status} />
      </div>
    </div>
  </GlowCard>
);

const BlogCard = ({ post, variant = "tile", eyebrow = "Latest story" }) => {
  const { posts, status } = useAllPostStats();
  const props = { post, stats: posts[post.slug], status };

  if (variant === "feature") return <FeatureCard {...props} eyebrow={eyebrow} />;
  if (variant === "row") return <RowCard {...props} />;
  return <TileCard {...props} />;
};

export default BlogCard;
