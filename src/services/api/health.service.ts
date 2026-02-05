/**
 * Health Check API service
 * Simple health and readiness checks
 */

import apiClient from './client';
import { API_HEALTH } from '@/constants/api';

export const healthService = {
  /**
   * Health check - returns application health status
   */
  async check(): Promise<any> {
    const response = await apiClient.get(API_HEALTH.CHECK);
    return response.data;
  },

  /**
   * Readiness check - verify app and dependencies are ready
   */
  async ready(): Promise<any> {
    const response = await apiClient.get(API_HEALTH.READY);
    return response.data;
  },
};
