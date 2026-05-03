import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CASE_STUDIES, CASE_STUDY_CATEGORIES, CAT_COLORS } from "../constants/caseStudies";
import SEO from "../components/SEO";
import { FiArrowLeft } from "react-icons/fi";

const CaseStudyDetail = () => {
  const { category, id } = useParams();

  const study = CASE_STUDIES.find((s) => s.id === id && s.category === category);
  const catMeta = CASE_STUDY_CATEGORIES.find((c) => c.slug === category);

  if (!study || !catMeta) return <Navigate to="/case-studies" replace />;

  const c = CAT_COLORS[catMeta.color] || CAT_COLORS.purple;

  return (
    <>
      <SEO
        title={`${study.title} | Case Studies — Arsalaan Mohammed`}
        description={study.snapshot}
      />
      <div className="pt-12 pb-24 min-h-screen bg-white bg-dots">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              to={`/case-studies/${category}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8">
              {study.image && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-1 ring-neutral-200 flex-shrink-0">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.badge}`}>
                    {catMeta.label}
                  </span>
                  <span className="text-xs font-medium text-neutral-400">
                    {study.company} · {new Date(study.date + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 leading-[1.25]">
                  {study.title}
                </h1>
              </div>
            </div>

            <div className="text-sm sm:text-base text-neutral-600 font-medium mb-8 leading-relaxed border-l-4 pl-4" style={{ borderColor: catMeta.color }}>
              {study.question}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-neutral-100 text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Entrepreneur Insight */}
            <div className="mb-12 p-5 bg-neutral-900 rounded-2xl shadow-xl ring-1 ring-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </div>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                For New Entrepreneurs
              </h4>
              <p className="text-neutral-300 text-sm leading-relaxed mb-0">
                Learning to break down a business problem into a <strong>Question</strong> and a <strong>Structured Solution</strong> is the first step to building a robust product. This format helps you move from "I have an idea" to "I have a plan that works."
              </p>
            </div>
          </motion.div>

          {/* Solution Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-neutral prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl"
          >
            {study.detailedSolution ? (
              <div dangerouslySetInnerHTML={{ __html: study.detailedSolution }} />
            ) : (
              <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 text-center text-neutral-500">
                Detailed solution coming soon.
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default CaseStudyDetail;
