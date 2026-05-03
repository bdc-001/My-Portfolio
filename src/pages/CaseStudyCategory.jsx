import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { FiChevronDown, FiX } from "react-icons/fi";
import { CASE_STUDY_CATEGORIES, CASE_STUDIES, CAT_COLORS } from "../constants/caseStudies";
import QuestionCard from "../components/CaseStudyCard";
import SEO from "../components/SEO";

const DIFFICULTY_ORDER = ["All levels", "Beginner", "Intermediate", "Advanced"];

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

// ── Reusable Dropdown ──────────────────────────────────────────────────────────
const Dropdown = ({ label, options, value, onChange, accentClass }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayLabel = value || label;
  const isActive = Boolean(value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-all duration-150 bg-white select-none ${
          isActive
            ? `${accentClass} border-transparent shadow-sm`
            : "text-neutral-600 border-neutral-200 hover:border-neutral-400"
        }`}
      >
        <span>{displayLabel}</span>
        <FiChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-neutral-100 rounded-xl shadow-xl overflow-hidden min-w-[160px]"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  onClick={() => { onChange(opt === label || opt === "All levels" ? null : opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 ${
                    (opt === "All levels" || opt === label) && !value
                      ? "font-semibold text-neutral-900 bg-neutral-50"
                      : opt === value
                      ? `font-semibold ${accentClass} bg-opacity-10`
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const CaseStudyCategory = () => {
  const { category } = useParams();
  const [activeTag,  setActiveTag]  = useState(null);
  const [activeDiff, setActiveDiff] = useState(null);

  const catMeta = CASE_STUDY_CATEGORIES.find((c) => c.slug === category);
  if (!catMeta) return <Navigate to="/case-studies" replace />;

  const c = CAT_COLORS[catMeta.color] || CAT_COLORS.purple;

  const allStudies = useMemo(
    () => CASE_STUDIES.filter((s) => s.category === catMeta.id),
    [catMeta.id]
  );

  const allTags = useMemo(() => {
    const tagSet = new Set();
    allStudies.forEach((s) => s.tags.forEach((t) => tagSet.add(t)));
    return ["All tags", ...Array.from(tagSet).sort()];
  }, [allStudies]);

  const filtered = useMemo(() => {
    let list = allStudies;
    if (activeTag)  list = list.filter((s) => s.tags.includes(activeTag));
    if (activeDiff) list = list.filter((s) => s.difficulty === activeDiff);
    return list;
  }, [allStudies, activeTag, activeDiff]);

  const handleTagClick = (tag) => setActiveTag((prev) => (prev === tag ? null : tag));
  const clearFilters = () => { setActiveTag(null); setActiveDiff(null); };
  const hasFilters = activeTag || activeDiff;

  // Colour token for the active dropdown button
  const dropdownActiveClass =
    catMeta.color === "purple" ? "bg-purple-600 text-white" :
    catMeta.color === "blue"   ? "bg-blue-600 text-white"   :
                                  "bg-emerald-600 text-white";

  return (
    <>
      <SEO
        title={`${catMeta.label} | Case Studies — Arsalaan Mohammed`}
        description={catMeta.description}
      />

      <div className="pt-16 sm:pt-20 min-h-screen bg-white bg-dots">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-6 sm:pt-8 md:pt-10 pb-2"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link to="/" className="text-neutral-400 hover:text-neutral-700 transition-colors">Home</Link>
              <span className="text-neutral-300">/</span>
              <Link to="/case-studies" className="text-neutral-400 hover:text-neutral-700 transition-colors">Case Studies</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-700 font-medium">{catMeta.label}</span>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="py-10 sm:py-12 md:py-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${catMeta.lightBg}`}>
                {catMeta.icon && <catMeta.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${c.heading.replace("text-", "text-opacity-80 text-")}`} />}
              </div>
              <div className="flex-1">
                <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border mb-2 ${c.badge}`}>
                  {allStudies.length} {allStudies.length === 1 ? "question" : "questions"}
                </div>
                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-1 ${c.heading}`}>
                  {catMeta.label}
                </h1>
                <p className="text-sm sm:text-base text-neutral-500 max-w-2xl leading-relaxed">
                  Real-world business and product breakdowns designed for college students, new professionals, and business enthusiasts. Master the strategy behind the world's most disruptive brands.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Filter Bar — compact dropdowns */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 flex-wrap">
              {/* Difficulty dropdown */}
              <Dropdown
                label="Difficulty"
                options={DIFFICULTY_ORDER}
                value={activeDiff}
                onChange={setActiveDiff}
                accentClass={dropdownActiveClass}
              />

              {/* Tag dropdown */}
              <Dropdown
                label="Tag"
                options={allTags}
                value={activeTag}
                onChange={setActiveTag}
                accentClass={dropdownActiveClass}
              />

              {/* Active filter summary + clear */}
              <AnimatePresence>
                {hasFilters && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xs text-neutral-500">
                      <strong className="text-neutral-800">{filtered.length}</strong> of {allStudies.length} shown
                    </span>
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <FiX className="w-3 h-3" /> Clear
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-5 border-b border-neutral-100" />
          </motion.div>

          {/* Question Cards Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 flex flex-col items-center gap-4 text-center"
              >
                <span className="text-5xl">🔎</span>
                <p className="text-neutral-500 font-medium">No questions match those filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold text-neutral-600 underline underline-offset-2 hover:text-neutral-900 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeTag}-${activeDiff}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24"
              >
                {filtered.map((study) => (
                  <QuestionCard
                    key={study.id}
                    study={study}
                    color={catMeta.color}
                    activeTag={activeTag}
                    onTagClick={handleTagClick}
                    categorySlug={catMeta.slug}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
};

export default CaseStudyCategory;
