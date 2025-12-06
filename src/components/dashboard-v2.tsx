'use client'

import { motion } from 'framer-motion';
import { Layers, DollarSign, TrendingUp, Users, BarChart, Target, Clock } from 'lucide-react';
import { AIInsightsBanner } from './dashboard/ai-insights-banner';
import { AlertBar } from './dashboard/alert-bar';
import { QuickActions } from './dashboard/quick-actions';
import { ActiveCapitalCalls } from './dashboard/active-capital-calls';
import { PortfolioHealth } from './dashboard/portfolio-health';
import { AITaskPrioritizer } from './dashboard/ai-task-prioritizer';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { useAIInsights } from '@/hooks/use-ai-insights';
import { useAuth } from '@/contexts/auth-context';
import { useFund } from '@/contexts/fund-context';
import { AnalystDashboard } from '@/components/dashboards/analyst-dashboard';
import { OpsDashboard } from '@/components/dashboards/ops-dashboard';
import { IRDashboard } from '@/components/dashboards/ir-dashboard';
import { ResearcherDashboard } from '@/components/dashboards/researcher-dashboard';
import { LPDashboard } from '@/components/dashboards/lp-dashboard';
import { AuditorDashboard } from '@/components/dashboards/auditor-dashboard';
import { FundSelector } from '@/components/fund-selector';
import { MetricCard } from '@/components/metric-card';
import { Card, Badge, Button } from '@/ui';
import { Fund } from '@/types/fund';

// Animation wrapper for all dashboards
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="max-w-[1600px] mx-auto"
  >
    {children}
  </motion.div>
);

const formatCurrency = (amount: number, showDecimals = false) => {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(showDecimals ? 1 : 0)}B`;
  }
  return `$${(amount / 1_000_000).toFixed(showDecimals ? 1 : 0)}M`;
};

export function DashboardV2() {
  const { user } = useAuth();
  const { selectedFund, viewMode, funds, getFundSummary, setSelectedFund, setViewMode } = useFund();

  // Role-based view switching (non-GP roles get their own dashboards)
  switch (user?.role) {
    case 'analyst':
      return <DashboardWrapper><AnalystDashboard /></DashboardWrapper>;
    case 'ops':
      return <DashboardWrapper><OpsDashboard /></DashboardWrapper>;
    case 'ir':
      return <DashboardWrapper><IRDashboard /></DashboardWrapper>;
    case 'researcher':
      return <DashboardWrapper><ResearcherDashboard /></DashboardWrapper>;
    case 'lp':
      return <DashboardWrapper><LPDashboard /></DashboardWrapper>;
    case 'auditor':
      return <DashboardWrapper><AuditorDashboard /></DashboardWrapper>;
    case 'service_provider':
    case 'strategic_partner':
    default:
      // GP and default fall through to fund-aware dashboard below
      break;
  }

  const {
    capitalCalls,
    portfolioCompanies,
    alerts,
    quickActions,
    tasks,
    metrics,
  } = useDashboardData();

  const insight = useAIInsights(metrics);
  const summary = getFundSummary();

  const handleFundSelect = (fund: Fund | null) => {
    setSelectedFund(fund);
    if (fund) {
      setViewMode('individual');
    }
  };

  const handleConsolidatedView = () => {
    setSelectedFund(null);
    setViewMode('consolidated');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CONSOLIDATED VIEW (No fund selected or consolidated mode)
  // ─────────────────────────────────────────────────────────────────────────────
  if (viewMode === 'consolidated' || !selectedFund) {
    const consolidatedMetrics = [
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto"
      >
        {/* Consolidated Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Layers className="w-7 h-7 text-[var(--app-primary)]" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Consolidated View</h1>
              <p className="text-sm text-[var(--app-text-muted)]">
                Overview across all {summary.totalFunds} funds
              </p>
            </div>
          </div>
          <div className="w-full sm:w-64">
            <FundSelector />
          </div>
        </div>

        {/* Fund Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {funds.map((fund) => (
            <Card
              key={fund.id}
              padding="md"
              className="hover:border-[var(--app-primary)] transition-colors cursor-pointer"
              onClick={() => handleFundSelect(fund)}
            >
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

        {/* AI Insights Banner */}
        <AIInsightsBanner insight={insight} />

        {/* Alert Bar */}
        <AlertBar alerts={alerts} maxVisible={3} />

        {/* Consolidated Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {consolidatedMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ActiveCapitalCalls calls={capitalCalls} />
            <PortfolioHealth companies={portfolioCompanies} />
          </div>
          <div className="space-y-6">
            <AITaskPrioritizer tasks={tasks} onTaskClick={(task) => console.log('Task clicked:', task)} />
          </div>
        </div>

        <div className="h-8" />
      </motion.div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // INDIVIDUAL FUND VIEW (Fund is selected)
  // ─────────────────────────────────────────────────────────────────────────────
  const fundMetrics = [
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto"
    >
      {/* Fund-Specific Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{selectedFund.name}</h1>
          <p className="text-sm text-[var(--app-text-muted)]">
            {selectedFund.description || 'Fund performance and metrics'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
          <Button variant="ghost" size="sm" className="text-[var(--app-primary)]" onPress={handleConsolidatedView}>
            View all funds
          </Button>
          <div className="w-full sm:w-64">
            <FundSelector />
          </div>
        </div>
      </div>

      {/* Fund Performance Summary Card */}
      <Card padding="md" className="bg-gradient-to-br from-[var(--app-primary-bg)] to-[var(--app-surface)] mb-6">
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

      {/* AI Insights Banner */}
      <AIInsightsBanner insight={insight} />

      {/* Alert Bar */}
      <AlertBar alerts={alerts} maxVisible={3} />

      {/* Fund Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {fundMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActiveCapitalCalls calls={capitalCalls} />
          <PortfolioHealth companies={portfolioCompanies} />
        </div>
        <div className="space-y-6">
          <AITaskPrioritizer tasks={tasks} onTaskClick={(task) => console.log('Task clicked:', task)} />
        </div>
      </div>

      <div className="h-8" />
    </motion.div>
  );
}
