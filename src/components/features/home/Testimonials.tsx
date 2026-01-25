import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Testimonial } from '@/types/models';

const testimonials: Testimonial[] = [
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

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of companies that trust us with their QA workflows.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10 dark:opacity-5">
              <Quote className="w-24 h-24 text-primary-600" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center md:justify-start">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed mb-8 min-h-[120px] md:min-h-[100px]">
                "{currentTestimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    h-2 rounded-full transition-all
                    ${index === currentIndex 
                      ? 'w-8 bg-primary-600' 
                      : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-primary-400'
                    }
                  `}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
