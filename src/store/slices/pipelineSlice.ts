import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PipelineDeal } from '@/services/pipelineService';
import type { Suggestion } from '@/data/mocks/ai/copilot';

interface PipelineState {
  stages: string[];
  deals: PipelineDeal[];
  copilotSuggestions: Suggestion[];
  loading: boolean;
  error: string | null;
}

const initialState: PipelineState = {
  stages: [],
  deals: [],
  copilotSuggestions: [],
  loading: false,
  error: null,
};

const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    pipelineDataRequested: (state) => {
      state.loading = true;
      state.error = null;
    },
    pipelineDataLoaded: (
      state,
      action: PayloadAction<{
        stages: string[];
        deals: PipelineDeal[];
        copilotSuggestions: Suggestion[];
      }>
    ) => {
      state.stages = action.payload.stages;
      state.deals = action.payload.deals;
      state.copilotSuggestions = action.payload.copilotSuggestions;
      state.loading = false;
      state.error = null;
    },
    pipelineDataFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update a deal's stage (for kanban drag-and-drop)
    dealStageUpdated: (
      state,
      action: PayloadAction<{ dealId: number | string; newStage: string }>
    ) => {
      const deal = state.deals.find((d) => d.id === action.payload.dealId);
      if (deal) {
        deal.stage = action.payload.newStage;
      }
    },
  },
});

export const {
  pipelineDataRequested,
  pipelineDataLoaded,
  pipelineDataFailed,
  dealStageUpdated,
} = pipelineSlice.actions;

export const pipelineReducer = pipelineSlice.reducer;
