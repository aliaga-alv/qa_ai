import { ChangelogEntry } from '@/components/features/changelog/ChangelogEntry';
import { changelog } from '@/mocks';

export const ChangelogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Changelog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Stay up to date with the latest features, improvements, and fixes to QA AI.
            </p>
          </div>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            {changelog.map((entry, index) => (
              <ChangelogEntry key={index} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Never miss an update
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter to get notified about new releases and features.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3 font-semibold text-white transition-all hover:from-primary-700 hover:to-accent-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
