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
      return <Clock className="h-5 w-5 animate-pulse text-orange-500" />;
    default:
      return <User className="h-5 w-5 text-gray-500" />;
  }
};

export default function ActivityFeed() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="mt-0.5 flex-shrink-0">{getActivityIcon(activity.type)}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.message}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {activity.user} • {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {mockActivities.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
        </div>
      )}
    </div>
  );
}
