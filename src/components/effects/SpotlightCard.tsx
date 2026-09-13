import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** rgba() color used for the glow, keep alpha low (~0.12–0.22) */
  color?: string;
  /** px radius of the light falloff */
  size?: number;
}

/**
 * Wraps a card and paints a soft light that follows the cursor, plus a thin
 * glowing ring traced along the card's own border — a common "premium SaaS"
 * hover effect. Mouse position is written straight to the DOM node (no React
 * state), so it stays smooth even inside long scrolling grids.
 */
export default function SpotlightCard({
  children,
  className = '',
  color = 'rgba(6, 182, 212, 0.16)',
  size = 320,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative group/spotlight isolate ${className}`}
    >
      {children}

      {/* Soft interior light wash */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-500 z-20"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Glowing ring traced on the card's own border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-500 z-20"
        style={{
          padding: '1px',
          background: `radial-gradient(${Math.round(size * 0.7)}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color.replace(/[\d.]+\)$/, '0.9)')}, transparent 70%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
    </div>
  );
}
