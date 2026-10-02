import { motion } from "framer-motion";

const WIPE = [0.76, 0, 0.24, 1];

const Edge = ({ className }) => (
  <span
    className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent ${className}`}
    aria-hidden
  />
);

/**
 * Curtain transition for a routed page. Must be rendered inside a keyed child of
 * <AnimatePresence initial={false} mode="wait">: the exit panel covers the old page,
 * the enter panel (with the destination label) then wipes away from the new one.
 */
const PageTransition = ({ label, children }) => (
  <>
    {children}

    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] flex items-end bg-ink-950"
      initial={{ y: "0%" }}
      animate={{ y: "-100%", transition: { duration: 0.8, delay: 0.3, ease: WIPE } }}
      exit={{ y: "-100%" }}
    >
      <Edge className="bottom-0" />
      <motion.p
        className="display container-site pb-14 text-[clamp(3rem,10vw,8.5rem)] leading-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      >
        {label}
      </motion.p>
    </motion.div>

    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] bg-ink-950"
      initial={{ y: "100%" }}
      animate={{ y: "100%" }}
      exit={{ y: "0%", transition: { duration: 0.55, ease: WIPE } }}
    >
      <Edge className="top-0" />
    </motion.div>
  </>
);

export default PageTransition;
