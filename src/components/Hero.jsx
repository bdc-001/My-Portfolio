import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { PROFILE } from "../constants";
import { MOTION_OK, gsap, useGSAP } from "../lib/motion";
import Magnetic from "./motion/Magnetic";
import RoadmapBoard from "./RoadmapBoard";

const Hero = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Hero text rises without fading: anything starting at opacity 0 delays Largest Contentful Paint.
        gsap
          .timeline()
          .from("[data-hero-text]", { y: 22, duration: 1, stagger: 0.06 })
          .from("[data-hero-visual]", { y: 32, opacity: 0, duration: 1.2 }, 0.2);

        gsap.to("[data-hero-cue]", {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "15% top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden" aria-label="Introduction">
      <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="grid-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" aria-hidden />

      <div className="container-site grid items-center gap-16 pb-20 pt-32 md:pt-40 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-28">
        <div className="relative z-10 lg:col-span-7">
          <p data-hero-text className="label">
            {PROFILE.role}, {PROFILE.company} · Bangalore
          </p>

          <h1 data-hero-text className="display mt-7 text-pretty text-[clamp(2.6rem,4.7vw,4rem)] leading-[1.04]">
            Hi, I&apos;m Arsalaan. <span className="text-neutral-500">{PROFILE.headline}</span>
          </h1>

          <p data-hero-text className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-neutral-400">
            {PROFILE.tagline}
          </p>

          <div data-hero-text className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}>
              <Link to="/work" className="btn-primary group !px-6 !py-3">
                See my work
                <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Link to="/blog" className="btn-ghost !px-6 !py-3">
              Read the blog
            </Link>
          </div>
        </div>

        <div data-hero-visual className="relative w-full max-w-[500px] justify-self-center lg:col-span-5 lg:justify-self-end">
          <RoadmapBoard />
        </div>
      </div>

      <div
        data-hero-cue
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden flex-col items-center gap-3 lg:flex"
        aria-hidden
      >
        <span className="label">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_1.8s_cubic-bezier(0.16,1,0.3,1)_infinite] bg-bone" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
