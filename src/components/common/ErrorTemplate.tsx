import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export interface ErrorTemplateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  code?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  customAction?: {
    label: string;
    href: string;
  };
}

export const ErrorTemplate = ({
  icon: Icon,
  title,
  description,
  code,
  showHomeButton = true,
  showBackButton = true,
  customAction,
}: ErrorTemplateProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        {code && (
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              {code}
            </h1>
          </div>
        )}

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center">
            <Icon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Go Back
            </button>
          )}
          
          {showHomeButton && (
            <Link
              to={ROUTES.HOME}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all shadow-lg"
            >
              Go to Home
            </Link>
          )}

          {customAction && (
            <Link
              to={customAction.href}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all shadow-lg"
            >
              {customAction.label}
            </Link>
          )}
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need help? Check out these resources:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link
              to="/contact"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              Contact Support
            </Link>
            <Link
              to="/blog"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              Read Our Blog
            </Link>
            <Link
              to={ROUTES.PRICING}
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
