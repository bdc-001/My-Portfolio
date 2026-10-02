import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { HERO_ROADMAP } from "../constants";
import { EASE, prefersReducedMotion } from "../lib/motion";

const TICK = 3600;

const COLUMNS = [
  { name: "Discover", dot: "bg-coral", status: "Discovering", tone: "text-coral" },
  { name: "Building", dot: "bg-periwinkle", status: "In progress", tone: "text-periwinkle" },
  { name: "Shipped", dot: "bg-mint", status: "Shipped", tone: "text-mint" },
];

const SOURCES = {
  Convin: "bg-violet/25 text-periwinkle",
  "Side build": "bg-coral/15 text-coral",
};

const ITEMS = [...HERO_ROADMAP].sort((a, b) => b.stage - a.stage);

const Cursor = () => (
  <motion.svg
    initial={{ opacity: 0, scale: 0.6, x: 6, y: 6 }}
    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
    exit={{ opacity: 0, scale: 0.6 }}
    transition={{ duration: 0.35, ease: EASE }}
    viewBox="0 0 24 24"
    className="pointer-events-none absolute -bottom-3 -right-2 z-10 h-5 w-5 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
    aria-hidden
  >
    <path d="M4 3l15 7.5-6.5 1.8L9.7 19 4 3z" fill="#f4f4f2" stroke="#1a1a1d" strokeWidth="1.2" strokeLinejoin="round" />
  </motion.svg>
);

const Card = ({ item, active, showCursor, onFocus }) => (
  <Link
    to={item.href}
    onMouseEnter={onFocus}
    onFocus={onFocus}
    aria-label={`${item.title}, ${item.source}: ${item.outcome.value} ${item.outcome.label}`}
    className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
  >
    <motion.div
      animate={{ y: active ? -3 : 0, scale: active ? 1.03 : 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`relative flex h-[76px] flex-col justify-between rounded-xl px-2 py-2 ring-1 ring-inset transition-[background-color,box-shadow] duration-500 sm:px-2.5 ${
        active
          ? "bg-ink-700 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)] ring-white/20"
          : "bg-ink-800/90 ring-white/[0.07]"
      }`}
    >
      <p className="line-clamp-2 text-[11px] leading-snug text-neutral-100 sm:text-[12px]">{item.title}</p>
      <div className="flex items-center justify-between gap-1">
        <span className={`truncate rounded-full px-1.5 py-px text-[9.5px] font-medium ${SOURCES[item.source] ?? "bg-white/[0.06] text-neutral-300"}`}>
          {item.source}
        </span>
        {item.stage === 2 && (
          <span className="flex shrink-0 items-center gap-0.5 font-mono text-[10px] text-mint">
            {item.outcome.value}
            <FiCheck className="h-3 w-3" aria-hidden />
          </span>
        )}
      </div>
      <AnimatePresence>{showCursor && <Cursor />}</AnimatePresence>
    </motion.div>
  </Link>
);

const Detail = ({ item, progressKey, running }) => {
  const column = COLUMNS[item.stage];
  return (
    <Link to={item.href} className="group relative block overflow-hidden rounded-xl px-2 pb-3 pt-3.5 sm:px-2.5">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex items-end justify-between gap-4"
        >
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              {item.source} · <span className={column.tone}>{column.status}</span>
            </p>
            <p className="mt-1.5 flex items-center gap-1 text-[14px] font-medium text-bone">
              <span className="truncate">{item.title}</span>
              <FiArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
            </p>
            <p className="mt-1 line-clamp-3 text-[12px] leading-snug text-neutral-400 sm:line-clamp-2">{item.why}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className={`display text-[1.9rem] leading-none ${item.stage === 2 ? "text-mint" : "text-bone"}`}>
              {item.outcome.value}
            </p>
            <p className="mt-1.5 max-w-[8.5rem] text-[10.5px] leading-tight text-neutral-500">{item.outcome.label}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <span className="absolute inset-x-2 bottom-0 h-px overflow-hidden bg-white/[0.06]" aria-hidden>
        {running && (
          <motion.span
            key={progressKey}
            className="block h-full origin-left bg-accent/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: TICK / 1000, ease: "linear" }}
          />
        )}
      </span>
    </Link>
  );
};

const RoadmapBoard = () => {
  const root = useRef(null);
  const inView = useInView(root, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const running = inView && !hovering && !prefersReducedMotion();

  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % ITEMS.length), TICK);
    return () => clearInterval(id);
  }, [running, active]);

  const columns = COLUMNS.map((column, stage) => ({
    ...column,
    items: ITEMS.map((item, index) => ({ item, index })).filter(({ item }) => item.stage === stage),
  }));

  return (
    <div
      ref={root}
      className="relative"
      onMouseLeave={() => setHovering(false)}
      onMouseEnter={() => setHovering(true)}
    >
      <div
        className="absolute -inset-x-10 -inset-y-12 -z-10 bg-[radial-gradient(50%_45%_at_60%_35%,rgb(var(--accent)/0.24),transparent_70%),radial-gradient(40%_35%_at_30%_80%,rgba(255,138,92,0.12),transparent_70%)] blur-2xl"
        aria-hidden
      />

      <div className="glass rounded-[26px] p-2">
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <span className="text-[12px] text-neutral-400">What I&apos;m working on</span>
          <span className="font-mono text-[10px] text-neutral-500">Convin + side builds</span>
        </div>

        <div className="rounded-[20px] bg-white/[0.03] p-2 ring-1 ring-inset ring-white/[0.06] sm:p-3">
          <div className="grid grid-cols-3">
            {columns.map((column) => (
              <div key={column.name} className="min-w-0 px-0.5 sm:px-1">
                <div className="flex items-center gap-1.5 px-1 pb-3">
                  <span className={`h-1.5 w-1.5 rounded-full ${column.dot}`} aria-hidden />
                  <span className="text-[12px] font-medium text-neutral-300">{column.name}</span>
                  <span className="font-mono text-[10px] text-neutral-600">{column.items.length}</span>
                </div>
                <div className="flex min-h-[172px] flex-col gap-2 rounded-xl border border-dashed border-white/[0.06] p-1">
                  {column.items.map(({ item, index }) => (
                    <Card
                      key={item.id}
                      item={item}
                      active={active === index}
                      showCursor={active === index && running}
                      onFocus={() => setActive(index)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 border-t border-white/[0.06]">
            <Detail item={ITEMS[active]} progressKey={active} running={running} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapBoard;
