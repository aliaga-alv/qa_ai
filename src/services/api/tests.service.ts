/**
 * Tests API service
 * Handles all test-related API operations
 *
 * ⚠️ Note: Tests are nested under projects in the backend
 */

import apiClient from './client';
import { API_TESTS } from '@/constants/api';
import type {
  CreateTestRequest,
  UpdateTestRequest,
  TestListParams,
  TestResponse,
  TestListResponse,
  TestStatsResponse,
} from '@/types/api/tests';
import type { Test } from '@/types/models/dashboard';

export const testsService = {
  /**
   * Get list of tests for a project with optional filters
   */
  async list(projectId: string | number, params?: TestListParams): Promise<TestListResponse> {
    const response = await apiClient.get<TestListResponse>(API_TESTS.LIST(projectId), { params });
    return response.data;
  },

  /**
   * Get a single test by ID
   */
  async get(projectId: string | number, testId: string | number): Promise<Test> {
    const response = await apiClient.get<TestResponse>(API_TESTS.GET(projectId, testId));
    return response.data.data;
  },

  /**
   * Create a new test
   */
  async create(projectId: string | number, data: CreateTestRequest): Promise<Test> {
    const response = await apiClient.post<TestResponse>(API_TESTS.CREATE(projectId), data);
    return response.data.data;
  },

  /**
   * Update an existing test
   */
  async update(
    projectId: string | number,
    testId: string | number,
    data: UpdateTestRequest
  ): Promise<Test> {
    const response = await apiClient.patch<TestResponse>(API_TESTS.UPDATE(projectId, testId), data);
    return response.data.data;
  },

  /**
   * Delete a test
   */
  async delete(projectId: string | number, testId: string | number): Promise<void> {
    await apiClient.delete(API_TESTS.DELETE(projectId, testId));
  },

  /**
   * Duplicate a test
   */
  async duplicate(
    projectId: string | number,
    testId: string | number,
    newName?: string
  ): Promise<Test> {
    const response = await apiClient.post<TestResponse>(
      API_TESTS.DUPLICATE(projectId, testId),
      null,
      { params: { name: newName } }
    );
    return response.data.data;
  },

  /**
   * Get test summary for a project
   */
  async getSummary(projectId: string | number): Promise<TestStatsResponse> {
    const response = await apiClient.get<TestStatsResponse>(API_TESTS.SUMMARY(projectId));
    return response.data;
  },

  /**
   * Generate test plan from specification
   */
  async generatePlan(projectId: string | number, testId: string | number): Promise<Test> {
    const response = await apiClient.post<TestResponse>(API_TESTS.GENERATE_PLAN(projectId, testId));
    return response.data.data;
  },

  /**
   * Generate test code from plan
   */
  async generateCode(
    projectId: string | number,
    testId: string | number,
    force = false
  ): Promise<Test> {
    const response = await apiClient.post<TestResponse>(
      API_TESTS.GENERATE_CODE(projectId, testId),
      null,
      { params: { force: force ? 1 : 0 } }
    );
    return response.data.data;
  },

  /**
   * Validate test code
   */
  async validateCode(projectId: string | number, testId: string | number): Promise<Test> {
    const response = await apiClient.post<TestResponse>(API_TESTS.VALIDATE_CODE(projectId, testId));
    return response.data.data;
  },

  /**
   * Download test code as file
   */
  async downloadCode(projectId: string | number, testId: string | number): Promise<Blob> {
    const response = await apiClient.get(API_TESTS.DOWNLOAD(projectId, testId), {
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Download multiple tests as ZIP
   */
  async downloadZip(projectId: string | number, testIds?: number[]): Promise<Blob> {
    const response = await apiClient.get(API_TESTS.DOWNLOAD_ZIP(projectId), {
      params: { test_ids: testIds?.join(',') },
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Run multiple tests
   */
  async bulkRun(projectId: string | number, testIds: number[], parallel = false): Promise<void> {
    await apiClient.post(API_TESTS.BULK_RUN(projectId), null, {
      params: { test_ids: testIds, parallel },
    });
  },

  /**
   * Run all active tests in project
   */
  async runAll(projectId: string | number, parallel = false): Promise<void> {
    await apiClient.post(API_TESTS.RUN_ALL(projectId), null, {
      params: { parallel },
    });
  },
};
