import { motion } from 'motion/react';
import { Terminal, ShieldCheck, Mail, Cpu, Lock, Database, Cloud } from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';

export default function AboutManifesto() {
  const pillars = [
    {
      num: '01',
      title: 'Deterministic Over Magick',
      desc: 'Explicit validation schemas, zero hidden mutation side effects, and predictable service contracts for bulletproof operation.',
      color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
      icon: Cpu,
    },
    {
      num: '02',
      title: 'Zero-Trust By Default',
      desc: 'Cryptographic JWT authentication tokens, HttpOnly refresh cookies, rate limits, and multi-tier role authorization guards.',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      icon: Lock,
    },
    {
      num: '03',
      title: 'Transactional Atomicity',
      desc: 'MongoDB ACID session guarantees, idempotent endpoints, and ledger consistency even under sudden network partition faults.',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      icon: Database,
    },
    {
      num: '04',
      title: 'Cloud & AI Integration',
      desc: 'Containerized microservices via Docker deployed on AWS S3/EC2, coupled with streaming LLM inference engines.',
      color: 'text-cyan-300 bg-cyan-400/10 border-cyan-300/30',
      icon: Cloud,
    },
  ];

  return (
    <section className="py-14 border-t border-[#1e293b]/40 flex flex-col gap-8" id="about">
      {/* Header with slide-in animation */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-blue-400">
          <Terminal className="w-4 h-4" />
          <span>$ cat /etc/bio --detailed</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[#f8fafc] tracking-tight font-bold">
          Engineering with a backend-first mindset.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Editorial Persona Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-5"
        >
          <motion.div whileHover={{ y: -3 }}>
          <SpotlightCard className="rounded-xl" color="rgba(6, 182, 212, 0.15)">
          <div className="p-6 bg-[#0f1726] border border-[#1e293b] rounded-xl flex flex-col gap-5 shadow-lg hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-14 h-14 rounded-xl bg-[#1a2332] border border-[#1e293b] flex items-center justify-center text-blue-400 font-display text-xl font-bold"
              >
                KK
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display text-base text-[#f8fafc] font-semibold">KRISH KUMAR</span>
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  BACHELOR OF COMPUTER APPLICATIONS
                </span>
                <span className="text-xs text-[#64748b] font-sans">
                  DAV College, Amritsar (2024–2027)
                </span>
              </div>
            </div>

            <p className="text-sm text-[#94a3b8] leading-relaxed">
              I specialize in backend architecture and full-stack MERN engineering. My technical focus centers on architecting clean, secure APIs with custom JWT auth, rate limiting, and robust server-side business logic.
            </p>

            <div className="p-4 bg-[#0a101d] rounded-lg border border-[#1e293b]/50 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#64748b]">SECURITY ARCHITECTURE</span>
                <span className="text-cyan-400 font-semibold">ZERO-TRUST</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>HMAC-SHA256, HttpOnly Cookies, RBAC Guards</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1e293b]/40">
              {['Node.js', 'Express.js', 'MongoDB', 'React', 'Docker', 'AWS'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#1a2332] border border-[#1e293b] rounded font-mono text-xs text-[#f8fafc] hover:border-cyan-400/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors mt-1"
            >
              <Mail className="w-4 h-4" />
              <span>DISCUSS ARCHITECTURE</span>
            </motion.a>
          </div>
          </SpotlightCard>
          </motion.div>
        </motion.div>

        {/* Right: 4 Engineering Pillars with Timeline / Connecting Line */}
        <div className="lg:col-span-7 flex flex-col gap-4 relative">
          {/* Subtle vertical connector track */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-[#1e293b]/40 pointer-events-none hidden sm:block"></div>

          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6, borderColor: 'rgba(6, 182, 212, 0.4)' }}
              >
              <SpotlightCard className="rounded-xl" color="rgba(6, 182, 212, 0.13)">
                <div className="p-5 bg-[#0f1726] border border-[#1e293b] rounded-xl flex items-start gap-4 transition-all duration-300 relative group">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${pillar.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#64748b] font-bold">{pillar.num} //</span>
                      <h3 className="font-display text-base text-[#f8fafc] font-semibold group-hover:text-cyan-400 transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
