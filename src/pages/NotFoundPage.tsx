import { FileQuestion } from 'lucide-react';
import { ErrorTemplate } from '@/components/common/ErrorTemplate';

export const NotFoundPage = () => {
  return (
    <ErrorTemplate
      icon={FileQuestion}
      code="404"
      title="Page Not Found"
      description="Sorry, we couldn't find the page you're looking for. It might have been moved or deleted, or the URL might be incorrect."
      showHomeButton
      showBackButton
    />
  );
};
