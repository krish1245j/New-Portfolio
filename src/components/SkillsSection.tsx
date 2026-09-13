import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Terminal, 
  Server, 
  Database, 
  Monitor, 
  Cloud, 
  Wrench, 
  BrainCircuit 
} from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';

interface SkillItemProps {
  name: string;
  percent: number;
  gradient: string;
  textColor: string;
  delayIndex: number;
}

const SkillBar: React.FC<SkillItemProps> = ({ name, percent, gradient, textColor, delayIndex }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: '-40px' });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frameId: number;
    const startTimeout = setTimeout(() => {
      const startTime = performance.now();
      const duration = 1200; // ms

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCurrentValue(Math.floor(ease * percent));

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setCurrentValue(percent);
        }
      };

      frameId = requestAnimationFrame(step);
    }, delayIndex * 120);

    return () => {
      clearTimeout(startTimeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInView, percent, delayIndex]);

  return (
    <div ref={barRef} className="group/bar">
      <div className="flex justify-between text-xs font-mono mb-1">
        <span className="text-[#f8fafc] group-hover/bar:text-cyan-300 transition-colors">{name}</span>
        <span className={`font-semibold ${textColor}`}>
          {currentValue}%
        </span>
      </div>
      <div className="w-full bg-[#0a101d] h-2 rounded-full overflow-hidden border border-[#1e293b]/40 relative">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full relative`}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${percent}%` } : { width: '0%' }}
          transition={{
            duration: 1.2,
            delay: delayIndex * 0.12,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 rounded-full blur-[1px]"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default function SkillsSection() {
  const categories = [
    {
      number: '01',
      title: 'BACKEND ARCHITECTURE',
      icon: Server,
      color: 'text-cyan-400',
      barGradient: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'Node.js', percent: 92 },
        { name: 'Express.js', percent: 90 },
        { name: 'REST APIs', percent: 94 },
        { name: 'JWT / RBAC Security', percent: 88 },
      ],
    },
    {
      number: '02',
      title: 'DATABASE & STORAGE',
      icon: Database,
      color: 'text-blue-400',
      barGradient: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'MongoDB', percent: 88 },
        { name: 'Mongoose ODM', percent: 86 },
        { name: 'SQL (Relational Queries)', percent: 82 },
      ],
      footerNote: 'Multi-doc transactions, index optimization, & aggregation pipelines',
    },
    {
      number: '03',
      title: 'FRONTEND CLIENT',
      icon: Monitor,
      color: 'text-purple-400',
      barGradient: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'React.js', percent: 85 },
        { name: 'Tailwind CSS', percent: 90 },
        { name: 'HTML5 / CSS3', percent: 92 },
      ],
      footerNote: 'State management, async interceptors, & responsive layout engineering',
    },
    {
      number: '04',
      title: 'DEVOPS & CLOUD',
      icon: Cloud,
      color: 'text-cyan-400',
      barGradient: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'Docker', percent: 84 },
        { name: 'AWS (EC2 & S3)', percent: 80 },
        { name: 'Vercel Cloud', percent: 92 },
        { name: 'Render Cloud', percent: 88 },
      ],
    },
    {
      number: '05',
      title: 'TOOLS & WORKFLOW',
      icon: Wrench,
      color: 'text-blue-400',
      barGradient: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'Git & GitHub', percent: 92 },
        { name: 'Postman API Testing', percent: 90 },
        { name: 'Linux Bash & CLI', percent: 86 },
      ],
      footerNote: 'Automated test suites, CI runners, and Unix system scripting',
    },
    {
      number: '06',
      title: 'CORE PATTERNS & CS',
      icon: BrainCircuit,
      color: 'text-purple-400',
      barGradient: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'MVC Architecture', percent: 90 },
        { name: 'Service Layer Pattern', percent: 88 },
        { name: 'API Security Principles', percent: 86 },
        { name: 'DSA & OOP Foundations', percent: 88 },
      ],
    },
  ];

  return (
    <section className="py-14 border-t border-[#1e293b]/40 flex flex-col gap-8" id="skills">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span>$ krish-env --inspect-runtime --proficiencies</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[#f8fafc] tracking-tight font-bold">
          Skills &amp; Quantitative Proficiency
        </h2>
        <p className="text-sm text-[#94a3b8]">
          Visual mastery across backend pipelines, persistent storage, cloud platforms, and architecture.
        </p>
      </motion.div>

      {/* 6 Proficiency Categories with Animated Horizontal Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, borderColor: 'rgba(6, 182, 212, 0.4)' }}
            >
            <SpotlightCard className="rounded-xl h-full" color="rgba(59, 130, 246, 0.14)">
              <div className="p-6 bg-[#0f1726] border border-[#1e293b] rounded-xl flex flex-col gap-4 transition-all duration-300 shadow-md h-full">
                <div className="flex items-center justify-between border-b border-[#1e293b]/40 pb-2">
                  <span className={`font-mono text-xs font-bold ${cat.color}`}>
                    {cat.number} // {cat.title}
                  </span>
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </motion.div>
                </div>

                <div className="space-y-3 pt-1">
                  {cat.skills.map((skill, sIdx) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      percent={skill.percent}
                      gradient={cat.barGradient}
                      textColor={cat.color}
                      delayIndex={sIdx}
                    />
                  ))}

                  {cat.footerNote && (
                    <div className="pt-2 text-[10px] text-[#64748b] font-mono border-t border-[#1e293b]/30">
                      {cat.footerNote}
                    </div>
                  )}
                </div>
              </div>
            </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
