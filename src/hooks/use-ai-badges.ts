'use client'

import { useEffect, useState } from 'react';

interface NavigationBadge {
  count: number;
  variant: 'danger' | 'warning' | 'info';
  tooltip?: string;
}

interface BadgeData {
  [itemId: string]: NavigationBadge | null;
}

// Mock data sources (in production, these would come from real APIs)
interface CapitalCall {
  id: string;
  fundName: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'overdue' | 'collected';
  lpId: string;
}

interface ComplianceTask {
  id: string;
  title: string;
  deadline: Date;
  complexity: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
}

interface PortfolioCompany {
  id: string;
  name: string;
  runway: number; // months
  burnRate: number;
  health: number; // 0-100
  lastUpdate: Date;
}

// Mock data generators
const getMockCapitalCalls = (): CapitalCall[] => {
  const today = new Date();
  return [
    {
      id: '1',
      fundName: 'Fund II',
      amount: 500000,
      dueDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      status: 'overdue',
      lpId: 'lp1',
    },
    {
      id: '2',
      fundName: 'Fund II',
      amount: 250000,
      dueDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: 'overdue',
      lpId: 'lp2',
    },
    {
      id: '3',
      fundName: 'Fund III',
      amount: 750000,
      dueDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'overdue',
      lpId: 'lp3',
    },
    {
      id: '4',
      fundName: 'Fund III',
      amount: 300000,
      dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      status: 'pending',
      lpId: 'lp4',
    },
  ];
};

const getMockComplianceTasks = (): ComplianceTask[] => {
  const today = new Date();
  return [
    {
      id: '1',
      title: 'Annual Fund Audit',
      deadline: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      complexity: 'medium',
      status: 'in_progress',
    },
    {
      id: '2',
      title: 'SEC Form D Filing',
      deadline: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      complexity: 'high',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Quarterly Investor Report',
      deadline: new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      complexity: 'low',
      status: 'pending',
    },
  ];
};

const getMockPortfolioCompanies = (): PortfolioCompany[] => {
  return [
    {
      id: '1',
      name: 'CloudScale',
      runway: 8, // months
      burnRate: 150000,
      health: 78,
      lastUpdate: new Date(),
    },
    {
      id: '2',
      name: 'BioTech Inc',
      runway: 6, // months
      burnRate: 200000,
      health: 65,
      lastUpdate: new Date(),
    },
    {
      id: '3',
      name: 'FinServe',
      runway: 18, // months
      burnRate: 100000,
      health: 92,
      lastUpdate: new Date(),
    },
    {
      id: '4',
      name: 'EduTech',
      runway: 24, // months
      burnRate: 75000,
      health: 88,
      lastUpdate: new Date(),
    },
  ];
};

// AI Logic: Calculate badge for Fund Admin
const calculateFundAdminBadge = (capitalCalls: CapitalCall[]): NavigationBadge | null => {
  const overdueCalls = capitalCalls.filter(call => call.status === 'overdue');

  if (overdueCalls.length === 0) return null;

  const totalOverdueAmount = overdueCalls.reduce((sum, call) => sum + call.amount, 0);
  const avgDaysOverdue = overdueCalls.reduce((sum, call) => {
    const daysOverdue = Math.floor((Date.now() - call.dueDate.getTime()) / (24 * 60 * 60 * 1000));
    return sum + daysOverdue;
  }, 0) / overdueCalls.length;

  return {
    count: overdueCalls.length,
    variant: avgDaysOverdue > 7 ? 'danger' : 'warning',
    tooltip: `${overdueCalls.length} overdue capital call${overdueCalls.length > 1 ? 's' : ''} ($${(totalOverdueAmount / 1000000).toFixed(1)}M) - AI detected urgent action needed`,
  };
};

// AI Logic: Calculate badge for Compliance
const calculateComplianceBadge = (tasks: ComplianceTask[]): NavigationBadge | null => {
  const today = new Date();
  const upcomingTasks = tasks.filter(task => {
    const daysUntilDeadline = (task.deadline.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);
    return daysUntilDeadline <= 7 && daysUntilDeadline > 0 && task.status !== 'completed';
  });

  if (upcomingTasks.length === 0) return null;

  const highComplexityCount = upcomingTasks.filter(t => t.complexity === 'high').length;
  const nearestDeadline = Math.min(...upcomingTasks.map(t => t.deadline.getTime()));
  const daysUntil = Math.ceil((nearestDeadline - today.getTime()) / (24 * 60 * 60 * 1000));

  return {
    count: upcomingTasks.length,
    variant: daysUntil <= 3 || highComplexityCount > 0 ? 'danger' : 'warning',
    tooltip: `${upcomingTasks.length} compliance deadline${upcomingTasks.length > 1 ? 's' : ''} in ${daysUntil} day${daysUntil > 1 ? 's' : ''} - AI complexity: ${upcomingTasks[0].complexity.charAt(0).toUpperCase() + upcomingTasks[0].complexity.slice(1)}`,
  };
};

