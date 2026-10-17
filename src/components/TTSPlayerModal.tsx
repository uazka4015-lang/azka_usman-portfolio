import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, Play, Pause, RotateCcw, Download, Sparkles, Loader2, Disc3 } from 'lucide-react';

interface TTSModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
}

export const TTSPlayerModal: React.FC<TTSModalProps> = ({ isOpen, onClose, initialText = '' }) => {
  const [text, setText] = useState<string>(
    initialText ||
      `Hello! I'm Azka Usman, an AI Engineer specializing in Machine Learning, Deep Learning, NLP, Generative AI, and RAG systems. Welcome to my personal portfolio.`
  );
  const [selectedVoice, setSelectedVoice] = useState<string>('Kore');
  const [speechStyle, setSpeechStyle] = useState<string>(
    'Professional, confident, articulate young AI engineer speaking enthusiastically'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (initialText) {
      setText(initialText);
    }
  }, [initialText]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  if (!isOpen) return null;

  const quickPresets = [
    {
      title: 'Hero Introduction',
      content:
        'I’m Azka Usman, an AI Engineer focused on building practical solutions with Machine Learning, Deep Learning, Generative AI, NLP, RAG systems, and intelligent automation. Becoming, one commit at a time.',
    },
    {
      title: 'PDF RAG Chatbot Briefing',
      content:
        'The PDF RAG Chatbot chunks dense documents, generates 1536-dimensional embeddings, and retrieves top-k passages via cosine similarity to give zero-hallucination answers with page citations.',
    },
    {
      title: 'TMDB Recommendation Walkthrough',
      content:
        'The movie recommendation system computes vector space similarities over 5,000 TMDB titles, matching plot keywords, genres, and directors in real-time.',
    },
  ];

  const handleGenerateAudio = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setIsPlaying(false);

    try {
      const response = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceName: selectedVoice,
          style: speechStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.audioBase64) {
        throw new Error(data.error || 'Failed to synthesize speech audio.');
      }

      // Convert base64 WAV into Blob URL
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/wav' });

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      const newUrl = URL.createObjectURL(blob);
      setAudioUrl(newUrl);

      // Autoplay
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Speech synthesis failed';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>AI Voice Synthesis</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  gemini-3.8-flash-tts
                </span>
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Text-to-Speech Engine for Azka’s Portfolio Audio Briefings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-5">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Select an Audio Briefing Preset or Type Custom Script:
          </label>
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((preset) => (
              <button
                key={preset.title}
                onClick={() => setText(preset.content)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-colors"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Area */}
        <div className="mt-4 space-y-2">
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text to synthesize with gemini-3.8-flash-tts..."
            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-cyan-400 font-sans transition-colors resize-none"
          />
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Character count: {text.length} / 500</span>
            <span>24kHz WAV Audio</span>
          </div>
        </div>

        {/* Voice Selection & Style Controls */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
              Voice Persona (Prebuilt)
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="Kore">Kore (Clear, articulate, natural female tone)</option>
              <option value="Puck">Puck (Engaging, bright, energetic tone)</option>
              <option value="Fenrir">Fenrir (Authoritative, resonant tone)</option>
              <option value="Zephyr">Zephyr (Gentle, warm, conversational tone)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
              Vocal Delivery Style
            </label>
            <input
              type="text"
              value={speechStyle}
              onChange={(e) => setSpeechStyle(e.target.value)}
              placeholder="e.g. Enthusiastic podcast host"
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-sans text-zinc-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-5">
          <button
            onClick={handleGenerateAudio}
            disabled={isLoading || !text.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-xs font-mono shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing Voice with gemini-3.8-flash-tts...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Generate Speech Audio</span>
              </>
            )}
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* Player Controls (When Audio is Ready) */}
        {audioUrl && (
          <div className="mt-6 p-4 rounded-xl bg-zinc-950 border border-cyan-500/30 flex items-center justify-between gap-4 animate-in fade-in">
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className="w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 flex items-center justify-center shadow-md transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <div>
                <span className="text-xs font-bold text-white block">
                  {isPlaying ? 'Now Playing Briefing' : 'Audio Ready'}
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  Voice: {selectedVoice} • 24kHz Unary WAV
                </span>
              </div>
            </div>

            {/* Simulated Equalizer Wave */}
            <div className="hidden sm:flex items-center gap-1 h-6">
              {[60, 100, 40, 80, 50, 90, 70, 30].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 bg-cyan-400 rounded-full transition-all duration-200 ${
                    isPlaying ? 'opacity-100 animate-pulse' : 'opacity-30'
                  }`}
                  style={{ height: isPlaying ? `${h}%` : '20%' }}
                />
              ))}
            </div>

            {/* Download Link */}
            <a
              href={audioUrl}
              download="azka-usman-ai-briefing.wav"
              className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
              title="Download Audio (.wav)"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Google GenAI • Speech Generation</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
