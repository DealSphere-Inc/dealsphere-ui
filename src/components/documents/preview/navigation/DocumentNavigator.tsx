'use client';

import { Button } from '@/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DocumentNavigatorProps {
  currentIndex: number;
  totalDocuments: number;
  onPrevious: () => void;
  onNext: () => void;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
}

export function DocumentNavigator({
  currentIndex,
  totalDocuments,
  onPrevious,
  onNext,
  canNavigatePrevious,
  canNavigateNext,
}: DocumentNavigatorProps) {
  if (totalDocuments <= 1) {
    return null;
  }

  return (
    <div className="document-navigator fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-lg px-4 py-2 shadow-lg">
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          onPress={onPrevious}
          isDisabled={!canNavigatePrevious}
          aria-label="Previous document"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <span className="text-sm text-[var(--app-text)] font-medium min-w-[80px] text-center">
          {currentIndex + 1} of {totalDocuments}
        </span>

        <Button
          size="sm"
          variant="flat"
          isIconOnly
          onPress={onNext}
          isDisabled={!canNavigateNext}
          aria-label="Next document"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
