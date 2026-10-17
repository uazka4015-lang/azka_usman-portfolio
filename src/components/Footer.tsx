import React from 'react';
import { BrainCircuit, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070a] border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-base">Azka Usman</div>
              <div className="text-[11px] font-mono text-cyan-400">AI Engineer • Machine Learning • GenAI</div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center md:text-right">
            <p className="text-xs font-mono text-zinc-400 italic">
              &ldquo;{PERSONAL_INFO.tagline}&rdquo;
            </p>
            <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
              BS Computer Science • Real Projects
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} Azka Usman. All Rights Reserved.
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-cyan-400 transition-colors"
            >
              Email
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
