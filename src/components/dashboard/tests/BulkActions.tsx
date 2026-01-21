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
    <div className="flex items-center justify-between px-6 py-3 bg-primary-50 dark:bg-primary-900/20 border-b border-primary-200 dark:border-primary-700">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {selectedCount} test{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClearSelection}
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          Clear selection
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onRunSelected}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Play className="h-4 w-4" />
          <span>Run Selected</span>
        </button>
        <button
          onClick={onExportSelected}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
        <button
          onClick={onDeleteSelected}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
