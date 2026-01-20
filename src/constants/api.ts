/**
 * API endpoint constants
 */

// Base API paths
export const API_BASE = '/api';

// Auth endpoints
export const API_AUTH = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  LOGOUT: `${API_BASE}/auth/logout`,
  REFRESH: `${API_BASE}/auth/refresh`,
  VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  PROFILE: `${API_BASE}/auth/profile`,
} as const;

// Test endpoints
export const API_TESTS = {
  LIST: `${API_BASE}/tests`,
  CREATE: `${API_BASE}/tests`,
  GET: (id: string) => `${API_BASE}/tests/${id}`,
  UPDATE: (id: string) => `${API_BASE}/tests/${id}`,
  DELETE: (id: string) => `${API_BASE}/tests/${id}`,
  RUN: (id: string) => `${API_BASE}/tests/${id}/run`,
  RESULTS: (id: string) => `${API_BASE}/tests/${id}/results`,
} as const;

// Project endpoints
export const API_PROJECTS = {
  LIST: `${API_BASE}/projects`,
  CREATE: `${API_BASE}/projects`,
  GET: (id: string) => `${API_BASE}/projects/${id}`,
  UPDATE: (id: string) => `${API_BASE}/projects/${id}`,
  DELETE: (id: string) => `${API_BASE}/projects/${id}`,
} as const;
