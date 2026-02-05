/**
 * Statistics API service
 * Handles analytics and reporting
 */

import apiClient from './client';
import { API_STATISTICS } from '@/constants/api';
import type { DashboardStatsResponse } from '@/types/api/analytics';

export const statisticsService = {
  /**
   * Get overall statistics across all user's projects
   * Includes: total tests, success/failure rates, active tests,
   * week-over-week comparison, and execution trends
   */
  async getOverview(): Promise<DashboardStatsResponse> {
    const response = await apiClient.get<{ success: number; data: DashboardStatsResponse[] }>(
      API_STATISTICS.OVERVIEW
    );
    // Backend returns { success: 1, data: [statsObject] }
    return response.data.data[0];
  },
};
