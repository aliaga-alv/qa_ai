import { Target, Zap, Users, Heart, Shield, Lightbulb } from 'lucide-react';
import { TeamMember } from '@/components/features/about/TeamMember';
import { ValueCard } from '@/components/features/about/ValueCard';
import { StatCard } from '@/components/features/about/StatCard';
import { ROUTES } from '@/constants/routes';
import type { TeamMemberData, ValueData } from '@/types/models';

const values: ValueData[] = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We\'re committed to making quality assurance accessible to every development team, regardless of size or resources.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We leverage cutting-edge AI technology to revolutionize how teams approach testing and quality assurance.',
  },
  {
    icon: Users,
    title: 'User-Centric',
    description: 'Every feature we build starts with understanding and solving real problems faced by development teams.',
  },
  {
    icon: Heart,
    title: 'Quality Obsessed',
    description: 'We practice what we preach - our own development process is built on rigorous testing and continuous improvement.',
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your code and data security is paramount. We maintain the highest standards of data protection and privacy.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Learning',
    description: 'We stay at the forefront of QA and AI technology, constantly evolving to serve you better.',
  },
];

const team: TeamMemberData[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former QA lead at Google, passionate about making testing accessible to all developers.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    image: '',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'AI researcher with 10+ years building intelligent systems for software development.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    image: '',
  },
  {
    name: 'Emily Watson',
    role: 'Head of Engineering',
    bio: 'Previously at Amazon, specializing in scalable testing infrastructure and automation.',
    linkedin: 'https://linkedin.com',
    image: '',
  },
  {
    name: 'David Kim',
    role: 'Head of Product',
    bio: 'Product leader with a track record of building developer tools that teams love.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    image: '',
  },
  {
    name: 'Lisa Thompson',
    role: 'Head of Customer Success',
    bio: 'Dedicated to ensuring every team gets maximum value from our platform.',
    linkedin: 'https://linkedin.com',
    image: '',
  },
  {
    name: 'James Park',
    role: 'Lead AI Engineer',
    bio: 'PhD in Machine Learning, building the AI that powers our intelligent test generation.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    image: '',
  },
];

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Building the future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                Quality Assurance
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              We believe every development team deserves access to world-class testing tools. 
              QA AI combines the power of artificial intelligence with intuitive design to make 
              comprehensive testing accessible, fast, and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                QA AI was born from a simple frustration: testing shouldn't be the bottleneck in software development. 
                Our founders, Sarah and Michael, spent years leading QA teams at major tech companies and witnessed 
                firsthand how manual testing processes slowed down releases and frustrated developers.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                In 2024, they decided to build the solution they wished existed - an AI-powered testing platform that 
                could understand your application, generate comprehensive test cases, and catch bugs before they reach 
                production. What started as a side project quickly grew into a mission to transform how teams approach 
                quality assurance.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, QA AI is trusted by thousands of development teams worldwide, from startups to enterprises. 
                We're proud to be helping teams ship faster, with confidence, knowing their code is thoroughly tested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard value="10K" label="Active Teams" suffix="+" />
              <StatCard value="50M" label="Tests Executed" suffix="+" />
              <StatCard value="99.9" label="Uptime SLA" suffix="%" />
              <StatCard value="4.9" label="Customer Rating" suffix="/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
              The principles that guide everything we do
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
              The people building the future of QA
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <TeamMember key={index} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-900 dark:to-accent-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join us on our mission
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for talented, passionate people to join our team. 
            Check out our open positions or start using QA AI today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/careers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl"
            >
              View Careers
            </a>
            <a
              href={ROUTES.REGISTER}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
