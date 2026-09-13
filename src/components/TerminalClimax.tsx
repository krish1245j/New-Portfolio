import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Send, Trash2 } from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';
import Magnetic from './effects/Magnetic';

interface TerminalEntry {
  id: string;
  command: string;
  output: string;
  isHtml?: boolean;
}

const COMMAND_RESPONSES: Record<string, string> = {
  whoami: "KRISH KUMAR // Backend Engineer & Full-Stack MERN Developer\nBCA Scholar @ DAV College, Amritsar (2024–2027). Dedicated to high-throughput secure systems.",
  skills: "Node.js (92%), Express.js (90%), REST APIs (94%), MongoDB (88%), React (85%), Docker (84%), AWS (80%), JWT/RBAC (88%), LeetCode 100+.",
  projects: "• AI Resume Analyzer & Job Matcher (LLaMA, Gemini API, Express.js)\n• Full-Stack E-Commerce Engine & Admin Command (RBAC, Multer S3)\n• Advanced Banking & Ledger Transaction System (Node.js, MongoDB ACID, Idempotency).",
  status: "100+ DSA Problems | 3rd Place Coding Contest | Production MERN Apps | 99.9% Uptime Guarantee.",
  connect: "Status: READY\nEmail: krish1245j@gmail.com\nGitHub: https://github.com/kumar-krish\nLinkedIn: https://linkedin.com/in/krishkumar-eng",
  contact: "Status: READY\nEmail: krish1245j@gmail.com\nGitHub: https://github.com/kumar-krish\nLinkedIn: https://linkedin.com/in/krishkumar-eng",
  architecture: "Core Architecture: Multi-tier Clean Architecture (Client SPA -> Ingress Shield -> JWT Auth Guard -> MVC Service Layer -> MongoDB ACID WiredTiger -> Docker on AWS).",
  ping: "PING 127.0.0.1: 56 data bytes. 64 bytes from local: icmp_seq=1 ttl=64 time=0.08 ms",
  sudo: "Permission denied: Krish holds superuser authority on this node.",
  exit: "Session persisted in background daemon. Type commands anytime.",
  help: "Available commands: whoami, skills, projects, status, architecture, connect, contact, ping, clear, sudo, exit.",
};

