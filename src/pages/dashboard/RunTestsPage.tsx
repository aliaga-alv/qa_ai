import { useState, useEffect } from 'react';
import { Play, StopCircle, Eye, EyeOff, RotateCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTests } from '@/hooks/api/useTests';
import { useBulkRunTests } from '@/hooks/api/useTestRuns';
import { useProjectStore } from '@/stores/projectStore';
import TestSelector from '../../components/dashboard/execution/TestSelector';
import TestExecutionItem from '../../components/dashboard/execution/TestExecutionItem';
import LiveLogsViewer from '../../components/dashboard/execution/LiveLogsViewer';
import type { ExecutingTest, LogEntry, ExecutionStatus } from '@/types/models';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export default function RunTestsPage() {
  const { selectedProject } = useProjectStore();
  const {
    data: testsData = { data: [], pagination: {} },
    isLoading,
    error,
  } = useTests(selectedProject?.id || '', undefined);
  const bulkRunMutation = useBulkRunTests();

  // Access the tests array from paginated response
  const tests = testsData?.data || [];

  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [executingTests, setExecutingTests] = useState<ExecutingTest[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [executionMode, setExecutionMode] = useState<'sequential' | 'parallel'>('sequential');

  // Simulate test execution
  useEffect(() => {
    if (!isRunning || executingTests.length === 0) return;

    const interval = setInterval(() => {
      setExecutingTests((prev) => {
        return prev.map((test) => {
          if (test.status !== 'running') return test;

          const elapsed = (Date.now() - test.startTime) / 1000;
          const newProgress = Math.min(100, (elapsed / test.duration) * 100);

          // Check if test should complete
          if (newProgress >= 100) {
            const success = Math.random() > 0.1; // 90% success rate
            const newStatus: ExecutionStatus = success ? 'passed' : 'failed';

            addLog(
              success ? 'success' : 'error',
              `Test "${test.name}" ${success ? 'passed' : 'failed'}`
            );

            return {
              ...test,
              status: newStatus,
              progress: 100,
              duration: elapsed,
              error: success ? undefined : 'Assertion failed: Expected element to be visible',
            };
          }

          return {
            ...test,
            progress: Math.floor(newProgress),
            duration: elapsed,
          };
        });
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, executingTests]);

  // Check if all tests are complete
  useEffect(() => {
    const allComplete =
      isRunning &&
      executingTests.length > 0 &&
      executingTests.every((t) => t.status !== 'running' && t.status !== 'queued');

    if (allComplete) {
      // Use setTimeout to avoid cascading renders
      const timer = setTimeout(() => {
        setIsRunning(false);
        const passed = executingTests.filter((t) => t.status === 'passed').length;
        const failed = executingTests.filter((t) => t.status === 'failed').length;

        toast.success('Test execution completed', {
          description: `${passed} passed, ${failed} failed`,
        });
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [executingTests, isRunning]);

  const addLog = (level: LogEntry['level'], message: string) => {
    setLogs((prev) => [...prev, { timestamp: new Date(), level, message }]);
  };

  const handleRunTests = async () => {
    if (selectedTests.length === 0) {
      toast.error('No tests selected', {
        description: 'Please select at least one test to run',
      });
      return;
    }

    // Prepare tests for UI display
    const testsToRun = selectedTests.map((id) => {
      const test = tests.find((t) => t.id === id)!;
      return {
        id: test.id,
        name: test.name,
        status: 'queued' as ExecutionStatus,
        progress: 0,
        duration: 0,
        startTime: Date.now(),
      };
    });

    setExecutingTests(testsToRun);
    setIsRunning(true);
    setLogs([]);
    addLog('info', `Starting execution of ${testsToRun.length} test(s) in ${executionMode} mode`);

    // Update UI to show running status
    if (executionMode === 'sequential') {
      setExecutingTests((prev) =>
        prev.map((test, index) =>
          index === 0 ? { ...test, status: 'running', startTime: Date.now() } : test
        )
      );
    } else {
      setExecutingTests((prev) =>
        prev.map((test) => ({
          ...test,
          status: 'running',
          startTime: Date.now(),
        }))
      );
    }

    // Trigger actual test runs via API
    if (!selectedProject?.id) {
      addLog('error', 'No project selected');
      setIsRunning(false);
      toast.error('No project selected');
      return;
    }

    try {
      const testIds = selectedTests.map((id) => Number(id));
      await bulkRunMutation.mutateAsync({
        projectId: Number(selectedProject.id),
        testIds,
        parallel: executionMode === 'parallel',
      });

      addLog('success', `Successfully started ${testsToRun.length} test(s)`);
    } catch {
      addLog('error', 'Failed to start tests');
      setIsRunning(false);
      // Update all running/queued tests to failed status
      setExecutingTests((prev) =>
        prev.map((test) =>
          test.status === 'running' || test.status === 'queued'
            ? { ...test, status: 'failed', error: 'Failed to start test execution' }
            : test
        )
      );
    }
  };

  const handleStopAll = () => {
    setExecutingTests((prev) =>
      prev.map((test) =>
        test.status === 'running' || test.status === 'queued'
          ? { ...test, status: 'stopped' }
          : test
      )
    );
    setIsRunning(false);
    addLog('warning', 'Test execution stopped by user');
    toast.info('Execution stopped');
  };

  const handleStopTest = (id: string) => {
    setExecutingTests((prev) =>
      prev.map((test) =>
        test.id === id && test.status === 'running' ? { ...test, status: 'stopped' } : test
      )
    );
    addLog('warning', `Test "${executingTests.find((t) => t.id === id)?.name}" stopped`);
  };

  const handleRetryTest = async (id: string) => {
    const test = executingTests.find((t) => t.id === id);
    if (!test) return;

    if (!selectedProject?.id) {
      toast.error('No project selected');
      return;
    }

    // Update UI to show running status
    setExecutingTests((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: 'running',
              progress: 0,
              startTime: Date.now(),
              error: undefined,
            }
          : t
      )
    );
    addLog('info', `Retrying test "${test.name}"`);

    // Trigger actual test run via API
    try {
      await bulkRunMutation.mutateAsync({
        projectId: Number(selectedProject.id),
        testIds: [Number(id)],
        parallel: false,
      });

      addLog('success', `Successfully started test "${test.name}"`);
      toast.success('Test restarted');
    } catch {
      addLog('error', `Failed to restart test "${test.name}"`);
      // Mark test as failed
      setExecutingTests((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: 'failed', error: 'Failed to start test execution' } : t
        )
      );
    }
  };

  const handleClearCompleted = () => {
    setExecutingTests((prev) =>
      prev.filter((test) => test.status === 'running' || test.status === 'queued')
    );
  };

  const stats = {
    total: executingTests.length,
    running: executingTests.filter((t) => t.status === 'running').length,
    queued: executingTests.filter((t) => t.status === 'queued').length,
    passed: executingTests.filter((t) => t.status === 'passed').length,
    failed: executingTests.filter((t) => t.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Run Tests</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Execute tests and monitor their progress in real-time.
        </p>
      </div>

      {/* No project selected */}
      {!selectedProject && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg font-medium text-gray-900 dark:text-white">No Project Selected</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please select a project from the dropdown to run tests
          </p>
        </div>
      )}

      {/* Loading state */}
      {selectedProject && isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Error state */}
      {selectedProject && error && <ErrorMessage message="Failed to load tests" />}

      {/* Main content */}
      {selectedProject && !isLoading && !error && (
        <>
          {/* Stats */}
          {executingTests.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Running</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.running}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Queued</p>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {stats.queued}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Passed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.passed}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.failed}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Test Selector */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <TestSelector
                  tests={tests}
                  selectedTests={selectedTests}
                  onSelectionChange={setSelectedTests}
                />

                <div className="mt-6 space-y-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Execution Mode
                    </label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setExecutionMode('sequential')}
                        className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          executionMode === 'sequential'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Sequential
                      </button>
                      <button
                        onClick={() => setExecutionMode('parallel')}
                        className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          executionMode === 'parallel'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Parallel
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleRunTests}
                    disabled={isRunning || selectedTests.length === 0}
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white transition-all hover:from-green-600 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Play className="h-5 w-5" />
                    <span>Run Selected Tests</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Execution Monitor */}
            <div className="space-y-4 lg:col-span-2">
              {executingTests.length > 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Execution Monitor
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowLogs(!showLogs)}
                        className="flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        {showLogs ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{showLogs ? 'Hide' : 'Show'} Logs</span>
                      </button>
                      <button
                        onClick={handleClearCompleted}
                        className="flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <RotateCw className="h-4 w-4" />
                        <span>Clear</span>
                      </button>
                      {isRunning && (
                        <button
                          onClick={handleStopAll}
                          className="flex items-center space-x-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                        >
                          <StopCircle className="h-4 w-4" />
                          <span>Stop All</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {executingTests.map((test) => (
                      <TestExecutionItem
                        key={test.id}
                        id={test.id}
                        name={test.name}
                        status={test.status}
                        progress={test.progress}
                        duration={test.duration}
                        error={test.error}
                        onStop={handleStopTest}
                        onRetry={handleRetryTest}
                      />
                    ))}
                  </div>

                  <LiveLogsViewer
                    logs={logs}
                    isOpen={showLogs}
                    onClose={() => setShowLogs(false)}
                  />
                </>
              )}

              {executingTests.length === 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-12 dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-center">
                    <Play className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Select tests from the left panel and click "Run Selected Tests" to start
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
