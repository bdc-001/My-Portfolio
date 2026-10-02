import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import SplitReveal from "./motion/SplitReveal";
import Reveal from "./Reveal";

export const SectionRule = ({ index, label, meta, className = "" }) => (
  <div className={`relative flex items-center gap-3 pt-5 text-[13px] ${className}`}>
    <span className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" aria-hidden />
    <motion.span
      className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent/70 via-white/25 to-transparent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.4, ease: EASE }}
      aria-hidden
    />
    <span className="font-mono text-[12px] tabular-nums text-accent">{index}</span>
    <span className="h-3 w-px bg-white/15" aria-hidden />
    <span className="font-medium text-neutral-200">{label}</span>
    {meta && <span className="ml-auto text-neutral-500">{meta}</span>}
  </div>
);

export const SECTION_TITLE = "display text-balance text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.02]";

const SectionHeader = ({ index, label, meta, title, description, action, as = "h2", id, className = "mb-12 md:mb-16" }) => (
  <header className={className}>
    <SectionRule index={index} label={label} meta={meta} />
    {title && (
      <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <SplitReveal as={as} id={id} className={`${SECTION_TITLE} lg:col-span-7`}>
          {title}
        </SplitReveal>
        {(description || action) && (
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pb-1.5">
            {description && <p className="text-pretty leading-relaxed text-neutral-400">{description}</p>}
            {action && <div className={description ? "mt-6" : ""}>{action}</div>}
          </Reveal>
        )}
      </div>
    )}
  </header>
);

export default SectionHeader;
