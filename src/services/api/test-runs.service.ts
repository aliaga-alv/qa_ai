/**
 * Test Runs API service
 * Handles test execution and run management
 */

import apiClient from './client';
import { API_TEST_RUNS } from '@/constants/api';

export interface TestRunListParams {
  page?: number;
  per_page?: number;
  status?: string;
}

export interface CreateTestRunRequest {
  trigger_type?: string;
  environment?: Record<string, unknown>;
}

export const testRunsService = {
  /**
   * Trigger a new test run
   */
  async create(testId: string | number, data?: CreateTestRunRequest): Promise<unknown> {
    const response = await apiClient.post(API_TEST_RUNS.CREATE(testId), data);
    return response.data;
  },

  /**
   * Get list of runs for a test
   */
  async list(testId: string | number, params?: TestRunListParams): Promise<unknown> {
    const response = await apiClient.get(API_TEST_RUNS.LIST(testId), { params });
    return response.data;
  },

  /**
   * Get detailed run information
   */
  async get(runId: string | number): Promise<unknown> {
    const response = await apiClient.get(API_TEST_RUNS.GET(runId));
    return response.data;
  },

  /**
   * Cancel a running test
   */
  async cancel(runId: string | number): Promise<unknown> {
    const response = await apiClient.post(API_TEST_RUNS.CANCEL(runId));
    return response.data;
  },

  /**
   * Get run statistics for a test
   */
  async getStatistics(testId: string | number): Promise<unknown> {
    const response = await apiClient.get(API_TEST_RUNS.STATISTICS(testId));
    return response.data;
  },
};
