import { Check, X } from 'lucide-react';
import type { ComparisonFeature } from '@/types/models';

const features: ComparisonFeature[] = [
  {
    name: 'Test executions per month',
    free: '100',
    starter: '1,000',
    professional: '10,000',
    enterprise: 'Unlimited',
  },
  {
    name: 'Team members',
    free: '1',
    starter: '3',
    professional: '10',
    enterprise: 'Unlimited',
  },
  {
    name: 'AI-powered test generation',
    free: true,
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    name: 'Parallel test execution',
    free: false,
    starter: '3 parallel',
    professional: '10 parallel',
    enterprise: 'Unlimited',
  },
  {
    name: 'Test history retention',
    free: '7 days',
    starter: '30 days',
    professional: '1 year',
    enterprise: 'Unlimited',
  },
  {
    name: 'CI/CD integrations',
    free: false,
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    name: 'Custom test environments',
    free: false,
    starter: false,
    professional: '5 environments',
    enterprise: 'Unlimited',
  },
  {
    name: 'Advanced analytics',
    free: false,
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    name: 'API access',
    free: false,
    starter: 'Limited',
    professional: 'Full',
    enterprise: 'Full + webhooks',
  },
  {
    name: 'Priority support',
    free: false,
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    name: 'Custom integrations',
    free: false,
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    name: 'Dedicated account manager',
    free: false,
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    name: 'SLA guarantee',
    free: false,
    starter: false,
    professional: false,
    enterprise: '99.9% uptime',
  },
];

  const renderValue = (value: boolean | string | undefined) => {
    if (value === undefined) return <X className="h-4 w-4 text-gray-400" />;
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
    );
  }
  return (
    <span className="text-sm text-gray-900 dark:text-white font-medium">
      {value}
    </span>
  );
};

export const PricingComparison = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
              Features
            </th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
              Free
            </th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
              Starter
            </th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white bg-primary-50 dark:bg-primary-900/20">
              Professional
            </th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                {feature.name}
              </td>
              <td className="py-4 px-4 text-center">
                {renderValue(feature.free)}
              </td>
              <td className="py-4 px-4 text-center">
                {renderValue(feature.starter)}
              </td>
              <td className="py-4 px-4 text-center bg-primary-50/50 dark:bg-primary-900/10">
                {renderValue(feature.professional)}
              </td>
              <td className="py-4 px-4 text-center">
                {renderValue(feature.enterprise)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
