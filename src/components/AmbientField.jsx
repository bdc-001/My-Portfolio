/** Slow, page-tinted colour field fixed behind everything; the glass surfaces frost it. */
const AmbientField = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
    <span className="ambient-blob ambient-a" />
    <span className="ambient-blob ambient-b" />
    <span className="ambient-blob ambient-c" />
  </div>
);

export default AmbientField;
