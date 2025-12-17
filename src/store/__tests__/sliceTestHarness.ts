import type { AsyncState } from '../types/AsyncState';
import type { NormalizedError } from '../types/AsyncState';

/**
 * Test harness for async state slice reducers
 * Ensures all slices follow the standard contract
 */
export function createSliceTest<T>(config: {
  slice: any;
  mockData: T;
}) {
  const { slice, mockData } = config;
  const { reducer, actions } = slice;

  return {
    /**
     * Test: Initial state follows AsyncState<T> contract
     */
    testInitialState: () => {
      const state = reducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({
        data: null,
        status: 'idle',
        error: undefined,
      });
    },

    /**
     * Test: Requested action sets loading state
     */
    testRequestedAction: () => {
      const initialState: AsyncState<T> = {
        data: null,
        status: 'idle',
        error: undefined,
      };

      const state = reducer(initialState, actions.requested({}));
      expect(state.status).toBe('loading');
      expect(state.error).toBeUndefined();
    },

    /**
     * Test: Loaded action sets data and succeeded status
     */
    testLoadedAction: () => {
      const loadingState: AsyncState<T> = {
        data: null,
        status: 'loading',
        error: undefined,
      };

      const state = reducer(loadingState, actions.loaded(mockData));
      expect(state.status).toBe('succeeded');
      expect(state.data).toEqual(mockData);
      expect(state.error).toBeUndefined();
    },

    /**
     * Test: Failed action sets error and failed status
     */
    testFailedAction: () => {
      const loadingState: AsyncState<T> = {
        data: null,
        status: 'loading',
        error: undefined,
      };

      const error: NormalizedError = {
        message: 'Test error',
        code: 'TEST_ERROR',
      };

      const state = reducer(loadingState, actions.failed(error));
      expect(state.status).toBe('failed');
      expect(state.error).toEqual(error);
    },
  };
}
