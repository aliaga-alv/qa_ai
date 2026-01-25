import { TestTube2, CheckCircle, Clock, AlertCircle, TrendingUp, Target } from 'lucide-react';
import MetricCard from './MetricCard';
import { mockDashboardStats } from '@/mocks';

// TODO: Replace with real API data

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Tests"
        value={mockDashboardStats.totalTests.value.toLocaleString()}
        icon={TestTube2}
        trend={mockDashboardStats.totalTests.trend}
        iconColor="text-primary-600 dark:text-primary-400"
        iconBgColor="bg-primary-100 dark:bg-primary-900/20"
      />
      <MetricCard
        title="Success Rate"
        value={mockDashboardStats.successRate.value}
        icon={CheckCircle}
        trend={mockDashboardStats.successRate.trend}
        iconColor="text-green-600 dark:text-green-400"
        iconBgColor="bg-green-100 dark:bg-green-900/20"
      />
      <MetricCard
        title="Avg Duration"
        value={mockDashboardStats.avgDuration.value}
        icon={Clock}
        trend={mockDashboardStats.avgDuration.trend}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBgColor="bg-blue-100 dark:bg-blue-900/20"
      />
      <MetricCard
        title="Active Tests"
        value={mockDashboardStats.activeTests.value}
        icon={TrendingUp}
        trend={mockDashboardStats.activeTests.trend}
        iconColor="text-orange-600 dark:text-orange-400"
        iconBgColor="bg-orange-100 dark:bg-orange-900/20"
      />
      <MetricCard
        title="Failed Tests"
        value={mockDashboardStats.failedTests.value}
        icon={AlertCircle}
        trend={mockDashboardStats.failedTests.trend}
        iconColor="text-red-600 dark:text-red-400"
        iconBgColor="bg-red-100 dark:bg-red-900/20"
      />
      <MetricCard
        title="Test Coverage"
        value={mockDashboardStats.testCoverage.value}
        icon={Target}
        trend={mockDashboardStats.testCoverage.trend}
        iconColor="text-purple-600 dark:text-purple-400"
        iconBgColor="bg-purple-100 dark:bg-purple-900/20"
      />
    </div>
  );
}
