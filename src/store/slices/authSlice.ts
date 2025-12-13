import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, UserRole } from '@/types/auth';

interface AuthState {
  hydrated: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  hydrated: false,
  isAuthenticated: false,
  user: null,
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
      void state;
    },
    loginSucceeded: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutRequested: (state) => {
      void state;
    },
    loggedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    switchRoleRequested: (state, _action: PayloadAction<UserRole>) => {
      void state;
    },
    userUpdated: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const {
  authHydrated,
  loginRequested,
  loginSucceeded,
  logoutRequested,
  loggedOut,
  switchRoleRequested,
  userUpdated,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

