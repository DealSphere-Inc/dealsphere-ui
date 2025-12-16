import { call, put, takeLatest, all } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import {
  dealflowDealsRequested,
  dealflowDealsLoaded,
  dealflowDealsFailed,
  companyScoringRequested,
  companyScoringLoaded,
  companyScoringFailed,
} from '../slices/dealflowSlice';
import { getDealflowDeals, type Deal } from '@/services/dealflow/dealflowReviewService';
import { getCompanyScoreData, type CompanyScoreData } from '@/services/dealflow/companyScoringService';

/**
 * Worker saga: Load dealflow deals
 */
function* loadDealflowDealsWorker(): SagaIterator {
  try {
    const deals: Deal[] = yield call(getDealflowDeals);
    yield put(dealflowDealsLoaded(deals));
  } catch (error: any) {
    console.error('Failed to load dealflow deals', error);
    yield put(dealflowDealsFailed(error?.message || 'Failed to load dealflow deals'));
  }
}

/**
 * Worker saga: Load company scoring data
 */
function* loadCompanyScoringWorker(): SagaIterator {
  try {
    const scoreData: CompanyScoreData = yield call(getCompanyScoreData);
    yield put(companyScoringLoaded(scoreData));
  } catch (error: any) {
    console.error('Failed to load company scoring data', error);
    yield put(companyScoringFailed(error?.message || 'Failed to load company scoring data'));
  }
}

/**
 * Watcher sagas
 */
function* watchDealflowDeals(): SagaIterator {
  yield takeLatest(dealflowDealsRequested.type, loadDealflowDealsWorker);
}

function* watchCompanyScoring(): SagaIterator {
  yield takeLatest(companyScoringRequested.type, loadCompanyScoringWorker);
}

/**
 * Root dealflow saga
 */
export function* dealflowSaga(): SagaIterator {
  yield all([call(watchDealflowDeals), call(watchCompanyScoring)]);
}
