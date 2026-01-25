import { CheckCircle, XCircle, Clock, AlertTriangle, Image, Video } from 'lucide-react';
import { format } from 'date-fns';
import type { TestExecution } from '@/types/models';
import { HISTORY_STATUS_CONFIG } from '@/constants/ui';

interface HistoryListItemProps {
  execution: TestExecution;
  onSelect: (id: string) => void;
}

const statusIcons = {
  passed: CheckCircle,
  failed: XCircle,
  running: Clock,
  stopped: AlertTriangle,
};

export default function HistoryListItem({ execution, onSelect }: HistoryListItemProps) {
  const config = HISTORY_STATUS_CONFIG[execution.status];
  const StatusIcon = statusIcons[execution.status];

  return (
    <tr
      onClick={() => onSelect(execution.id)}
      className="cursor-pointer border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <span
            className={`flex items-center space-x-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg}`}
          >
            <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
            <span className={config.color}>{config.label}</span>
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{execution.testName}</p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{execution.environment}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
        {execution.duration.toFixed(2)}s
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm text-gray-900 dark:text-white">
            {format(execution.timestamp, 'MMM d, yyyy')}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {format(execution.timestamp, 'HH:mm:ss')}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
        {execution.triggeredBy}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          {execution.hasScreenshots && (
            <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
              <Image className="h-3.5 w-3.5" />
            </div>
          )}
          {execution.hasVideo && (
            <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
              <Video className="h-3.5 w-3.5" />
            </div>
          )}
          {execution.errorCount !== undefined && execution.errorCount > 0 && (
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {execution.errorCount} error{execution.errorCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}
