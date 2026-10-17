export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl: string;
  demoUrl?: string;
  featured?: boolean;
  category: 'Machine Learning' | 'Generative AI' | 'AI Automation';
}

export interface SkillItem {
  name: string;
  category: 'Programming' | 'Data & ML' | 'Deep Learning' | 'NLP' | 'Generative AI' | 'Automation' | 'Development';
  level?: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  tags: string[];
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  credentialId?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}
