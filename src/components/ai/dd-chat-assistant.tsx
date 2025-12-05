'use client'

import { useState, useRef, useEffect } from 'react';
import { Card, Button, Input, Badge } from '@/ui';
import { Send, Sparkles, User, Bot, Lightbulb, TrendingUp, AlertCircle, FileText } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestedQuestions?: string[];
  relatedDocs?: { name: string; category: string }[];
  insights?: { type: 'positive' | 'negative' | 'neutral'; text: string }[];
}

interface ChatSession {
  dealId?: number;
  dealName?: string;
  messages: Message[];
}

const mockConversations: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm your AI Due Diligence Assistant. I can help you analyze deals, answer questions about companies in your pipeline, and provide insights from uploaded documents. What would you like to know?",
    timestamp: new Date(),
    suggestedQuestions: [
      "What are the key risks for Quantum AI?",
      "Compare unit economics across my active deals",
      "What's the competitive landscape for NeuroLink?",
      "Summarize financial metrics for CloudScale"
    ]
  }
];

export function DDChatAssistant({ dealId, dealName }: { dealId?: number; dealName?: string }) {
  const [messages, setMessages] = useState<Message[]>(mockConversations);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase();

    // Mock intelligent responses based on query patterns
    if (lowerQuery.includes('risk') || lowerQuery.includes('red flag')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Based on my analysis of ${dealName || 'the selected deal'}, here are the key risks identified:\n\n1. **Market Risk**: Competing against well-funded tech giants (IBM Quantum, Google Quantum AI)\n2. **Technology Risk**: Quantum computing market is still early and unproven\n3. **Moat Concern**: Limited defensibility beyond technical expertise\n\nHowever, these are partially offset by:\n- Strong technical team with quantum expertise from top institutions\n- Clear product-market fit (15% MoM growth)\n- Enterprise traction with Fortune 500 pilots`,
        timestamp: new Date(),
        insights: [
          { type: 'negative', text: 'Competitive pressure from tech giants' },
          { type: 'negative', text: 'Early-stage market with adoption uncertainty' },
          { type: 'positive', text: 'Strong founding team mitigates execution risk' }
        ],
        relatedDocs: [
          { name: 'Quantum_AI_Deck_Nov2024.pdf', category: 'Pitch Deck' },
          { name: 'Competitive Analysis', category: 'Market Research' },
          { name: 'Reference Call Notes', category: 'Team Assessment' }
        ],
        suggestedQuestions: [
          "How does the team plan to compete with IBM and Google?",
          "What's the timeline to market adoption for quantum computing?",
          "Are there any defensive moats being built?"
        ]
      };
    }

    if (lowerQuery.includes('unit economics') || lowerQuery.includes('ltv') || lowerQuery.includes('cac')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Here's a comparison of unit economics across your active deals:\n\n**Quantum AI**\n- CAC: $850\n- LTV: $4,200\n- LTV:CAC Ratio: 4.9x ✓\n- Payback Period: 8 months\n\n**NeuroLink**\n- CAC: $1,200\n- LTV: $3,800\n- LTV:CAC Ratio: 3.2x ⚠\n- Payback Period: 11 months\n\n**CloudScale**\n- CAC: $650\n- LTV: $5,800\n- LTV:CAC Ratio: 8.9x ✓✓\n- Payback Period: 6 months\n\n**Analysis**: CloudScale shows the strongest unit economics with excellent LTV:CAC ratio and quick payback. Quantum AI is solid. NeuroLink's 3.2x ratio is acceptable but below the ideal 3:1 threshold for early-stage companies.`,
        timestamp: new Date(),
        insights: [
          { type: 'positive', text: 'CloudScale has exceptional unit economics (8.9x)' },
          { type: 'neutral', text: 'Quantum AI shows healthy 4.9x ratio' },
          { type: 'negative', text: 'NeuroLink ratio of 3.2x is below optimal for medical devices' }
        ],
        suggestedQuestions: [
          "What's driving CloudScale's superior unit economics?",
          "How can NeuroLink improve their LTV:CAC ratio?",
          "What are the gross margins for each deal?"
        ]
      };
    }

    if (lowerQuery.includes('competitive') || lowerQuery.includes('competition')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `For ${dealName || 'this deal'}, here's the competitive landscape analysis:\n\n**Direct Competitors**:\n- IBM Quantum (Market Leader, $billions in funding)\n- Google Quantum AI (Tech giant resources)\n- IonQ (Public company, $650M market cap)\n\n**Competitive Positioning**:\n✓ **Differentiation**: Hybrid quantum-classical approach makes quantum accessible via APIs\n✓ **Target Market**: Focusing on enterprise SaaS vs hardware sales\n✓ **Go-to-Market**: Bottom-up developer adoption vs top-down enterprise sales\n\n**Market Dynamics**:\n- Total addressable market: $50B by 2030\n- Currently fragmented with no dominant player in enterprise software layer\n- Window of opportunity for 2-3 years before consolidation\n\n**Recommendation**: Strong differentiation in GTM strategy, but monitor competitive moves closely.`,
        timestamp: new Date(),
        relatedDocs: [
          { name: 'Competitive Analysis Report', category: 'Market Research' },
          { name: 'Industry Landscape 2024', category: 'Market Research' }
        ],
        suggestedQuestions: [
          "What's the competitive moat strategy?",
          "How quickly can competitors replicate this approach?",
          "What partnerships could strengthen market position?"
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I can help you with that! Based on the documents and data available for ${dealName || 'your deals'}, I'd be happy to provide insights.\n\nTo give you the most relevant analysis, could you be more specific about what aspect you'd like to explore?\n\nSome areas I can help with:\n- Financial metrics and projections\n- Market sizing and competitive analysis\n- Team assessment and founder background\n- Risk analysis and red flags\n- Comparative analysis across deals`,
      timestamp: new Date(),
      suggestedQuestions: [
        "What are the key financial metrics?",
        "How does this compare to similar deals?",
        "What are the main risks?",
        "Tell me about the founding team"
      ]
    };
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <Card padding="none" className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--app-border)]">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[var(--app-primary)]" />
          <h3 className="font-semibold">AI Due Diligence Assistant</h3>
          {dealName && (
            <Badge size="sm" variant="flat" className="bg-[var(--app-surface-hover)]">
              {dealName}
            </Badge>
          )}
        </div>
        <p className="text-xs text-[var(--app-text-muted)]">
          Ask questions about deals, analyze metrics, and get AI-powered insights
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user'
                ? 'bg-[var(--app-primary)]'
                : 'bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-secondary)]'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
              <div className={`max-w-[85%] ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-[var(--app-primary)] text-white'
                    : 'bg-[var(--app-surface-hover)] text-[var(--app-text)]'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Insights */}
                {message.insights && message.insights.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.insights.map((insight, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
                          insight.type === 'positive' ? 'bg-[var(--app-success-bg)]' :
                          insight.type === 'negative' ? 'bg-[var(--app-danger-bg)]' :
                          'bg-[var(--app-info-bg)]'
                        }`}
                      >
                        {insight.type === 'positive' ? <TrendingUp className="w-3 h-3 text-[var(--app-success)] mt-0.5" /> :
                         insight.type === 'negative' ? <AlertCircle className="w-3 h-3 text-[var(--app-danger)] mt-0.5" /> :
                         <Lightbulb className="w-3 h-3 text-[var(--app-info)] mt-0.5" />}
                        <span className={
                          insight.type === 'positive' ? 'text-[var(--app-success)]' :
                          insight.type === 'negative' ? 'text-[var(--app-danger)]' :
                          'text-[var(--app-info)]'
                        }>{insight.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Related Documents */}
                {message.relatedDocs && message.relatedDocs.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-[var(--app-text-muted)] mb-2">📎 Related Documents:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.relatedDocs.map((doc, idx) => (
                        <Badge
                          key={idx}
                          size="sm"
                          variant="flat"
                          className="bg-[var(--app-surface-hover)] cursor-pointer hover:bg-[var(--app-primary-bg)] hover:text-[var(--app-primary)]"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          {doc.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Questions */}
                {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-[var(--app-text-muted)] mb-2">💡 Suggested questions:</p>
                    <div className="space-y-1">
                      {message.suggestedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="block w-full text-left text-xs p-2 rounded-lg bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-muted)] hover:text-[var(--app-primary)] transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-[var(--app-text-subtle)] mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-secondary)] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-[var(--app-surface-hover)] rounded-lg p-3 max-w-[100px]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--app-text-muted)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[var(--app-text-muted)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[var(--app-text-muted)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--app-border)]">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask about financials, risks, team, market sizing..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            size="md"
            className="flex-1"
          />
          <Button
            color="primary"
            isIconOnly
            onPress={handleSend}
            isDisabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-[var(--app-text-subtle)] mt-2">
          AI assistant analyzes uploaded documents, financial data, and market research
        </p>
      </div>
    </Card>
  );
}
