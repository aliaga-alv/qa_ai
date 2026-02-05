import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Import layout components (always loaded)
import { RootLayout } from '@/components/layout/RootLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { PublicRoute } from '@/components/layout/PublicRoute';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Lazy load page components
const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() =>
  import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('@/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import('@/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage }))
);
const PricingPage = lazy(() =>
  import('@/pages/PricingPage').then((m) => ({ default: m.PricingPage }))
);
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const CareersPage = lazy(() =>
  import('@/pages/CareersPage').then((m) => ({ default: m.CareersPage }))
);
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage'));
const ChangelogPage = lazy(() =>
  import('@/pages/ChangelogPage').then((m) => ({ default: m.ChangelogPage }))
);
const TermsPage = lazy(() => import('@/pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() =>
  import('@/pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const CookiePolicyPage = lazy(() =>
  import('@/pages/CookiePolicyPage').then((m) => ({ default: m.CookiePolicyPage }))
);
const SecurityPage = lazy(() =>
  import('@/pages/SecurityPage').then((m) => ({ default: m.SecurityPage }))
);
const DocumentationPage = lazy(() =>
  import('@/pages/DocumentationPage').then((m) => ({ default: m.DocumentationPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const ServerErrorPage = lazy(() =>
  import('@/pages/ServerErrorPage').then((m) => ({ default: m.ServerErrorPage }))
);
const ForbiddenPage = lazy(() =>
  import('@/pages/ForbiddenPage').then((m) => ({ default: m.ForbiddenPage }))
);
const UnauthorizedPage = lazy(() =>
  import('@/pages/UnauthorizedPage').then((m) => ({ default: m.UnauthorizedPage }))
);

// Lazy load dashboard pages
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const ProjectsPage = lazy(() => import('@/pages/dashboard/ProjectsPage'));
const TestsPage = lazy(() => import('@/pages/dashboard/TestsPage'));
const CreateTestPage = lazy(() => import('@/pages/dashboard/CreateTestPage'));
const TestDetailsPage = lazy(() => import('@/pages/dashboard/TestDetailsPage'));
const EditTestPage = lazy(() => import('@/pages/dashboard/EditTestPage'));
const RunTestsPage = lazy(() => import('@/pages/dashboard/RunTestsPage'));
const HistoryPage = lazy(() => import('@/pages/dashboard/HistoryPage'));
const IntegrationsPage = lazy(() => import('@/pages/dashboard/IntegrationsPage'));
const TeamPage = lazy(() => import('@/pages/dashboard/TeamPage'));
const AnalyticsPage = lazy(() => import('@/pages/dashboard/AnalyticsPage'));
const SettingsPage = lazy(() => import('@/pages/dashboard/SettingsPage'));
const ProfileSettingsPage = lazy(() => import('@/pages/dashboard/ProfileSettingsPage'));
const SecuritySettingsPage = lazy(() => import('@/pages/dashboard/SecuritySettingsPage'));
const TeamSettingsPage = lazy(() => import('@/pages/dashboard/TeamSettingsPage'));
const BillingSettingsPage = lazy(() => import('@/pages/dashboard/BillingSettingsPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const router = createBrowserRouter([
  // Public routes with main site layout (Header + Footer)
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <RootLayout />
      </>
    ),
    children: [
      // Public routes
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PricingPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'careers',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CareersPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: 'blog/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BlogDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'changelog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChangelogPage />
          </Suspense>
        ),
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: 'cookies',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CookiePolicyPage />
          </Suspense>
        ),
      },
      {
        path: 'security',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SecurityPage />
          </Suspense>
        ),
      },
      {
        path: 'docs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DocumentationPage />
          </Suspense>
        ),
      },

      // Error pages
      {
        path: '500',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ServerErrorPage />
          </Suspense>
        ),
      },
      {
        path: '403',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForbiddenPage />
          </Suspense>
        ),
      },
      {
        path: '401',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UnauthorizedPage />
          </Suspense>
        ),
      },

      // Auth routes (redirect to dashboard if already authenticated)
      {
        element: <PublicRoute />,
        children: [
          {
            path: 'login',
            element: (
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: 'register',
            element: (
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            ),
          },
          {
            path: 'forgot-password',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ForgotPasswordPage />
              </Suspense>
            ),
          },
          {
            path: 'reset-password',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ResetPasswordPage />
              </Suspense>
            ),
          },
        ],
      },

      // 404 catch-all for public routes
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },

  // Dashboard routes with separate layout (NO header/footer)
  {
    path: '/dashboard',
    element: (
      <>
        <ScrollToTop />
        <ProtectedRoute />
      </>
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: 'projects',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            ),
          },
          {
            path: 'tests',
            element: (
              <Suspense fallback={<PageLoader />}>
                <TestsPage />
              </Suspense>
            ),
          },
          {
            path: 'tests/new',
            element: (
              <Suspense fallback={<PageLoader />}>
                <CreateTestPage />
              </Suspense>
            ),
          },
          {
            path: 'tests/:id',
            element: (
              <Suspense fallback={<PageLoader />}>
                <TestDetailsPage />
              </Suspense>
            ),
          },
          {
            path: 'tests/:id/edit',
            element: (
              <Suspense fallback={<PageLoader />}>
                <EditTestPage />
              </Suspense>
            ),
          },
          {
            path: 'run',
            element: (
              <Suspense fallback={<PageLoader />}>
                <RunTestsPage />
              </Suspense>
            ),
          },
          {
            path: 'history',
            element: (
              <Suspense fallback={<PageLoader />}>
                <HistoryPage />
              </Suspense>
            ),
          },
          {
            path: 'integrations',
            element: (
              <Suspense fallback={<PageLoader />}>
                <IntegrationsPage />
              </Suspense>
            ),
          },
          {
            path: 'team',
            element: (
              <Suspense fallback={<PageLoader />}>
                <TeamPage />
              </Suspense>
            ),
          },
          {
            path: 'analytics',
            element: (
              <Suspense fallback={<PageLoader />}>
                <AnalyticsPage />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<PageLoader />}>
                <SettingsPage />
              </Suspense>
            ),
          },
          {
            path: 'settings/profile',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProfileSettingsPage />
              </Suspense>
            ),
          },
          {
            path: 'settings/security',
            element: (
              <Suspense fallback={<PageLoader />}>
                <SecuritySettingsPage />
              </Suspense>
            ),
          },
          {
            path: 'settings/team',
            element: (
              <Suspense fallback={<PageLoader />}>
                <TeamSettingsPage />
              </Suspense>
            ),
          },
          {
            path: 'settings/billing',
            element: (
              <Suspense fallback={<PageLoader />}>
                <BillingSettingsPage />
              </Suspense>
            ),
          },
          // TODO: Add more dashboard routes as we build them
          // tests/new, run, history, integrations, team, etc.
        ],
      },
    ],
  },
]);
