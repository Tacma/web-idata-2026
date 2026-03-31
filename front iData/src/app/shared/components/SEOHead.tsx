import { useEffect } from 'react';
import type { Language } from '../types';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string[];
  language: Language;
  alternateES?: string;
  alternateEN?: string;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  language,
  alternateES,
  alternateEN,
}: SEOHeadProps) {
  useEffect(() => {
    const siteUrl = 'https://idata.com';
    const fullCanonical = `${siteUrl}${canonical}`;
    const fullOgImage = ogImage || `${siteUrl}/og-default.jpg`;
    const locale = language === 'es' ? 'es_ES' : 'en_US';

    // Set document title
    document.title = title;

    // Set HTML lang attribute
    document.documentElement.lang = language;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, attributeName = 'name') => {
      let element = document.querySelector(`meta[${attributeName}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Set basic meta tags
    setMetaTag('description', description);
    
    if (keywords && keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '));
    }

    // Set Open Graph tags
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:url', fullCanonical, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:image', fullOgImage, 'property');
    setMetaTag('og:locale', locale, 'property');

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', fullOgImage);

    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonical;

    // Remove existing alternate links
    const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingAlternates.forEach(link => link.remove());

    // Add alternate language links
    if (alternateES) {
      const linkES = document.createElement('link');
      linkES.rel = 'alternate';
      linkES.hreflang = 'es';
      linkES.href = `${siteUrl}${alternateES}`;
      document.head.appendChild(linkES);
    }

    if (alternateEN) {
      const linkEN = document.createElement('link');
      linkEN.rel = 'alternate';
      linkEN.hreflang = 'en';
      linkEN.href = `${siteUrl}${alternateEN}`;
      document.head.appendChild(linkEN);

      // x-default points to English version
      const linkDefault = document.createElement('link');
      linkDefault.rel = 'alternate';
      linkDefault.hreflang = 'x-default';
      linkDefault.href = `${siteUrl}${alternateEN}`;
      document.head.appendChild(linkDefault);
    }
  }, [title, description, canonical, ogImage, keywords, language, alternateES, alternateEN]);

  return null;
}
