import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Zap, Brain, Loader2, RotateCcw, Copy, Check } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I am Azka Usman's AI Portfolio Assistant. I can answer technical questions about Azka's machine learning projects, her PDF RAG Chatbot architecture, n8n automations, tech stack, and engineering background. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Affordance to select model:
  // gemini-3.1-pro-preview for particularly complex tasks
  // gemini-3.5-flash for general tasks
  // gemini-3.1-flash-lite for tasks that should happen fast
  const [modelChoice, setModelChoice] = useState<'general' | 'fast' | 'complex'>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickQuestions = [
    "Explain Azka's PDF RAG architecture",
    "How does the TMDB movie recommender work?",
    "What are Azka's core skills and libraries?",
    "Why hire Azka as an AI Engineer?",
  ];

  const getModelLabel = (choice: 'general' | 'fast' | 'complex') => {
    switch (choice) {
      case 'general':
        return 'gemini-3.5-flash (Balanced)';
      case 'fast':
        return 'gemini-3.1-flash-lite (Speed)';
      case 'complex':
        return 'gemini-3.1-pro-preview (Deep Reasoning)';
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          modelChoice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch reply from Gemini.');
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Chat error';
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Error: ${msg}. (Please ensure your GEMINI_API_KEY is configured in AI Studio Secrets).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'system-error',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Conversation history reset. What would you like to explore next about Azka’s work?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.5-flash',
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg h-full bg-[#080b12] border-l border-cyan-500/30 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Azka&rsquo;s AI Assistant</h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Multi-Turn Technical Portfolio Representative
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Selector Bar as Required */}
        <div className="px-4 py-2 bg-zinc-950/90 border-b border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500 text-[11px]">Select Gemini Model:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setModelChoice('general')}
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                modelChoice === 'general'
                  ? 'bg-cyan-500 text-zinc-950 font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
              title="gemini-3.5-flash for general tasks"
            >
              Flash (General)
            </button>
            <button
              onClick={() => setModelChoice('fast')}
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                modelChoice === 'fast'
                  ? 'bg-amber-400 text-zinc-950 font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
              title="gemini-3.1-flash-lite for tasks that should happen fast"
            >
              Lite (Fast)
            </button>
            <button
              onClick={() => setModelChoice('complex')}
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                modelChoice === 'complex'
                  ? 'bg-purple-500 text-white font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
              title="gemini-3.1-pro-preview for particularly complex tasks"
            >
              Pro (Complex)
            </button>
          </div>
        </div>

        {/* Scrollable Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-sm ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2 relative group shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                      : 'bg-zinc-900/90 border border-white/10 text-zinc-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm font-sans">
                    {msg.content}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono opacity-70 pt-1 border-t border-white/5">
                    <span>{msg.timestamp}</span>
                    {!isUser && msg.modelUsed && (
                      <span className="text-cyan-300 ml-2">{msg.modelUsed}</span>
                    )}
                  </div>

                  {!isUser && (
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white transition-opacity"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl rounded-tl-none p-3.5 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Thinking using {getModelLabel(modelChoice)}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 border-t border-white/5 bg-zinc-950/50">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-cyan-500/30 text-[11px] font-mono text-zinc-300 hover:text-cyan-300 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-white/10 bg-zinc-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about Azka's AI projects or stack..."
              disabled={isLoading}
              className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold transition-all disabled:opacity-50 shadow-md shadow-cyan-500/20"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2">
            <span>Powered by Gemini API (@google/genai)</span>
            <span>Role: Azka's Technical Guide</span>
          </div>
        </div>

      </div>
    </div>
  );
};
