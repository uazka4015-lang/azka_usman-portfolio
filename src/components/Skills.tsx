import React, { useState } from 'react';
import { Code2, Database, Brain, Sparkles, Workflow, Terminal, Search, Check, Layers } from 'lucide-react';
import { SKILLS_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    Programming: <Code2 className="w-4 h-4 text-cyan-400" />,
    'Data & Machine Learning': <Database className="w-4 h-4 text-sky-400" />,
    'Deep Learning': <Brain className="w-4 h-4 text-indigo-400" />,
    NLP: <Layers className="w-4 h-4 text-blue-400" />,
    'Generative AI': <Sparkles className="w-4 h-4 text-purple-400" />,
    Automation: <Workflow className="w-4 h-4 text-emerald-400" />,
    Development: <Terminal className="w-4 h-4 text-teal-400" />,
  };

  const categories = ['All', ...SKILLS_CATEGORIES.map((c) => c.category)];

  const filteredCategories = SKILLS_CATEGORIES.map((catGroup) => {
    // If specific category selected
    if (selectedCategory !== 'All' && catGroup.category !== selectedCategory) {
      return null;
    }

    // Filter skills by search query
    const filteredSkills = catGroup.skills.filter((skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredSkills.length === 0) return null;

    return {
      ...catGroup,
      skills: filteredSkills,
    };
  }).filter(Boolean);

  const totalSkillCount = SKILLS_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#07090e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Brain className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills & Engineering Stack
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A comprehensive, verified technical toolset across algorithms, deep architectures, modern generative pipelines, and automated integrations. No arbitrary percentages — only practical competencies.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/80 border border-white/10 rounded-xl pl-8 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs font-mono"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            if (!cat) return null;
            return (
              <div
                key={cat.category}
                className="bg-zinc-950/60 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                        {categoryIcons[cat.category] || <Terminal className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-white tracking-wide">
                        {cat.category}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {cat.skills.length} skills
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Badges / Cards (No fake percentages) */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/10 text-xs font-mono text-zinc-200 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-zinc-900 transition-all cursor-default shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Verification Note */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Category standard</span>
                  <span className="text-emerald-400/90 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Applied in Projects
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Skill Count Summary */}
        <div className="mt-12 p-4 rounded-xl bg-zinc-950/40 border border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Total Core Competencies Cataloged: <strong className="text-white">{totalSkillCount}</strong></span>
          </div>
          <span className="text-zinc-500">Continuous study & practice in production environments</span>
        </div>

      </div>
    </section>
  );
};
