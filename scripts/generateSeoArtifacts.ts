import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import {
  mockCaseStudies,
  mockInsights,
  mockIndustries,
  mockJobs,
  mockResources,
  mockServices,
} from '../src/app/data/mockData';

const siteUrl = (
  process.env.VITE_PUBLIC_SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://idata.global'
).replace(/\/$/, '');

const publicDir = path.resolve(process.cwd(), 'public');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

type Entry = {
  es: string;
  en: string;
  lastmod?: string | null;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: string;
};

type SitePageRow = {
  slug: string;
  route_es: string;
  route_en: string;
  updated_at?: string | null;
  created_at?: string | null;
  status?: string | null;
  is_visible?: boolean | null;
};

function toAbsoluteUrl(route: string) {
  return `${siteUrl}${route.startsWith('/') ? route : `/${route}`}`;
}

function toIsoDate(value?: string | null) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function normalizeRoute(route: string) {
  if (!route) return '/';
  const normalized = route.startsWith('/') ? route : `/${route}`;
  if (normalized === '/') return normalized;
  if (/\.[a-z0-9]+$/i.test(normalized)) return normalized;
  return normalized.endsWith('/') ? normalized : `${normalized}/`;
}

function createEntry(routePair: Entry) {
  const normalizedEs = normalizeRoute(routePair.es);
  const normalizedEn = normalizeRoute(routePair.en);
  return `
  <url>
    <loc>${toAbsoluteUrl(normalizedEn)}</loc>
    <lastmod>${toIsoDate(routePair.lastmod)}</lastmod>
    <changefreq>${routePair.changefreq || 'weekly'}</changefreq>
    <priority>${routePair.priority || '0.7'}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${toAbsoluteUrl(normalizedEs)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${toAbsoluteUrl(normalizedEn)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${toAbsoluteUrl(normalizedEn)}" />
  </url>`.trim();
}

const staticRoutes: Entry[] = [
  { es: '/es/', en: '/en/', priority: '1.0', changefreq: 'weekly' },
  { es: '/es/servicios/', en: '/en/services/', priority: '0.9', changefreq: 'weekly' },
  { es: '/es/industrias/', en: '/en/industries/', priority: '0.9', changefreq: 'weekly' },
  { es: '/es/casos/', en: '/en/case-studies/', priority: '0.9', changefreq: 'weekly' },
  { es: '/es/insights/', en: '/en/insights/', priority: '0.9', changefreq: 'daily' },
  { es: '/es/nosotros/', en: '/en/about/', priority: '0.8', changefreq: 'monthly' },
  { es: '/es/trabaja-con-nosotros/', en: '/en/work-with-us/', priority: '0.8', changefreq: 'weekly' },
  { es: '/es/trabaja-con-nosotros/ofertas/', en: '/en/work-with-us/jobs/', priority: '0.7', changefreq: 'weekly' },
  { es: '/es/recursos/', en: '/en/resources/', priority: '0.8', changefreq: 'weekly' },
  { es: '/es/contacto/', en: '/en/contact/', priority: '0.8', changefreq: 'monthly' },
  { es: '/es/politica-de-privacidad/', en: '/en/privacy-policies/', priority: '0.3', changefreq: 'yearly' },
  { es: '/es/politicas-de-cookies/', en: '/en/cookie-policy/', priority: '0.3', changefreq: 'yearly' },
];

