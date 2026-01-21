import { createBrowserRouter } from "react-router-dom";

// Import components from separate files
import { RootLayout } from "@/components/layout/RootLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { PublicRoute } from "@/components/layout/PublicRoute";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { PricingPage } from "@/pages/PricingPage";
import { AboutPage } from "@/pages/AboutPage";
import { CareersPage } from "@/pages/CareersPage";
import { ContactPage } from "@/pages/ContactPage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogDetailPage } from "@/pages/BlogDetailPage";
import { ChangelogPage } from "@/pages/ChangelogPage";
import { TermsPage } from "@/pages/TermsPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { CookiePolicyPage } from "@/pages/CookiePolicyPage";
import { SecurityPage } from "@/pages/SecurityPage";
import { DocumentationPage } from "@/pages/DocumentationPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ServerErrorPage } from "@/pages/ServerErrorPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";

// Dashboard pages
import DashboardPage from "@/pages/dashboard/DashboardPage";
import TestsPage from "@/pages/dashboard/TestsPage";
import CreateTestPage from "@/pages/dashboard/CreateTestPage";
import TestDetailsPage from "@/pages/dashboard/TestDetailsPage";
import EditTestPage from "@/pages/dashboard/EditTestPage";
import RunTestsPage from "@/pages/dashboard/RunTestsPage";
import HistoryPage from "@/pages/dashboard/HistoryPage";
import IntegrationsPage from "@/pages/dashboard/IntegrationsPage";
import TeamPage from "@/pages/dashboard/TeamPage";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import ProfileSettingsPage from "@/pages/dashboard/ProfileSettingsPage";
import SecuritySettingsPage from "@/pages/dashboard/SecuritySettingsPage";
import TeamSettingsPage from "@/pages/dashboard/TeamSettingsPage";
import BillingSettingsPage from "@/pages/dashboard/BillingSettingsPage";

export const router = createBrowserRouter([
  // Public routes with main site layout (Header + Footer)
  {
    path: "/",
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
        element: <HomePage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "careers",
        element: <CareersPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:id",
        element: <BlogDetailPage />,
      },
      {
        path: "changelog",
        element: <ChangelogPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "cookies",
        element: <CookiePolicyPage />,
      },
      {
        path: "security",
        element: <SecurityPage />,
      },
      {
        path: "docs",
        element: <DocumentationPage />,
      },

      // Error pages
      {
        path: "500",
        element: <ServerErrorPage />,
      },
      {
        path: "403",
        element: <ForbiddenPage />,
      },
      {
        path: "401",
        element: <UnauthorizedPage />,
      },

      // Auth routes (redirect to dashboard if already authenticated)
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },

      // 404 catch-all for public routes
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  // Dashboard routes with separate layout (NO header/footer)
  {
    path: "/dashboard",
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
            element: <DashboardPage />,
          },
          {
            path: "tests",
            element: <TestsPage />,
          },
          {
            path: "tests/new",
            element: <CreateTestPage />,
          },
          {
            path: "tests/:id",
            element: <TestDetailsPage />,
          },
          {
            path: "tests/:id/edit",
            element: <EditTestPage />,
          },
          {
            path: "run",
            element: <RunTestsPage />,
          },
          {
            path: "history",
            element: <HistoryPage />,
          },
          {
            path: "integrations",
            element: <IntegrationsPage />,
          },
          {
            path: "team",
            element: <TeamPage />,
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "settings/profile",
            element: <ProfileSettingsPage />,
          },
          {
            path: "settings/security",
            element: <SecuritySettingsPage />,
          },
          {
            path: "settings/team",
            element: <TeamSettingsPage />,
          },
          {
            path: "settings/billing",
            element: <BillingSettingsPage />,
          },
          // TODO: Add more dashboard routes as we build them
          // tests/new, run, history, integrations, team, etc.
        ],
      },
    ],
  },
]);
