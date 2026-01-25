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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/dashboard/tests")}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {mockTest.name}
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {mockTest.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunTest}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <Play className="h-4 w-4" />
            <span>Run Test</span>
          </button>
          <button
            onClick={handleEditTest}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDuplicateTest}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Copy className="h-5 w-5" />
          </button>
          <button
            onClick={handleDeleteTest}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockTest.successRate}%
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <Play className="h-4 w-4" />
            <span className="text-sm">Total Runs</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockTest.totalRuns}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Avg Duration</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockTest.avgDuration}s
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Last Run</span>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {formatDistanceToNow(mockTest.lastRun, { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Overview", icon: Tag },
            { id: "code", label: "Code", icon: Code },
            { id: "runs", label: "Recent Runs", icon: Play },
            { id: "config", label: "Configuration", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
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
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Test Code
          </h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{mockTest.code}</code>
          </pre>
        </div>
      )}

      {activeTab === "runs" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Runs
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Environment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
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
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-full ${TEST_STATUS_COLORS[run.status]}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            <span className="capitalize">{run.status}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {run.duration.toFixed(1)}s
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white capitalize">
                        {run.environment}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatDistanceToNow(run.timestamp, {
                          addSuffix: true,
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600 dark:text-red-400">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Test Configuration
          </h3>
          <div className="space-y-4">
            {Object.entries(mockTest.config).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-sm text-gray-900 dark:text-white font-mono">
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
