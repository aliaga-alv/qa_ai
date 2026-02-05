import { TestTube2, CheckCircle, Clock, AlertCircle, TrendingUp, Target } from 'lucide-react';
import MetricCard from './MetricCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useOverallStatistics } from '@/hooks/api/useAnalytics';
import { mockDashboardStats } from '@/mocks';

export default function DashboardStats() {
  const { data: stats, isLoading, isError } = useOverallStatistics();

  // Use mock data as fallback
  const hasMockData = !stats || isError;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Calculate metrics from API data or use mock
  const metrics = hasMockData
    ? {
        totalTests: mockDashboardStats.totalTests.value.toLocaleString(),
        successRate: mockDashboardStats.successRate.value,
        avgDuration: mockDashboardStats.avgDuration.value,
        activeTests: mockDashboardStats.activeTests.value.toLocaleString(),
        failedTests: mockDashboardStats.failedTests.value.toLocaleString(),
        testCoverage: mockDashboardStats.testCoverage.value,
      }
    : {
        totalTests: stats!.total_tests.toLocaleString(),
        successRate: `${stats!.execution.success_rate.toFixed(1)}%`,
        avgDuration: '0.0s', // Not in current API
        activeTests: stats!.active_tests.toLocaleString(),
        failedTests: stats!.failing_tests.toLocaleString(),
        testCoverage: `${stats!.validation.success_rate.toFixed(1)}%`,
      };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Tests"
        value={metrics.totalTests}
        icon={TestTube2}
        trend={hasMockData ? mockDashboardStats.totalTests.trend : undefined}
        iconColor="text-primary-600 dark:text-primary-400"
        iconBgColor="bg-primary-100 dark:bg-primary-900/20"
      />
      <MetricCard
        title="Success Rate"
        value={metrics.successRate}
        icon={CheckCircle}
        trend={hasMockData ? mockDashboardStats.successRate.trend : undefined}
        iconColor="text-green-600 dark:text-green-400"
        iconBgColor="bg-green-100 dark:bg-green-900/20"
      />
      <MetricCard
        title="Avg Duration"
        value={metrics.avgDuration}
        icon={Clock}
        trend={hasMockData ? mockDashboardStats.avgDuration.trend : undefined}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBgColor="bg-blue-100 dark:bg-blue-900/20"
      />
      <MetricCard
        title="Active Tests"
        value={metrics.activeTests}
        icon={TrendingUp}
        trend={hasMockData ? mockDashboardStats.activeTests.trend : undefined}
        iconColor="text-orange-600 dark:text-orange-400"
        iconBgColor="bg-orange-100 dark:bg-orange-900/20"
      />
      <MetricCard
        title="Total Runs"
        value={hasMockData ? metrics.failedTests : stats!.execution.total_runs.toLocaleString()}
        icon={AlertCircle}
        trend={hasMockData ? mockDashboardStats.failedTests.trend : undefined}
        iconColor="text-red-600 dark:text-red-400"
        iconBgColor="bg-red-100 dark:bg-red-900/20"
      />
      <MetricCard
        title="Test Coverage"
        value={hasMockData ? metrics.testCoverage : `${stats!.validation.success_rate.toFixed(1)}%`}
        icon={Target}
        trend={hasMockData ? mockDashboardStats.testCoverage.trend : undefined}
        iconColor="text-purple-600 dark:text-purple-400"
        iconBgColor="bg-purple-100 dark:bg-purple-900/20"
      />
    </div>
  );
}
