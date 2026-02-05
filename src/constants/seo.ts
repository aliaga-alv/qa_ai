/**
 * SEO metadata constants for different pages
 */

export const SEO_CONFIG = {
  siteName: 'QA AI',
  siteUrl: 'https://qa-ai.netlify.app',
  defaultTitle: 'QA AI - AI-Powered Test Automation Platform',
  defaultDescription:
    'Modern React-based QA test automation platform with AI-powered testing. Run, manage, and analyze your test suites with intelligent insights.',
  defaultImage: '/og-image.png',
  twitterHandle: '@qaai',
  themeColor: '#6366f1',
} as const;

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
}

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: 'QA AI - AI-Powered Test Automation Platform',
    description:
      'Modern React-based QA test automation platform with AI-powered testing. Run, manage, and analyze your test suites with intelligent insights.',
    keywords: [
      'QA automation',
      'test automation',
      'AI testing',
      'React testing',
      'automated testing',
    ],
    image: '/og-image.png',
  },
  pricing: {
    title: 'Pricing Plans - QA AI',
    description:
      'Choose the perfect plan for your team. From startups to enterprises, we have flexible pricing to match your testing needs.',
    keywords: ['pricing', 'plans', 'QA pricing', 'test automation pricing'],
  },
  about: {
    title: 'About Us - QA AI',
    description:
      'Learn about QA AI and our mission to revolutionize test automation with AI-powered insights and modern developer tools.',
    keywords: ['about', 'company', 'team', 'mission'],
  },
  blog: {
    title: 'Blog - QA AI',
    description:
      'Read the latest articles, tutorials, and insights about test automation, AI testing, and software quality assurance.',
    keywords: ['blog', 'articles', 'testing tutorials', 'QA insights'],
  },
  docs: {
    title: 'Documentation - QA AI',
    description:
      'Complete documentation and guides for getting started with QA AI. Learn how to create, run, and manage automated tests.',
    keywords: ['documentation', 'guides', 'tutorials', 'API reference'],
  },
  contact: {
    title: 'Contact Us - QA AI',
    description:
      "Get in touch with our team. We're here to help with questions, support, or partnership opportunities.",
    keywords: ['contact', 'support', 'help', 'get in touch'],
  },
  careers: {
    title: 'Careers - Join Our Team - QA AI',
    description:
      'Join our team and help shape the future of test automation. Explore open positions and learn about working at QA AI.',
    keywords: ['careers', 'jobs', 'hiring', 'work with us'],
  },
  changelog: {
    title: 'Changelog - QA AI',
    description: 'Stay up to date with the latest features, improvements, and bug fixes in QA AI.',
    keywords: ['changelog', 'updates', 'releases', 'new features'],
  },
  security: {
    title: 'Security - QA AI',
    description:
      'Learn about our security practices, data protection, and compliance standards. Your data security is our priority.',
    keywords: ['security', 'privacy', 'compliance', 'data protection'],
  },
  terms: {
    title: 'Terms of Service - QA AI',
    description: 'Read our terms of service and user agreement.',
    noindex: true,
  },
  privacy: {
    title: 'Privacy Policy - QA AI',
    description: 'Learn how we collect, use, and protect your personal information.',
    noindex: true,
  },
  cookies: {
    title: 'Cookie Policy - QA AI',
    description: 'Information about how we use cookies and similar technologies.',
    noindex: true,
  },
  login: {
    title: 'Login - QA AI',
    description: 'Sign in to your QA AI account.',
    noindex: true,
  },
  register: {
    title: 'Create Account - QA AI',
    description: 'Create a new QA AI account to start automating your tests.',
    noindex: true,
  },
  dashboard: {
    title: 'Dashboard - QA AI',
    description: 'Manage your tests, view analytics, and monitor test execution.',
    noindex: true,
  },
  notFound: {
    title: '404 - Page Not Found - QA AI',
    description: 'The page you are looking for could not be found.',
    noindex: true,
  },
  serverError: {
    title: '500 - Server Error - QA AI',
    description: 'An unexpected error occurred. Please try again later.',
    noindex: true,
  },
};

/**
 * Generate full page title with site name
 */
export function getPageTitle(pageTitle?: string): string {
  if (!pageTitle) return SEO_CONFIG.defaultTitle;
  return `${pageTitle} | ${SEO_CONFIG.siteName}`;
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
}

/**
 * Generate Open Graph image URL
 */
export function getOgImageUrl(image?: string): string {
  if (!image) return `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`;
  if (image.startsWith('http')) return image;
  return `${SEO_CONFIG.siteUrl}${image}`;
}
