import { combineReducers } from '@reduxjs/toolkit';
import { alertsReducer } from './slices/alertsSlice';
import { authReducer } from './slices/authSlice';
import { fundReducer } from './slices/fundSlice';
import { navigationReducer } from './slices/navigationSlice';
import { copilotReducer } from './slices/copilotSlice';
import { uiReducer } from './slices/uiSlice';
import { uiEffectsReducer } from './slices/uiEffectsSlice';
import { documentsReducer } from './slices/documentsSlice';
import { portfolioReducer } from './slices/portfolioSlice';
import { pipelineReducer } from './slices/pipelineSlice';
import { dashboardsReducer } from './slices/dashboardsSlice';
import { dealflowReducer } from './slices/dealflowSlice';
import { backOfficeReducer } from './slices/backOfficeSlice';

export const rootReducer = combineReducers({
  alerts: alertsReducer,
  auth: authReducer,
  fund: fundReducer,
  navigation: navigationReducer,
  copilot: copilotReducer,
  ui: uiReducer,
  uiEffects: uiEffectsReducer,
  documents: documentsReducer,
  portfolio: portfolioReducer,
  pipeline: pipelineReducer,
  dashboards: dashboardsReducer,
  dealflow: dealflowReducer,
  backOffice: backOfficeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
