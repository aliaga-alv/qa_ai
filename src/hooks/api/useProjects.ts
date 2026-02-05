/**
 * Projects API hooks
 * TanStack Query hooks for project operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService } from '@/services/api/projects.service';
import { QUERY_KEYS, MUTATION_KEYS } from '@/constants/query-keys';
import type {
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectListParams,
} from '@/types/api/projects';

/**
 * Hook to fetch list of projects
 */
export function useProjects(params?: ProjectListParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.projects.list(), params],
    queryFn: () => projectsService.list(params),
  });
}

/**
 * Hook to fetch a single project by ID
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.projects.detail(id),
    queryFn: () => projectsService.get(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch tests for a project
 */
export function useProjectTests(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.projects.tests(id),
    queryFn: () => projectsService.getTests(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new project
 */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.projects.create],
    mutationFn: (data: CreateProjectRequest) => projectsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
    },
  });
}

/**
 * Hook to update an existing project
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.projects.update],
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) =>
      projectsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
    },
  });
}

/**
 * Hook to delete a project
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.projects.delete],
    mutationFn: (id: string) => projectsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
    },
  });
}
