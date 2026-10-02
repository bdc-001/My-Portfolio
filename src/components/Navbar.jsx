import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { CONTACT, PROFILE } from "../constants";
import { EASE, scrollToTarget, setScrollLocked } from "../lib/motion";
import Magnetic from "./motion/Magnetic";

const LINKS = [
  { to: "/", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/blog", label: "Blog" },
  { to: "/case-studies", label: "Case Studies" },
];

const useScrollChrome = () => {
  const [state, setState] = useState({ compact: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      setState((prev) => {
        const compact = y > 40;
        const hidden = y > 240 && delta > 4 ? true : delta < -4 || y <= 240 ? false : prev.hidden;
        return prev.compact === compact && prev.hidden === hidden ? prev : { compact, hidden };
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
};

const Navbar = () => {
  const location = useLocation();
  const { compact, hidden } = useScrollChrome();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    setScrollLocked(open);
    return () => setScrollLocked(false);
  }, [open]);

  const isActive = (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  const onLinkClick = (to) => {
    if (to === location.pathname && !location.hash) scrollToTarget(0);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        aria-label="Main"
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`pointer-events-auto relative mx-auto flex items-center justify-between rounded-full border transition-[max-width,background-color,border-color,padding,box-shadow] duration-500 ease-expo ${
          compact || open
            ? "max-w-[880px] border-white/10 bg-ink-800/45 py-1.5 pl-5 pr-1.5 shadow-[inset_1px_1px_0_rgba(255,255,255,0.1),0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl backdrop-saturate-150"
            : "max-w-6xl border-transparent py-2.5 pl-3 pr-2 sm:pl-5"
        }`}
      >
        <Link
          to="/"
          onClick={() => onLinkClick("/")}
          className="font-display text-[17px] font-medium tracking-[-0.02em] text-bone"
          aria-label={`${PROFILE.name}, home`}
        >
          {PROFILE.name}
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          {LINKS.map(({ to, label }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={() => onLinkClick(to)}
                aria-current={active ? "page" : undefined}
                className={`relative isolate rounded-full px-4 py-2 text-sm font-medium tracking-normal transition-colors duration-300 ${
                  active ? "text-bone" : "text-neutral-400 hover:text-bone"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                {label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-[13px]">
            Resume
          </a>
          <Magnetic strength={0.25}>
            <Link to="/#contact" className="btn-primary !px-4 !py-2 text-[13px]">
              Get in touch
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
          <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto fixed inset-0 -z-10 overflow-hidden bg-ink/75 backdrop-blur-2xl backdrop-saturate-150 md:hidden"
          >
            <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
            <div className="container-site relative flex h-full flex-col pb-10 pt-28">
              <div className="flex flex-col">
                {LINKS.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.6, ease: EASE }}
                  >
                    <Link
                      to={to}
                      onClick={() => {
                        onLinkClick(to);
                        setOpen(false);
                      }}
                      className={`flex items-center justify-between border-b border-white/[0.07] py-5 font-display text-[2.6rem] font-light leading-none tracking-[-0.035em] ${
                        isActive(to) ? "text-bone" : "text-neutral-500"
                      }`}
                    >
                      {label}
                      {isActive(to) && <span className="eyebrow-dot" aria-hidden />}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
                className="mt-auto flex gap-3"
              >
                <Link to="/#contact" className="btn-primary flex-1 justify-center">
                  Get in touch
                </Link>
                <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 justify-center">
                  Resume <FiArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
