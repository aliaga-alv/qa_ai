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
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {/* Header with checkbox and actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(test.id)}
            className="mt-0.5 w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {test.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
              {test.description}
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
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
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                <button
                  onClick={() => {
                    onEdit(test.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(test.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
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
      <div className="flex items-center flex-wrap gap-1.5 mb-3">
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${TEST_LIST_TYPE_COLORS[test.type]}`}>
          {test.type.toUpperCase()}
        </span>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${TEST_LIST_STATUS_COLORS[test.status]}`}>
          {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
        </span>
        {test.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
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

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {test.successRate !== undefined && (
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Success Rate</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
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
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Run</div>
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {test.lastRun ? formatDistanceToNow(test.lastRun, { addSuffix: true }) : 'Never'}
          </div>
        </div>
      </div>
    </div>
  );
}
