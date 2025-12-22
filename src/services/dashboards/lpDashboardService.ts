import { isMockMode } from '@/config/data-mode';
import {
  lpDashboardCapitalActivity,
  lpDashboardCommitment,
  lpDashboardDocuments,
  lpDashboardMetrics,
  pendingCalls,
  pendingSignatures,
} from '@/data/mocks/dashboards/lp-dashboard';

export function getLPDashboardSnapshot() {
  if (isMockMode()) {
    return {
      metrics: lpDashboardMetrics,
      documents: lpDashboardDocuments,
      capitalActivity: lpDashboardCapitalActivity,
      pendingCalls,
      pendingSignatures,
      commitment: lpDashboardCommitment,
    };
  }
  throw new Error('LP dashboard API not implemented yet');
}
