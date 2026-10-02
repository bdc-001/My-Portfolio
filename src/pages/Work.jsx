import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { CONTACT, WORK } from "../constants";
import { MOTION_OK, gsap, useGSAP } from "../lib/motion";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import SectionHeader from "../components/SectionHeader";
import { BrowserFrame, PipelineVisual } from "../components/ProjectVisuals";
import GlowCard from "../components/motion/GlowCard";
import SplitReveal from "../components/motion/SplitReveal";
import CountUp from "../components/motion/CountUp";
import ParallaxImage from "../components/motion/ParallaxImage";

const EXPERIENCE = WORK.filter((item) => item.type === "experience");
const PROJECTS = WORK.filter((item) => item.type === "project");
const FLAGSHIP = PROJECTS.find((item) => item.track === "flagship");
const BUILDS = PROJECTS.filter((item) => item.track === "build");
const EARLIER = PROJECTS.filter((item) => item.track === "earlier");

const COUNTERS = [
  { value: String(EXPERIENCE.length).padStart(2, "0"), label: "Product roles" },
  { value: String(PROJECTS.length).padStart(2, "0"), label: "Projects shipped" },
  { value: "65%", label: "LLM infra cost cut" },
  { value: "$1.7M", label: "Renewals influenced" },
];

const GithubButton = ({ href, compact = false }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={compact ? "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-white/30 hover:text-bone" : "btn-ghost"}
    aria-label={compact ? "Source code on GitHub" : undefined}
  >
    <FaGithub className="h-4 w-4" aria-hidden />
    {!compact && "Source"}
  </a>
);

const ExperienceStack = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const cards = gsap.utils.toArray("[data-stack-card]", root.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const scroll = { trigger: next, start: "top bottom", end: "top 20%", scrub: true };
          gsap.to(card, { scale: 0.92, ease: "none", scrollTrigger: scroll });
          gsap.to(card.querySelector("[data-dim]"), { opacity: 0.55, ease: "none", scrollTrigger: scroll });
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      {EXPERIENCE.map((item, i) => (
        <div key={item.slug} className="pb-4 md:sticky md:pb-10" style={{ top: `calc(6.5rem + ${i * 18}px)` }}>
          <div data-stack-card className="relative origin-top will-change-transform">
            <GlowCard
              as={Link}
              to={`/work/${item.slug}`}
              data-cursor="View"
              className="group grid overflow-hidden p-2.5 md:min-h-[520px] md:grid-cols-12"
            >
              <ParallaxImage
                src={item.image}
                alt={item.title}
                reveal="scroll"
                amount={5}
                className="aspect-[4/3] rounded-[16px] bg-ink-700 md:col-span-6 md:aspect-auto"
                imgClassName="img-tone"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />              </ParallaxImage>

              <div className="flex flex-col p-5 md:col-span-6 md:p-10">
                <p className="label">{item.category}</p>
                <h3 className="display mt-4 text-5xl leading-none md:text-[4rem]">{item.title}</h3>
                <p className="mt-3 text-sm text-neutral-500">{item.role}</p>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-neutral-300">{item.subtitle}</p>

                <dl className="mt-8 grid grid-cols-3 gap-3 md:mt-auto">
                  {item.impact.map((metric) => (
                    <div key={metric.label} className="flex flex-col-reverse rounded-2xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.05]">
                      <dt className="mt-2 text-xs leading-snug text-neutral-500">{metric.label}</dt>
                      <dd className="display text-2xl leading-none md:text-3xl">
                        <CountUp value={metric.value} />
                      </dd>
                    </div>
                  ))}
                </dl>

                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-bone">
                  Read the full story
                  <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </GlowCard>
            <div data-dim className="pointer-events-none absolute inset-0 rounded-card bg-ink opacity-0" aria-hidden />
          </div>
        </div>
      ))}
    </div>
  );
};

