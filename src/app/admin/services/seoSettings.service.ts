import { getCachedSiteSetting, getSiteSetting, saveSiteSetting } from './siteSettings.service';

export interface OrganizationAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface SEOSettings {
  siteTitleTemplate_es: string;
  siteTitleTemplate_en: string;
  defaultDescription_es: string;
  defaultDescription_en: string;
  defaultOgImage: string;
  canonicalDomain: string;
  favicon: string;
  appleTouchIcon: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  enableHreflang: boolean;
  brandName: string;
  defaultShareTitle_es: string;
  defaultShareTitle_en: string;
  defaultShareDescription_es: string;
  defaultShareDescription_en: string;
  searchSnippetSuffix_es: string;
  searchSnippetSuffix_en: string;
  contactPageUrl_es: string;
  contactPageUrl_en: string;
  careersPageUrl_es: string;
  careersPageUrl_en: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  searchConsoleVerificationCode: string;
  organizationName: string;
  organizationLegalName: string;
  organizationDescription_es: string;
  organizationDescription_en: string;
  organizationEmail: string;
  organizationPhone: string;
  organizationLogo: string;
  organizationAddress: OrganizationAddress;
}

const defaultSettings: SEOSettings = {
  siteTitleTemplate_es: '%page_title% | iData Global',
  siteTitleTemplate_en: '%page_title% | iData Global',
  defaultDescription_es:
    'Transformamos datos en valor empresarial para empresas en LATAM. Contactanos, trabaja con nosotros y descubre nuestras soluciones de Data Analytics, AI y ML.',
  defaultDescription_en:
    'We transform data into business value for companies in the United States and Europe. Contact us, work with us, and explore our Data Analytics, AI and ML solutions.',
  defaultOgImage: '/assets/logos/brand/logo-complete.png',
  canonicalDomain: 'https://idata.global',
  favicon: '/favicon.svg',
  appleTouchIcon: '/favicon.svg',
  robotsIndex: true,
  robotsFollow: true,
  enableHreflang: true,
  brandName: 'iData Global',
  defaultShareTitle_es: 'iData Global | Datos, analitica e inteligencia artificial',
  defaultShareTitle_en: 'iData Global | Data, analytics and artificial intelligence',
  defaultShareDescription_es:
    'Explora nuestros servicios, contactanos, conoce vacantes y sigue a iData en LinkedIn, Instagram y YouTube.',
  defaultShareDescription_en:
    'Explore our services, contact us, discover career opportunities and follow iData on LinkedIn, Instagram and YouTube.',
  searchSnippetSuffix_es:
    'Contactanos. Trabaja con nosotros. Siguenos en LinkedIn, Instagram y YouTube.',
  searchSnippetSuffix_en:
    'Contact us. Work with us. Follow us on LinkedIn, Instagram and YouTube.',
  contactPageUrl_es: '/es/contacto/',
  contactPageUrl_en: '/en/contact/',
  careersPageUrl_es: '/es/trabaja-con-nosotros/',
  careersPageUrl_en: '/en/work-with-us/',
  linkedinUrl: 'https://www.linkedin.com/company/idata-global-latam/posts/?feedView=all',
  instagramUrl: 'https://www.instagram.com/idata.global/',
  youtubeUrl: 'https://www.youtube.com/@idata.global',
  searchConsoleVerificationCode: '',
  organizationName: 'iData Global',
  organizationLegalName: 'iData Global LATAM',
  organizationDescription_es: 'Transformamos datos en valor empresarial.',
  organizationDescription_en: 'We transform data into business value.',
  organizationEmail: 'info@idata.global',
  organizationPhone: '+57 300 571 3092',
  organizationLogo: '/assets/logos/brand/logo-complete.png',
  organizationAddress: {
    street: 'Bogota, Colombia',
    city: 'Bogota',
    region: 'Cundinamarca',
    postalCode: '110111',
    country: 'CO',
  },
};

