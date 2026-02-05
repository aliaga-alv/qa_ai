/**
 * Analytics API request/response types
 */

// Chart data structure for analytics
export interface ChartData {
  label: string;
  value: number;
  date?: string;
}

// ============== Requests ==============

export interface AnalyticsRangeParams {
  startDate?: string;
  endDate?: string;
  period?: 'day' | 'week' | 'month' | 'year';
}

export interface TestTrendsParams extends AnalyticsRangeParams {
  testIds?: string[];
}

// ============== Responses ==============

export interface DashboardStatsResponse {
  total_projects: number;
  total_tests: number;
  active_tests: number;
  passing_tests: number;
  failing_tests: number;
  status_breakdown: {
    draft: number;
    planned: number;
    generated: number;
    passing: number;
    failing: number;
    error: number;
  };
  validation: {
    total: number;
    passed: number;
    failed: number;
    success_rate: number;
    failure_rate: number;
  };
  execution: {
    total_runs: number;
    passed_runs: number;
    failed_runs: number;
    success_rate: number;
  };
  weekly_comparison: {
    tests_created: {
      this_week: number;
      last_week: number;
      change_percent: number;
    };
    validations: {
      this_week: number;
      last_week: number;
      change_percent: number;
    };
    passed_validations: {
      this_week: number;
      last_week: number;
      change_percent: number;
    };
  };
  daily_trends: Array<{
    date: string;
    day: string;
    total: number;
    passed: number;
    failed: number;
  }>;
  top_executed_tests: Array<{
    id: number;
    name: string;
    full_name: string;
    run_count: number;
    validation_count: number;
    total_executions: number;
    pass_rate: number;
    status: string;
  }>;
  test_durations: Array<{
    date: string;
    avg_duration: number;
    p95_duration: number;
  }>;
  generated_at: string;
}

export interface TestTrendsResponse {
  trends: {
    daily: ChartData[];
    weekly: ChartData[];
    monthly: ChartData[];
  };
  summary: {
    totalRuns: number;
    successRate: number;
    averageDuration: number;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
  };
}

export interface PerformanceMetricsResponse {
  metrics: {
    averageResponseTime: number;
    p50: number;
    p95: number;
    p99: number;
    errorRate: number;
    throughput: number;
  };
  history: Array<{
    timestamp: Date;
    responseTime: number;
    errors: number;
  }>;
}

export interface TestExecutionAnalyticsResponse {
  analytics: {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageDuration: number;
    successRate: number;
  };
  timeline: Array<{
    date: string;
    executions: number;
    successes: number;
    failures: number;
  }>;
}
