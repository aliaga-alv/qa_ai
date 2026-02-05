import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import TestForm from '@/components/dashboard/tests/TestForm';
import type { TestFormData } from '@/schemas/test';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useProjectStore } from '@/stores/projectStore';
import { useTest, useUpdateTest } from '@/hooks/api/useTests';

export default function EditTestPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProject } = useProjectStore();

  // Fetch test data
  const {
    data: test,
    isLoading,
    isError,
  } = useTest(selectedProject?.id || '', id || '');

  // Update mutation
  const updateTestMutation = useUpdateTest();

  // Convert API test data to form data
  const testData = useMemo(() => {
    if (!test) return null;

    return {
      name: test.name || '',
      description: test.description || '',
      specification: test.specification || '',
      priority: test.priority || 'medium',
      tags: test.tags?.join(', ') || '',
      is_active: test.is_active ?? true,
      status: test.status || 'draft',
    } as Partial<TestFormData>;
  }, [test]);

  const handleSubmit = async (data: TestFormData) => {
    if (!selectedProject?.id || !id) {
      toast.error('Missing project or test ID');
      return;
    }

    try {
      await updateTestMutation.mutateAsync({
        projectId: selectedProject.id,
        testId: id,
        data: {
          name: data.name,
          description: data.description,
          specification: data.specification,
          priority: data.priority,
          tags: data.tags?.split(',').map((tag) => tag.trim()).filter(Boolean),
          is_active: data.is_active,
          status: data.status,
        },
      });

      toast.success('Test updated successfully!', {
        description: `"${data.name}" has been updated.`,
      });

      // Navigate back to test details
      navigate(`/dashboard/tests/${id}`);
    } catch (error) {
      // Error toast is handled by the mutation
      console.error('Error updating test:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/dashboard/tests/${id}`);
  };

  if (!selectedProject) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Please select a project first</p>
          <button
            onClick={() => navigate('/dashboard/tests')}
            className="mt-4 text-primary-600 hover:underline dark:text-primary-400"
          >
            Go back to tests
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !testData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Test not found</p>
          <button
            onClick={() => navigate('/dashboard/tests')}
            className="mt-4 text-primary-600 hover:underline dark:text-primary-400"
          >
            Go back to tests
          </button>
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
            onClick={() => navigate(`/dashboard/tests/${id}`)}
            className="flex-shrink-0 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 sm:p-2"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
            Edit Test
          </h1>
        </div>
        <p className="ml-9 text-sm text-gray-600 dark:text-gray-400 sm:ml-14 sm:text-base">
          Modify test configuration, update code, and adjust execution parameters.
        </p>
      </div>

      {/* Test Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <TestForm
          initialValues={testData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={updateTestMutation.isPending}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
