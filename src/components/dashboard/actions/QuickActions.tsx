import { Plus, Play, BarChart3, Calendar, Upload, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  onClick: () => void;
}

export default function QuickActions() {
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      id: 'new-test',
      label: 'New Test',
      icon: Plus,
      color: 'text-primary-600 dark:text-primary-400',
      bgColor: 'bg-primary-100 dark:bg-primary-900/20 hover:bg-primary-200 dark:hover:bg-primary-900/30',
      onClick: () => navigate('/dashboard/tests/new'),
    },
    {
      id: 'run-tests',
      label: 'Run Tests',
      icon: Play,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30',
      onClick: () => navigate('/dashboard/run'),
    },
    {
      id: 'view-reports',
      label: 'View Reports',
      icon: BarChart3,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30',
      onClick: () => navigate('/dashboard/analytics'),
    },
    {
      id: 'schedule',
      label: 'Schedule Tests',
      icon: Calendar,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30',
      onClick: () => alert('Schedule feature coming soon!'),
    },
    {
      id: 'upload',
      label: 'Upload Test',
      icon: Upload,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20 hover:bg-orange-200 dark:hover:bg-orange-900/30',
      onClick: () => alert('Upload feature coming soon!'),
    },
    {
      id: 'docs',
      label: 'Documentation',
      icon: FileText,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600',
      onClick: () => navigate('/docs'),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`${action.bgColor} p-4 rounded-lg transition-colors flex flex-col items-center space-y-2 text-center`}
          >
            <action.icon className={`h-6 w-6 ${action.color}`} />
            <span className={`text-sm font-medium ${action.color}`}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
