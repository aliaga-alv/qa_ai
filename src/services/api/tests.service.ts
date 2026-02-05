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
  TestListResponse,
  TestStatsResponse,
} from '@/types/api/tests';
import type { Test } from '@/types/models/dashboard';
import type { BulkRunResponse } from '@/types/api/test-runs';

export const testsService = {
  /**
   * Get list of tests for a project with optional filters
   */
  async list(projectId: string | number, params?: TestListParams): Promise<TestListResponse> {
    const response = await apiClient.get<{
      success: number;
      data:
        | Array<{ tests: Test[]; pagination: TestListResponse['pagination'] }>
        | { tests: Test[]; pagination: TestListResponse['pagination'] };
    }>(API_TESTS.LIST(projectId), { params });

    // Backend returns: {success: 1, data: [{tests: [...], pagination: {...}}]} or {success: 1, data: {tests: [...], pagination: {...}}}
    // Handle both array and object formats
    const dataObject = Array.isArray(response.data.data)
      ? response.data.data[0]
      : response.data.data;

    return {
      data: dataObject.tests,
      pagination: dataObject.pagination,
    };
  },

  /**
   * Get a single test by ID
   */
  async get(projectId: string | number, testId: string | number): Promise<Test> {
    const response = await apiClient.get<{ success: number; data: Test | Test[] }>(
      API_TESTS.GET(projectId, testId)
    );

    // Backend may return: {success: 1, data: {...}} or {success: 1, data: [{...}]}
    // Handle both formats
    const test = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
    return test;
  },

  /**
   * Create a new test
   */
  async create(projectId: string | number, data: CreateTestRequest): Promise<Test> {
    const response = await apiClient.post<{ success: number; data: Test | Test[] }>(
      API_TESTS.CREATE(projectId),
      data
    );
    const test = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
    return test;
  },

  /**
   * Update an existing test
   */
  async update(
    projectId: string | number,
    testId: string | number,
    data: UpdateTestRequest
  ): Promise<Test> {
    const response = await apiClient.patch<{ success: number; data: Test | Test[] }>(
      API_TESTS.UPDATE(projectId, testId),
      data
    );
    const test = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
    return test;
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
    const response = await apiClient.post<{ success: number; data: Test | Test[] }>(
      API_TESTS.DUPLICATE(projectId, testId),
      null,
      { params: { name: newName } }
    );
    const test = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
    return test;
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
    const response = await apiClient.post<{ success: number; data: Test | Test[] }>(
      API_TESTS.GENERATE_PLAN(projectId, testId)
    );
    const test = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
    return test;
  },

  /**
   * Generate test code from plan
   */
  async generateCode(
    projectId: string | number,
    testId: string | number,
    force = false
  ): Promise<Test> {
    const response = await apiClient.post<{ success: number; data: Test | Test[] }>(
      API_TESTS.GENERATE_CODE(projectId, testId),
      null,
      { params: { force: force ? 1 : 0 } }
    );
    const test = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
    return test;
  },

  /**
   * Validate test code
   */
  async validateCode(projectId: string | number, testId: string | number): Promise<Test> {
    const response = await apiClient.post<{ success: number; data: Test | Test[] }>(
      API_TESTS.VALIDATE_CODE(projectId, testId)
    );
    const test = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
    return test;
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
  async bulkRun(
    projectId: string | number,
    testIds: number[],
    parallel: boolean = false
  ): Promise<unknown> {
    const response = await apiClient.post<BulkRunResponse>(
      API_TESTS.BULK_RUN(projectId),
      JSON.stringify({
        test_ids: testIds,
        parallel: parallel,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  },

  /**
   * Run all active tests in project
   */
  async runAll(projectId: string | number, parallel: boolean = false): Promise<unknown> {
    const response = await apiClient.post<BulkRunResponse>(
      API_TESTS.RUN_ALL(projectId),
      JSON.stringify({ parallel }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  },
};
