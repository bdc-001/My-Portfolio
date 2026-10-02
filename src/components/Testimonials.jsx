import { useRef } from "react";
import { TESTIMONIALS } from "../constants";
import { MOTION_OK, gsap, useGSAP } from "../lib/motion";
import SectionHeader from "./SectionHeader";
import GlowCard from "./motion/GlowCard";
import ScrollLitText from "./motion/ScrollLitText";

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

const AVATAR_TINTS = ["from-periwinkle to-violet", "from-coral to-[#ffc6a8]"];

const Testimonials = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        gsap.utils.toArray("[data-float]", root.current).forEach((card, i) => {
          const travel = i % 2 === 0 ? 30 : -30;
          gsap.fromTo(
            card,
            { y: travel },
            { y: -travel, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="testimonials" ref={root} className="container-site py-20 md:py-28">
      <SectionHeader
        index="06"
        label="Kind words"
        title={
          <>
            From people <span className="text-neutral-500">I&apos;ve worked with.</span>
          </>
        }
        description="What it's like to work alongside me, in the words of people who have."
      />

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {TESTIMONIALS.map((testimonial, i) => (
          <div key={testimonial.author} data-float className="will-change-transform">
            <GlowCard as="figure" className="flex h-full flex-col justify-between gap-12 p-8 md:p-10">
              <ScrollLitText
                as="blockquote"
                dim={0.22}
                start="top 85%"
                end="bottom 60%"
                className="display text-pretty text-[1.45rem] leading-[1.38] tracking-[-0.02em] md:text-[1.7rem]"
              >
                &ldquo;{testimonial.text}&rdquo;
              </ScrollLitText>
              <figcaption className="flex items-center gap-4">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-ink ${AVATAR_TINTS[i % AVATAR_TINTS.length]}`}
                  aria-hidden
                >
                  {initials(testimonial.author)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-bone">{testimonial.author}</span>
                  <span className="block text-sm text-neutral-500">{testimonial.role}</span>
                </span>
              </figcaption>
            </GlowCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
