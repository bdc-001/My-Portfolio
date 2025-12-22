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
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-md border-b border-neutral-100 py-3 md:py-4 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Name / Brand */}
        <div className="flex flex-shrink-0 items-center">
          <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight text-primary hover:text-purple-600 transition-colors">
            Arsalaan Mohammed <span className="text-secondary hidden sm:inline">| Product Manager</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {navLinks}

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

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
