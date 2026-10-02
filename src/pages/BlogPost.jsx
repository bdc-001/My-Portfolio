import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiCheck, FiChevronDown, FiLink, FiShare2, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { CONTACT } from "../constants";
import { formatDate, getPost, getRelatedPosts } from "../lib/posts";
import { formatCount, usePostStats } from "../lib/blogStats";
import { EASE, ScrollTrigger, prefersReducedMotion, scrollToTarget } from "../lib/motion";
import portraitAvatar from "../assets/portrait-avatar.webp";
import BlogCard from "../components/BlogCard";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import GlowCard from "../components/motion/GlowCard";
import SplitReveal from "../components/motion/SplitReveal";
import NotFound from "./NotFound";

const BODY = "text-[1.1875rem] leading-[1.8] text-neutral-300";
const pill = { type: "spring", stiffness: 420, damping: 34 };

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;

const Inline = ({ text }) =>
  text.split(INLINE).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-bone">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/") ? (
        <Link key={i} to={href} className="text-bone underline decoration-accent/60 underline-offset-4 hover:decoration-accent">
          {label}
        </Link>
      ) : (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bone underline decoration-accent/60 underline-offset-4 hover:decoration-accent"
        >
          {label}
        </a>
      );
    }
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-neutral-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });

const Lines = ({ lines }) =>
  lines.map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      <Inline text={line} />
    </span>
  ));

const Figure = ({ block }) => (
  <figure className="my-12 sm:-mx-4 md:my-14 lg:-mx-10 xl:mx-0">
    <div className="overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-inset ring-white/[0.06]">
      <img src={block.src} alt={block.alt} className="aspect-[3/2] w-full object-cover" loading="lazy" decoding="async" />
    </div>
    {(block.caption || block.credit) && (
      <figcaption className="mt-3.5 flex flex-col gap-1 px-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        {block.caption && <span className="text-pretty text-[15px] leading-relaxed text-neutral-400">{block.caption}</span>}
        {block.credit && (
          <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-wider text-neutral-600">{block.credit}</span>
        )}
      </figcaption>
    )}
  </figure>
);

