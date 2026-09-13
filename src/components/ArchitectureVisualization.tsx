import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, 
  ShieldCheck, 
  KeyRound, 
  Cpu, 
  Database, 
  Cloud, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Server
} from 'lucide-react';

interface ArchitectureTier {
  id: string;
  name: string;
  shortName: string;
  role: string;
  protocol: string;
  badge: string;
  badgeColor: string;
  icon: typeof Laptop;
  components: string[];
  responsibilities: string[];
  securityControls: string[];
  contracts: string;
}

export default function ArchitectureVisualization() {
  const [activeTab, setActiveTab] = useState<'topology' | 'flow' | 'security'>('topology');
  const [selectedTierId, setSelectedTierId] = useState<string>('gateway');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const tiers: ArchitectureTier[] = [
    {
      id: 'client',
      name: 'Client Presentation Tier',
      shortName: 'Client UI',
      role: 'Single Page Application (SPA)',
      protocol: 'HTTPS / TLS 1.3',
      badge: 'LAYER 01',
      badgeColor: 'border-cyan-400/30 text-cyan-400 bg-cyan-400/10',
      icon: Laptop,
      components: ['React 19 Core', 'Tailwind CSS Tokens', 'Optimistic UI State', 'Axios Interceptors'],
      responsibilities: [
        'Render atomic responsive interface tokens with sub-millisecond client reactivity',
        'Transparent JWT bearer token attachment on outgoing API requests',
        'Automatic token refresh handshake interception on HTTP 401 unauthorized errors',
        'Defensive input validation before network payload dispatch',
      ],
      securityControls: [
        'Client-side sanitization preventing XSS injections',
        'Zero sensitive credentials stored in LocalStorage',
        'Strict Content-Security-Policy (CSP) enforcement',
      ],
      contracts: 'POST /api/v1/* (JSON Payload, Authorization: Bearer <token>)',
    },
    {
      id: 'ingress',
      name: 'Edge & Ingress Gateway',
      shortName: 'Perimeter Shield',
      role: 'Network Ingress & Filtering',
      protocol: 'WSS / HTTPS :443',
      badge: 'LAYER 02',
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      icon: ShieldCheck,
      components: ['Reverse Proxy / Nginx', 'express-rate-limit', 'Helmet Middleware', 'CORS Allowlist'],
      responsibilities: [
        'SSL/TLS termination and HTTP to HTTPS automated upgrade redirects',
        'Token-bucket rate limiting to mitigate brute-force and DDoS flooding',
        'CORS matrix validation against trusted production client origins',
        'Payload size capping and gzip/brotli compression proxying',
      ],
      securityControls: [
        'Strict-Transport-Security (HSTS) with 1-year preload',
        'X-Frame-Options: SAMEORIGIN & X-Content-Type-Options: nosniff',
        'Per-IP sliding window request quotas (100 req / 15m)',
      ],
      contracts: 'Incoming client TCP streams terminated -> Forwarded to internal micro-router',
    },
    {
      id: 'gateway',
      name: 'Authentication & Zero-Trust RBAC',
      shortName: 'Auth Boundary',
      role: 'Identity & Access Verification',
      protocol: 'Internal IPC / HTTP',
      badge: 'LAYER 03',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      icon: KeyRound,
      components: ['HMAC-SHA256 Validator', 'HttpOnly Cookie Rotator', 'RBAC Permission Gates', 'Session Invalidation'],
      responsibilities: [
        'Verify cryptographic signatures of short-lived JWT access tokens (15m)',
        'Rotate HttpOnly encrypted refresh tokens with reuse-detection blacklisting',
        'Role-Based Access Control: evaluate User vs. Admin permission vectors per route',
        'Decouple authenticated user context into request headers for downstream handlers',
      ],
      securityControls: [
        'No secret exposure to client JavaScript runtime (HttpOnly, SameSite=Strict)',
        'Replay-attack mitigation via cryptographic nonce validation',
        'Stateless verification without querying primary database on every request',
      ],
      contracts: 'req.user = { id: string, role: "ADMIN" | "USER", permissions: string[] }',
    },
    {
      id: 'service',
      name: 'Core Service & Domain Logic',
      shortName: 'Business Logic',
      role: 'Decoupled MVC Controllers',
      protocol: 'RPC / Async Bus',
      badge: 'LAYER 04',
      badgeColor: 'border-cyan-400/30 text-cyan-400 bg-cyan-400/10',
      icon: Cpu,
      components: ['Transaction Service', 'Idempotency Key Cache', 'Gemini AI Orchestrator', 'Zod Payload Schemas'],
      responsibilities: [
        'Isolate business logic cleanly from HTTP transport layers',
        'Idempotent mutation processing to prevent duplicate ledger transactions',
        'Streaming orchestration with Google Gemini API & LLaMA AI models',
        'Uniform domain error handling with typed exception boundaries',
      ],
      securityControls: [
        'Strict Zod schema parsing discarding unauthorized fields',
        'Server-only API key isolation (process.env.GEMINI_API_KEY never in frontend)',
        'Structured audit logging on high-privilege administrative actions',
      ],
      contracts: 'executeBusinessTransaction(dto: ValidatedPayload): Promise<ServiceResult>',
    },
    {
      id: 'persistence',
      name: 'Data Persistence & Storage Fabric',
      shortName: 'ACID Storage',
      role: 'Transactional Data Store',
      protocol: 'MongoDB WiredTiger / TCP',
      badge: 'LAYER 05',
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      icon: Database,
      components: ['MongoDB Replica Cluster', 'Client Session Handler', 'Compound Index Matrix', 'Mongoose Aggregate Engine'],
      responsibilities: [
        'Multi-document ACID transactions with automated rollback on execution fault',
        'Optimized compound indexing for high-frequency queries and ledger scans',
        'Aggregated analytical queries for reporting and resume competency vectors',
        'Atomic decrement/increment operations with strict balance safety guarantees',
      ],
      securityControls: [
        'Encrypted at rest (AES-256) and TLS encryption in transit',
        'Isolated database subnetwork VPC accessible solely by API service nodes',
        'Role-scoped database credentials with least-privilege permissions',
      ],
      contracts: 'session.startTransaction() -> atomic commit -> session.endSession()',
    },
    {
      id: 'cloud',
      name: 'Cloud Deployment & Infrastructure',
      shortName: 'Cloud Mesh',
      role: 'Containerized Compute & Storage',
      protocol: 'AWS VPC / Docker',
      badge: 'LAYER 06',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      icon: Cloud,
      components: ['Docker Alpine Images', 'AWS EC2 Compute', 'AWS S3 Asset Bucket', 'Vercel / Render CI/CD'],
      responsibilities: [
        'Lightweight multi-stage container builds ensuring minimal attack surface',
        'Direct multi-part presigned S3 media ingestion with Multer streaming',
        'Automated CI/CD build verification and rolling zero-downtime container updates',
        'Continuous health probe heartbeats and centralized log telemetry',
      ],
      securityControls: [
        'Non-root container execution within isolated Linux namespaces',
        'IAM role-based least privilege policies for cloud resource access',
        'Automated vulnerability dependency auditing during continuous build step',
      ],
      contracts: 'Container health probe: GET /health -> 200 OK',
    },
  ];

  const selectedTier = tiers.find((t) => t.id === selectedTierId) || tiers[2];

  const flowSteps = [
    {
      step: '1',
      title: 'Client Request Dispatched',
      actor: 'React SPA Client',
      action: 'User initiates an action (e.g. transfer, analyze resume, checkout order). Axios interceptor injects the HMAC-signed JWT token.',
      protocol: 'HTTPS TLS 1.3',
      color: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
    },
    {
      step: '2',
      title: 'Ingress & Rate Limiting Verification',
      actor: 'Reverse Proxy & Gateway',
      action: 'Perimeter evaluates IP sliding-window quota, validates CORS origin, and applies Helmet defense headers before forwarding.',
      protocol: 'Reverse Proxy',
      color: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
    },
    {
      step: '3',
      title: 'Cryptographic Auth & RBAC Evaluation',
      actor: 'JWT Guard Middleware',
      action: 'Verifies HMAC-SHA256 signature and expiration timestamp. Assesses role privileges (e.g. Admin, Customer) for the requested route.',
      protocol: 'Zero-Trust Gate',
      color: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
    },
    {
      step: '4',
      title: 'Idempotency Check & Business Controller',
      actor: 'Service Layer (MVC)',
      action: 'Validates request payload against strict schema. Checks idempotency cache to prevent duplicate mutations.',
      protocol: 'Domain Logic',
      color: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
    },
    {
      step: '5',
      title: 'ACID Transaction Execution',
      actor: 'MongoDB WiredTiger',
      action: 'Opens client session, commits atomic ledger mutations across multiple collections. Rollback occurs automatically on failure.',
      protocol: 'ACID Multi-Doc',
      color: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
    },
    {
      step: '6',
      title: 'Validated Response & Telemetry Commit',
      actor: 'Gateway -> Client',
      action: 'Sanitized JSON payload returned with HTTP 200 OK. State updates optimistically and securely on client interface.',
      protocol: 'HTTP 200 OK',
      color: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
    },
  ];

  return (
    <div 
      id="architecture"
      data-cursor="target"
      className="w-full bg-[#05070d] border border-[#1e293b] rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden"
    >
      {/* Top Banner & Tab Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e293b]/60 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse"></span>
            <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
              PROJECT ARCHITECTURE VISUALIZATION
            </span>
          </div>
          <h3 className="font-display text-xl text-[#f8fafc] font-bold">
            End-to-End System Topology &amp; Security Perimeter
          </h3>
          <p className="text-xs text-[#94a3b8]">
            Interactive blueprint detailing component isolation, network boundaries, and transactional guarantees.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-[#0a101d] p-1 border border-[#1e293b] rounded-lg font-mono text-xs">
          <button
            onClick={() => setActiveTab('topology')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'topology'
                ? 'bg-[#1a2332] text-cyan-400 border border-cyan-400/40 shadow-sm'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>TOPOLOGY TIERS</span>
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'flow'
                ? 'bg-[#1a2332] text-blue-400 border border-blue-500/40 shadow-sm'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>REQUEST LIFECYCLE</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'bg-[#1a2332] text-purple-400 border border-purple-500/40 shadow-sm'
                : 'text-[#94a3b8] hover:text-[#f8fafc]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>ISOLATION BOUNDARIES</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: TOPOLOGY TIERS (Interactive Layer Inspector) */}
        {activeTab === 'topology' && (
          <motion.div
            key="topology"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Left Column: Visual Architecture Pipeline Map */}
            <div className="lg:col-span-6 flex flex-col gap-2.5">
              <span className="font-mono text-[11px] text-[#64748b] tracking-wider uppercase font-semibold">
                SELECT LAYER TO INSPECT CONTRACT &amp; CONTROLS:
              </span>
              <div className="flex flex-col gap-2">
                {tiers.map((tier, idx) => {
                  const Icon = tier.icon;
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <div key={tier.id} className="flex flex-col items-center w-full">
                      <motion.button
                        whileHover={{ scale: 1.015, x: 3 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#0f1726] border-cyan-400 shadow-lg shadow-cyan-400/10'
                            : 'bg-[#0a101d] border-[#1e293b] hover:border-[#334155] hover:bg-[#0f1726]/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${tier.badgeColor}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 font-display text-sm font-semibold text-[#f8fafc]">
                              <span>{tier.name}</span>
                              <span className={`px-1.5 py-0.2 text-[10px] font-mono rounded border ${tier.badgeColor}`}>
                                {tier.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#94a3b8] font-sans">{tier.role}</span>
                          </div>
                        </div>
                        <div className="text-right font-mono text-[11px] text-[#64748b] hidden sm:block">
                          <span>{tier.protocol}</span>
                        </div>
                      </motion.button>

                      {idx < tiers.length - 1 && (
                        <div className="h-3 w-0.5 bg-gradient-to-b from-cyan-400/40 via-blue-500/40 to-purple-500/40 my-0.5 relative overflow-hidden">
                          {/* Animated packet traveling down */}
                          <motion.div 
                            animate={{ y: ['-100%', '300%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: idx * 0.3 }}
                            className="w-full h-2 bg-cyan-400 rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Deep Layer Contract & Specifications Card */}
            <motion.div 
              key={selectedTier.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-6 bg-[#0a101d] border border-[#1e293b] rounded-xl p-5 md:p-6 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between border-b border-[#1e293b]/50 pb-3">
                <div className="flex items-center gap-2.5">
                  <selectedTier.icon className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h4 className="font-display text-base text-[#f8fafc] font-bold">
                      {selectedTier.name}
                    </h4>
                    <span className="font-mono text-xs text-[#94a3b8]">{selectedTier.role}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono text-[11px] border ${selectedTier.badgeColor}`}>
                  {selectedTier.protocol}
                </span>
              </div>

              {/* Component Building Blocks */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] text-[#64748b] uppercase tracking-wider">
                  CORE MODULES &amp; INTERFACES:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTier.components.map((comp) => (
                    <motion.span
                      key={comp}
                      whileHover={{ scale: 1.05 }}
                      className="px-2.5 py-1 bg-[#1a2332] border border-[#1e293b] text-[#f8fafc] font-mono text-xs rounded transition-colors hover:border-cyan-400/50"
                    >
                      {comp}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Architectural Responsibilities */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] text-[#64748b] uppercase tracking-wider">
                  ARCHITECTURAL RESPONSIBILITIES:
                </span>
                <div className="space-y-1.5">
                  {selectedTier.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#94a3b8] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Controls */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] text-[#64748b] uppercase tracking-wider">
                  SECURITY CONTROLS:
                </span>
                <div className="space-y-1.5">
                  {selectedTier.securityControls.map((sec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#94a3b8] leading-relaxed">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Schema */}
              <div className="p-3 bg-[#05070d] border border-[#1e293b] rounded font-mono text-[11px] text-cyan-300">
                <span className="text-[#64748b] block text-[10px] uppercase font-semibold mb-1">
                  INTERFACE SIGNATURE / CONTRACT:
                </span>
                <code>{selectedTier.contracts}</code>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* VIEW 2: REQUEST LIFECYCLE (Sequential Flow Tracing) */}
        {activeTab === 'flow' && (
          <motion.div
            key="flow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8]">
              <span>TRANSACTION LIFECYCLE TRACE (1 REQUEST &rarr; 1 ATOMIC STATE MUTATION)</span>
              <span className="text-cyan-400 font-semibold">STATUS: DETERMINISTIC</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flowSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  whileHover={{ y: -3 }}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    activeStepIndex === idx
                      ? 'bg-[#0f1726] border-cyan-400 shadow-md shadow-cyan-400/10'
                      : 'bg-[#0a101d] border-[#1e293b] hover:border-[#334155]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`px-2 py-0.5 rounded font-mono text-xs border ${step.color}`}>
                      STEP 0{step.step}
                    </div>
                    <span className="font-mono text-[10px] text-[#64748b]">{step.protocol}</span>
                  </div>
                  <div>
                    <h5 className="font-display text-sm font-semibold text-[#f8fafc] mb-1">
                      {step.title}
                    </h5>
                    <span className="font-mono text-[11px] text-cyan-400 block mb-2">
                      // {step.actor}
                    </span>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">{step.action}</p>
                  </div>
                  <div className="pt-2 border-t border-[#1e293b]/40 flex items-center justify-between text-[11px] font-mono text-[#64748b]">
                    <span>REVERSIBLE: NO</span>
                    <span className="text-cyan-400">PASSED ✓</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-[#0a101d] border border-cyan-400/30 rounded-xl flex items-center justify-between gap-4 font-mono text-xs text-[#94a3b8]">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>
                  <strong>IDEMPOTENCY GUARANTEE:</strong> Duplicate client dispatches within 60 seconds are safely intercepted at the service boundary with identical cached ledger hashes, preventing double-billing or concurrent race mutations.
                </span>
              </div>
              <span className="text-cyan-400 font-bold shrink-0 hidden sm:inline">RFC-7231 COMPLIANT</span>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: ISOLATION BOUNDARIES (Zero-Trust Security Perimeter) */}
        {activeTab === 'security' && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Zone 1: Public Zone */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-[#0a101d] border border-cyan-400/30 rounded-xl flex flex-col gap-4 transition-all"
            >
              <div className="flex items-center justify-between border-b border-cyan-400/20 pb-3">
                <span className="font-mono text-xs text-cyan-400 font-bold">ZONE A // PUBLIC PERIMETER</span>
                <Laptop className="w-4 h-4 text-cyan-400" />
              </div>
              <h5 className="font-display text-base text-[#f8fafc] font-semibold">
                Client &amp; CDN Edge
              </h5>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Browser execution sandbox. Strictly untrusted territory with zero persistent secrets or database handles.
              </p>
              <div className="space-y-2 text-xs font-mono text-[#94a3b8] pt-2">
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • CORS: Origin Allowlist
                </div>
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • CSP: Nonce-based scripts
                </div>
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • XSS: React auto-escaping
                </div>
              </div>
            </motion.div>

            {/* Zone 2: DMZ & API Gateway */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-[#0a101d] border border-blue-500/30 rounded-xl flex flex-col gap-4 transition-all"
            >
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
                <span className="font-mono text-xs text-blue-400 font-bold">ZONE B // AUTH &amp; ROUTER DMZ</span>
                <Server className="w-4 h-4 text-blue-400" />
              </div>
              <h5 className="font-display text-base text-[#f8fafc] font-semibold">
                Protected Ingress Gateway
              </h5>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Verifies identities, parses payload bounds, and isolates services from raw external network sockets.
              </p>
              <div className="space-y-2 text-xs font-mono text-[#94a3b8] pt-2">
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • JWT HMAC-SHA256 signature
                </div>
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • HttpOnly SameSite=Strict cookies
                </div>
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • Rate limiting: 100 req/15m
                </div>
              </div>
            </motion.div>

            {/* Zone 3: Private Storage VPC */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 bg-[#0a101d] border border-purple-500/30 rounded-xl flex flex-col gap-4 transition-all"
            >
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <span className="font-mono text-xs text-purple-400 font-bold">ZONE C // PRIVATE ISOLATED VPC</span>
                <Database className="w-4 h-4 text-purple-400" />
              </div>
              <h5 className="font-display text-base text-[#f8fafc] font-semibold">
                ACID Storage &amp; AI Engine
              </h5>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Completely shielded private subnet with no public internet ingress; accepts connections solely from verified backend services.
              </p>
              <div className="space-y-2 text-xs font-mono text-[#94a3b8] pt-2">
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • WiredTiger multi-doc ACID sessions
                </div>
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • At-rest AES-256 encryption
                </div>
                <div className="p-2 bg-[#05070d] rounded border border-[#1e293b]">
                  • Server-side Gemini API key isolation
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
