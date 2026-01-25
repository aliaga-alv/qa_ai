import type { ContactMethodData } from '@/types/models';

interface ContactMethodProps {
  method: ContactMethodData;
}

export const ContactMethod = ({ method }: ContactMethodProps) => {
  const Icon = method.icon;
  const content = (
    <>
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {method.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {method.value}
      </p>
    </>
  );

  if (method.link) {
    return (
      <a
        href={method.link}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow block"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      {content}
    </div>
  );
};