export default function TerminalClimax() {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [typedPrompt, setTypedPrompt] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const [hasAutoTyped, setHasAutoTyped] = useState(false);

  // Initial sequence to simulate live typing and sequential terminal output
  useEffect(() => {
    if (!isInView || hasAutoTyped) return;
    setHasAutoTyped(true);

    const initialQueue: { cmd: string; out: string; isHtml?: boolean }[] = [
      {
        cmd: 'whoami',
        out: 'KRISH KUMAR // Backend Engineer & Full-Stack MERN Developer\nBCA Scholar @ DAV College, Amritsar (2024–2027)',
      },
      {
        cmd: 'skills',
        out: 'Node.js, Express.js, MongoDB, React, Docker, AWS, JWT, RBAC, REST APIs, Mongoose, Tailwind CSS',
      },
      {
        cmd: 'connect',
        out: 'Status: READY\nEmail: krish1245j@gmail.com\nGitHub: https://github.com/kumar-krish\nLinkedIn: https://linkedin.com/in/krishkumar-eng',
        isHtml: true,
      },
    ];

    let currentItem = 0;

    const playNext = () => {
      if (currentItem >= initialQueue.length) return;
      const item = initialQueue[currentItem];
      let charIdx = 0;

      const typeInterval = setInterval(() => {
        charIdx++;
        setTypedPrompt(item.cmd.slice(0, charIdx));

        if (charIdx >= item.cmd.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setEntries((prev) => [
              ...prev,
              {
                id: `auto-${currentItem}-${Date.now()}`,
                command: item.cmd,
                output: item.out,
                isHtml: item.isHtml,
              },
            ]);
            setTypedPrompt('');
            currentItem++;
            setTimeout(playNext, 400);
          }, 250);
        }
      }, 45);
    };

    const startTimer = setTimeout(playNext, 600);
    return () => clearTimeout(startTimer);
  }, [isInView, hasAutoTyped]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [entries, typedPrompt]);

  const executeCommand = (cmd: string) => {
    const sanitized = cmd.trim().toLowerCase();
    if (!sanitized) return;

    if (sanitized === 'clear') {
      setEntries([]);
      return;
    }

    const response =
      COMMAND_RESPONSES[sanitized] ||
      `Command not recognized: '${sanitized}'. Type 'help' for executable instructions.`;

    setEntries((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: sanitized,
        output: response,
        isHtml: sanitized === 'connect' || sanitized === 'contact',
      },
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  const handleSubmit = () => {
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <section 
      ref={containerRef}
      className="py-14 border-t border-[#1e293b]/40 flex flex-col gap-6 mb-12" 
      id="terminal-climax"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center gap-2"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>TERMINAL CLIMAX // INTERACTIVE SHELL</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-[#f8fafc] tracking-tight font-bold">
          One last command.
        </h2>
        <p className="text-sm text-[#94a3b8] max-w-xl">
          Interact directly with the developer kernel below. Click quick triggers or type your own bash directives.
        </p>
      </motion.div>

      {/* Terminal Container Box with entrance animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl mx-auto"
      >
        <SpotlightCard className="rounded-2xl" color="rgba(6, 182, 212, 0.13)" size={460}>
        <div className="bg-[#05070d] border border-[#1e293b]/80 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
        {/* Terminal Header */}
        <div className="h-11 bg-[#0f1726] px-4 flex items-center justify-between border-b border-[#1e293b]/50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#22c55e] inline-block"></span>
            <span className="ml-3 text-xs text-[#94a3b8]">krish@dev:~ (zsh)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse"></span>
            <span>SHELL SESSION: ACTIVE</span>
          </div>
        </div>

        {/* Fast Action Trigger Bar */}
        <div className="px-4 py-2.5 bg-[#0a101d] border-b border-[#1e293b]/40 flex flex-wrap items-center gap-2">
          <span className="text-[#64748b] mr-1">EXECUTE:</span>
          {['whoami', 'skills', 'projects', 'status', 'connect'].map((cmd) => (
            <motion.button
              key={cmd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 bg-[#0f1726] hover:bg-cyan-400/20 hover:text-cyan-400 text-[#94a3b8] text-[11px] rounded border border-[#1e293b]/50 transition-colors cursor-pointer"
            >
              [{cmd}]
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => executeCommand('clear')}
            className="px-2.5 py-1 bg-[#0f1726] hover:bg-red-500/20 hover:text-red-400 text-[#94a3b8] text-[11px] rounded border border-[#1e293b]/50 transition-colors ml-auto flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>[clear]</span>
          </motion.button>
        </div>

        {/* Terminal Output Log */}
        <div
          ref={outputRef}
          className="p-6 space-y-4 min-h-[360px] max-h-[480px] overflow-y-auto leading-relaxed"
        >
          <div className="text-[#64748b] text-xs border-b border-[#1e293b]/30 pb-2">
            SYSTEM INITIALIZED: KERNEL v5.15-ARCH // KRISH ENGINE ONLINE<br />
            Type 'help' or click fast actions above to execute runtime telemetry.
          </div>

          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-cyan-400 font-semibold">krish@dev:~$</span>{' '}
              <span className="text-[#f8fafc]">{entry.command}</span>
              {entry.isHtml ? (
                <div className="text-[#94a3b8] mt-1 pl-4 border-l-2 border-cyan-400/50 space-y-1">
                  <div>Status: <span className="text-cyan-400 font-bold">READY</span></div>
                  <div>Email: <a href="mailto:krish1245j@gmail.com" className="text-cyan-400 hover:underline">krish1245j@gmail.com</a></div>
                  <div>GitHub: <a href="https://github.com/kumar-krish" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">github.com/kumar-krish</a></div>
                  <div>LinkedIn: <a href="https://linkedin.com/in/krishkumar-eng" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">linkedin.com/in/krishkumar-eng</a></div>
                </div>
              ) : (
                <p className="text-[#94a3b8] mt-1 pl-4 border-l-2 border-cyan-400/40 whitespace-pre-line">
                  {entry.output}
                </p>
              )}
            </motion.div>
          ))}

          {/* Typing animation preview */}
          {typedPrompt && (
            <div className="text-cyan-400">
              <span className="font-semibold">krish@dev:~$</span>{' '}
              <span className="text-[#f8fafc]">{typedPrompt}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-0.5 font-bold text-cyan-400"
              >
                _
              </motion.span>
            </div>
          )}

          {!typedPrompt && (
            <div className="pt-2 text-[#64748b]">
              <span className="text-cyan-400 font-semibold">krish@dev:~$</span>{' '}
              <span>awaiting instruction</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1 font-bold text-cyan-400"
              >
                _
              </motion.span>
            </div>
          )}
        </div>

        {/* Terminal Interactive Input */}
        <div className="p-3 bg-[#0a101d] border-t border-[#1e293b]/50 flex items-center gap-2">
          <span className="text-cyan-400 font-semibold pl-2">krish@dev:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'whoami', 'skills', 'projects', 'status', 'architecture', 'connect', or 'help'..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#f8fafc] placeholder:text-[#64748b]/60 focus:ring-0"
          />
          <Magnetic strength={0.35}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-4 py-1.5 bg-cyan-400 text-[#083344] text-xs rounded font-bold hover:bg-cyan-300 transition-colors font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SEND</span>
            </motion.button>
          </Magnetic>
        </div>
        </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
}
