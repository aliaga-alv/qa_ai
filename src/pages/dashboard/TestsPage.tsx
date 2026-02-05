import { useState, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TestFilters from '../../components/dashboard/tests/TestFilters';
import TestListItem from '../../components/dashboard/tests/TestListItem';
import TestCard from '../../components/dashboard/tests/TestCard';
import BulkActions from '../../components/dashboard/tests/BulkActions';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useProjectStore } from '@/stores/projectStore';
import { useTests, useDeleteTest } from '@/hooks/api/useTests';
import type { Test } from '@/types/models';
import { mockTestsPageData } from '@/mocks';

export default function TestsPage() {
  const navigate = useNavigate();
  const { selectedProject } = useProjectStore();
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Fetch tests for selected project (or use mock if no project selected)
  const {
    data: testsData,
    isLoading,
    isError,
  } = useTests(selectedProject?.id || '', undefined);

  const deleteTestMutation = useDeleteTest();

  // Use real data if available (even if empty), otherwise fall back to mock
  const tests = selectedProject?.id && testsData?.data !== undefined ? testsData.data : mockTestsPageData;

  // Apply all filters whenever tests or any filter changes
  useEffect(() => {
    let result = [...tests];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (test) =>
          (test.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (test.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (test.tags && test.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((test) => test.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter((test) => test.priority === priorityFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'created':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        case 'updated':
          return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
        case 'lastRun':
          return new Date(b.last_run_at || 0).getTime() - new Date(a.last_run_at || 0).getTime();
        case 'priority': {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return (priorityOrder[a.priority || 'medium'] || 1) - (priorityOrder[b.priority || 'medium'] || 1);
        }
        default:
          return 0;
      }
    });

    setFilteredTests(result);
  }, [tests, searchTerm, statusFilter, priorityFilter, sortBy]);

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handlePriorityChange = (priority: string) => {
    setPriorityFilter(priority);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleSelectTest = (id: string) => {
    setSelectedTests((prev) =>
      prev.includes(id) ? prev.filter((testId) => testId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTests.length === filteredTests.length) {
      setSelectedTests([]);
    } else {
      setSelectedTests(filteredTests.map((test) => test.id));
    }
  };

  const handleRunTest = (id: string) => {
    toast.success('Test execution started', {
      description: `Running test: ${tests.find((t) => t.id === id)?.name}`,
    });
  };

  const handleEditTest = (id: string) => {
    navigate(`/dashboard/tests/${id}`);
  };

  const handleDeleteTest = (id: string) => {
    if (!selectedProject?.id) {
      toast.error('No project selected');
      return;
    }

    deleteTestMutation.mutate(
      { projectId: selectedProject.id, testId: id },
      {
        onSuccess: () => {
          toast.success('Test deleted', {
            description: 'The test has been removed from your test suite.',
          });
        },
        onError: () => {
          toast.error('Failed to delete test');
        },
      }
    );
  };

  const handleRunSelected = () => {
    toast.success(`Running ${selectedTests.length} tests`, {
      description: 'Test execution has been queued.',
    });
    setSelectedTests([]);
  };

  const handleDeleteSelected = () => {
    if (!selectedProject?.id) {
      toast.error('No project selected');
      return;
    }

    // TODO: Implement bulk delete API
    toast.info('Bulk delete feature coming soon', {
      description: 'For now, please delete tests individually.',
    });
    setSelectedTests([]);
  };

  const handleExportSelected = () => {
    toast.success(`Exporting ${selectedTests.length} tests`, {
      description: 'Your export will download shortly.',
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Tests</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:mt-2 sm:text-base">
            Manage and organize your test suites.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/tests/new')}
          className="flex items-center justify-center space-x-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2.5 font-medium text-white transition-all hover:from-primary-600 hover:to-accent-600"
        >
          <Plus className="h-5 w-5" />
          <span>New Test</span>
        </button>
      </div>

      {/* Filters */}
      <TestFilters
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onSortChange={handleSortChange}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Error State */}
      {isError && selectedProject && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              Failed to load tests. Please try again.
            </p>
          </div>
        </div>
      )}

      {/* No Project Selected State */}
      {!selectedProject && !isLoading && (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No Project Selected
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please select a project from the dropdown above to view your tests.
          </p>
        </div>
      )}

      {/* Test List */}
      {!isLoading && !isError && (selectedProject || filteredTests.length > 0) && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <BulkActions
          selectedCount={selectedTests.length}
          onRunSelected={handleRunSelected}
          onDeleteSelected={handleDeleteSelected}
          onExportSelected={handleExportSelected}
          onClearSelection={() => setSelectedTests([])}
        />

        {/* Mobile Card View */}
        <div className="md:hidden">
          {filteredTests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              isSelected={selectedTests.includes(test.id)}
              onSelect={handleSelectTest}
              onRun={handleRunTest}
              onEdit={handleEditTest}
              onDelete={handleDeleteTest}
            />
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedTests.length === filteredTests.length && filteredTests.length > 0
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Test Name
                </th>
                <th className="w-24 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Priority
                </th>
                <th className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="hidden w-32 px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 lg:table-cell">
                  Runs
                </th>
                <th className="hidden w-40 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 lg:table-cell">
                  Success Rate
                </th>
                <th className="hidden w-32 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 xl:table-cell">
                  Last Run
                </th>
                <th className="w-32 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <TestListItem
                  key={test.id}
                  test={test}
                  isSelected={selectedTests.includes(test.id)}
                  onSelect={handleSelectTest}
                  onRun={handleRunTest}
                  onEdit={handleEditTest}
                  onDelete={handleDeleteTest}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredTests.length === 0 && (
          <div className="px-4 py-8 text-center sm:py-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">No tests found</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              Try adjusting your filters or create a new test
            </p>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
