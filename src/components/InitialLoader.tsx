import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal } from 'lucide-react';

interface InitialLoaderProps {
  onComplete?: () => void;
}

export default function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const steps = [
    'INITIALIZING SYSTEM...',
    'LOADING ARCHITECTURE...',
    'SYNCING PROJECTS...',
    'ALL SYSTEMS OPERATIONAL. READY.',
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStepIndex(1), 250),
      setTimeout(() => setStepIndex(2), 550),
      setTimeout(() => setStepIndex(3), 850),
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 1200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 bg-[#05070d] flex flex-col items-center justify-center font-mono text-xs select-none"
        >
          <div className="flex flex-col items-center gap-4 max-w-sm px-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#0f1726] border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Terminal className="w-6 h-6 animate-pulse" />
            </div>

            <div className="flex items-center gap-2 text-cyan-400 font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>KRISH KUMAR // PORTFOLIO</span>
            </div>

            <div className="h-6 flex items-center justify-center">
              <motion.span
                key={stepIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[#94a3b8]"
              >
                {steps[stepIndex]}
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="w-48 bg-[#0f1726] h-1.5 rounded-full overflow-hidden border border-[#1e293b]/60">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ width: '0%' }}
                animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
