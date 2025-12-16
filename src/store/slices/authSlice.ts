import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, UserRole } from '@/types/auth';

interface AuthState {
  hydrated: boolean;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  hydrated: false,
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authHydrated: (state, action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>) => {
      state.hydrated = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    loginRequested: (state, _action: PayloadAction<{ email: string; password: string; role: UserRole }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSucceeded: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequested: (state) => {
      state.loading = true;
    },
    loggedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    switchRoleRequested: (state, _action: PayloadAction<UserRole>) => {
      state.loading = true;
      state.error = null;
    },
    userUpdated: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  authHydrated,
  loginRequested,
  loginSucceeded,
  loginFailed,
  logoutRequested,
  loggedOut,
  switchRoleRequested,
  userUpdated,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

