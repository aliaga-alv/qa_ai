import { Sparkles } from 'lucide-react';
import type { Insight } from '@/types/models';
import { AI_INSIGHTS_TYPE_CONFIG } from '@/constants/ui';

interface AIInsightsProps {
  insights: Insight[];
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:rounded-xl sm:p-6">
      <div className="mb-3 flex items-center space-x-2 sm:mb-4">
        <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
          AI Insights
        </h3>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {insights.map((insight) => {
          const config = AI_INSIGHTS_TYPE_CONFIG[insight.type];
          return (
            <div
              key={insight.id}
              className={`rounded-lg border p-3 sm:p-4 ${config.bgColor} ${config.borderColor}`}
            >
              <h4 className={`text-xs font-semibold sm:text-sm ${config.textColor} mb-1`}>
                {insight.title}
              </h4>
              <p className="mb-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
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
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No insights available yet
        </div>
      )}
    </div>
  );
}
