import { call, put } from 'redux-saga/effects';
import { normalizeError } from '../utils/normalizeError';
import type { NormalizedError } from '../types/AsyncState';

/**
 * Test harness for "service throws → failed state" saga pattern
 * Ensures all sagas handle API mode errors correctly
 */
export function createSagaTest<Params, Result>(config: {
  sagaWorker: any;
  requestedAction: any;
  failedAction: (error: NormalizedError) => any;
  service: (...args: any[]) => any;
  mockParams: Params;
}) {
  const { sagaWorker, requestedAction, failedAction, service, mockParams } = config;

  return {
    /**
     * Test: Service throws in API mode → saga dispatches failed action
     */
    testServiceThrowsInApiMode: () => {
      const action = requestedAction(mockParams);
      const generator = sagaWorker(action);

      // Expect saga to call service
      expect(generator.next().value).toEqual(call(service, mockParams));

      // Simulate service throwing
      const error = new Error('API not implemented yet');
      const result = generator.throw(error);

      // Expect saga to dispatch failed action with normalized error
      expect(result.value).toEqual(
        put(failedAction(normalizeError(error)))
      );
    },
  };
}
