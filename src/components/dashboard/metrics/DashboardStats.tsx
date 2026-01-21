import { TestTube2, CheckCircle, Clock, AlertCircle, TrendingUp, Target } from 'lucide-react';
import MetricCard from './MetricCard';

// TODO: Replace with real API data
const mockStats = {
  totalTests: {
    value: 1247,
    trend: { value: 12, isPositive: true, period: 'last week' },
  },
  successRate: {
    value: '94.2%',
    trend: { value: 2.4, isPositive: true, period: 'last week' },
  },
  avgDuration: {
    value: '2.4s',
    trend: { value: -8.5, isPositive: true, period: 'last week' },
  },
  activeTests: {
    value: 3,
    trend: undefined,
  },
  failedTests: {
    value: 24,
    trend: { value: -15, isPositive: true, period: 'last week' },
  },
  testCoverage: {
    value: '87%',
    trend: { value: 5, isPositive: true, period: 'last month' },
  },
};

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Total Tests"
        value={mockStats.totalTests.value.toLocaleString()}
        icon={TestTube2}
        trend={mockStats.totalTests.trend}
        iconColor="text-primary-600 dark:text-primary-400"
        iconBgColor="bg-primary-100 dark:bg-primary-900/20"
      />
      <MetricCard
        title="Success Rate"
        value={mockStats.successRate.value}
        icon={CheckCircle}
        trend={mockStats.successRate.trend}
        iconColor="text-green-600 dark:text-green-400"
        iconBgColor="bg-green-100 dark:bg-green-900/20"
      />
      <MetricCard
        title="Avg Duration"
        value={mockStats.avgDuration.value}
        icon={Clock}
        trend={mockStats.avgDuration.trend}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBgColor="bg-blue-100 dark:bg-blue-900/20"
      />
      <MetricCard
        title="Active Tests"
        value={mockStats.activeTests.value}
        icon={TrendingUp}
        trend={mockStats.activeTests.trend}
        iconColor="text-orange-600 dark:text-orange-400"
        iconBgColor="bg-orange-100 dark:bg-orange-900/20"
      />
      <MetricCard
        title="Failed Tests"
        value={mockStats.failedTests.value}
        icon={AlertCircle}
        trend={mockStats.failedTests.trend}
        iconColor="text-red-600 dark:text-red-400"
        iconBgColor="bg-red-100 dark:bg-red-900/20"
      />
      <MetricCard
        title="Test Coverage"
        value={mockStats.testCoverage.value}
        icon={Target}
        trend={mockStats.testCoverage.trend}
        iconColor="text-purple-600 dark:text-purple-400"
        iconBgColor="bg-purple-100 dark:bg-purple-900/20"
      />
    </div>
  );
}
