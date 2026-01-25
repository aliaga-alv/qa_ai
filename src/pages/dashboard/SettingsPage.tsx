import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { SETTINGS_FEATURES } from '@/constants';

export default function SettingsPage() {
  const navigate = useNavigate();
  const settingsFeatures = SETTINGS_FEATURES;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 p-12 text-white">
        <div className="relative z-10">
          <div className="mb-4 flex items-center space-x-3">
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <Settings className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold">Settings</h1>
          </div>
          <p className="max-w-2xl text-xl text-white/90">
            Comprehensive settings and configuration options coming soon
          </p>
        </div>
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />
      </div>

      {/* Coming Soon Message */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-2 flex items-center space-x-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">In Development</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          We're building a comprehensive settings system to give you full control over your
          workspace, team, and personal preferences. Check back soon!
        </p>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Planned Features
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {settingsFeatures.map((feature) => {
            const Icon = feature.icon;
            const content = (
              <div className="flex items-start space-x-4">
                <div className={`bg-gradient-to-br p-3 ${feature.color} flex-shrink-0 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            );

            return feature.href ? (
              <button
                key={feature.title}
                onClick={() => navigate(feature.href!)}
                className="rounded-xl border border-gray-200 bg-white p-6 text-left transition-all hover:border-primary-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-500"
              >
                {content}
              </button>
            ) : (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
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
          className="rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
