// Auth store - client-side authentication state
// Uses Zustand for state management
// Stores:
// - User info
// - Auth tokens
// - Login state
//
// Usage in components:
// const { user, login, logout } = useAuthStore();

import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  // State
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,

  /**
   * Set user after login
   * @param user - User object { id, email, role }
   * @param accessToken - JWT access token
   * @param refreshToken - JWT refresh token
   */
  setAuth: (user, accessToken, refreshToken) =>
    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    }),

  /**
   * Clear auth state (logout)
   */
  logout: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    }),

  /**
   * Set loading state
   */
  setLoading: (isLoading) => set({ isLoading }),

  /**
   * Refresh access token
   * @param accessToken - New access token
   */
  refreshAccessToken: (accessToken) => set({ accessToken }),
}));
