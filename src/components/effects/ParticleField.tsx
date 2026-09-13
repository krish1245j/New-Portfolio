import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const COLORS = ['6, 182, 212', '59, 130, 246', '139, 92, 246']; // cyan / blue / purple (rgb)

/**
 * A quiet, cinematic constellation of drifting nodes connected by faint lines,
 * with a gentle parallax pull toward the cursor. Fully self-contained canvas,
 * capped particle count, pauses when the tab is hidden, and renders a single
 * static frame (no animation loop) for prefers-reduced-motion / touch devices.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Phones: skip the animated version. The full loop recomputes drift +
    // pairwise link distances for every particle on every frame — real CPU
    // cost with no payoff on touch devices (there's no cursor to react to).
    // Render one static frame instead, same as prefers-reduced-motion.
    const isMobile =
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(pointer: coarse)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let animationId = 0;
    let isVisible = true;

    const mouse = { x: -9999, y: -9999, active: false };

    const countFor = (w: number, h: number) => {
      const area = w * h;
      // roughly one particle per ~22,000px^2, clamped to a sane range
      return Math.max(28, Math.min(90, Math.round(area / 22000)));
    };

    const buildParticles = () => {
      const count = countFor(width, height);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.fill();
      });
    };

    const step = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(step);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const linkDist = Math.min(140, Math.max(90, width / 12));
      const linkDistSq = linkDist * linkDist;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // subtle pull toward cursor
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 26000) {
            p.vx += dx * 0.000009;
            p.vy += dy * 0.000009;
          }
        }

        // gentle damping so drift speed stays calm
        p.vx *= 0.996;
        p.vy *= 0.996;

        // wrap around edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // connective lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < linkDistSq) {
            const alpha = (1 - distSq / linkDistSq) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(100, 149, 237, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const color = COLORS[i % COLORS.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.55)`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(step);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);

    if (prefersReducedMotion || isMobile) {
      drawStatic();
    } else {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);
      animationId = requestAnimationFrame(step);
    }

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  );
}
