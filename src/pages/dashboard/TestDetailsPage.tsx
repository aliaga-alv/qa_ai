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
  AlertCircle,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'sonner';
import type { TestRunStatus } from '@/types/models/dashboard';
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
import { TEST_STATUS_COLORS, TEST_LIST_STATUS_COLORS } from '@/constants/ui';
import { useProjectStore } from '@/stores/projectStore';
import { useTest, useDeleteTest, useDuplicateTest, useGeneratePlan, useGenerateCode, useValidateCode } from '@/hooks/api/useTests';
import { useTriggerTestRun } from '@/hooks/api/useTestRuns';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const statusIcons = {
  passed: CheckCircle,
  failed: XCircle,
  running: Clock,
};

export default function TestDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProject } = useProjectStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'runs' | 'config'>('overview');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch test data
  const { data: test, isLoading, isError } = useTest(selectedProject?.id || '', id || '');

  // Mutations
  const triggerTestRunMutation = useTriggerTestRun();
  const deleteTestMutation = useDeleteTest();
  const duplicateTestMutation = useDuplicateTest();
  const generatePlanMutation = useGeneratePlan();
  const generateCodeMutation = useGenerateCode();
  const validateCodeMutation = useValidateCode();

  const handleRunTest = async () => {
    if (!id) return;

    try {
      await triggerTestRunMutation.mutateAsync({
        testId: id,
      });
    } catch (error) {
      // Error toast is handled by mutation
      console.error('Failed to run test:', error);
    }
  };

  const handleEditTest = () => {
    navigate(`/dashboard/tests/${id}/edit`);
  };

  const handleDuplicateTest = async () => {
    if (!selectedProject?.id || !id) return;

    try {
      await duplicateTestMutation.mutateAsync({
        projectId: selectedProject.id,
        testId: id,
        newName: `${test?.name || 'Test'} (Copy)`,
      });
    } catch (error) {
      // Error toast is handled by mutation
      console.error('Failed to duplicate test:', error);
    }
  };

  const handleDeleteTest = async () => {
    setIsDeleteDialogOpen(false);

    if (!selectedProject?.id || !id) return;

    try {
      await deleteTestMutation.mutateAsync({
        projectId: selectedProject.id,
        testId: id,
      });

      toast.success('Test deleted successfully');
      navigate('/dashboard/tests');
    } catch (error) {
      // Error toast is handled by mutation
      console.error('Failed to delete test:', error);
    }
  };

  const handleGeneratePlan = async () => {
    if (!selectedProject?.id || !id) return;

    if (!test?.specification) {
      toast.error('Please add a specification first', {
        description: 'Go to Edit to add a test specification',
      });
      return;
    }

    try {
      await generatePlanMutation.mutateAsync({
        projectId: selectedProject.id,
        testId: id,
      });
      toast.success('Test plan generated successfully');
    } catch (error) {
      toast.error('Failed to generate test plan');
      console.error('Failed to generate plan:', error);
    }
  };

  const handleGenerateCode = async () => {
    if (!selectedProject?.id || !id) return;

    if (!test?.plan_json) {
      toast.error('Please generate a test plan first', {
        description: 'Use the "Generate Plan" button to create a test plan',
      });
      return;
    }

    try {
      await generateCodeMutation.mutateAsync({
        projectId: selectedProject.id,
        testId: id,
      });
      toast.success('Test code generated successfully');
    } catch (error) {
      toast.error('Failed to generate test code');
      console.error('Failed to generate code:', error);
    }
  };

  const handleValidateCode = async () => {
    if (!selectedProject?.id || !id) return;

    if (!test?.test_code) {
      toast.error('No test code to validate', {
        description: 'Please generate test code first',
      });
      return;
    }

    try {
      await validateCodeMutation.mutateAsync({
        projectId: selectedProject.id,
        testId: id,
      });
      toast.success('Test code validated successfully');
    } catch (error) {
      toast.error('Failed to validate test code');
      console.error('Failed to validate code:', error);
    }
  };

  if (!selectedProject) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Please select a project first</p>
          <button
            onClick={() => navigate('/dashboard/tests')}
            className="mt-4 text-primary-600 hover:underline dark:text-primary-400"
          >
            Go back to tests
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !test) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Test not found</p>
          <button
            onClick={() => navigate('/dashboard/tests')}
            className="mt-4 text-primary-600 hover:underline dark:text-primary-400"
          >
            Go back to tests
          </button>
        </div>
      </div>
    );
  }

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
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                  test.priority === 'high'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : test.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                }`}
              >
                {test.priority === 'high' ? (
                  <AlertCircle className="h-3 w-3" />
                ) : (
                  <Minus className="h-3 w-3" />
                )}
                {test.priority ? test.priority.charAt(0).toUpperCase() + test.priority.slice(1) : 'Medium'} Priority
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                  test.status === 'active'
                    ? TEST_LIST_STATUS_COLORS.active
                    : test.status === 'draft'
                      ? TEST_LIST_STATUS_COLORS.draft
                      : test.status === 'inactive'
                        ? TEST_LIST_STATUS_COLORS.inactive
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' // archived
                }`}
              >
                {test.status ? test.status.charAt(0).toUpperCase() + test.status.slice(1) : 'Unknown'}
              </span>
              {test.is_active && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  Active
                </span>
              )}
            </div>
            <h1 className="break-words text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
              {test.name}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              {test.description}
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
            onClick={() => setIsDeleteDialogOpen(true)}
            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-5">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs font-medium sm:text-sm">Success Rate</span>
            </div>
            {test.run_count && test.run_count > 0 && (
              <span
                className={`text-xs font-medium ${
                  ((test.pass_count || 0) / test.run_count) * 100 >= 90
                    ? 'text-green-600 dark:text-green-400'
                    : ((test.pass_count || 0) / test.run_count) * 100 >= 70
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-red-600 dark:text-red-400'
                }`}
              >
                {((test.pass_count || 0) / test.run_count) * 100 >= 90 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {test.run_count && test.pass_count !== undefined
              ? Math.round((test.pass_count / test.run_count) * 100)
              : 0}
            %
          </p>
          {test.run_count && test.run_count > 0 && (
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-full transition-all ${
                  ((test.pass_count || 0) / test.run_count) * 100 >= 90
                    ? 'bg-green-500'
                    : ((test.pass_count || 0) / test.run_count) * 100 >= 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${Math.round(((test.pass_count || 0) / test.run_count) * 100)}%` }}
              />
            </div>
          )}
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-5">
          <div className="mb-2 flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Play className="h-4 w-4" />
            <span className="text-xs font-medium sm:text-sm">Total Runs</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {test.run_count || 0}
          </p>
          {test.run_count !== undefined && test.run_count > 0 && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <CheckCircle className="h-3 w-3" />
                {test.pass_count || 0}
              </span>
              <span className="text-gray-400">/</span>
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <XCircle className="h-3 w-3" />
                {test.fail_count || 0}
              </span>
            </div>
          )}
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-5">
          <div className="mb-2 flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium sm:text-sm">Avg Duration</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {test.recent_runs && test.recent_runs.length > 0
              ? (
                  test.recent_runs.reduce((sum, run) => sum + (run.duration_seconds || 0), 0) /
                  test.recent_runs.length
                ).toFixed(1)
              : 0}
            s
          </p>
          {test.recent_runs && test.recent_runs.length > 1 && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Range: {Math.min(...test.recent_runs.map((r) => r.duration_seconds || 0)).toFixed(1)}s -{' '}
              {Math.max(...test.recent_runs.map((r) => r.duration_seconds || 0)).toFixed(1)}s
            </p>
          )}
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-5">
          <div className="mb-2 flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-xs font-medium sm:text-sm">Last Run</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {test.last_run_at
              ? formatDistanceToNow(new Date(test.last_run_at), { addSuffix: true })
              : 'Never'}
          </p>
          {test.last_run_at && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(test.last_run_at), 'MMM d, yyyy HH:mm')}
            </p>
          )}
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-5">
          <div className="mb-2 flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <FileText className="h-4 w-4" />
            <span className="text-xs font-medium sm:text-sm">Created</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {test.created_at ? formatDistanceToNow(new Date(test.created_at), { addSuffix: true }) : 'Unknown'}
          </p>
          {test.created_at && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(test.created_at), 'MMM d, yyyy')}
            </p>
          )}
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Test Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <Tag className="h-5 w-5" />
              Test Information
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Priority
                </span>
                <div className="mt-1.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      test.priority === 'high'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : test.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {test.priority ? test.priority.charAt(0).toUpperCase() + test.priority.slice(1) : 'Medium'}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </span>
                <div className="mt-1.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      test.status === 'active'
                        ? TEST_LIST_STATUS_COLORS.active
                        : test.status === 'draft'
                          ? TEST_LIST_STATUS_COLORS.draft
                          : test.status === 'inactive'
                            ? TEST_LIST_STATUS_COLORS.inactive
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' // archived
                    }`}
                  >
                    {test.status ? test.status.charAt(0).toUpperCase() + test.status.slice(1) : 'Unknown'}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Active State
                </span>
                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      test.is_active
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {test.is_active ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3" />
                        Inactive
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Tags
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {test.tags && test.tags.length > 0 ? (
                    test.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">No tags</span>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Timestamps
                </span>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Created:</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {test.created_at ? format(new Date(test.created_at), 'MMM d, yyyy') : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Updated:</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {test.updated_at ? format(new Date(test.updated_at), 'MMM d, yyyy') : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specification */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <FileText className="h-5 w-5" />
                Specification
              </h3>
              {test.specification && !test.plan_json && (
                <button
                  onClick={handleGeneratePlan}
                  disabled={generatePlanMutation.isPending}
                  className="flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                >
                  {generatePlanMutation.isPending ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Settings className="h-3.5 w-3.5" />
                      Generate Plan
                    </>
                  )}
                </button>
              )}
            </div>
            {test.specification ? (
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {test.specification}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 dark:border-gray-600">
                <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  No specification provided
                </p>
              </div>
            )}
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
        <div className="space-y-6">
          {/* Test Code */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                <Code className="h-5 w-5" />
                Test Code
              </h3>
              <div className="flex items-center gap-2">
                {test.test_code ? (
                  <>
                    <button
                      onClick={handleValidateCode}
                      disabled={validateCodeMutation.isPending}
                      className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                    >
                      {validateCodeMutation.isPending ? (
                        <>
                          <LoadingSpinner size="sm" />
                          Validating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3.5 w-3.5" />
                          Validate
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(test.test_code || '');
                        toast.success('Code copied to clipboard');
                      }}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </button>
                  </>
                ) : (
                  test.plan_json && (
                    <button
                      onClick={handleGenerateCode}
                      disabled={generateCodeMutation.isPending}
                      className="flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                    >
                      {generateCodeMutation.isPending ? (
                        <>
                          <LoadingSpinner size="sm" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Code className="h-3.5 w-3.5" />
                          Generate Code
                        </>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
            {test.test_code ? (
              <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
                <pre className="max-w-full overflow-x-auto p-4 text-xs leading-relaxed text-gray-100 sm:text-sm">
                  <code className="whitespace-pre-wrap break-words font-mono sm:whitespace-pre">
                    {test.test_code}
                  </code>
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 dark:border-gray-600">
                <Code className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                <p className="mt-3 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                  No test code generated yet
                </p>
                <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-500">
                  {test.plan_json
                    ? 'Click "Generate Code" to create test code from the plan'
                    : test.specification
                      ? 'Generate a test plan first, then generate code'
                      : 'Add a specification to start AI code generation'}
                </p>
                {test.plan_json && (
                  <button
                    onClick={handleGenerateCode}
                    disabled={generateCodeMutation.isPending}
                    className="mt-4 flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                  >
                    {generateCodeMutation.isPending ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Generating Code...
                      </>
                    ) : (
                      <>
                        <Code className="h-4 w-4" />
                        Generate Code
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Plan JSON (if available) */}
          {test.plan_json && (
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                  <Settings className="h-5 w-5" />
                  Test Plan
                </h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(test.plan_json, null, 2));
                    toast.success('Plan copied to clipboard');
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
                <pre className="max-w-full overflow-x-auto p-4 text-xs leading-relaxed text-gray-100 sm:text-sm">
                  <code className="whitespace-pre-wrap break-words font-mono sm:whitespace-pre">
                    {JSON.stringify(test.plan_json, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          )}
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
                {test.recent_runs && test.recent_runs.length > 0 ? (
                  test.recent_runs.map((run) => {
                    const StatusIcon = statusIcons[run.status as TestRunStatus];
                    return (
                      <tr
                        key={run.id}
                        className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      >
                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                            <span
                              className={`flex items-center space-x-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium sm:px-2.5 sm:py-1 ${TEST_STATUS_COLORS[run.status as TestRunStatus]}`}
                            >
                              <StatusIcon className="h-3 w-3 flex-shrink-0" />
                              <span className="capitalize">{run.status}</span>
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400 sm:hidden">
                              {(run.duration_seconds || 0).toFixed(1)}s
                            </span>
                          </div>
                        </td>
                        <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-900 dark:text-white sm:table-cell">
                          {(run.duration_seconds || 0).toFixed(1)}s
                        </td>
                        <td className="hidden px-4 py-4 text-sm capitalize text-gray-900 dark:text-white md:table-cell">
                          {run.environment || 'default'}
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-600 dark:text-gray-400 sm:px-4 sm:py-4 sm:text-sm">
                          <div className="flex flex-col gap-0.5">
                            <span className="whitespace-nowrap">
                              {formatDistanceToNow(new Date(run.started_at), {
                                addSuffix: true,
                              })}
                            </span>
                            <span className="text-xs capitalize text-gray-500 dark:text-gray-500 md:hidden">
                              {run.environment || 'default'}
                            </span>
                          </div>
                        </td>
                        <td className="hidden px-4 py-4 text-sm text-red-600 dark:text-red-400 lg:table-cell">
                          {run.error_message || '-'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No test runs yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Configuration */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <Settings className="h-5 w-5" />
              Basic Configuration
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Priority Level
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      test.priority === 'high'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : test.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {test.priority ? test.priority.charAt(0).toUpperCase() + test.priority.slice(1) : 'Medium'}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Test Status
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      test.status === 'active'
                        ? TEST_LIST_STATUS_COLORS.active
                        : test.status === 'draft'
                          ? TEST_LIST_STATUS_COLORS.draft
                          : test.status === 'inactive'
                            ? TEST_LIST_STATUS_COLORS.inactive
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' // archived
                    }`}
                  >
                    {test.status ? test.status.charAt(0).toUpperCase() + test.status.slice(1) : 'Unknown'}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active State
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      test.is_active
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {test.is_active ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3" />
                        Inactive
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Metadata */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <FileText className="h-5 w-5" />
              Test Metadata
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Test ID
                </span>
                <p className="mt-1 break-all font-mono text-xs text-gray-900 dark:text-white">
                  {test.id}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Tags
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {test.tags && test.tags.length > 0 ? (
                    test.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">No tags</span>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <span className="block text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Specification
                </span>
                <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                  {test.specification || 'No specification provided'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteTest}
        title="Delete Test"
        message={`Are you sure you want to delete "${test.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
