import React, { useState, useEffect } from 'react';
import { Bot, Volume2, Sparkles, Menu, X, ArrowUpRight, BrainCircuit } from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenTTS: () => void;
  onOpenImageStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onOpenTTS,
  onOpenImageStudio,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Azka Usman Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/30 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
              <BrainCircuit className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors text-base">
                Azka Usman
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/90 -mt-0.5">
                AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-950/40 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick AI Voice Briefing */}
            <button
              onClick={onOpenTTS}
              title="Voice Briefing (Gemini 3.8 Flash TTS)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-all shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Voice</span>
            </button>

            {/* AI Image Studio */}
            <button
              onClick={onOpenImageStudio}
              title="Generate High-Quality AI Architecture Visuals (Gemini 3 Pro Image)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-purple-500/40 text-xs font-mono text-zinc-300 hover:text-purple-300 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Visualizer</span>
            </button>

            {/* Gemini Chatbot Assistant */}
            <button
              onClick={onOpenChat}
              title="Ask Azka's AI Representative"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:text-cyan-100 transition-all shadow-sm"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI</span>
            </button>

            {/* Let's Connect */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-semibold text-zinc-950 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:scale-[1.02]"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-400"
              aria-label="Open AI Chat"
            >
              <Bot className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d16]/95 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTTS();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
              >
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Voice</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenImageStudio();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Visuals</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask AI</span>
              </button>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-zinc-950 shadow-md shadow-cyan-500/20"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
