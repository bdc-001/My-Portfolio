import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import SEO from "./components/SEO";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyCategory = lazy(() => import("./pages/CaseStudyCategory"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));

const App = () => {
  return (
    <Router>
      <SEO />
      <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="fixed top-0 -z-10 h-full w-full"></div>

        <Navbar />

        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-primary">Loading...</div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:category" element={<CaseStudyCategory />} />
            <Route path="/case-studies/:category/:id" element={<CaseStudyDetail />} />
          </Routes>
        </Suspense>

        <div className="container mx-auto px-8">
          <Contact />
        </div>
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
