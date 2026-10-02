const trackPointer = (event) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--y", `${event.clientY - rect.top}px`);
};

/** Card whose border and surface glow in the page accent around the pointer. */
const GlowCard = ({ as: Tag = "div", className = "", children, ...rest }) => (
  <Tag onPointerMove={trackPointer} className={`glow-card ${className}`} {...rest}>
    {children}
  </Tag>
);

export default GlowCard;