function uniqueEntries(entries: Entry[]) {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = `${entry.es}|${entry.en}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function loadSupabaseEntries(): Promise<Entry[]> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [
    servicesResult,
    industriesResult,
    caseStudiesResult,
    blogPostsResult,
    jobsResult,
    resourcesResult,
    sitePagesResult,
  ] = await Promise.all([
    supabase.from('services').select('slug_es, slug_en, updated_at, status').eq('status', 'published'),
    supabase.from('industries').select('slug_es, slug_en, updated_at, status').eq('status', 'published'),
    supabase.from('case_studies').select('slug_es, slug_en, updated_at, published_date, status').eq('status', 'published'),
    supabase.from('blog_posts').select('slug_es, slug_en, updated_at, published_date, status').eq('status', 'published'),
    supabase.from('jobs').select('slug_es, slug_en, updated_at, published_date, status, active').eq('status', 'published'),
    supabase.from('resources').select('slug_es, slug_en, updated_at, published_date, status').eq('status', 'published'),
    supabase.from('site_pages').select('slug, route_es, route_en, updated_at, created_at, status, is_visible').eq('status', 'published').eq('is_visible', true),
  ]);

  const hasBlockingError = [
    servicesResult.error,
    industriesResult.error,
    caseStudiesResult.error,
    blogPostsResult.error,
    jobsResult.error,
    resourcesResult.error,
  ].some(Boolean);

  if (hasBlockingError) {
    throw new Error('Failed to fetch published content from Supabase for sitemap generation.');
  }

  const entries: Entry[] = [
    ...(servicesResult.data || []).flatMap((item: any) =>
      item.slug_es && item.slug_en
        ? [{
            es: `/es/servicios/${item.slug_es}/`,
            en: `/en/services/${item.slug_en}/`,
            lastmod: item.updated_at,
            changefreq: 'monthly' as const,
            priority: '0.8',
          }]
        : []
    ),
    ...(industriesResult.data || []).flatMap((item: any) =>
      item.slug_es && item.slug_en
        ? [{
            es: `/es/industrias/${item.slug_es}/`,
            en: `/en/industries/${item.slug_en}/`,
            lastmod: item.updated_at,
            changefreq: 'monthly' as const,
            priority: '0.8',
          }]
        : []
    ),
    ...(caseStudiesResult.data || []).flatMap((item: any) =>
      item.slug_es && item.slug_en
        ? [{
            es: `/es/casos/${item.slug_es}/`,
            en: `/en/case-studies/${item.slug_en}/`,
            lastmod: item.updated_at || item.published_date,
            changefreq: 'monthly' as const,
            priority: '0.8',
          }]
        : []
    ),
    ...(blogPostsResult.data || []).flatMap((item: any) =>
      item.slug_es && item.slug_en
        ? [{
            es: `/es/insights/${item.slug_es}/`,
            en: `/en/insights/${item.slug_en}/`,
            lastmod: item.updated_at || item.published_date,
            changefreq: 'monthly' as const,
            priority: '0.7',
          }]
        : []
    ),
    ...(jobsResult.data || []).flatMap((item: any) =>
      item.slug_es && item.slug_en && item.active !== false
        ? [{
            es: `/es/trabaja-con-nosotros/ofertas/${item.slug_es}/`,
            en: `/en/work-with-us/jobs/${item.slug_en}/`,
            lastmod: item.updated_at || item.published_date,
            changefreq: 'weekly' as const,
            priority: '0.6',
          }]
        : []
    ),
    ...(resourcesResult.data || []).flatMap((item: any) =>
      item.slug_es && item.slug_en
        ? [{
            es: `/es/recursos/${item.slug_es}/`,
            en: `/en/resources/${item.slug_en}/`,
            lastmod: item.updated_at || item.published_date,
            changefreq: 'monthly' as const,
            priority: '0.7',
          }]
        : []
    ),
  ];

  if (!sitePagesResult.error) {
    const reserved = new Set(staticRoutes.map((entry) => `${normalizeRoute(entry.es)}|${normalizeRoute(entry.en)}`));
    for (const page of (sitePagesResult.data || []) as SitePageRow[]) {
      const key = `${normalizeRoute(page.route_es)}|${normalizeRoute(page.route_en)}`;
      if (!page.route_es || !page.route_en || reserved.has(key)) continue;
      entries.push({
        es: normalizeRoute(page.route_es),
        en: normalizeRoute(page.route_en),
        lastmod: page.updated_at || page.created_at,
        changefreq: 'monthly',
        priority: '0.6',
      });
    }
  }

  return uniqueEntries(entries);
}

function loadMockEntries(): Entry[] {
  return uniqueEntries([
    ...mockServices
      .filter((item) => item.status === 'published')
      .map((item) => ({
        es: `/es/servicios/${item.slug_es}/`,
        en: `/en/services/${item.slug_en}/`,
        lastmod: item.updatedAt || item.updated_at,
        changefreq: 'monthly' as const,
        priority: '0.8',
      })),
    ...mockIndustries
      .filter((item) => item.status === 'published')
      .map((item) => ({
        es: `/es/industrias/${item.slug_es}/`,
        en: `/en/industries/${item.slug_en}/`,
        lastmod: item.updatedAt || item.updated_at,
        changefreq: 'monthly' as const,
        priority: '0.8',
      })),
    ...mockCaseStudies
      .filter((item) => item.status === 'published')
      .map((item) => ({
        es: `/es/casos/${item.slug_es}/`,
        en: `/en/case-studies/${item.slug_en}/`,
        lastmod: item.updatedAt || item.updated_at || item.publishedDate,
        changefreq: 'monthly' as const,
        priority: '0.8',
      })),
    ...mockInsights
      .filter((item) => item.status === 'published')
      .map((item) => ({
        es: `/es/insights/${item.slug_es}/`,
        en: `/en/insights/${item.slug_en}/`,
        lastmod: item.updatedAt || item.updated_at || item.publishedDate,
        changefreq: 'monthly' as const,
        priority: '0.7',
      })),
    ...mockJobs
      .filter((item) => item.status === 'published' && item.active)
      .map((item) => ({
        es: `/es/trabaja-con-nosotros/ofertas/${item.slug_es}/`,
        en: `/en/work-with-us/jobs/${item.slug_en}/`,
        lastmod: item.updatedAt || item.updated_at || item.publishedDate,
        changefreq: 'weekly' as const,
        priority: '0.6',
      })),
    ...mockResources
      .filter((item) => item.status === 'published')
      .map((item) => ({
        es: `/es/recursos/${item.slug_es}/`,
        en: `/en/resources/${item.slug_en}/`,
        lastmod: item.updatedAt || item.updated_at || item.publishedDate,
        changefreq: 'monthly' as const,
        priority: '0.7',
      })),
  ]);
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  let dynamicRoutes: Entry[] = [];
  try {
    dynamicRoutes = await loadSupabaseEntries();
  } catch (error) {
    console.warn('Falling back to mock sitemap data:', error);
    dynamicRoutes = loadMockEntries();
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticRoutes, ...dynamicRoutes].map(createEntry).join('\n')}
</urlset>
`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /admin/login
Disallow: /404.html

Sitemap: ${siteUrl}/sitemap.xml
`;

  const manifest = {
    name: 'iData Global',
    short_name: 'iData',
    description: 'Data Analytics, AI and ML solutions for LATAM, United States and Europe.',
    start_url: '/en/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4387DF',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };

  await Promise.all([
    writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8'),
    writeFile(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8'),
    writeFile(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8'),
  ]);
}

main().catch((error) => {
  console.error('Failed to generate SEO artifacts:', error);
  process.exitCode = 1;
});
