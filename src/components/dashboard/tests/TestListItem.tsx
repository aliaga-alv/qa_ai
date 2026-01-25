import { Play, Edit, Copy, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Test } from '../../../types/models';

interface TestListItemProps {
  test: Test;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRun: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
};

const typeColors = {
  api: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  ui: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  integration: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  unit: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400',
};

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
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(test.id)}
          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </td>

      {/* Test Info */}
      <td className="px-6 py-4">
        <div className="flex items-start space-x-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {test.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {test.description}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              {test.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  {tag}
                </span>
              ))}
              {test.tags.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{test.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${typeColors[test.type]}`}>
          {test.type.toUpperCase()}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[test.status]}`}>
          {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
        </span>
      </td>

      {/* Success Rate */}
      <td className="px-6 py-4">
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
            <span className="text-sm text-gray-700 dark:text-gray-300 w-12">
              {test.successRate}%
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
        )}
      </td>

      {/* Last Run */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {test.lastRun ? formatDistanceToNow(test.lastRun, { addSuffix: true }) : 'Never'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
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
