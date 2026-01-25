import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testSchema, type TestFormData, defaultTestValues } from '@/schemas/test';
import { 
  Code2, 
  FileText, 
  Tag, 
  Settings, 
  Globe, 
  Clock, 
  RefreshCw, 
  MonitorPlay,
  Info,
  Sparkles,
} from 'lucide-react';

interface TestFormProps {
  initialValues?: Partial<TestFormData>;
  onSubmit: (data: TestFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export default function TestForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Create Test',
}: TestFormProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'code' | 'config'>('basic');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: initialValues || defaultTestValues,
  });

  const testType = useWatch({ control, name: 'type' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'basic'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Info className="h-4 w-4" />
          <span className="font-medium">Basic Info</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('code')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'code'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span className="font-medium">Test Code</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('config')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'config'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span className="font-medium">Configuration</span>
        </button>
      </div>

      {/* Basic Info Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-6">
          {/* Test Name */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="h-4 w-4" />
              <span>Test Name *</span>
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g., User Login Flow"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="h-4 w-4" />
              <span>Description *</span>
            </label>
            <textarea
              {...register('description')}
              rows={4}
              placeholder="Describe what this test does and what it validates..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
            )}
          </div>

          {/* Test Type and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Code2 className="h-4 w-4" />
                <span>Test Type *</span>
              </label>
              <select
                {...register('type')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="ui">UI Test</option>
                <option value="api">API Test</option>
                <option value="integration">Integration Test</option>
                <option value="unit">Unit Test</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Settings className="h-4 w-4" />
                <span>Status *</span>
              </label>
              <select
                {...register('status')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </label>
            <input
              {...register('tags')}
              type="text"
              placeholder="e.g., auth, critical, smoke (comma-separated)"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.tags && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Separate multiple tags with commas
            </p>
          </div>
        </div>
      )}

      {/* Test Code Tab */}
      {activeTab === 'code' && (
        <div className="space-y-4">
          <div className="flex items-start space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">AI-Powered Test Generation (Coming Soon)</p>
              <p className="text-blue-700 dark:text-blue-300">
                Soon you'll be able to generate test code automatically using AI based on your requirements.
              </p>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Code2 className="h-4 w-4" />
              <span>Test Code *</span>
            </label>
            <textarea
              {...register('code')}
              rows={20}
              placeholder="Write your test code here..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm resize-none"
              spellCheck={false}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.code.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Configuration Tab */}
      {activeTab === 'config' && (
        <div className="space-y-6">
          {/* Environment */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Globe className="h-4 w-4" />
              <span>Environment *</span>
            </label>
            <select
              {...register('environment')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
            {errors.environment && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.environment.message}</p>
            )}
          </div>

          {/* Base URL */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Globe className="h-4 w-4" />
              <span>Base URL</span>
            </label>
            <input
              {...register('baseUrl')}
              type="url"
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.baseUrl && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.baseUrl.message}</p>
            )}
          </div>

          {/* Timeout and Retries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="h-4 w-4" />
                <span>Timeout (ms) *</span>
              </label>
              <input
                {...register('timeout', { valueAsNumber: true })}
                type="number"
                step="1000"
                placeholder="30000"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.timeout && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.timeout.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <RefreshCw className="h-4 w-4" />
                <span>Retries *</span>
              </label>
              <input
                {...register('retries', { valueAsNumber: true })}
                type="number"
                min="0"
                max="5"
                placeholder="2"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.retries && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.retries.message}</p>
              )}
            </div>
          </div>

          {/* Browser (only for UI tests) */}
          {testType === 'ui' && (
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MonitorPlay className="h-4 w-4" />
                <span>Browser</span>
              </label>
              <select
                {...register('browser')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="chrome">Chrome</option>
                <option value="firefox">Firefox</option>
                <option value="safari">Safari</option>
                <option value="edge">Edge</option>
              </select>
              {errors.browser && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.browser.message}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>{submitLabel}</span>
          )}
        </button>
      </div>
    </form>
  );
}
