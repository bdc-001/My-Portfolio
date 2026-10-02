import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SEO from "../components/SEO";
import Magnetic from "../components/motion/Magnetic";
import SplitReveal from "../components/motion/SplitReveal";

const NotFound = ({
  title = "Lost in the mist.",
  note = "Like a monsoon morning in Darjeeling, this page has vanished into the fog. The road home is still clear, though.",
  backTo = "/",
  backLabel = "Back home",
}) => (
  <>
    <SEO title="Not found | Arsalaan Mohammed" noindex />
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden" aria-labelledby="not-found-title">
      <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="grid-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px]" aria-hidden />

      <div className="container-site flex flex-col items-center pb-20 pt-32 text-center">
        <p className="label">404 · Page not found</p>

        <SplitReveal
          as="h1"
          id="not-found-title"
          trigger="load"
          delay={0.1}
          className="display mt-8 max-w-4xl text-balance text-[clamp(3rem,9vw,7.5rem)] leading-[0.98]"
        >
          {title}
        </SplitReveal>

        <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-neutral-400">{note}</p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.25}>
            <Link to={backTo} className="btn-primary group !px-6 !py-3">
              <FiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {backLabel}
            </Link>
          </Magnetic>
          {backTo !== "/blog" && (
            <Link to="/blog" className="btn-ghost group !px-6 !py-3">
              Read the blog
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
