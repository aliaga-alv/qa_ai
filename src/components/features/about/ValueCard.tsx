import type { ValueData } from '@/types/models';

interface ValueCardProps {
  value: ValueData;
}

export const ValueCard = ({ value }: ValueCardProps) => {
  const Icon = value.icon;
  
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {value.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {value.description}
      </p>
    </div>
  );
};
