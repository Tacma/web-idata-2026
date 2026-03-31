export type AdminPageConnection = 'live' | 'base' | 'missing';

interface AdminPageRegistryEntry {
  slug: string;
  label: string;
  connection: AdminPageConnection;
}

export const HOME_RENDER_ORDER = [
  'preHero',
  'hero',
  'strategicBannerTriple',
  'logos',
  'partners',
  'testimonials',
  'ctaBand',
  'stats',
  'custom',
] as const;

export const HOME_ADMIN_SECTION_TYPES = [
  'preHero',
  'hero',
  'logos',
  'partners',
  'testimonials',
  'ctaBand',
  'stats',
  'custom',
] as const;

export const HOME_DISABLED_SECTION_TYPES = new Set([
  'clients',
  'maturityJourney',
  'serviceHighlights',
  'industryHighlights',
  'caseHighlights',
  'insightsEditorial',
]);

export const pageRegistry: AdminPageRegistryEntry[] = [
  { slug: 'home', label: 'Home', connection: 'live' },
  { slug: 'about', label: 'About', connection: 'base' },
  { slug: 'services', label: 'Services', connection: 'base' },
  { slug: 'industries', label: 'Industries', connection: 'base' },
  { slug: 'case-studies', label: 'Case Studies', connection: 'base' },
  { slug: 'insights', label: 'Insights', connection: 'base' },
  { slug: 'careers', label: 'Careers', connection: 'base' },
  { slug: 'resources', label: 'Resources', connection: 'base' },
  { slug: 'contact', label: 'Contact', connection: 'base' },
];

export function getPageRegistryEntry(slug?: string | null) {
  if (!slug) return null;
  return pageRegistry.find((entry) => entry.slug === slug) || null;
}

export function getPageConnection(slug?: string | null): AdminPageConnection {
  return getPageRegistryEntry(slug)?.connection || 'missing';
}

export function getSectionRenderRank(pageSlug: string | null | undefined, sectionType: string | null | undefined) {
  if (!pageSlug || !sectionType) return Number.MAX_SAFE_INTEGER;
  if (pageSlug !== 'home') return Number.MAX_SAFE_INTEGER;
  const index = HOME_RENDER_ORDER.indexOf(sectionType as (typeof HOME_RENDER_ORDER)[number]);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}
