/**
 * Dashboard-related type definitions
 */

// User roles and permissions
export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';

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
  type: TestType;
  status: TestStatus;
  lastRun?: Date;
  duration?: number;
  successRate?: number;
  tags: string[];
  createdAt: Date;
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
