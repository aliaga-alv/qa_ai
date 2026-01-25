import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { SETTINGS_FEATURES } from '@/constants';

export default function SettingsPage() {
  const navigate = useNavigate();
  const settingsFeatures = SETTINGS_FEATURES;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-2xl p-12 text-white">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Settings className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold">Settings</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">
            Comprehensive settings and configuration options coming soon
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Coming Soon Message */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">In Development</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          We're building a comprehensive settings system to give you full control over your workspace, 
          team, and personal preferences. Check back soon!
        </p>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Planned Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settingsFeatures.map((feature) => {
            const Icon = feature.icon;
            const content = (
              <div className="flex items-start space-x-4">
                <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl flex-shrink-0`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );

            return feature.href ? (
              <button
                key={feature.title}
                onClick={() => navigate(feature.href!)}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all text-left"
              >
                {content}
              </button>
            ) : (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
