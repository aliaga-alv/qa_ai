import { Square, RotateCw } from 'lucide-react';

export type ExecutionStatus = 'queued' | 'running' | 'passed' | 'failed' | 'stopped';

interface TestExecutionItemProps {
  id: string;
  name: string;
  status: ExecutionStatus;
  progress: number;
  duration: number;
  error?: string;
  onStop: (id: string) => void;
  onRetry: (id: string) => void;
}

const statusConfig = {
  queued: {
    color: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700',
    label: 'Queued',
  },
  running: {
    color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20',
    label: 'Running',
  },
  passed: {
    color: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
    label: 'Passed',
  },
  failed: {
    color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20',
    label: 'Failed',
  },
  stopped: {
    color: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20',
    label: 'Stopped',
  },
};

export default function TestExecutionItem({
  id,
  name,
  status,
  progress,
  duration,
  error,
  onStop,
  onRetry,
}: TestExecutionItemProps) {
  const config = statusConfig[status];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`px-2 py-0.5 text-xs font-medium rounded ${config.color}`}>
              {config.label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {duration > 0 ? `${duration.toFixed(1)}s` : '-'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {status === 'running' && (
            <button
              onClick={() => onStop(id)}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Stop test"
            >
              <Square className="h-4 w-4" />
            </button>
          )}
          {(status === 'failed' || status === 'stopped') && (
            <button
              onClick={() => onRetry(id)}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
              title="Retry test"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {status === 'running' && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
