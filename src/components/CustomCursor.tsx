import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'target'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // A slower, heavily-lagged glow trail for ambient atmosphere
  const glowSpringConfig = { damping: 40, stiffness: 60, mass: 1.1 };
  const glowX = useSpring(mouseX, glowSpringConfig);
  const glowY = useSpring(mouseY, glowSpringConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="target"]') || target.closest('#architecture') || target.closest('.arch-node')) {
        setCursorType('target');
      } else if (target.closest('[data-cursor="project"]') || target.closest('.project-card')) {
        setCursorType('project');
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Ambient glow trail (heavily lagged, very soft) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-[40px]"
        style={{
          x: glowX,
          y: glowY,
          width: 260,
          height: 260,
          background:
            cursorType === 'target'
              ? 'radial-gradient(circle, rgba(6,182,212,0.16), transparent 70%)'
              : cursorType === 'project'
              ? 'radial-gradient(circle, rgba(59,130,246,0.14), transparent 70%)'
              : 'radial-gradient(circle, rgba(6,182,212,0.09), transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Outer Halo / Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/60 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: cursorType === 'target' ? 44 : cursorType === 'project' ? 52 : cursorType === 'pointer' ? 36 : 22,
          height: cursorType === 'target' ? 44 : cursorType === 'project' ? 52 : cursorType === 'pointer' ? 36 : 22,
          borderColor: cursorType === 'target' ? '#06b6d4' : cursorType === 'project' ? '#3b82f6' : cursorType === 'pointer' ? '#8b5cf6' : 'rgba(6, 182, 212, 0.4)',
          backgroundColor: cursorType === 'pointer' ? 'rgba(139, 92, 246, 0.08)' : cursorType === 'project' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(6, 182, 212, 0.04)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {cursorType === 'target' && (
          <div className="w-full h-full relative flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
            <div className="absolute inset-0 border-t border-b border-cyan-400/40 rotate-45 scale-75"></div>
          </div>
        )}
        {cursorType === 'project' && (
          <span className="font-mono text-[8px] text-blue-400 tracking-wider font-semibold">VIEW</span>
        )}
      </motion.div>

      {/* Tiny Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#06b6d4]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </div>
  );
}
