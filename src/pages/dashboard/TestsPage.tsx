import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TestFilters from '../../components/dashboard/tests/TestFilters';
import TestListItem from '../../components/dashboard/tests/TestListItem';
import TestCard from '../../components/dashboard/tests/TestCard';
import BulkActions from '../../components/dashboard/tests/BulkActions';
import type { Test } from '@/types/models';
import { mockTestsPageData } from '@/mocks';

// TODO: Replace with real API data

export default function TestsPage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>(mockTestsPageData);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>(mockTestsPageData);

  const handleSearchChange = (search: string) => {
    const filtered = tests.filter(
      (test) =>
        test.name.toLowerCase().includes(search.toLowerCase()) ||
        test.description.toLowerCase().includes(search.toLowerCase()) ||
        test.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredTests(filtered);
  };

  const handleStatusChange = (status: string) => {
    if (status === 'all') {
      setFilteredTests(tests);
    } else {
      setFilteredTests(tests.filter((test) => test.status === status));
    }
  };

  const handleTypeChange = (type: string) => {
    if (type === 'all') {
      setFilteredTests(tests);
    } else {
      setFilteredTests(tests.filter((test) => test.type === type));
    }
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
    toast.success('Test deleted', {
      description: 'The test has been removed from your test suite.',
    });
    setTests((prev) => prev.filter((test) => test.id !== id));
    setFilteredTests((prev) => prev.filter((test) => test.id !== id));
  };

  const handleRunSelected = () => {
    toast.success(`Running ${selectedTests.length} tests`, {
      description: 'Test execution has been queued.',
    });
    setSelectedTests([]);
  };

  const handleDeleteSelected = () => {
    toast.success(`Deleted ${selectedTests.length} tests`, {
      description: 'The selected tests have been removed.',
    });
    setTests((prev) => prev.filter((test) => !selectedTests.includes(test.id)));
    setFilteredTests((prev) => prev.filter((test) => !selectedTests.includes(test.id)));
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
        onTypeChange={handleTypeChange}
      />

      {/* Test List */}
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
                  Type
                </th>
                <th className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="hidden w-36 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 lg:table-cell">
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
    </div>
  );
}
