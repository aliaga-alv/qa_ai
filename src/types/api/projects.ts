/**
 * Projects API request/response types
 */

import type { PaginatedResponse, PaginationParams, FilterParams } from './common';

// ============== Types ==============

// Backend API response type (snake_case)
export interface ProjectApiResponse {
  id: number;
  name: string;
  description: string;
  url: string;
  owner_id: number;
  team_id: number | null;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

// Frontend domain model (camelCase)
export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  status: 'active' | 'archived';
  testsCount: number;
  lastTestRun?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============== Requests ==============

export interface CreateProjectRequest {
  name: string;
  description: string;
  url: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  url?: string;
  status?: 'active' | 'archived';
}

export interface ProjectListParams extends PaginationParams, FilterParams {
  status?: 'active' | 'archived';
}

// ============== Responses ==============

export interface ProjectResponse {
  project: Project;
}

export type ProjectListResponse = PaginatedResponse<Project>;

export interface ProjectTestsResponse {
  tests: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
  }>;
}

export interface ProjectStatsResponse {
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalTests: number;
    totalRuns: number;
  };
}
