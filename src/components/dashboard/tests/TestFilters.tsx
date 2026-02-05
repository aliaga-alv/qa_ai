import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface TestFiltersProps {
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onSortChange: (sort: string) => void;
}

export default function TestFilters({
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: TestFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Search bar */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 sm:h-5 sm:w-5" />
          <input
            type="text"
            placeholder="Search tests..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 sm:pl-10"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center space-x-2 whitespace-nowrap rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
            showFilters
              ? 'border-primary-200 bg-primary-50 text-primary-600 dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800 sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:mb-2 sm:text-sm">
              Status
            </label>
            <select
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:mb-2 sm:text-sm">
              Priority
            </label>
            <select
              onChange={(e) => onPriorityChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300 sm:mb-2 sm:text-sm">
              Sort By
            </label>
            <select
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            >
              <option value="name">Name (A-Z)</option>
              <option value="priority">Priority (High-Low)</option>
              <option value="created">Newest First</option>
              <option value="updated">Recently Updated</option>
              <option value="lastRun">Recently Run</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
