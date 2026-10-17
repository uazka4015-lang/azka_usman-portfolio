import React, { useState } from 'react';
import { Github, ExternalLink, Sparkles, Layers, ArrowUpRight, Play, CheckCircle2, ChevronRight, Terminal, Eye } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { RagArchitectureModal } from './RagArchitectureModal';
import { MovieRecDemoModal } from './MovieRecDemoModal';
import { N8nWorkflowVisualizer } from './N8nWorkflowVisualizer';

export const Projects: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'rag' | 'movie' | 'n8n' | null>(null);

  const handleLaunchDemo = (projectId: string) => {
    if (projectId === 'pdf-rag-chatbot') {
      setActiveModal('rag');
    } else if (projectId === 'ai-movie-recommendation') {
      setActiveModal('movie');
    } else if (projectId === 'ai-automation-workflows') {
      setActiveModal('n8n');
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#07090e]/90">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED PORTFOLIO PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered AI Solutions
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Real implementations solving distinct technical challenges in information retrieval, content-based recommendation modeling, and agentic business automation.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {FEATURED_PROJECTS.map((project, index) => {
            const isRagChatbot = project.id === 'pdf-rag-chatbot';

            return (
              <div
                key={project.id}
                className={`relative rounded-3xl border transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-xl ${
                  isRagChatbot
                    ? 'bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-cyan-950/20 border-cyan-500/40 hover:border-cyan-400 shadow-cyan-950/30'
                    : 'bg-zinc-950/70 border-white/10 hover:border-white/25 shadow-black/40'
                }`}
              >
                {/* Visual Prominence Glow for RAG project */}
                {isRagChatbot && (
                  <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                )}

                <div className="p-6 sm:p-10">
                  {/* Top Badge & Number */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-cyan-400 font-bold px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30">
                        PROJECT 0{index + 1}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {project.category}
                      </span>
                      {isRagChatbot && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          Signature Generative AI Showcase
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>

                      <button
                        onClick={() => handleLaunchDemo(project.id)}
                        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all shadow-md ${
                          isRagChatbot
                            ? 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-cyan-500/20'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-cyan-300 border border-cyan-500/30'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Interactive Demo</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Grid Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                    {/* Left Column: Descriptions */}
                    <div className="lg:col-span-7 space-y-6">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-base text-zinc-300 leading-relaxed font-normal">
                        &ldquo;{project.shortDescription}&rdquo;
                      </p>

                      {/* Problem & Solution Breakdown */}
                      <div className="space-y-3 font-sans">
                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                            The Challenge:
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {project.problem}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                            Engineered Solution:
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-zinc-400 block uppercase tracking-wider">
                          Technologies Utilized:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Architectural Highlights & Features */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5" />
                          Key Technical Features
                        </h4>

                        <ul className="space-y-3">
                          {project.keyFeatures.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Visually prominent architecture flow card for RAG chatbot */}
                      {isRagChatbot && (
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                            <span>RAG ARCHITECTURE FLOW:</span>
                            <span className="text-cyan-400">8 Stages</span>
                          </div>
                          <div className="p-3 rounded-xl bg-zinc-950 border border-cyan-500/30 text-[10px] font-mono text-cyan-200 overflow-x-auto whitespace-nowrap">
                            PDF → Text Extraction → Chunking → Embeddings → Vector Search → Relevant Context → LLM → Answer
                          </div>
                        </div>
                      )}

                      {/* Action trigger footer inside card */}
                      <button
                        onClick={() => handleLaunchDemo(project.id)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-white border border-white/10 hover:border-cyan-500/40 transition-all group"
                      >
                        <span>Open Project Interactive Simulator</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Modals */}
      <RagArchitectureModal
        isOpen={activeModal === 'rag'}
        onClose={() => setActiveModal(null)}
      />
      <MovieRecDemoModal
        isOpen={activeModal === 'movie'}
        onClose={() => setActiveModal(null)}
      />
      <N8nWorkflowVisualizer
        isOpen={activeModal === 'n8n'}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
};
