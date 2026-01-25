import { useNavigate } from 'react-router-dom';
import type { QuickAction } from '@/types/models';
import { quickActions as quickActionsData } from '@/mocks';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions: QuickAction[] = quickActionsData.map(action => ({
    ...action,
    onClick: () => {
      if (action.id === 'new-test') navigate('/dashboard/tests/new');
      else if (action.id === 'run-tests') navigate('/dashboard/run');
      else if (action.id === 'view-reports') navigate('/dashboard/analytics');
      else if (action.id === 'docs') navigate('/docs');
      else alert(`${action.label} feature coming soon!`);
    },
  }));

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
