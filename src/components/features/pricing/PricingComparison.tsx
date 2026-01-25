import { Check, X } from 'lucide-react';
import { pricingComparisonFeatures } from '@/mocks';

const renderValue = (value: boolean | string | undefined) => {
  if (value === undefined) return <X className="h-4 w-4 text-gray-400" />;
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-green-600 dark:text-green-400" />
    ) : (
      <X className="mx-auto h-5 w-5 text-gray-300 dark:text-gray-600" />
    );
  }
  return <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>;
};

export const PricingComparison = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-white">
              Features
            </th>
            <th className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white">
              Free
            </th>
            <th className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white">
              Starter
            </th>
            <th className="bg-primary-50 px-4 py-4 text-center font-semibold text-gray-900 dark:bg-primary-900/20 dark:text-white">
              Professional
            </th>
            <th className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody>
          {pricingComparisonFeatures.map((feature, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
            >
              <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{feature.name}</td>
              <td className="px-4 py-4 text-center">{renderValue(feature.free)}</td>
              <td className="px-4 py-4 text-center">{renderValue(feature.starter)}</td>
              <td className="bg-primary-50/50 px-4 py-4 text-center dark:bg-primary-900/10">
                {renderValue(feature.professional)}
              </td>
              <td className="px-4 py-4 text-center">{renderValue(feature.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
