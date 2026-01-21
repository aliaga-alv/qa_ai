import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TestFilters from '../../components/dashboard/tests/TestFilters';
import TestListItem, { type Test } from '../../components/dashboard/tests/TestListItem';
import BulkActions from '../../components/dashboard/tests/BulkActions';

// TODO: Replace with real API data
const mockTests: Test[] = [
  {
    id: '1',
    name: 'User Login Flow',
    description: 'Tests the complete user authentication process',
    type: 'ui',
    status: 'active',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    duration: 2.3,
    successRate: 98,
    tags: ['auth', 'critical', 'smoke'],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'API Health Check',
    description: 'Verifies all API endpoints are responding correctly',
    type: 'api',
    status: 'active',
    lastRun: new Date(Date.now() - 15 * 60 * 1000),
    duration: 0.8,
    successRate: 100,
    tags: ['api', 'health', 'monitoring'],
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Payment Processing',
    description: 'End-to-end payment flow with Stripe integration',
    type: 'integration',
    status: 'active',
    lastRun: new Date(Date.now() - 5 * 60 * 60 * 1000),
    duration: 4.5,
    successRate: 94,
    tags: ['payment', 'stripe', 'critical'],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    name: 'User Registration',
    description: 'Tests new user signup and email verification',
    type: 'ui',
    status: 'active',
    lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
    duration: 3.2,
    successRate: 96,
    tags: ['auth', 'email', 'signup'],
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    name: 'Product Search',
    description: 'Validates search functionality and filters',
    type: 'ui',
    status: 'inactive',
    lastRun: new Date(Date.now() - 48 * 60 * 60 * 1000),
    duration: 1.5,
    successRate: 88,
    tags: ['search', 'ui'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: '6',
    name: 'Database Migration',
    description: 'Tests database schema migrations',
    type: 'unit',
    status: 'draft',
    tags: ['database', 'migration'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

export default function TestsPage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>(mockTests);

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
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tests</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and organize your test suites.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/tests/new')}
          className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg font-medium transition-all"
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
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <BulkActions
          selectedCount={selectedTests.length}
          onRunSelected={handleRunSelected}
          onDeleteSelected={handleDeleteSelected}
          onExportSelected={handleExportSelected}
          onClearSelection={() => setSelectedTests([])}
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedTests.length === filteredTests.length && filteredTests.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Run
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No tests found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try adjusting your filters or create a new test
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
