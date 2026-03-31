import { supabase } from '../../../lib/supabaseClient';

export interface SitePageRecord {
  slug: string;
  page_name: string;
  route_es: string;
  route_en: string;
  is_visible: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PageSectionRecord {
  id: string;
  page_slug: string;
  language: 'es' | 'en';
  type: string;
  title: string | null;
  subtitle: string | null;
  cta_label: string | null;
  cta_href: string | null;
  is_enabled: boolean;
  order: number;
  referenced_ids: string[] | null;
  content: any;
  config: any;
  created_at?: string | null;
  updated_at?: string | null;
}

function isMissingSitePagesTable(error: any) {
  const message = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`;
  return message.includes("Could not find the table 'public.site_pages'") || message.includes('site_pages');
}

const legacyPageRouteMap: Record<string, { page_name: string; route_es: string; route_en: string }> = {
  home: { page_name: 'Home', route_es: '/es/', route_en: '/en/' },
  about: { page_name: 'About', route_es: '/es/nosotros/', route_en: '/en/about/' },
  contact: { page_name: 'Contact', route_es: '/es/contacto/', route_en: '/en/contact/' },
  careers: { page_name: 'Careers', route_es: '/es/trabaja-con-nosotros/', route_en: '/en/work-with-us/' },
  services: { page_name: 'Services', route_es: '/es/servicios/', route_en: '/en/services/' },
  industries: { page_name: 'Industries', route_es: '/es/industrias/', route_en: '/en/industries/' },
  'case-studies': { page_name: 'Case Studies Hub', route_es: '/es/casos-de-exito/', route_en: '/en/case-studies/' },
  insights: { page_name: 'Insights', route_es: '/es/insights/', route_en: '/en/insights/' },
  resources: { page_name: 'Resources', route_es: '/es/recursos/', route_en: '/en/resources/' },
};

function mergePageData(page: SitePageRecord | null, seoRows: any[], sectionCount: number) {
  const es = seoRows.find((row) => row.language === 'es');
  const en = seoRows.find((row) => row.language === 'en');
  const fallbackSlug = page?.slug ?? es?.slug ?? en?.slug ?? '';
  const routeMap = legacyPageRouteMap[fallbackSlug];

  return {
    id: fallbackSlug,
    slug: fallbackSlug,
    page_name: page?.page_name ?? routeMap?.page_name ?? fallbackSlug,
    route_es: page?.route_es ?? routeMap?.route_es ?? `/es/${fallbackSlug}/`,
    route_en: page?.route_en ?? routeMap?.route_en ?? `/en/${fallbackSlug}/`,
    is_visible: page?.is_visible ?? true,
    status: page?.status ?? 'published',
    title_es: es?.title ?? '',
    title_en: en?.title ?? '',
    description_es: es?.description ?? '',
    description_en: en?.description ?? '',
    sections_count: sectionCount,
    updated_at: page?.updated_at ?? null,
    created_at: page?.created_at ?? null,
  };
}

async function getSeoRowsBySlug(slug: string) {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('slug', slug);

  if (error) throw error;
  return data || [];
}

async function getSectionCount(pageSlug: string) {
  const { count, error } = await supabase
    .from('home_sections')
    .select('*', { count: 'exact', head: true })
    .eq('page_slug', pageSlug);

  if (error) throw error;
  return count || 0;
}

async function getLegacyPagesFromSeo() {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .order('slug', { ascending: true });

  if (error) throw error;

  const grouped = new Map<string, any[]>();
  for (const row of data || []) {
    if (!grouped.has(row.slug)) grouped.set(row.slug, []);
    grouped.get(row.slug)!.push(row);
  }

  const results = await Promise.all(
    Array.from(grouped.entries()).map(async ([slug, rows]) => {
      const sectionCount = await getSectionCount(slug).catch(() => 0);
      return mergePageData(null, rows, sectionCount);
    })
  );

  return results;
}

export async function getAllPages(): Promise<any[]> {
  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .order('page_name', { ascending: true });

  if (error) {
    if (isMissingSitePagesTable(error)) {
      return getLegacyPagesFromSeo();
    }
    throw error;
  }

  const pages = data || [];
  if (pages.length === 0) {
    return getLegacyPagesFromSeo();
  }

  const results = await Promise.all(
    pages.map(async (page: SitePageRecord) => {
      const [seoRows, sectionsCount] = await Promise.all([
        getSeoRowsBySlug(page.slug),
        getSectionCount(page.slug),
      ]);

      return mergePageData(page, seoRows, sectionsCount);
    })
  );

  return results;
}

export async function getPageById(id: string): Promise<any | null> {
  const { data: page, error } = await supabase
    .from('site_pages')
    .select('*')
    .eq('slug', id)
    .single();

  if (error) {
    if (isMissingSitePagesTable(error)) {
      const seoRows = await getSeoRowsBySlug(id);
      if (seoRows.length === 0) return null;
      const sectionsCount = await getSectionCount(id).catch(() => 0);
      return mergePageData(null, seoRows, sectionsCount);
    }
    return null;
  }

  if (!page) {
    const seoRows = await getSeoRowsBySlug(id);
    if (seoRows.length === 0) return null;
    const sectionsCount = await getSectionCount(id).catch(() => 0);
    return mergePageData(null, seoRows, sectionsCount);
  }

  const [seoRows, sectionsCount] = await Promise.all([
    getSeoRowsBySlug(id),
    getSectionCount(id),
  ]);

  return mergePageData(page as SitePageRecord, seoRows, sectionsCount);
}

export async function getPageSections(pageSlug: string): Promise<PageSectionRecord[]> {
  const { data, error } = await supabase
    .from('home_sections')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('order', { ascending: true })
    .order('language', { ascending: true });

  if (error) throw error;
  return (data || []) as PageSectionRecord[];
}

export async function createPage(payload: any): Promise<any> {
  const pageRow = {
    slug: payload.slug,
    page_name: payload.page_name,
    route_es: payload.route_es,
    route_en: payload.route_en,
    is_visible: payload.is_visible ?? true,
    status: payload.status ?? 'published',
    updated_at: new Date().toISOString(),
  };

  const seoRows = [
    { slug: payload.slug, language: 'es', title: payload.title_es, description: payload.description_es },
    { slug: payload.slug, language: 'en', title: payload.title_en, description: payload.description_en },
  ];

  const { error: pageError } = await supabase
    .from('site_pages')
    .upsert(pageRow, { onConflict: 'slug' });
  if (pageError) {
    if (isMissingSitePagesTable(pageError)) {
      throw new Error("La tabla 'site_pages' no existe todavía en Supabase. Ejecuta el schema actualizado antes de crear páginas.");
    }
    throw pageError;
  }

  const { error: seoError } = await supabase
    .from('seo_pages')
    .upsert(seoRows, { onConflict: 'slug,language' });
  if (seoError) throw seoError;

  return getPageById(payload.slug);
}

export async function updatePage(id: string, payload: any): Promise<any> {
  const nextSlug = payload.slug || id;

  if (nextSlug !== id) {
    const { error: updateSectionsError } = await supabase
      .from('home_sections')
      .update({ page_slug: nextSlug })
      .eq('page_slug', id);
    if (updateSectionsError) throw updateSectionsError;

    const { error: deleteSeoError } = await supabase
      .from('seo_pages')
      .delete()
      .eq('slug', id);
    if (deleteSeoError) throw deleteSeoError;

    const { error: deletePageError } = await supabase
      .from('site_pages')
      .delete()
      .eq('slug', id);
    if (deletePageError && !isMissingSitePagesTable(deletePageError)) throw deletePageError;
  }

  const pageRow = {
    slug: nextSlug,
    page_name: payload.page_name,
    route_es: payload.route_es,
    route_en: payload.route_en,
    is_visible: payload.is_visible ?? true,
    status: payload.status ?? 'published',
    updated_at: new Date().toISOString(),
  };

  const seoRows = [
    { slug: nextSlug, language: 'es', title: payload.title_es, description: payload.description_es },
    { slug: nextSlug, language: 'en', title: payload.title_en, description: payload.description_en },
  ];

  const { error: pageError } = await supabase
    .from('site_pages')
    .upsert(pageRow, { onConflict: 'slug' });
  if (pageError) {
    if (isMissingSitePagesTable(pageError)) {
      throw new Error("La tabla 'site_pages' no existe todavía en Supabase. Ejecuta el schema actualizado antes de editar páginas.");
    }
    throw pageError;
  }

  const { error: seoError } = await supabase
    .from('seo_pages')
    .upsert(seoRows, { onConflict: 'slug,language' });
  if (seoError) throw seoError;

  return getPageById(nextSlug);
}

export async function deletePage(id: string): Promise<void> {
  const { error: sectionError } = await supabase
    .from('home_sections')
    .delete()
    .eq('page_slug', id);
  if (sectionError) throw sectionError;

  const { error: seoError } = await supabase
    .from('seo_pages')
    .delete()
    .eq('slug', id);
  if (seoError) throw seoError;

  const { error: pageError } = await supabase
    .from('site_pages')
    .delete()
    .eq('slug', id);
  if (pageError) {
    if (isMissingSitePagesTable(pageError)) {
      throw new Error("La tabla 'site_pages' no existe todavía en Supabase. Ejecuta el schema actualizado antes de eliminar páginas.");
    }
    throw pageError;
  }
}

export async function createPageSection(payload: Partial<PageSectionRecord>): Promise<PageSectionRecord> {
  const { data, error } = await supabase
    .from('home_sections')
    .insert({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as PageSectionRecord;
}

export async function updatePageSection(id: string, payload: Partial<PageSectionRecord>): Promise<PageSectionRecord> {
  const { data, error } = await supabase
    .from('home_sections')
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as PageSectionRecord;
}

export async function deletePageSection(id: string): Promise<void> {
  const { error } = await supabase
    .from('home_sections')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export const getAll = getAllPages;
export const getById = getPageById;
export const create = createPage;
export const update = updatePage;
export const remove = deletePage;
