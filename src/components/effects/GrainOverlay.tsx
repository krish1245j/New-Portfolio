/**
 * A near-invisible, self-contained (no image asset) film-grain texture laid
 * over the whole viewport. It's what gives dark, glowing UIs like this one
 * a filmic, "designed" feel instead of looking like a flat gradient.
 * Respects prefers-reduced-motion globally via index.css.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[70] pointer-events-none grain-layer"
    />
  );
}
