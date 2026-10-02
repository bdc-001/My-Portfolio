import { motion, useSpring } from "framer-motion";
import { ABOUT_FACTS, ABOUT_PARAGRAPHS, ABOUT_STATS } from "../constants";
import portrait from "../assets/portrait-640.webp";
import { prefersReducedMotion } from "../lib/motion";
import ScrollLitText from "./motion/ScrollLitText";
import GlowCard from "./motion/GlowCard";
import CountUp from "./motion/CountUp";
import Reveal from "./Reveal";
import { SectionRule } from "./SectionHeader";

const TILT = { stiffness: 160, damping: 18, mass: 0.6 };

const TiltPortrait = () => {
  const rotateX = useSpring(0, TILT);
  const rotateY = useSpring(0, TILT);

  const onMove = (event) => {
    if (prefersReducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.figure
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative overflow-hidden rounded-card bg-ink-800 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
    >
      <img
        src={portrait}
        alt="Arsalaan Mohammed in the studio"
        className="img-mono aspect-[4/5] w-full object-cover object-[50%_20%] group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
        width="640"
        height="800"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-[13px]">
        <span className="text-bone">Arsalaan Mohammed</span>
        <span className="text-neutral-400">Bangalore, IN</span>
      </figcaption>
    </motion.figure>
  );
};

const AboutStory = () => {
  const [lead, ...rest] = ABOUT_PARAGRAPHS;

  return (
    <section className="container-site relative pb-12 pt-24 md:pb-16 md:pt-32" aria-labelledby="about-heading">
      <SectionRule index="01" label="About" meta="Darjeeling → Dhanbad → Bangalore" />
      <h2 id="about-heading" className="sr-only">
        About Arsalaan
      </h2>
      <ScrollLitText className="display mt-12 max-w-5xl md:mt-16 text-pretty text-[clamp(1.7rem,3.5vw,2.85rem)] leading-[1.24] tracking-[-0.025em]">
        {lead}
      </ScrollLitText>

      <div className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-sm lg:sticky lg:top-28 lg:mx-0 lg:max-w-[340px]">
            <Reveal>
              <TiltPortrait />
            </Reveal>
            <Reveal as="dl" delay={0.1} className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {ABOUT_FACTS.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3.5 text-sm">
                  <dt className="text-neutral-500">{fact.label}</dt>
                  <dd className="text-right text-neutral-200">{fact.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <div className="space-y-7">
            {rest.map((paragraph, i) => (
              <Reveal as="p" key={i} delay={i * 0.05} className="text-pretty text-lg leading-[1.75] text-neutral-300 md:text-xl md:leading-[1.7]">
                {paragraph}
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3">
            {ABOUT_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={0.06 * i}>
                <GlowCard className="flex h-full flex-col-reverse justify-between gap-6 p-6 md:p-7">
                  <p className="text-sm leading-snug text-neutral-500">{stat.label}</p>
                  <p className="display text-[2.6rem] leading-none md:text-[3.25rem]">
                    <CountUp value={stat.value} />
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
