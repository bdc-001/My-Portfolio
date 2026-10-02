import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { WORK } from "../constants";
import { getPost } from "../lib/posts";
import BlogCard from "../components/BlogCard";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { BrowserFrame, PipelineVisual } from "../components/ProjectVisuals";
import GlowCard from "../components/motion/GlowCard";
import SplitReveal from "../components/motion/SplitReveal";
import ScrollLitText from "../components/motion/ScrollLitText";
import CountUp from "../components/motion/CountUp";
import ParallaxImage from "../components/motion/ParallaxImage";
import NotFound from "./NotFound";

const Chapter = ({ label, index, children }) => (
  <section className="grid gap-6 border-t border-white/[0.07] py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
    <div className="lg:col-span-3">
      <div className="lg:sticky lg:top-28">
        <p className="font-mono text-xs text-neutral-600">{String(index).padStart(2, "0")}</p>
        <p className="mt-2 text-sm font-medium text-neutral-300">{label}</p>
      </div>
    </div>
    <div className="lg:col-span-8 lg:col-start-5">{children}</div>
  </section>
);

const WorkDetail = () => {
  const { slug } = useParams();
  const index = WORK.findIndex((item) => item.slug === slug);

  if (index === -1) return <NotFound title="I haven't built that one yet." backTo="/work" backLabel="All work" />;

  const item = WORK[index];
  const next = WORK[(index + 1) % WORK.length];
  const related = item.relatedPosts.map(getPost).filter(Boolean);
  const isLogo = item.imageTreatment === "invert";

  return (
    <>
      <SEO
        title={`${item.title} | Work`}
        description={`${item.subtitle} ${item.solution}`.slice(0, 300)}
      />

      <article className="relative isolate">
        <div className="aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px]" aria-hidden />

        <header className="container-site pt-32 md:pt-44">
          <Reveal y={0}>
            <Link to="/work" className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-bone">
              <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              All work
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-10">
            <p className="label">
              {item.category} · {item.type === "experience" ? "Experience" : "Project"}
            </p>
          </Reveal>
          <SplitReveal
            as="h1"
            trigger="load"
            delay={0.1}
            className="display mt-6 text-pretty text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.95]"
          >
            {item.title}
          </SplitReveal>

          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <Reveal as="p" delay={0.25} className="text-pretty text-xl leading-relaxed text-neutral-300 md:col-span-7 md:text-2xl">
              {item.subtitle}
            </Reveal>
            <Reveal delay={0.35} className="self-end md:col-span-4 md:col-start-9">
              <dl className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="label">Role</dt>
                  <dd className="mt-1.5 text-bone">{item.role}</dd>
                </div>
                <div>
                  <dt className="label">{item.period ? "When" : "Type"}</dt>
                  <dd className="mt-1.5 text-bone">{item.period ?? (item.type === "experience" ? "Full-time" : "Project")}</dd>
                </div>
              </dl>
              {(item.live || item.repo) && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {item.live && (
                    <a href={item.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Try it live
                      <FiArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {item.repo && (
                    <a href={item.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      <FaGithub className="h-4 w-4" aria-hidden />
                      Source
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </header>

        <div className="container-site mt-14">
          {item.type === "project" && item.pipeline && item.image ? (
            <Reveal className="group">
              <BrowserFrame src={item.image} alt={`${item.title} interface`} url={item.live} label={item.title} eager />
            </Reveal>
          ) : !item.image && item.pipeline ? (
            <Reveal className="group">
              <PipelineVisual steps={item.pipeline} className="aspect-[16/10] !rounded-card md:aspect-[21/9]" />
            </Reveal>
          ) : isLogo ? (
            <Reveal className="flex aspect-[16/10] items-center justify-center rounded-card bg-ink-800 ring-1 ring-inset ring-white/[0.06] md:aspect-[21/9]">
              <img src={item.image} alt={item.title} className="img-invert max-h-[45%] max-w-[45%] object-contain opacity-80" />
            </Reveal>
          ) : (
            <ParallaxImage
              src={item.image}
              alt={item.title}
              reveal="load"
              eager
              amount={8}
              className="aspect-[16/10] rounded-card bg-ink-800 md:aspect-[21/9]"
              imgClassName="img-tone hover:grayscale-0"
            />
          )}
        </div>

        <div className="container-site mt-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {item.impact.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 0.06}>
                <GlowCard className="flex h-full flex-col-reverse justify-between gap-8 p-6 md:p-8">
                  <p className="text-sm text-neutral-500">{metric.label}</p>
                  <p className="display text-5xl leading-none md:text-6xl">
                    <CountUp value={metric.value} />
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <Chapter label="The problem" index={1}>
              <ScrollLitText className="display text-pretty text-[1.9rem] leading-[1.28] tracking-[-0.025em] md:text-[2.4rem]">
                {item.problem}
              </ScrollLitText>
            </Chapter>
            <Chapter label="What I did" index={2}>
              <ScrollLitText dim={0.3} className="text-pretty text-lg leading-[1.8] text-neutral-200 md:text-xl">
                {item.solution}
              </ScrollLitText>
            </Chapter>
            {item.pipeline && (
              <Chapter label="How it flows" index={3}>
                <Reveal as="ol" className="grid gap-2 sm:grid-cols-2">
                  {item.pipeline.map((step, i) => (
                    <li key={step} className="flex items-center gap-4 rounded-2xl bg-white/[0.03] px-5 py-4 ring-1 ring-inset ring-white/[0.06]">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-bone">{step}</span>
                    </li>
                  ))}
                </Reveal>
              </Chapter>
            )}
            <Chapter label="Toolkit" index={item.pipeline ? 4 : 3}>
              <Reveal as="ul" className="flex flex-wrap gap-2">
                {item.stack.map((tool) => (
                  <li key={tool} className="chip !px-4 !py-1.5 !text-sm">
                    {tool}
                  </li>
                ))}
              </Reveal>
            </Chapter>
          </div>

          {related.length > 0 && (
            <section className="border-t border-white/[0.07] py-14 md:py-20">
              <p className="label">Related writing</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {related.map((post) => (
                  <Reveal key={post.slug} className="h-full">
                    <BlogCard post={post} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </div>

        <Link to={`/work/${next.slug}`} className="group relative mt-8 block overflow-hidden border-t border-white/[0.07]" data-cursor="Next">
          <span
            className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-y-100"
            aria-hidden
          />
          <div className="container-site relative flex items-end justify-between gap-6 py-16 md:py-24">
            <div>
              <p className="label transition-colors duration-500 group-hover:text-ink/60">Next project</p>
              <p className="display mt-4 text-[clamp(2.6rem,7vw,6rem)] leading-none transition-[color,transform] duration-700 ease-expo group-hover:translate-x-2 group-hover:text-ink">
                {next.title}
              </p>
            </div>
            <span className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 text-bone transition-colors duration-500 group-hover:border-ink group-hover:bg-ink md:h-20 md:w-20">
              <FiArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45 md:h-6 md:w-6" />
            </span>
          </div>
        </Link>
      </article>
    </>
  );
};

export default WorkDetail;
