import type { AuthorData } from '@/types/models';

interface BlogAuthorProps {
  author: AuthorData;
}

export const BlogAuthor = ({ author }: BlogAuthorProps) => {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-shrink-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-xl font-bold text-white">
          {author.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{author.name}</h3>
        <p className="mb-2 text-sm text-primary-600 dark:text-primary-400">{author.role}</p>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{author.bio}</p>
        {(author.linkedin || author.x) && (
          <div className="mt-3 flex gap-3">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                LinkedIn
              </a>
            )}
            {author.x && (
              <a
                href={author.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                X
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
