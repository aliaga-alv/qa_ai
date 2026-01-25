import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import TestForm from '@/components/dashboard/tests/TestForm';
import type { TestFormData } from '@/schemas/test';
import { mockTestDetail } from '@/mocks/tests';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function EditTestPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testData, setTestData] = useState<Partial<TestFormData> | null>(null);

  useEffect(() => {
    // Simulate loading test data from API
    const loadTest = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, you would fetch from API:
        // const test = await api.tests.getById(id);
        
        // Convert mock test detail to form data
        const formData: Partial<TestFormData> = {
          name: mockTestDetail.name,
          description: mockTestDetail.description,
          type: mockTestDetail.type as 'api' | 'ui' | 'integration' | 'unit',
          status: mockTestDetail.status as 'active' | 'inactive' | 'draft',
          tags: mockTestDetail.tags.join(', '),
          code: mockTestDetail.code,
          timeout: mockTestDetail.config.timeout,
          retries: mockTestDetail.config.retries,
          environment: mockTestDetail.config.environment as 'development' | 'staging' | 'production',
          baseUrl: mockTestDetail.config.baseUrl,
          browser: mockTestDetail.config.browser as 'chrome' | 'firefox' | 'safari' | 'edge',
        };
        
        setTestData(formData);
      } catch (error) {
        toast.error('Failed to load test', {
          description: 'Could not retrieve test details. Please try again.',
        });
        console.error('Error loading test:', error);
        navigate('/dashboard/tests');
      } finally {
        setIsLoading(false);
      }
    };

    loadTest();
  }, [id, navigate]);

  const handleSubmit = async (data: TestFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here:
      // await api.tests.update(id, data);
      
      console.log('Updating test with data:', data);
      
      toast.success('Test updated successfully!', {
        description: `"${data.name}" has been updated.`,
      });
      
      // Navigate back to test details
      navigate(`/dashboard/tests/${id}`);
    } catch (error) {
      toast.error('Failed to update test', {
        description: 'Please try again or contact support if the problem persists.',
      });
      console.error('Error updating test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/dashboard/tests/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Test not found</p>
          <button
            onClick={() => navigate('/dashboard/tests')}
            className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
          >
            Go back to tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={() => navigate(`/dashboard/tests/${id}`)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Test</h1>
          </div>
          <p className="ml-14 text-gray-600 dark:text-gray-400">
            Modify test configuration, update code, and adjust execution parameters.
          </p>
        </div>
      </div>

      {/* Test Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <TestForm
          initialValues={testData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
