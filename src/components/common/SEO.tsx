import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { PageSEO } from '@/constants/seo';
import { useSEO } from '@/hooks/useSEO';

interface SEOProps extends PageSEO {
  /** Optional structured data (JSON-LD) */
  structuredData?: Record<string, unknown>;
}

/**
 * SEO Component for managing page metadata
 * Use this component at the top of each page to set SEO tags
 *
 * @example
 * ```tsx
 * <SEO
 *   title="About Us - QA AI"
 *   description="Learn about our mission"
 *   keywords={['about', 'company']}
 * />
 * ```
 */
export default function SEO({ structuredData, ...config }: SEOProps) {
  const location = useLocation();

  // Use the SEO hook to update meta tags
  useSEO(config);

  // Handle structured data (JSON-LD)
  useEffect(() => {
    if (!structuredData) return;

    const scriptId = 'structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [structuredData, location.pathname]);

  // This component doesn't render anything
  return null;
}
