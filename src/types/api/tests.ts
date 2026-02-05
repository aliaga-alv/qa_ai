/**
 * Tests API request/response types
 */

import type { Test, TestExecution, TestRun, TestStatus, TestType } from '@/types/models/dashboard';
import type { PaginatedResponse, PaginationParams, FilterParams } from './common';

// ============== Requests ==============

export interface CreateTestRequest {
  name: string;
  description: string;
  specification?: string | null;
  priority?: 'low' | 'medium' | 'high';
  status?: TestStatus;
  is_active?: boolean;
  tags?: string[];
}

export interface UpdateTestRequest {
  name?: string;
  description?: string;
  specification?: string;
  plan_json?: string;
  test_code?: string;
  status?: TestStatus;
  is_active?: boolean;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  config?: Record<string, unknown>;
  steps?: TestStepRequest[];
}

export interface TestStepRequest {
  order: number;
  action: string;
  target?: string;
  value?: string;
  waitTime?: number;
  assertion?: string;
}

export interface RunTestRequest {
  environment?: string;
  parallel?: boolean;
  variables?: Record<string, string>;
}

export interface TestListParams extends PaginationParams, FilterParams {
  projectId?: string;
  type?: TestType;
  status?: TestStatus;
}

// ============== Responses ==============

export interface TestResponse {
  success: number;
  data: Test;
}

export type TestListResponse = PaginatedResponse<Test>;

export interface TestExecutionResponse {
  execution: TestExecution;
}

export type TestExecutionsResponse = PaginatedResponse<TestExecution>;

export interface TestResultsResponse {
  results: TestRun[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    averageDuration: number;
    successRate: number;
  };
}

export interface TestStatsResponse {
  stats: {
    totalTests: number;
    activeTests: number;
    totalRuns: number;
    successRate: number;
    averageDuration: number;
  };
}
