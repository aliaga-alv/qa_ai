import { CheckCircle, XCircle, Plus, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Activity } from '@/types/models';
import { mockActivities } from '@/mocks';

// TODO: Replace with real API data

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'test_passed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'test_failed':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'test_created':
      return <Plus className="h-5 w-5 text-blue-500" />;
    case 'test_running':
      return <Clock className="h-5 w-5 text-orange-500 animate-pulse" />;
    default:
      return <User className="h-5 w-5 text-gray-500" />;
  }
};

export default function ActivityFeed() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {activity.user} • {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {mockActivities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No recent activity
          </p>
        </div>
      )}
    </div>
  );
}
