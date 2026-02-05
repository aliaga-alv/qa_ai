import apiClient from './client';
import { API_AUTH } from '@/constants/api';

// ============================================
// Request Types
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

// ============================================
// Response Types
// ============================================

export interface AuthData {
  access_token: string;
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

export interface AuthResponse {
  success: number;
  data: AuthData[];
}

export interface MessageResponse {
  success: number;
  data: Array<{ message: string }>;
}

// ============================================
// Auth Service
// ============================================

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthData> {
    const response = await apiClient.post<AuthResponse>(API_AUTH.LOGIN, credentials);
    return response.data.data[0];
  },

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthData> {
    const response = await apiClient.post<AuthResponse>(API_AUTH.REGISTER, data);
    return response.data.data[0];
  },

  /**
   * Request password reset (sends 6-digit OTP to email)
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<MessageResponse>(API_AUTH.FORGOT_PASSWORD, { email });
    return response.data.data[0];
  },

  /**
   * Reset password using OTP
   */
  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<MessageResponse>(API_AUTH.RESET_PASSWORD, data);
    return response.data.data[0];
  },
};
