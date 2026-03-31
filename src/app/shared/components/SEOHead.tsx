import { useEffect } from 'react';
import type { Language } from '../types';
import { buildPublicUrl, buildRuntimeAssetUrl } from '../utils/siteUrl';
import { getSEOSettings, getSEOSettingsSnapshot } from '../../admin/services/seoSettings.service';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string[];
  language: Language;
  alternateES?: string;
  alternateEN?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  disableStructuredData?: boolean;
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
  noIndex = false,
  noFollow = false,
  disableStructuredData = false,
}: SEOHeadProps) {
  useEffect(() => {
    let cancelled = false;

    const applyHead = (settings: ReturnType<typeof getSEOSettingsSnapshot>) => {
      const fullCanonical = buildPublicUrl(canonical);
      const fullOgImage = buildPublicUrl(ogImage || settings.defaultOgImage);
      const locale = language === 'es' ? 'es_ES' : 'en_US';
      const siteTitleTemplate =
        language === 'es' ? settings.siteTitleTemplate_es : settings.siteTitleTemplate_en;
      const defaultDescription =
        language === 'es' ? settings.defaultDescription_es : settings.defaultDescription_en;
      const snippetSuffix =
        language === 'es' ? settings.searchSnippetSuffix_es : settings.searchSnippetSuffix_en;
      const effectiveTitle = siteTitleTemplate.includes('%page_title%')
        ? siteTitleTemplate.replace('%page_title%', title)
        : title;
      const effectiveDescription = [description || defaultDescription, snippetSuffix]
        .filter(Boolean)
        .join(' ')
        .trim();
      const effectiveShareTitle = effectiveTitle;
      const effectiveShareDescription = effectiveDescription;
      const socialProfiles = [settings.linkedinUrl, settings.instagramUrl, settings.youtubeUrl].filter(Boolean);

      document.title = effectiveTitle;
      document.documentElement.lang = language;

      const setMetaTag = (name: string, content: string, attributeName = 'name') => {
        let element = document.querySelector(`meta[${attributeName}="${name}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attributeName, name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      setMetaTag('description', effectiveDescription);

      if (keywords && keywords.length > 0) {
        setMetaTag('keywords', keywords.join(', '));
      }

      const robotsIndex = noIndex ? 'noindex' : settings.robotsIndex ? 'index' : 'noindex';
      const robotsFollow = noFollow ? 'nofollow' : settings.robotsFollow ? 'follow' : 'nofollow';
      setMetaTag('robots', `${robotsIndex},${robotsFollow}`);
      setMetaTag('application-name', settings.brandName);

      setMetaTag('og:title', effectiveShareTitle, 'property');
      setMetaTag('og:description', effectiveShareDescription, 'property');
      setMetaTag('og:url', fullCanonical, 'property');
      setMetaTag('og:type', 'website', 'property');
      setMetaTag('og:image', fullOgImage, 'property');
      setMetaTag('og:locale', locale, 'property');
      setMetaTag('og:site_name', settings.brandName, 'property');

      setMetaTag('twitter:card', 'summary_large_image');
      setMetaTag('twitter:title', effectiveShareTitle);
      setMetaTag('twitter:description', effectiveShareDescription);
      setMetaTag('twitter:image', fullOgImage);

      if (settings.searchConsoleVerificationCode) {
        setMetaTag('google-site-verification', settings.searchConsoleVerificationCode);
      }

      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = fullCanonical;

      const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingAlternates.forEach((link) => link.remove());

      if (settings.enableHreflang && alternateES) {
        const linkES = document.createElement('link');
        linkES.rel = 'alternate';
        linkES.hreflang = 'es';
        linkES.href = buildPublicUrl(alternateES);
        document.head.appendChild(linkES);
      }

      if (settings.enableHreflang && alternateEN) {
        const linkEN = document.createElement('link');
        linkEN.rel = 'alternate';
        linkEN.hreflang = 'en';
        linkEN.href = buildPublicUrl(alternateEN);
        document.head.appendChild(linkEN);

        const linkDefault = document.createElement('link');
        linkDefault.rel = 'alternate';
        linkDefault.hreflang = 'x-default';
        linkDefault.href = buildPublicUrl(alternateEN);
        document.head.appendChild(linkDefault);
      }

      const setIconLink = (rel: string, href: string) => {
        let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement('link');
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = buildRuntimeAssetUrl(href);
      };

      setIconLink('icon', settings.favicon);
      setIconLink('shortcut icon', settings.favicon);
      setIconLink('apple-touch-icon', settings.appleTouchIcon);

      const existingSchema = document.getElementById('idata-global-seo-schema');
      if (existingSchema) {
        existingSchema.remove();
      }

      if (disableStructuredData) {
        return;
      }

      const schemas = [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: settings.organizationName,
          legalName: settings.organizationLegalName,
          url: settings.canonicalDomain,
          logo: buildPublicUrl(settings.organizationLogo),
          description: language === 'es' ? settings.organizationDescription_es : settings.organizationDescription_en,
          email: settings.organizationEmail,
          telephone: settings.organizationPhone,
          sameAs: socialProfiles,
          address: {
            '@type': 'PostalAddress',
            streetAddress: settings.organizationAddress.street,
            addressLocality: settings.organizationAddress.city,
            addressRegion: settings.organizationAddress.region,
            postalCode: settings.organizationAddress.postalCode,
            addressCountry: settings.organizationAddress.country,
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: language === 'es' ? 'ventas' : 'sales',
              email: settings.organizationEmail,
              telephone: settings.organizationPhone,
              availableLanguage: ['es', 'en'],
              url: buildPublicUrl(language === 'es' ? settings.contactPageUrl_es : settings.contactPageUrl_en),
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: settings.brandName,
          url: settings.canonicalDomain,
          description: effectiveDescription,
          inLanguage: language,
          publisher: {
            '@type': 'Organization',
            name: settings.organizationName,
          },
          hasPart: [
            {
              '@type': 'SiteNavigationElement',
              name: language === 'es' ? 'Contactanos' : 'Contact us',
              url: buildPublicUrl(language === 'es' ? settings.contactPageUrl_es : settings.contactPageUrl_en),
            },
            {
              '@type': 'SiteNavigationElement',
              name: language === 'es' ? 'Trabaja con nosotros' : 'Work with us',
              url: buildPublicUrl(language === 'es' ? settings.careersPageUrl_es : settings.careersPageUrl_en),
            },
            ...socialProfiles.map((url) => ({
              '@type': 'SiteNavigationElement',
              name: url.includes('linkedin')
                ? 'LinkedIn'
                : url.includes('instagram')
                  ? 'Instagram'
                  : 'YouTube',
              url,
            })),
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: effectiveTitle,
          description: effectiveDescription,
          url: fullCanonical,
          inLanguage: language,
          isPartOf: {
            '@type': 'WebSite',
            name: settings.brandName,
            url: settings.canonicalDomain,
          },
          primaryImageOfPage: fullOgImage,
        },
      ];

      const schemaScript = document.createElement('script');
      schemaScript.id = 'idata-global-seo-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.text = JSON.stringify(schemas);
      document.head.appendChild(schemaScript);
    };

    applyHead(getSEOSettingsSnapshot());
    void getSEOSettings()
      .then((settings) => {
        if (!cancelled) {
          applyHead(settings);
        }
      })
      .catch((error) => {
        console.error('Error loading SEO settings for head:', error);
      });

    return () => {
      cancelled = true;
    };
  }, [title, description, canonical, ogImage, keywords, language, alternateES, alternateEN, noIndex, noFollow, disableStructuredData]);

  return null;
}
