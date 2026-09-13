/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import AboutManifesto from './components/AboutManifesto';
import SystemsSection from './components/SystemsSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import JourneySection from './components/JourneySection';
import ContactSection from './components/ContactSection';
import TerminalClimax from './components/TerminalClimax';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import InitialLoader from './components/InitialLoader';
import SmoothScroll from './components/effects/SmoothScroll';
import ParticleField from './components/effects/ParticleField';
import GrainOverlay from './components/effects/GrainOverlay';

export default function App() {
  return (
    <div className="bg-[#060A13] font-sans text-[#f8fafc] antialiased selection:bg-blue-600 selection:text-white min-h-screen relative overflow-x-clip">
      {/* Buttery Inertia Smooth Scroll */}
      <SmoothScroll />

      {/* Boot Loader Sequence */}
      <InitialLoader />

      {/* Smooth Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Film Grain */}
      <GrainOverlay />

      {/* Top Header Navigation */}
      <Header />

      <main className="w-full pt-16 bg-[#060A13]">
        <div className="flex flex-col w-full text-[#f8fafc] bg-[#05070d] antialiased relative">
          
          {/* Ambient Grid, Glow & Interactive Particle Network Background */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
            <div className="absolute -top-[20%] left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[60px] md:blur-[140px] animate-drift-a"></div>
            <div className="absolute top-[45%] -right-[10%] w-[550px] h-[550px] bg-cyan-400/10 rounded-full blur-[70px] md:blur-[160px] animate-drift-b"></div>
            <div className="absolute -bottom-[10%] left-10 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[80px] md:blur-[180px] animate-drift-c"></div>
            <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sys-grid-pat" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path
                    d="M 48 0 L 0 0 0 48"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="0.7"
                  />
                  <circle cx="0" cy="0" r="1" fill="#06b6d4" fillOpacity="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sys-grid-pat)" />
            </svg>
            <ParticleField />
          </div>

          {/* Main Content Column */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col gap-20">
            {/* 1. Hero with Word Reveal & Scroll Parallax */}
            <Hero />

            {/* 2. About & Manifesto */}
            <AboutManifesto />

            {/* 3. Systems Architecture (with Clean Project Architecture Visualization & Animated Packets) */}
            <SystemsSection />

            {/* 4. Skills & Quantitative Proficiency (Staggered 0% -> Target Animated Bars) */}
            <SkillsSection />

            {/* 5. Production Systems Showcase (Sticky Scroll-Driven Cinematic Showcase) */}
            <ProjectsSection />

            {/* 6. Quantified Achievements (Smooth Metric Counter Animations) */}
            <AchievementsSection />

            {/* 7. Engineering Journey (Dynamic Progress Line Drawing & Illuminated Nodes) */}
            <JourneySection />

            {/* 8. Contact & Dispatch Form (Progressive Reveal) */}
            <ContactSection />

            {/* 9. Final Terminal CLI Climax (Typing Simulation & Sequential Telemetry) */}
            <TerminalClimax />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
