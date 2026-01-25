import { Terminal, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { LogEntry } from '@/types/models';
import { LOG_LEVEL_COLORS } from '@/constants/ui';

interface LiveLogsViewerProps {
  logs: LogEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveLogsViewer({ logs, isOpen, onClose }: LiveLogsViewerProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Logs</h3>
        </div>
        <button
          onClick={onClose}
          className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto bg-gray-900 p-4 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No logs yet. Logs will appear here during test execution.
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => (
              <div key={index} className="flex space-x-3">
                <span className="flex-shrink-0 text-gray-500">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <span className={`flex-shrink-0 ${LOG_LEVEL_COLORS[log.level]} uppercase`}>
                  [{log.level}]
                </span>
                <span className="break-all text-gray-300">{log.message}</span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
