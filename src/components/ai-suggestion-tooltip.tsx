'use client'

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { Button } from '@/ui';

interface AISuggestionTooltipProps {
  children: ReactNode;
  suggestion: string;
  reasoning: string;
  confidence: number;
  onAccept?: () => void;
  onReject?: () => void;
  onFeedback?: (helpful: boolean) => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function AISuggestionTooltip({
  children,
  suggestion,
  reasoning,
  confidence,
  onAccept,
  onReject,
  onFeedback,
  position = 'top',
}: AISuggestionTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasProvidedFeedback, setHasProvidedFeedback] = useState(false);

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'text-green-500';
    if (conf >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceBgColor = (conf: number) => {
    if (conf >= 0.8) return 'bg-green-500/10 border-green-500/20';
    if (conf >= 0.6) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };

  const handleAccept = () => {
    onAccept?.();
    setIsVisible(false);
  };

  const handleReject = () => {
    onReject?.();
    setIsVisible(false);
  };

  const handleFeedback = (helpful: boolean) => {
    onFeedback?.(helpful);
    setHasProvidedFeedback(true);
    setTimeout(() => {
      setIsVisible(false);
      setHasProvidedFeedback(false);
    }, 1500);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`
              absolute z-50 ${positionClasses[position]}
              w-80 p-4 rounded-lg shadow-xl
              bg-[var(--app-surface)] border border-[var(--app-border)]
              backdrop-blur-sm
            `}
            style={{
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)',
            }}
          >
            {/* Arrow */}
            <div
              className={`
                absolute w-0 h-0 ${arrowClasses[position]}
                border-8 border-[var(--app-surface)]
              `}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--app-primary)]" />
                <span className="text-xs font-semibold text-[var(--app-text)]">
                  AI Suggestion
                </span>
              </div>
              <div className={`
                flex items-center gap-1 px-2 py-0.5 rounded-full border
                ${getConfidenceBgColor(confidence)}
              `}>
                <span className={`text-xs font-bold ${getConfidenceColor(confidence)}`}>
                  {Math.round(confidence * 100)}%
                </span>
              </div>
            </div>

            {/* Suggestion */}
            <p className="text-sm text-[var(--app-text)] mb-2 leading-relaxed">
              {suggestion}
            </p>

            {/* Reasoning */}
            <div className="flex items-start gap-2 mb-3 p-2 rounded bg-[var(--app-surface-hover)]">
              <Info className="w-3 h-3 text-[var(--app-text-muted)] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[var(--app-text-muted)]">
                {reasoning}
              </p>
            </div>

            {/* Actions */}
            {!hasProvidedFeedback ? (
              <div className="flex gap-2">
                {onAccept && (
                  <Button
                    size="sm"
                    onClick={handleAccept}
                    className="flex-1 text-xs"
                  >
                    Accept
                  </Button>
                )}
                {onReject && (
                  <Button
                    size="sm"
                    variant="bordered"
                    onClick={handleReject}
                    className="flex-1 text-xs"
                  >
                    Dismiss
                  </Button>
                )}
                {onFeedback && !onAccept && !onReject && (
                  <>
                    <Button
                      size="sm"
                      variant="flat"
                      onClick={() => handleFeedback(true)}
                      className="flex-1 text-xs"
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Helpful
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      onClick={() => handleFeedback(false)}
                      className="flex-1 text-xs"
                    >
                      <ThumbsDown className="w-3 h-3 mr-1" />
                      Not Helpful
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 p-2 rounded bg-green-500/10"
              >
                <ThumbsUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-500 font-medium">
                  Thanks for your feedback!
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
