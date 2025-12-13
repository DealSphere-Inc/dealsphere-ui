import { Lightbulb, Sparkles, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  action?: string;
  description?: string;
  aiSuggested?: boolean;
  confidence?: number;
  onClick?: () => void;
}

export interface Suggestion {
  id: string;
  text: string;
  reasoning: string;
  confidence: number;
}

export const getMockCopilotContextualResponse = (pathname: string, query: string): string => {
  const lowerQuery = query.toLowerCase();

  // General queries
  if (lowerQuery.includes('deals') || lowerQuery.includes('pipeline')) {
    return 'I found 12 active deals in your pipeline. 3 are in due diligence, 4 in term sheet negotiation, and 5 in initial review. Would you like me to show you the deals likely to close this quarter?';
  }

  if (lowerQuery.includes('capital call')) {
    return "You have 2 active capital calls: Fund II Series A ($5.2M, 87% collected) and Fund III Seed ($2.1M, 45% collected). Fund III has 3 overdue LPs. Would you like me to draft reminder emails?";
  }

  if (lowerQuery.includes('portfolio') || lowerQuery.includes('companies')) {
    return 'Your portfolio has 23 active companies. 2 companies (CloudScale, BioTech) are flagged as at-risk due to runway < 12 months. 5 companies are performing above benchmark. Would you like a detailed health report?';
  }

  if (lowerQuery.includes('compliance') || lowerQuery.includes('deadline')) {
    return "You have 1 upcoming compliance deadline: Annual Fund Audit (due in 5 days, complexity: Medium). I've prepared a checklist of required documents. Would you like me to send reminders to your team?";
  }

  // Page-specific responses
  if (pathname === '/dashboard') {
    return "I'm analyzing your dashboard metrics. I noticed 3 overdue capital calls and 2 portfolio companies at risk. Would you like me to prioritize these items or show you predicted health trends?";
  }

  if (pathname === '/pipeline') {
    return "I'm currently viewing your pipeline. I can help you filter deals, predict close likelihood, or detect competitive conflicts. What would you like to explore?";
  }

  if (pathname.startsWith('/fund-admin')) {
    return "I'm in Fund Admin mode. I can help you draft capital calls, track LP responses, or forecast collection timelines. What task can I assist with?";
  }

  // Default response
  return `I'm here to help with "${query}". I can analyze your data, draft documents, or provide insights. Could you provide more context about what you're looking for?`;
};

export const getMockCopilotPageSuggestions = (pathname: string): Suggestion[] => {
  const baseSuggestions: Record<string, Suggestion[]> = {
    '/dashboard': [
      {
        id: 'review-portfolio',
        text: 'Review at-risk portfolio companies',
        reasoning: '2 companies with runway < 12 months detected',
        confidence: 0.92,
      },
      {
        id: 'capital-calls',
        text: 'Follow up on overdue capital calls',
        reasoning: '3 capital calls overdue by 5+ days',
        confidence: 0.88,
      },
    ],
    '/pipeline': [
      {
        id: 'close-deals',
        text: 'Focus on deals likely to close this quarter',
        reasoning: 'Based on stage velocity and historical patterns',
        confidence: 0.78,
      },
      {
        id: 'conflict-check',
        text: 'Run conflict analysis on new deals',
        reasoning: '2 new deals may overlap with portfolio',
        confidence: 0.85,
      },
    ],
    '/portfolio': [
      {
        id: 'health-report',
        text: 'Generate Q4 portfolio health report',
        reasoning: 'Quarter ending soon, typical reporting time',
        confidence: 0.81,
      },
      {
        id: 'runway-analysis',
        text: 'Analyze runway forecasts for next 6 months',
        reasoning: '3 companies projected to need funding',
        confidence: 0.79,
      },
    ],
    '/fund-admin': [
      {
        id: 'draft-call',
        text: 'Draft next capital call for Fund III',
        reasoning: 'Based on deployment schedule',
        confidence: 0.86,
      },
      {
        id: 'lp-reminders',
        text: 'Send reminders to overdue LPs',
        reasoning: '3 LPs overdue on current call',
        confidence: 0.94,
      },
    ],
  };

  return baseSuggestions[pathname] || [
    {
      id: 'default',
      text: 'Analyze current page data',
      reasoning: 'I can provide insights on this section',
      confidence: 0.75,
    },
  ];
};

export const getMockCopilotQuickActions = (pathname: string): QuickAction[] => {
  const baseActions: Record<string, QuickAction[]> = {
    '/dashboard': [
      {
        id: 'summarize',
        label: 'Summarize Today',
        icon: Sparkles,
        action: 'Generate daily summary',
        aiSuggested: true,
        confidence: 0.9,
      },
      {
        id: 'urgent',
        label: 'Show Urgent Items',
        icon: Zap,
        action: 'Filter urgent tasks',
        aiSuggested: true,
        confidence: 0.86,
      },
    ],
    '/pipeline': [
      { id: 'analyze', label: 'Analyze Deals', icon: Sparkles, action: 'Run deal analysis' },
      { id: 'conflicts', label: 'Check Conflicts', icon: Zap, action: 'Detect conflicts' },
    ],
    '/fund-admin': [
      { id: 'draft-call', label: 'Draft Capital Call', icon: Sparkles, action: 'Generate capital call' },
      { id: 'track-lps', label: 'Track LPs', icon: Zap, action: 'Show LP status' },
    ],
  };

  return baseActions[pathname] || [
    { id: 'help', label: 'What can you do?', icon: Lightbulb, action: 'Show capabilities' },
  ];
};

