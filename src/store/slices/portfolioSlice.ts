import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortfolioPageMetrics {
  totalCompanies: number;
  atRiskCompanies: number;
  pendingUpdates: number;
}

interface PortfolioState {
  metrics: PortfolioPageMetrics | null;
  healthyCompanies: number;
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  metrics: null,
  healthyCompanies: 0,
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    portfolioMetricsRequested: (state) => {
      state.loading = true;
      state.error = null;
    },
    portfolioMetricsLoaded: (
      state,
      action: PayloadAction<{ metrics: PortfolioPageMetrics; healthyCompanies: number }>
    ) => {
      state.metrics = action.payload.metrics;
      state.healthyCompanies = action.payload.healthyCompanies;
      state.loading = false;
      state.error = null;
    },
    portfolioMetricsFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  portfolioMetricsRequested,
  portfolioMetricsLoaded,
  portfolioMetricsFailed,
} = portfolioSlice.actions;

export const portfolioReducer = portfolioSlice.reducer;
