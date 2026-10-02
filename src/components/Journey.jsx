import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { JOURNEY } from "../constants";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "../lib/motion";
import SplitReveal from "./motion/SplitReveal";
import Reveal from "./Reveal";
import { SECTION_TITLE, SectionRule } from "./SectionHeader";

const Journey = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray("[data-step]", root.current);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 55%", end: "bottom 55%", scrub: 0.4 },
          }
        );
        steps.forEach((step) => {
          ScrollTrigger.create({ trigger: step, start: "top 56%", toggleClass: "is-lit" });
          gsap.from(step.querySelector("[data-step-body]"), {
            x: 24,
            opacity: 0.15,
            duration: 1,
            scrollTrigger: { trigger: step, start: "top 70%", once: true },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        steps.forEach((step) => step.classList.add("is-lit"));
      });
    },
    { scope: root }
  );

  return (
    <section id="journey" ref={root} className="container-site py-20 md:py-28">
      <SectionRule index="03" label="Journey" meta="The long way here" />
      <div className="mt-10 grid gap-14 md:mt-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start lg:pr-8">
          <SplitReveal className={SECTION_TITLE}>
            Not a straight line. <span className="text-neutral-500">Mine, though.</span>
          </SplitReveal>
          <Reveal as="p" delay={0.1} className="mt-6 max-w-sm text-pretty leading-relaxed text-neutral-400">
            Sheltered kid, city shock, pandemic, YouTube, JEE, IIT, startup, product management, Bangalore.
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/blog/from-darjeeling-to-iit-dhanbad"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-bone"
              data-cursor="Read"
            >
              <span className="link-underline">Read the long version</span>
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <ol data-steps className="relative lg:col-span-7 lg:col-start-6">
          <span className="absolute bottom-2 left-[9px] top-2 w-px bg-white/[0.08]" aria-hidden />
          <span
            data-progress
            className="absolute bottom-2 left-[9px] top-2 w-px origin-top bg-gradient-to-b from-periwinkle via-violet to-coral"
            aria-hidden
          />
          {JOURNEY.map((step, i) => {
            const isCurrent = i === JOURNEY.length - 1;
            return (
              <li key={step.title} data-step className="group relative pb-14 pl-12 last:pb-0">
                <span
                  className={`absolute left-0 top-0.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border bg-ink transition-colors duration-500 ${
                    isCurrent ? "border-accent/60" : "border-white/20 group-[.is-lit]:border-white/60"
                  }`}
                  aria-hidden
                >
                  {isCurrent && <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />}
                  <span
                    className={`h-[7px] w-[7px] rounded-full transition-all duration-500 ${
                      isCurrent
                        ? "bg-gradient-to-br from-periwinkle to-coral shadow-[0_0_12px_rgb(var(--accent))]"
                        : "bg-white/25 group-[.is-lit]:scale-110 group-[.is-lit]:bg-bone"
                    }`}
                  />
                </span>
                <div data-step-body>
                  <p className="label transition-colors duration-500 group-[.is-lit]:text-neutral-300">{step.when}</p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.01em] text-bone md:text-[1.4rem]">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-pretty leading-relaxed text-neutral-400">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Journey;
