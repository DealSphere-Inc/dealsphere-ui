'use client'

import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Bot, ChevronRight, ChevronDown, Send } from 'lucide-react';
import { Button, Input } from '@/ui';
import { AICopilotBubble } from './ai-copilot-bubble';
import { useNavigation } from '@/contexts/navigation-context';
import {
  getMockCopilotContextualResponse,
  getMockCopilotPageSuggestions,
  getMockCopilotQuickActions,
  type QuickAction,
  type Suggestion,
} from '@/data/mocks/ai/copilot';

// Context for controlling the AI Copilot from other components
interface AICopilotContextType {
  openWithQuery: (query: string) => void;
}

const AICopilotContext = createContext<AICopilotContextType | undefined>(undefined);

export function useAICopilot() {
  const context = useContext(AICopilotContext);
  if (!context) {
    throw new Error('useAICopilot must be used within AICopilotProvider');
  }
  return context;
}

// Global callback ref for cross-component communication
let globalOpenQueryCallback: ((query: string) => void) | null = null;

export function setGlobalOpenQueryCallback(callback: (query: string) => void) {
  globalOpenQueryCallback = callback;
}

// Provider component that can be used in layout
export function AICopilotProvider({ children }: { children: React.ReactNode }) {
  const contextValue = {
    openWithQuery: (query: string) => {
      if (globalOpenQueryCallback) {
        globalOpenQueryCallback(query);
      }
    },
  };

  return (
    <AICopilotContext.Provider value={contextValue}>
      {children}
    </AICopilotContext.Provider>
  );
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  confidence?: number;
}

// Allows external components to inject messages into the Copilot chat
export type ExternalMessage = {
  content: string;
  type?: 'user' | 'ai';
  confidence?: number;
};

// Shared channels so other components can control Copilot UI
let globalQuickActions: QuickAction[] | null = null;
let globalQuickActionsCallback: ((actions: QuickAction[]) => void) | null = null;
let globalPushMessageCallback: ((message: ExternalMessage) => void) | null = null;
let pendingMessages: ExternalMessage[] = [];
let globalSuggestions: Suggestion[] | null = null;
let globalSuggestionsCallback: ((suggestions: Suggestion[]) => void) | null = null;

export function setGlobalQuickActions(actions: QuickAction[]) {
  globalQuickActions = actions;
  if (globalQuickActionsCallback) {
    globalQuickActionsCallback(actions);
  }
}

export function clearGlobalQuickActions() {
  globalQuickActions = null;
  if (globalQuickActionsCallback) {
    globalQuickActionsCallback([]);
  }
}

export function pushCopilotMessage(message: ExternalMessage) {
  if (globalPushMessageCallback) {
    globalPushMessageCallback(message);
  } else {
    pendingMessages.push(message);
  }
}

export function setGlobalSuggestions(suggestions: Suggestion[]) {
  globalSuggestions = suggestions;
  if (globalSuggestionsCallback) {
    globalSuggestionsCallback(suggestions);
  }
}

export function clearGlobalSuggestions() {
  globalSuggestions = null;
  if (globalSuggestionsCallback) {
    globalSuggestionsCallback([]);
  }
}

