import { motion } from "framer-motion";
import { FiArrowRight, FiLock, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import { CAT_COLORS } from "../constants/caseStudies";

const DIFFICULTY_STYLE = {
  Beginner:     "bg-green-50 text-green-700 border-green-200",
  Intermediate: "bg-amber-50  text-amber-700  border-amber-200",
  Advanced:     "bg-red-50    text-red-700    border-red-200",
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

import { Link } from "react-router-dom";

const QuestionCard = ({ study, color = "purple", activeTag, onTagClick, categorySlug }) => {
  const [expanded, setExpanded] = useState(false);
  const c = CAT_COLORS[color] || CAT_COLORS.purple;
  const hasSolution = Boolean(study.file || study.detailedSolution);

  return (
    <motion.article
      variants={itemVariants}
      layout
      className={`group bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${c.glow} ring-1 ring-transparent hover:ring-1 hover:${c.ring}`}
    >
      {/* Top accent line */}
      <div className={`h-0.5 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${c.dot.replace("bg-", "text-")}`} />

      {/* Optional Card Image */}
      {study.image && (
        <div className="w-full h-52 overflow-hidden border-b border-neutral-100 bg-neutral-50 relative">
          <img 
            src={study.image} 
            alt={study.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <span className={`text-[10px] uppercase tracking-[0.14em] font-bold px-2.5 py-1 rounded-full border ${DIFFICULTY_STYLE[study.difficulty] || DIFFICULTY_STYLE.Intermediate}`}>
            {study.difficulty}
          </span>
          <span className="text-[11px] text-neutral-400 font-medium">
            {study.company} · {new Date(study.date + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </span>
        </div>

        {/* Header (Title) */}
        <p className="text-[11px] font-bold text-neutral-400 mb-2 uppercase tracking-[0.2em]">
          {study.title}
        </p>

        {/* Question (Main Heading) */}
        <h3 className="text-[17px] sm:text-[19px] font-extrabold text-neutral-900 leading-[1.3] mb-4 group-hover:text-neutral-800 transition-colors min-h-[3.8rem] line-clamp-3">
          {study.question}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {study.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick && onTagClick(tag)}
              className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border transition-all duration-150 cursor-pointer ${
                activeTag === tag ? c.tagActive : c.tag
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Expandable Snapshot */}
        <div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors mb-2"
          >
            {expanded ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
            {expanded ? "Hide snapshot" : "View snapshot"}
          </button>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Approach pills */}
              {study.approach?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {study.approach.map((step) => (
                    <span
                      key={step}
                      className="text-[10px] font-medium text-neutral-500 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-md"
                    >
                      {step}
                    </span>
                  ))}
                </div>
              )}

              {/* Snapshot text */}
              <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                {study.snapshot}
              </p>
            </motion.div>
          )}
        </div>

        {/* Divider */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          {hasSolution ? (
            <Link
              to={`/case-studies/${categorySlug}/${study.id}`}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${c.btn}`}
              aria-label={`Read ${study.title}`}
            >
              Read Solution
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-100 select-none">
              <FiLock className="w-3 h-3" />
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default QuestionCard;
