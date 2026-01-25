import type { ValueData } from '@/types/models';

interface ValueCardProps {
  value: ValueData;
}

export const ValueCard = ({ value }: ValueCardProps) => {
  const Icon = value.icon;

  return (
    <div className="group text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{value.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
    </div>
  );
};
