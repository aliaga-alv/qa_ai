import { GitBranch, Cloud, MessageSquare, Mail, Webhook, Puzzle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IntegrationsPage() {
  const navigate = useNavigate();

  const integrations = [
    {
      icon: GitBranch,
      name: 'GitHub Actions',
      description: 'Run tests automatically on push, pull request, or schedule',
      color: 'text-gray-900 dark:text-gray-100',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      category: 'CI/CD',
    },
    {
      icon: Cloud,
      name: 'GitLab CI/CD',
      description: 'Integrate with GitLab pipelines for continuous testing',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      category: 'CI/CD',
    },
    {
      icon: MessageSquare,
      name: 'Slack',
      description: 'Get real-time notifications for test results in your channels',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      category: 'Notifications',
    },
    {
      icon: Mail,
      name: 'Email Notifications',
      description: 'Receive test failure alerts and daily summaries via email',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      category: 'Notifications',
    },
    {
      icon: Puzzle,
      name: 'Jira',
      description: 'Create issues automatically for failed tests and track bugs',
      color: 'text-blue-700 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      category: 'Issue Tracking',
    },
    {
      icon: Webhook,
      name: 'Webhooks',
      description: 'Send test results to any endpoint with custom webhooks',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      category: 'Custom',
    },
  ];

  const categories = ['All', 'CI/CD', 'Notifications', 'Issue Tracking', 'Custom'];

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
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Puzzle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Coming Soon</h2>
          <p className="text-white/90 text-lg">
            Integrations are under development
          </p>
        </div>

        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center space-x-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-lg ${integration.bgColor} flex items-center justify-center mb-4`}>
                    <integration.icon className={`h-6 w-6 ${integration.color}`} />
                  </div>
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      {integration.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {integration.description}
                  </p>
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg font-medium transition-all"
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
