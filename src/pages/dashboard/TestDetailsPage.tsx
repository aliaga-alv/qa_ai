import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Play,
  Edit,
  Copy,
  Trash2,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Tag,
  Code,
  Settings,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockTestDetailTrendData } from '@/mocks/charts';
import { mockTestDetail, mockTestRuns } from '@/mocks';
import { TEST_STATUS_COLORS } from '@/constants/ui';

// TODO: Replace with real API data

const statusIcons = {
  passed: CheckCircle,
  failed: XCircle,
  running: Clock,
};

export default function TestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'runs' | 'config'>('overview');
  const mockTest = mockTestDetail;
  const mockRuns = mockTestRuns;
  const handleRunTest = () => {
    toast.success('Test execution started', {
      description: `Running test: ${mockTest.name}`,
    });
  };

  const handleEditTest = () => {
    navigate(`/dashboard/tests/${id}/edit`);
  };

  const handleDuplicateTest = () => {
    toast.success('Test duplicated', {
      description: 'A copy of this test has been created.',
    });
  };

  const handleDeleteTest = () => {
    toast.success('Test deleted', {
      description: 'The test has been removed from your test suite.',
    });
    navigate('/dashboard/tests');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-2 sm:gap-4">
          <button
            onClick={() => navigate('/dashboard/tests')}
            className="flex-shrink-0 rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 sm:p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="break-words text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
              {mockTest.name}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              {mockTest.description}
            </p>
          </div>
        </div>
        <div className="ml-9 flex items-center gap-2 sm:ml-14">
          <button
            onClick={handleRunTest}
            className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 sm:flex-initial sm:space-x-2 sm:px-4 sm:text-base"
          >
            <Play className="h-4 w-4" />
            <span className="hidden sm:inline">Run Test</span>
            <span className="sm:hidden">Run</span>
          </button>
          <button
            onClick={handleEditTest}
            className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 sm:flex-initial sm:space-x-2 sm:px-4 sm:text-base"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDuplicateTest}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            title="Duplicate"
          >
            <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={handleDeleteTest}
            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800 sm:p-4">
          <div className="mb-1 flex items-center space-x-1.5 text-gray-600 dark:text-gray-400 sm:space-x-2">
            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Success Rate</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            {mockTest.successRate}%
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800 sm:p-4">
          <div className="mb-1 flex items-center space-x-1.5 text-gray-600 dark:text-gray-400 sm:space-x-2">
            <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Total Runs</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            {mockTest.totalRuns}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800 sm:p-4">
          <div className="mb-1 flex items-center space-x-1.5 text-gray-600 dark:text-gray-400 sm:space-x-2">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Avg Duration</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            {mockTest.avgDuration}s
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800 sm:p-4">
          <div className="mb-1 flex items-center space-x-1.5 text-gray-600 dark:text-gray-400 sm:space-x-2">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Last Run</span>
          </div>
          <p className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
            {formatDistanceToNow(mockTest.lastRun, { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto border-b border-gray-200 dark:border-gray-700">
        <nav className="flex min-w-max space-x-4 sm:space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Tag },
            { id: 'code', label: 'Code', icon: Code },
            { id: 'runs', label: 'Recent Runs', icon: Play },
            { id: 'config', label: 'Configuration', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center space-x-1.5 whitespace-nowrap border-b-2 pb-2.5 transition-colors sm:space-x-2 sm:pb-3 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-sm font-medium sm:text-base">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Test Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Test Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                <p className="text-sm font-medium uppercase text-gray-900 dark:text-white">
                  {mockTest.type}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <p className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                  {mockTest.status}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Tags</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {mockTest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(mockTest.createdAt, 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated</span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(mockTest.updatedAt, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Trend */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Performance Trend (7 days)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockTestDetailTrendData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-700"
                />
                <XAxis dataKey="date" stroke="currentColor" className="text-gray-400" />
                <YAxis stroke="currentColor" className="text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(31 41 55)',
                    border: '1px solid rgb(75 85 99)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Duration (s)"
                />
                <Line
                  type="monotone"
                  dataKey="success"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Success Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
            Test Code
          </h3>
          <div className="overflow-hidden rounded-lg bg-gray-900">
            <pre className="max-w-full overflow-x-auto p-3 text-xs text-gray-100 sm:p-4 sm:text-sm">
              <code className="whitespace-pre-wrap break-words sm:whitespace-pre">
                {mockTest.code}
              </code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === 'runs' && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 p-4 dark:border-gray-700 sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
              Recent Runs
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 sm:px-4">
                    Status
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 sm:table-cell">
                    Duration
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 md:table-cell">
                    Environment
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 sm:px-4">
                    Timestamp
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 lg:table-cell">
                    Error
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockRuns.map((run) => {
                  const StatusIcon = statusIcons[run.status];
                  return (
                    <tr
                      key={run.id}
                      className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <td className="px-3 py-3 sm:px-4 sm:py-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                          <span
                            className={`flex items-center space-x-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium sm:px-2.5 sm:py-1 ${TEST_STATUS_COLORS[run.status]}`}
                          >
                            <StatusIcon className="h-3 w-3 flex-shrink-0" />
                            <span className="capitalize">{run.status}</span>
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 sm:hidden">
                            {run.duration.toFixed(1)}s
                          </span>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-900 dark:text-white sm:table-cell">
                        {run.duration.toFixed(1)}s
                      </td>
                      <td className="hidden px-4 py-4 text-sm capitalize text-gray-900 dark:text-white md:table-cell">
                        {run.environment}
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600 dark:text-gray-400 sm:px-4 sm:py-4 sm:text-sm">
                        <div className="flex flex-col gap-0.5">
                          <span className="whitespace-nowrap">
                            {formatDistanceToNow(run.timestamp, {
                              addSuffix: true,
                            })}
                          </span>
                          <span className="text-xs capitalize text-gray-500 dark:text-gray-500 md:hidden">
                            {run.environment}
                          </span>
                        </div>
                      </td>
                      <td className="hidden px-4 py-4 text-sm text-red-600 dark:text-red-400 lg:table-cell">
                        {run.errors || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
            Test Configuration
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(mockTest.config).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col justify-between gap-1 border-b border-gray-200 py-2 last:border-0 dark:border-gray-700 sm:flex-row sm:items-center sm:gap-4 sm:py-3"
              >
                <span className="text-sm font-medium capitalize text-gray-600 dark:text-gray-400">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="break-all font-mono text-sm text-gray-900 dark:text-white">
                  {typeof value === 'number' ? value : `"${value}"`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
