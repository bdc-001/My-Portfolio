import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion, setLenis } from "../../lib/motion";

const SmoothScroll = () => {
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({ lerp: 0.2, wheelMultiplier: 1.2, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

export default SmoothScroll;
