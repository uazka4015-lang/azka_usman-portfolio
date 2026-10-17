import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Volume2, Code2, Terminal, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { NeuralVisual } from './NeuralVisual';

interface HeroProps {
  onOpenTTSWithText?: (text: string) => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTTSWithText, onOpenChat }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.secondaryRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleListenBio = () => {
    const speechScript = `Hello and welcome. I am Azka Usman, an AI Engineer focused on building practical solutions with Machine Learning, Deep Learning, Generative AI, NLP, RAG systems, and intelligent automation. My tagline is: Becoming, one commit at a time. Explore my featured projects like the PDF RAG Chatbot and TMDB recommendation engine below.`;
    if (onOpenTTSWithText) {
      onOpenTTSWithText(speechScript);
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 ai-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                AI ENGINEER • MACHINE LEARNING • GENERATIVE AI
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Building{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                  Intelligent Solutions
                </span>{' '}
                with AI.
              </h1>

              {/* Dynamic role subhead */}
              <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm sm:text-base pt-1">
                <span className="text-cyan-400">&gt;</span>
                <span>Specializing in:</span>
                <span className="text-cyan-300 font-semibold transition-all duration-300">
                  {PERSONAL_INFO.secondaryRoles[roleIndex]}
                </span>
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              &ldquo;I’m <span className="text-white font-medium">Azka Usman</span>, an AI Engineer focused on building practical solutions with Machine Learning, Deep Learning, Generative AI, NLP, RAG systems, and intelligent automation.&rdquo;
            </p>

            {/* Tagline Badge */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400 py-1">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="italic text-zinc-300">
                &ldquo;{PERSONAL_INFO.tagline}&rdquo;
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{PERSONAL_INFO.education}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-zinc-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-white/10 hover:border-cyan-500/40 font-semibold text-sm transition-all"
              >
                <span>Let's Connect</span>
              </a>

              {/* Audio intro button powered by gemini-3.8-flash-tts */}
              <button
                onClick={handleListenBio}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all group"
                title="Listen to voice intro (Gemini 3.8 Flash TTS)"
              >
                <Volume2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Listen Audio Intro</span>
              </button>
            </div>

            {/* Social Icons & Status */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/50 text-zinc-300 hover:text-white transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/50 text-zinc-300 hover:text-cyan-400 transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  aria-label="Send Email"
                  className="p-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/50 text-zinc-300 hover:text-cyan-400 transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>

                <span className="text-xs text-zinc-500 font-mono hidden sm:inline pl-1">
                  uazka4015@gmail.com
                </span>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Opportunities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive AI-inspired Visual */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Ambient visual glow */}
            <div className="w-full relative">
              <NeuralVisual />
            </div>

            {/* Animated text required by user prompt */}
            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/80 border border-white/10 text-xs font-mono text-zinc-300 shadow-md">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-zinc-200">
                &ldquo;Turning ideas <span className="text-cyan-400">→</span> into intelligent systems&rdquo;
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
