import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GitCommit } from 'lucide-react';

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const phases = [
    {
      phase: 'PHASE 01 // FOUNDATIONS',
      title: 'Computer Science & Algorithmic DSA',
      desc: 'Rigorous grounding in OOP, C++, Java fundamentals, and time/space complexity evaluation. Solved 100+ LeetCode & GFG problems with a strong focus on binary trees, graph algorithms, and dynamic programming.',
      color: 'text-cyan-400',
      dotColor: 'bg-cyan-400',
      glowColor: 'shadow-[0_0_12px_#06b6d4]',
    },
    {
      phase: 'PHASE 02 // STACK MASTERY',
      title: 'MERN Stack Immersion & Full Pipeline',
      desc: 'Built reactive Single Page Applications coupled with multi-route Express servers, relational Mongoose schemas, and client state orchestration via modern React token abstractions.',
      color: 'text-blue-400',
      dotColor: 'bg-blue-500',
      glowColor: 'shadow-[0_0_12px_#3b82f6]',
    },
    {
      phase: 'PHASE 03 // ARCHITECTURAL REFINEMENT',
      title: 'Custom Middleware, Security & RBAC',
      desc: 'Engineered stateless JWT authorization systems with HttpOnly cookie rotators, cryptographic payload signatures, error isolation boundaries, and transaction safety.',
      color: 'text-purple-400',
      dotColor: 'bg-purple-500',
      glowColor: 'shadow-[0_0_12px_#a855f7]',
    },
    {
      phase: 'PHASE 04 // CLOUD & AI INTEGRATION',
      title: 'Docker Containers & LLM Stream Engines',
      desc: 'Containerized node environments with Alpine Docker images, deployed on AWS EC2/S3 storage, and integrated streaming text analysis using Google Gemini and LLaMA models.',
      color: 'text-cyan-300',
      dotColor: 'bg-cyan-300',
      glowColor: 'shadow-[0_0_12px_#67e8f9]',
    },
    {
      phase: 'PHASE 05 // FORWARD TRAJECTORY',
      title: 'Event-Driven Microservices & Distributed Systems',
      desc: 'Deepening knowledge in Kafka event streaming, Redis distributed caching, gRPC communication protocols, and Kubernetes container cluster orchestration.',
      color: 'text-[#94a3b8]',
      dotColor: 'bg-[#64748b]',
      glowColor: 'shadow-[0_0_8px_#64748b]',
    },
  ];

  return (
    <section className="py-14 border-t border-[#1e293b]/40 flex flex-col gap-8" id="journey">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
          <GitCommit className="w-4 h-4" />
          <span>$ git log --oneline --graph --all</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[#f8fafc] tracking-tight font-bold">
          Engineering Journey
        </h2>
        <p className="text-sm text-[#94a3b8]">
          From foundational computer science theory to autonomous cloud SaaS pipelines.
        </p>
      </motion.div>

      {/* Timeline track with dynamic drawing */}
      <div ref={containerRef} className="relative pl-6 md:pl-8 space-y-8 max-w-4xl">
        {/* Background track line */}
        <div className="absolute left-0 top-2 bottom-4 w-[2px] bg-[#1e293b]/50"></div>

        {/* Dynamic illuminated progress line drawing on scroll */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-0 top-2 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_8px_#06b6d4]"
        />

        {phases.map((item, idx) => (
          <motion.div
            key={item.phase}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 6 }}
            className="relative group transition-all"
          >
            {/* Illuminated node dot */}
            <motion.span
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full ${item.dotColor} ring-4 ring-[#060A13] group-hover:${item.glowColor} transition-all`}
            ></motion.span>
            
            <div className={`font-mono text-xs font-bold ${item.color}`}>{item.phase}</div>
            <h3 className="font-display text-base text-[#f8fafc] font-semibold mt-0.5 group-hover:text-cyan-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed max-w-3xl">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
