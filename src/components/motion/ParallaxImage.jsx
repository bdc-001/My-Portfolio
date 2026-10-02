import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "../../lib/motion";

/**
 * Image that drifts inside its frame while scrolling. `reveal` adds an expanding mask,
 * played on load ("load") or when the frame enters the viewport ("scroll").
 */
const ParallaxImage = ({
  src,
  alt = "",
  amount = 7,
  reveal = false,
  eager = false,
  className = "",
  imgClassName = "",
  children,
}) => {
  const frame = useRef(null);
  const img = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(img.current, { scale: 1 + (amount * 2.4) / 100 });
        gsap.fromTo(
          img.current,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        if (reveal) {
          gsap.fromTo(
            frame.current,
            { clipPath: "inset(18% 8% 18% 8% round 28px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 22px)",
              duration: 1.5,
              ease: "expo.inOut",
              delay: reveal === "load" ? 0.35 : 0,
              scrollTrigger: reveal === "scroll" ? { trigger: frame.current, start: "top 85%", once: true } : undefined,
            }
          );
        }
      });
    },
    { scope: frame }
  );

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <img
        ref={img}
        src={src}
        alt={alt}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
      />
      {children}
    </div>
  );
};

export default ParallaxImage;
