'use client'

import { ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface AISuggestion {
  label: string;
  href: string;
  reasoning: string;
  confidence: number;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  aiSuggestion?: AISuggestion;
}

export function Breadcrumb({ items, aiSuggestion }: BreadcrumbProps) {
  const [showSuggestion, setShowSuggestion] = useState(false);

  return (
    <div className="mb-6">
      {/* Breadcrumb Trail */}
      <nav className="flex items-center gap-2 text-sm mb-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[var(--app-text-muted)] hover:text-[var(--app-primary)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-[var(--app-text)] font-medium' : 'text-[var(--app-text-muted)]'}>
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight className="w-4 h-4 text-[var(--app-text-subtle)]" />
              )}
            </div>
          );
        })}
      </nav>

      {/* AI Suggestion */}
      {aiSuggestion && (
        <div className="relative">
          <button
            onClick={() => setShowSuggestion(!showSuggestion)}
            onMouseEnter={() => setShowSuggestion(true)}
            onMouseLeave={() => setShowSuggestion(false)}
            className="flex items-center gap-2 text-xs text-[var(--app-primary)] hover:text-[var(--app-primary-hover)] transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>Frequently visited next: {aiSuggestion.label}</span>
          </button>

          {/* Tooltip */}
          <AnimatePresence>
            {showSuggestion && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-2 z-10"
              >
                <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-lg shadow-xl p-3 min-w-[280px]">
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[var(--app-primary)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[var(--app-text)] mb-1">
                        AI Navigation Suggestion
                      </p>
                      <p className="text-xs text-[var(--app-text-muted)] mb-2">
                        {aiSuggestion.reasoning}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-[var(--app-surface-hover)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--app-primary)] rounded-full"
                            style={{ width: `${aiSuggestion.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-[var(--app-primary)]">
                          {Math.round(aiSuggestion.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={aiSuggestion.href}
                    className="block w-full text-center py-2 px-3 rounded bg-[var(--app-primary)]/10 hover:bg-[var(--app-primary)]/20 text-xs font-medium text-[var(--app-primary)] transition-colors"
                  >
                    Go to {aiSuggestion.label}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
