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
} from '@/types/api/projects';

export const projectsService = {
  /**
   * Get list of projects with optional filters
   */
  async list(params?: ProjectListParams): Promise<ProjectListResponse> {
    const response = await apiClient.get<ProjectListResponse>(API_PROJECTS.LIST, { params });
    return response.data;
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
    const response = await apiClient.post<ProjectResponse>(API_PROJECTS.CREATE, data);
    return response.data.project;
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
