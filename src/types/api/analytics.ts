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
  stats: {
    totalTests: number;
    activeTests: number;
    totalRuns: number;
    successRate: number;
    averageDuration: number;
    testsThisMonth: number;
    runsThisMonth: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'test_created' | 'test_run' | 'test_failed' | 'test_passed';
    message: string;
    timestamp: Date;
  }>;
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
