import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';
import { ERROR_MESSAGE_VARIANT_STYLES } from '@/constants/ui';

interface ErrorMessageProps {
  title?: string;
  message: string;
  variant?: 'error' | 'warning' | 'info';
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  className?: string;
}

const defaultIcons = {
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export const ErrorMessage = ({
  title,
  message,
  variant = 'error',
  icon,
  action,
  onDismiss,
  className,
}: ErrorMessageProps) => {
  const styles = ERROR_MESSAGE_VARIANT_STYLES[variant];
  const defaultIcon = defaultIcons[variant];

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        styles.container,
        className
      )}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={cn('shrink-0', styles.icon)}>
          {icon || defaultIcon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={cn('text-sm font-semibold mb-1', styles.title)}>
              {title}
            </h3>
          )}
          <p className={cn('text-sm', styles.message)}>{message}</p>

          {/* Action button */}
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                'mt-3 text-sm font-medium underline hover:no-underline',
                styles.message
              )}
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Dismiss button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              'shrink-0 hover:opacity-70 transition-opacity',
              styles.icon
            )}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
