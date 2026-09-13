import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#05070d] border-t border-[#1e293b]/40">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1440px] mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#64748b]"
      >
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-[#f8fafc] font-semibold text-sm">
            KRISH KUMAR // SYSTEMS &amp; FULL-STACK ENGINEER
          </span>
          <span>Built with React, creativity, and too much coffee.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://github.com/kumar-krish"
            target="_blank"
            rel="noreferrer"
            className="text-[#94a3b8] hover:text-blue-400 transition-colors"
          >
            GitHub: kumar-krish
          </a>
          <a
            href="https://linkedin.com/in/krishkumar-eng"
            target="_blank"
            rel="noreferrer"
            className="text-[#94a3b8] hover:text-purple-400 transition-colors"
          >
            LinkedIn: krishkumar-eng
          </a>
          <a
            href="mailto:krish1245j@gmail.com"
            className="text-cyan-400 hover:underline"
          >
            krish1245j@gmail.com
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
