import { Play, Edit, MoreVertical, Copy, Trash2, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Test } from '@/types/models';
import { TEST_LIST_STATUS_COLORS } from '@/constants/ui';

interface TestCardProps {
  test: Test;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRun: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TestCard({
  test,
  isSelected,
  onSelect,
  onRun,
  onEdit,
  onDelete,
}: TestCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="border-b border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
      {/* Header with checkbox and actions */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(test.id)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {test.name}
              </h3>
              {test.is_active && (
                <span className="flex-shrink-0 rounded-full bg-green-100 p-0.5 dark:bg-green-900/30">
                  <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                </span>
              )}
            </div>
            <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
              {test.description}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-shrink-0 items-center gap-1">
          <button
            onClick={() => onRun(test.id)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            title="Run test"
          >
            <Play className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(test.id)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            title="Edit test"
          >
            <Edit className="h-4 w-4" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <button
                  onClick={() => {
                    onEdit(test.id);
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center space-x-2 px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(test.id);
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center space-x-2 px-3 py-2 text-left text-xs text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Badges and Tags */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {/* Priority Badge */}
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
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
            <Circle className="h-3 w-3" />
          )}
          {test.priority ? test.priority.charAt(0).toUpperCase() + test.priority.slice(1) : 'Medium'}
        </span>
        
        {/* Status Badge */}
        {test.status && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${TEST_LIST_STATUS_COLORS[test.status]}`}
          >
            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
          </span>
        )}
        
        {/* Tags */}
        {test.tags && test.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
        {test.tags && test.tags.length > 2 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">+{test.tags.length - 2}</span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {/* Run Count */}
        <div>
          <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">Runs</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {test.run_count || 0}
          </div>
          {test.run_count !== undefined && test.run_count > 0 && (
            <div className="mt-0.5 flex items-center gap-1 text-xs">
              <span className="text-green-600 dark:text-green-400">{test.pass_count || 0}✓</span>
              <span className="text-gray-400">/</span>
              <span className="text-red-600 dark:text-red-400">{test.fail_count || 0}✗</span>
            </div>
          )}
        </div>
        
        {/* Success Rate */}
        <div>
          <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
          {test.run_count && test.run_count > 0 ? (
            <div>
              <div className="mb-1 flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      ((test.pass_count || 0) / test.run_count) * 100 >= 90
                        ? 'bg-green-500'
                        : ((test.pass_count || 0) / test.run_count) * 100 >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.round(((test.pass_count || 0) / test.run_count) * 100)}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {Math.round(((test.pass_count || 0) / test.run_count) * 100)}%
              </span>
            </div>
          ) : (
            <span className="text-xs text-gray-400 dark:text-gray-500">No runs</span>
          )}
        </div>
        
        {/* Last Run */}
        <div>
          <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">Last Run</div>
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {test.last_run_at ? formatDistanceToNow(new Date(test.last_run_at), { addSuffix: true }) : 'Never'}
          </div>
        </div>
      </div>
    </div>
  );
}
