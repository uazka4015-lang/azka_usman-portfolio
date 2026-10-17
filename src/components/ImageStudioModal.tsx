import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, Download, Loader2, Maximize2, Sliders, RefreshCw } from 'lucide-react';

interface ImageStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageStudioModal: React.FC<ImageStudioProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState<string>(
    'Futuristic high-dimensional neural network architecture diagram, glowing electric blue and cyan vector data flow, minimal dark graphite aesthetic'
  );
  // Affordance for user to specify image size (1K, 2K, and 4K) as required
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const presets = [
    {
      title: 'Neural Flow',
      prompt:
        'Futuristic high-dimensional neural network architecture diagram, glowing electric blue and cyan vector data flow, minimal dark graphite aesthetic',
    },
    {
      title: 'RAG Pipeline Blueprint',
      prompt:
        'Architectural technical blueprint of a Retrieval Augmented Generation vector search pipeline, dense embeddings and attention mechanisms, ultra-clean technical diagram',
    },
    {
      title: 'Vector Hyperplane',
      prompt:
        'Abstract mathematical visualization of high-dimensional vector embeddings clustered on a manifold, subtle purple and cyan lighting, dark futuristic backdrop',
    },
    {
      title: 'Autonomous AI Circuit',
      prompt:
        'Glowing cybernetic microchip routing webhook signals and agentic decision gates, electric blue traces on matte black obsidian substrate',
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize, // "1K" | "2K" | "4K"
          aspectRatio,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.imageUrl) {
        throw new Error(data.error || 'Failed to generate image. Please check API credentials.');
      }

      setGeneratedImage(data.imageUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Image generation encountered an error';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>AI Concept & Architecture Visualizer</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  gemini-3-pro-image-preview
                </span>
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                High-Fidelity Neural Diagrams & Synthetic Visuals
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
            Select an AI Architecture Theme:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((p) => (
              <button
                key={p.title}
                onClick={() => setPrompt(p.prompt)}
                className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-purple-500/30 text-xs font-mono text-zinc-300 hover:text-purple-300 text-left transition-colors"
              >
                <div className="font-bold text-white truncate">{p.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="mt-4 space-y-2">
          <label className="block text-[11px] font-mono uppercase text-zinc-400">
            Visual Synthesis Prompt
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the neural diagram or technical AI concept to visualize..."
            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-purple-400 font-sans transition-colors resize-none"
          />
        </div>

        {/* Configuration Affordances: Image Size (1K, 2K, 4K) & Aspect Ratio */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* User Affordance for Image Size */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider">
                Resolution (imageSize)
              </label>
              <span className="text-[10px] font-mono text-purple-400">Required Affordance</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['1K', '2K', '4K'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setImageSize(size)}
                  className={`py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                    imageSize === size
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">
              Select 1K (standard), 2K (retina), or 4K (ultra-crisp architecture rendering).
            </p>
          </div>

          {/* Aspect Ratio Affordance */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider">
                Aspect Ratio
              </label>
              <span className="text-[10px] font-mono text-zinc-500">{aspectRatio}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {['16:9', '1:1', '4:3', '9:16'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2 rounded-lg text-xs font-mono transition-all ${
                    aspectRatio === ratio
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">
              16:9 is recommended for technical blueprints and desktop displays.
            </p>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-5">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-zinc-950 font-bold text-xs font-mono shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating {imageSize} Visual with gemini-3-pro-image-preview...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Generate High-Quality Image ({imageSize})</span>
              </>
            )}
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* Generated Image Showcase */}
        {generatedImage && (
          <div className="mt-6 space-y-3 animate-in fade-in">
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-black group shadow-2xl">
              <img
                src={generatedImage}
                alt="Generated AI Architectural Concept"
                className="w-full h-auto max-h-[420px] object-contain mx-auto"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <a
                  href={generatedImage}
                  download={`azka-ai-visual-${imageSize}.png`}
                  className="p-2 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-white/20 text-white backdrop-blur-md transition-colors"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
              <span>Resolution: {imageSize} • Aspect Ratio: {aspectRatio}</span>
              <span className="text-purple-300">Model: gemini-3-pro-image-preview</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>High-Resolution Generation Pipeline</span>
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
