import type { ValueData, TeamMemberData } from '@/types/models';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';

/**
 * Company values
 */
export const companyValues: ValueData[] = [
  {
    icon: Target,
    title: 'Excellence',
    description:
      'We strive for excellence in everything we do, from our product to our customer service.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe great things happen when people work together toward a common goal.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: "We constantly push the boundaries of what's possible in software testing.",
  },
  {
    icon: Heart,
    title: 'Customer Focus',
    description: "Our customers' success is our success. We listen, adapt, and deliver value.",
  },
];

/**
 * Team members
 */
export const teamMembers: TeamMemberData[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    image: '/team/sarah.jpg',
    bio: 'Former VP of Engineering at a Fortune 500 company with 15 years of experience in software development.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-founder',
    image: '/team/michael.jpg',
    bio: 'Ex-Google engineer specializing in distributed systems and machine learning.',
  },
  {
    name: 'Emily Watson',
    role: 'Head of Product',
    image: '/team/emily.jpg',
    bio: 'Product leader with a track record of building developer tools used by millions.',
  },
  {
    name: 'David Kim',
    role: 'Head of AI Research',
    image: '/team/david.jpg',
    bio: 'PhD in Machine Learning from Stanford, previously led AI initiatives at major tech companies.',
  },
  {
    name: 'Lisa Thompson',
    role: 'VP of Customer Success',
    image: '/team/lisa.jpg',
    bio: 'Customer success expert who has helped hundreds of companies adopt new technologies.',
  },
  {
    name: 'James Park',
    role: 'Lead Engineer',
    image: '/team/james.jpg',
    bio: 'Full-stack engineer passionate about building scalable, user-friendly applications.',
  },
];
