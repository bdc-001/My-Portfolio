import { useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion, useGSAP } from "../../lib/motion";

/** Pulls its child toward the pointer while hovered, then springs back. */
const Magnetic = ({ strength = 0.35, className = "", children }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!hasFinePointer() || prefersReducedMotion()) return undefined;
      const el = ref.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.45)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.45)" });
      let rect = null;

      const enter = () => {
        gsap.set(el, { x: 0, y: 0 });
        rect = el.getBoundingClientRect();
      };
      const move = (event) => {
        if (!rect) rect = el.getBoundingClientRect();
        xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const leave = () => {
        rect = null;
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
};

export default Magnetic;
