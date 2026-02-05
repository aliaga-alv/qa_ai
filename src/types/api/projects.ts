/**
 * Projects API request/response types
 */

import type { PaginatedResponse, PaginationParams, FilterParams } from './common';

// ============== Types ==============

export interface Project {
  id: string;
  name: string;
  description: string;
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
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
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
