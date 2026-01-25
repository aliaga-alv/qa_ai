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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 overflow-x-auto border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex items-center space-x-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 transition-colors sm:space-x-2 sm:px-4 sm:py-3 ${
            activeTab === 'basic'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Info className="h-4 w-4" />
          <span className="text-sm font-medium sm:text-base">Basic Info</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('code')}
          className={`flex items-center space-x-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 transition-colors sm:space-x-2 sm:px-4 sm:py-3 ${
            activeTab === 'code'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span className="text-sm font-medium sm:text-base">Test Code</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('config')}
          className={`flex items-center space-x-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 transition-colors sm:space-x-2 sm:px-4 sm:py-3 ${
            activeTab === 'config'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm font-medium sm:text-base">Configuration</span>
        </button>
      </div>

      {/* Basic Info Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Test Name */}
          <div>
            <label className="mb-1.5 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-2">
              <FileText className="h-4 w-4" />
              <span>Test Name *</span>
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g., User Login Flow"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:px-4 sm:py-2.5 sm:text-base"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-2">
              <FileText className="h-4 w-4" />
              <span>Description *</span>
            </label>
            <textarea
              {...register('description')}
              rows={4}
              placeholder="Describe what this test does and what it validates..."
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:px-4 sm:py-2.5 sm:text-base"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Test Type and Status */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Code2 className="h-4 w-4" />
                <span>Test Type *</span>
              </label>
              <select
                {...register('type')}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
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
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Settings className="h-4 w-4" />
                <span>Status *</span>
              </label>
              <select
                {...register('status')}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </label>
            <input
              {...register('tags')}
              type="text"
              placeholder="e.g., auth, critical, smoke (comma-separated)"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
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
          <div className="flex items-start space-x-2 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="mb-1 font-medium">AI-Powered Test Generation (Coming Soon)</p>
              <p className="text-blue-700 dark:text-blue-300">
                Soon you'll be able to generate test code automatically using AI based on your
                requirements.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Code2 className="h-4 w-4" />
              <span>Test Code *</span>
            </label>
            <textarea
              {...register('code')}
              rows={20}
              placeholder="Write your test code here..."
              className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
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
            <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Globe className="h-4 w-4" />
              <span>Environment *</span>
            </label>
            <select
              {...register('environment')}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
            {errors.environment && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.environment.message}
              </p>
            )}
          </div>

          {/* Base URL */}
          <div>
            <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Globe className="h-4 w-4" />
              <span>Base URL</span>
            </label>
            <input
              {...register('baseUrl')}
              type="url"
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.baseUrl && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.baseUrl.message}
              </p>
            )}
          </div>

          {/* Timeout and Retries */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Clock className="h-4 w-4" />
                <span>Timeout (ms) *</span>
              </label>
              <input
                {...register('timeout', { valueAsNumber: true })}
                type="number"
                step="1000"
                placeholder="30000"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {errors.timeout && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.timeout.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <RefreshCw className="h-4 w-4" />
                <span>Retries *</span>
              </label>
              <input
                {...register('retries', { valueAsNumber: true })}
                type="number"
                min="0"
                max="5"
                placeholder="2"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {errors.retries && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.retries.message}
                </p>
              )}
            </div>
          </div>

          {/* Browser (only for UI tests) */}
          {testType === 'ui' && (
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <MonitorPlay className="h-4 w-4" />
                <span>Browser</span>
              </label>
              <select
                {...register('browser')}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="chrome">Chrome</option>
                <option value="firefox">Firefox</option>
                <option value="safari">Safari</option>
                <option value="edge">Edge</option>
              </select>
              {errors.browser && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.browser.message}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex flex-col-reverse items-stretch justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700 sm:flex-row sm:items-center sm:pt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 sm:px-6 sm:py-2.5 sm:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-primary-600 hover:to-accent-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-2.5 sm:text-base"
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
