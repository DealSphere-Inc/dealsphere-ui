'use client';

import { TrendingUp, DollarSign, Users, Target, Clock, BarChart, Layers, ChevronDown, Check } from 'lucide-react';
import { MetricCard } from '@/components/metric-card';
import { RecentActivity } from '@/components/recent-activity';
import { PipelineChart } from '@/components/pipeline-chart';
import { PortfolioPerformance } from '@/components/portfolio-performance';
import { useFund } from '@/contexts/fund-context';
import { Card, Badge, Button } from '@/ui';
import { useState } from 'react';
import { Fund } from '@/types/fund';

export function Dashboard() {
  const { selectedFund, viewMode, funds, getFundSummary, setSelectedFund, setViewMode } = useFund();
  const [isFundSelectorOpen, setIsFundSelectorOpen] = useState(false);

  const summary = getFundSummary();

  const formatCurrency = (amount: number, showDecimals = false) => {
    if (amount >= 1_000_000_000) {
      return `$${(amount / 1_000_000_000).toFixed(showDecimals ? 1 : 0)}B`;
    }
    return `$${(amount / 1_000_000).toFixed(showDecimals ? 1 : 0)}M`;
  };

  const getFundStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-[var(--app-success)] border-[var(--app-success)]';
      case 'closed': return 'text-[var(--app-text-muted)] border-[var(--app-border)]';
      case 'fundraising': return 'text-[var(--app-warning)] border-[var(--app-warning)]';
      default: return 'text-[var(--app-text-muted)] border-[var(--app-border)]';
    }
  };

  const handleFundSelect = (fund: Fund | null) => {
    setSelectedFund(fund);
    setIsFundSelectorOpen(false);
    if (fund) {
      setViewMode('individual');
    }
  };

  const handleConsolidatedView = () => {
    setSelectedFund(null);
    setViewMode('consolidated');
    setIsFundSelectorOpen(false);
  };

  // Consolidated view metrics (all funds combined)
  if (viewMode === 'consolidated' || !selectedFund) {
    const metrics = [
      {
        label: 'Total AUM',
        value: formatCurrency(summary.totalCommitment),
        change: '+12%',
        trend: 'up' as const,
        icon: DollarSign,
      },
      {
        label: 'Portfolio Value',
        value: formatCurrency(summary.totalPortfolioValue),
        change: '+8.3%',
        trend: 'up' as const,
        icon: TrendingUp,
      },
      {
        label: 'Portfolio Companies',
        value: summary.totalPortfolioCompanies.toString(),
        change: '+3',
        trend: 'up' as const,
        icon: Users,
      },
      {
        label: 'Avg IRR',
        value: `${summary.averageIRR.toFixed(1)}%`,
        change: '+2.1%',
        trend: 'up' as const,
        icon: BarChart,
      },
    ];

    return (
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-6 h-6 text-[var(--app-primary)]" />
                <h2 className="text-2xl sm:text-3xl">Consolidated View</h2>
              </div>
              <p className="text-sm sm:text-base text-[var(--app-text-muted)]">
                Overview across all {summary.totalFunds} funds
              </p>
            </div>
          </div>

          {/* Fund Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {funds.map((fund) => (
              <Card key={fund.id} padding="md" className="hover:border-[var(--app-border-subtle)] transition-colors cursor-pointer" onClick={() => handleFundSelect(fund)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-medium mb-1">{fund.displayName}</h3>
                    <Badge
                      size="sm"
                      variant="bordered"
                      className={fund.status === 'active' ? 'text-[var(--app-success)] border-[var(--app-success)]' : 'text-[var(--app-text-muted)] border-[var(--app-border)]'}
                    >
                      {fund.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[var(--app-text-muted)]">IRR</div>
                    <div className="text-lg text-[var(--app-success)]">{fund.irr.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--app-text-muted)]">AUM</span>
                    <span>{formatCurrency(fund.totalCommitment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--app-text-muted)]">Portfolio</span>
                    <span>{fund.portfolioCount} companies</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--app-text-muted)]">TVPI</span>
                    <span className="text-[var(--app-success)]">{fund.tvpi.toFixed(2)}x</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-2">
            <PipelineChart />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>

        <div>
          <PortfolioPerformance />
        </div>
      </div>
    );
  }

  // Individual fund view
  const metrics = [
    {
      label: 'Active Deals',
      value: selectedFund.activeDeals.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: Target,
    },
    {
      label: 'Portfolio Value',
      value: formatCurrency(selectedFund.portfolioValue),
      change: '+8.3%',
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      label: 'Deployed Capital',
      value: formatCurrency(selectedFund.deployedCapital),
      change: `${((selectedFund.deployedCapital / selectedFund.totalCommitment) * 100).toFixed(0)}%`,
      trend: 'up' as const,
      icon: Clock,
    },
    {
      label: 'Portfolio Companies',
      value: selectedFund.portfolioCount.toString(),
      change: '+3',
      trend: 'up' as const,
      icon: Users,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Fund-specific header with selector */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl mb-2">{selectedFund.name}</h2>
            <p className="text-sm sm:text-base text-[var(--app-text-muted)]">
              {selectedFund.description || 'Fund performance and metrics'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              size="md"
              variant="bordered"
              className={selectedFund.status === 'active' ? 'text-[var(--app-success)] border-[var(--app-success)]' : 'text-[var(--app-text-muted)] border-[var(--app-border)]'}
            >
              {selectedFund.status}
            </Badge>
            <Badge size="md" variant="flat" className="bg-[var(--app-primary-bg)] text-[var(--app-primary)]">
              Vintage {selectedFund.vintage}
            </Badge>

            {/* Fund Selector Dropdown */}
            <div className="relative">
              <Button
                variant="flat"
                size="md"
                className="bg-[var(--app-surface-hover)] hover:bg-[var(--app-border-subtle)]"
                endContent={<ChevronDown className={`w-4 h-4 transition-transform ${isFundSelectorOpen ? 'rotate-180' : ''}`} />}
                onPress={() => setIsFundSelectorOpen(!isFundSelectorOpen)}
              >
                {selectedFund.displayName}
              </Button>

              {/* Dropdown Menu */}
              {isFundSelectorOpen && (
                <>
                  <div className="absolute right-0 top-full mt-2 w-80 z-50">
                    <Card padding="sm" className="shadow-lg">
                      <div className="space-y-1">
                        {/* Consolidated View Option */}
                        <button
                          className="w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-[var(--app-surface-hover)]"
                          onClick={handleConsolidatedView}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Layers className="w-4 h-4" />
                              <div>
                                <div className="text-sm font-medium">All Funds</div>
                                <div className="text-xs text-[var(--app-text-muted)]">
                                  {summary.totalFunds} funds • {formatCurrency(summary.totalCommitment)} AUM
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>

                        <div className="my-2 border-t border-[var(--app-border)]" />

                        {/* Individual Funds */}
                        {funds.map((fund) => (
                          <button
                            key={fund.id}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedFund.id === fund.id
                                ? 'bg-[var(--app-primary-bg)] text-[var(--app-primary)]'
                                : 'hover:bg-[var(--app-surface-hover)]'
                            }`}
                            onClick={() => handleFundSelect(fund)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium truncate">{fund.displayName}</span>
                                  <Badge
                                    size="sm"
                                    variant="bordered"
                                    className={`${getFundStatusColor(fund.status)} text-xs flex-shrink-0`}
                                  >
                                    {fund.status}
                                  </Badge>
                                </div>
                                <div className="text-xs text-[var(--app-text-muted)]">
                                  {formatCurrency(fund.totalCommitment)} • {fund.portfolioCount} companies
                                </div>
                                <div className="text-xs text-[var(--app-text-subtle)]">
                                  IRR: {fund.irr.toFixed(1)}% • TVPI: {fund.tvpi.toFixed(2)}x
                                </div>
                              </div>
                              {selectedFund.id === fund.id && <Check className="w-4 h-4 flex-shrink-0" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Overlay to close dropdown */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsFundSelectorOpen(false)}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Fund performance summary */}
        <Card padding="md" className="bg-gradient-to-br from-[var(--app-primary-bg)] to-[var(--app-surface)]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-[var(--app-text-muted)] mb-1">Total Commitment</div>
              <div className="text-xl sm:text-2xl font-medium">{formatCurrency(selectedFund.totalCommitment, true)}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--app-text-muted)] mb-1">IRR</div>
              <div className="text-xl sm:text-2xl font-medium text-[var(--app-success)]">{selectedFund.irr.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-xs text-[var(--app-text-muted)] mb-1">TVPI</div>
              <div className="text-xl sm:text-2xl font-medium text-[var(--app-success)]">{selectedFund.tvpi.toFixed(2)}x</div>
            </div>
            <div>
              <div className="text-xs text-[var(--app-text-muted)] mb-1">DPI</div>
              <div className="text-xl sm:text-2xl font-medium">{selectedFund.dpi.toFixed(2)}x</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
        <div className="lg:col-span-2">
          <PipelineChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div>
        <PortfolioPerformance />
      </div>
    </div>
  );
}
