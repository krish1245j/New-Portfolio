import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Send, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Globe, 
  ArrowUpRight,
  CheckCircle2 
} from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';
import Magnetic from './effects/Magnetic';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: '',
    message: '',
  });
  const [isTransmitted, setIsTransmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsTransmitted(true);
    setFormData({ name: '', email: '', scope: '', message: '' });
    setTimeout(() => {
      setIsTransmitted(false);
    }, 7000);
  };

  return (
    <section className="py-14 border-t border-[#1e293b]/40 flex flex-col gap-8" id="contact">
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
          <span>$ krish@dev:~$ connect --secure --channel=primary</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[#f8fafc] tracking-tight font-bold">
          Let's build something interesting.
        </h2>
        <p className="text-sm text-[#94a3b8] max-w-2xl">
          Have a backend engineering opening, distributed system challenge, or architectural project? Transmit a dispatch directly to my console.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Dispatch Form with smooth reveal */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <SpotlightCard className="rounded-xl" color="rgba(6, 182, 212, 0.14)" size={400}>
          <div className="bg-[#0f1726] border border-[#1e293b] rounded-xl p-6 md:p-8 shadow-xl">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs text-[#94a3b8] uppercase font-semibold">
                  SYSTEM IDENTITY (NAME)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-mono text-cyan-400 text-xs">&gt;</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Rivers"
                    className="w-full bg-[#05070d] border border-[#1e293b]/60 focus:border-cyan-400 focus:outline-none rounded pl-8 pr-3 py-2 font-mono text-xs text-[#f8fafc] placeholder:text-[#64748b]/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs text-[#94a3b8] uppercase font-semibold">
                  SIGNAL FREQUENCY (EMAIL)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-mono text-cyan-400 text-xs">@</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-[#05070d] border border-[#1e293b]/60 focus:border-cyan-400 focus:outline-none rounded pl-8 pr-3 py-2 font-mono text-xs text-[#f8fafc] placeholder:text-[#64748b]/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-[#94a3b8] uppercase font-semibold">
                MISSION DIRECTIVE (SCOPE / ROLE)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-mono text-cyan-400 text-xs">#</span>
                <input
                  type="text"
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  placeholder="Backend Engineer Role / Distributed API Project"
                  className="w-full bg-[#05070d] border border-[#1e293b]/60 focus:border-cyan-400 focus:outline-none rounded pl-8 pr-3 py-2 font-mono text-xs text-[#f8fafc] placeholder:text-[#64748b]/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-[#94a3b8] uppercase font-semibold">
                PAYLOAD CONTENT (MESSAGE)
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Detail your infrastructure architecture, requirements, or team timeline..."
                className="w-full bg-[#05070d] border border-[#1e293b]/60 focus:border-cyan-400 focus:outline-none rounded p-3 font-mono text-xs text-[#f8fafc] placeholder:text-[#64748b]/50 transition-colors"
              ></textarea>
            </div>

            <Magnetic strength={0.15} className="w-full">
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                className="w-full py-3 bg-cyan-400 text-[#083344] font-mono text-xs tracking-wider rounded font-bold hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/10 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>TRANSMIT DISPATCH (ENCRYPTED)</span>
              </motion.button>
            </Magnetic>

            {isTransmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#1a2332] border border-cyan-400/40 text-cyan-400 text-center font-mono text-xs rounded flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>SIGNAL TRANSMITTED: Handshake acknowledged. Dispatch forwarded to krish1245j@gmail.com.</span>
              </motion.div>
            )}
          </form>
          </div>
          </SpotlightCard>
        </motion.div>

        {/* Direct Transmission Channels with motion */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <SpotlightCard className="rounded-xl" color="rgba(139, 92, 246, 0.14)">
          <div className="p-6 bg-[#0f1726] border border-[#1e293b] rounded-xl flex flex-col gap-4 shadow-lg">
            <span className="font-mono text-xs text-[#64748b] uppercase tracking-wider font-bold">
              DIRECT CHANNELS &amp; TELEMETRY
            </span>
            <div className="flex flex-col gap-2.5">
              <motion.a
                whileHover={{ x: 4 }}
                className="p-3 bg-[#0a101d] hover:bg-[#1a2332] border border-[#1e293b]/40 rounded flex items-center justify-between group transition-all"
                href="mailto:krish1245j@gmail.com"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span className="font-mono text-xs text-[#f8fafc]">krish1245j@gmail.com</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#64748b] group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </motion.a>

              <motion.a
                whileHover={{ x: 4 }}
                className="p-3 bg-[#0a101d] hover:bg-[#1a2332] border border-[#1e293b]/40 rounded flex items-center justify-between group transition-all"
                href="https://github.com/kumar-krish"
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-blue-400" />
                  <span className="font-mono text-xs text-[#f8fafc]">github.com/kumar-krish</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#64748b] group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </motion.a>

              <motion.a
                whileHover={{ x: 4 }}
                className="p-3 bg-[#0a101d] hover:bg-[#1a2332] border border-[#1e293b]/40 rounded flex items-center justify-between group transition-all"
                href="https://linkedin.com/in/krishkumar-eng"
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-purple-400" />
                  <span className="font-mono text-xs text-[#f8fafc]">linkedin.com/in/krishkumar-eng</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#64748b] group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </motion.a>
            </div>

            <div className="pt-2 border-t border-[#1e293b]/30 flex flex-col gap-1.5 text-xs text-[#94a3b8] font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Amritsar, Punjab, India (UTC+5:30)</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Open for Worldwide Remote &amp; On-Site Deployments</span>
              </div>
            </div>
          </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
