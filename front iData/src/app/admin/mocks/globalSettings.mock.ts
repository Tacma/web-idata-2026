import type { SEOGlobalSettings } from '../types';

export const mockGlobalSettings: SEOGlobalSettings = {
  site_title_template_es: '%page_title% | iData Global',
  site_title_template_en: '%page_title% | iData Global',
  default_meta_description_es: 'Transformamos datos en valor empresarial. Soluciones de Data Analytics, AI & ML para empresas en LATAM y el mundo.',
  default_meta_description_en: 'We transform data into business value. Data Analytics, AI & ML solutions for companies in LATAM and worldwide.',
  default_og_image: '/images/og-default.png',
  robots_default_index: true,
  robots_default_follow: true,
  canonical_domain: 'https://idata.global',
  hreflang_enabled: true,
  favicon: '/favicon.ico',
  apple_touch_icon: '/apple-touch-icon.png',
  brand_name: 'iData Global',
  default_share_title_es: 'iData Global - Transformamos datos en valor',
  default_share_title_en: 'iData Global - We transform data into value',
  default_share_description_es: 'Líderes en soluciones de Data Analytics e Inteligencia Artificial en LATAM',
  default_share_description_en: 'Leaders in Data Analytics and AI solutions in LATAM',
  organization_schema: {
    name: 'iData Global',
    legal_name: 'iData Global LATAM',
    url: 'https://idata.global',
    logo: 'https://idata.global/logo.png',
    description_es: 'Transformamos datos en valor empresarial',
    description_en: 'We transform data into business value',
    email: 'info@idata.global',
    phone: '+57 300 571 3092',
    address: {
      street: 'Calle Principal 123',
      city: 'Bogotá',
      region: 'Cundinamarca',
      postal_code: '110111',
      country: 'CO'
    },
    social_profiles: [
      'https://www.linkedin.com/company/idata-global-latam',
      'https://www.instagram.com/idata.global',
      'https://www.youtube.com/@idata.global'
    ]
  }
};

// Additional global configuration
export interface GlobalConfiguration {
  default_public_language: 'es' | 'en';
  root_domain_language_mode: 'redirect' | 'default';
  localized_route_strategy: 'prefix' | 'domain';
  marketing_email: string;
  careers_email: string;
  contact_phones: Array<{
    label_es: string;
    label_en: string;
    number: string;
    type: string;
  }>;
  social_links: Array<{
    platform: string;
    url: string;
    enabled: boolean;
  }>;
}

export const mockGlobalConfiguration: GlobalConfiguration = {
  default_public_language: 'en', // Changed to English as default
  root_domain_language_mode: 'default',
  localized_route_strategy: 'prefix',
  marketing_email: 'marketing@idata.global',
  careers_email: 'careers@idata.global',
  contact_phones: [
    {
      label_es: 'LATAM',
      label_en: 'LATAM',
      number: '+57 300 571 3092',
      type: 'primary'
    },
    {
      label_es: 'USA',
      label_en: 'USA',
      number: '+1 303 901 9526',
      type: 'primary'
    },
    {
      label_es: 'Administrativo',
      label_en: 'Administrative',
      number: '+57 300 479 91 52',
      type: 'administrative'
    }
  ],
  social_links: [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/company/idata-global-latam/posts/?feedView=all',
      enabled: true
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/idata.global/',
      enabled: true
    },
    {
      platform: 'youtube',
      url: 'https://www.youtube.com/@idata.global',
      enabled: true
    }
  ]
};
