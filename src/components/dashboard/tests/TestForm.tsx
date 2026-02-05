import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testSchema, type TestFormData, defaultTestValues } from '@/schemas/test';
import { FileText, Tag, Settings, AlertCircle, RefreshCw, Zap } from 'lucide-react';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: initialValues || defaultTestValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* AI Generation Notice */}
      <div className="flex items-start space-x-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <p className="mb-1 font-medium">AI-Powered Test Generation</p>
          <p className="text-blue-700 dark:text-blue-300">
            Fill in the specification to describe what you want to test, and we'll generate the test
            plan and code for you using AI.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FileText className="h-4 w-4" />
            <span>Test Name *</span>
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g., Login Flow Test"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {errors.name && (
            <p className="mt-1.5 flex items-center space-x-1 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.name.message}</span>
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FileText className="h-4 w-4" />
            <span>Description *</span>
          </label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder="Brief description of what this test validates..."
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {errors.description && (
            <p className="mt-1.5 flex items-center space-x-1 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.description.message}</span>
            </p>
          )}
        </div>

        {/* Specification */}
        <div>
          <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Zap className="h-4 w-4" />
            <span>Test Specification</span>
            <span className="text-xs text-gray-500">(optional)</span>
          </label>
          <textarea
            {...register('specification')}
            rows={5}
            placeholder="Describe the test steps and expected behavior in detail. Our AI will use this to generate test code...&#10;&#10;Example:&#10;1. Navigate to the login page&#10;2. Enter valid credentials&#10;3. Click login button&#10;4. Verify user is redirected to dashboard&#10;5. Verify user name is displayed"
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-mono text-sm text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {errors.specification && (
            <p className="mt-1.5 flex items-center space-x-1 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.specification.message}</span>
            </p>
          )}
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Provide detailed steps and expected outcomes for AI-powered test generation
          </p>
        </div>

        {/* Priority and Status */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Settings className="h-4 w-4" />
              <span>Priority *</span>
            </label>
            <select
              {...register('priority')}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="mt-1.5 flex items-center space-x-1 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.priority.message}</span>
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Settings className="h-4 w-4" />
              <span>Status *</span>
            </label>
            <select
              {...register('status')}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="mt-1.5 flex items-center space-x-1 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.status.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Is Active Toggle */}
        <div className="flex items-center space-x-3">
          <input
            {...register('is_active')}
            type="checkbox"
            id="is_active"
            className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          />
          <label
            htmlFor="is_active"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Test is active and ready to run
          </label>
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
            placeholder="e.g., login, authentication, critical (comma-separated)"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {errors.tags && (
            <p className="mt-1.5 flex items-center space-x-1 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.tags.message}</span>
            </p>
          )}
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Separate multiple tags with commas
          </p>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col-reverse items-stretch justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-700 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-primary-600 hover:to-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
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
