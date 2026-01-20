import { Lock } from 'lucide-react';
import { ErrorTemplate } from '@/components/common/ErrorTemplate';
import { ROUTES } from '@/constants/routes';

export const UnauthorizedPage = () => {
  return (
    <ErrorTemplate
      icon={Lock}
      code="401"
      title="Authentication Required"
      description="You need to be signed in to access this page. Please log in to continue."
      showHomeButton
      showBackButton
      customAction={{
        label: 'Sign In',
        href: ROUTES.LOGIN,
      }}
    />
  );
};
