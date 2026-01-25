import type { BenefitData } from '@/types/models';

interface BenefitCardProps {
  benefit: BenefitData;
}

export const BenefitCard = ({ benefit }: BenefitCardProps) => {
  const Icon = benefit.icon;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
    </div>
  );
};
