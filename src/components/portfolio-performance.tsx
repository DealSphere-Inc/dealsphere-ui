'use client'

import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card, Badge } from '@/ui';

const companies = [
  { name: 'Quantum AI', sector: 'AI/ML', invested: '$2.5M', valuation: '$45M', multiple: '4.2x', status: 'Series B' },
  { name: 'BioTech Labs', sector: 'Healthcare', invested: '$1.8M', valuation: '$28M', multiple: '3.1x', status: 'Series A' },
  { name: 'CloudScale', sector: 'SaaS', invested: '$3.2M', valuation: '$52M', multiple: '3.8x', status: 'Series B' },
  { name: 'FinFlow', sector: 'FinTech', invested: '$2.0M', valuation: '$38M', multiple: '4.5x', status: 'Series A' },
  { name: 'DataStream', sector: 'Analytics', invested: '$1.5M', valuation: '$22M', multiple: '2.9x', status: 'Seed' },
];

export function PortfolioPerformance() {
  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg">Top Portfolio Performers</h3>
        <button className="text-xs sm:text-sm text-[var(--app-primary)] hover:text-[var(--app-primary-hover)] transition-colors flex items-center gap-1">
          View All
          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--app-border)]">
                <th className="text-left text-xs sm:text-sm text-[var(--app-text-muted)] pb-3 px-4 sm:px-0">Company</th>
                <th className="text-left text-xs sm:text-sm text-[var(--app-text-muted)] pb-3 px-2 sm:px-0 hidden sm:table-cell">Sector</th>
                <th className="text-right text-xs sm:text-sm text-[var(--app-text-muted)] pb-3 px-2 sm:px-0 hidden md:table-cell">Invested</th>
                <th className="text-right text-xs sm:text-sm text-[var(--app-text-muted)] pb-3 px-2 sm:px-0">Valuation</th>
                <th className="text-right text-xs sm:text-sm text-[var(--app-text-muted)] pb-3 px-2 sm:px-0">Multiple</th>
                <th className="text-left text-xs sm:text-sm text-[var(--app-text-muted)] pb-3 px-4 sm:px-0 hidden lg:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index} className="border-b border-[var(--app-border-subtle)] hover:bg-[var(--app-surface-hover)] transition-colors">
                  <td className="py-3 sm:py-4 px-4 sm:px-0">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-accent)] flex items-center justify-center text-xs flex-shrink-0">
                        {company.name.charAt(0)}
                      </div>
                      <span className="text-sm sm:text-base">{company.name}</span>
                    </div>
                  </td>
                  <td className="text-xs sm:text-sm text-[var(--app-text-muted)] px-2 sm:px-0 hidden sm:table-cell">{company.sector}</td>
                  <td className="text-right text-sm sm:text-base px-2 sm:px-0 hidden md:table-cell">{company.invested}</td>
                  <td className="text-right text-sm sm:text-base px-2 sm:px-0">{company.valuation}</td>
                  <td className="text-right px-2 sm:px-0">
                    <span className="text-[var(--app-success)] flex items-center justify-end gap-1 text-sm sm:text-base">
                      <TrendingUp className="w-3 h-3" />
                      {company.multiple}
                    </span>
                  </td>
                  <td className="px-4 sm:px-0 hidden lg:table-cell">
                    <Badge size="sm" variant="flat" className="bg-[var(--app-primary-bg)] text-[var(--app-primary)]">
                      {company.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}