function AICopilotSidebarInner() {
  const pathname = usePathname();
  const { sidebarState, toggleRightSidebar } = useNavigation();
  const isCollapsed = sidebarState.rightCollapsed;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [suggestions, setSuggestions] = useState<Suggestion[]>(
    () => [
    ...(globalSuggestions ?? []),
    ...(getMockCopilotPageSuggestions(pathname) ?? []),
    ]
  );
  const [quickActions, setQuickActions] = useState<QuickAction[]>(
    () => globalQuickActions ?? getMockCopilotQuickActions(pathname)
  );

  // Function to handle opening with a query from external components
  const openWithQuery = (query: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getMockCopilotContextualResponse(pathname, query),
        timestamp: new Date(),
        confidence: Math.random() * 0.2 + 0.75,
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Register the callback when component mounts
  useEffect(() => {
    setGlobalOpenQueryCallback(openWithQuery);
    return () => {
      setGlobalOpenQueryCallback(() => {});
    };
  }, [pathname]); // Re-register when pathname changes to get updated context

  // Keep Copilot quick actions in sync with global dashboard actions or path defaults
  useEffect(() => {
    const fallback = getMockCopilotQuickActions(pathname);
    setQuickActions(globalQuickActions ?? fallback);
    setShowSuggestions(true); // keep sidebar structure consistent across pages

    globalQuickActionsCallback = (actions: QuickAction[]) => {
      if (actions.length > 0) {
        setQuickActions(actions);
      } else {
        setQuickActions(getMockCopilotQuickActions(pathname));
      }
    };

    return () => {
      globalQuickActionsCallback = null;
    };
  }, [pathname]);

  // Keep Copilot suggestions in sync with global overrides or path defaults
  useEffect(() => {
    const fallback = getMockCopilotPageSuggestions(pathname);
    setSuggestions(globalSuggestions ?? fallback);
    setShowSuggestions(true);

    globalSuggestionsCallback = (s: Suggestion[]) => {
      if (s.length > 0) {
        setSuggestions(s);
      } else {
        setSuggestions(getMockCopilotPageSuggestions(pathname));
      }
    };

    return () => {
      globalSuggestionsCallback = null;
    };
  }, [pathname]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Allow external components to push messages into the copilot chat
  useEffect(() => {
    globalPushMessageCallback = (message: ExternalMessage) => {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          type: message.type || 'ai',
          content: message.content,
          timestamp: new Date(),
          confidence: message.confidence,
        },
      ]);
    };

    // Flush any messages queued before the sidebar mounted
    if (pendingMessages.length > 0) {
      const queued = [...pendingMessages];
      pendingMessages = [];
      queued.forEach(msg => globalPushMessageCallback?.(msg));
    }

    return () => {
      globalPushMessageCallback = null;
    };
  }, []);

  // Welcome message on mount
  useEffect(() => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: `Hi! I'm Vesta, your AI assistant. I'm here to help you navigate VestLedger, analyze data, and automate tasks. What would you like to do today?`,
        timestamp: new Date(),
        confidence: 0.95,
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getMockCopilotContextualResponse(pathname, inputValue),
        timestamp: new Date(),
        confidence: Math.random() * 0.2 + 0.75, // 0.75-0.95
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleQuickAction = (action: QuickAction) => {
    action.onClick?.();

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: action.label,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const actionText = action.action || action.description || `Working on "${action.label}"`;
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I'm working on "${actionText}". This will take a moment...`,
        timestamp: new Date(),
        confidence: action.confidence ?? 0.88,
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: suggestion.text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Great choice! I'm ${suggestion.reasoning.toLowerCase()}. Let me prepare that for you...`,
        timestamp: new Date(),
        confidence: suggestion.confidence,
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  // Return floating bubble when collapsed
  if (isCollapsed) {
    return <AICopilotBubble onClick={toggleRightSidebar} />;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 h-[69px] border-b border-[var(--app-border)] bg-gradient-to-r from-[var(--app-primary-bg)] to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-secondary)] flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-[var(--app-text)]">Vesta AI Copilot</h2>
        </div>
        {/* Minimize button */}
        <button
          onClick={toggleRightSidebar}
          className="p-1.5 rounded-lg hover:bg-[var(--app-surface-hover)]
                     transition-colors"
          aria-label="Minimize AI Copilot"
        >
          <ChevronRight className="w-4 h-4 text-[var(--app-text-muted)]" />
        </button>
      </div>

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <div className="p-4 border-b border-[var(--app-border)] space-y-2">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[var(--app-warning)]" />
              <span className="text-xs font-semibold text-[var(--app-text-muted)]">
                SUGGESTIONS
              </span>
            </div>
            <button
              onClick={() => setShowSuggestions(prev => !prev)}
              className="p-1 rounded-lg hover:bg-[var(--app-surface-hover)] transition-colors"
              aria-label="Toggle suggestions visibility"
            >
              <ChevronDown
                className={`w-4 h-4 text-[var(--app-text-muted)] transition-transform ${showSuggestions ? '' : '-rotate-90'}`}
              />
            </button>
          </div>
          {showSuggestions && suggestions.map(suggestion => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left p-2 rounded-lg bg-[var(--app-surface-hover)] hover:bg-[var(--app-border)] transition-colors"
            >
              <p className="text-sm text-[var(--app-text)] mb-1">{suggestion.text}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--app-text-subtle)]">{suggestion.reasoning}</p>
                <span className={`
                  text-xs font-semibold
                  ${suggestion.confidence >= 0.8 ? 'text-green-500' : suggestion.confidence >= 0.6 ? 'text-yellow-500' : 'text-red-500'}
                `}>
                  {Math.round(suggestion.confidence * 100)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="p-4 border-b border-[var(--app-border)]">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-[var(--app-primary)]" />
          <span className="text-xs font-semibold text-[var(--app-text-muted)]">
            QUICK ACTIONS
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map(action => (
            <Button
              key={action.id}
              size="sm"
              variant="flat"
              onClick={() => handleQuickAction(action)}
              title={action.description || action.action}
              className={`text-xs ${action.aiSuggested ? 'bg-[var(--app-primary-bg)]' : ''}`}
            >
              <action.icon className="w-3 h-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[85%] px-3 py-2 rounded-lg
                ${message.type === 'user'
                  ? 'bg-[var(--app-primary)] text-white'
                  : 'bg-[var(--app-surface-hover)] text-[var(--app-text)]'
                }
              `}
            >
              <p className="text-sm">{message.content}</p>
              {message.type === 'ai' && message.confidence && (
                <p className="text-xs mt-1 opacity-70">
                  Confidence: {Math.round(message.confidence * 100)}%
                </p>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-[var(--app-surface-hover)] px-3 py-2 rounded-lg">
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-[var(--app-text-muted)] rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-[var(--app-text-muted)] rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-[var(--app-text-muted)] rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-8">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            size="sm"
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main export
export function AICopilotSidebar() {
  return <AICopilotSidebarInner />;
}
