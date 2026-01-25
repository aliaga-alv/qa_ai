import { useState } from 'react';
import type { TestSimple } from '../../../types/models';

interface TestSelectorProps {
  tests: TestSimple[];
  selectedTests: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export default function TestSelector({ tests, selectedTests, onSelectionChange }: TestSelectorProps) {
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
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          {selectedTests.length === filteredTests.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tests..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredTests.map((test) => (
          <label
            key={test.id}
            className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedTests.includes(test.id)}
              onChange={() => handleToggleTest(test.id)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {test.name}
              </p>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  {test.type}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ~{test.duration}s
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tests found
        </div>
      )}

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {selectedTests.length} test{selectedTests.length !== 1 ? 's' : ''} selected
        </p>
      </div>
    </div>
  );
}
