import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

const Reveal = ({ as = "div", delay = 0, y = 24, className, children, ...rest }) => {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
