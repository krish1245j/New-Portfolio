import { ReactLenis } from 'lenis/react';
import useIsMobile from '../../hooks/uselsMobile';

/**
 * Wraps the app in a buttery, inertia-based smooth scroll (Lenis).
 * - Runs on the native scroll container (position:sticky, anchor links & a11y keep working).
 * - Automatically honors prefers-reduced-motion (smoothing disables itself for that user).
 * - Skipped entirely on phones: Lenis's wheel-smoothing is a desktop nicety,
 *   but its continuous rAF loop is unnecessary overhead on mobile GPUs and
 *   can fight native touch-scroll momentum, which reads as "laggy" scrolling.
 *   Phones fall back to plain native scrolling (anchor links still work).
 */
export default function SmoothScroll() {
  const isMobile = useIsMobile();
  if (isMobile) return null;

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
