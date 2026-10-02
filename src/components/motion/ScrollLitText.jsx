import { useRef } from "react";
import { MOTION_OK, SplitText, gsap, useGSAP, whenNear } from "../../lib/motion";

/** Paragraph whose words brighten one by one as it scrolls through the viewport. */
const ScrollLitText = ({ as: Tag = "p", dim = 0.18, start = "top 82%", end = "bottom 55%", className, children, ...rest }) => {
  const ref = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        whenNear(
          ref.current,
          contextSafe(() =>
            SplitText.create(ref.current, {
              type: "words",
              // Words stay readable as plain spans; SplitText's default aria-label isn't permitted on <p>.
              aria: "none",
              autoSplit: true,
              onSplit: (self) =>
                gsap.fromTo(
                  self.words,
                  { opacity: dim },
                  {
                    opacity: 1,
                    ease: "none",
                    stagger: 0.1,
                    scrollTrigger: { trigger: ref.current, start, end, scrub: 0.6 },
                  }
                ),
            })
          )
        );
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

export default ScrollLitText;
