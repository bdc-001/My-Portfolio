import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiDownload } from "react-icons/fi";
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
  DIFFICULTY_DOT,
  categoryAccent,
  formatMonth,
} from "../constants/caseStudies";
import { Html } from "../components/CaseStudyCard";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import GlowCard from "../components/motion/GlowCard";

const stripHtml = (html) => html.replace(/<span class="term-icon">i<\/span>/g, "").replace(/<[^>]+>/g, "");

const PROSE = [
  "case-prose prose prose-invert prose-lg max-w-none",
  "prose-headings:font-display prose-headings:font-light prose-headings:tracking-display prose-headings:text-bone",
  "prose-h3:mt-14 prose-h3:text-[1.9rem] prose-h3:leading-tight prose-h4:mt-10 prose-h4:font-sans prose-h4:text-xl prose-h4:font-medium prose-h4:tracking-normal",
  "prose-p:text-[1.125rem] prose-p:leading-[1.75] prose-p:text-neutral-300 prose-li:text-[1.125rem] prose-li:leading-[1.75] prose-li:text-neutral-300",
  "prose-strong:text-bone prose-em:text-neutral-200 prose-a:text-accent prose-li:marker:text-accent/70",
  "prose-th:text-bone prose-td:text-neutral-300 prose-hr:border-white/10 prose-img:rounded-2xl",
].join(" ");

const CaseStudyDetail = () => {
  const { category, id } = useParams();
  const study = CASE_STUDIES.find((s) => s.id === id && s.category === category);
  const catMeta = CASE_STUDY_CATEGORIES.find((c) => c.slug === category);

  if (!study || !catMeta) return <Navigate to="/case-studies" replace />;

  const siblings = CASE_STUDIES.filter((s) => s.category === catMeta.id && (s.detailedSolution || s.file));
  const next = siblings.length > 1 ? siblings[(siblings.indexOf(study) + 1) % siblings.length] : null;

  return (
    <div style={categoryAccent(catMeta.color)}>
      <SEO title={`${stripHtml(study.title)} | Case Studies`} description={study.snapshot} />

      <article className="relative isolate pt-32 md:pt-40">
        <div className="aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px]" aria-hidden />

        <header className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal y={0}>
            <Link
              to={`/case-studies/${catMeta.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-bone"
            >
              <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {catMeta.label}
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-10 flex flex-wrap items-center gap-3">
            <span className="label">{catMeta.label}</span>
            <span className="chip inline-flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${DIFFICULTY_DOT[study.difficulty] ?? "bg-neutral-500"}`} aria-hidden />
              {study.difficulty}
            </span>
            <span className="label">
              {study.company} · {formatMonth(study.date)}
            </span>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 flex items-start gap-5">
            {study.image && (
              <img
                src={study.image}
                alt=""
                className="img-mono h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-white/10 md:h-24 md:w-24"
              />
            )}
            <Html as="h1" html={study.title} className="display text-balance text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[1.04]" />
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 border-l-2 border-accent/60 pl-5 text-pretty text-xl leading-relaxed text-neutral-200 md:text-[1.4rem]">
              {study.question}
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.3}>
            <GlowCard className="mt-12 grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-start md:p-8">
              <div>
                <p className="label">Snapshot</p>
                <p className="mt-3 text-pretty leading-relaxed text-neutral-300">{study.snapshot}</p>
                {study.approach?.length > 0 && (
                  <ol className="mt-5 flex flex-wrap gap-1.5">
                    {study.approach.map((step, i) => (
                      <li key={step} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-neutral-300 ring-1 ring-inset ring-white/[0.06]">
                        <span className="mr-1.5 font-mono text-accent">{i + 1}</span>
                        <Html html={step} />
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              {study.file && study.detailedSolution && (
                <a href={study.file} download className="btn-ghost w-max">
                  <FiDownload className="h-4 w-4" />
                  PDF
                </a>
              )}
            </GlowCard>
          </Reveal>
        </header>

        <div className="mx-auto mt-16 max-w-3xl px-5 sm:px-8">
          {study.detailedSolution ? (
            <Reveal className={PROSE}>
              <div dangerouslySetInnerHTML={{ __html: study.detailedSolution }} />
            </Reveal>
          ) : (
            <Reveal className="card flex flex-col items-start gap-5 p-8 md:p-10">
              <p className="display text-3xl">The full write-up lives in the PDF.</p>
              <p className="max-w-lg text-neutral-400">
                The worked solution, with every assumption and chart, is in the downloadable deck while I bring it onto
                the site.
              </p>
              {study.file && (
                <a href={study.file} download className="btn-primary">
                  <FiDownload className="h-4 w-4" />
                  Download the solution
                </a>
              )}
            </Reveal>
          )}

          <Reveal className="mt-16">
            <div className="rounded-card bg-[radial-gradient(80%_120%_at_0%_0%,rgb(var(--accent)/0.12),transparent_60%)] p-6 ring-1 ring-inset ring-white/[0.07] md:p-8">
              <p className="label flex items-center gap-2">
                <span className="eyebrow-dot" aria-hidden />
                For new entrepreneurs
              </p>
              <p className="mt-3 text-pretty leading-relaxed text-neutral-300">
                Breaking a business problem into a <strong className="font-medium text-bone">question</strong> and a{" "}
                <strong className="font-medium text-bone">structured solution</strong> is the first step to building a
                robust product. It moves you from &ldquo;I have an idea&rdquo; to &ldquo;I have a plan that works.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>

        {next && (
          <Link
            to={`/case-studies/${catMeta.slug}/${next.id}`}
            data-cursor="Next"
            className="group relative mt-24 block overflow-hidden border-t border-white/[0.07]"
          >
            <span
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent/10 transition-transform duration-700 ease-expo group-hover:scale-y-100"
              aria-hidden
            />
            <div className="container-site flex items-center justify-between gap-8 py-16 md:py-24">
              <div className="min-w-0">
                <p className="label">Next in {catMeta.label}</p>
                <Html
                  as="p"
                  html={next.title}
                  className="display mt-4 text-balance text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] transition-transform duration-700 ease-expo group-hover:translate-x-2"
                />
              </div>
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 text-bone transition-all duration-500 ease-expo group-hover:border-accent group-hover:bg-accent group-hover:text-ink md:h-24 md:w-24">
                <FiArrowRight className="h-6 w-6 md:h-7 md:w-7" />
              </span>
            </div>
          </Link>
        )}
      </article>
    </div>
  );
};

export default CaseStudyDetail;
