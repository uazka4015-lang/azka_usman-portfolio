import React from 'react';
import { GitCommit, Terminal, Calendar, Code, CheckCircle, ArrowRight } from 'lucide-react';
import { TIMELINE_MILESTONES, PERSONAL_INFO } from '../data/portfolioData';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#07090e]">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <GitCommit className="w-3.5 h-3.5" />
            <span>PROGRESSION TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Journey & Milestones
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Guided by the core conviction: <span className="text-cyan-300 italic">&ldquo;{PERSONAL_INFO.tagline}&rdquo;</span>. A disciplined track record of academic rigor and hands-on codebase commits.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-6 space-y-12 pl-6 sm:pl-10">
          {TIMELINE_MILESTONES.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/30" />

              <div className="bg-zinc-950/60 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 sm:p-7 backdrop-blur-xl transition-all shadow-lg">
                {/* Milestone Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-500/30">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{item.badge}</span>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                    <Code className="w-3 h-3 text-cyan-400" />
                    Verified Commits
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <h4 className="text-xs sm:text-sm font-semibold text-cyan-300/90 mb-3">
                  {item.subtitle}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-[11px] font-mono text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Footer Note */}
        <div className="mt-14 p-5 rounded-2xl bg-zinc-950/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Open Source & Public Version Control</h5>
              <p className="text-xs text-zinc-400">All machine learning scripts, notebooks, and Streamlit demos are hosted on GitHub.</p>
            </div>
          </div>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-cyan-300 hover:text-white transition-all shrink-0"
          >
            <span>Inspect GitHub Commits</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
