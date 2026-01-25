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
  const [selectedExecution, setSelectedExecution] = useState<typeof mockHistoryExecutionDetail | null>(null);
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
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <HistoryDatePicker value={dateRange} onChange={setDateRange} />

        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Triggered By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No test executions found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
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