function normalizeSettings(raw: any): SEOSettings {
  const organizationAddress = raw?.organizationAddress || {};

  return {
    siteTitleTemplate_es: raw?.siteTitleTemplate_es || defaultSettings.siteTitleTemplate_es,
    siteTitleTemplate_en: raw?.siteTitleTemplate_en || defaultSettings.siteTitleTemplate_en,
    defaultDescription_es: raw?.defaultDescription_es || defaultSettings.defaultDescription_es,
    defaultDescription_en: raw?.defaultDescription_en || defaultSettings.defaultDescription_en,
    defaultOgImage: raw?.defaultOgImage || raw?.default_og_image || defaultSettings.defaultOgImage,
    canonicalDomain: raw?.canonicalDomain || raw?.canonical_domain || defaultSettings.canonicalDomain,
    favicon: raw?.favicon || defaultSettings.favicon,
    appleTouchIcon: raw?.appleTouchIcon || raw?.apple_touch_icon || defaultSettings.appleTouchIcon,
    robotsIndex:
      typeof raw?.robotsIndex === 'boolean'
        ? raw.robotsIndex
        : typeof raw?.robots_default_index === 'boolean'
          ? raw.robots_default_index
          : defaultSettings.robotsIndex,
    robotsFollow:
      typeof raw?.robotsFollow === 'boolean'
        ? raw.robotsFollow
        : typeof raw?.robots_default_follow === 'boolean'
          ? raw.robots_default_follow
          : defaultSettings.robotsFollow,
    enableHreflang:
      typeof raw?.enableHreflang === 'boolean'
        ? raw.enableHreflang
        : typeof raw?.hreflang_enabled === 'boolean'
          ? raw.hreflang_enabled
          : defaultSettings.enableHreflang,
    brandName: raw?.brandName || raw?.brand_name || defaultSettings.brandName,
    defaultShareTitle_es: raw?.defaultShareTitle_es || raw?.default_share_title_es || defaultSettings.defaultShareTitle_es,
    defaultShareTitle_en: raw?.defaultShareTitle_en || raw?.default_share_title_en || defaultSettings.defaultShareTitle_en,
    defaultShareDescription_es:
      raw?.defaultShareDescription_es || raw?.default_share_description_es || defaultSettings.defaultShareDescription_es,
    defaultShareDescription_en:
      raw?.defaultShareDescription_en || raw?.default_share_description_en || defaultSettings.defaultShareDescription_en,
    searchSnippetSuffix_es: raw?.searchSnippetSuffix_es || defaultSettings.searchSnippetSuffix_es,
    searchSnippetSuffix_en: raw?.searchSnippetSuffix_en || defaultSettings.searchSnippetSuffix_en,
    contactPageUrl_es: raw?.contactPageUrl_es || defaultSettings.contactPageUrl_es,
    contactPageUrl_en: raw?.contactPageUrl_en || defaultSettings.contactPageUrl_en,
    careersPageUrl_es: raw?.careersPageUrl_es || defaultSettings.careersPageUrl_es,
    careersPageUrl_en: raw?.careersPageUrl_en || defaultSettings.careersPageUrl_en,
    linkedinUrl:
      raw?.linkedinUrl ||
      raw?.organization_schema?.social_profiles?.find((url: string) => url.includes('linkedin')) ||
      defaultSettings.linkedinUrl,
    instagramUrl:
      raw?.instagramUrl ||
      raw?.organization_schema?.social_profiles?.find((url: string) => url.includes('instagram')) ||
      defaultSettings.instagramUrl,
    youtubeUrl:
      raw?.youtubeUrl ||
      raw?.organization_schema?.social_profiles?.find((url: string) => url.includes('youtube')) ||
      defaultSettings.youtubeUrl,
    searchConsoleVerificationCode: raw?.searchConsoleVerificationCode || raw?.search_console_verification_code || '',
    organizationName: raw?.organizationName || raw?.organization_schema?.name || defaultSettings.organizationName,
    organizationLegalName:
      raw?.organizationLegalName || raw?.organization_schema?.legal_name || defaultSettings.organizationLegalName,
    organizationDescription_es:
      raw?.organizationDescription_es ||
      raw?.organization_schema?.description_es ||
      defaultSettings.organizationDescription_es,
    organizationDescription_en:
      raw?.organizationDescription_en ||
      raw?.organization_schema?.description_en ||
      defaultSettings.organizationDescription_en,
    organizationEmail: raw?.organizationEmail || raw?.organization_schema?.email || defaultSettings.organizationEmail,
    organizationPhone: raw?.organizationPhone || raw?.organization_schema?.phone || defaultSettings.organizationPhone,
    organizationLogo: raw?.organizationLogo || raw?.organization_schema?.logo || defaultSettings.organizationLogo,
    organizationAddress: {
      street: organizationAddress.street || raw?.organization_schema?.address?.street || defaultSettings.organizationAddress.street,
      city: organizationAddress.city || raw?.organization_schema?.address?.city || defaultSettings.organizationAddress.city,
      region:
        organizationAddress.region || raw?.organization_schema?.address?.region || defaultSettings.organizationAddress.region,
      postalCode:
        organizationAddress.postalCode ||
        raw?.organization_schema?.address?.postal_code ||
        defaultSettings.organizationAddress.postalCode,
      country:
        organizationAddress.country || raw?.organization_schema?.address?.country || defaultSettings.organizationAddress.country,
    },
  };
}

export function getSEOSettingsSnapshot(): SEOSettings {
  return normalizeSettings(getCachedSiteSetting('seo_settings', defaultSettings));
}

export async function getSEOSettings(): Promise<SEOSettings> {
  const raw = await getSiteSetting('seo', 'seo_settings', defaultSettings);
  const normalized = normalizeSettings(raw);
  await saveSiteSetting('seo', 'seo_settings', normalized);
  return normalized;
}

export async function saveSEOSettings(settings: SEOSettings): Promise<SEOSettings> {
  const normalized = normalizeSettings(settings);
  const saved = normalizeSettings(await saveSiteSetting('seo', 'seo_settings', normalized));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('idata:seo-settings-updated', { detail: saved }));
  }
  return saved;
}
