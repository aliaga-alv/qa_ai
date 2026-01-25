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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-2xl text-center">
        {/* Error Code */}
        {code && (
          <div className="mb-8">
            <h1 className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
              {code}
            </h1>
          </div>
        )}

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
            <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          {title}
        </h2>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Go Back
            </button>
          )}

          {showHomeButton && (
            <Link
              to={ROUTES.HOME}
              className="rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-primary-700 hover:to-accent-700"
            >
              Go to Home
            </Link>
          )}

          {customAction && (
            <Link
              to={customAction.href}
              className="rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-primary-700 hover:to-accent-700"
            >
              {customAction.label}
            </Link>
          )}
        </div>

        {/* Additional Help */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Need help? Check out these resources:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/contact"
              className="font-medium text-primary-600 hover:underline dark:text-primary-400"
            >
              Contact Support
            </Link>
            <Link
              to="/blog"
              className="font-medium text-primary-600 hover:underline dark:text-primary-400"
            >
              Read Our Blog
            </Link>
            <Link
              to={ROUTES.PRICING}
              className="font-medium text-primary-600 hover:underline dark:text-primary-400"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
