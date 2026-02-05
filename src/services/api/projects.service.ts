/**
 * Projects API service
 * Handles all project-related API operations
 */

import apiClient from './client';
import { API_PROJECTS } from '@/constants/api';
import type {
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectListParams,
  ProjectResponse,
  ProjectListResponse,
  ProjectTestsResponse,
  Project,
  ProjectApiResponse,
} from '@/types/api/projects';

/**
 * Transform backend project response to frontend project model
 */
function transformProject(apiProject: ProjectApiResponse): Project {
  return {
    id: String(apiProject.id),
    name: apiProject.name,
    description: apiProject.description,
    url: apiProject.url,
    status: apiProject.status,
    testsCount: 0, // Will be updated when we have the test count endpoint
    createdAt: new Date(apiProject.created_at),
    updatedAt: new Date(apiProject.updated_at),
  };
}

export const projectsService = {
  /**
   * Get list of projects with optional filters
   */
  async list(params?: ProjectListParams): Promise<ProjectListResponse> {
    const response = await apiClient.get<{
      success: number;
      data: Array<{
        projects: ProjectApiResponse[];
        pagination: {
          page: number;
          per_page: number;
          total: number;
          total_pages: number;
        };
      }>;
    }>(API_PROJECTS.LIST, { params });
    
    // Backend returns nested structure: { success: 1, data: [{ projects: [], pagination: {} }] }
    const result = response.data.data[0];
    
    return {
      data: result.projects.map(transformProject),
      pagination: {
        page: result.pagination.page,
        limit: result.pagination.per_page,
        totalPages: result.pagination.total_pages,
        totalItems: result.pagination.total,
        hasNext: result.pagination.page < result.pagination.total_pages,
        hasPrevious: result.pagination.page > 1,
      },
    };
  },

  /**
   * Get a single project by ID
   */
  async get(id: string): Promise<Project> {
    const response = await apiClient.get<ProjectResponse>(API_PROJECTS.GET(id));
    return response.data.project;
  },

  /**
   * Create a new project
   */
  async create(data: CreateProjectRequest): Promise<Project> {
    const response = await apiClient.post<{
      success: number;
      data: ProjectApiResponse[];
    }>(API_PROJECTS.CREATE, data);
    // Backend returns: { success: 1, data: [{...}] }
    return transformProject(response.data.data[0]);
  },

  /**
   * Update an existing project
   */
  async update(id: string, data: UpdateProjectRequest): Promise<Project> {
    const response = await apiClient.patch<ProjectResponse>(API_PROJECTS.UPDATE(id), data);
    return response.data.project;
  },

  /**
   * Delete a project
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_PROJECTS.DELETE(id));
  },

  /**
   * Get tests for a project (use testsService.list instead)
   */
  async getTests(id: string | number): Promise<ProjectTestsResponse> {
    const response = await apiClient.get<ProjectTestsResponse>(`${API_PROJECTS.GET(id)}/tests`);
    return response.data;
  },
};
