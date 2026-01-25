import { Play, Trash2, Download } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onRunSelected: () => void;
  onDeleteSelected: () => void;
  onExportSelected: () => void;
  onClearSelection: () => void;
}

export default function BulkActions({
  selectedCount,
  onRunSelected,
  onDeleteSelected,
  onExportSelected,
  onClearSelection,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-3 sm:px-6 py-3 bg-primary-50 dark:bg-primary-900/20 border-b border-primary-200 dark:border-primary-700">
      <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
          {selectedCount} test{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClearSelection}
          className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          Clear
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRunSelected}
          className="flex items-center justify-center space-x-1.5 sm:space-x-2 flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
          title="Run Selected"
        >
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">Run</span>
        </button>
        <button
          onClick={onExportSelected}
          className="flex items-center justify-center space-x-1.5 sm:space-x-2 flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
          title="Export Selected"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
        <button
          onClick={onDeleteSelected}
          className="flex items-center justify-center space-x-1.5 sm:space-x-2 flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
          title="Delete Selected"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
}
