import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAlerts,
  fetchAlertsFailure,
  fetchAlertsSuccess,
} from '../slices/alertsSlice';
import { mockAlerts } from '@/data/mocks/store/alerts';

function* fetchAlertsWorker() {
  try {
    // Simulate network latency and return mock alerts.
    yield delay(300);
    yield put(fetchAlertsSuccess(mockAlerts));
  } catch (error: any) {
    yield put(fetchAlertsFailure(error?.message ?? 'Failed to load alerts'));
  }
}

function* watchFetchAlerts() {
  yield takeLatest(fetchAlerts.type, fetchAlertsWorker);
}

export function* alertsSaga() {
  yield all([call(watchFetchAlerts)]);
}
