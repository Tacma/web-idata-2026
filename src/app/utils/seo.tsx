// SEO Utilities and Components

import { useEffect } from 'react';
import type { Language, SEOMetadata } from '../types';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  language: Language;
  alternateLanguage?: Language;
  alternateUrl?: string;
  keywords?: string[];
  type?: string;
}

export function SEO({
  title,
  description,
  image,
  canonical,
  language,
  alternateLanguage,
  alternateUrl,
  keywords = [],
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, attributeName = 'name') => {
      let element = document.querySelector(`meta[${attributeName}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);
    if (keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '));
    }

    // Open Graph
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', type, 'property');
    if (image) {
      setMetaTag('og:image', image, 'property');
    }

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    if (image) {
      setMetaTag('twitter:image', image);
    }

    // Language
    document.documentElement.lang = language;

    // Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    } else if (canonicalLink) {
      canonicalLink.remove();
    }

    // Hreflang
    let hreflangLink = document.querySelector('link[rel="alternate"][hreflang]') as HTMLLinkElement;
    if (alternateLanguage && alternateUrl) {
      if (!hreflangLink) {
        hreflangLink = document.createElement('link');
        hreflangLink.rel = 'alternate';
        document.head.appendChild(hreflangLink);
      }
      hreflangLink.hreflang = alternateLanguage;
      hreflangLink.href = alternateUrl;
    } else if (hreflangLink) {
      hreflangLink.remove();
    }
  }, [title, description, image, canonical, language, alternateLanguage, alternateUrl, keywords, type]);

  return null;
}

// Helper to get base URL (in production this would be the actual domain)
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://idata.com'; // Default for SSR
}

// Helper to build canonical URL
export function buildCanonicalUrl(path: string): string {
  return `${getBaseUrl()}${path}`;
}

// Helper to build alternate language URL
export function buildAlternateUrl(currentPath: string, targetLang: Language): string {
  const pathParts = currentPath.split('/').filter(Boolean);
  if (pathParts.length === 0) {
    return `${getBaseUrl()}/${targetLang}/`;
  }
  
  // Replace language prefix
  if (pathParts[0] === 'es' || pathParts[0] === 'en') {
    pathParts[0] = targetLang;
  } else {
    pathParts.unshift(targetLang);
  }
  
  return `${getBaseUrl()}/${pathParts.join('/')}/`;
}

// Helper to get alternate language
export function getAlternateLanguage(currentLang: Language): Language {
  return currentLang === 'es' ? 'en' : 'es';
}

// Schema.org structured data helpers
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'iData',
    url: getBaseUrl(),
    logo: `${getBaseUrl()}/logo.png`,
    description: 'Enterprise data and analytics solutions',
    sameAs: [
      // Add social media URLs
    ],
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
  };
}
