import React, { useState } from 'react';
import { X, Workflow, Play, CheckCircle2, ArrowRight, Zap, Database, MessageSquare, RefreshCw } from 'lucide-react';

interface N8nModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const N8nWorkflowVisualizer: React.FC<N8nModalProps> = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([
    'n8n workflow listening on webhook: https://automations.azka-ai.internal/webhook/inbound-ticket',
    'AI Model Agent: gpt-4o structured extraction node ready',
    'Google Sheets API: OAuth authenticated (Sheet: Enterprise Leads 2025)',
  ]);

  if (!isOpen) return null;

  const nodes = [
    {
      id: 0,
      title: '1. Webhook Ingestion',
      type: 'Trigger Node',
      desc: 'Listens for raw inbound HTTP payload (Form/API)',
      badge: 'POST 200',
    },
    {
      id: 1,
      title: '2. AI Extraction Agent',
      type: 'LLM Parser',
      desc: 'Extracts customer intent, urgency score, and tags JSON',
      badge: 'OpenAI Agent',
    },
    {
      id: 2,
      title: '3. Logic Router Gate',
      type: 'Conditional Switch',
      desc: 'Routes high-urgency tickets immediately to emergency desk',
      badge: 'IF urgency > 75',
    },
    {
      id: 3,
      title: '4. Sheets & Alerts',
      type: 'Sync Destination',
      desc: 'Appends structured row to Google Sheets & notifies Slack',
      badge: 'Dual Output',
    },
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ▶ Trigger event received from inbound client webhook...`,
    ]);

    setTimeout(() => {
      setActiveStep(1);
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ⚡ AI Agent analyzing text: "Need urgent enterprise RAG deployment support for 15,000 PDF archive."`,
        `[${new Date().toLocaleTimeString()}] 🤖 Extracted: { urgency: 94, category: "RAG Deployment", intent: "Enterprise Deal" }`,
      ]);
    }, 900);

    setTimeout(() => {
      setActiveStep(2);
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 🔀 Router gate verified urgency 94 >= 75. Branching to priority pipeline.`,
      ]);
    }, 1800);

    setTimeout(() => {
      setActiveStep(3);
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 📊 Google Sheets: Row #142 written successfully.`,
        `[${new Date().toLocaleTimeString()}] 🔔 Slack Alert dispatched to #priority-ai-leads channel.`,
        `[${new Date().toLocaleTimeString()}] ✅ Workflow run completed with 0 errors in 248ms.`,
      ]);
      setIsRunning(false);
    }, 2700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Workflow className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">
                n8n Autonomous AI Automation Flow
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Event-Driven Webhook Orchestration, LLM Decision Gates & Google Sheets Sync
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-zinc-300 font-sans max-w-lg">
            This visualizer simulates a production workflow running in Azka’s self-hosted n8n instance, chaining AI agents to real business backends.
          </p>
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-xs font-mono shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 shrink-0"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Webhook Trigger</span>
              </>
            )}
          </button>
        </div>

        {/* Workflow Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {nodes.map((node) => {
            const isActive = activeStep === node.id;
            const isCompleted = activeStep > node.id;

            return (
              <div
                key={node.id}
                className={`p-4 rounded-xl border relative transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-950/70 border-cyan-400 scale-[1.03] shadow-lg shadow-cyan-500/30'
                    : isCompleted
                    ? 'bg-zinc-950 border-emerald-500/50 text-white'
                    : 'bg-zinc-950/60 border-white/10 text-zinc-400'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[9px] font-bold text-zinc-950 items-center justify-center">
                      ✓
                    </span>
                  </span>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                    {node.type}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-zinc-900 border border-white/10 text-zinc-300">
                    {node.badge}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white mb-1">{node.title}</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">{node.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Execution Log Terminal */}
        <div className="bg-zinc-950 border border-white/10 rounded-xl p-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-zinc-500">
            <span>LIVE EXECUTION CONSOLE</span>
            <span className="text-emerald-400">Node Status: 200 OK</span>
          </div>

          <div className="h-40 overflow-y-auto space-y-1.5 text-zinc-300 pr-2">
            {logs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                <span className="text-cyan-400 select-none">&gt; </span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>n8n + OpenAI + Webhooks + Google Sheets</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold"
          >
            Close Workflow
          </button>
        </div>
      </div>
    </div>
  );
};
