import { motion } from 'motion/react';
import { Terminal, Award, Trophy, Rocket, Activity } from 'lucide-react';
import CountUp from './CountUp';
import SpotlightCard from './effects/SpotlightCard';

export default function AchievementsSection() {
  const metrics = [
    {
      label: 'ALGORITHMIC MASTERY',
      value: '100+',
      color: 'text-cyan-400',
      hoverBorder: 'hover:border-cyan-400/50',
      desc: 'DSA Problems Solved across LeetCode & GeeksforGeeks platforms.',
      icon: Award,
    },
    {
      label: 'COMPETITIVE CODING',
      value: '3rd',
      color: 'text-blue-400',
      hoverBorder: 'hover:border-blue-500/50',
      desc: 'Place — Inter-Department College Coding Contest @ DAV College.',
      icon: Trophy,
    },
    {
      label: 'APPLICATIONS SHIPPED',
      value: '5+',
      color: 'text-purple-400',
      hoverBorder: 'hover:border-purple-500/50',
      desc: 'Production Applications Deployed handling authenticated traffic and AI calls.',
      icon: Rocket,
    },
    {
      label: 'UPTIME COMMITMENT',
      value: '99.9%',
      color: 'text-cyan-300',
      hoverBorder: 'hover:border-cyan-300/50',
      desc: 'Service Reliability observed across cloud deployed services.',
      icon: Activity,
    },
  ];

  return (
    <section className="py-14 border-t border-[#1e293b]/40 flex flex-col gap-8" id="achievements">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span>$ telemetry --quantified-metrics</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[#f8fafc] tracking-tight font-bold">
          Quantified Milestones
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
            <SpotlightCard className="rounded-lg h-full" color="rgba(139, 92, 246, 0.14)">
              <div
                className={`p-6 bg-[#0f1726] border border-[#1e293b] rounded-lg flex flex-col justify-between gap-3 ${metric.hoverBorder} transition-all duration-300 shadow-md h-full`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#64748b] font-semibold">
                    {metric.label}
                  </span>
                  <motion.div whileHover={{ rotate: 15 }}>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </motion.div>
                </div>

                <div className={`font-display text-4xl sm:text-5xl font-bold ${metric.color}`}>
                  <CountUp value={metric.value} duration={1.2} />
                </div>

                <span className="text-xs text-[#94a3b8] leading-relaxed">{metric.desc}</span>
              </div>
            </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
