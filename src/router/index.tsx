import { createBrowserRouter } from "react-router-dom";

// Import components from separate files
import { RootLayout } from "@/components/layout/RootLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { PublicRoute } from "@/components/layout/PublicRoute";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
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
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ServerErrorPage } from "@/pages/ServerErrorPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";

export const router = createBrowserRouter([
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

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          // Add more protected routes here
        ],
      },

      // 404 catch-all
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
