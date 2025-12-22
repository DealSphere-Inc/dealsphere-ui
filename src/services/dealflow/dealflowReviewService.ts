import { isMockMode } from '@/config/data-mode';
import { mockDeals, type Deal } from '@/data/mocks/dealflow/dealflow-review';
import { getMockDealflowReviewSlides } from '@/data/mocks/dealflow/dealflow-review-slides';
import type { GetDealflowDealsParams } from '@/store/slices/dealflowSlice';

export type { Deal };

export type DealflowReviewSlideType =
  | 'overview'
  | 'team'
  | 'market'
  | 'product'
  | 'financials'
  | 'competition'
  | 'ask';

export interface DealflowOverviewContent {
  companyName: string;
  oneLiner: string;
  founder: string;
  location: string;
  sector: string;
  stage: string;
}

export interface DealflowMarketContent {
  tam: string;
  sam: string;
  som: string;
  growth: string;
  competitors: string[];
}

export interface DealflowProductContent {
  description: string;
  differentiators: string[];
  techStack: string[];
}

export interface DealflowFinancialsContent {
  arr: number;
  growth: number;
  burn: number;
  runway: number;
  ltv: number;
  cac: number;
  grossMargin: number;
}

export interface DealflowTeamMember {
  name: string;
  role: string;
  background: string;
}

export interface DealflowTeamContent {
  founder: string;
  team: DealflowTeamMember[];
  advisors: string[];
}

export interface DealflowAskContent {
  amount: number;
  valuation: number;
  useOfFunds: Array<{
    category: string;
    percentage: number;
  }>;
}

export interface DealflowCompetitionContent {
  competitors: string[];
  differentiation: string;
}

export type DealflowReviewSlide =
  | { id: string; type: 'overview'; title: string; content: DealflowOverviewContent }
  | { id: string; type: 'market'; title: string; content: DealflowMarketContent }
  | { id: string; type: 'product'; title: string; content: DealflowProductContent }
  | { id: string; type: 'financials'; title: string; content: DealflowFinancialsContent }
  | { id: string; type: 'team'; title: string; content: DealflowTeamContent }
  | { id: string; type: 'ask'; title: string; content: DealflowAskContent }
  | { id: string; type: 'competition'; title: string; content: DealflowCompetitionContent };

export function getDealflowDeals(_params?: GetDealflowDealsParams): Deal[] {
  if (isMockMode()) return mockDeals;
  throw new Error('Dealflow review API not implemented yet');
}

export function getDealflowReviewSlides(deal: Deal): DealflowReviewSlide[] {
  if (!isMockMode()) {
    throw new Error('Dealflow review slides API not implemented yet');
  }

  return getMockDealflowReviewSlides(deal);
}
