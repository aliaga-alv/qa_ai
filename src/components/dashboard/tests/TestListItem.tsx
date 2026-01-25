import { Play, Edit, Copy, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Test } from '@/types/models';
import { TEST_LIST_STATUS_COLORS, TEST_LIST_TYPE_COLORS } from '@/constants/ui';

interface TestListItemProps {
  test: Test;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRun: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TestListItem({
  test,
  isSelected,
  onSelect,
  onRun,
  onEdit,
  onDelete,
}: TestListItemProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <tr className="border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
      {/* Checkbox */}
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(test.id)}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
        />
      </td>

      {/* Test Info */}
      <td className="px-4 py-4">
        <div className="flex items-start">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {test.name}
            </p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{test.description}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {test.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {test.tags.length > 2 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{test.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="px-4 py-4">
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${TEST_LIST_TYPE_COLORS[test.type]}`}
        >
          {test.type.toUpperCase()}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${TEST_LIST_STATUS_COLORS[test.status]}`}
        >
          {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
        </span>
      </td>

      {/* Success Rate - Hidden on smaller screens */}
      <td className="hidden px-4 py-4 lg:table-cell">
        {test.successRate !== undefined ? (
          <div className="flex items-center space-x-2">
            <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-2 rounded-full ${
                  test.successRate >= 90
                    ? 'bg-green-500'
                    : test.successRate >= 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${test.successRate}%` }}
              />
            </div>
            <span className="w-12 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
              {test.successRate}%
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
        )}
      </td>

      {/* Last Run - Hidden on smaller screens */}
      <td className="hidden px-4 py-4 xl:table-cell">
        <span className="whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
          {test.lastRun ? formatDistanceToNow(test.lastRun, { addSuffix: true }) : 'Never'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1">
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
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <button
                  onClick={() => {
                    onEdit(test.id);
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center space-x-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Copy className="h-4 w-4" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(test.id);
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center space-x-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
