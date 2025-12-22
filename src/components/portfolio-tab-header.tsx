'use client'

import type { ReactNode } from 'react';

interface PortfolioTabHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PortfolioTabHeader({ title, description, actions }: PortfolioTabHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-[var(--app-text-muted)] mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 sm:gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
