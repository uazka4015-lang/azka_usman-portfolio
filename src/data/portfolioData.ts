import { Project, SkillItem, TimelineMilestone, CertificateItem, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Azka Usman',
  primaryTitle: 'AI Engineer',
  secondaryRoles: [
    'Machine Learning Developer',
    'Generative AI Developer',
    'NLP Developer',
    'AI Automation Developer',
  ],
  tagline: 'Becoming, one commit at a time.',
  bioSummary:
    'I’m Azka Usman, an AI Engineer focused on building practical solutions with Machine Learning, Deep Learning, Generative AI, NLP, RAG systems, and intelligent automation.',
  aboutFull:
    'I’m Azka Usman, a BSCS student and aspiring AI Engineer passionate about building practical AI applications. My journey spans Python, Machine Learning, Deep Learning, NLP, Generative AI, RAG systems, LLM applications, and AI automation. I focus on learning by building — turning concepts into working applications and continuously improving my engineering skills through real projects.',
  education: 'BS Computer Science (BSCS)',
  email: 'uazka4015@gmail.com',
  linkedin: 'https://www.linkedin.com/in/azka-usman-352269407/',
  github: 'https://github.com/azka-usman',
  statusBadge: 'Open for AI Engineering Roles & Internships',
};

export const THREE_PILLARS = [
  {
    title: 'BUILD',
    headline: 'Real-world AI applications',
    description:
      'Translating modern machine learning models and LLM frameworks into production-grade systems, from custom vector retrievers to automated business flows.',
    tag: 'Hands-on Execution',
    accent: 'blue',
  },
  {
    title: 'LEARN',
    headline: 'Continuous technical growth',
    description:
      'Deepening mathematical foundations in calculus, linear algebra, attention mechanisms, vector databases, and modern neural architectures.',
    tag: 'Rigorous Depth',
    accent: 'cyan',
  },
  {
    title: 'SOLVE',
    headline: 'Turning problems into intelligent solutions',
    description:
      'Engineering practical solutions that eliminate manual friction, extract semantic meaning from raw documents, and generate actionable insights.',
    tag: 'Engineered Impact',
    accent: 'purple',
  },
];

