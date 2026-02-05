import { useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import {
  authService,
  type LoginCredentials,
  type RegisterData,
  type ResetPasswordRequest,
} from '@/services/api/auth.service';
import { ApiErrorHandler } from '@/lib/api-error-handler';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
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
        // Backend returns: { token, user }
        storeLogin(response.user, response.token, response.token); // Using token for both access and refresh
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
        // Backend returns: { token, user }
        storeLogin(response.user, response.token, response.token);
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
   * Logout user (client-side only, no backend endpoint)
   */
  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  /**
   * Request password reset (sends 6-digit OTP to email)
   */
  const forgotPassword = useCallback(
    async (email: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authService.forgotPassword(email);
        return { success: true, message: response.message };
      } catch (error) {
        const apiError = ApiErrorHandler.normalize(error);
        setError(apiError.message);
        return { success: false, error: apiError.message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  /**
   * Reset password using OTP
   */
  const resetPassword = useCallback(
    async (data: ResetPasswordRequest) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authService.resetPassword(data);
        return { success: true, message: response.message };
      } catch (error) {
        const apiError = ApiErrorHandler.normalize(error);
        setError(apiError.message);
        return { success: false, error: apiError.message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

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
    forgotPassword,
    resetPassword,
    clearError,
  };
};
