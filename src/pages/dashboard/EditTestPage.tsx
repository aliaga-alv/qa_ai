import { Code, Save, Settings, Sparkles } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTestPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const features = [
    {
      icon: Code,
      title: 'Code Editor',
      description: 'Monaco editor with syntax highlighting and IntelliSense',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      icon: Sparkles,
      title: 'AI Assistance',
      description: 'Get AI suggestions to improve or fix your test code',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      icon: Settings,
      title: 'Test Configuration',
      description: 'Edit test settings, environment variables, and assertions',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
      icon: Save,
      title: 'Version History',
      description: 'Track changes and rollback to previous versions',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Test</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Modify test code and configuration.
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Coming Soon</h2>
          <p className="text-white/90 text-lg">
            Test editor interface is under development
          </p>
        </div>

        <div className="p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Planned Features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate(`/dashboard/tests/${id}`)}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg font-medium transition-all"
              >
                Back to Test Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
