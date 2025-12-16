import { call, put, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import {
  portfolioMetricsRequested,
  portfolioMetricsLoaded,
  portfolioMetricsFailed,
} from '@/store/slices/portfolioSlice';
import {
  getPortfolioPageMetrics,
  getPortfolioHealthyCompanies,
} from '@/services/portfolio/portfolioPageMetricsService';

function* loadPortfolioMetricsWorker(): SagaIterator {
  try {
    const metrics: ReturnType<typeof getPortfolioPageMetrics> = yield call(getPortfolioPageMetrics);
    const healthyCompanies: number = yield call(getPortfolioHealthyCompanies);

    yield put(portfolioMetricsLoaded({ metrics, healthyCompanies }));
  } catch (error: any) {
    console.error('Failed to load portfolio metrics', error);
    yield put(portfolioMetricsFailed(error?.message || 'Failed to load portfolio metrics'));
  }
}

export function* portfolioSaga(): SagaIterator {
  yield takeLatest(portfolioMetricsRequested.type, loadPortfolioMetricsWorker);
}
