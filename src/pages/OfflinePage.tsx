import { WifiOff } from 'lucide-react';
import { ErrorTemplate } from '@/components/common/ErrorTemplate';

export const OfflinePage = () => {
  return (
    <ErrorTemplate
      icon={WifiOff}
      title="You're Offline"
      description="It looks like you've lost your internet connection. Please check your network settings and try again."
      showHomeButton={false}
      showBackButton={false}
      customAction={{
        label: 'Retry',
        href: window.location.pathname,
      }}
    />
  );
};
