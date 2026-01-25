import { Sparkles } from 'lucide-react';
import type { Insight } from '../../../types/models';

interface AIInsightsProps {
  insights: Insight[];
}

const typeConfig = {
  success: {
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-700 dark:text-green-400',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  error: {
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-700 dark:text-red-400',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  warning: {
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-700 dark:text-orange-400',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  info: {
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-700 dark:text-blue-400',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
};

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => {
          const config = typeConfig[insight.type];
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
            >
              <h4 className={`text-sm font-semibold ${config.textColor} mb-1`}>
                {insight.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {insight.description}
              </p>
              {insight.action && (
                <button className={`text-xs font-medium ${config.textColor} hover:underline`}>
                  {insight.action} →
                </button>
              )}
            </div>
          );
        })}
      </div>

      {insights.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No insights available yet
        </div>
      )}
    </div>
  );
}
