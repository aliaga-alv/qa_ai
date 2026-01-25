import type { ContactMethodData } from '@/types/models';

interface ContactMethodProps {
  method: ContactMethodData;
}

export const ContactMethod = ({ method }: ContactMethodProps) => {
  const Icon = method.icon;
  const content = (
    <>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{method.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{method.value}</p>
    </>
  );

  if (method.link) {
    return (
      <a
        href={method.link}
        className="block rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      {content}
    </div>
  );
};
