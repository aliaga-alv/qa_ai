import { useState } from 'react';
import type { TestSimple } from '@/types/models';

interface TestSelectorProps {
  tests: TestSimple[];
  selectedTests: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export default function TestSelector({
  tests,
  selectedTests,
  onSelectionChange,
}: TestSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleTest = (id: string) => {
    if (selectedTests.includes(id)) {
      onSelectionChange(selectedTests.filter((testId) => testId !== id));
    } else {
      onSelectionChange([...selectedTests, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTests.length === filteredTests.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(filteredTests.map((test) => test.id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Tests</h3>
        <button
          onClick={handleSelectAll}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {selectedTests.length === filteredTests.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tests..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
      />

      <div className="max-h-96 space-y-2 overflow-y-auto">
        {filteredTests.map((test) => (
          <label
            key={test.id}
            className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-700"
          >
            <input
              type="checkbox"
              checked={selectedTests.includes(test.id)}
              onChange={() => handleToggleTest(test.id)}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {test.name}
              </p>
              <div className="mt-0.5 flex items-center space-x-2">
                <span className="text-xs uppercase text-gray-500 dark:text-gray-400">
                  {test.type}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">~{test.duration}s</span>
              </div>
            </div>
          </label>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">No tests found</div>
      )}

      <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {selectedTests.length} test{selectedTests.length !== 1 ? 's' : ''} selected
        </p>
      </div>
    </div>
  );
}
