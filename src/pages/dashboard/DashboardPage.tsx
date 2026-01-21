import DashboardStats from '../../components/dashboard/metrics/DashboardStats';
import ActivityFeed from '../../components/dashboard/activity/ActivityFeed';
import QuickActions from '../../components/dashboard/actions/QuickActions';
import TestTrendChart from '../../components/dashboard/charts/TestTrendChart';
import TestDistributionChart from '../../components/dashboard/charts/TestDistributionChart';
import DurationChart from '../../components/dashboard/charts/DurationChart';
import TopTestsChart from '../../components/dashboard/charts/TopTestsChart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your testing activity.
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* Test Trend Chart - Full width */}
        <TestTrendChart />

        {/* Two column charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TestDistributionChart />
          <DurationChart />
        </div>

        {/* Top Tests Chart - Full width */}
        <TopTestsChart />
      </div>
    </div>
  );
}
