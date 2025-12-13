import { eventChannel } from 'redux-saga';
import { all, call, delay, put, select, take, takeLatest } from 'redux-saga/effects';
import type { RootState } from '@/store/rootReducer';
import {
  navigationHydrated,
  setExpandedGroups,
  setSidebarState,
  toggleGroup,
  toggleLeftSidebar,
  toggleRightSidebar,
  type SidebarState,
} from '@/store/slices/navigationSlice';

const STORAGE_KEY = 'vestledger-nav-expanded-groups';
const SIDEBAR_LEFT_KEY = 'vestledger-sidebar-left-collapsed';
const SIDEBAR_RIGHT_KEY = 'vestledger-sidebar-right-collapsed';

function* hydrateNavigationWorker() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    yield put(
      navigationHydrated({
        expandedGroups: [],
        sidebarState: { leftCollapsed: false, rightCollapsed: false },
      })
    );
    return;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const expandedGroups = stored ? (JSON.parse(stored) as string[]) : [];

    const leftCollapsed = localStorage.getItem(SIDEBAR_LEFT_KEY) === 'true';
    const rightCollapsed = localStorage.getItem(SIDEBAR_RIGHT_KEY) === 'true';

    yield put(
      navigationHydrated({
        expandedGroups,
        sidebarState: { leftCollapsed, rightCollapsed },
      })
    );
  } catch (error) {
    console.error('Failed to hydrate navigation state', error);
    yield put(
      navigationHydrated({
        expandedGroups: [],
        sidebarState: { leftCollapsed: false, rightCollapsed: false },
      })
    );
  }
}

function* persistExpandedGroupsWorker() {
  yield delay(300);
  const expandedGroups: string[] = yield select((state: RootState) => state.navigation.expandedGroups);
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    const toStore = expandedGroups.filter((g) => g !== 'core-operations');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    console.error('Failed to persist expanded groups', error);
  }
}

function* persistSidebarStateWorker() {
  yield delay(300);
  const sidebarState: SidebarState = yield select((state: RootState) => state.navigation.sidebarState);
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(SIDEBAR_LEFT_KEY, String(sidebarState.leftCollapsed));
    localStorage.setItem(SIDEBAR_RIGHT_KEY, String(sidebarState.rightCollapsed));
  } catch (error) {
    console.error('Failed to persist sidebar state', error);
  }
}

function createResizeChannel() {
  return eventChannel<number>((emit) => {
    if (typeof window === 'undefined') {
      emit(0);
      return () => {};
    }

    const handler = () => emit(window.innerWidth);
    window.addEventListener('resize', handler);
    handler();

    return () => window.removeEventListener('resize', handler);
  });
}

function* watchResizeWorker() {
  if (typeof window === 'undefined') return;

  const chan: ReturnType<typeof createResizeChannel> = yield call(createResizeChannel);
  try {
    while (true) {
      const width: number = yield take(chan);
      if (width > 0 && width < 1080) {
        yield put(setSidebarState({ leftCollapsed: true, rightCollapsed: true }));
      }
    }
  } finally {
    chan.close();
  }
}

export function* navigationSaga() {
  yield all([
    call(hydrateNavigationWorker),
    call(watchResizeWorker),
    takeLatest([toggleGroup.type, setExpandedGroups.type], persistExpandedGroupsWorker),
    takeLatest([toggleLeftSidebar.type, toggleRightSidebar.type, setSidebarState.type], persistSidebarStateWorker),
  ]);
}