export const SKILLS_CATEGORIES: { category: string; description: string; skills: string[] }[] = [
  {
    category: 'Programming',
    description: 'Core languages for systems, algorithms, and data structures',
    skills: ['Python', 'C', 'SQL'],
  },
  {
    category: 'Data & Machine Learning',
    description: 'Statistical modeling, data wrangling, and predictive algorithms',
    skills: [
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Scikit-learn',
      'Regression',
      'Classification',
      'Clustering',
      'PCA',
      'Feature Engineering',
      'Model Evaluation',
    ],
  },
  {
    category: 'Deep Learning',
    description: 'Neural network training, optimization, and computer vision pipelines',
    skills: [
      'Neural Networks',
      'TensorFlow',
      'PyTorch',
      'Computer Vision',
      'Model Training',
    ],
  },
  {
    category: 'NLP',
    description: 'Linguistic processing, token representations, and semantic analysis',
    skills: [
      'Tokenization',
      'Stemming',
      'Lemmatization',
      'TF-IDF',
      'Word Embeddings',
      'Text Processing',
    ],
  },
  {
    category: 'Generative AI',
    description: 'Prompt engineering, RAG pipelines, vector indexes, and agent orchestration',
    skills: [
      'LLMs',
      'Prompt Engineering',
      'RAG',
      'Embeddings',
      'Vector Search',
      'LangChain',
      'AI Agents',
    ],
  },
  {
    category: 'Automation',
    description: 'Workflow automation, event hooks, and business integrations',
    skills: [
      'n8n',
      'Webhooks',
      'APIs',
      'Google Sheets',
      'Workflow Automation',
      'AI Agents',
    ],
  },
  {
    category: 'Development',
    description: 'Interactive UI, version control, and production tooling',
    skills: [
      'Streamlit',
      'Git',
      'GitHub',
      'VS Code',
      'REST APIs',
    ],
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'pdf-rag-chatbot',
    title: 'PDF RAG Chatbot',
    shortDescription:
      'An AI-powered document question-answering application that allows users to upload PDF documents and ask questions about their content using Retrieval Augmented Generation.',
    problem:
      'Large language models suffer from hallucinations and lack domain context when answering questions about proprietary, length-heavy PDFs and technical documentation.',
    solution:
      'Designed an end-to-end RAG architecture that chunks extracted text, computes dense embeddings, indexes vectors in a similarity store, retrieves top-k relevant passages, and synthesizes grounded answers with page attribution.',
    technologies: [
      'Python',
      'LangChain',
      'OpenAI',
      'OpenAI Embeddings',
      'Vector Store',
      'PyPDF',
      'Streamlit',
    ],
    keyFeatures: [
      'Multi-page PDF text extraction and semantic chunking',
      'Dense vector embedding generation & cosine retrieval',
      'Context-augmented prompt construction to prevent hallucination',
      'Source-cited conversational responses with low latency',
      'Interactive Streamlit UI with file upload and live query console',
    ],
    githubUrl: 'https://github.com/azka-usman/pdf-rag-chatbot',
    demoUrl: '#demo-rag',
    featured: true,
    category: 'Generative AI',
  },
  {
    id: 'ai-movie-recommendation',
    title: 'AI Movie Recommendation System',
    shortDescription:
      'A content-based movie recommendation system built using the TMDB 5000 dataset. The system analyzes movie metadata including genres, keywords, overview, cast and crew to recommend similar movies.',
    problem:
      'Users face severe catalog fatigue trying to discover related titles based on nuanced thematic, stylistic, and directorial attributes beyond simple genre tags.',
    solution:
      'Engineered a composite metadata text soup blending director, top actors, genres, and storyline keywords, vectorized with NLP CountVectorizer / TF-IDF, and calculated pairwise Cosine Similarity matrix for instant recommendations.',
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'NLP',
      'Streamlit',
    ],
    keyFeatures: [
      'Content-based vector filtering over TMDB 5000 movies',
      'Metadata engineering (genres, keywords, directors, top cast)',
      'Cosine similarity matrix computations with instant lookup',
      'Clean interactive Streamlit interface displaying poster art and similarity scores',
    ],
    githubUrl: 'https://github.com/azka-usman/movie-recommender-system',
    demoUrl: '#demo-movie',
    featured: true,
    category: 'Machine Learning',
  },
  {
    id: 'ai-automation-workflows',
    title: 'AI Automation Workflows',
    shortDescription:
      'AI-powered automation workflows connecting AI models, webhooks, Google Sheets and business processes using n8n.',
    problem:
      'Companies lose hours manually routing inbound data, summarizing tickets, syncing Google Sheets, and alerting team channels.',
    solution:
      'Built autonomous n8n workflows featuring webhook ingestion nodes, OpenAI parsing agents for unstructured data classification, automated conditional logic gates, and bi-directional Google Sheets syncing.',
    technologies: [
      'n8n',
      'AI Agents',
      'OpenAI',
      'Webhooks',
      'Google Sheets',
      'APIs',
    ],
    keyFeatures: [
      'Event-driven webhook triggers for instant message reception',
      'LLM-driven classification node transforming unstructured text into clean JSON schema',
      'Autonomous decision gates routing urgent leads vs routine updates',
      'Real-time spreadsheet synchronization and automated notifications',
    ],
    githubUrl: 'https://github.com/azka-usman/ai-automation-n8n-workflows',
    demoUrl: '#demo-n8n',
    featured: true,
    category: 'AI Automation',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2025 - Present',
    title: 'Generative AI & Autonomous Agent Architecture',
    subtitle: 'RAG Systems, Vector Embeddings & Agentic Automation',
    description:
      'Building production-ready Retrieval-Augmented Generation (RAG) pipelines, integrating vector stores, fine-tuning prompt strategies, and deploying multi-agent n8n workflow automations.',
    badge: 'Generative AI Focus',
    tags: ['RAG', 'LangChain', 'Vector Stores', 'n8n Agents', 'Embeddings'],
  },
  {
    year: '2024 - 2025',
    title: 'Deep Learning & Natural Language Processing',
    subtitle: 'Neural Architectures, Text Processing & Embeddings',
    description:
      'Implemented neural networks in PyTorch and TensorFlow, mastered NLP fundamentals (tokenization, stemming, TF-IDF, vector representations), and applied model evaluation techniques to text datasets.',
    badge: 'Deep Learning Mastery',
    tags: ['PyTorch', 'TensorFlow', 'NLP', 'Computer Vision', 'TF-IDF'],
  },
  {
    year: '2023 - 2024',
    title: 'Machine Learning & Classical Data Science',
    subtitle: 'Statistical Modeling & Algorithmic Foundations',
    description:
      'Rigorous study of supervised and unsupervised machine learning (regression, classification, clustering, PCA, feature engineering) using NumPy, Pandas, and Scikit-learn.',
    badge: 'Core ML Foundations',
    tags: ['Scikit-learn', 'NumPy', 'Pandas', 'Feature Engineering', 'PCA'],
  },
  {
    year: '2022 - 2023',
    title: 'Computer Science Core Foundations',
    subtitle: 'BSCS Studies & Software Engineering',
    description:
      'Enrolled in BS Computer Science, mastering object-oriented programming, data structures, algorithms in C and Python, database schemas in SQL, and modern version control.',
    badge: 'Academic Discipline',
    tags: ['BSCS', 'Python', 'C Language', 'SQL', 'Algorithms', 'Git'],
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    date: '2024',
    skills: ['Supervised Learning', 'Neural Networks', 'Unsupervised Learning', 'Model Evaluation'],
  },
  {
    title: 'Deep Learning & Neural Networks',
    issuer: 'DeepLearning.AI',
    date: '2024',
    skills: ['PyTorch', 'Backpropagation', 'Hyperparameter Tuning', 'Computer Vision'],
  },
  {
    title: 'LangChain & Generative AI Systems',
    issuer: 'Interactive AI Engineering',
    date: '2025',
    skills: ['RAG Architectures', 'Vector Databases', 'Prompt Engineering', 'LLM Chains'],
  },
  {
    title: 'Python for Data Science & Machine Learning Bootcamp',
    issuer: 'Udemy / Open Source Curriculum',
    date: '2023',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Data Wrangling'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'rag-systems',
    title: 'Custom RAG Pipeline Development',
    description:
      'Designing and deploying tailored document intelligence systems using semantic search, chunking optimizations, and grounding to eliminate hallucinations.',
    deliverables: [
      'Document parsing & semantic chunking strategies',
      'Vector database configuration & indexing',
      'Precision top-k retrieval & citation prompts',
      'Interactive Streamlit or web UI',
    ],
    icon: 'Database',
  },
  {
    id: 'ml-modeling',
    title: 'Machine Learning & Predictive Modeling',
    description:
      'Building regression, classification, and recommendation engines from structured data with rigorous feature engineering and evaluation.',
    deliverables: [
      'Exploratory data analysis & feature importance',
      'Scikit-learn / XGBoost model training',
      'Cross-validation & performance metrics',
      'API deployment for inference',
    ],
    icon: 'Cpu',
  },
  {
    id: 'ai-automation',
    title: 'AI Workflow Automation (n8n & Webhooks)',
    description:
      'Automating business operations, customer inquiries, and data pipelines by interconnecting webhooks, LLMs, and external tools.',
    deliverables: [
      'End-to-end n8n workflow design',
      'Autonomous LLM extraction & categorization nodes',
      'Google Sheets, Slack, and email synchronizers',
      'Error handling and fallback logging',
    ],
    icon: 'Workflow',
  },
  {
    id: 'nlp-applications',
    title: 'Natural Language Processing Solutions',
    description:
      'Implementing sentiment classification, topic extraction, entity recognition, and semantic text matching systems.',
    deliverables: [
      'Text cleaning, lemmatization & tokenization pipelines',
      'TF-IDF & vector embedding representations',
      'Cosine similarity & clustering models',
      'Fast inference pipelines',
    ],
    icon: 'MessageSquareText',
  },
];
