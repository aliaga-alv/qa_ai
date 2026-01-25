import { cn } from '@/lib/utils';
import { SPINNER_SIZE_CLASSES, SPINNER_VARIANT_CLASSES } from '@/constants';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  className,
  fullScreen = false,
  text,
}: LoadingSpinnerProps) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={cn(
          'rounded-full animate-spin',
          SPINNER_SIZE_CLASSES[size],
          SPINNER_VARIANT_CLASSES[variant],
          className
        )}
      />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};
