'use client'

import { Building2, DollarSign, Calendar } from 'lucide-react';
import { Card, Badge, Progress } from '@/ui';

interface Deal {
  id: number;
  name: string;
  stage: string;
  sector: string;
  amount: string;
  probability: number;
  founder: string;
  lastContact: string;
}

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="hover:border-[var(--app-border-subtle)] transition-all cursor-pointer group" padding="sm">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-accent)] flex items-center justify-center">
            <span className="text-white">{deal.name.charAt(0)}</span>
          </div>
          <Badge size="sm" variant="flat" className="bg-[var(--app-surface-hover)] text-[var(--app-text-muted)]">
            {deal.sector}
          </Badge>
        </div>

        <h4 className="mb-2 group-hover:text-[var(--app-primary)] transition-colors">{deal.name}</h4>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-[var(--app-text-muted)]">
            <DollarSign className="w-4 h-4" />
            <span>{deal.amount}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--app-text-muted)]">
            <Building2 className="w-4 h-4" />
            <span>{deal.founder}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--app-text-muted)]">
            <Calendar className="w-4 h-4" />
            <span>{deal.lastContact}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--app-border)]">
          <div className="flex items-center justify-between text-xs text-[var(--app-text-muted)] mb-2">
            <span>Probability</span>
            <span>{deal.probability}%</span>
          </div>
          <Progress
            value={deal.probability}
            size="sm"
            color="primary"
          />
        </div>
    </Card>
  );
}
