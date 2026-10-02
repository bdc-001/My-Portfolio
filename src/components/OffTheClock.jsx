import { useRef } from "react";
import { FiArrowUpRight, FiMusic, FiTrendingUp } from "react-icons/fi";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { COUPLET, CONTACT, OFF_THE_CLOCK } from "../constants";
import { MOTION_OK, gsap, useGSAP } from "../lib/motion";
import SectionHeader from "./SectionHeader";
import GlowCard from "./motion/GlowCard";
import SplitReveal from "./motion/SplitReveal";
import Reveal from "./Reveal";

const byKey = Object.fromEntries(OFF_THE_CLOCK.map((item) => [item.key, item]));

const BARS = Array.from({ length: 36 }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)));

const Waveform = () => (
  <div className="flex h-24 items-center gap-[3px]" aria-hidden>
    {BARS.map((height, i) => (
      <span
        key={i}
        className="w-full origin-center animate-wave rounded-full bg-gradient-to-t from-violet to-periwinkle"
        style={{
          height: `${height * 100}%`,
          animationDelay: `${(i % 9) * -0.13}s`,
          animationDuration: `${0.9 + (i % 5) * 0.18}s`,
        }}
      />
    ))}
  </div>
);

const SPARK =
  "M0 78 C 18 74, 26 80, 40 70 S 64 66, 78 60 S 102 66, 116 52 S 140 50, 154 42 S 178 48, 192 34 S 218 26, 232 22 S 258 18, 280 6";

const Sparkline = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = { trigger: ref.current, start: "top 85%", once: true };
        gsap.fromTo("[data-spark-line]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", scrollTrigger: trigger });
        gsap.from("[data-spark-area]", { opacity: 0, duration: 1.2, delay: 1, scrollTrigger: trigger });
        gsap.from("[data-spark-dot]", { scale: 0, opacity: 0, transformOrigin: "center", duration: 0.6, delay: 1.8, scrollTrigger: trigger });
      });
    },
    { scope: ref }
  );

  return (
    <svg ref={ref} viewBox="0 0 280 90" className="h-24 w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fe0c3" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#7fe0c3" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path data-spark-area d={`${SPARK} L280 90 L0 90 Z`} fill="url(#spark-fill)" />
      <path
        data-spark-line
        d={SPARK}
        pathLength="1"
        strokeDasharray="1"
        fill="none"
        stroke="#7fe0c3"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle data-spark-dot cx="280" cy="6" r="3.5" fill="#7fe0c3" />
    </svg>
  );
};

const CardHead = ({ title, Icon, tint }) => (
  <div className="flex items-center justify-between">
    <h3 className="display text-[2rem] leading-none">{title}</h3>
    <span className={`flex h-10 w-10 items-center justify-center rounded-full ${tint}`}>
      <Icon className="h-[18px] w-[18px]" aria-hidden />
    </span>
  </div>
);

const OffTheClock = () => (
  <section id="off-the-clock" className="container-site py-20 md:py-28">
    <SectionHeader
      index="05"
      label="Off the clock"
      meta="Music · Markets · Content"
      title={
        <>
          Not everything <span className="text-neutral-500">is a roadmap.</span>
        </>
      }
      description="Code is logic, shayari is emotion. These are the things that keep the rest of it honest."
    />

    <div className="grid gap-3 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <GlowCard className="relative flex h-full min-h-[440px] flex-col justify-between overflow-hidden p-8 md:p-12">
          <span
            className="pointer-events-none absolute -right-2 -top-20 select-none font-display text-[20rem] font-light leading-none text-white/[0.035]"
            aria-hidden
          >
            &rdquo;
          </span>
          <p className="label">Urdu shayari</p>
          <figure className="relative mt-12">
            <SplitReveal
              as="blockquote"
              by="chars"
              className="display text-balance text-[1.9rem] leading-[1.22] md:text-[2.5rem]"
            >
              {COUPLET.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </SplitReveal>
            <Reveal as="figcaption" delay={0.5} className="mt-8 max-w-lg">
              <p className="text-pretty leading-relaxed text-neutral-400">{COUPLET.translation}</p>
              <p className="label mt-5">{COUPLET.author}</p>
            </Reveal>
          </figure>
        </GlowCard>
      </Reveal>

      <Reveal delay={0.06} className="lg:col-span-5">
        <GlowCard className="flex h-full flex-col justify-between gap-10 p-7 md:p-8">
          <CardHead title={byKey.music.title} Icon={FiMusic} tint="bg-violet/15 text-periwinkle" />
          <Waveform />
          <p className="text-pretty leading-relaxed text-neutral-400">{byKey.music.text}</p>
        </GlowCard>
      </Reveal>

      <Reveal delay={0.04} className="lg:col-span-5">
        <GlowCard className="flex h-full flex-col justify-between gap-10 p-7 md:p-8">
          <CardHead title={byKey.markets.title} Icon={FiTrendingUp} tint="bg-mint/10 text-mint" />
          <Sparkline />
          <p className="text-pretty leading-relaxed text-neutral-400">{byKey.markets.text}</p>
        </GlowCard>
      </Reveal>

      <Reveal delay={0.08} className="lg:col-span-7">
        <GlowCard className="flex h-full flex-col justify-between gap-10 p-7 md:p-8">
          <div>
            <p className="label">{byKey.content.title}</p>
            <p className="display mt-5 max-w-xl text-balance text-[1.8rem] leading-[1.18] md:text-[2.1rem]">
              {byKey.content.text}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: CONTACT.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
              { href: CONTACT.youtube, label: "YouTube", Icon: FaYoutube },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
                <Icon className="h-4 w-4" aria-hidden />
                {label}
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </GlowCard>
      </Reveal>
    </div>
  </section>
);

export default OffTheClock;
