import { Hero } from '@/components/features/home/Hero';
import { Features } from '@/components/features/home/Features';
import { HowItWorks } from '@/components/features/home/HowItWorks';
import { Testimonials } from '@/components/features/home/Testimonials';
import { CTA } from '@/components/features/home/CTA';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
};
