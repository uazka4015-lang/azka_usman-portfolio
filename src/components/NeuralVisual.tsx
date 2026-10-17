import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number;
  label?: string;
  pulsing: boolean;
}

export const NeuralVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMetric, setActiveMetric] = useState<string>('Cosine Sim: 0.942');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create layered nodes simulating a neural network + RAG retriever
    const layers = [
      { count: 4, xRatio: 0.15 },
      { count: 6, xRatio: 0.40 },
      { count: 5, xRatio: 0.65 },
      { count: 3, xRatio: 0.88 },
    ];

    const nodes: Node[] = [];
    layers.forEach((layer, layerIdx) => {
      const stepY = height / (layer.count + 1);
      for (let i = 0; i < layer.count; i++) {
        nodes.push({
          x: width * layer.xRatio + (Math.random() - 0.5) * 15,
          y: stepY * (i + 1) + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: layerIdx === 0 || layerIdx === 3 ? 4 : 5.5,
          layer: layerIdx,
          pulsing: Math.random() > 0.6,
        });
      }
    });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Subtle background grid glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        width * 0.7
      );
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.08)');
      grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          // Connect nodes in adjacent or same layers
          if (Math.abs(n1.layer - n2.layer) <= 1) {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = width * 0.35;

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.35;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();

              // Synaptic signal pulse moving between nodes
              const pulsePos = (Math.sin(time * 2 + i * 0.7 + j * 0.5) + 1) / 2;
              if (pulsePos > 0.4 && pulsePos < 0.6) {
                const px = n1.x + (n2.x - n1.x) * pulsePos;
                const py = n1.y + (n2.y - n1.y) * pulsePos;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(165, 243, 252, 0.9)';
                ctx.fill();
              }
            }
          }
        }
      }

      // Draw nodes
      nodes.forEach((node, idx) => {
        // Subtle drift
        node.x += node.vx;
        node.y += node.vy;

        // Bounce within small bounds
        const origX = width * layers[node.layer].xRatio;
        if (Math.abs(node.x - origX) > 25) node.vx *= -1;
        if (node.y < 30 || node.y > height - 30) node.vy *= -1;

        // Outer glow
        const pulse = Math.sin(time * 3 + idx) * 2;
        const outerGlow = ctx.createRadialGradient(
          node.x,
          node.y,
          1,
          node.x,
          node.y,
          node.radius * 3 + pulse
        );
        outerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        outerGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.2)');
        outerGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3 + pulse, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.layer === 0 ? '#38bdf8' : node.layer === 3 ? '#a855f7' : '#e0f2fe';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Metric cycler
    const metricInterval = setInterval(() => {
      const metrics = [
        'Cosine Sim: 0.942',
        'Top-k Retrieved: 5 chunks',
        'Inference Latency: 42ms',
        'Dimension: 1536-d dense',
        'Loss (CE): 0.0142',
        'n8n Webhook: 200 OK',
      ];
      setActiveMetric((prev) => {
        const nextIdx = (metrics.indexOf(prev) + 1) % metrics.length;
        return metrics[nextIdx];
      });
    }, 2800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(metricInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] md:h-[480px] rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl flex items-center justify-center group">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Technical Labels */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>RAG Pipeline: Active</span>
      </div>

      <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
        <span>Dim: 1536 | Dense Vector</span>
      </div>

      <div className="absolute bottom-14 left-4 z-10 px-3 py-1.5 rounded-lg bg-zinc-900/85 border border-indigo-500/30 text-[11px] font-mono text-indigo-300 backdrop-blur-md flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        <span>Live Metric: {activeMetric}</span>
      </div>

      <div className="absolute bottom-14 right-4 z-10 px-3 py-1.5 rounded-lg bg-zinc-900/85 border border-white/10 text-[11px] font-mono text-zinc-400 backdrop-blur-md">
        <span>n8n Webhook: Listening</span>
      </div>

      {/* Bottom code line ticker */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-zinc-950/90 border-t border-white/5 px-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-2 truncate">
          <span className="text-cyan-400">&gt;</span>
          <span className="text-zinc-300">embeddings.similarity(query_vector, doc_store)</span>
        </div>
        <span className="text-emerald-400 hidden sm:inline">status: operational</span>
      </div>
    </div>
  );
};
