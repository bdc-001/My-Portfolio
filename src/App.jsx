import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <Router>
      <div className="overflow-x-hidden text-primary antialiased selection:bg-neutral-100 selection:text-black bg-white bg-dots">
        <div className="fixed top-0 -z-10 h-full w-full"></div>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

        <div className="container mx-auto px-8">
          <Contact />
        </div>
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
