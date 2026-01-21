import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface DateRange {
  start: Date;
  end: Date;
}

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
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <span className="text-gray-500 dark:text-gray-400">to</span>
        <input
          type="date"
          value={format(value.end, 'yyyy-MM-dd')}
          onChange={handleEndChange}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
}
