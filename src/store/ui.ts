import { useCallback, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { patchUIState, setUIState } from '@/store/slices/uiSlice';

export function useUIKey<T>(key: string, fallback: T) {
  const dispatch = useAppDispatch();
  const storedValue = useAppSelector((state) => state.ui.byKey[key] as T | undefined);
  const value = storedValue ?? fallback;

  useLayoutEffect(() => {
    if (storedValue === undefined) {
      dispatch(setUIState({ key, value: fallback }));
    }
  }, [dispatch, fallback, key, storedValue]);

  const set = useCallback(
    (next: T) => {
      dispatch(setUIState({ key, value: next }));
    },
    [dispatch, key]
  );

  const patch = useCallback(
    (nextPatch: Partial<T>) => {
      if (storedValue === undefined) {
        const base = fallback;
        if (base && typeof base === 'object' && !Array.isArray(base)) {
          dispatch(
            setUIState({
              key,
              value: {
                ...(base as Record<string, unknown>),
                ...(nextPatch as Record<string, unknown>),
              },
            })
          );
          return;
        }
        dispatch(setUIState({ key, value: nextPatch as unknown }));
        return;
      }
      dispatch(patchUIState({ key, patch: nextPatch as Record<string, unknown> }));
    },
    [dispatch, fallback, key, storedValue]
  );

  return { value, set, patch };
}
