import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockTestDetailTrendData } from "@/mocks/charts";
import { mockTestDetail, mockTestRuns } from "@/mocks";
import { TEST_STATUS_COLORS } from "@/constants/ui";

// TODO: Replace with real API data

const statusIcons = {
  passed: CheckCircle,
  failed: XCircle,
  running: Clock,
};

export default function TestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "code" | "runs" | "config"
  >("overview");  
  const mockTest = mockTestDetail;
  const mockRuns = mockTestRuns;
  const handleRunTest = () => {
    toast.success("Test execution started", {
      description: `Running test: ${mockTest.name}`,
    });
  };

  const handleEditTest = () => {
    navigate(`/dashboard/tests/${id}/edit`);
  };

  const handleDuplicateTest = () => {
    toast.success("Test duplicated", {
      description: "A copy of this test has been created.",
    });
  };

  const handleDeleteTest = () => {
    toast.success("Test deleted", {
      description: "The test has been removed from your test suite.",
    });
    navigate("/dashboard/tests");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-2 sm:gap-4">
          <button
            onClick={() => navigate("/dashboard/tests")}
            className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white break-words">
              {mockTest.name}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {mockTest.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-9 sm:ml-14">
          <button
            onClick={handleRunTest}
            className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base flex-1 sm:flex-initial"
          >
            <Play className="h-4 w-4" />
            <span className="hidden sm:inline">Run Test</span>
            <span className="sm:hidden">Run</span>
          </button>
          <button
            onClick={handleEditTest}
            className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base flex-1 sm:flex-initial"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDuplicateTest}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Duplicate"
          >
            <Copy className="h-4 sm:h-5 w-4 sm:w-5" />
          </button>
          <button
            onClick={handleDeleteTest}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 sm:h-5 w-4 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <CheckCircle className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            <span className="text-xs sm:text-sm">Success Rate</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {mockTest.successRate}%
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <Play className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            <span className="text-xs sm:text-sm">Total Runs</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {mockTest.totalRuns}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <Clock className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            <span className="text-xs sm:text-sm">Avg Duration</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {mockTest.avgDuration}s
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <Calendar className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            <span className="text-xs sm:text-sm">Last Run</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
            {formatDistanceToNow(mockTest.lastRun, { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <nav className="flex space-x-4 sm:space-x-8 min-w-max">
          {[
            { id: "overview", label: "Overview", icon: Tag },
            { id: "code", label: "Code", icon: Code },
            { id: "runs", label: "Recent Runs", icon: Play },
            { id: "config", label: "Configuration", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center space-x-1.5 sm:space-x-2 pb-2.5 sm:pb-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-sm sm:text-base font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Test Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Type
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white uppercase">
                  {mockTest.type}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Status
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {mockTest.status}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Tags
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {mockTest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Created
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(mockTest.createdAt, "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Last Updated
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(mockTest.updatedAt, "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance Trend (7 days)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockTestDetailTrendData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-700"
                />
                <XAxis
                  dataKey="date"
                  stroke="currentColor"
                  className="text-gray-400"
                />
                <YAxis stroke="currentColor" className="text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgb(31 41 55)",
                    border: "1px solid rgb(75 85 99)",
                    borderRadius: "0.5rem",
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

      {activeTab === "code" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Test Code
          </h3>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <pre className="text-gray-100 p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm max-w-full">
              <code className="break-words whitespace-pre-wrap sm:whitespace-pre">{mockTest.code}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === "runs" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Recent Runs
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Duration
                  </th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Environment
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Timestamp
                  </th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
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
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span
                            className={`flex items-center space-x-1 px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium rounded-full whitespace-nowrap ${TEST_STATUS_COLORS[run.status]}`}
                          >
                            <StatusIcon className="h-3 w-3 flex-shrink-0" />
                            <span className="capitalize">{run.status}</span>
                          </span>
                          <span className="sm:hidden text-xs text-gray-600 dark:text-gray-400">
                            {run.duration.toFixed(1)}s
                          </span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {run.duration.toFixed(1)}s
                      </td>
                      <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-900 dark:text-white capitalize">
                        {run.environment}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex flex-col gap-0.5">
                          <span className="whitespace-nowrap">
                            {formatDistanceToNow(run.timestamp, {
                              addSuffix: true,
                            })}
                          </span>
                          <span className="md:hidden text-xs text-gray-500 dark:text-gray-500 capitalize">
                            {run.environment}
                          </span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-4 py-4 text-sm text-red-600 dark:text-red-400">
                        {run.errors || "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "config" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Test Configuration
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(mockTest.config).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-sm text-gray-900 dark:text-white font-mono break-all">
                  {typeof value === "number" ? value : `"${value}"`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
