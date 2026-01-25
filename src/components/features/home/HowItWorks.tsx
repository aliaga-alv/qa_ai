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
    <section id="how-it-works" className="bg-gray-50 py-24 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            How it works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get started in minutes with our simple 4-step process. No complex setup required.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-5xl">
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="absolute left-0 right-0 top-16 hidden h-1 overflow-hidden md:block">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-300 via-primary-600 to-accent-600 dark:from-primary-800 dark:via-primary-500 dark:to-accent-500" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500 opacity-50 blur-sm" />
            </div>

            {/* Connection Dots */}
            <div className="absolute left-0 right-0 top-[62px] hidden justify-between px-8 md:flex">
              {howItWorksSteps.map((_, index) => (
                <div key={index} className="relative">
                  <div className="h-4 w-4 rounded-full border-2 border-white bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg dark:border-gray-800" />
                  <div className="absolute inset-0 h-4 w-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 opacity-50 blur-sm" />
                </div>
              ))}
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 gap-8 pt-24 md:grid-cols-4 md:gap-4">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                const isVisible = visibleSteps.has(index);

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    className={`relative flex flex-col items-center text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} `}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Number Badge */}
                    <div className="relative mb-6">
                      {/* Circle with Number */}
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>

                      {/* Icon Container */}
                      <div className="absolute -bottom-2 -right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-500 bg-white shadow-md dark:bg-gray-900">
                        <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>

                    {/* Mobile Connector Arrow */}
                    {index < howItWorksSteps.length - 1 && (
                      <div className="mt-6 flex justify-center md:hidden">
                        <div className="h-12 w-px bg-gradient-to-b from-primary-500 to-accent-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button className="transform rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-primary-700 hover:to-accent-700 hover:shadow-xl">
              Start Testing Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
