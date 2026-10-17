import React, { useState } from 'react';
import { X, ArrowDown, FileText, Split, Cpu, Database, Search, MessageSquare, CheckCircle2, Play, Sparkles } from 'lucide-react';

interface RagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RagArchitectureModal: React.FC<RagModalProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [testQuery, setTestQuery] = useState<string>('What are the key advantages of RAG over model fine-tuning?');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'PDF Upload',
      icon: <FileText className="w-5 h-5 text-red-400" />,
      tag: 'Input Source',
      desc: 'User uploads enterprise documents, research papers, or manuals (PDF format).',
      code: 'uploaded_file = st.file_uploader("Upload PDF", type="pdf")',
    },
    {
      title: 'Text Extraction',
      icon: <FileText className="w-5 h-5 text-orange-400" />,
      tag: 'PyPDF Reader',
      desc: 'Parses binary PDF streams, extracts raw character streams, strips layout artifacts while retaining page numbers.',
      code: 'reader = PdfReader(uploaded_file)\ntext = "".join([page.extract_text() for page in reader.pages])',
    },
    {
      title: 'Chunking',
      icon: <Split className="w-5 h-5 text-amber-400" />,
      tag: 'Recursive Splitter',
      desc: 'Breaks document into semantic passages (chunk_size=500, overlap=50) to preserve boundary context.',
      code: 'text_splitter = RecursiveCharacterTextSplitter(\n  chunk_size=500,\n  chunk_overlap=50\n)',
    },
    {
      title: 'Embeddings',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      tag: 'Dense Vectorizer',
      desc: 'Transforms text chunks into 1536-dimensional dense numerical vectors capturing semantic meaning.',
      code: 'embeddings = OpenAIEmbeddings(model="text-embedding-3-small")\nvectors = embeddings.embed_documents(chunks)',
    },
    {
      title: 'Vector Search',
      icon: <Database className="w-5 h-5 text-blue-400" />,
      tag: 'FAISS / ChromaDB',
      desc: 'Stores vector index; executes Approximate Nearest Neighbors (ANN) via Cosine Similarity on user query vector.',
      code: 'query_vector = embeddings.embed_query(user_query)\ndocs = vectorstore.similarity_search(query_vector, k=4)',
    },
    {
      title: 'Relevant Context',
      icon: <Search className="w-5 h-5 text-indigo-400" />,
      tag: 'Top-K Retrieval',
      desc: 'Isolates the most relevant k passages and injects them as authoritative ground-truth context into the prompt.',
      code: 'context = "\\n\\n".join([doc.page_content for doc in docs])',
    },
    {
      title: 'LLM Generation',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      tag: 'Grounded Inference',
      desc: 'Sends prompt with system instruction to answer strictly based on provided context, eliminating hallucination.',
      code: 'prompt = f"Answer using only this context:\\n{context}\\n\\nQuestion: {query}"\nresponse = llm.invoke(prompt)',
    },
    {
      title: 'Answer & Citations',
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      tag: 'Output Stream',
      desc: 'Delivers synthesized, factual response accompanied by source document citations and exact page references.',
      code: 'st.write(response.content)\nst.caption(f"Sources: Pages {[d.metadata[\'page\'] for d in docs]}")',
    },
  ];

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimResult(null);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimResult(
          `Synthesized RAG Answer:
Based on Section 3.2 of the technical documentation:
1. RAG provides real-time access to dynamic, proprietary document context without requiring expensive re-training or weight updates.
2. It eliminates factual hallucinations by constraining generation to explicit retrieved text passages.
3. Every claim includes auditable source citations (Retrieved from Pages 4 & 7).`
        );
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h3 className="text-xl font-bold text-white">
                PDF RAG Chatbot — Architecture Pipeline
              </h3>
            </div>
            <p className="text-xs font-mono text-cyan-300 mt-1">
              End-to-End Retrieval-Augmented Generation Flow
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Flow diagram as specified in prompt:
            PDF ↓ Text Extraction ↓ Chunking ↓ Embeddings ↓ Vector Search ↓ Relevant Context ↓ LLM ↓ Answer */}
        <div className="my-6">
          <div className="text-xs font-mono text-zinc-400 mb-3 flex items-center justify-between">
            <span>PIPELINE ARCHITECTURE (CLICK ANY STAGE TO INSPECT):</span>
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs font-mono transition-all disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isSimulating ? 'Tracing Query...' : 'Simulate Pipeline Run'}</span>
            </button>
          </div>

          {/* Interactive Stepper Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {steps.map((st, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={st.title}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all ${
                    isCurrent
                      ? 'bg-cyan-950/60 border-cyan-400 text-white scale-105 shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  <div className="mb-2">{st.icon}</div>
                  <span className="text-[11px] font-bold line-clamp-1">{st.title}</span>
                  <span className="text-[9px] font-mono text-zinc-500 mt-1">Step {idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Details Card */}
        <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 mb-6 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">Stage 0{activeStep + 1}:</span>
              <span className="text-white text-sm font-semibold">{steps[activeStep].title}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-cyan-500/30 text-cyan-300 text-[10px]">
              {steps[activeStep].tag}
            </span>
          </div>

          <p className="text-zinc-300 font-sans text-sm leading-relaxed">
            {steps[activeStep].desc}
          </p>

          <div className="bg-zinc-900/90 border border-white/5 rounded-lg p-3 text-[11px] text-cyan-300 overflow-x-auto">
            <span className="text-zinc-500 block mb-1"># Code implementation snippet:</span>
            <pre>{steps[activeStep].code}</pre>
          </div>
        </div>

        {/* Simulation Output Area */}
        {simResult && (
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-xs font-mono text-emerald-200 animate-in fade-in duration-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Query Successfully Resolved via Grounded Context</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-zinc-300 text-xs">
              {simResult}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>LangChain + OpenAI Vector Pipeline</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};
