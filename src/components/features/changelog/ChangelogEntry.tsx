import { Calendar, Tag } from 'lucide-react';
import type { ChangelogData } from '@/types/models';
import { CHANGELOG_ENTRY_CATEGORY_COLORS, CHANGELOG_ENTRY_TYPE_COLORS } from '@/constants';

interface ChangelogEntryProps {
  entry: ChangelogData;
}

const categoryColors = CHANGELOG_ENTRY_CATEGORY_COLORS;
const typeColors = CHANGELOG_ENTRY_TYPE_COLORS;

export const ChangelogEntry = ({ entry }: ChangelogEntryProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-6 dark:border-gray-700 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">v{entry.version}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${typeColors[entry.type]}`}
            >
              {entry.type}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{entry.date}</span>
          </div>
        </div>
      </div>

      {/* Changes */}
      <div className="space-y-6">
        {entry.changes.map((change, idx) => (
          <div key={idx}>
            <div className="mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[change.category]}`}
              >
                {change.category}
              </span>
            </div>
            <ul className="ml-6 space-y-2">
              {change.items.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed text-gray-700 dark:text-gray-300">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
