import { Calendar } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from '../../../types/models';

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const presets = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Last 6 months', days: 180 },
];

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
    <div className="flex items-center space-x-2">
      <Calendar className="h-5 w-5 text-gray-400" />
      <div className="flex space-x-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetClick(preset.label, preset.days)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
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
