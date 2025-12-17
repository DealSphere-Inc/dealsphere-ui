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

export const getMockCopilotPageSuggestions = (pathname: string, tab?: string | null): Suggestion[] => {
  // Create a composite key from pathname and tab for context-specific suggestions
  const contextKey = tab ? `${pathname}:${tab}` : pathname;

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
    // Tab-specific suggestions for /contacts page
    '/contacts:overview': [
      {
        id: 'identify-cold-contacts',
        text: 'Identify contacts who haven\'t been reached in 60+ days',
        reasoning: 'Found 8 high-value contacts with no recent activity',
        confidence: 0.89,
      },
      {
        id: 'draft-outreach',
        text: 'Draft personalized outreach emails',
        reasoning: 'Based on interaction history and deals',
        confidence: 0.83,
      },
    ],
    '/contacts:timeline': [
      {
        id: 'schedule-followups',
        text: 'Schedule follow-ups for recent interactions',
        reasoning: '5 conversations need follow-up actions',
        confidence: 0.87,
      },
      {
        id: 'analyze-engagement',
        text: 'Analyze engagement patterns over time',
        reasoning: 'Identify optimal outreach timing',
        confidence: 0.80,
      },
    ],
    '/contacts:email': [
      {
        id: 'sync-emails',
        text: 'Sync recent email conversations',
        reasoning: '12 new emails detected across accounts',
        confidence: 0.91,
      },
      {
        id: 'auto-categorize',
        text: 'Auto-categorize email interactions',
        reasoning: 'Using AI to tag meetings, intros, and updates',
        confidence: 0.84,
      },
    ],
    // Tab-specific suggestions for /lp-portal page
    '/lp-portal:overview': [
      {
        id: 'investor-summary',
        text: 'Generate investor summary report',
        reasoning: 'Quarterly reporting period approaching',
        confidence: 0.86,
      },
      {
        id: 'performance-highlights',
        text: 'Prepare performance highlights for LP meeting',
        reasoning: 'Based on recent portfolio updates',
        confidence: 0.82,
      },
    ],
    '/lp-portal:reports': [
      {
        id: 'generate-quarterly',
        text: 'Generate Q4 quarterly report',
        reasoning: 'All data collected, ready to compile',
        confidence: 0.93,
      },
      {
        id: 'customize-reports',
        text: 'Customize reports for top 5 LPs',
        reasoning: 'Different reporting preferences detected',
        confidence: 0.79,
      },
    ],
    '/lp-portal:capital': [
      {
        id: 'forecast-calls',
        text: 'Forecast next 3 capital calls',
        reasoning: 'Based on deployment schedule',
        confidence: 0.88,
      },
      {
        id: 'track-commitments',
        text: 'Track unfunded commitments by LP',
        reasoning: 'Identify potential dry powder issues',
        confidence: 0.85,
      },
    ],
    '/lp-portal:performance': [
      {
        id: 'benchmark-performance',
        text: 'Benchmark against industry peers',
        reasoning: 'New Cambridge Associates data available',
        confidence: 0.81,
      },
      {
        id: 'explain-variances',
        text: 'Explain TVPI variance vs last quarter',
        reasoning: 'TVPI changed by 0.3x, prepare commentary',
        confidence: 0.87,
      },
    ],
    // Tab-specific for Deal Intelligence page
    '/deal-intelligence:fund-level': [
      {
        id: 'deal-flow-insights',
        text: 'Analyze deal flow trends this month',
        reasoning: '15% increase in early-stage deals detected',
        confidence: 0.84,
      },
      {
        id: 'dd-bottlenecks',
        text: 'Identify due diligence bottlenecks',
        reasoning: '3 deals stalled in legal review',
        confidence: 0.90,
      },
    ],
    '/deal-intelligence:per-deal': [
      {
        id: 'deal-risk-analysis',
        text: 'Run comprehensive risk analysis on this deal',
        reasoning: 'Market conditions changed since initial review',
        confidence: 0.82,
      },
      {
        id: 'compare-similar',
        text: 'Compare with similar deals in portfolio',
        reasoning: 'Found 3 comparable investments',
        confidence: 0.86,
      },
    ],
  };

  // Try context-specific (pathname:tab) first, fall back to pathname only
  return baseSuggestions[contextKey] || baseSuggestions[pathname] || [
    {
      id: 'default',
      text: 'Analyze current page data',
      reasoning: 'I can provide insights on this section',
      confidence: 0.75,
    },
  ];
};

export const getMockCopilotQuickActions = (pathname: string, tab?: string | null): QuickAction[] => {
  // Create a composite key from pathname and tab for context-specific actions
  const contextKey = tab ? `${pathname}:${tab}` : pathname;

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
    // Tab-specific quick actions for /contacts page
    '/contacts:overview': [
      { id: 'filter-cold', label: 'Filter Cold Contacts', icon: Zap, action: 'Show inactive contacts' },
      { id: 'export-list', label: 'Export Contact List', icon: Sparkles, action: 'Generate export' },
    ],
    '/contacts:timeline': [
      { id: 'add-note', label: 'Add Interaction Note', icon: Sparkles, action: 'Log new interaction' },
      { id: 'schedule-meeting', label: 'Schedule Follow-up', icon: Zap, action: 'Create calendar event' },
    ],
    '/contacts:email': [
      { id: 'compose-email', label: 'Compose Email', icon: Sparkles, action: 'Draft new email' },
      { id: 'sync-now', label: 'Sync Emails Now', icon: Zap, action: 'Force sync all accounts' },
    ],
    // Tab-specific quick actions for /lp-portal page
    '/lp-portal:overview': [
      { id: 'send-update', label: 'Send LP Update', icon: Sparkles, action: 'Draft investor update' },
      { id: 'view-activity', label: 'View Recent Activity', icon: Zap, action: 'Show activity log' },
    ],
    '/lp-portal:reports': [
      { id: 'generate-report', label: 'Generate Report', icon: Sparkles, action: 'Create quarterly report' },
      { id: 'customize-template', label: 'Customize Template', icon: Zap, action: 'Edit report format' },
    ],
    '/lp-portal:capital': [
      { id: 'new-call', label: 'Create Capital Call', icon: Sparkles, action: 'Draft new call' },
      { id: 'track-responses', label: 'Track Responses', icon: Zap, action: 'Show LP responses' },
    ],
    '/lp-portal:performance': [
      { id: 'export-metrics', label: 'Export Metrics', icon: Sparkles, action: 'Download performance data' },
      { id: 'compare-benchmark', label: 'Compare to Benchmark', icon: Zap, action: 'Load peer data' },
    ],
    // Tab-specific for Deal Intelligence page
    '/deal-intelligence:fund-level': [
      { id: 'pipeline-report', label: 'Generate Pipeline Report', icon: Sparkles, action: 'Create pipeline summary' },
      { id: 'dd-status', label: 'DD Status Overview', icon: Zap, action: 'Show all DD progress' },
    ],
    '/deal-intelligence:per-deal': [
      { id: 'risk-report', label: 'Generate Risk Report', icon: Sparkles, action: 'Analyze deal risks' },
      { id: 'share-summary', label: 'Share Deal Summary', icon: Zap, action: 'Export deal memo' },
    ],
  };

  // Try context-specific (pathname:tab) first, fall back to pathname only
  return baseActions[contextKey] || baseActions[pathname] || [
    { id: 'help', label: 'What can you do?', icon: Lightbulb, action: 'Show capabilities' },
  ];
};

