import { Calendar } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from '@/types/models';
import { DATE_RANGE_PRESETS } from '@/constants';

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export default function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [selectedPreset, setSelectedPreset] = useState('Last 30 days');

  const handlePresetClick = (label: string, days: number) => {
    setSelectedPreset(label);
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onChange({ start, end });
  };

  return (
    <div className="flex items-center space-x-2 overflow-x-auto">
      <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
      <div className="flex space-x-2">
        {DATE_RANGE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetClick(preset.label, preset.days)}
            className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedPreset === preset.label
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
