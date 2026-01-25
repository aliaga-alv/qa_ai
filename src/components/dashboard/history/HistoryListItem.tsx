import { CheckCircle, XCircle, Clock, AlertTriangle, Image, Video } from 'lucide-react';
import { format } from 'date-fns';
import type { TestExecution } from '../../../types/models';

interface HistoryListItemProps {
  execution: TestExecution;
  onSelect: (id: string) => void;
}

const statusConfig = {
  passed: {
    icon: CheckCircle,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/20',
    label: 'Passed',
  },
  failed: {
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/20',
    label: 'Failed',
  },
  running: {
    icon: Clock,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    label: 'Running',
  },
  stopped: {
    icon: AlertTriangle,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    label: 'Stopped',
  },
};

export default function HistoryListItem({ execution, onSelect }: HistoryListItemProps) {
  const config = statusConfig[execution.status];
  const StatusIcon = config.icon;

  return (
    <tr
      onClick={() => onSelect(execution.id)}
      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className={`flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${config.bg}`}>
            <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
            <span className={config.color}>{config.label}</span>
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{execution.testName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {execution.environment}
          </p>
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
            <span className="px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">
              {execution.errorCount} error{execution.errorCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}
