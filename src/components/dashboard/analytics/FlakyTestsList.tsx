import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import type { FlakyTest } from '@/types/models';

interface FlakyTestsListProps {
  tests: FlakyTest[];
}

export default function FlakyTestsList({ tests }: FlakyTestsListProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:rounded-xl sm:p-6">
      <div className="mb-3 flex items-center space-x-2 sm:mb-4">
        <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
          Flaky Tests
        </h3>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-2.5 dark:border-gray-700 dark:bg-gray-900 sm:p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
                {test.name}
              </p>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 sm:mt-1">
                {test.failures} failures in {test.totalRuns} runs
              </p>
            </div>
            <div className="ml-3 flex flex-shrink-0 items-center space-x-2 sm:ml-4 sm:space-x-3">
              <div className="text-right">
                <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                  {test.flakinessRate}%
                </p>
                <div className="flex items-center space-x-1">
                  {test.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-red-600 dark:text-red-400" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-600 dark:text-green-400" />
                  )}
                  <span className="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline">
                    trend
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tests.length === 0 && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No flaky tests detected
        </div>
      )}
    </div>
  );
}