const FlagshipProject = ({ item }) => (
  <GlowCard className="group grid gap-8 overflow-hidden p-2.5 lg:grid-cols-12 lg:gap-4">
    <div className="flex flex-col p-5 md:p-8 lg:col-span-5 lg:py-10">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[12px] font-medium text-accent">Flagship</span>
        <span className="label">{item.category}</span>
      </div>
      <h3 className="display mt-6 text-5xl leading-none md:text-[4rem]">{item.title}</h3>
      <p className="mt-5 text-pretty text-lg leading-relaxed text-neutral-300">{item.subtitle}</p>

      <ol className="mt-8 grid grid-cols-2 gap-2">
        {item.pipeline.map((step, i) => (
          <li key={step} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] px-3 py-2.5 text-[13px] text-neutral-300 ring-1 ring-inset ring-white/[0.05]">
            <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {item.stack.slice(0, 6).map((tool) => (
          <li key={tool} className="chip">
            {tool}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-2 lg:mt-auto lg:pt-10">
        {item.live && (
          <a href={item.live} target="_blank" rel="noopener noreferrer" className="btn-primary group/live">
            Try it live
            <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
          </a>
        )}
        {item.repo && <GithubButton href={item.repo} />}
        <Link to={`/work/${item.slug}`} className="group/more ml-1 inline-flex items-center gap-1.5 px-2 text-sm font-medium text-neutral-300 hover:text-bone">
          How it works
          <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/more:translate-x-0.5" />
        </Link>
      </div>
    </div>

    <div className="lg:col-span-7">
      <BrowserFrame src={item.image} alt={`${item.title} trip planner`} url={item.live} className="h-full" />
    </div>
  </GlowCard>
);

const BuildCard = ({ item }) => (
  <GlowCard className="group relative flex h-full flex-col p-2.5">
    {item.image ? (
      <BrowserFrame src={item.image} alt={`${item.title} interface`} url={item.live} label={item.title} />
    ) : (
      <PipelineVisual steps={item.pipeline} className="min-h-[236px]" />
    )}
    <div className="flex flex-1 flex-col px-3 pb-3 pt-6 md:px-4 md:pb-4">
      <p className="label">{item.category}</p>
      <h3 className="display mt-3 text-[2rem] leading-none">
        <Link to={`/work/${item.slug}`} className="after:absolute after:inset-0 after:rounded-card" data-cursor="View">
          {item.title}
        </Link>
      </h3>
      <p className="mt-4 text-pretty leading-relaxed text-neutral-400">{item.subtitle}</p>
      <ul className="mb-6 mt-5 flex flex-wrap gap-1.5">
        {item.stack.slice(0, 4).map((tool) => (
          <li key={tool} className="chip">
            {tool}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-5">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-bone">
          How it works
          <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {item.repo && <GithubButton href={item.repo} compact />}
      </div>
    </div>
  </GlowCard>
);

const EarlierCard = ({ item }) => {
  const isLogo = item.imageTreatment === "invert";
  return (
    <GlowCard as={Link} to={`/work/${item.slug}`} data-cursor="View" className="group flex h-full flex-col p-2.5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-ink-800 ring-1 ring-inset ring-white/[0.06]">
        <img
          src={item.image}
          alt={item.title}
          className={`h-full w-full transition-transform duration-700 ease-expo group-hover:scale-[1.04] ${
            isLogo ? "img-invert object-contain p-12 opacity-75" : "img-mono object-cover"
          }`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label">{item.category}</p>
            <h3 className="display mt-2.5 text-[1.6rem] leading-tight">{item.title}</h3>
          </div>
          <FiArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
        </div>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-neutral-400">{item.subtitle}</p>
      </div>
    </GlowCard>
  );
};

const Work = () => (
  <>
    <SEO
      title="Work by Arsalaan Mohammed, Product Manager"
      description="Product roles at Convin and Aspire, plus AI products I've built and shipped: Stayora, Product OS, QuanTum and AccessShield."
    />

    <section className="relative isolate overflow-hidden">
      <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="grid-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]" aria-hidden />
      <div className="container-site pt-36 md:pt-48">
        <SplitReveal
          as="h1"
          trigger="load"
          delay={0.15}
          className="display max-w-5xl text-pretty text-[clamp(2.8rem,6.6vw,5.5rem)] leading-[1.0]"
        >
          Things I&apos;ve built, shipped, <span className="text-neutral-500">and learned from.</span>
        </SplitReveal>
        <Reveal as="p" delay={0.35} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-neutral-400 md:text-xl">
          How I find the real problem, shape the strategy, and ship something that moves a number. Every piece has its own
          story.
        </Reveal>

        <Reveal delay={0.45} className="mt-14 grid grid-cols-2 border-y border-white/[0.07] md:grid-cols-4">
          {COUNTERS.map((counter, i) => (
            <div
              key={counter.label}
              className={`border-white/[0.07] py-6 md:py-8 ${i % 2 ? "border-l pl-6" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${
                i > 0 ? "md:border-l md:pl-6" : ""
              }`}
            >
              <p className="display text-4xl leading-none md:text-5xl">
                <CountUp value={counter.value} />
              </p>
              <p className="mt-2 text-sm text-neutral-500">{counter.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>

    <section className="container-site mt-24 md:mt-32">
      <SectionHeader
        index="01"
        label="Experience"
        meta={`${EXPERIENCE.length} roles`}
        title={
          <>
            Where I&apos;ve done <span className="text-neutral-500">the work.</span>
          </>
        }
        description="From fintech payment rails to enterprise AI: the problems I owned, what I shipped, and what moved."
      />
      <ExperienceStack />
    </section>

    <section className="container-site mt-20 pb-12 md:mt-28">
      <SectionHeader
        index="02"
        label="Projects"
        meta={`${PROJECTS.length} shipped`}
        title={
          <>
            Things I build <span className="text-neutral-500">to stay sharp.</span>
          </>
        }
        description="Products I've designed, coded and shipped end to end, mostly AI agents with a human in the loop. All of it is on GitHub."
        action={
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FaGithub className="h-4 w-4" aria-hidden />
            github.com/bdc-001
          </a>
        }
      />

      {FLAGSHIP && (
        <Reveal>
          <FlagshipProject item={FLAGSHIP} />
        </Reveal>
      )}

      <p className="label mb-5 mt-16">AI builds</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {BUILDS.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.06} className="h-full">
            <BuildCard item={item} />
          </Reveal>
        ))}
      </div>

      <p className="label mb-5 mt-16">Earlier projects</p>
      <div className="grid gap-4 md:grid-cols-3">
        {EARLIER.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.06} className="h-full">
            <EarlierCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default Work;
