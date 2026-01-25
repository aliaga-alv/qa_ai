import type { Feature, Testimonial, Step } from '@/types/models';
import {
  Zap,
  Shield,
  Code,
  BarChart3,
  Users,
  Rocket,
  Brain,
  Clock,
  Upload,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

/**
 * Homepage features
 */
export const homeFeatures: Feature[] = [
  {
    icon: Brain,
    title: 'AI-Powered Testing',
    description: 'Leverage machine learning to automatically generate test cases and identify edge cases you might miss.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Run thousands of tests in parallel with our distributed architecture. Get results in seconds, not hours.',
  },
  {
    icon: Code,
    title: 'Code-Free Automation',
    description: 'Create complex test scenarios without writing a single line of code. Visual test builder included.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights into test coverage, failure patterns, and performance metrics with beautiful dashboards.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, SSO support, and compliance with SOC 2, GDPR, and HIPAA standards.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Built-in collaboration tools with real-time updates, comments, and shared test suites.',
  },
  {
    icon: Rocket,
    title: 'CI/CD Integration',
    description: 'Seamlessly integrate with GitHub, GitLab, Jenkins, and other popular DevOps tools.',
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'Continuous testing and monitoring. Get instant alerts when something breaks in production.',
  },
];

/**
 * How it works steps
 */
export const howItWorksSteps: Step[] = [
  {
    icon: Upload,
    title: 'Upload Your Code',
    description: 'Connect your repository or upload test files. We support all major languages and frameworks.',
    number: 1,
  },
  {
    icon: Cpu,
    title: 'AI Generates Tests',
    description: 'Our AI analyzes your code and automatically generates comprehensive test cases in seconds.',
    number: 2,
  },
  {
    icon: CheckCircle2,
    title: 'Run & Validate',
    description: 'Execute tests in parallel across multiple environments. Review results in real-time.',
    number: 3,
  },
  {
    icon: BarChart3,
    title: 'Analyze & Improve',
    description: 'Get actionable insights and recommendations to improve your code quality continuously.',
    number: 4,
  },
];

/**
 * Customer testimonials
 */
export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'QA Lead',
    company: 'TechCorp',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content: 'This platform revolutionized our testing workflow. We reduced our QA cycle from 2 weeks to 3 days. The AI-powered test generation is incredibly accurate and saves us countless hours.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Engineering Manager',
    company: 'StartupHub',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    content: 'Best investment we made this year. The ROI was immediate - we caught critical bugs before production that would have cost us thousands. The team collaboration features are outstanding.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'DevOps Engineer',
    company: 'CloudScale',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    content: 'Integration with our CI/CD pipeline was seamless. The 24/7 monitoring gives us peace of mind. We have deployed to production with confidence ever since we started using this tool.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'CTO',
    company: 'FinTech Solutions',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    content: 'Security and compliance were our top concerns. This platform exceeded all expectations with enterprise-grade security and comprehensive audit logs. Highly recommend for regulated industries.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Product Manager',
    company: 'SaaS Innovators',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    content: 'The analytics dashboard provides insights we never had before. We can now make data-driven decisions about our testing strategy. The code-free automation is perfect for non-technical team members.',
    rating: 5,
  },
];
