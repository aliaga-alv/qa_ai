import type { AuthorData } from '@/types/models';

interface BlogAuthorProps {
  author: AuthorData;
}

export const BlogAuthor = ({ author }: BlogAuthorProps) => {
  return (
    <div className="flex gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold">
          {author.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          {author.name}
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">
          {author.role}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {author.bio}
        </p>
        {(author.linkedin || author.twitter) && (
          <div className="flex gap-3 mt-3">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                LinkedIn
              </a>
            )}
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                Twitter
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
