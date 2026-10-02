import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import AboutStory from "../components/AboutStory";
import Now from "../components/Now";
import Journey from "../components/Journey";
import FeaturedWriting from "../components/FeaturedWriting";
import OffTheClock from "../components/OffTheClock";
import Testimonials from "../components/Testimonials";
import SEO from "../components/SEO";

const BELOW_FOLD = [AboutStory, Now, Journey, FeaturedWriting, OffTheClock, Testimonials];

/**
 * Mounts below-the-fold sections one per task after the hero has painted, so first render
 * stays small and no single long task blocks taps on mobile. Order is top to bottom, which
 * keeps already-measured scroll triggers above each new section valid.
 */
const useProgressiveMount = (total) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= total) return undefined;
    const idle = window.requestIdleCallback;
    const id = idle ? idle(() => setCount((c) => c + 1), { timeout: 200 }) : setTimeout(() => setCount((c) => c + 1), 16);
    return () => (idle ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, [count, total]);

  return count;
};

const Home = () => {
  const mounted = useProgressiveMount(BELOW_FOLD.length);
  const [About, ...rest] = BELOW_FOLD.slice(0, mounted);

  return (
    <>
      <SEO />
      <div id="about">
        <Hero />
        {About && <About />}
      </div>
      {rest.map((Section, index) => (
        <Section key={index} />
      ))}
    </>
  );
};

export default Home;
