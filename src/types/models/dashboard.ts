/**
 * Dashboard-related type definitions
 */

// User roles and permissions
export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';

// Project-related types
export type ProjectStatus = 'active' | 'archived';

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  status: ProjectStatus;
  testsCount: number;
  lastTestRun?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TestType = 'api' | 'ui' | 'integration' | 'unit';
export type TestStatus = 'active' | 'inactive' | 'draft';
export type ExecutionStatus =
  | 'pending'
  | 'queued'
  | 'running'
  | 'passed'
  | 'failed'
  | 'cancelled'
  | 'stopped';
export type TestRunStatus = 'passed' | 'failed' | 'running';

// Test-related types
export interface Test {
  id: string;
  name: string;
  description: string;
  type?: TestType; // Optional - may not be in API response
  status: TestStatus;
  
  // Frontend-formatted fields (camelCase)
  lastRun?: Date;
  duration?: number;
  successRate?: number;
  createdAt?: Date; // Optional - may be missing or need transformation
  
  // Backend fields (snake_case) - from API response
  specification?: string;
  plan_json?: string;
  test_code?: string;
  priority?: 'low' | 'medium' | 'high';
  is_active?: boolean;
  tags: string[]; // Can be empty array but should always exist
  
  // Statistics fields
  run_count?: number;
  pass_count?: number;
  fail_count?: number;
  last_run_at?: string;
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
  created_by_id?: string;
  project_id?: string;
  
  // Detailed fields (only in detail endpoint)
  steps?: unknown[];
  recent_runs?: Array<{
    id: string;
    status: string;
    duration_seconds: number;
    started_at: string;
    completed_at?: string;
    environment?: string;
    error_message?: string;
  }>;
}

// Simplified test for selectors/lists
export interface TestSimple {
  id: string;
  name: string;
  type: string;
  duration: number;
}

export interface TestRun {
  id: string;
  status: TestRunStatus;
  duration: number;
  timestamp: Date;
  environment: string;
  errors?: string;
}

export interface ExecutingTest {
  id: string;
  name: string;
  status: ExecutionStatus;
  progress: number;
  duration: number; // Required, always has a value
  error?: string;
  startTime: number;
}

export interface TestExecution {
  id: string;
  testName: string;
  status: 'passed' | 'failed' | 'running' | 'stopped';
  duration: number;
  timestamp: Date;
  environment: string;
  triggeredBy: string;
  passedSteps?: number;
  totalSteps?: number;
  hasScreenshots?: boolean;
  hasVideo?: boolean;
  errorCount?: number;
  error?: string;
}

// Team-related types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastActive: Date;
  testsRun: number;
  status: 'active' | 'pending';
}

// Log-related types
export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'success' | 'error' | 'warning';
  message: string;
}

export interface ExecutionDetail {
  id: string;
  testName: string;
  status: ExecutionStatus;
  duration: number;
  timestamp: Date;
  environment: string;
  triggeredBy: string;
  logs: LogEntry[];
  errors: string[];
  screenshots: string[];
  videoUrl?: string;
  config: Record<string, string | number>;
}

// Quick actions
export interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  onClick: () => void;
}
