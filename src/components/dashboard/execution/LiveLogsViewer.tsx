import { Terminal, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { LogEntry } from '../../../types/models';

interface LiveLogsViewerProps {
  logs: LogEntry[];
  isOpen: boolean;
  onClose: () => void;
}

const levelColors = {
  info: 'text-gray-400',
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
};

export default function LiveLogsViewer({ logs, isOpen, onClose }: LiveLogsViewerProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Logs</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="bg-gray-900 p-4 h-96 overflow-y-auto font-mono text-xs">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No logs yet. Logs will appear here during test execution.
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => (
              <div key={index} className="flex space-x-3">
                <span className="text-gray-500 flex-shrink-0">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <span className={`flex-shrink-0 ${levelColors[log.level]} uppercase`}>
                  [{log.level}]
                </span>
                <span className="text-gray-300 break-all">{log.message}</span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
