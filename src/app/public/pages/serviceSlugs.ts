export const serviceSlugEntries = [
  { slug: 'strategy-consulting', slug_es: 'strategy-consulting', slug_en: 'strategy-consulting' },
  { slug: 'data-delivery', slug_es: 'data-delivery', slug_en: 'data-delivery' },
  { slug: 'data-operations', slug_es: 'data-operations', slug_en: 'data-operations' },
  { slug: 'cloud-services-provider', slug_es: 'cloud-services-provider', slug_en: 'cloud-services-provider' },
];

export function findServiceByLocalizedSlug(slug: string, language: 'es' | 'en') {
  const slugKey = language === 'es' ? 'slug_es' : 'slug_en';
  return serviceSlugEntries.find((service) => service[slugKey] === slug) || null;
}

export function getLocalizedServiceSlug(service: any, language: 'es' | 'en') {
  return language === 'es' ? service?.slug_es : service?.slug_en;
}
