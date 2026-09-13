import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';

const AVATAR_URL = "https://lh3.googleusercontent.com/aida/AEtjO1VClSAGrPWBW4xBkOl1lvca18dn-_2y0P6XLHC_TU4ya3bUeYatkwkhgDKlWINrsGFAELI4gkgfFQJpq4i8P_FLYFBtjbBRnaPAmu_7cr4P7FHcejFQN9f_LtOVBtFxQlDVqK7WVMK14oih55NwueTTfU4H2M5fFZzG7QNgPCovhKxI40D6wKtF_5Dstbv5ZVbJjtSErM-gzYKLUKFV5an6s4BIhPuh7vQo8bJNixnBtE949EWMNFcKY1E";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { label: 'HOME', href: '#hero', id: 'hero' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SYSTEMS', href: '#systems', id: 'systems' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
    { label: 'JOURNEY', href: '#journey', id: 'journey' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
    { label: 'CLI', href: '#terminal-climax', id: 'terminal-climax', highlight: true },
  ];

  // Update active nav link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(navLinks[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#05070d]/85 backdrop-blur-xl border-b border-[#1e293b]/50"
    >
      {/* Scroll Progress Bar at the Top */}
      <div className="w-full h-0.5 bg-[#1a2332] overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 origin-left"
          style={{ scaleX }}
        />
      </div>

      <div className="h-16 w-full max-w-[1440px] mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-9 w-9 rounded-sm overflow-hidden flex items-center justify-center p-0.5 border border-cyan-400/30 bg-[#0a101d] group-hover:border-cyan-400 transition-colors"
          >
            <img
              src={AVATAR_URL}
              alt="Krish Kumar"
              className="w-full h-full object-cover rounded-sm"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display text-base tracking-tight text-[#f8fafc] font-semibold uppercase">
              KRISH KUMAR
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#94a3b8]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse"></span>
              <span>SYS_NODE_v3.2 // ONLINE</span>
            </div>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-6 text-[12px] font-mono tracking-wider">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  link.highlight
                    ? 'text-cyan-400 hover:text-cyan-300 font-bold'
                    : isActive
                    ? 'text-cyan-400 font-medium'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#0f1726] border border-[#1e293b] rounded font-mono text-[11px] text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span>99.9% UPTIME</span>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2.5 py-1 bg-[#0f1726] border border-[#1e293b] hover:border-cyan-400 text-[#94a3b8] hover:text-[#f8fafc] font-mono text-xs transition-all rounded flex items-center gap-1"
            href="https://github.com/kumar-krish"
            rel="noreferrer"
            target="_blank"
            title="GitHub"
          >
            <span>GITHUB</span>
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#94a3b8] hover:text-[#f8fafc] xl:hidden border border-[#1e293b] rounded bg-[#0f1726]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer with Smooth Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="xl:hidden bg-[#0a101d] border-b border-[#1e293b] px-6 py-4 flex flex-col gap-3 font-mono text-xs overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 border-b border-[#1e293b]/30 flex items-center justify-between ${
                  link.highlight
                    ? 'text-cyan-400 font-bold'
                    : activeSection === link.id
                    ? 'text-cyan-400'
                    : 'text-[#94a3b8]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-[#64748b]">&gt;</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