// AI Logic: Calculate badge for Portfolio
const calculatePortfolioBadge = (companies: PortfolioCompany[]): NavigationBadge | null => {
  const atRiskCompanies = companies.filter(company => company.runway < 12);

  if (atRiskCompanies.length === 0) return null;

  const criticalCompanies = atRiskCompanies.filter(c => c.runway < 6);

  return {
    count: atRiskCompanies.length,
    variant: criticalCompanies.length > 0 ? 'danger' : 'warning',
    tooltip: `${atRiskCompanies.length} compan${atRiskCompanies.length > 1 ? 'ies' : 'y'} with runway < 12 months - AI predicted risk`,
  };
};

// AI Logic: Calculate badge for LP Management
const calculateLPManagementBadge = (capitalCalls: CapitalCall[]): NavigationBadge | null => {
  const overdueByLP = capitalCalls
    .filter(call => call.status === 'overdue')
    .reduce((acc, call) => {
      acc[call.lpId] = (acc[call.lpId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const problemLPs = Object.keys(overdueByLP).length;

  if (problemLPs === 0) return null;

  return {
    count: problemLPs,
    variant: problemLPs > 2 ? 'danger' : 'warning',
    tooltip: `${problemLPs} LP${problemLPs > 1 ? 's' : ''} with overdue capital calls - AI suggests follow-up`,
  };
};

// AI Logic: Calculate badge for 409A Valuations
const calculate409ABadge = (): NavigationBadge | null => {
  const today = new Date();
  const lastValuation = new Date(today.getTime() - 11 * 30 * 24 * 60 * 60 * 1000); // 11 months ago
  const monthsSinceValuation = (today.getTime() - lastValuation.getTime()) / (30 * 24 * 60 * 60 * 1000);

  if (monthsSinceValuation < 10) return null;

  return {
    count: 1,
    variant: monthsSinceValuation >= 12 ? 'danger' : 'warning',
    tooltip: '409A valuation due for renewal - AI detected based on 12-month cycle',
  };
};

// AI Logic: Calculate badge for Analytics
const calculateAnalyticsBadge = (companies: PortfolioCompany[]): NavigationBadge | null => {
  const anomalies = companies.filter(company => {
    // Detect health score drops
    const predictedHealth = company.health; // In real system, would compare to previous
    return predictedHealth < 70;
  });

  if (anomalies.length === 0) return null;

  return {
    count: anomalies.length,
    variant: 'info',
    tooltip: `${anomalies.length} anomal${anomalies.length > 1 ? 'ies' : 'y'} detected in portfolio metrics - AI analysis available`,
  };
};

/**
 * Hook to calculate intelligent AI-powered navigation badges
 *
 * This hook analyzes various data sources and applies AI logic to:
 * - Detect urgent items (overdue capital calls, at-risk companies)
 * - Prioritize by urgency × impact
 * - Provide contextual tooltips with reasoning
 *
 * In production, this would connect to real APIs and ML models.
 * For now, it uses mock data to demonstrate AI behavior.
 */
export function useAIBadges(): BadgeData {
  const [badges, setBadges] = useState<BadgeData>({});

  useEffect(() => {
    // Fetch mock data (in production, these would be API calls)
    const capitalCalls = getMockCapitalCalls();
    const complianceTasks = getMockComplianceTasks();
    const portfolioCompanies = getMockPortfolioCompanies();

    // Calculate badges using AI logic
    const calculatedBadges: BadgeData = {
      'fund-admin': calculateFundAdminBadge(capitalCalls),
      'compliance': calculateComplianceBadge(complianceTasks),
      'portfolio': calculatePortfolioBadge(portfolioCompanies),
      'lp-management': calculateLPManagementBadge(capitalCalls),
      '409a-valuations': calculate409ABadge(),
      'analytics': calculateAnalyticsBadge(portfolioCompanies),
    };

    setBadges(calculatedBadges);

    // In production, would set up real-time subscriptions
    // For now, update every 60 seconds to simulate real-time data
    const interval = setInterval(() => {
      const updatedCapitalCalls = getMockCapitalCalls();
      const updatedComplianceTasks = getMockComplianceTasks();
      const updatedPortfolioCompanies = getMockPortfolioCompanies();

      const updatedBadges: BadgeData = {
        'fund-admin': calculateFundAdminBadge(updatedCapitalCalls),
        'compliance': calculateComplianceBadge(updatedComplianceTasks),
        'portfolio': calculatePortfolioBadge(updatedPortfolioCompanies),
        'lp-management': calculateLPManagementBadge(updatedCapitalCalls),
        '409a-valuations': calculate409ABadge(),
        'analytics': calculateAnalyticsBadge(updatedPortfolioCompanies),
      };

      setBadges(updatedBadges);
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return badges;
}
