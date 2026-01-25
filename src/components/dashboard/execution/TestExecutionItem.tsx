import { Square, RotateCw } from 'lucide-react';
import type { ExecutionStatus } from '@/types/models';
import { TEST_EXECUTION_STATUS_CONFIG } from '@/constants/ui';

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
  const config = TEST_EXECUTION_STATUS_CONFIG[status];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-medium text-gray-900 dark:text-white">{name}</h4>
          <div className="mt-1 flex items-center space-x-2">
            <span className={`rounded px-2 py-0.5 text-xs font-medium ${config.color}`}>
              {config.label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {duration > 0 ? `${duration.toFixed(1)}s` : '-'}
            </span>
          </div>
        </div>
        <div className="ml-4 flex items-center space-x-2">
          {status === 'running' && (
            <button
              onClick={() => onStop(id)}
              className="rounded p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              title="Stop test"
            >
              <Square className="h-4 w-4" />
            </button>
          )}
          {(status === 'failed' || status === 'stopped') && (
            <button
              onClick={() => onRetry(id)}
              className="rounded p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
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
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-3 rounded border border-red-200 bg-red-50 p-2 text-xs text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
