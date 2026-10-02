import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FiDownload, FiX } from "react-icons/fi";
import {
  CASE_STUDY_CATEGORIES,
  CASE_STUDIES,
  DIFFICULTY_DOT,
  DIFFICULTY_LEVELS,
  categoryAccent,
} from "../constants/caseStudies";
import { EASE } from "../lib/motion";
import QuestionCard from "../components/CaseStudyCard";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import SplitReveal from "../components/motion/SplitReveal";

const pill = { type: "spring", stiffness: 420, damping: 34 };

const FilterChip = ({ selected, onClick, layoutId, size = "md", children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={selected}
    onClick={onClick}
    className={`relative isolate inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full transition-colors duration-300 ${
      size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm font-medium"
    } ${selected ? "text-ink" : "text-neutral-400 hover:text-bone"}`}
  >
    {selected ? (
      <motion.span layoutId={layoutId} className="absolute inset-0 -z-10 rounded-full bg-bone" transition={pill} />
    ) : (
      <span className="absolute inset-0 -z-10 rounded-full ring-1 ring-inset ring-white/10" aria-hidden />
    )}
    {children}
  </button>
);

const CategoryView = ({ catMeta }) => {
  const [activeTag, setActiveTag] = useState(null);
  const [activeDiff, setActiveDiff] = useState(null);
  const Icon = catMeta.icon;

  const allStudies = useMemo(() => CASE_STUDIES.filter((s) => s.category === catMeta.id), [catMeta.id]);

  const tags = useMemo(() => Array.from(new Set(allStudies.flatMap((s) => s.tags))).sort(), [allStudies]);

  const levels = useMemo(
    () => DIFFICULTY_LEVELS.filter((level) => allStudies.some((s) => s.difficulty === level)),
    [allStudies]
  );

  const filtered = useMemo(
    () =>
      allStudies.filter(
        (s) => (!activeTag || s.tags.includes(activeTag)) && (!activeDiff || s.difficulty === activeDiff)
      ),
    [allStudies, activeTag, activeDiff]
  );

  const hasFilters = Boolean(activeTag || activeDiff);
  const clearFilters = () => {
    setActiveTag(null);
    setActiveDiff(null);
  };
  const toggleTag = (tag) => setActiveTag((current) => (current === tag ? null : tag));

  return (
    <div style={categoryAccent(catMeta.color)}>
      <SEO title={`${catMeta.label} | Case Studies — Arsalaan Mohammed`} description={catMeta.description} />

      <section className="relative isolate overflow-hidden">
        <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="grid-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]" aria-hidden />
        <div className="container-site pt-36 md:pt-44">
          <Reveal y={0}>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500">
              <Link to="/case-studies" className="transition-colors hover:text-bone">
                Case Studies
              </Link>
              <span className="text-neutral-700">/</span>
              <span className="text-neutral-300">{catMeta.label}</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05} className="mt-10 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/25">
              {Icon && <Icon className="h-5 w-5" />}
            </span>
            <span className="label">{catMeta.countLabel(allStudies.length)}</span>
          </Reveal>

          <SplitReveal
            as="h1"
            trigger="load"
            delay={0.1}
            className="display mt-6 max-w-4xl text-pretty text-[clamp(2.6rem,6vw,5rem)] leading-[1.0]"
          >
            {catMeta.label}.{" "}
            <span className="text-neutral-500">
              {catMeta.tagline}
              {/[.?!]$/.test(catMeta.tagline) ? "" : "."}
            </span>
          </SplitReveal>

          <Reveal delay={0.3} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-neutral-400">{catMeta.description}</p>
            {catMeta.frameworkFile && (
              <a href={catMeta.frameworkFile} download className="btn-ghost w-max shrink-0">
                <FiDownload className="h-4 w-4" />
                Solving framework (PDF)
              </a>
            )}
          </Reveal>
        </div>
      </section>

      <section className="container-site pb-16 pt-14 md:pb-24">
        <Reveal className="flex flex-col gap-4 border-b border-white/[0.07] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by difficulty">
              <FilterChip layoutId={`cs-level-${catMeta.id}`} selected={!activeDiff} onClick={() => setActiveDiff(null)}>
                All levels
              </FilterChip>
              {levels.map((level) => (
                <FilterChip
                  key={level}
                  layoutId={`cs-level-${catMeta.id}`}
                  selected={activeDiff === level}
                  onClick={() => setActiveDiff(level)}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${DIFFICULTY_DOT[level]}`} aria-hidden />
                  {level}
                </FilterChip>
              ))}
            </div>

            <AnimatePresence>
              {hasFilters && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-neutral-500">
                    <span className="text-bone">{filtered.length}</span> of {allStudies.length}
                  </span>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-neutral-400 transition-colors hover:text-bone"
                  >
                    <FiX className="h-3.5 w-3.5" /> Clear
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {tags.length > 1 && (
            <div
              className="-mx-5 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filter by tag"
            >
              <FilterChip size="sm" layoutId={`cs-tag-${catMeta.id}`} selected={!activeTag} onClick={() => setActiveTag(null)}>
                All tags
              </FilterChip>
              {tags.map((tag) => (
                <FilterChip
                  key={tag}
                  size="sm"
                  layoutId={`cs-tag-${catMeta.id}`}
                  selected={activeTag === tag}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </FilterChip>
              ))}
            </div>
          )}
        </Reveal>

        <LayoutGroup>
          <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((study, i) => (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, delay: Math.min(i, 5) * 0.04, ease: EASE }}
                  className="h-full"
                >
                  <QuestionCard study={study} activeTag={activeTag} onTagClick={toggleTag} categorySlug={catMeta.slug} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-card py-20 text-center ring-1 ring-inset ring-white/[0.07]">
            <p className="text-neutral-400">No questions match those filters.</p>
            <button type="button" onClick={clearFilters} className="btn-ghost">
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

const CaseStudyCategory = () => {
  const { category } = useParams();
  const catMeta = CASE_STUDY_CATEGORIES.find((c) => c.slug === category);

  if (!catMeta) return <Navigate to="/case-studies" replace />;
  return <CategoryView key={catMeta.slug} catMeta={catMeta} />;
};

export default CaseStudyCategory;
