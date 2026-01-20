import { ShieldX } from 'lucide-react';
import { ErrorTemplate } from '@/components/common/ErrorTemplate';
import { ROUTES } from '@/constants/routes';

export const ForbiddenPage = () => {
  return (
    <ErrorTemplate
      icon={ShieldX}
      code="403"
      title="Access Forbidden"
      description="You don't have permission to access this resource. If you believe this is an error, please contact your administrator or sign in with a different account."
      showHomeButton
      showBackButton
      customAction={{
        label: 'Sign In',
        href: ROUTES.LOGIN,
      }}
    />
  );
};
