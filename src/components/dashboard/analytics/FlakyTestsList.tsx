import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import type { FlakyTest } from '@/types/models';

interface FlakyTestsListProps {
  tests: FlakyTest[];
}

export default function FlakyTestsList({ tests }: FlakyTestsListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
        <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Flaky Tests</h3>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                {test.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                {test.failures} failures in {test.totalRuns} runs
              </p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-3 sm:ml-4 flex-shrink-0">
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
                  <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">trend</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tests.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No flaky tests detected
        </div>
      )}
    </div>
  );
}
