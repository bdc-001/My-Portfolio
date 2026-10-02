const hostOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export const BrowserFrame = ({ src, alt, url, label, className = "", eager = false }) => (
  <div className={`flex flex-col overflow-hidden rounded-[18px] bg-ink-850 ring-1 ring-inset ring-white/[0.08] ${className}`}>
    <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </span>
      {(url || label) && (
        <span className="mx-auto max-w-[70%] truncate rounded-full bg-white/[0.05] px-3 py-0.5 font-mono text-[11px] text-neutral-500">
          {url ? hostOf(url) : label}
        </span>
      )}
      <span className="w-[42px]" aria-hidden />
    </div>
    <div className="relative aspect-[16/10] flex-1 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-700 ease-expo group-hover:scale-[1.02]"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        width="1600"
        height="1000"
      />
    </div>
  </div>
);

/** The agent or user flow behind a project as a numbered stepper; lights up top to bottom on hover. */
export const PipelineVisual = ({ steps, className = "" }) => (
  <div
    className={`relative flex items-center justify-center overflow-hidden rounded-[18px] bg-ink-850/80 p-6 ring-1 ring-inset ring-white/[0.06] ${className}`}
    aria-hidden
  >
    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
    <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
    <ol className="relative">
      <span className="absolute bottom-3 left-[11px] top-3 w-px bg-white/10" />
      {steps.map((step, i) => (
        <li key={step} className="relative flex items-center gap-3 py-1">
          <span
            className="relative flex h-[23px] w-[23px] items-center justify-center rounded-full bg-ink-800 font-mono text-[10px] text-neutral-400 ring-1 ring-inset ring-white/15 transition-colors duration-500 group-hover:text-accent group-hover:ring-accent/60"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            {i + 1}
          </span>
          <span
            className="text-[13px] text-neutral-300 transition-colors duration-500 group-hover:text-bone"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  </div>
);
