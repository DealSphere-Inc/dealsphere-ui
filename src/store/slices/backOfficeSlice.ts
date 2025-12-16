import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Back-office data interfaces
export interface ComplianceData {
  complianceItems: any[];
  regulatoryFilings: any[];
  auditSchedule: any[];
}

export interface FundAdminData {
  capitalCalls: any[];
  distributions: any[];
  lpResponses: any[];
}

export interface TaxCenterData {
  filingDeadline: Date | null;
  taxDocuments: any[];
  taxSummaries: any[];
  portfolioTax: any[];
}

export interface Valuation409aData {
  valuations: any[];
  strikePrices: any[];
  history: any[];
}

interface BackOfficeState {
  // Compliance
  compliance: {
    data: ComplianceData | null;
    loading: boolean;
    error: string | null;
  };

  // Fund Admin
  fundAdmin: {
    data: FundAdminData | null;
    loading: boolean;
    error: string | null;
  };

  // Tax Center
  taxCenter: {
    data: TaxCenterData | null;
    loading: boolean;
    error: string | null;
  };

  // 409A Valuations
  valuation409a: {
    data: Valuation409aData | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: BackOfficeState = {
  compliance: { data: null, loading: false, error: null },
  fundAdmin: { data: null, loading: false, error: null },
  taxCenter: { data: null, loading: false, error: null },
  valuation409a: { data: null, loading: false, error: null },
};

const backOfficeSlice = createSlice({
  name: 'backOffice',
  initialState,
  reducers: {
    // Compliance
    complianceRequested: (state) => {
      state.compliance.loading = true;
      state.compliance.error = null;
    },
    complianceLoaded: (state, action: PayloadAction<ComplianceData>) => {
      state.compliance.data = action.payload;
      state.compliance.loading = false;
      state.compliance.error = null;
    },
    complianceFailed: (state, action: PayloadAction<string>) => {
      state.compliance.loading = false;
      state.compliance.error = action.payload;
    },

    // Fund Admin
    fundAdminRequested: (state) => {
      state.fundAdmin.loading = true;
      state.fundAdmin.error = null;
    },
    fundAdminLoaded: (state, action: PayloadAction<FundAdminData>) => {
      state.fundAdmin.data = action.payload;
      state.fundAdmin.loading = false;
      state.fundAdmin.error = null;
    },
    fundAdminFailed: (state, action: PayloadAction<string>) => {
      state.fundAdmin.loading = false;
      state.fundAdmin.error = action.payload;
    },

    // Tax Center
    taxCenterRequested: (state) => {
      state.taxCenter.loading = true;
      state.taxCenter.error = null;
    },
    taxCenterLoaded: (state, action: PayloadAction<TaxCenterData>) => {
      state.taxCenter.data = action.payload;
      state.taxCenter.loading = false;
      state.taxCenter.error = null;
    },
    taxCenterFailed: (state, action: PayloadAction<string>) => {
      state.taxCenter.loading = false;
      state.taxCenter.error = action.payload;
    },

    // 409A Valuations
    valuation409aRequested: (state) => {
      state.valuation409a.loading = true;
      state.valuation409a.error = null;
    },
    valuation409aLoaded: (state, action: PayloadAction<Valuation409aData>) => {
      state.valuation409a.data = action.payload;
      state.valuation409a.loading = false;
      state.valuation409a.error = null;
    },
    valuation409aFailed: (state, action: PayloadAction<string>) => {
      state.valuation409a.loading = false;
      state.valuation409a.error = action.payload;
    },
  },
});

export const {
  complianceRequested,
  complianceLoaded,
  complianceFailed,
  fundAdminRequested,
  fundAdminLoaded,
  fundAdminFailed,
  taxCenterRequested,
  taxCenterLoaded,
  taxCenterFailed,
  valuation409aRequested,
  valuation409aLoaded,
  valuation409aFailed,
} = backOfficeSlice.actions;

export const backOfficeReducer = backOfficeSlice.reducer;
