/**
 * Test Runs API request/response types
 * Based on OpenAPI specification
 */

import type { PaginationParams } from './common';

// ============== Types ==============

// Backend API response type for step results (snake_case)
export interface TestStepResultApiResponse {
  id: number;
  run_id: number;
  step_id: number;
  status: string;
  duration_ms: number | null;
  actual_result: string | null;
  error_message: string | null;
  selector_used: string | null;
  screenshot_path: string | null;
  created_at: string | null;
}

// Backend API response type for full test run (snake_case)
export interface TestRunApiResponse {
  id: number;
  test_id: number;
  triggered_by_id: number | null;
  trigger_type: string;
  status: string;
  started_at: string | null;
  finished_at: string | null;
  duration_ms: number | null;
  total_steps: number;
  passed_steps: number;
  failed_steps: number;
  skipped_steps: number;
  execution_trace: unknown | null;
  error_message: string | null;
  environment: Record<string, unknown> | null;
  created_at: string | null;
  updated_at: string | null;
  step_results?: TestStepResultApiResponse[] | null;
}

// Backend API response type for summary (list views) - without execution_trace and step_results
export interface TestRunSummaryApiResponse {
  id: number;
  test_id: number;
  triggered_by_id: number | null;
  trigger_type: string;
  status: string;
  started_at: string | null;
  finished_at: string | null;
  duration_ms: number | null;
  total_steps: number;
  passed_steps: number;
  failed_steps: number;
  skipped_steps: number;
  error_message: string | null;
  created_at: string | null;
}

// Frontend domain model for step results (camelCase)
export interface TestStepResult {
  id: string;
  runId: string;
  stepId: string;
  status: string;
  durationMs: number | null;
  actualResult: string | null;
  errorMessage: string | null;
  selectorUsed: string | null;
  screenshotPath: string | null;
  createdAt: Date | null;
}

// Frontend domain model for full test run (camelCase)
export interface TestRun {
  id: string;
  testId: string;
  triggeredById: string | null;
  triggerType: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'cancelled';
  startedAt: Date | null;
  finishedAt: Date | null;
  durationMs: number | null;
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  skippedSteps: number;
  executionTrace: unknown | null;
  errorMessage: string | null;
  environment: Record<string, unknown> | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  stepResults?: TestStepResult[] | null;
}

// Frontend domain model for summary (list views)
export interface TestRunSummary {
  id: string;
  testId: string;
  triggeredById: string | null;
  triggerType: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'cancelled';
  startedAt: Date | null;
  finishedAt: Date | null;
  durationMs: number | null;
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  skippedSteps: number;
  errorMessage: string | null;
  createdAt: Date | null;
}

// ============== Requests ==============

// Trigger a test run
export interface TriggerTestRunRequest {
  trigger_type?: string; // Optional, defaults to "manual"
  environment?: Record<string, unknown>; // Optional environment config
}

// Bulk run tests
export interface BulkRunRequest {
  test_ids: number[]; // Array of test IDs to run
  parallel?: boolean; // Run in parallel (default: false)
}

// Run all tests in project
export interface RunAllTestsRequest {
  parallel?: boolean; // Run in parallel (default: false)
}

// List params with filtering
export interface TestRunListParams extends PaginationParams {
  status?: string; // Filter by status
}

// ============== Responses ==============

// Single test run response (from POST /tests/{test_id}/runs or GET /runs/{run_id})
export interface TestRunResponse {
  success: 1;
  data: TestRunApiResponse;
}

// List of test runs (from GET /tests/{test_id}/runs)
export interface TestRunListResponse {
  success: 1;
  data: {
    runs: TestRunSummaryApiResponse[];
    pagination: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  };
}

// Generic success response (for bulk-run, run-all)
export interface BulkRunResponse {
  success: 1;
  data: unknown; // Not specified in OpenAPI
}

// ============== Stats ==============

// Response from GET /tests/{test_id}/runs/statistics
export interface TestRunStatsResponse {
  success: 1;
  data: unknown; // Schema not detailed in OpenAPI, will need to check actual response
}

export interface TestRunStats {
  total: number;
  passed: number;
  failed: number;
  running: number;
  pending: number;
  cancelled: number;
  averageDuration: number; // in milliseconds
  successRate: number; // percentage
}
