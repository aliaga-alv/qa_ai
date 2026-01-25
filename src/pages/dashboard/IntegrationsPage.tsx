import { useNavigate } from 'react-router-dom';
import { Puzzle } from 'lucide-react';
import { integrations, integrationCategories } from '@/mocks';

export default function IntegrationsPage() {
  const navigate = useNavigate();
  const categories = integrationCategories;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Integrations</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Connect your testing platform with your favorite tools and services.
        </p>
      </div>

      {/* Coming Soon Banner */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Puzzle className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">Coming Soon</h2>
          <p className="text-lg text-white/90">Integrations are under development</p>
        </div>

        <div className="p-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex justify-center space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="rounded-lg border-2 border-gray-200 p-6 transition-colors hover:border-primary-300 dark:border-gray-700 dark:hover:border-primary-700"
                >
                  <div
                    className={`h-12 w-12 rounded-lg ${integration.bgColor} mb-4 flex items-center justify-center`}
                  >
                    <integration.icon className={`h-6 w-6 ${integration.color}`} />
                  </div>
                  <div className="mb-3">
                    <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      {integration.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {integration.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {integration.description}
                  </p>
                  <button
                    disabled
                    className="w-full cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                  >
                    Coming Soon
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-3 font-medium text-white transition-all hover:from-primary-600 hover:to-accent-600"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
