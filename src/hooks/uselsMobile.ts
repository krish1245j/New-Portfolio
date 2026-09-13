import { useEffect, useState } from 'react';

/**
 * True for small screens or coarse (touch) pointers — i.e. phones.
 * Used to switch off the heaviest desktop-only visual effects (smooth-scroll
 * inertia, canvas particle animation, large sticky/scroll-linked transforms)
 * so the site stays smooth on mobile GPUs, without changing anything about
 * the desktop experience.
 */
export default function useIsMobile(breakpointPx = 767): boolean {
  const getMatch = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia(`(max-width: ${breakpointPx}px)`).matches ||
      window.matchMedia('(pointer: coarse)').matches);

  const [isMobile, setIsMobile] = useState(getMatch);

  useEffect(() => {
    const widthQuery = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const pointerQuery = window.matchMedia('(pointer: coarse)');

    const update = () => setIsMobile(widthQuery.matches || pointerQuery.matches);
    update();

    widthQuery.addEventListener('change', update);
    pointerQuery.addEventListener('change', update);
    return () => {
      widthQuery.removeEventListener('change', update);
      pointerQuery.removeEventListener('change', update);
    };
  }, [breakpointPx]);

  return isMobile;
}
