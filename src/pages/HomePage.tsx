import SEO from '@/components/common/SEO';
import { Hero } from '@/components/features/home/Hero';
import { Features } from '@/components/features/home/Features';
import { HowItWorks } from '@/components/features/home/HowItWorks';
import { Testimonials } from '@/components/features/home/Testimonials';
import { CTA } from '@/components/features/home/CTA';
import { PAGE_SEO } from '@/constants';

export const HomePage = () => {
  return (
    <>
      <SEO {...PAGE_SEO.home} />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
};
