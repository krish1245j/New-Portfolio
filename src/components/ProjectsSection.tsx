import { useRef, useState, useEffect, useCallback } from 'react';
import type { ReactNode, FC } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Terminal,
  Code,
  Mail,
  Send,
  Store,
  Building2,
  MessageSquare,
  LockKeyhole,
  ExternalLink,
} from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';
import Magnetic from './effects/Magnetic';
import useIsMobile from '../hooks/uselsMobile';

interface Project {
  id: string;
  tag: string;
  status: string;
  statusColor: string;
  title: string;
  description: string;
  badgeList: { name: string; color: string }[];
  flowLabel: string | null;
  flowText: string | null;
  flowColor: string | null;
  githubLink: string;
  liveLink?: string;
  requestEmail: string;
  requestText: string;
  footnote: string | null;
  themeColor: string;
  borderColor: string;
  accentText: string;
  spotlightColor: string;
  cta: {
    icon: typeof Terminal;
    title: string;
    desc: string;
    buttonText: string;
    buttonLink: string;
    btnClass: string;
  };
  monitor: ReactNode;
}
 
const PROJECTS: Project[] = [
  // Project 01
  {
    id: '01',
    tag: 'PROJECT 01 // AI PIPELINE',
    status: 'STATUS: DEPLOYED',
    statusColor: 'bg-cyan-400',
    title: 'AI Resume Analyzer & Job Matcher',
    description:
      'An intelligent candidate screening engine that parses multi-format resumes, extracts structured competencies, and streams contextual gap analysis using Google Gemini and LLaMA models.',
    badgeList: [
      { name: 'React.js', color: 'text-[#64748b]' },
      { name: 'Node.js', color: 'text-cyan-400' },
      { name: 'Gemini API', color: 'text-blue-400' },
      { name: 'LLaMA', color: 'text-purple-400' },
      { name: 'Express.js', color: 'text-[#64748b]' },
      { name: 'MongoDB', color: 'text-[#64748b]' },
      { name: 'JWT', color: 'text-cyan-400' },
    ],
    flowLabel: 'DATA TRANSMISSION LIFECYCLE:',
    flowText:
      'Client Upload → Multer In-Memory Buffer → Raw Text Extraction → Gemini Vector Prompt → MongoDB Document Cache → Dynamic Reactive Match Report',
    flowColor: 'text-cyan-400',
    githubLink: 'https://github.com/krish1245j/ai-resume-analyzer',
    liveLink: 'https://ai-resume-analyzer-delta-coral.vercel.app/',
    requestEmail: 'mailto:krish1245j@gmail.com?subject=AI%20Resume%20Analyzer%20Inquiry',
    requestText: 'REQUEST REPO ACCESS',
    footnote: '// Vercel + Render Auto-CI/CD',
    themeColor: 'cyan',
    borderColor: 'border-cyan-400/40',
    accentText: 'text-cyan-400',
    spotlightColor: 'rgba(6, 182, 212, 0.16)',
    cta: {
      icon: Terminal,
      title: 'Interested in this project?',
      desc: 'Want to discuss the AI pipeline or architecture?',
      buttonText: 'GET IN TOUCH',
      buttonLink: 'mailto:krish1245j@gmail.com?subject=AI%20Resume%20Analyzer%20Discussion',
      btnClass: 'bg-cyan-400 text-[#083344] hover:bg-cyan-300',
    },
    monitor: (
      <div className="w-full bg-[#05070d] border border-[#1e293b] rounded-lg p-5 flex flex-col gap-3 font-mono text-xs">
        <div className="flex items-center justify-between text-[11px] text-[#64748b] border-b border-[#1e293b]/40 pb-2">
          <span>INFERENCE MONITOR</span>
          <span className="text-cyan-400">TIME: 240ms</span>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="text-[#94a3b8]">$ curl -X POST /api/v1/analyze-resume</div>
          <div className="text-[#64748b]">&#123; "status": "EXTRACTED", "pages": 2 &#125;</div>
          <div className="text-cyan-400">&gt; GEMINI_VECTOR_PROMPT_EXEC: OK</div>
          <div className="text-blue-400">&gt; SKILL_MATCH_SCORE: 94.2%</div>
          <div className="text-purple-400">&gt; SUGGESTION: "Expand Docker &amp; CI/CD detail"</div>
        </div>
        <div className="w-full bg-[#1a2332] h-2 rounded overflow-hidden mt-2">
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '94%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full"
          />
        </div>
      </div>
    ),
  },

  // Project 02
  {
    id: '02',
    tag: 'PROJECT 02 // E-COMMERCE CORE',
    status: 'STATUS: PRODUCTION-GRADE',
    statusColor: 'bg-blue-500',
    title: 'Scalable E-Commerce Engine & Admin Command',
    description:
      'Decoupled multi-role digital commerce platform featuring admin inventory telemetries, persistent customer carts, atomic order checkouts, and Multer-mediated cloud media ingest.',
    badgeList: [
      { name: 'MERN', color: 'text-[#64748b]' },
      { name: 'JWT RBAC', color: 'text-blue-400' },
      { name: 'Multer S3', color: 'text-cyan-400' },
      { name: 'Tailwind', color: 'text-purple-400' },
      { name: 'MVC Pattern', color: 'text-[#64748b]' },
      { name: 'MongoDB', color: 'text-[#64748b]' },
    ],
    flowLabel: 'SECURITY & ROLE MATRIX:',
    flowText:
      'Admin (Inventory Mutations, Ledger View) | Customer (Persistent Cart, Order Stream) | Zero-Trust Token Invalidation',
    flowColor: 'text-blue-400',
    githubLink: 'https://github.com/kumar-krish',
    requestEmail: 'mailto:krish1245j@gmail.com?subject=E-Commerce%20Architecture%20Spec',
    requestText: 'VIEW ARCHITECTURE SPEC',
    footnote: '// Express MVC + Mongoose Aggregate',
    themeColor: 'blue',
    borderColor: 'border-blue-500/40',
    accentText: 'text-blue-400',
    spotlightColor: 'rgba(59, 130, 246, 0.16)',
    cta: {
      icon: Store,
      title: 'Want to build something similar?',
      desc: "Let's discuss backend scalability & full-stack architecture.",
      buttonText: 'CONTACT ME',
      buttonLink: 'mailto:krish1245j@gmail.com?subject=E-Commerce%20Scalability%20Discussion',
      btnClass: 'bg-blue-600 text-white hover:bg-blue-700',
    },
    monitor: (
      <div className="w-full bg-[#05070d] border border-[#1e293b] rounded-lg p-5 flex flex-col gap-2.5 font-mono text-xs">
        <div className="text-[11px] text-[#64748b] border-b border-[#1e293b]/40 pb-2">
          RBAC ACCESS INSPECTOR
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-[#f8fafc]">POST /admin/products</span>
          <span className="text-cyan-400 font-semibold">ROLE: ADMIN_ONLY</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-[#f8fafc]">POST /checkout/order</span>
          <span className="text-blue-400 font-semibold">AUTH: VERIFIED_TOKEN</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-[#f8fafc]">GET /catalog/query</span>
          <span className="text-purple-400 font-semibold">PUBLIC_CACHED</span>
        </div>
        <div className="p-2 bg-[#0f1726] rounded text-[11px] text-[#64748b] border border-[#1e293b]/30 mt-1">
          Tokens rotated every 15m; automated refresh handshake on 401 intercept.
        </div>
      </div>
    ),
  },

  // Project 03
  {
    id: '03',
    tag: 'PROJECT 03 // FINANCIAL KERNEL',
    status: 'STATUS: FAULT-TOLERANT',
    statusColor: 'bg-purple-500',
    title: 'Advanced Banking & Ledger Transaction System',
    description:
      'A fault-tolerant double-entry financial settlement service with MongoDB multi-document ACID transactions, cryptographic transfer receipts, and zero-drop idempotency key handlers.',
    badgeList: [
      { name: 'Node.js', color: 'text-[#64748b]' },
      { name: 'ACID Transactions', color: 'text-purple-400' },
      { name: 'Crypto HMAC', color: 'text-cyan-400' },
      { name: 'Idempotency', color: 'text-blue-400' },
      { name: 'MongoDB', color: 'text-[#64748b]' },
      { name: 'Express', color: 'text-[#64748b]' },
    ],
    flowLabel: null,
    flowText: null,
    flowColor: null,
    githubLink: 'https://github.com/kumar-krish',
    requestEmail: 'mailto:krish1245j@gmail.com?subject=Banking%20Architecture%20Review',
    requestText: 'DISCUSS ATOMIC LEDGERS',
    footnote: null,
    themeColor: 'purple',
    borderColor: 'border-purple-500/40',
    accentText: 'text-purple-400',
    spotlightColor: 'rgba(139, 92, 246, 0.16)',
    cta: {
      icon: Building2,
      title: 'Have a financial ledger or high-concurrency challenge?',
      desc: "Let's build a resilient transactional backend together.",
      buttonText: 'DISCUSS ARCHITECTURE',
      buttonLink: 'mailto:krish1245j@gmail.com?subject=Ledger%20and%20Concurrency%20Challenge',
      btnClass: 'bg-purple-600 text-white hover:bg-purple-700',
    },
    monitor: (
      <div className="w-full bg-[#05070d] border border-[#1e293b] rounded-lg p-5 font-mono text-xs">
        <div className="text-[11px] text-[#64748b] border-b border-[#1e293b]/40 pb-2 flex justify-between">
          <span>ATOMICITY VERIFIER</span>
          <span className="text-cyan-400">GUARANTEE: 100%</span>
        </div>
        <div className="py-2.5 space-y-1.5 text-xs">
          <div className="text-[#94a3b8]">• Concurrent fund contention: RESOLVED</div>
          <div className="text-[#94a3b8]">• Network failure during debit: AUTO-ROLLBACK</div>
          <div className="text-[#94a3b8]">• Replay attack attempt: REJECTED (Duplicate Key)</div>
        </div>
        <div className="p-2.5 bg-[#0f1726] rounded text-xs text-cyan-400 border border-cyan-400/20 flex items-center gap-2">
          <LockKeyhole className="w-4 h-4 shrink-0" />
          <span>Zero balance drift under race condition benchmarks</span>
        </div>
      </div>
    ),
  },
];

const NAV_LABELS: Record<string, string> = {
  '01': 'AI',
  '02': 'COMMERCE',
  '03': 'LEDGER',
};

/** Base pixel offset (below the sticky mini-nav) plus a small per-card
 *  stair-step so each pinned card peeks slightly above the one stacking
 *  on top of it — the classic "sequential sticky stack" reveal. */
const STACK_BASE_OFFSET = 188;
const STACK_STEP = 26;

interface ProjectStackCardProps {
  project: Project;
  index: number;
  isLast: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
  onActive: () => void;
}

const ProjectStackCard: FC<ProjectStackCardProps> = ({
  project,
  index,
  isLast,
  registerRef,
  onActive,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'start 20%'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [48, 0]);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onActive();
        });
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [onActive]);

  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      wrapperRef.current = el;
      registerRef(el);
    },
    [registerRef]
  );

  const topOffset = STACK_BASE_OFFSET + index * STACK_STEP;

  // On phones, skip the desktop "sticky stack" treatment entirely. That
  // effect reserves a fixed 135vh/100vh scroll runway per card sized for
  // desktop's 2-column layout — on mobile the same content stacks into a
  // single column and runs noticeably taller, so the runway ran out before
  // a card finished animating in and the next card would start sliding on
  // top of it, cutting content off / overlapping cards mid-scroll. Phones
  // get a plain stacked layout (auto height, simple fade-in, no sticky/
  // scroll-linked transforms), which fixes the overlap and removes a
  // per-frame scroll calculation on every card. Desktop is unchanged.
  const cardBody = (
    <>
        <SpotlightCard className="rounded-xl" color={project.spotlightColor} size={420}>
          <div className="p-6 md:p-8 bg-[#0f1726] border border-[#1e293b] rounded-xl flex flex-col gap-6 relative overflow-hidden shadow-2xl">
            {/* Project Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1e293b]/40 pb-4">
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs font-bold ${project.accentText}`}>
                  {project.tag}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${project.statusColor} animate-pulse`}></span>
                <span className="font-mono text-xs text-[#64748b]">{project.status}</span>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-400/10 border border-emerald-400/30 rounded-full font-mono text-[10px] text-emerald-400 hover:bg-emerald-400/20 transition-colors"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                    </span>
                    <span>LIVE</span>
                  </a>
                )}
              </div>

              {/* Technology Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {project.badgeList.map((badge) => (
                  <span
                    key={badge.name}
                    className={`px-2 py-0.5 bg-[#1a2332] rounded text-[11px] font-mono ${badge.color}`}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <h3 className="font-display text-2xl text-[#f8fafc] font-bold">{project.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{project.description}</p>

                {project.flowLabel && (
                  <div className="p-3 bg-[#0a101d] border border-[#1e293b]/40 rounded font-mono text-xs text-[#94a3b8] space-y-1">
                    <div className="text-[#64748b] text-[10px] uppercase font-semibold">
                      {project.flowLabel}
                    </div>
                    <div className={`${project.flowColor} text-xs leading-relaxed`}>{project.flowText}</div>
                  </div>
                )}

                {project.id === '03' && (
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-purple-400 pt-1">
                    <span className="px-2.5 py-1 bg-[#0a101d] border border-[#1e293b]/40 rounded">ACCOUNT</span>
                    <span>→</span>
                    <span className="px-2.5 py-1 bg-[#0a101d] border border-[#1e293b]/40 rounded">VALIDATE</span>
                    <span>→</span>
                    <span className="px-2.5 py-1 bg-[#0a101d] border border-[#1e293b]/40 rounded">TRANSACTION</span>
                    <span>→</span>
                    <span className="px-2.5 py-1 bg-[#0a101d] border border-[#1e293b]/40 rounded">LEDGER</span>
                    <span>→</span>
                    <span className="px-2.5 py-1 bg-[#0a101d] border border-[#1e293b]/40 rounded">CONFIRM</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.liveLink && (
                    <Magnetic strength={0.25}>
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-4 py-2 font-mono text-xs rounded font-semibold transition-colors flex items-center gap-2 shadow-lg ${project.cta.btnClass}`}
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>VIEW LIVE DEMO</span>
                      </motion.a>
                    </Magnetic>
                  )}
                  <Magnetic strength={0.25}>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 bg-blue-600 text-white font-mono text-xs rounded font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Code className="w-4 h-4" />
                      <span>VIEW GITHUB REPO</span>
                    </motion.a>
                  </Magnetic>
                  <Magnetic strength={0.25}>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 bg-[#1a2332] border border-[#1e293b] text-[#f8fafc] hover:text-cyan-400 font-mono text-xs rounded transition-colors flex items-center gap-2"
                      href={project.requestEmail}
                    >
                      {project.id === '01' && <Mail className="w-4 h-4" />}
                      <span>{project.requestText}</span>
                    </motion.a>
                  </Magnetic>
                  {project.footnote && (
                    <span className="font-mono text-xs text-[#64748b]">{project.footnote}</span>
                  )}
                </div>
              </div>

              {/* Monitor Block */}
              <div className="lg:col-span-5 w-full">{project.monitor}</div>
            </div>
          </div>
        </SpotlightCard>

        {/* Project CTA Banner */}
        <div className="w-full flex flex-col items-center mt-6">
          <div
            className={`w-full max-w-2xl bg-[#0a101d] border ${project.borderColor} rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md`}
          >
            <div className="flex items-center gap-3">
              <project.cta.icon className={`w-6 h-6 shrink-0 ${project.accentText}`} />
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold text-[#f8fafc]">
                  {project.cta.title}
                </span>
                <span className="text-xs text-[#94a3b8]">{project.cta.desc}</span>
              </div>
            </div>
            <Magnetic strength={0.3}>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap ${project.cta.btnClass}`}
                href={project.cta.buttonLink}
              >
                {project.id === '01' ? (
                  <Send className="w-4 h-4" />
                ) : project.id === '02' ? (
                  <Mail className="w-4 h-4" />
                ) : (
                  <MessageSquare className="w-4 h-4" />
                )}
                <span>{project.cta.buttonText}</span>
              </motion.a>
            </Magnetic>
          </div>
        </div>
    </>
  );

  if (isMobile) {
    return (
      <div ref={setRefs} className="relative w-full pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          data-cursor="project"
          className="w-full pb-8"
        >
          {cardBody}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={setRefs}
      className="relative w-full"
      style={{ minHeight: isLast ? '100vh' : '135vh' }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y: translateY,
          top: topOffset,
          zIndex: 10 + index,
        }}
        data-cursor="project"
        className="sticky w-full pb-8"
      >
        {cardBody}
      </motion.div>
    </div>
  );
};

export default function ProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const scrollToProject = (idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (STACK_BASE_OFFSET - 40);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const activeProject = PROJECTS[activeProjectIndex];

  return (
    <div className="relative w-full" id="projects">
      {/* Sticky Mini-Nav: title + real-time-synced project selector */}
      <div className="sticky top-16 z-30 bg-[#05070d]/95 md:bg-[#05070d]/90 backdrop-blur-none md:backdrop-blur-md border-b border-[#1e293b]/50 py-4">
        <div className="flex flex-col gap-2 max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span>$ cd /projects/0{activeProject.id}-system && cat manifest.json</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#f8fafc] tracking-tight font-bold">
                Production Systems Showcase
              </h2>
              <p className="text-sm text-[#94a3b8]">
                Architectural deep dives into production-deployed applications. Scroll to traverse projects.
              </p>
            </div>

            {/* Direct Project Selectors */}
            <div className="flex items-center bg-[#0a101d] p-1 border border-[#1e293b] rounded-lg font-mono text-xs shrink-0">
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(idx)}
                  className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                    activeProjectIndex === idx
                      ? 'bg-[#1a2332] text-cyan-400 border border-cyan-400/40 font-semibold shadow-sm'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  <span>0{p.id}</span>
                  <span className="hidden sm:inline">// {NAV_LABELS[p.id]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sequential Sticky Stack — all 3 projects continuously mounted */}
      <div className="relative w-full px-5 md:px-10 max-w-[1440px] mx-auto pt-6">
        {PROJECTS.map((project, idx) => (
          <ProjectStackCard
            key={project.id}
            project={project}
            index={idx}
            isLast={idx === PROJECTS.length - 1}
            registerRef={(el) => {
              cardRefs.current[idx] = el;
            }}
            onActive={() => setActiveProjectIndex(idx)}
          />
        ))}

        {/* Scroll Indicator Tag */}
        <div className="flex items-center justify-center gap-2 pb-10 -mt-6 relative z-0 text-[#64748b] font-mono text-[11px]">
          <span>PROJECT //</span>
          <span className="text-cyan-400 font-bold">0{activeProjectIndex + 1} OF 0{PROJECTS.length}</span>
        </div>
      </div>
    </div>
  );
}
