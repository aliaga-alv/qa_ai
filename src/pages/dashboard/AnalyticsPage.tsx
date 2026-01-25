import { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DateRangePicker from '../../components/dashboard/analytics/DateRangePicker';
import FlakyTestsList from '../../components/dashboard/analytics/FlakyTestsList';
import AIInsights from '../../components/dashboard/analytics/AIInsights';
import {
  mockReliabilityChartData,
  mockCoverageChartData,
  mockFlakyTestsData,
  mockAnalyticsInsights,
  mockAnalyticsTrendData,
  mockPerformanceData,
} from '@/mocks';
import { mockAnalyticsStats } from '@/mocks/stats';

// TODO: Replace with real API data
const mockTrendData = mockAnalyticsTrendData;
const mockReliabilityData = mockReliabilityChartData;
const mockCoverageData = mockCoverageChartData;
const mockFlakyTests = mockFlakyTestsData;
const mockInsights = mockAnalyticsInsights;

const getInitialDateRange = () => ({
  start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  end: new Date(),
});

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState(getInitialDateRange);
  const [selectedType, setSelectedType] = useState('all');

  const handleExport = () => {
    toast.success('Exporting analytics report', {
      description: 'Your report will download shortly',
    });
  };


  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Deep insights into your test performance and reliability.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            <option value="api">API Tests</option>
            <option value="ui">UI Tests</option>
            <option value="integration">Integration Tests</option>
            <option value="unit">Unit Tests</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {mockAnalyticsStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4"
          >
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <span
                className={`text-sm font-medium ${
                  stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Test Execution Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Test Execution Trends
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={mockTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
            <XAxis dataKey="date" stroke="currentColor" className="text-gray-400" />
            <YAxis stroke="currentColor" className="text-gray-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(31 41 55)',
                border: '1px solid rgb(75 85 99)',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="passed" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Passed" />
            <Area type="monotone" dataKey="failed" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Failed" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Test Reliability */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Test Reliability
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockReliabilityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis type="number" stroke="currentColor" className="text-gray-400" />
              <YAxis type="category" dataKey="name" stroke="currentColor" className="text-gray-400" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(31 41 55)',
                  border: '1px solid rgb(75 85 99)',
                  borderRadius: '0.5rem',
                }}
                formatter={(value: number | undefined) => [`${value ?? 0}%`, 'Reliability']}
              />
              <Bar dataKey="reliability" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis dataKey="date" stroke="currentColor" className="text-gray-400" />
              <YAxis stroke="currentColor" className="text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(31 41 55)',
                  border: '1px solid rgb(75 85 99)',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="avgDuration" stroke="#3b82f6" strokeWidth={2} name="Avg Duration (s)" />
              <Line type="monotone" dataKey="p95Duration" stroke="#f59e0b" strokeWidth={2} name="P95 Duration (s)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Coverage */}
      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Feature Coverage
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {mockCoverageData.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.name}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.coverage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    item.coverage >= 90
                      ? 'bg-green-500'
                      : item.coverage >= 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${item.coverage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <FlakyTestsList tests={mockFlakyTests} />
        <AIInsights insights={mockInsights} />
      </div>
    </div>
  );
}
