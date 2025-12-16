import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleScroll = (id) => {
    if (!isHome) {
      // If not on home, we just follow the link to home with hash
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="mb-10 flex items-center justify-between py-6 container mx-auto px-8">
      {/* Name / Brand */}
      <div className="flex flex-shrink-0 items-center">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary hover:text-purple-600 transition-colors">
          Arsalaan Mohammed <span className="font-light text-secondary hidden sm:inline">| Product Manager</span>
        </Link>
      </div>

      {/* Navigation Text Links */}
      <div className="flex gap-8 text-sm font-medium">
        <Link
          to="/work"
          className={`transition-colors hover:text-purple-600 ${location.pathname === '/work' ? 'text-purple-600 font-bold' : 'text-neutral-600'}`}
        >
          Work
        </Link>

        <Link
          to="/blog"
          className={`transition-colors hover:text-purple-600 ${location.pathname.startsWith('/blog') ? 'text-purple-600 font-bold' : 'text-neutral-600'}`}
        >
          Blog
        </Link>

        {/* For About and Contact, we want to scroll on Home, or go to Home#section on other pages */}
        {isHome ? (
          <>
            <button onClick={() => handleScroll('about')} className="text-neutral-600 hover:text-purple-600 transition-colors">
              About
            </button>
            <button onClick={() => handleScroll('contact')} className="text-neutral-600 hover:text-purple-600 transition-colors">
              Contact
            </button>
          </>
        ) : (
          <>
            <Link to="/#about" className="text-neutral-600 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/#contact" className="text-neutral-600 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
