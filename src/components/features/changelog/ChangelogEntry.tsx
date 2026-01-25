import { Calendar, Tag } from "lucide-react";
import type { ChangelogData } from "@/types/models";
import {
  CHANGELOG_ENTRY_CATEGORY_COLORS,
  CHANGELOG_ENTRY_TYPE_COLORS,
} from "@/constants";

interface ChangelogEntryProps {
  entry: ChangelogData;
}

const categoryColors = CHANGELOG_ENTRY_CATEGORY_COLORS;
const typeColors = CHANGELOG_ENTRY_TYPE_COLORS;

export const ChangelogEntry = ({ entry }: ChangelogEntryProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              v{entry.version}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${typeColors[entry.type]}`}
            >
              {entry.type}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{entry.date}</span>
          </div>
        </div>
      </div>

      {/* Changes */}
      <div className="space-y-6">
        {entry.changes.map((change, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[change.category]}`}
              >
                {change.category}
              </span>
            </div>
            <ul className="space-y-2 ml-6">
              {change.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                >
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
