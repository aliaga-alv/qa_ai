import { Play, Edit, MoreVertical, Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Test } from '@/types/models';
import { TEST_LIST_STATUS_COLORS, TEST_LIST_TYPE_COLORS } from '@/constants/ui';

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
            <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {test.name}
            </h3>
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

      {/* Tags */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${TEST_LIST_TYPE_COLORS[test.type]}`}
        >
          {test.type.toUpperCase()}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${TEST_LIST_STATUS_COLORS[test.status]}`}
        >
          {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
        </span>
        {test.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
        {test.tags.length > 2 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">+{test.tags.length - 2}</span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {test.successRate !== undefined && (
          <div>
            <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-1.5 rounded-full ${
                    test.successRate >= 90
                      ? 'bg-green-500'
                      : test.successRate >= 70
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${test.successRate}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {test.successRate}%
              </span>
            </div>
          </div>
        )}
        <div>
          <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">Last Run</div>
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {test.lastRun ? formatDistanceToNow(test.lastRun, { addSuffix: true }) : 'Never'}
          </div>
        </div>
      </div>
    </div>
  );
}
