import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  byKey: Record<string, unknown>;
}

const initialState: UIState = {
  byKey: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUIState: (state, action: PayloadAction<{ key: string; value: unknown }>) => {
      state.byKey[action.payload.key] = action.payload.value;
    },
    patchUIState: (
      state,
      action: PayloadAction<{ key: string; patch: Record<string, unknown> }>
    ) => {
      const current = state.byKey[action.payload.key];
      if (current && typeof current === 'object' && !Array.isArray(current)) {
        state.byKey[action.payload.key] = {
          ...(current as Record<string, unknown>),
          ...action.payload.patch,
        };
      } else {
        state.byKey[action.payload.key] = { ...action.payload.patch };
      }
    },
    clearUIState: (state, action: PayloadAction<{ key: string }>) => {
      delete state.byKey[action.payload.key];
    },
  },
});

export const { setUIState, patchUIState, clearUIState } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

