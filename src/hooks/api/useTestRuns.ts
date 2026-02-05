/**
 * React Query hooks for Test Runs API
 * Provides mutations and queries for test execution and run management
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { testRunsService } from '@/services/api/test-runs.service';
import { testsService } from '@/services/api/tests.service';
import type { TestRun, TriggerTestRunRequest, TestRunListParams } from '@/types/api/test-runs';
import { toast } from 'sonner';

// Query keys for cache management
export const testRunsKeys = {
  all: ['test-runs'] as const,
  lists: () => [...testRunsKeys.all, 'list'] as const,
  list: (testId: string | number, params?: TestRunListParams) =>
    [...testRunsKeys.lists(), testId, params] as const,
  details: () => [...testRunsKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...testRunsKeys.details(), id] as const,
  statistics: (testId: string | number) => [...testRunsKeys.all, 'statistics', testId] as const,
};

// ============== Queries ==============

/**
 * Fetch test runs list for a specific test
 */
export function useTestRuns(testId: string | number, params?: TestRunListParams) {
  return useQuery({
    queryKey: testRunsKeys.list(testId, params),
    queryFn: () => testRunsService.listRuns(testId, params),
    enabled: !!testId,
  });
}

/**
 * Fetch single test run details with step results
 */
export function useTestRun(runId: string | number) {
  return useQuery({
    queryKey: testRunsKeys.detail(runId),
    queryFn: () => testRunsService.getRun(runId),
    enabled: !!runId,
  });
}

/**
 * Fetch test run statistics
 */
export function useTestRunStatistics(testId: string | number) {
  return useQuery({
    queryKey: testRunsKeys.statistics(testId),
    queryFn: () => testRunsService.getStatistics(testId),
    enabled: !!testId,
  });
}

// ============== Mutations ==============

/**
 * Trigger a single test run
 */
export function useTriggerTestRun() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      testId,
      request,
    }: {
      testId: string | number;
      request?: TriggerTestRunRequest;
    }) => testRunsService.triggerRun(testId, request),

    onSuccess: (_data: TestRun, variables) => {
      toast.success('Test run started successfully');

      // Invalidate test runs list for this test
      queryClient.invalidateQueries({
        queryKey: testRunsKeys.list(variables.testId),
      });

      // Invalidate test details (to update run counts)
      queryClient.invalidateQueries({
        queryKey: ['tests', 'detail', variables.testId],
      });
    },

    onError: (error: unknown) => {
      // Check if error is already processed by ApiErrorHandler
      const apiError = error as { code?: string; message?: string; statusCode?: number };

      if (apiError.message) {
        toast.error(apiError.message);
        return;
      }

      // Fallback: try to extract from raw response
      const errorResponse = error as {
        response?: {
          data?: {
            errors?: Array<{ message: string; errors?: Record<string, string[]> }>;
          };
        };
      };

      const backendError = errorResponse?.response?.data?.errors?.[0];
      const message = backendError?.message || 'Failed to start test run';

      toast.error(message);
    },
  });
}

/**
 * Cancel a running test
 */
export function useCancelTestRun() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (runId: string | number) => testRunsService.cancelRun(runId),

    onSuccess: (data: TestRun) => {
      toast.success('Test run cancelled');

      // Invalidate run detail
      queryClient.invalidateQueries({
        queryKey: testRunsKeys.detail(data.id),
      });

      // Invalidate runs list for this test
      queryClient.invalidateQueries({
        queryKey: testRunsKeys.list(data.testId),
      });
    },

    onError: (error: unknown) => {
      // Check if error is already processed by ApiErrorHandler
      const apiError = error as { code?: string; message?: string; statusCode?: number };

      if (apiError.message) {
        toast.error(apiError.message);
        return;
      }

      // Fallback: try to extract from raw response
      const errorResponse = error as {
        response?: {
          data?: {
            errors?: Array<{ message: string; errors?: Record<string, string[]> }>;
          };
        };
      };

      const backendError = errorResponse?.response?.data?.errors?.[0];
      const message = backendError?.message || 'Failed to cancel test run';

      toast.error(message);
    },
  });
}

/**
 * Run multiple tests (bulk run)
 */
export function useBulkRunTests() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      testIds,
      parallel = false,
    }: {
      projectId: string | number;
      testIds: number[];
      parallel?: boolean;
    }) => testsService.bulkRun(projectId, testIds, parallel),

    onSuccess: (_data, variables) => {
      toast.success(`Started ${variables.testIds.length} test(s)`);

      // Invalidate all test runs queries since multiple tests are affected
      queryClient.invalidateQueries({
        queryKey: testRunsKeys.lists(),
      });

      // Invalidate tests list
      queryClient.invalidateQueries({
        queryKey: ['tests', 'list', variables.projectId],
      });
    },

    onError: (error: unknown) => {
      // Check if error is already processed by ApiErrorHandler
      const apiError = error as { code?: string; message?: string; statusCode?: number };

      if (apiError.message) {
        // Already processed by ApiErrorHandler
        toast.error(apiError.message);
        return;
      }

      // Fallback: try to extract from raw response
      const errorResponse = error as {
        response?: {
          data?: {
            errors?: Array<{ message: string; errors?: Record<string, string[]> }>;
          };
        };
      };

      const backendError = errorResponse?.response?.data?.errors?.[0];
      const message = backendError?.message || 'Failed to start tests';

      toast.error(message);
    },
  });
}

/**
 * Run all active tests in a project
 */
export function useRunAllTests() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      parallel = false,
    }: {
      projectId: string | number;
      parallel?: boolean;
    }) => testsService.runAll(projectId, parallel),

    onSuccess: (_data, variables) => {
      toast.success('Started all active tests');

      // Invalidate all test runs queries
      queryClient.invalidateQueries({
        queryKey: testRunsKeys.lists(),
      });

      // Invalidate tests list
      queryClient.invalidateQueries({
        queryKey: ['tests', 'list', variables.projectId],
      });
    },

    onError: (error: unknown) => {
      // Check if error is already processed by ApiErrorHandler
      const apiError = error as { code?: string; message?: string; statusCode?: number };

      if (apiError.message) {
        toast.error(apiError.message);
        return;
      }

      // Fallback: try to extract from raw response
      const errorResponse = error as {
        response?: {
          data?: {
            errors?: Array<{ message: string; errors?: Record<string, string[]> }>;
          };
        };
      };

      const backendError = errorResponse?.response?.data?.errors?.[0];
      const message = backendError?.message || 'Failed to start tests';

      toast.error(message);
    },
  });
}
