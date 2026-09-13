import { motion } from 'motion/react';
import { 
  Terminal, 
  Smartphone, 
  Router, 
  Lock, 
  Cpu, 
  Database, 
  CloudSun 
} from 'lucide-react';
import ArchitectureVisualization from './ArchitectureVisualization';
import SpotlightCard from './effects/SpotlightCard';

export default function SystemsSection() {
  const stages = [
    {
      stage: 'STAGE 01',
      title: 'Client Presentation',
      desc: 'React.js SPA with atomic design tokens, optimistic state updates, and defensive response caching.',
      badgeColor: 'text-cyan-400 bg-[#1a2332]',
      icon: Smartphone,
      iconColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
      hoverBorder: 'hover:border-cyan-400/60',
      tags: ['Tailwind', 'Zustand', 'Axios Interceptors'],
    },
    {
      stage: 'STAGE 02',
      title: 'API Gateway & Shield',
      desc: 'Express.js perimeter gateway configured with express-rate-limit, Helmet header shielding, and sanitization.',
      badgeColor: 'text-blue-400 bg-[#1a2332]',
      icon: Router,
      iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      hoverBorder: 'hover:border-blue-500/60',
      tags: ['Rate-Limiter', 'Helmet', 'CORS Matrix'],
    },
    {
      stage: 'STAGE 03',
      title: 'Auth & RBAC Zero-Trust',
      desc: 'HMAC-SHA256 JWT tokens paired with HttpOnly cookies, automatic refresh rotation, and permission gates.',
      badgeColor: 'text-purple-400 bg-[#1a2332]',
      icon: Lock,
      iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      hoverBorder: 'hover:border-purple-500/60',
      tags: ['HMAC-SHA256', 'HttpOnly', 'RBAC Middleware'],
    },
    {
      stage: 'STAGE 04',
      title: 'Service Layer Logic',
      desc: 'Strict MVC and decoupled business logic with idempotency keys, robust validation schemas, and isolated boundaries.',
      badgeColor: 'text-cyan-400 bg-[#1a2332]',
      icon: Cpu,
      iconColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
      hoverBorder: 'hover:border-cyan-400/60',
      tags: ['Idempotency', 'Service Separation', 'Error Boundaries'],
    },
    {
      stage: 'STAGE 05',
      title: 'ACID Persistence Engine',
      desc: 'MongoDB with WiredTiger engine, multi-document ACID transactions, composite indexing, and aggregation pipelines.',
      badgeColor: 'text-blue-400 bg-[#1a2332]',
      icon: Database,
      iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      hoverBorder: 'hover:border-blue-500/60',
      tags: ['WiredTiger', 'Compound Indexes', 'Aggregation Engine'],
    },
    {
      stage: 'STAGE 06',
      title: 'Cloud Deploy & AI Node',
      desc: 'Multi-stage Docker containers deployed to AWS EC2, S3 bucket media storage, and streaming inferences with Gemini/LLaMA.',
      badgeColor: 'text-purple-400 bg-[#1a2332]',
      icon: CloudSun,
      iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      hoverBorder: 'hover:border-purple-500/60',
      tags: ['Docker Alpine', 'AWS S3 / EC2', 'Gemini / LLaMA Stream'],
    },
  ];

  return (
    <section className="py-14 border-t border-[#1e293b]/40 flex flex-col gap-8" id="systems">
      {/* Header with reveal animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span>$ npm run architecture --verbose</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#f8fafc] tracking-tight font-bold">
              How I Build Systems
            </h2>
            <p className="text-sm text-[#94a3b8] mt-1">
              From client interaction to database isolation and automated cloud telemetry.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#64748b]">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>DATA PACKET PIPELINE: ACTIVE IN-TRANSIT</span>
          </div>
        </div>
      </motion.div>

      {/* 6-Stage Architecture Grid - Staggered entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
            <SpotlightCard className="rounded-lg h-full" color="rgba(6, 182, 212, 0.14)">
              <div
                className={`group p-6 bg-[#0f1726] border border-[#1e293b] ${stage.hoverBorder} rounded-lg transition-all relative overflow-hidden flex flex-col justify-between h-full`}
              >
                <div className="absolute top-0 right-0 px-2.5 py-1 bg-[#1a2332] border-b border-l border-[#1e293b] font-mono text-[10px] text-cyan-400">
                  {stage.stage}
                </div>
                <div>
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className={`w-10 h-10 rounded border flex items-center justify-center mb-4 ${stage.iconColor} transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <h3 className="font-display text-base text-[#f8fafc] font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">{stage.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1 font-mono text-[10px] text-[#64748b] pt-2 border-t border-[#1e293b]/30">
                  {stage.tags.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 bg-[#0a101d] rounded border border-[#1e293b]/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      {/* Clean Project Architecture Visualization */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2"
      >
        <ArchitectureVisualization />
      </motion.div>
    </section>
  );
}
