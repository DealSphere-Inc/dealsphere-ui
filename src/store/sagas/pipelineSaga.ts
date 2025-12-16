import { call, put, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import {
  pipelineDataRequested,
  pipelineDataLoaded,
  pipelineDataFailed,
} from '../slices/pipelineSlice';
import {
  getPipelineStages,
  getPipelineDeals,
  getPipelineCopilotSuggestions,
  type PipelineDeal,
} from '@/services/pipelineService';
import type { Suggestion } from '@/data/mocks/ai/copilot';

/**
 * Worker saga: Load pipeline data (stages, deals, copilot suggestions)
 */
function* loadPipelineDataWorker(): SagaIterator {
  try {
    const stages: string[] = yield call(getPipelineStages);
    const deals: PipelineDeal[] = yield call(getPipelineDeals);
    const copilotSuggestions: Suggestion[] = yield call(getPipelineCopilotSuggestions);

    yield put(
      pipelineDataLoaded({
        stages,
        deals,
        copilotSuggestions,
      })
    );
  } catch (error: any) {
    console.error('Failed to load pipeline data', error);
    yield put(pipelineDataFailed(error?.message || 'Failed to load pipeline data'));
  }
}

/**
 * Watcher saga: Watch for pipeline data requests
 */
function* watchPipelineDataRequested(): SagaIterator {
  yield takeLatest(pipelineDataRequested.type, loadPipelineDataWorker);
}

/**
 * Root pipeline saga
 */
export function* pipelineSaga(): SagaIterator {
  yield call(watchPipelineDataRequested);
}
