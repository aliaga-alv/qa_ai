import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';
import HistoryDatePicker from '../../components/dashboard/history/HistoryDatePicker';
import HistoryListItem from '../../components/dashboard/history/HistoryListItem';
import ExecutionDetailsModal from '../../components/dashboard/history/ExecutionDetailsModal';
import { mockHistoryExecutions, mockHistoryExecutionDetail } from '@/mocks';

export default function HistoryPage() {
  const [dateRange, setDateRange] = useState(() => ({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
  }));
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExecution, setSelectedExecution] = useState<
    typeof mockHistoryExecutionDetail | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredExecutions = mockHistoryExecutions.filter((execution) => {
    const matchesStatus = selectedStatus === 'all' || execution.status === selectedStatus;
    const matchesSearch = execution.testName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSelectExecution = () => {
    // In real app, fetch execution details by ID
    setSelectedExecution(mockHistoryExecutionDetail);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    toast.success('Exporting test history', {
      description: 'Your export will download shortly',
    });
  };

  const stats = [
    { label: 'Total Executions', value: mockHistoryExecutions.length.toString() },
    {
      label: 'Passed',
      value: mockHistoryExecutions.filter((e) => e.status === 'passed').length.toString(),
    },
    {
      label: 'Failed',
      value: mockHistoryExecutions.filter((e) => e.status === 'failed').length.toString(),
    },
    {
      label: 'Avg Duration',
      value: `${(
        mockHistoryExecutions.reduce((sum, e) => sum + e.duration, 0) / mockHistoryExecutions.length
      ).toFixed(2)}s`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Test History</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View and analyze past test executions with detailed logs and results.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
        <HistoryDatePicker value={dateRange} onChange={setDateRange} />

        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 sm:w-64"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="running">Running</option>
              <option value="stopped">Stopped</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Triggered By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Artifacts
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExecutions.map((execution) => (
                <HistoryListItem
                  key={execution.id}
                  execution={execution}
                  onSelect={handleSelectExecution}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredExecutions.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No test executions found</p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* Execution Details Modal */}
      <ExecutionDetailsModal
        execution={selectedExecution}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
