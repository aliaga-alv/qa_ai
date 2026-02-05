import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tokenStorage } from '@/lib/token-storage';
import { queryClient } from '@/main';

export interface User {
  id?: string;
  name: string;
  email: string;
  subscription: string | null;
  subscription_required: boolean;
  teams?: Array<{
    id: number;
    name: string;
    role: string;
    is_default: boolean;
  }>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      setError: (error) =>
        set({
          error,
        }),

      login: (user, accessToken, refreshToken) => {
        tokenStorage.setTokens(accessToken, refreshToken);
        set({
          user,
          isAuthenticated: true,
          error: null,
        });
      },

      logout: () => {
        tokenStorage.clearTokens();
        // Clear all TanStack Query cache to prevent data leakage between users
        queryClient.clear();
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () =>
        set({
          error: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
