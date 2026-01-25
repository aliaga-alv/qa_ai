import { Check, X } from 'lucide-react';
import { pricingComparisonFeatures } from '@/mocks';

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
          {pricingComparisonFeatures.map((feature, index) => (
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
