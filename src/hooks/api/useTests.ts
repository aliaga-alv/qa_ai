/**
 * Tests API hooks
 * TanStack Query hooks for test operations
 *
 * ⚠️ Note: Tests are nested under projects in the backend
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testsService } from '@/services/api/tests.service';
import { QUERY_KEYS, MUTATION_KEYS } from '@/constants/query-keys';
import type { CreateTestRequest, UpdateTestRequest, TestListParams } from '@/types/api/tests';

/**
 * Hook to fetch list of tests for a project
 */
export function useTests(projectId: string | number, params?: TestListParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.tests.list(), projectId, params],
    queryFn: () => testsService.list(projectId, params),
    enabled: !!projectId,
  });
}

/**
 * Hook to fetch a single test by ID
 */
export function useTest(projectId: string | number, testId: string | number) {
  return useQuery({
    queryKey: QUERY_KEYS.tests.detail(String(testId)),
    queryFn: () => testsService.get(projectId, testId),
    enabled: !!projectId && !!testId,
  });
}

/**
 * Hook to fetch test summary for a project
 */
export function useTestSummary(projectId: string | number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.tests.all, 'summary', projectId],
    queryFn: () => testsService.getSummary(projectId),
    enabled: !!projectId,
  });
}

/**
 * Hook to create a new test
 */
export function useCreateTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.tests.create],
    mutationFn: ({ projectId, data }: { projectId: string | number; data: CreateTestRequest }) =>
      testsService.create(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tests.all });
    },
  });
}

/**
 * Hook to update an existing test
 */
export function useUpdateTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.tests.update],
    mutationFn: ({
      projectId,
      testId,
      data,
    }: {
      projectId: string | number;
      testId: string | number;
      data: UpdateTestRequest;
    }) => testsService.update(projectId, testId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tests.detail(String(variables.testId)),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tests.all });
    },
  });
}

/**
 * Hook to delete a test
 */
export function useDeleteTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.tests.delete],
    mutationFn: ({ projectId, testId }: { projectId: string | number; testId: string | number }) =>
      testsService.delete(projectId, testId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tests.all });
    },
  });
}

/**
 * Hook to duplicate a test
 */
export function useDuplicateTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['tests:duplicate'],
    mutationFn: ({
      projectId,
      testId,
      newName,
    }: {
      projectId: string | number;
      testId: string | number;
      newName?: string;
    }) => testsService.duplicate(projectId, testId, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tests.all });
    },
  });
}

/**
 * Hook to generate test plan from specification
 */
export function useGeneratePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['tests:generatePlan'],
    mutationFn: ({ projectId, testId }: { projectId: string | number; testId: string | number }) =>
      testsService.generatePlan(projectId, testId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tests.detail(String(variables.testId)),
      });
    },
  });
}

/**
 * Hook to generate test code from plan
 */
export function useGenerateCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['tests:generateCode'],
    mutationFn: ({
      projectId,
      testId,
      force,
    }: {
      projectId: string | number;
      testId: string | number;
      force?: boolean;
    }) => testsService.generateCode(projectId, testId, force),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tests.detail(String(variables.testId)),
      });
    },
  });
}

/**
 * Hook to validate test code
 */
export function useValidateCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['tests:validateCode'],
    mutationFn: ({ projectId, testId }: { projectId: string | number; testId: string | number }) =>
      testsService.validateCode(projectId, testId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tests.detail(String(variables.testId)),
      });
    },
  });
}
