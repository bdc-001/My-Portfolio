import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiChevronDown, FiLock } from "react-icons/fi";
import { DIFFICULTY_DOT, formatMonth } from "../constants/caseStudies";
import { EASE } from "../lib/motion";
import GlowCard from "./motion/GlowCard";

/** Case study titles and approach steps are authored as trusted HTML with glossary tooltips. */
export const Html = ({ as: Tag = "span", html, className }) => (
  <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

const QuestionCard = ({ study, activeTag, onTagClick, categorySlug }) => {
  const [expanded, setExpanded] = useState(false);
  const hasSolution = Boolean(study.file || study.detailedSolution);

  return (
    <GlowCard as="article" className="group flex h-full flex-col p-2.5">
      {study.image && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-ink-700">
          <img
            src={study.image}
            alt=""
            className="img-mono h-full w-full object-cover group-hover:scale-[1.05]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 md:px-4 md:pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="chip inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${DIFFICULTY_DOT[study.difficulty] ?? "bg-neutral-500"}`} aria-hidden />
            {study.difficulty}
          </span>
          <span className="label">
            {study.company} · {formatMonth(study.date)}
          </span>
        </div>

        <Html as="p" html={study.title} className="label mt-5 !text-accent" />
        <h3 className="display mt-2 line-clamp-3 text-pretty text-[1.4rem] leading-[1.2] md:text-[1.55rem]">{study.question}</h3>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {study.tags.map((tag) => {
            const selected = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick?.(tag)}
                aria-pressed={selected}
                className={`rounded-full px-2.5 py-0.5 text-[11px] transition-colors duration-300 ${
                  selected
                    ? "bg-accent text-ink"
                    : "text-neutral-400 ring-1 ring-inset ring-white/10 hover:text-bone hover:ring-white/25"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          className="mt-5 inline-flex w-max items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-bone"
        >
          <FiChevronDown className={`h-3.5 w-3.5 transition-transform duration-500 ease-expo ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Hide snapshot" : "View snapshot"}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                {study.approach?.length > 0 && (
                  <ol className="mb-3 flex flex-wrap gap-1.5">
                    {study.approach.map((step, i) => (
                      <li key={step} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-neutral-400">
                        <span className="mr-1 font-mono text-neutral-600">{i + 1}</span>
                        <Html html={step} />
                      </li>
                    ))}
                  </ol>
                )}
                <p className="rounded-xl bg-white/[0.03] p-4 text-sm leading-relaxed text-neutral-300 ring-1 ring-inset ring-white/[0.06]">
                  {study.snapshot}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-6">
          <div className="border-t border-white/[0.07] pt-5">
            {hasSolution ? (
              <Link
                to={`/case-studies/${categorySlug}/${study.id}`}
                data-cursor="Read"
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-bone"
              >
                Read the solution
                <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <FiLock className="h-3 w-3" />
                Coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </GlowCard>
  );
};

export default QuestionCard;
