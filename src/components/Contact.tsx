import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Copy, Check, MessageSquare, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090e]/90 border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT CHANNELS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&rsquo;s Connect & Build Together
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Currently open to early-career AI Engineer positions, machine learning internships, research collaborations, and production consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Links & Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-950/60 border border-white/10 rounded-2xl p-6 sm:p-7 backdrop-blur-xl space-y-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Direct Contact Details</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  Feel free to reach out directly via email or LinkedIn. Messages regarding technical inquiries, model architectures, or prospective engineering roles receive prompt replies.
                </p>
              </div>

              {/* Email Card with Copy button */}
              <div className="p-4 rounded-xl bg-zinc-900/70 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Email Address</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-cyan-300 truncate transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-zinc-900/70 border border-white/10 hover:border-cyan-500/40 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">LinkedIn Profile</span>
                    <span className="text-xs sm:text-sm font-mono text-zinc-200 group-hover:text-cyan-300 transition-colors">
                      linkedin.com/in/azka-usman
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-zinc-900/70 border border-white/10 hover:border-white/30 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 group-hover:scale-105 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">GitHub Repositories</span>
                    <span className="text-xs sm:text-sm font-mono text-zinc-200 group-hover:text-white transition-colors">
                      github.com/azka-usman
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>

              {/* Response SLA Note */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Response Time: Typically under 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-950/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-white text-base">Send a Direct Message</h3>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">Instant Transmission</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-400">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-400">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400">Subject / Role Opportunity</label>
                  <input
                    type="text"
                    placeholder="AI Engineer Internship / Collaboration / Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Azka, I reviewed your PDF RAG Chatbot and TMDB recommender system..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting Dispatch...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message to Azka</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Message received successfully. Azka will reply shortly at {formData.email || 'your email'}!</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
                    Unable to send message automatically. Please write directly to{' '}
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="underline text-white">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
