/**
 * Content-related type definitions (blog, pricing, contact, careers, etc.)
 */

import type { LucideIcon } from 'lucide-react';

// Blog types
export interface AuthorData {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  x?: string;
  linkedin?: string;
}

export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  tags?: string[];
  image?: string;
  category?: string;
}

export interface FullBlogPost extends BlogPostData {
  authorInfo: AuthorData;
  relatedPosts?: BlogPostData[];
}

// Pricing types
export interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  popular?: boolean;
  cta: string;
  ctaLink: string;
}

export interface ComparisonFeature {
  name: string;
  free: boolean | string;
  starter?: boolean | string;
  professional?: boolean | string;
  pro?: boolean | string;
  enterprise: boolean | string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// Contact types
export interface ContactMethodData {
  icon: LucideIcon;
  title: string;
  value: string;
  link?: string;
}

export interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  link: string;
  description: string;
}

// Careers types
export interface JobData {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export interface BenefitData {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

// Changelog types
export interface ChangelogData {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  changes: {
    category: 'New' | 'Improved' | 'Fixed' | 'Removed';
    items: string[];
  }[];
}

export interface ChangelogItem {
  version: string;
  date: string;
  changes: {
    type: 'feature' | 'improvement' | 'bugfix';
    description: string;
  }[];
}

// About types
export interface TeamMemberData {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  x?: string;
}

export interface TeamMemberInfo {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    x?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface CompanyStat {
  label: string;
  value: string;
  description?: string;
}

export interface ValueData {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

// Home/Features types
export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  number: number;
}

// Testimonial type
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}
