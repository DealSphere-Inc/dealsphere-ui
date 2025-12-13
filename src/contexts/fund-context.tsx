'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { Fund, FundContextType, FundViewMode, FundSummary } from '@/types/fund';
import { mockFunds } from '@/data/mocks/funds';

const FundContext = createContext<FundContextType | undefined>(undefined);

export function FundProvider({ children }: { children: ReactNode }) {
  const [funds] = useState<Fund[]>(mockFunds);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(mockFunds[1]); // Default to Fund II (most active)
  const [viewMode, setViewMode] = useState<FundViewMode>('individual');

  const getActiveFunds = useCallback(() => {
    return funds.filter(fund => fund.status === 'active');
  }, [funds]);

  const getFundById = useCallback((id: string) => {
    return funds.find(fund => fund.id === id);
  }, [funds]);

  const getFundSummary = useCallback((): FundSummary => {
    const activeFundsCount = funds.filter(f => f.status === 'active').length;
    const closedFundsCount = funds.filter(f => f.status === 'closed').length;

    return {
      totalFunds: funds.length,
      totalCommitment: funds.reduce((sum, f) => sum + f.totalCommitment, 0),
      totalDeployed: funds.reduce((sum, f) => sum + f.deployedCapital, 0),
      totalPortfolioValue: funds.reduce((sum, f) => sum + f.portfolioValue, 0),
      totalPortfolioCompanies: funds.reduce((sum, f) => sum + f.portfolioCount, 0),
      averageIRR: funds.reduce((sum, f) => sum + f.irr, 0) / funds.length,
      activeFunds: activeFundsCount,
      closedFunds: closedFundsCount,
    };
  }, [funds]);

  const value = useMemo(() => ({
    funds,
    selectedFund,
    viewMode,
    setSelectedFund,
    setViewMode,
    getActiveFunds,
    getFundById,
    getFundSummary,
  }), [funds, selectedFund, viewMode, getActiveFunds, getFundById, getFundSummary]);

  return <FundContext.Provider value={value}>{children}</FundContext.Provider>;
}

export function useFund() {
  const context = useContext(FundContext);
  if (context === undefined) {
    throw new Error('useFund must be used within a FundProvider');
  }
  return context;
}
