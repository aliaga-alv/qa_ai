import { useEffect, useRef, useState } from 'react';
import { 
  Zap, 
  Shield, 
  Code, 
  BarChart3, 
  Users, 
  Rocket,
  Brain,
  Clock
} from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
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

export const Features = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    featureRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to test smarter
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Powerful features designed to accelerate your QA workflow and improve software quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.has(index);

            return (
              <div
                key={index}
                ref={(el) => {
                  featureRefs.current[index] = el;
                }}
                className={`
                  group p-6 rounded-xl border border-gray-200 dark:border-gray-800 
                  bg-gray-50 dark:bg-gray-800/50 
                  hover:border-primary-500 dark:hover:border-primary-500 
                  hover:shadow-lg hover:shadow-primary-500/10
                  transition-all duration-300
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
