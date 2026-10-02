import Hero from "../components/Hero";
import AboutStory from "../components/AboutStory";
import Now from "../components/Now";
import Journey from "../components/Journey";
import FeaturedWriting from "../components/FeaturedWriting";
import OffTheClock from "../components/OffTheClock";
import Testimonials from "../components/Testimonials";
import SEO from "../components/SEO";

const Home = () => (
  <>
    <SEO />
    <div id="about">
      <Hero />
      <AboutStory />
    </div>
    <Now />
    <Journey />
    <FeaturedWriting />
    <OffTheClock />
    <Testimonials />
  </>
);

export default Home;
