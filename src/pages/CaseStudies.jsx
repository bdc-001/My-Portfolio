import { Link } from "react-router-dom";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { CASE_STUDY_CATEGORIES, CASE_STUDIES, categoryAccent } from "../constants/caseStudies";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import CountUp from "../components/motion/CountUp";
import GlowCard from "../components/motion/GlowCard";
import SplitReveal from "../components/motion/SplitReveal";

const countByCategory = (id) => CASE_STUDIES.filter((s) => s.category === id).length;

const COUNTERS = [
  { value: String(CASE_STUDY_CATEGORIES.length), label: "Categories" },
  { value: String(CASE_STUDIES.length), label: "Case studies" },
  { value: String(CASE_STUDY_CATEGORIES.filter((c) => c.frameworkFile).length), label: "Free frameworks" },
];

const CategoryCard = ({ category, index }) => {
  const count = countByCategory(category.id);
  const Icon = category.icon;

  return (
    <GlowCard
      style={categoryAccent(category.color)}
      data-cursor="Explore"
      className="group flex h-full flex-col overflow-hidden p-7 md:p-9"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.22),transparent_65%)] opacity-60 transition-[opacity,transform] duration-700 ease-expo group-hover:scale-125 group-hover:opacity-100"
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/25">
          {Icon && <Icon className="h-6 w-6" />}
        </span>
        <span className="font-mono text-xs text-neutral-500">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="mt-10 flex-1">
        <p className="label !text-accent">{category.countLabel(count)}</p>
        <h2 className="display mt-3 text-[2.2rem] leading-[1.05] md:text-[2.6rem]">
          <Link
            to={`/case-studies/${category.slug}`}
            className="after:absolute after:inset-0 after:z-[1] after:rounded-card after:content-['']"
          >
            {category.label}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-neutral-500">{category.tagline}</p>
        <p className="mt-5 text-pretty leading-relaxed text-neutral-400">{category.description}</p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-bone">
          Explore questions
          <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {category.frameworkFile ? (
          <a
            href={category.frameworkFile}
            download
            data-cursor="Save"
            className="relative z-[3] inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-neutral-300 ring-1 ring-inset ring-white/10 transition-colors duration-300 hover:bg-accent hover:text-ink hover:ring-accent"
          >
            <FiDownload className="h-3.5 w-3.5" />
            Framework PDF
          </a>
        ) : (
          <span className="text-xs text-neutral-500">Framework coming soon</span>
        )}
      </div>
    </GlowCard>
  );
};

const CaseStudies = () => (
  <>
    <SEO
      title="Case Studies | Arsalaan Mohammed"
      description="A curated library of PM case studies covering product design walkthroughs, root cause analyses, and guesstimate breakdowns by Arsalaan Mohammed."
    />

    <section className="relative isolate overflow-hidden">
      <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="grid-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]" aria-hidden />
      <div className="container-site pt-36 md:pt-48">
        <SplitReveal
          as="h1"
          trigger="load"
          delay={0.15}
          className="display max-w-4xl text-pretty text-[clamp(2.8rem,6.6vw,5.5rem)] leading-[1.0]"
        >
          Thinking out loud, <span className="text-neutral-500">structured.</span>
        </SplitReveal>
        <Reveal as="p" delay={0.35} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-neutral-400 md:text-xl">
          Annotated walkthroughs of the mental models I reach for every day. Pick a category, grab the framework, and
          steal whatever helps.
        </Reveal>

        <Reveal delay={0.45} className="mt-14 grid grid-cols-3 border-y border-white/[0.07]">
          {COUNTERS.map((counter, i) => (
            <div key={counter.label} className={`border-white/[0.07] py-6 md:py-8 ${i > 0 ? "border-l pl-5 md:pl-6" : ""}`}>
              <p className="display text-4xl leading-none md:text-5xl">
                <CountUp value={counter.value} />
              </p>
              <p className="mt-2 text-sm text-neutral-500">{counter.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>

    <section className="container-site pb-16 pt-16 md:pb-24 md:pt-20">
      <div className="grid gap-4 md:grid-cols-2">
        {CASE_STUDY_CATEGORIES.map((category, i) => (
          <Reveal key={category.id} delay={(i % 2) * 0.08} className="h-full">
            <CategoryCard category={category} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default CaseStudies;
