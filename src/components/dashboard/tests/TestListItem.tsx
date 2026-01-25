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
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {/* Checkbox */}
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(test.id)}
          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </td>

      {/* Test Info */}
      <td className="px-4 py-4">
        <div className="flex items-start">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {test.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {test.description}
            </p>
            <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
              {test.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
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
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${TEST_LIST_TYPE_COLORS[test.type]}`}>
          {test.type.toUpperCase()}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${TEST_LIST_STATUS_COLORS[test.status]}`}>
          {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
        </span>
      </td>

      {/* Success Rate - Hidden on smaller screens */}
      <td className="hidden lg:table-cell px-4 py-4">
        {test.successRate !== undefined ? (
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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
            <span className="text-sm text-gray-700 dark:text-gray-300 w-12 whitespace-nowrap">
              {test.successRate}%
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
        )}
      </td>

      {/* Last Run - Hidden on smaller screens */}
      <td className="hidden xl:table-cell px-4 py-4">
        <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {test.lastRun ? formatDistanceToNow(test.lastRun, { addSuffix: true }) : 'Never'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onRun(test.id)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Run test"
          >
            <Play className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(test.id)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Edit test"
          >
            <Edit className="h-4 w-4" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                <button
                  onClick={() => {
                    onEdit(test.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  <Copy className="h-4 w-4" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(test.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
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
