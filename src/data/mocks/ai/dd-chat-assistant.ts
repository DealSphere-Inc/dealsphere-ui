export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestedQuestions?: string[];
  relatedDocs?: { name: string; category: string }[];
  insights?: { type: 'positive' | 'negative' | 'neutral'; text: string }[];
}

export const mockConversations: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hi! I'm your AI Due Diligence Assistant. I can help you analyze deals, answer questions about companies in your pipeline, and provide insights from uploaded documents. What would you like to know?",
    timestamp: new Date(),
    suggestedQuestions: [
      'What are the key risks for Quantum AI?',
      'Compare unit economics across my active deals',
      "What's the competitive landscape for NeuroLink?",
      'Summarize financial metrics for CloudScale',
    ],
  },
];

