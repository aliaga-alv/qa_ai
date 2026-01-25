import { useEffect, useRef, useState } from 'react';
import { howItWorksSteps } from '@/mocks';

export const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => new Set(prev).add(index));
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get started in minutes with our simple 4-step process. No complex setup required.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-300 via-primary-600 to-accent-600 dark:from-primary-800 dark:via-primary-500 dark:to-accent-500 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500 opacity-50 blur-sm rounded-full" />
            </div>

            {/* Connection Dots */}
            <div className="hidden md:flex absolute top-[62px] left-0 right-0 justify-between px-8">
              {howItWorksSteps.map((_, index) => (
                <div key={index} className="relative">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-white dark:border-gray-800 shadow-lg" />
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 opacity-50 blur-sm" />
                </div>
              ))}
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 pt-24">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                const isVisible = visibleSteps.has(index);

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    className={`
                      relative flex flex-col items-center text-center
                      transition-all duration-700
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                    `}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Number Badge */}
                    <div className="relative mb-6">
                      {/* Circle with Number */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>

                      {/* Icon Container */}
                      <div className="absolute -bottom-2 -right-2 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center border-2 border-primary-500 shadow-md">
                        <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Mobile Connector Arrow */}
                    {index < howItWorksSteps.length - 1 && (
                      <div className="md:hidden mt-6 flex justify-center">
                        <div className="w-px h-12 bg-gradient-to-b from-primary-500 to-accent-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
              Start Testing Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
