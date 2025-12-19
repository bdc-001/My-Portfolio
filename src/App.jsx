import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { Analytics } from "@vercel/analytics/react";

const AppContent = () => {
  const location = useLocation();
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="fixed top-0 -z-10 h-full w-full"></div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>

      {/* Only show Contact section if NOT on a blog post page */}
      {!isBlogPost && (
        <div className="container mx-auto px-8">
          <Contact />
        </div>
      )}
      <Analytics />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
