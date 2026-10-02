import { useRef } from "react";
import { MOTION_OK, STAGGER, SplitText, gsap, useGSAP } from "../../lib/motion";

/**
 * Text that rises out of per-line masks, word by word (or letter by letter with `by="chars"`).
 * `trigger="load"` plays immediately (page headers); `trigger="scroll"` waits for the viewport.
 */
const SplitReveal = ({
  as: Tag = "h2",
  by = "words",
  trigger = "scroll",
  delay = 0,
  stagger,
  className,
  children,
  ...rest
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create(ref.current, {
          type: by === "chars" ? "lines,words,chars" : "lines,words",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(by === "chars" ? self.chars : self.words, {
              yPercent: 115,
              duration: by === "chars" ? 0.9 : 1.1,
              stagger: stagger ?? (by === "chars" ? 0.012 : STAGGER),
              delay,
              scrollTrigger: trigger === "scroll" ? { trigger: ref.current, start: "top 88%", once: true } : undefined,
            }),
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default SplitReveal;
