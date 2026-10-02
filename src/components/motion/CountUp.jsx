import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "../../lib/motion";

const NUMERIC = /^(.*?)(\d+(?:\.\d+)?)(.*)$/;

/** Counts the numeric part of values like "$1.7M", "65%" or "30+" up from zero on first view. */
const CountUp = ({ value, duration = 1.8, className = "" }) => {
  const ref = useRef(null);
  const text = String(value);

  useGSAP(
    () => {
      const match = text.match(NUMERIC);
      if (!match) return;
      const [, prefix, number, suffix] = match;
      const target = parseFloat(number);
      const decimals = (number.split(".")[1] ?? "").length;
      const padTo = /^0\d+$/.test(number) ? number.length : 0;
      const el = ref.current;
      const render = (n) => {
        el.textContent = `${prefix}${n.toFixed(decimals).padStart(padTo, "0")}${suffix}`;
      };

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const counter = { n: 0 };
        render(0);
        gsap.to(counter, {
          n: target,
          duration,
          ease: "expo.out",
          onUpdate: () => render(counter.n),
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
        return () => {
          el.textContent = text;
        };
      });
    },
    { scope: ref }
  );

  return (
    <span key={text} className={`tabular-nums ${className}`}>
      <span ref={ref} aria-hidden>
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
};

export default CountUp;
