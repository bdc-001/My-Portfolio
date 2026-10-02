import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import AmbientField from "./components/AmbientField";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import SmoothScroll from "./components/motion/SmoothScroll";
import Cursor from "./components/motion/Cursor";
import PageTransition from "./components/motion/PageTransition";
import { ScrollTrigger, scrollToTarget } from "./lib/motion";
import { accentFor, routeLabel } from "./lib/routes";

const loadHome = () => import("./pages/Home");
const loadWork = () => import("./pages/Work");
const loadWorkDetail = () => import("./pages/WorkDetail");
const loadBlog = () => import("./pages/Blog");
const loadBlogPost = () => import("./pages/BlogPost");
const loadCaseStudies = () => import("./pages/CaseStudies");
const loadCaseStudyCategory = () => import("./pages/CaseStudyCategory");
const loadCaseStudyDetail = () => import("./pages/CaseStudyDetail");

const Home = lazy(loadHome);
const Work = lazy(loadWork);
const WorkDetail = lazy(loadWorkDetail);
const Blog = lazy(loadBlog);
const BlogPost = lazy(loadBlogPost);
const CaseStudies = lazy(loadCaseStudies);
const CaseStudyCategory = lazy(loadCaseStudyCategory);
const CaseStudyDetail = lazy(loadCaseStudyDetail);
const NotFound = lazy(() => import("./pages/NotFound"));

const PREFETCH = [loadHome, loadWork, loadWorkDetail, loadBlog, loadBlogPost, loadCaseStudies];

const scrollToHash = (hash) => {
  let attempts = 0;
  const find = () => {
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) scrollToTarget(target);
    else if (attempts++ < 40) setTimeout(find, 50);
  };
  find();
};

const RefreshOnMount = () => {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, []);
  return null;
};

const PageFallback = () => (
  <div className="flex min-h-[100svh] items-center justify-center">
    <span className="h-px w-16 animate-pulse bg-white/30" aria-label="Loading" />
  </div>
);

const Shell = () => {
  const location = useLocation();
  const latest = useRef(location);
  const previousPath = useRef(location.pathname);
  latest.current = location;

  const accent = accentFor(location.pathname);
  useEffect(() => {
    if (accent) document.documentElement.dataset.accent = accent;
    else delete document.documentElement.dataset.accent;
  }, [accent]);

  // Same-page hash links scroll immediately; cross-page navigation settles in onExitComplete.
  useEffect(() => {
    if (previousPath.current === location.pathname && location.hash) scrollToHash(location.hash);
    previousPath.current = location.pathname;
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 1500));
    const id = idle(() => PREFETCH.forEach((load) => load().catch(() => {})));
    return () => (window.cancelIdleCallback ?? clearTimeout)(id);
  }, []);

  const settleScroll = () => {
    const { hash } = latest.current;
    scrollToTarget(0, { immediate: true });
    if (hash) scrollToHash(hash);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip text-neutral-300 antialiased">
      <AmbientField />
      <Navbar />

      <main>
        <AnimatePresence mode="wait" initial={false} onExitComplete={settleScroll}>
          <motion.div key={location.pathname}>
            <PageTransition label={routeLabel(location.pathname)}>
              <Suspense fallback={<PageFallback />}>
                <RefreshOnMount />
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:slug" element={<WorkDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:category" element={<CaseStudyCategory />} />
                  <Route path="/case-studies/:category/:id" element={<CaseStudyDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </motion.div>
        </AnimatePresence>
      </main>

      <Contact />
      <Cursor />
      <Analytics />
    </div>
  );
};

const App = () => (
  <Router>
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Shell />
    </MotionConfig>
  </Router>
);

export default App;
