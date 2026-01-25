import type { JobData, BenefitData } from '@/types/models';
import { Heart, Umbrella, Plane, GraduationCap, Home, Zap } from 'lucide-react';

/**
 * Job openings
 */
export const jobs: JobData[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    description:
      'Build beautiful, performant user interfaces for our AI-powered testing platform. Work with React, TypeScript, and cutting-edge web technologies.',
  },
  {
    id: '2',
    title: 'Machine Learning Engineer',
    department: 'AI Research',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description:
      'Develop and improve our AI models for intelligent test generation and analysis. Work with large-scale datasets and state-of-the-art ML techniques.',
  },
  {
    id: '3',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Design intuitive experiences that help developers test their applications more effectively. Own the end-to-end design process from research to implementation.',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Build and maintain the infrastructure that powers millions of test executions. Work with Kubernetes, AWS, and modern DevOps tools.',
  },
  {
    id: '5',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    description:
      'Help our customers succeed with QA AI. Build relationships, provide guidance, and ensure teams get maximum value from our platform.',
  },
  {
    id: '6',
    title: 'Content Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Create compelling content that educates developers about testing best practices and showcases our platform. Own our blog, case studies, and technical content.',
  },
];

/**
 * Company benefits
 */
export const benefits: BenefitData[] = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description:
      'Comprehensive health, dental, and vision insurance for you and your family. Plus mental health support and wellness programs.',
  },
  {
    icon: Umbrella,
    title: 'Work-Life Balance',
    description:
      'Flexible work hours, unlimited PTO, and remote-first culture. We trust you to do your best work on your own schedule.',
  },
  {
    icon: Plane,
    title: 'Team Retreats',
    description:
      'Annual company retreats and quarterly team offsites. Connect with colleagues and explore new places together.',
  },
  {
    icon: GraduationCap,
    title: 'Learning & Growth',
    description:
      '$2,000 annual learning budget for courses, conferences, and books. Plus regular internal knowledge sharing sessions.',
  },
  {
    icon: Home,
    title: 'Remote Setup',
    description:
      '$1,500 home office stipend and monthly coworking allowance. Get the equipment and workspace you need.',
  },
  {
    icon: Zap,
    title: 'Equity & Bonuses',
    description:
      'Competitive equity packages and performance bonuses. Share in our success as we grow.',
  },
];
