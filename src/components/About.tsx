import React from 'react';
import { Hammer, Brain, Cpu, Volume2, CheckCircle2, Terminal, Sparkles, BookOpen } from 'lucide-react';
import { PERSONAL_INFO, THREE_PILLARS } from '../data/portfolioData';

interface AboutProps {
  onOpenTTSWithText?: (text: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenTTSWithText }) => {
  const getPillarIcon = (title: string) => {
    switch (title) {
      case 'BUILD':
        return <Hammer className="w-5 h-5 text-cyan-400" />;
      case 'LEARN':
        return <Brain className="w-5 h-5 text-sky-400" />;
      case 'SOLVE':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleListenAbout = () => {
    const text = `About Me: I’m Azka Usman, a BSCS student and aspiring AI Engineer passionate about building practical AI applications. My journey spans Python, Machine Learning, Deep Learning, NLP, Generative AI, RAG systems, LLM applications, and AI automation. I focus on learning by building — turning concepts into working applications and continuously improving my engineering skills through real projects.`;
    if (onOpenTTSWithText) {
      onOpenTTSWithText(text);
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#07090e]/70 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>ENGINEERING PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              About Me
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleListenAbout}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-all"
              title="Listen to About Me section (Gemini 3.8 Flash TTS)"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Voice Playback</span>
            </button>
          </div>
        </div>

        {/* Introduction Box */}
        <div className="bg-zinc-950/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal">
                I’m <span className="text-cyan-400 font-semibold">Azka Usman</span>, a{' '}
                <span className="text-white font-medium">BSCS student</span> and aspiring{' '}
                <span className="text-white font-medium">AI Engineer</span> passionate about building practical AI applications.
              </p>
              
              <p className="text-base text-zinc-300 leading-relaxed">
                My journey spans Python, Machine Learning, Deep Learning, NLP, Generative AI, RAG systems, LLM applications, and AI automation.
              </p>

              <p className="text-base text-zinc-400 leading-relaxed">
                I focus on learning by building — turning concepts into working applications and continuously improving my engineering skills through real projects.
              </p>
            </div>

            {/* Quick Specs Sidebar */}
            <div className="lg:col-span-4 bg-zinc-900/60 border border-white/10 rounded-xl p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-zinc-500">Degree Focus</span>
                <span className="text-zinc-200 font-semibold">BS Computer Science</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-zinc-500">Primary Discipline</span>
                <span className="text-cyan-400">AI / Machine Learning</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-zinc-500">Current Frontier</span>
                <span className="text-sky-300">RAG & Agent Automation</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Commitment</span>
                <span className="text-emerald-400">One commit at a time</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Visual Cards: BUILD, LEARN, SOLVE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THREE_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative bg-zinc-950/60 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getPillarIcon(pillar.title)}
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400/80 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  {pillar.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                {pillar.title}
              </h3>

              {/* Headline */}
              <p className="text-sm font-semibold text-cyan-300 mb-3">
                {pillar.headline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>

              {/* Bottom decorative bar */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Domain Focus</span>
                <span className="text-zinc-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  Verified Practice
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
