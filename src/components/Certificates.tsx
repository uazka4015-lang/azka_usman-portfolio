import React from 'react';
import { Award, CheckCircle2, BookOpen, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '../data/portfolioData';

export const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-[#07090e]/80 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>CONTINUOUS LEARNING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Technical Training
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Targeted coursework validating foundational and advanced concepts across Machine Learning, Deep Neural Networks, and Generative AI systems.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATES.map((cert, index) => (
            <div
              key={index}
              className="bg-zinc-950/60 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{cert.issuer}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{cert.date}</span>
                </div>

                <h3 className="font-bold text-lg text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h3>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-zinc-500 block">
                    Core Competencies Tested:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-xs font-mono text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Completion
                </span>
                <span>Academic Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
