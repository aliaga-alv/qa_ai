import { X, Terminal, Image, Video, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { ExecutionDetail } from '@/types/models';
import { LOG_LEVEL_COLORS } from '@/constants/ui';

interface ExecutionDetailsModalProps {
  execution: ExecutionDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExecutionDetailsModal({
  execution,
  isOpen,
  onClose,
}: ExecutionDetailsModalProps) {
  if (!isOpen || !execution) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-5xl rounded-xl bg-white shadow-xl dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {execution.testName}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Executed on {format(execution.timestamp, 'MMM d, yyyy HH:mm:ss')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[70vh] overflow-y-auto p-6">
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Execution Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Execution Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                    <span className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                      {execution.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {execution.duration.toFixed(2)}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Environment</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {execution.environment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Triggered By</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {execution.triggeredBy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Configuration */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Configuration
                </h3>
                <div className="space-y-2">
                  {Object.entries(execution.config).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm capitalize text-gray-600 dark:text-gray-400">
                        {key}
                      </span>
                      <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                        {typeof value === 'number' ? value : `"${value}"`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Errors */}
            {execution.errors.length > 0 && (
              <div className="mb-6">
                <div className="mb-3 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Errors ({execution.errors.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {execution.errors.map((error, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20"
                    >
                      <p className="font-mono text-sm text-red-800 dark:text-red-300">{error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Logs */}
            <div className="mb-6">
              <div className="mb-3 flex items-center space-x-2">
                <Terminal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Execution Logs
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto rounded-lg bg-gray-900 p-4 font-mono text-xs">
                {execution.logs.map((log, index) => (
                  <div key={index} className="mb-1 flex space-x-3">
                    <span className="flex-shrink-0 text-gray-500">
                      {format(log.timestamp, 'HH:mm:ss.SSS')}
                    </span>
                    <span className={`flex-shrink-0 ${LOG_LEVEL_COLORS[log.level]} uppercase`}>
                      [{log.level}]
                    </span>
                    <span className="break-all text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            {execution.screenshots.length > 0 && (
              <div className="mb-6">
                <div className="mb-3 flex items-center space-x-2">
                  <Image className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Screenshots ({execution.screenshots.length})
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {execution.screenshots.map((_, index) => (
                    <div
                      key={index}
                      className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    >
                      Screenshot {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {execution.videoUrl && (
              <div>
                <div className="mb-3 flex items-center space-x-2">
                  <Video className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Test Recording
                  </h3>
                </div>
                <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                  <div className="text-center">
                    <Video className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Video player coming soon
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
