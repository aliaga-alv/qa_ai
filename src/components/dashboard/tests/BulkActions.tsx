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
    <div className="flex flex-col items-stretch justify-between gap-3 border-b border-primary-200 bg-primary-50 px-3 py-3 dark:border-primary-700 dark:bg-primary-900/20 sm:flex-row sm:items-center sm:px-6">
      <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
        <span className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
          {selectedCount} test{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClearSelection}
          className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 sm:text-sm"
        >
          Clear
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRunSelected}
          className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-green-700 sm:flex-none sm:space-x-2 sm:px-4 sm:text-sm"
          title="Run Selected"
        >
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">Run</span>
        </button>
        <button
          onClick={onExportSelected}
          className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-gray-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 sm:flex-none sm:space-x-2 sm:px-4 sm:text-sm"
          title="Export Selected"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
        <button
          onClick={onDeleteSelected}
          className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700 sm:flex-none sm:space-x-2 sm:px-4 sm:text-sm"
          title="Delete Selected"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
}
