import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Certificates } from './components/Certificates';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatDrawer } from './components/ChatDrawer';
import { TTSPlayerModal } from './components/TTSPlayerModal';
import { ImageStudioModal } from './components/ImageStudioModal';
import { Bot, Volume2, Sparkles } from 'lucide-react';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isTTSOpen, setIsTTSOpen] = useState<boolean>(false);
  const [ttsInitialText, setTtsInitialText] = useState<string>('');
  const [isImageStudioOpen, setIsImageStudioOpen] = useState<boolean>(false);

  const handleOpenTTSWithText = (text: string) => {
    setTtsInitialText(text);
    setIsTTSOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenTTS={() => {
          setTtsInitialText('');
          setIsTTSOpen(true);
        }}
        onOpenImageStudio={() => setIsImageStudioOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenTTSWithText={handleOpenTTSWithText}
          onOpenChat={() => setIsChatOpen(true)}
        />
        <About onOpenTTSWithText={handleOpenTTSWithText} />
        <Skills />
        <Projects />
        <Journey />
        <Certificates />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons (Recruiter Co-Pilot & Quick AI Controls) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Quick Voice Play Trigger */}
        <button
          onClick={() => {
            setTtsInitialText('');
            setIsTTSOpen(true);
          }}
          className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-cyan-500/40 text-zinc-300 hover:text-cyan-300 shadow-xl backdrop-blur-md transition-all hover:scale-105"
          title="Listen Audio Briefing (gemini-3.8-flash-tts)"
        >
          <Volume2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-xs font-mono">Voice Audio</span>
        </button>

        {/* Floating Chatbot Assistant Trigger */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-zinc-950 font-bold text-xs font-mono shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all"
          title="Chat with Azka's AI Assistant"
        >
          <Bot className="w-5 h-5 text-zinc-950 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Ask Azka&rsquo;s AI</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-950 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-950" />
          </span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <TTSPlayerModal
        isOpen={isTTSOpen}
        onClose={() => setIsTTSOpen(false)}
        initialText={ttsInitialText}
      />

      <ImageStudioModal
        isOpen={isImageStudioOpen}
        onClose={() => setIsImageStudioOpen(false)}
      />
    </div>
  );
}
