'use client'

import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { Card, Badge } from '@/ui';

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

export function MetricCard({ label, value, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <Card className="hover:border-[var(--app-border-subtle)] transition-colors" padding="md">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-[var(--app-primary-bg)] rounded-lg">
            <Icon className="w-5 h-5 text-[var(--app-primary)]" />
          </div>
          <Badge
            size="sm"
            variant="bordered"
            className={`flex items-center gap-1 ${trend === 'up' ? 'text-[var(--app-success)] border-[var(--app-success)]' : 'text-[var(--app-danger)] border-[var(--app-danger)]'}`}
            startContent={trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          >
            {change}
          </Badge>
        </div>
        <div className="text-3xl mb-1">{value}</div>
        <div className="text-sm text-[var(--app-text-muted)]">{label}</div>
    </Card>
  );
}