import apiClient from './client';
import type { User } from '@/stores/authStore';
import { API_AUTH } from '@/constants/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_AUTH.LOGIN, credentials);
    return response.data;
  },

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_AUTH.REGISTER, data);
    return response.data;
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    await apiClient.post(API_AUTH.LOGOUT);
  },

  /**
   * Refresh the access token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(API_AUTH.REFRESH, {
      refreshToken,
    });
    return response.data;
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(API_AUTH.VERIFY_EMAIL, {
      token,
    });
    return response.data;
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(API_AUTH.FORGOT_PASSWORD, {
      email,
    });
    return response.data;
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(API_AUTH.RESET_PASSWORD, {
      token,
      password: newPassword,
    });
    return response.data;
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>(API_AUTH.PROFILE);
    return response.data;
  },
};
