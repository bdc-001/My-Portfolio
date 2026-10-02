import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: "expo.out", duration: 0.8 });

/** Shared motion language: one curve, one duration scale, one stagger. */
export const EASE = [0.16, 1, 0.3, 1];
export const DURATION = { fast: 0.4, base: 0.8, slow: 1.2 };
export const STAGGER = 0.04;

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

const matches = (query) => typeof window !== "undefined" && window.matchMedia(query).matches;

export const prefersReducedMotion = () => !matches(MOTION_OK);
export const hasFinePointer = () => matches(FINE_POINTER);
export const isSmallScreen = () => matches("(max-width: 767px)");

/**
 * Runs `setup` once the element is within half a viewport of the fold, so text splitting and
 * tween creation for below-the-fold content stays off the main thread during page load.
 */
export function whenNear(element, setup) {
  return ScrollTrigger.create({ trigger: element, start: "top bottom+=50%", end: "max", once: true, onEnter: setup });
}

let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/** Scrolls to a y position or element, through Lenis when smooth scrolling is active. */
export function scrollToTarget(target, { immediate = false, offset = -24 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, force: true, duration: 1.2 });
    return;
  }
  const behavior = immediate ? "instant" : "smooth";
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
  } else if (target) {
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior });
  }
}

export function setScrollLocked(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
