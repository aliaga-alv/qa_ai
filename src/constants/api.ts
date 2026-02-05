/**
 * API endpoint constants
 *
 * ⚠️ IMPORTANT: These endpoints match the backend API structure
 * Base URL: /v1
 */

// Base API path (matches backend)
export const API_BASE = '/v1';

// Health check endpoints
export const API_HEALTH = {
  CHECK: `${API_BASE}/health`,
  READY: `${API_BASE}/health/ready`,
} as const;

// Auth endpoints (matched to backend API)
export const API_AUTH = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
} as const;

// Project endpoints
export const API_PROJECTS = {
  LIST: `${API_BASE}/projects`,
  CREATE: `${API_BASE}/projects`,
  GET: (id: string | number) => `${API_BASE}/projects/${id}`,
  UPDATE: (id: string | number) => `${API_BASE}/projects/${id}`,
  DELETE: (id: string | number) => `${API_BASE}/projects/${id}`,
} as const;

// Test endpoints (nested under projects)
export const API_TESTS = {
  LIST: (projectId: string | number) => `${API_BASE}/projects/${projectId}/tests`,
  CREATE: (projectId: string | number) => `${API_BASE}/projects/${projectId}/tests`,
  GET: (projectId: string | number, testId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/${testId}`,
  UPDATE: (projectId: string | number, testId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/${testId}`,
  DELETE: (projectId: string | number, testId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/${testId}`,
  DUPLICATE: (projectId: string | number, testId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/${testId}/duplicate`,
  SUMMARY: (projectId: string | number) => `${API_BASE}/projects/${projectId}/tests/summary`,

  // Test plan & code generation
  GENERATE_PLAN: (projectId: string | number, testId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/${testId}/plan`,
  GENERATE_CODE: (projectId: string | number, testId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/${testId}/generate`,
  VALIDATE_CODE: (projectId: string | number, testId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/${testId}/validate`,

  // Download test code
  DOWNLOAD: (projectId: string | number, testId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/${testId}/download`,
  DOWNLOAD_ZIP: (projectId: string | number) =>
    `${API_BASE}/projects/${projectId}/tests/zip/download`,

  // Bulk operations
  BULK_RUN: (projectId: string | number) => `${API_BASE}/projects/${projectId}/tests/bulk-run`,
  RUN_ALL: (projectId: string | number) => `${API_BASE}/projects/${projectId}/tests/run-all`,
} as const;

// Test runs endpoints
export const API_TEST_RUNS = {
  LIST: (testId: string | number) => `${API_BASE}/tests/${testId}/runs`,
  CREATE: (testId: string | number) => `${API_BASE}/tests/${testId}/runs`,
  GET: (runId: string | number) => `${API_BASE}/runs/${runId}`,
  CANCEL: (runId: string | number) => `${API_BASE}/runs/${runId}/cancel`,
  STATISTICS: (testId: string | number) => `${API_BASE}/tests/${testId}/runs/statistics`,
} as const;

// Statistics/Analytics endpoints
export const API_STATISTICS = {
  OVERVIEW: `${API_BASE}/statistics`,
} as const;

// Team endpoints
export const API_TEAMS = {
  LIST: `${API_BASE}/teams`,
  GET: (teamId: string | number) => `${API_BASE}/teams/${teamId}`,
  UPDATE: (teamId: string | number) => `${API_BASE}/teams/${teamId}`,
  SET_DEFAULT: (teamId: string | number) => `${API_BASE}/teams/${teamId}/default`,
  INVITE: (teamId: string | number) => `${API_BASE}/teams/${teamId}/invite`,
  ACCEPT_INVITATION: `${API_BASE}/teams/accept-invitation`,
} as const;

// Subscription endpoints
export const API_SUBSCRIPTIONS = {
  // Admin: Subscription plans management
  PLANS_LIST: `${API_BASE}/subscriptions`,
  PLANS_CREATE: `${API_BASE}/subscriptions`,
  PLANS_GET: (subscriptionId: string | number) => `${API_BASE}/subscriptions/${subscriptionId}`,
  PLANS_UPDATE: (subscriptionId: string | number) => `${API_BASE}/subscriptions/${subscriptionId}`,
  PLANS_DELETE: (subscriptionId: string | number) => `${API_BASE}/subscriptions/${subscriptionId}`,

  // User subscriptions
  USER_LIST: `${API_BASE}/user-subscriptions`,
  USER_SUBSCRIBE: `${API_BASE}/user-subscriptions`,
} as const;