const Block = ({ block, isLead }) => {
  switch (block.type) {
    case "figure":
      return <Figure block={block} />;
    case "h2":
      return (
        <h2 id={block.id} className="display mb-6 mt-16 scroll-mt-28 text-balance text-[2rem] leading-[1.1] md:text-[2.5rem]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={block.id} className="mb-4 mt-12 scroll-mt-28 text-xl font-medium text-bone md:text-2xl">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="mb-8 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className={`relative pl-7 ${BODY} before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-3.5 before:bg-accent/70`}
            >
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-8 space-y-5 border-l border-white/10">
          {block.items.map((item, i) => (
            <li key={i} className={`relative pl-6 ${BODY}`}>
              <span className="mr-3 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="display my-12 border-l-2 border-accent/60 pl-6 text-[1.9rem] leading-[1.2] md:text-[2.3rem]">
          &ldquo;{block.text}&rdquo;
        </blockquote>
      );
    case "dialogue":
      return (
        <div className="card my-10 space-y-3 p-5 md:p-6">
          {block.lines.map((line, i) => (
            <p key={i} className="grid gap-1 text-[0.95rem] leading-relaxed sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <span className="label pt-0.5">{line.speaker}</span>
              <span className="text-neutral-200">{line.text}</span>
            </p>
          ))}
        </div>
      );
    default:
      return (
        <p
          className={`mb-7 text-pretty ${
            isLead ? "text-[1.3rem] leading-[1.65] text-neutral-100 md:text-[1.45rem]" : BODY
          }`}
        >
          <Lines lines={block.lines} />
        </p>
      );
  }
};

/** The last heading that has scrolled past 30% of the viewport. */
const useActiveHeading = (ids) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!ids.length) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
};

const usePostBody = (post) => {
  const [blocks, setBlocks] = useState(null);

  useEffect(() => {
    let alive = true;
    post.loadBody().then((result) => {
      if (alive) setBlocks(result);
    });
    return () => {
      alive = false;
    };
  }, [post]);

  useEffect(() => {
    if (!blocks) return undefined;
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id && document.getElementById(id);
      if (target) scrollToTarget(target, { offset: -110, immediate: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [blocks]);

  return blocks;
};

const countVariants = {
  enter: (dir) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const AnimatedCount = ({ value }) => {
  const previous = useRef(value);
  const dir = value == null || previous.current == null ? 1 : Math.sign(value - previous.current) || 1;

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return (
    <span className="relative inline-flex h-[1.2em] min-w-[1ch] justify-center overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.span
          key={value ?? "empty"}
          custom={dir}
          variants={countVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 520, damping: 24, mass: 0.8 }}
        >
          {value == null ? "–" : formatCount(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const SPARKS = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);

const Burst = () => (
  <span className="pointer-events-none absolute inset-0" aria-hidden>
    <motion.span
      className="absolute inset-0 rounded-full ring-2 ring-accent"
      initial={{ scale: 0.85, opacity: 0.9 }}
      animate={{ scale: 1.7, opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    />
    {SPARKS.map((angle, i) => (
      <motion.span
        key={angle}
        className={`absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-bone" : "bg-accent"}`}
        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        animate={{ x: Math.cos(angle) * 46, y: Math.sin(angle) * 46, scale: 0, opacity: 0 }}
        transition={{ duration: 0.75, ease: EASE }}
      />
    ))}
  </span>
);

const VoteButton = ({ type, active, count, onVote, disabled, compact = false, label }) => {
  const [bursts, setBursts] = useState(0);
  const Icon = type === "up" ? FiThumbsUp : FiThumbsDown;

  const handleClick = () => {
    if (type === "up" && !active && !prefersReducedMotion()) setBursts((n) => n + 1);
    onVote(type);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={`${label} (${count ?? 0})`}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full border transition-[background-color,border-color,color,transform] duration-300 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 ${
        compact ? "h-auto w-14 flex-col gap-1.5 py-3.5 text-xs" : "px-6 py-3 text-sm"
      } ${
        active
          ? type === "up"
            ? "border-accent bg-accent text-ink"
            : "border-bone bg-bone text-ink"
          : "border-white/15 text-neutral-300 hover:border-white/40 hover:text-bone"
      }`}
    >
      {bursts > 0 && <Burst key={bursts} />}
      <Icon
        className={`h-4 w-4 transition-transform duration-500 ease-expo ${
          active ? (type === "up" ? "-rotate-12 scale-110" : "rotate-12 scale-110") : "group-hover:scale-110"
        }`}
      />
      {!compact && <span>{label}</span>}
      <AnimatedCount value={count} />
    </button>
  );
};

const useShare = (post) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const nativeShare = () => {
    if (navigator.share) navigator.share({ title: post.title, text: post.excerpt, url }).catch(() => {});
    else copy();
  };

  return {
    copied,
    copy,
    nativeShare,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`,
  };
};

const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors duration-300 hover:border-white/40 hover:text-bone";

const ShareButtons = ({ share, vertical = false }) => (
  <div className={`flex gap-2 ${vertical ? "flex-col" : ""}`}>
    <button type="button" onClick={share.copy} className={iconButton} aria-label={share.copied ? "Link copied" : "Copy link"}>
      {share.copied ? <FiCheck className="h-4 w-4 text-accent" /> : <FiLink className="h-4 w-4" />}
    </button>
    <a href={share.linkedin} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="Share on LinkedIn">
      <FaLinkedinIn className="h-3.5 w-3.5" />
    </a>
    <a href={share.x} target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="Share on X">
      <FaXTwitter className="h-3.5 w-3.5" />
    </a>
    <button type="button" onClick={share.nativeShare} className={`${iconButton} md:hidden`} aria-label="Share">
      <FiShare2 className="h-4 w-4" />
    </button>
  </div>
);

/** Full-bleed cover photo with the headline set over its lower edge. */
const Hero = ({ post, stats, share }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion() ? "0%" : "18%"]);

  return (
    <header ref={ref} className="relative isolate flex min-h-[86svh] items-end overflow-hidden md:min-h-[92svh]">
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <motion.img
          src={post.coverImage}
          alt={post.coverAlt ?? ""}
          className="h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/20" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/80 to-transparent" aria-hidden />

      <div className="mx-auto w-full max-w-4xl px-5 pb-12 pt-36 sm:px-8 md:pb-16">
        <Reveal y={0}>
          <Link to="/blog" className="group inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white">
            <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All stories
          </Link>
        </Reveal>

        <Reveal delay={0.05} as="p" className="mt-8 font-mono text-[11px] uppercase tracking-label text-neutral-300">
          {post.tags.join("  /  ")}
        </Reveal>
        <SplitReveal
          as="h1"
          trigger="load"
          delay={0.1}
          className="display mt-5 text-balance text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.02] text-white"
        >
          {post.title}
        </SplitReveal>
        <Reveal as="p" delay={0.3} className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-300 md:text-xl">
          {post.excerpt}
        </Reveal>

        <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={portraitAvatar} alt="" className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20" />
            <div>
              <p className="text-sm text-white">Arsalaan Mohammed</p>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                {formatDate(post.date, { month: "long" })} · {post.readTime}
                {stats && ` · ${formatCount(stats.views)} ${stats.views === 1 ? "read" : "reads"}`}
              </p>
            </div>
          </div>
          <ShareButtons share={share} />
        </Reveal>
      </div>

      {post.coverCredit && (
        <a
          href={post.coverCreditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-300 sm:right-6"
        >
          Photo: {post.coverCredit}
        </a>
      )}
    </header>
  );
};

const Summary = ({ items }) => (
  <Reveal className="mb-14 rounded-card bg-[radial-gradient(90%_120%_at_0%_0%,rgb(var(--accent)/0.1),transparent_60%)] p-6 ring-1 ring-inset ring-white/[0.08] md:p-8">
    <p className="label text-neutral-400">In short</p>
    <ul className="mt-5 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 text-pretty leading-relaxed text-neutral-200">
          <FiCheck className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <Inline text={item} />
        </li>
      ))}
    </ul>
  </Reveal>
);

const MobileContents = ({ headings, onJump }) => (
  <details className="group mb-12 rounded-2xl ring-1 ring-inset ring-white/[0.08] xl:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm text-neutral-300 [&::-webkit-details-marker]:hidden">
      On this page
      <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
    </summary>
    <ol className="space-y-1 border-t border-white/[0.06] px-5 py-4">
      {headings.map((heading, i) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={(event) => onJump(event, heading.id)}
            className="flex gap-3 py-1.5 text-[15px] text-neutral-400 transition-colors hover:text-bone"
          >
            <span className="font-mono text-xs text-neutral-600">{String(i + 1).padStart(2, "0")}</span>
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  </details>
);

const BodySkeleton = () => (
  <div className="space-y-4" aria-hidden>
    {[100, 94, 98, 72, 0, 100, 90, 96, 60].map((width, i) =>
      width ? (
        <div key={i} className="h-4 animate-pulse rounded bg-white/[0.06]" style={{ width: `${width}%` }} />
      ) : (
        <div key={i} className="h-6" />
      )
    )}
  </div>
);

const Article = ({ post }) => {
  const blocks = usePostBody(post);
  const headings = useMemo(() => (blocks ?? []).filter((block) => block.type === "h2"), [blocks]);
  const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);
  const activeId = useActiveHeading(headingIds);
  const { stats, vote, status, error, castVote } = usePostStats(post.slug);
  const share = useShare(post);
  const related = useMemo(() => getRelatedPosts(post, 3), [post]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const unavailable = status === "unavailable";
  const total = stats ? stats.up + stats.down : 0;
  const approval = total > 0 ? Math.round((stats.up / total) * 100) : null;

  const scrollToHeading = (event, id) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    scrollToTarget(el, { offset: -110 });
    window.history.replaceState(null, "", `#${id}`);
  };

  const voteProps = (type) => ({
    type,
    label: type === "up" ? "Worth it" : "Not really",
    active: vote === type,
    count: stats?.[type],
    onVote: castVote,
    disabled: unavailable,
  });

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.7)]"
        aria-hidden
      />

      <article className="relative">
        <Hero post={post} stats={stats} share={share} />

        <div className="mx-auto mt-14 max-w-6xl px-5 sm:px-8 md:mt-20 xl:grid xl:grid-cols-[190px_minmax(0,1fr)_190px] xl:gap-10">
          <aside className="hidden xl:block">
            {headings.length > 0 && (
              <nav className="sticky top-28" aria-label="On this page">
                <p className="label mb-4">On this page</p>
                <ul className="border-l border-white/[0.08]">
                  {headings.map((heading) => {
                    const current = activeId === heading.id;
                    return (
                      <li key={heading.id} className="relative">
                        {current && (
                          <motion.span
                            layoutId={`toc-${post.slug}`}
                            className="absolute -left-px inset-y-0 w-px bg-accent shadow-[0_0_8px_rgb(var(--accent)/0.8)]"
                            transition={pill}
                          />
                        )}
                        <a
                          href={`#${heading.id}`}
                          onClick={(event) => scrollToHeading(event, heading.id)}
                          aria-current={current ? "location" : undefined}
                          className={`block py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-300 ${
                            current ? "text-bone" : "text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </aside>

          <div className="mx-auto w-full max-w-[680px]">
            {post.summary.length > 0 && <Summary items={post.summary} />}
            {headings.length > 2 && <MobileContents headings={headings} onJump={scrollToHeading} />}
            {blocks ? (
              blocks.map((block, i) => <Block key={i} block={block} isLead={i === 0 && block.type === "p"} />)
            ) : (
              <BodySkeleton />
            )}
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-28 flex flex-col items-center gap-3">
              <p className="label mb-1">Verdict</p>
              <VoteButton {...voteProps("up")} compact />
              <VoteButton {...voteProps("down")} compact />
              <span className="my-2 h-8 w-px bg-white/10" aria-hidden />
              <ShareButtons share={share} vertical />
            </div>
          </aside>
        </div>

        <Reveal as="section" className="mx-auto mt-20 max-w-[680px] px-5 sm:px-0" aria-labelledby="verdict-heading">
          <GlowCard className="overflow-hidden p-8 text-center md:p-12">
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(var(--accent)/0.12),transparent_70%)]"
              aria-hidden
            />
            <p className="label">Your verdict</p>
            <h2 id="verdict-heading" className="display mt-3 text-4xl md:text-5xl">
              Was this worth your time?
            </h2>
            <p className="mt-3 text-sm text-neutral-500">One vote per reader, counted for real. Change your mind any time.</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <VoteButton {...voteProps("up")} />
              <VoteButton {...voteProps("down")} />
            </div>

            <div className="mt-8 min-h-[2.5rem]" aria-live="polite">
              {error ? (
                <p className="text-sm text-neutral-300">{error}</p>
              ) : unavailable ? (
                <p className="text-sm text-neutral-500">Voting is taking a breather right now. Try again later.</p>
              ) : approval !== null ? (
                <>
                  <div className="mx-auto h-[3px] max-w-xs overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={false}
                      animate={{ width: `${approval}%` }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </div>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    {approval}% of {formatCount(total)} {total === 1 ? "reader" : "readers"} found this worth it
                  </p>
                </>
              ) : (
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Be the first to vote</p>
              )}
            </div>
          </GlowCard>
        </Reveal>

        <Reveal as="section" className="mx-auto mt-14 max-w-[680px] px-5 sm:px-0">
          <div className="flex items-start gap-5 border-t border-white/[0.07] pt-10">
            <img src={portraitAvatar} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-white/10" />
            <div>
              <p className="label">Written by</p>
              <p className="display mt-1 text-3xl">Arsalaan Mohammed</p>
              <p className="mt-2 text-pretty leading-relaxed text-neutral-400">
                Product manager at Convin.ai and IIT (ISM) Dhanbad alum. I write about AI, product, and the long way
                round.
              </p>
              <div className="mt-4 flex gap-5 text-sm">
                <Link to="/" className="link-underline text-bone">
                  More about me
                </Link>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-bone">
                  Follow on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {related.length > 0 && (
          <section className="container-site mt-24 pb-8" aria-label="Keep reading">
            <div className="mb-8 flex items-end justify-between border-b border-white/[0.07] pb-5">
              <h2 className="display text-3xl md:text-4xl">Keep reading</h2>
              <Link to="/blog" className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-bone">
                All stories
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className={`grid gap-5 ${related.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.06} className="h-full">
                  <BlogCard post={item} variant={related.length === 1 ? "row" : "tile"} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <NotFound title="That story doesn't exist (yet)." backTo="/blog" backLabel="All stories" />;

  return (
    <>
      <SEO title={post.title} description={post.excerpt} image={post.coverImage} type="article" />
      <Article key={post.slug} post={post} />
    </>
  );
};

export default BlogPost;
