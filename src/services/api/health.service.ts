/**
 * Health Check API service
 * Simple health and readiness checks
 */

import type { AxiosResponse } from 'axios';
import apiClient from './client';
import { API_HEALTH } from '@/constants/api';

/**
 * Health check response
 */
export interface HealthResponse {
  status: string;
  timestamp?: string;
  version?: string;
  uptime?: number;
}

/**
 * Readiness check response
 */
export interface ReadinessResponse {
  status: string;
  checks?: Record<string, { status: string; message?: string }>;
  timestamp?: string;
}

export const healthService = {
  /**
   * Health check - returns application health status
   */
  async check(): Promise<HealthResponse> {
    const response: AxiosResponse<HealthResponse> = await apiClient.get(API_HEALTH.CHECK);
    return response.data;
  },

  /**
   * Readiness check - verify app and dependencies are ready
   */
  async ready(): Promise<ReadinessResponse> {
    const response: AxiosResponse<ReadinessResponse> = await apiClient.get(API_HEALTH.READY);
    return response.data;
  },
};
