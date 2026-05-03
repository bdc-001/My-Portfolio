import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiDownload, FiFolder } from "react-icons/fi";
import { CASE_STUDY_CATEGORIES, CASE_STUDIES, CAT_COLORS } from "../constants/caseStudies";
import SEO from "../components/SEO";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const countByCategory = (id) => CASE_STUDIES.filter((s) => s.category === id).length;

const CaseStudies = () => {
  return (
    <>
      <SEO
        title="Case Studies | Arsalaan Mohammed"
        description="A curated library of PM case studies covering product design walkthroughs, root cause analyses, and guesstimate breakdowns by Arsalaan Mohammed."
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
              <span className="text-neutral-700 font-medium">Case Studies</span>
            </div>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="py-10 sm:py-14 md:py-20"
          >
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-full mb-6"
              >
                <FiFolder className="w-3 h-3" /> PM Case Studies
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight mb-5 leading-[1.1]"
              >
                Thinking out loud,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-500">
                  structured.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg sm:text-xl text-neutral-500 leading-relaxed max-w-2xl"
              >
                Pick a category to explore annotated walkthroughs. The mental models I reach for every day.
              </motion.p>
            </div>
          </motion.div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
            {CASE_STUDY_CATEGORIES.map((cat, i) => {
              const c = CAT_COLORS[cat.color] || CAT_COLORS.purple;
              const count = countByCategory(cat.id);

              return (
                <motion.div
                  key={cat.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col"
                >
                  {/* Main card link */}
                  <Link
                    to={`/case-studies/${cat.slug}`}
                    className={`group flex flex-col flex-1 rounded-t-2xl border-x border-t bg-white p-8 transition-all duration-300 hover:shadow-xl ${c.glow} relative overflow-hidden`}
                    style={{ borderColor: "rgba(0,0,0,0.07)" }}
                  >
                    {/* Gradient accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient}`} />

                    {/* Icon + count */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.lightBg}`}>
                        {cat.icon && <cat.icon className={`w-7 h-7 ${c.heading.replace("text-", "text-opacity-80 text-")}`} />}
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${c.badge} self-start mt-1`}>
                        {cat.countLabel(count)}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="flex-1 mb-6">
                      <h2 className={`text-2xl font-bold mb-1 tracking-tight ${c.heading}`}>
                        {cat.label}
                      </h2>
                      <p className="text-[13px] font-medium text-neutral-400 mb-3 italic">
                        {cat.tagline}
                      </p>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    {/* Explore CTA */}
                    <div className="flex items-center gap-2 font-semibold text-sm text-neutral-400 group-hover:text-neutral-700 transition-all duration-200">
                      <span>Explore questions</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </div>
                  </Link>

                  {/* Framework download bar — sits flush below card */}
                  <div
                    className={`rounded-b-2xl border-x border-b px-6 py-3 flex items-center justify-between gap-3 bg-neutral-50`}
                    style={{ borderColor: "rgba(0,0,0,0.07)" }}
                  >
                    <span className="text-[12px] text-neutral-400 font-medium">
                      Solving framework
                    </span>
                    {cat.frameworkFile ? (
                      <a
                        href={cat.frameworkFile}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${c.btn}`}
                      >
                        <FiDownload className="w-3.5 h-3.5" />
                        Download PDF
                      </a>
                    ) : (
                      <span className="text-[11px] font-semibold text-neutral-400 px-3 py-1.5 rounded-lg bg-white border border-neutral-200">
                        Coming soon
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default CaseStudies;
