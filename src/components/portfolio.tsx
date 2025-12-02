'use client'

import { useState } from 'react';
import { Plus, Filter, Search, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Button, Card, Badge, Input } from '@/ui';

const portfolioCompanies = [
  {
    id: 1,
    name: 'Quantum AI',
    sector: 'AI/ML',
    invested: '$2.5M',
    currentValuation: '$45M',
    multiple: 4.2,
    irr: 145,
    status: 'Series B',
    founder: 'Sarah Chen',
    investmentDate: 'Jan 2022',
    trend: 'up' as const,
    lastUpdate: '2 days ago',
    notes: 'Strong revenue growth, expanding to Europe',
  },
  {
    id: 2,
    name: 'BioTech Labs',
    sector: 'Healthcare',
    invested: '$1.8M',
    currentValuation: '$28M',
    multiple: 3.1,
    irr: 92,
    status: 'Series A',
    founder: 'Dr. James Wilson',
    investmentDate: 'Mar 2022',
    trend: 'up' as const,
    lastUpdate: '5 days ago',
    notes: 'FDA approval pending for key product',
  },
  {
    id: 3,
    name: 'CloudScale',
    sector: 'SaaS',
    invested: '$3.2M',
    currentValuation: '$52M',
    multiple: 3.8,
    irr: 128,
    status: 'Series B',
    founder: 'Maria Rodriguez',
    investmentDate: 'Jun 2021',
    trend: 'up' as const,
    lastUpdate: '1 week ago',
    notes: 'Enterprise clients growing rapidly',
  },
  {
    id: 4,
    name: 'FinFlow',
    sector: 'FinTech',
    invested: '$2.0M',
    currentValuation: '$38M',
    multiple: 4.5,
    irr: 156,
    status: 'Series A',
    founder: 'Alex Kumar',
    investmentDate: 'Aug 2022',
    trend: 'up' as const,
    lastUpdate: '3 days ago',
    notes: 'Banking partnerships secured',
  },
  {
    id: 5,
    name: 'DataStream',
    sector: 'Analytics',
    invested: '$1.5M',
    currentValuation: '$22M',
    multiple: 2.9,
    irr: 78,
    status: 'Seed',
    founder: 'Emma Thompson',
    investmentDate: 'Nov 2022',
    trend: 'up' as const,
    lastUpdate: '1 day ago',
    notes: 'Product-market fit achieved',
  },
  {
    id: 6,
    name: 'EcoEnergy',
    sector: 'CleanTech',
    invested: '$4.0M',
    currentValuation: '$58M',
    multiple: 3.6,
    irr: 118,
    status: 'Series B',
    founder: 'John Park',
    investmentDate: 'Feb 2021',
    trend: 'up' as const,
    lastUpdate: '1 week ago',
    notes: 'Government contracts awarded',
  },
];

export function Portfolio() {
  const [selectedCompany, setSelectedCompany] = useState(portfolioCompanies[0]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl mb-2">Portfolio</h2>
          <p className="text-sm sm:text-base text-[var(--app-text-muted)]">Monitor and manage your portfolio companies</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="bordered" className="text-[var(--app-text-muted)]" startContent={<Filter className="w-4 h-4" />}>
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button color="primary" startContent={<Plus className="w-4 h-4" />}>
            <span className="hidden sm:inline">Add Company</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card padding="md">
            <div className="text-sm text-[var(--app-text-muted)] mb-2">Total Invested</div>
            <div className="text-3xl mb-2">$15.0M</div>
            <Badge size="sm" variant="bordered" className="text-[var(--app-success)] border-[var(--app-success)]" startContent={<TrendingUp className="w-3 h-3" />}>
              +12.4% this quarter
            </Badge>
        </Card>
        <Card padding="md">
            <div className="text-sm text-[var(--app-text-muted)] mb-2">Portfolio Value</div>
            <div className="text-3xl mb-2">$243M</div>
            <Badge size="sm" variant="bordered" className="text-[var(--app-success)] border-[var(--app-success)]" startContent={<TrendingUp className="w-3 h-3" />}>
              +8.3% this quarter
            </Badge>
        </Card>
        <Card padding="md">
            <div className="text-sm text-[var(--app-text-muted)] mb-2">Average Multiple</div>
            <div className="text-3xl mb-2">3.7x</div>
            <Badge size="sm" variant="bordered" className="text-[var(--app-success)] border-[var(--app-success)]" startContent={<TrendingUp className="w-3 h-3" />}>
              Above industry avg
            </Badge>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2" padding="md">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <Input
              type="text"
              placeholder="Search companies..."
              startContent={<Search className="w-4 h-4 text-[var(--app-text-subtle)]" />}
              size="sm"
            />
          </div>

            <div className="space-y-3">
              {portfolioCompanies.map((company) => (
                <Card
                  key={company.id}
                  isPressable
                  onPress={() => setSelectedCompany(company)}
                  padding="sm"
                  className={`cursor-pointer transition-all ${
                    selectedCompany.id === company.id
                      ? 'bg-[var(--app-surface-hover)] border-[var(--app-primary)]'
                      : 'border-[var(--app-border)] hover:border-[var(--app-border-subtle)] hover:bg-[var(--app-surface-hover)]'
                  }`}
                >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-accent)] flex items-center justify-center flex-shrink-0">
                          <span className="text-sm sm:text-base text-white">{company.name.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="mb-1 text-sm sm:text-base truncate">{company.name}</div>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[var(--app-text-muted)]">
                            <span>{company.sector}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{company.founder}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[var(--app-success)] flex items-center justify-end gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-sm sm:text-base">{company.multiple}x</span>
                        </div>
                        <div className="text-xs sm:text-sm text-[var(--app-text-muted)]">{company.currentValuation}</div>
                      </div>
                    </div>
                </Card>
              ))}
            </div>
        </Card>

        <Card padding="md">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2">{selectedCompany.name}</h3>
                <Badge size="sm" variant="flat" className="bg-[var(--app-primary-bg)] text-[var(--app-primary)]">
                  {selectedCompany.status}
                </Badge>
              </div>
              <Button isIconOnly variant="light" size="sm">
                <ArrowUpRight className="w-5 h-5 text-[var(--app-text-muted)]" />
              </Button>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div>
                <div className="text-xs sm:text-sm text-[var(--app-text-muted)] mb-1">Invested</div>
                <div className="text-lg sm:text-xl">{selectedCompany.invested}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-[var(--app-text-muted)] mb-1">Current Valuation</div>
                <div className="text-lg sm:text-xl">{selectedCompany.currentValuation}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <div className="text-xs sm:text-sm text-[var(--app-text-muted)] mb-1">Multiple</div>
                  <div className="text-lg sm:text-xl text-[var(--app-success)]">{selectedCompany.multiple}x</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-[var(--app-text-muted)] mb-1">IRR</div>
                  <div className="text-lg sm:text-xl text-[var(--app-success)]">{selectedCompany.irr}%</div>
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-[var(--app-text-muted)] mb-1">Investment Date</div>
                <div className="text-sm sm:text-base">{selectedCompany.investmentDate}</div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-[var(--app-border)]">
              <div className="text-xs sm:text-sm text-[var(--app-text-muted)] mb-2">Recent Notes</div>
              <div className="text-xs sm:text-sm bg-[var(--app-surface-hover)] rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                {selectedCompany.notes}
              </div>
              <div className="text-xs text-[var(--app-text-subtle)]">Updated {selectedCompany.lastUpdate}</div>
            </div>

            <Button color="primary" className="w-full mt-4 sm:mt-6">
              View Full Report
            </Button>
        </Card>
      </div>
    </div>
  );
}
