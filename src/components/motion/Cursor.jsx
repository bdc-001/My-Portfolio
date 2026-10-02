import { useEffect, useRef, useState } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "../../lib/motion";

const INTERACTIVE = "a, button, [role='button'], [role='tab'], summary, label, select, [data-cursor]";

/** Soft accent glow that trails the native pointer behind the page, lighting glass surfaces from underneath. */
const Cursor = () => {
  const glow = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(hasFinePointer() && !prefersReducedMotion());
    update();
    pointer.addEventListener("change", update);
    return () => pointer.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const x = gsap.quickTo(glow.current, "x", { duration: 0.7, ease: "power3.out" });
    const y = gsap.quickTo(glow.current, "y", { duration: 0.7, ease: "power3.out" });

    const move = (event) => {
      x(event.clientX);
      y(event.clientY);
      setVisible(true);
    };
    const over = (event) => setActive(Boolean(event.target.closest?.(INTERACTIVE)));
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div ref={glow} className="absolute left-0 top-0">
        <div
          className={`h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.2),rgb(var(--accent)/0.06)_55%,transparent)] transition-[opacity,transform] duration-700 ease-expo ${
            visible ? "opacity-100" : "opacity-0"
          } ${active ? "scale-[1.2]" : "scale-100"}`}
        />
      </div>
    </div>
  );
};

export default Cursor;
