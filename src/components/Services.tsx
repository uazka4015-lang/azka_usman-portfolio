import React from 'react';
import { Database, Cpu, Workflow, MessageSquareText, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-purple-400" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>VALUE DELIVERED</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Capabilities & Services
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            How I assist organizations and tech teams in transitioning from experimental AI models into dependable, deployed production systems.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-zinc-950/60 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-7 backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {getIcon(srv.icon)}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {srv.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
                  {srv.description}
                </p>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-500 block">
                    Core Deliverables:
                  </span>
                  <ul className="space-y-2">
                    {srv.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  <span>Inquire for Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-[10px] font-mono text-zinc-500">Custom Deployment</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
