import { useNavigate } from 'react-router-dom';
import type { QuickAction } from '@/types/models';
import { quickActions as quickActionsData } from '@/mocks';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions: QuickAction[] = quickActionsData.map((action) => ({
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
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`${action.bgColor} flex flex-col items-center space-y-2 rounded-lg p-4 text-center transition-colors`}
          >
            <action.icon className={`h-6 w-6 ${action.color}`} />
            <span className={`text-sm font-medium ${action.color}`}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
