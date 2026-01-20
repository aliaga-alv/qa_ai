import { ServerCrash } from 'lucide-react';
import { ErrorTemplate } from '@/components/common/ErrorTemplate';

export const ServerErrorPage = () => {
  return (
    <ErrorTemplate
      icon={ServerCrash}
      code="500"
      title="Server Error"
      description="Oops! Something went wrong on our end. Our team has been notified and is working to fix the issue. Please try again later."
      showHomeButton
      showBackButton={false}
    />
  );
};
