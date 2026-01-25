import { useEffect, useRef, useState } from 'react';
import { homeFeatures } from '@/mocks';

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
    <section id="features" className="bg-white py-24 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Everything you need to test smarter
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Powerful features designed to accelerate your QA workflow and improve software quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {homeFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.has(index);

            return (
              <div
                key={index}
                ref={(el) => {
                  featureRefs.current[index] = el;
                }}
                className={`group rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-primary-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 p-3 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
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
