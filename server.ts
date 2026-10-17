import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '25mb' }));

  const apiKey = process.env.GEMINI_API_KEY || '';

  // Initialize Gemini client with telemetry header
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY'),
      timestamp: new Date().toISOString(),
    });
  });

  // 1. Multi-turn Chat Endpoint
  // Models supported: gemini-3.5-flash (general), gemini-3.1-flash-lite (fast), gemini-3.1-pro-preview (complex)
  app.post('/api/gemini/chat', async (req: Request, res: Response) => {
    try {
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.status(503).json({
          error: 'Gemini API key is not configured in environment secrets.',
        });
      }

      const { messages, modelChoice = 'general', taskType = 'general' } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      // Map modelChoice to required models according to specification:
      // gemini-3.1-pro-preview for particularly complex tasks
      // gemini-3.5-flash for general tasks
      // gemini-3.1-flash-lite for tasks that should happen fast
      let selectedModel = 'gemini-3.5-flash';
      if (modelChoice === 'complex' || taskType === 'complex') {
        selectedModel = 'gemini-3.1-pro-preview';
      } else if (modelChoice === 'fast' || taskType === 'fast') {
        selectedModel = 'gemini-3.1-flash-lite';
      } else if (typeof modelChoice === 'string' && modelChoice.startsWith('gemini-')) {
        selectedModel = modelChoice;
      }

      const systemInstruction = `You are the AI Portfolio Assistant and technical digital avatar of Azka Usman.
Azka Usman is an aspiring AI Engineer, Machine Learning Developer, Generative AI Developer, NLP Developer, and AI Automation Developer.
Her tagline is: "Becoming, one commit at a time."
Her professional positioning: Azka is a BSCS student building practical AI solutions using Machine Learning, Deep Learning, NLP, Generative AI, RAG systems, LLM applications, and AI automation.

Key Projects:
1. AI Movie Recommendation System:
   - Content-based recommendation using TMDB 5000 dataset.
   - Extracts metadata (genres, keywords, overview, cast, crew), applies TF-IDF and count vectorization, computes cosine similarity matrices.
   - Built with Python, Pandas, NumPy, Scikit-learn, NLP, and interactive Streamlit UI.

2. PDF RAG Chatbot (Signature Generative AI Project):
   - Architecture: PDF Upload -> PyPDF Text Extraction -> Recursive Character Text Chunking (with overlap) -> OpenAI Embeddings / Vector Store -> Top-k Similarity Search & Retrieval -> Augmented Prompt with Context -> LLM inference -> Grounded Citation & Answer.
   - Built with Python, LangChain, Vector Store, Streamlit, and prompt guardrails.

3. AI Automation Workflows:
   - Automated business processes connecting AI models, webhooks, Google Sheets, Slack, and APIs using n8n.
   - Uses AI Agent nodes for autonomous classification, data enrichment, and webhook triggers.

Skills & Tech Stack:
- Programming: Python, C, SQL
- Data & Machine Learning: NumPy, Pandas, Matplotlib, Scikit-learn, Regression, Classification, Clustering, PCA, Feature Engineering, Model Evaluation
- Deep Learning: Neural Networks, TensorFlow, PyTorch, Computer Vision, Model Training
- NLP: Tokenization, Stemming, Lemmatization, TF-IDF, Word Embeddings, Text Processing
- Generative AI: LLMs, Prompt Engineering, RAG, Embeddings, Vector Search, LangChain, AI Agents
- Automation: n8n, Webhooks, APIs, Google Sheets, Workflow Automation, AI Agents
- Development: Streamlit, Git, GitHub, VS Code, REST APIs

Azka's Contact:
- LinkedIn: https://www.linkedin.com/in/azka-usman-352269407/
- Email: uazka4015@gmail.com

Persona & Style:
- Confident, deeply technical yet approachable, articulate, recruiter-friendly.
- Ground your answers in Azka's verified technical achievements, avoiding fake accolades or fabricated work history.
- When asked technical questions (e.g., how RAG solves hallucination, how cosine similarity works, how n8n integrates webhooks), provide crisp engineering answers.`;

      // Transform messages into contents format
      const contents = messages.map((m: { role: string; content?: string; text?: string }) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content || m.text || '' }],
      }));

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I'm here to represent Azka's AI engineering portfolio. How can I assist you?";

      res.json({
        reply,
        modelUsed: selectedModel,
      });
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const message = err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ error: message });
    }
  });

  // 2. Text-to-Speech Endpoint
  // Model required: gemini-3.8-flash-tts
  app.post('/api/gemini/tts', async (req: Request, res: Response) => {
    try {
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.status(503).json({
          error: 'Gemini API key is not configured in environment secrets.',
        });
      }

      const {
        text,
        voiceName = 'Kore',
        style = 'Clear, confident, articulate young AI engineer speaking enthusiastically about machine learning and technology',
      } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text string is required.' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: text.slice(0, 500), // Keep length balanced for fast unary response
                speechMetadata: {
                  style,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!base64Audio) {
        return res.status(500).json({ error: 'No audio generated by the TTS model.' });
      }

      res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
      });
    } catch (err: unknown) {
      console.error('TTS error:', err);
      const message = err instanceof Error ? err.message : 'Text-to-speech failed';
      res.status(500).json({ error: message });
    }
  });

  // 3. Image Generation Endpoint
  // Model required: gemini-3-pro-image-preview
  // Affordance: 1K, 2K, 4K image sizes
  app.post('/api/gemini/generate-image', async (req: Request, res: Response) => {
    try {
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.status(503).json({
          error: 'Gemini API key is not configured in environment secrets.',
        });
      }

      const {
        prompt,
        imageSize = '1K',
        aspectRatio = '1:1',
      } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      const validSizes = ['1K', '2K', '4K'];
      const chosenSize = validSizes.includes(imageSize) ? imageSize : '1K';

      const validAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
      const chosenRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: chosenRatio,
            imageSize: chosenSize,
          },
        },
      });

      let imageUrl: string | null = null;
      let textFeedback: string | null = null;

      const candidates = response.candidates;
      if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mime};base64,${part.inlineData.data}`;
          } else if (part.text) {
            textFeedback = part.text;
          }
        }
      }

      if (!imageUrl) {
        return res.status(500).json({
          error: textFeedback || 'No image part returned from image generation model.',
        });
      }

      res.json({
        imageUrl,
        size: chosenSize,
        aspectRatio: chosenRatio,
        prompt,
      });
    } catch (err: unknown) {
      console.error('Image gen error:', err);
      const message = err instanceof Error ? err.message : 'Image generation failed';
      res.status(500).json({ error: message });
    }
  });

  // Contact Form Submission endpoint (simulates instant webhook logging)
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // In a live app, this can trigger an n8n webhook or email notification
    console.log(`[Contact Received] from ${name} (${email}) - ${subject}: ${message}`);
    res.json({
      success: true,
      message: "Thank you for reaching out! Azka will review your message shortly.",
      timestamp: new Date().toISOString(),
    });
  });

  // Setup Vite middleware in dev or static serving in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server started on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server boot error:', err);
});
