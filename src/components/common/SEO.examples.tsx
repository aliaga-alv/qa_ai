/**
 * Example usage of the SEO component in different pages
 * This file demonstrates how to use SEO for various page types
 */

import SEO from '@/components/common/SEO';
import { PAGE_SEO } from '@/constants';

// ===== Example 1: Simple Page (using predefined config) =====
export function AboutPageExample() {
  return (
    <>
      <SEO {...PAGE_SEO.about} />
      {/* Your page content */}
    </>
  );
}

// ===== Example 2: Custom SEO for a specific page =====
export function CustomPageExample() {
  return (
    <>
      <SEO
        title="Custom Page Title"
        description="Custom description for this specific page"
        keywords={['custom', 'keywords', 'here']}
        image="/custom-og-image.png"
      />
      {/* Your page content */}
    </>
  );
}

// ===== Example 3: Blog Post with Article Schema =====
export function BlogPostExample() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Improve Your QA Testing Process',
    image: 'https://qa-ai.netlify.app/blog/qa-testing.png',
    author: {
      '@type': 'Person',
      name: 'Jane Doe',
    },
    publisher: {
      '@type': 'Organization',
      name: 'QA AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://qa-ai.netlify.app/logo.png',
      },
    },
    datePublished: '2026-01-28',
    dateModified: '2026-01-28',
    description: 'Learn best practices for improving your QA testing workflow',
  };

  return (
    <>
      <SEO
        title="How to Improve Your QA Testing Process"
        description="Learn best practices for improving your QA testing workflow"
        keywords={['QA', 'testing', 'best practices']}
        ogType="article"
        structuredData={structuredData}
      />
      {/* Your blog post content */}
    </>
  );
}

// ===== Example 4: Dynamic Page (e.g., Test Details) =====
export function TestDetailsExample({ test }: { test: { id: string; name: string } }) {
  return (
    <>
      <SEO
        title={`${test.name} - Test Details`}
        description={`View details, execution history, and analytics for ${test.name}`}
        noindex // Don't index dashboard pages
      />
      {/* Your test details content */}
    </>
  );
}

// ===== Example 5: Product/Service Page with Offer Schema =====
export function PricingPageExample() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'QA AI Pro Plan',
    description: 'Professional test automation for growing teams',
    offers: {
      '@type': 'Offer',
      price: '49.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
  };

  return (
    <>
      <SEO
        title="Pricing - QA AI"
        description="Flexible pricing plans for teams of all sizes"
        structuredData={structuredData}
      />
      {/* Your pricing content */}
    </>
  );
}

// ===== Example 6: Using the useSEO Hook Directly =====
import { useSEO } from '@/hooks/useSEO';

export function HookExample() {
  useSEO({
    title: 'My Page Title',
    description: 'My page description',
    keywords: ['keyword1', 'keyword2'],
  });

  return <div>{/* Your content */}</div>;
}

// ===== Example 7: FAQ Page with FAQ Schema =====
export function FAQPageExample() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I get started with QA AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sign up for a free account and follow our getting started guide.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of tests can I run?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can run unit tests, integration tests, and end-to-end tests.',
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about QA AI"
        structuredData={structuredData}
      />
      {/* Your FAQ content */}
    </>
  );
}
