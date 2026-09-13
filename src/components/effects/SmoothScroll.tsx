import { ReactLenis } from 'lenis/react';

/**
 * Wraps the app in a buttery, inertia-based smooth scroll (Lenis).
 * - Runs on the native scroll container (position:sticky, anchor links & a11y keep working).
 * - Automatically honors prefers-reduced-motion (smoothing disables itself for that user).
 */
export default function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        duration: 1.15,
        smoothWheel: true,
        anchors: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      }}
    />
  );
}
