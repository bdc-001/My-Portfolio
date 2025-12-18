import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (id) => {
    if (!isHome) {
      // If not on home, we just follow the link to home with hash
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link
        to="/work"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`transition-colors hover:text-purple-600 ${location.pathname === '/work' ? 'text-purple-600 font-bold' : 'text-neutral-600'}`}
      >
        Work
      </Link>

      <Link
        to="/blog"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`transition-colors hover:text-purple-600 ${location.pathname.startsWith('/blog') ? 'text-purple-600 font-bold' : 'text-neutral-600'}`}
      >
        Blog
      </Link>

      {/* For About and Contact, we want to scroll on Home, or go to Home#section on other pages */}
      {isHome ? (
        <>
          <button onClick={() => handleScroll('about')} className="text-neutral-600 hover:text-purple-600 transition-colors text-left">
            About
          </button>
          <button onClick={() => handleScroll('contact')} className="text-neutral-600 hover:text-purple-600 transition-colors text-left">
            Contact
          </button>
        </>
      ) : (
        <>
          <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-600 hover:text-purple-600 transition-colors">
            About
          </Link>
          <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-600 hover:text-purple-600 transition-colors">
            Contact
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="relative mb-6 sm:mb-8 md:mb-10 flex items-center justify-between py-4 md:py-6 container mx-auto px-4 sm:px-8">
      {/* Name / Brand */}
      <div className="flex flex-shrink-0 items-center">
        <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight text-primary hover:text-purple-600 transition-colors">
          Arsalaan Mohammed <span className="font-light text-secondary hidden sm:inline">| Product Manager</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
        {navLinks}

        {/* Download Resume Button */}
        <a
          href="/Mohammed_Resume_2025.pdf"
          download="Arsalaan_Mohammed_Resume.pdf"
          className="group relative px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Resume
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-neutral-600 hover:text-purple-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-lg md:hidden z-50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm font-medium">
            {navLinks}

            {/* Download Resume Button - Mobile */}
            <a
              href="/Mohammed_Resume_2025.pdf"
              download="Arsalaan_Mohammed_Resume.pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
