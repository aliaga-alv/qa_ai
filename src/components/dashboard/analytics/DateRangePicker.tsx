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
      <Calendar className="h-5 w-5 flex-shrink-0 text-gray-400" />
      <div className="flex space-x-2">
        {DATE_RANGE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetClick(preset.label, preset.days)}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
              selectedPreset === preset.label
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
