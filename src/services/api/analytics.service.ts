/**
 * Statistics API service
 * Handles analytics and reporting
 */

import apiClient from './client';
import { API_STATISTICS } from '@/constants/api';

export const statisticsService = {
  /**
   * Get overall statistics across all user's projects
   * Includes: total tests, success/failure rates, active tests,
   * week-over-week comparison, and execution trends
   */
  async getOverview(): Promise<unknown> {
    const response = await apiClient.get(API_STATISTICS.OVERVIEW);
    return response.data;
  },
};
