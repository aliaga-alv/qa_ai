import type { BenefitData } from '@/types/models';

interface BenefitCardProps {
  benefit: BenefitData;
}

export const BenefitCard = ({ benefit }: BenefitCardProps) => {
  const Icon = benefit.icon;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {benefit.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {benefit.description}
      </p>
    </div>
  );
};
