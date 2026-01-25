import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from '@/types/models';

interface HistoryDatePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export default function HistoryDatePicker({ value, onChange }: HistoryDatePickerProps) {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, start: new Date(e.target.value) });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, end: new Date(e.target.value) });
  };

  return (
    <div className="flex items-center space-x-3">
      <Calendar className="h-5 w-5 text-gray-400" />
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={format(value.start, 'yyyy-MM-dd')}
          onChange={handleStartChange}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <span className="text-gray-500 dark:text-gray-400">to</span>
        <input
          type="date"
          value={format(value.end, 'yyyy-MM-dd')}
          onChange={handleEndChange}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>
  );
}
