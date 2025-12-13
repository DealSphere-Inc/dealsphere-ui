import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIEffectsState {}

const initialState: UIEffectsState = {};

const uiEffectsSlice = createSlice({
  name: 'uiEffects',
  initialState,
  reducers: {
    eoiSubmitRequested: (state) => {
      void state;
    },
    startupApplicationSubmitRequested: (state) => {
      void state;
    },
    decisionWriterGenerateRequested: (state) => {
      void state;
    },
    decisionWriterCopyRequested: (state) => {
      void state;
    },
    pitchDeckUploadRequested: (state) => {
      void state;
    },
    ddChatSendRequested: (
      state,
      _action: PayloadAction<{ key: string; query: string; dealName?: string }>
    ) => {
      void state;
    },
    reportExportRequested: (state) => {
      void state;
    },
  },
});

export const {
  eoiSubmitRequested,
  startupApplicationSubmitRequested,
  decisionWriterGenerateRequested,
  decisionWriterCopyRequested,
  pitchDeckUploadRequested,
  ddChatSendRequested,
  reportExportRequested,
} = uiEffectsSlice.actions;

export const uiEffectsReducer = uiEffectsSlice.reducer;

