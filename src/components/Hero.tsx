import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Network, Code, ChevronDown } from 'lucide-react';
import TiltCard from './effects/TiltCard';
import Magnetic from './effects/Magnetic';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax and scale for the hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, -45]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const visualY = useTransform(scrollYProgress, [0, 0.8], [0, -25]);
  const visualScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  const pipelineNodes = [
    {
      step: '01',
      title: 'React Client Presentation',
      badge: 'SPA',
      color: 'border-cyan-400/30 text-cyan-400 bg-cyan-400/10 hover:border-cyan-400/60',
      tagColor: 'bg-cyan-400/10 text-cyan-400',
      description: 'Optimistic state updates & responsive UI token rendering',
      metric: '→ 200 OK',
      metricColor: 'text-cyan-400',
      beamColor: 'from-cyan-400 to-blue-500',
    },
    {
      step: '02',
      title: 'Express API Gateway',
      badge: 'SHIELD',
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/10 hover:border-blue-500/60',
      tagColor: 'bg-blue-500/10 text-blue-400',
      description: 'Rate-limiter, Helmet headers & payload sanitizer',
      metric: '0.8ms',
      metricColor: 'text-blue-400',
      beamColor: 'from-blue-500 to-purple-500',
    },
    {
      step: '03',
      title: 'JWT / RBAC Guard',
      badge: 'ZERO-TRUST',
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/10 hover:border-purple-500/60',
      tagColor: 'bg-purple-500/10 text-purple-400',
      description: 'HMAC-SHA256 tokens & HttpOnly refresh rotators',
      metric: 'AUTH: VALID',
      metricColor: 'text-purple-400',
      beamColor: 'from-purple-500 to-cyan-400',
    },
    {
      step: '04',
      title: 'Service Layer Pattern',
      badge: 'MVC',
      color: 'border-cyan-400/30 text-cyan-400 bg-cyan-400/10 hover:border-cyan-400/60',
      tagColor: 'bg-cyan-400/10 text-cyan-400',
      description: 'Decoupled business controllers & idempotency keys',
      metric: 'ISOLATED',
      metricColor: 'text-cyan-400',
      beamColor: 'from-cyan-400 to-blue-500',
    },
    {
      step: '05',
      title: 'MongoDB ACID Persistence',
      badge: 'WIREDTIGER',
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/10 hover:border-blue-500/60',
      tagColor: 'bg-blue-500/10 text-blue-400',
      description: 'Multi-doc transactions & compound index pipelines',
      metric: 'ACID 100%',
      metricColor: 'text-blue-400',
      beamColor: 'from-blue-500 to-purple-500',
    },
    {
      step: '06',
      title: 'AI Node & Cloud Deployment',
      badge: 'DOCKER',
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/10 hover:border-purple-500/60',
      tagColor: 'bg-purple-500/10 text-purple-400',
      description: 'AWS S3/EC2 with Gemini & LLaMA streaming inference',
      metric: 'STREAMING',
      metricColor: 'text-purple-400',
      beamColor: null,
    },
  ];

  // Word-by-word reveal for heading
  const headingWords = [
    { text: 'Building', isGradient: false },
    { text: 'scalable', isGradient: true },
    { text: 'systems,', isGradient: true },
    { text: 'not', isGradient: false },
    { text: 'just', isGradient: false },
    { text: 'websites.', isGradient: false },
  ];

  return (
    <section 
      ref={containerRef}
      className="pt-8 pb-16 flex flex-col justify-center min-h-[calc(100vh-4rem)] relative" 
      id="hero"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Hero Headline & Supporting Narrative */}
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          className="lg:col-span-6 flex flex-col gap-5"
        >
          {/* Active Thread Tag */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a2332]/70 border border-[#1e293b] rounded w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase">
              CLUSTER: AP-SOUTH-1 // ACTIVE THREAD
            </span>
          </motion.div>

          {/* Heading - Revealed Word-by-Word */}
          <motion.h1 
            style={{ scale: headlineScale }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f8fafc] leading-[1.08] tracking-tight font-bold origin-left flex flex-wrap gap-x-3 gap-y-1"
          >
            {headingWords.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.55,
                  delay: 0.3 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  item.isGradient
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 inline-block'
                    : 'inline-block'
                }
              >
                {item.text}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-base lg:text-lg text-[#94a3b8] max-w-xl leading-relaxed"
          >
            Backend-focused developer building secure APIs, AI-powered applications, and production-ready full-stack systems with microsecond-conscious precision.
          </motion.p>

          {/* Core Technical Tags (Staggered) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {[
              { label: '# Backend Architecture', color: 'text-cyan-400' },
              { label: '# MERN Core', color: 'text-blue-400' },
              { label: '# Cloud & AI Infra', color: 'text-purple-400' },
              { label: '# Zero-Trust RBAC', color: 'text-[#94a3b8]' },
            ].map((tag, idx) => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.0 + idx * 0.07 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`px-2.5 py-1 bg-[#0f1726] border border-[#1e293b] rounded font-mono text-xs ${tag.color} cursor-default transition-colors hover:border-cyan-400/40`}
              >
                {tag.label}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Magnetic strength={0.3}>
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-blue-600 text-white font-mono text-xs tracking-wider rounded font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2 group relative overflow-hidden"
                href="#projects"
              >
                {/* Subtle light sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-[#1a2332] border border-[#1e293b] text-[#f8fafc] hover:text-cyan-400 hover:border-cyan-400/50 font-mono text-xs tracking-wider rounded transition-all flex items-center gap-2"
                href="#systems"
              >
                <Network className="w-4 h-4 text-cyan-400" />
                <span>VIEW SYSTEMS</span>
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-[#1a2332] border border-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] hover:border-cyan-400 rounded transition-all"
                href="https://github.com/kumar-krish"
                rel="noreferrer"
                target="_blank"
                title="GitHub: @kumar-krish"
              >
                <Code className="w-5 h-5" />
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Telemetry Metric Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1e293b]/40"
          >
            {[
              { label: 'AVG LATENCY', value: '14.2ms', color: 'text-cyan-400' },
              { label: 'AUTH GUARANTEE', value: 'JWT / RBAC', color: 'text-blue-400' },
              { label: 'TRANSACTIONS', value: 'ACID ATOMIC', color: 'text-purple-400' },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                whileHover={{ y: -2, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                className="p-3 bg-[#0f1726]/60 border border-[#1e293b]/40 rounded transition-colors"
              >
                <div className="font-mono text-[10px] text-[#64748b]">{badge.label}</div>
                <div className={`font-mono text-lg ${badge.color} font-semibold`}>{badge.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Cinematic Architecture Pipeline Visual */}
        <motion.div 
          style={{ y: visualY, scale: visualScale }}
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 w-full"
        >
          <TiltCard maxTilt={5} className="w-full">
          <div 
            data-cursor="target"
            className="relative bg-[#05070d]/90 border border-[#1e293b] rounded-2xl p-6 shadow-2xl backdrop-blur-md overflow-hidden hover:border-cyan-400/40 transition-colors"
          >
            {/* Top Pipeline Telemetry Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]/40 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse"></span>
                <span className="text-cyan-400 font-semibold">PIPELINE: LIVE RUNTIME FLOW</span>
              </div>
              <div className="flex items-center gap-3 text-[#64748b] text-[11px]">
                <span>TPS: 4,280</span>
                <span className="text-[#94a3b8] font-mono">PACKETS: IN_TRANSIT</span>
              </div>
            </div>

            {/* Node Chain */}
            <div className="py-4 flex flex-col gap-2.5 relative">
              {pipelineNodes.map((node, idx) => (
                <div key={node.step} className="flex flex-col items-center w-full">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.8 + idx * 0.1, ease: 'easeOut' }}
                    whileHover={{ scale: 1.015, x: 4 }}
                    className={`w-full p-3 bg-[#0f1726] border border-[#1e293b] rounded-xl flex items-center justify-between transition-all cursor-pointer ${node.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#0a101d] border border-current flex items-center justify-center font-mono text-xs font-bold">
                        {node.step}
                      </div>
                      <div>
                        <div className="font-display text-sm font-semibold text-[#f8fafc] flex items-center gap-2">
                          <span>{node.title}</span>
                          <span className={`px-1.5 py-0.2 text-[10px] font-mono rounded ${node.tagColor}`}>
                            {node.badge}
                          </span>
                        </div>
                        <p className="text-[#94a3b8] text-[11px]">{node.description}</p>
                      </div>
                    </div>
                    <span className={`font-mono text-xs ${node.metricColor}`}>{node.metric}</span>
                  </motion.div>

                  {node.beamColor && (
                    <div className={`w-0.5 h-2.5 bg-gradient-to-b ${node.beamColor} relative overflow-hidden my-0.5`}>
                      <div className="w-full h-1.5 bg-white stream-line"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Telemetry Footer */}
            <div className="pt-3 border-t border-[#1e293b]/40 flex items-center justify-between text-[11px] text-[#64748b] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>14.2ms LATENCY // 99.9% UPTIME</span>
              </div>
              <span className="text-cyan-400">SYS_STATUS: VERIFIED</span>
            </div>
          </div>
          </TiltCard>
        </motion.div>

      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="hidden md:flex flex-col items-center gap-1.5 absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#64748b] tracking-widest"
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-cyan-400/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
