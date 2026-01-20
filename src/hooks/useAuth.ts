import { useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { authService, type LoginCredentials, type RegisterData } from '@/services/api/auth.service';
import { ApiErrorHandler } from '@/lib/api-error-handler';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setLoading,
    setError,
    login: storeLogin,
    logout: storeLogout,
    clearError,
  } = useAuthStore();

  /**
   * Login user
   */
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authService.login(credentials);
        storeLogin(response.user, response.accessToken, response.refreshToken);
        return { success: true };
      } catch (error) {
        const apiError = ApiErrorHandler.normalize(error);
        setError(apiError.message);
        return { success: false, error: apiError.message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, storeLogin]
  );

  /**
   * Register new user
   */
  const register = useCallback(
    async (data: RegisterData) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authService.register(data);
        storeLogin(response.user, response.accessToken, response.refreshToken);
        return { success: true };
      } catch (error) {
        const apiError = ApiErrorHandler.normalize(error);
        setError(apiError.message);
        return { success: false, error: apiError.message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, storeLogin]
  );

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await authService.logout();
    } catch (error) {
      // Ignore errors during logout
      console.error('Logout error:', error);
    } finally {
      storeLogout();
      setLoading(false);
    }
  }, [setLoading, storeLogout]);

  /**
   * Refresh user profile
   */
  const refreshProfile = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const user = await authService.getProfile();
      setUser(user);
    } catch (error) {
      const apiError = ApiErrorHandler.normalize(error);
      console.error('Failed to refresh profile:', apiError);
    }
  }, [isAuthenticated, setUser]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    refreshProfile,
    clearError,
  };
};
