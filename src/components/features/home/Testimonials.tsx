import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/mocks';

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
    <section id="testimonials" className="overflow-hidden bg-white py-24 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Loved by teams worldwide
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of companies that trust us with their QA workflows.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-8 shadow-xl dark:from-gray-800 dark:to-gray-800/50 md:p-12">
            {/* Quote Icon */}
            <div className="absolute left-8 top-8 opacity-10 dark:opacity-5">
              <Quote className="h-24 w-24 text-primary-600" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="mb-6 flex justify-center gap-1 md:justify-start">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current text-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="mb-8 min-h-[120px] text-xl leading-relaxed text-gray-800 dark:text-gray-200 md:min-h-[100px] md:text-2xl">
                "{currentTestimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
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
              className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-primary-500 hover:text-white dark:bg-gray-800 dark:hover:bg-primary-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-primary-600'
                      : 'w-2 bg-gray-300 hover:bg-primary-400 dark:bg-gray-700'
                  } `}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-primary-500 hover:text-white dark:bg-gray-800 dark:hover:bg-primary-500"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
