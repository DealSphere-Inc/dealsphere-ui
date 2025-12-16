import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define types for each dashboard's data
export interface LPDashboardData {
  metrics: any;
  documents: any[];
  capitalActivity: any[];
  pendingCalls: any[];
  pendingSignatures: any[];
  commitment: {
    totalCommitment: number;
    calledAmount: number;
  };
}

export interface AnalystDashboardData {
  metrics: any;
  recentDeals: any[];
  urgentTasks: any[];
}

export interface OpsDashboardData {
  metrics: any;
  complianceAlerts: any[];
  upcomingDistributions: any[];
}

export interface AuditorDashboardData {
  metrics: any;
  auditTrail: any[];
  complianceItems: any[];
}

export interface IRDashboardData {
  metrics: any;
  recentInteractions: any[];
  upcomingTasks: any[];
}

export interface ResearcherDashboardData {
  metrics: any;
  recentReports: any[];
  trendingTopics: any[];
}

interface DashboardsState {
  lp: {
    data: LPDashboardData | null;
    loading: boolean;
    error: string | null;
  };
  analyst: {
    data: AnalystDashboardData | null;
    loading: boolean;
    error: string | null;
  };
  ops: {
    data: OpsDashboardData | null;
    loading: boolean;
    error: string | null;
  };
  auditor: {
    data: AuditorDashboardData | null;
    loading: boolean;
    error: string | null;
  };
  ir: {
    data: IRDashboardData | null;
    loading: boolean;
    error: string | null;
  };
  researcher: {
    data: ResearcherDashboardData | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: DashboardsState = {
  lp: { data: null, loading: false, error: null },
  analyst: { data: null, loading: false, error: null },
  ops: { data: null, loading: false, error: null },
  auditor: { data: null, loading: false, error: null },
  ir: { data: null, loading: false, error: null },
  researcher: { data: null, loading: false, error: null },
};

const dashboardsSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    // LP Dashboard
    lpDashboardRequested: (state) => {
      state.lp.loading = true;
      state.lp.error = null;
    },
    lpDashboardLoaded: (state, action: PayloadAction<LPDashboardData>) => {
      state.lp.data = action.payload;
      state.lp.loading = false;
      state.lp.error = null;
    },
    lpDashboardFailed: (state, action: PayloadAction<string>) => {
      state.lp.loading = false;
      state.lp.error = action.payload;
    },

    // Analyst Dashboard
    analystDashboardRequested: (state) => {
      state.analyst.loading = true;
      state.analyst.error = null;
    },
    analystDashboardLoaded: (state, action: PayloadAction<AnalystDashboardData>) => {
      state.analyst.data = action.payload;
      state.analyst.loading = false;
      state.analyst.error = null;
    },
    analystDashboardFailed: (state, action: PayloadAction<string>) => {
      state.analyst.loading = false;
      state.analyst.error = action.payload;
    },

    // Ops Dashboard
    opsDashboardRequested: (state) => {
      state.ops.loading = true;
      state.ops.error = null;
    },
    opsDashboardLoaded: (state, action: PayloadAction<OpsDashboardData>) => {
      state.ops.data = action.payload;
      state.ops.loading = false;
      state.ops.error = null;
    },
    opsDashboardFailed: (state, action: PayloadAction<string>) => {
      state.ops.loading = false;
      state.ops.error = action.payload;
    },

    // Auditor Dashboard
    auditorDashboardRequested: (state) => {
      state.auditor.loading = true;
      state.auditor.error = null;
    },
    auditorDashboardLoaded: (state, action: PayloadAction<AuditorDashboardData>) => {
      state.auditor.data = action.payload;
      state.auditor.loading = false;
      state.auditor.error = null;
    },
    auditorDashboardFailed: (state, action: PayloadAction<string>) => {
      state.auditor.loading = false;
      state.auditor.error = action.payload;
    },

    // IR Dashboard
    irDashboardRequested: (state) => {
      state.ir.loading = true;
      state.ir.error = null;
    },
    irDashboardLoaded: (state, action: PayloadAction<IRDashboardData>) => {
      state.ir.data = action.payload;
      state.ir.loading = false;
      state.ir.error = null;
    },
    irDashboardFailed: (state, action: PayloadAction<string>) => {
      state.ir.loading = false;
      state.ir.error = action.payload;
    },

    // Researcher Dashboard
    researcherDashboardRequested: (state) => {
      state.researcher.loading = true;
      state.researcher.error = null;
    },
    researcherDashboardLoaded: (state, action: PayloadAction<ResearcherDashboardData>) => {
      state.researcher.data = action.payload;
      state.researcher.loading = false;
      state.researcher.error = null;
    },
    researcherDashboardFailed: (state, action: PayloadAction<string>) => {
      state.researcher.loading = false;
      state.researcher.error = action.payload;
    },
  },
});

export const {
  lpDashboardRequested,
  lpDashboardLoaded,
  lpDashboardFailed,
  analystDashboardRequested,
  analystDashboardLoaded,
  analystDashboardFailed,
  opsDashboardRequested,
  opsDashboardLoaded,
  opsDashboardFailed,
  auditorDashboardRequested,
  auditorDashboardLoaded,
  auditorDashboardFailed,
  irDashboardRequested,
  irDashboardLoaded,
  irDashboardFailed,
  researcherDashboardRequested,
  researcherDashboardLoaded,
  researcherDashboardFailed,
} = dashboardsSlice.actions;

export const dashboardsReducer = dashboardsSlice.reducer;
