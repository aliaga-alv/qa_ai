import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import TestForm from '@/components/dashboard/tests/TestForm';
import { useProjectStore } from '@/stores/projectStore';
import { useCreateTest } from '@/hooks/api/useTests';
import type { TestFormData } from '@/schemas/test';

export default function CreateTestPage() {
  const navigate = useNavigate();
  const { selectedProject } = useProjectStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTestMutation = useCreateTest();

  const handleSubmit = async (data: TestFormData) => {
    if (!selectedProject) {
      toast.error('No project selected', {
        description: 'Please select a project from the dropdown above.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform form data to API request format
      const requestData = {
        name: data.name,
        description: data.description,
        specification: data.specification || null,
        priority: data.priority,
        status: data.status,
        is_active: data.is_active,
        tags: data.tags
          ? data.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
      };

      await createTestMutation.mutateAsync({
        projectId: selectedProject.id,
        data: requestData,
      });

      toast.success('Test created successfully!', {
        description: `"${data.name}" has been added to your test suite.`,
      });

      // Navigate to tests list
      navigate('/dashboard/tests');
    } catch (error) {
      toast.error('Failed to create test', {
        description: 'Please try again or contact support if the problem persists.',
      });
      console.error('Error creating test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/tests');
  };

  // Show message if no project selected
  if (!selectedProject) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <div className="mb-1 flex items-center space-x-2 sm:mb-2 sm:space-x-3">
            <button
              onClick={() => navigate('/dashboard/tests')}
              className="flex-shrink-0 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 sm:p-2"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
              Create New Test
            </h1>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No Project Selected
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please select a project from the dropdown above to create a test.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page header */}
      <div>
        <div className="mb-1 flex items-center space-x-2 sm:mb-2 sm:space-x-3">
          <button
            onClick={() => navigate('/dashboard/tests')}
            className="flex-shrink-0 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 sm:p-2"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
            Create New Test
          </h1>
        </div>
        <p className="ml-9 text-sm text-gray-600 dark:text-gray-400 sm:ml-14 sm:text-base">
          Define your test configuration, write test code, and set execution parameters.
        </p>
      </div>

      {/* Test Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <TestForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitLabel="Create Test"
        />
      </div>
    </div>
  );
}
