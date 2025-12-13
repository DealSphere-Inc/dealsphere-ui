'use client'

import { useMemo } from 'react';
import { useFund } from '@/contexts/fund-context';
import { getMockDashboardData } from '@/data/mocks/hooks/dashboard-data';

/**
 * Hook to provide mock dashboard data for all widgets
 *
 * In production, this would fetch from real APIs and aggregate data
 * from various microservices. For now, it provides intelligent mock data
 * that demonstrates AI-native features.
 * 
 * Data reacts to the selected fund from FundContext.
 */
export function useDashboardData() {
  const { selectedFund, viewMode } = useFund();
  
  return useMemo(() => {
    return getMockDashboardData(selectedFund, viewMode);
  }, [selectedFund, viewMode]);
}
