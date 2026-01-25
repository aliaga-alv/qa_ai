import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import TestForm from '@/components/dashboard/tests/TestForm';
import type { TestFormData } from '@/schemas/test';

export default function CreateTestPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: TestFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here:
      // await api.tests.create(data);
      
      console.log('Creating test with data:', data);
      
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

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={() => navigate('/dashboard/tests')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Test</h1>
          </div>
          <p className="ml-14 text-gray-600 dark:text-gray-400">
            Define your test configuration, write test code, and set execution parameters.
          </p>
        </div>
      </div>

      {/* Test Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
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
