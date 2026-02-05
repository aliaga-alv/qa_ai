import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { PageSEO } from '@/constants/seo';
import { SEO_CONFIG, getPageTitle, getCanonicalUrl, getOgImageUrl } from '@/constants/seo';

/**
 * Hook to manage dynamic SEO meta tags for different pages
 * Updates document title and meta tags based on page configuration
 */
export function useSEO(config?: PageSEO) {
  const location = useLocation();

  useEffect(() => {
    if (!config) return;

    const {
      title,
      description,
      keywords = [],
      image,
      canonical,
      noindex = false,
      ogType = 'website',
    } = config;

    // Update document title
    document.title = title.includes('|') ? title : getPageTitle(title);

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update primary meta tags
    setMetaTag('description', description);
    if (keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '));
    }

    // Update robots meta tag
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update canonical link
    const canonicalUrl = canonical || getCanonicalUrl(location.pathname);
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update Open Graph tags
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', getOgImageUrl(image), true);
    setMetaTag('og:site_name', SEO_CONFIG.siteName, true);

    // Update Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:url', canonicalUrl);
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', getOgImageUrl(image));

    // Cleanup function not needed as meta tags should persist between route changes
  }, [config, location.pathname]);
}
