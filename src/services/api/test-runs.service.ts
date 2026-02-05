/**
 * Test Runs Service
 * Handles test execution and run management operations
 */

import { apiClient } from './client';
import { API_TEST_RUNS } from '@/constants/api';
import type {
  TestRun,
  TestRunSummary,
  TestRunApiResponse,
  TestRunSummaryApiResponse,
  TestStepResultApiResponse,
  TestStepResult,
  TriggerTestRunRequest,
  TestRunResponse,
  TestRunListResponse,
  TestRunListParams,
  TestRunStatsResponse,
} from '@/types/api/test-runs';

// ============== Transform Functions ==============

function transformStepResult(apiResponse: TestStepResultApiResponse): TestStepResult {
  return {
    id: String(apiResponse.id),
    runId: String(apiResponse.run_id),
    stepId: String(apiResponse.step_id),
    status: apiResponse.status,
    durationMs: apiResponse.duration_ms,
    actualResult: apiResponse.actual_result,
    errorMessage: apiResponse.error_message,
    selectorUsed: apiResponse.selector_used,
    screenshotPath: apiResponse.screenshot_path,
    createdAt: apiResponse.created_at ? new Date(apiResponse.created_at) : null,
  };
}

function transformTestRun(apiResponse: TestRunApiResponse): TestRun {
  return {
    id: String(apiResponse.id),
    testId: String(apiResponse.test_id),
    triggeredById: apiResponse.triggered_by_id ? String(apiResponse.triggered_by_id) : null,
    triggerType: apiResponse.trigger_type,
    status: apiResponse.status as 'pending' | 'running' | 'passed' | 'failed' | 'cancelled',
    startedAt: apiResponse.started_at ? new Date(apiResponse.started_at) : null,
    finishedAt: apiResponse.finished_at ? new Date(apiResponse.finished_at) : null,
    durationMs: apiResponse.duration_ms,
    totalSteps: apiResponse.total_steps,
    passedSteps: apiResponse.passed_steps,
    failedSteps: apiResponse.failed_steps,
    skippedSteps: apiResponse.skipped_steps,
    executionTrace: apiResponse.execution_trace,
    errorMessage: apiResponse.error_message,
    environment: apiResponse.environment,
    createdAt: apiResponse.created_at ? new Date(apiResponse.created_at) : null,
    updatedAt: apiResponse.updated_at ? new Date(apiResponse.updated_at) : null,
    stepResults: apiResponse.step_results?.map(transformStepResult) ?? null,
  };
}

function transformTestRunSummary(apiResponse: TestRunSummaryApiResponse): TestRunSummary {
  return {
    id: String(apiResponse.id),
    testId: String(apiResponse.test_id),
    triggeredById: apiResponse.triggered_by_id ? String(apiResponse.triggered_by_id) : null,
    triggerType: apiResponse.trigger_type,
    status: apiResponse.status as 'pending' | 'running' | 'passed' | 'failed' | 'cancelled',
    startedAt: apiResponse.started_at ? new Date(apiResponse.started_at) : null,
    finishedAt: apiResponse.finished_at ? new Date(apiResponse.finished_at) : null,
    durationMs: apiResponse.duration_ms,
    totalSteps: apiResponse.total_steps,
    passedSteps: apiResponse.passed_steps,
    failedSteps: apiResponse.failed_steps,
    skippedSteps: apiResponse.skipped_steps,
    errorMessage: apiResponse.error_message,
    createdAt: apiResponse.created_at ? new Date(apiResponse.created_at) : null,
  };
}

// ============== Service Methods ==============

/**
 * Trigger a test run
 * POST /tests/{test_id}/runs
 */
export async function triggerRun(
  testId: number | string,
  request?: TriggerTestRunRequest
): Promise<TestRun> {
  const response = await apiClient.post<TestRunResponse>(API_TEST_RUNS.TRIGGER(testId), request);
  return transformTestRun(response.data.data);
}

/**
 * List runs for a specific test with pagination
 * GET /tests/{test_id}/runs
 */
export async function listRuns(
  testId: number | string,
  params?: TestRunListParams
): Promise<{
  runs: TestRunSummary[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}> {
  const response = await apiClient.get<TestRunListResponse>(API_TEST_RUNS.LIST(testId), {
    params,
  });

  return {
    runs: response.data.data.runs.map(transformTestRunSummary),
    pagination: {
      page: response.data.data.pagination.page,
      perPage: response.data.data.pagination.per_page,
      total: response.data.data.pagination.total,
      totalPages: response.data.data.pagination.total_pages,
    },
  };
}

/**
 * Get single run details including step results and execution trace
 * GET /runs/{run_id}
 */
export async function getRun(runId: number | string): Promise<TestRun> {
  const response = await apiClient.get<TestRunResponse>(API_TEST_RUNS.GET(runId));
  return transformTestRun(response.data.data);
}

/**
 * Cancel a running test
 * POST /runs/{run_id}/cancel
 */
export async function cancelRun(runId: number | string): Promise<TestRun> {
  const response = await apiClient.post<TestRunResponse>(API_TEST_RUNS.CANCEL(runId));
  return transformTestRun(response.data.data);
}

/**
 * Get run statistics for a test
 * GET /tests/{test_id}/runs/statistics
 */
export async function getStatistics(testId: number | string): Promise<unknown> {
  const response = await apiClient.get<TestRunStatsResponse>(API_TEST_RUNS.STATISTICS(testId));
  return response.data.data;
}

export const testRunsService = {
  triggerRun,
  listRuns,
  getRun,
  cancelRun,
  getStatistics,
};
