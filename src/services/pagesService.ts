import { supabase } from '../lib/supabase'

function isMissingSitePagesTable(error: any) {
  const message = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`
  return message.includes("Could not find the table 'public.site_pages'") || message.includes('site_pages')
}

const legacyPageRouteMap: Record<string, { page_name: string; route_es: string; route_en: string }> = {
  home: { page_name: 'Home', route_es: '/es/', route_en: '/en/' },
  about: { page_name: 'About', route_es: '/es/nosotros/', route_en: '/en/about/' },
  contact: { page_name: 'Contact', route_es: '/es/contacto/', route_en: '/en/contact/' },
  careers: { page_name: 'Careers', route_es: '/es/trabaja-con-nosotros/', route_en: '/en/work-with-us/' },
  services: { page_name: 'Services', route_es: '/es/servicios/', route_en: '/en/services/' },
  industries: { page_name: 'Industries', route_es: '/es/industrias/', route_en: '/en/industries/' },
  'case-studies': { page_name: 'Case Studies', route_es: '/es/casos/', route_en: '/en/case-studies/' },
  insights: { page_name: 'Insights', route_es: '/es/insights/', route_en: '/en/insights/' },
  resources: { page_name: 'Resources', route_es: '/es/recursos/', route_en: '/en/resources/' },
}

function mergePage(sitePage: any | null, seoRows: any[]) {
  const es = seoRows.find((row) => row.language === 'es')
  const en = seoRows.find((row) => row.language === 'en')
  const slug = sitePage?.slug ?? es?.slug ?? en?.slug ?? ''
  const routeMap = legacyPageRouteMap[slug]

  return {
    id: slug,
    slug,
    page_name: sitePage?.page_name ?? routeMap?.page_name ?? slug,
    route_es: sitePage?.route_es ?? routeMap?.route_es ?? `/es/${slug}/`,
    route_en: sitePage?.route_en ?? routeMap?.route_en ?? `/en/${slug}/`,
    is_visible: sitePage?.is_visible ?? true,
    status: sitePage?.status ?? 'published',
    title_es: es?.title || '',
    title_en: en?.title || '',
    description_es: es?.description || '',
    description_en: en?.description || '',
  }
}

function normalizeRoute(value: string) {
  if (!value) return '/'
  const trimmed = value.endsWith('/') && value !== '/' ? value.slice(0, -1) : value
  return trimmed || '/'
}

async function getSeoRows(slug: string) {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('slug', slug)

  if (error) throw error
  return data || []
}

async function getLegacyPageBySlug(slug: string) {
  const seoRows = await getSeoRows(slug)
  if (seoRows.length === 0) return null
  return mergePage(null, seoRows)
}

async function getLegacyPageByRoute(language: 'es' | 'en', route: string) {
  const normalized = normalizeRoute(route)
  const match = Object.entries(legacyPageRouteMap).find(([, routes]) =>
    normalizeRoute(language === 'es' ? routes.route_es : routes.route_en) === normalized
  )

  if (!match) return null
  return getLegacyPageBySlug(match[0])
}

export const getAll = async () => {
  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .order('page_name', { ascending: true })

  if (error) {
    if (isMissingSitePagesTable(error)) {
      const { data: seoData, error: seoError } = await supabase
        .from('seo_pages')
        .select('*')
        .order('slug', { ascending: true })

      if (seoError) throw seoError

      const grouped = new Map<string, any[]>()
      for (const row of seoData || []) {
        if (!grouped.has(row.slug)) grouped.set(row.slug, [])
        grouped.get(row.slug)!.push(row)
      }

      return Array.from(grouped.values()).map((rows) => mergePage(null, rows))
    }
    throw error
  }

  if (!data || data.length === 0) {
    const { data: seoData, error: seoError } = await supabase
      .from('seo_pages')
      .select('*')
      .order('slug', { ascending: true })

    if (seoError) throw seoError

    const grouped = new Map<string, any[]>()
    for (const row of seoData || []) {
      if (!grouped.has(row.slug)) grouped.set(row.slug, [])
      grouped.get(row.slug)!.push(row)
    }

    return Array.from(grouped.values()).map((rows) => mergePage(null, rows))
  }

  const pages = await Promise.all(
    (data || []).map(async (page: any) => {
      const seoRows = await getSeoRows(page.slug)
      return mergePage(page, seoRows)
    })
  )

  return pages
}

export const getById = async (id: string) => {
  const { data: page, error } = await supabase
    .from('site_pages')
    .select('*')
    .eq('slug', id)
    .single()

  if (error) {
    if (isMissingSitePagesTable(error)) {
      return getLegacyPageBySlug(id)
    }
    return null
  }

  if (!page) {
    return getLegacyPageBySlug(id)
  }

  const seoRows = await getSeoRows(id)
  return mergePage(page, seoRows)
}

export const getByKey = async (pageKey: string) => {
  return getById(pageKey)
}

export const getByRoute = async (language: 'es' | 'en', route: string) => {
  const column = language === 'es' ? 'route_es' : 'route_en'
  const normalized = normalizeRoute(route)

  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .eq(column, normalized)
    .single()

  if (error) {
    if (isMissingSitePagesTable(error)) {
      return getLegacyPageByRoute(language, route)
    }
    return null
  }

  const seoRows = await getSeoRows(data.slug)
  return mergePage(data, seoRows)
}

export const create = async (payload: any) => {
  const pageRow = {
    slug: payload.slug,
    page_name: payload.page_name,
    route_es: payload.route_es,
    route_en: payload.route_en,
    is_visible: payload.is_visible ?? true,
    status: payload.status ?? 'published',
    updated_at: new Date().toISOString(),
  }

  const seoRows = [
    { slug: payload.slug, language: 'es', title: payload.title_es, description: payload.description_es },
    { slug: payload.slug, language: 'en', title: payload.title_en, description: payload.description_en },
  ]

  const { error: pageError } = await supabase
    .from('site_pages')
    .upsert(pageRow, { onConflict: 'slug' })
  if (pageError) {
    if (isMissingSitePagesTable(pageError)) {
      throw new Error("La tabla 'site_pages' no existe todavía en Supabase. Ejecuta el schema actualizado antes de crear páginas.")
    }
    throw pageError
  }

  const { error: seoError } = await supabase
    .from('seo_pages')
    .upsert(seoRows, { onConflict: 'slug,language' })
  if (seoError) throw seoError

  return getById(payload.slug)
}

export const update = async (id: string, payload: any) => {
  const nextSlug = payload.slug || id

  if (nextSlug !== id) {
    const { error: updateSectionsError } = await supabase
      .from('home_sections')
      .update({ page_slug: nextSlug })
      .eq('page_slug', id)
    if (updateSectionsError) throw updateSectionsError

    const { error: deleteSeoError } = await supabase
      .from('seo_pages')
      .delete()
      .eq('slug', id)
    if (deleteSeoError) throw deleteSeoError

    const { error: deletePageError } = await supabase
      .from('site_pages')
      .delete()
      .eq('slug', id)
    if (deletePageError && !isMissingSitePagesTable(deletePageError)) throw deletePageError
  }

  return create({ ...payload, slug: nextSlug })
}

export const remove = async (id: string) => {
  const { error: sectionError } = await supabase
    .from('home_sections')
    .delete()
    .eq('page_slug', id)
  if (sectionError) throw sectionError

  const { error: seoError } = await supabase
    .from('seo_pages')
    .delete()
    .eq('slug', id)
  if (seoError) throw seoError

  const { error: pageError } = await supabase
    .from('site_pages')
    .delete()
    .eq('slug', id)
  if (pageError) {
    if (isMissingSitePagesTable(pageError)) {
      throw new Error("La tabla 'site_pages' no existe todavía en Supabase. Ejecuta el schema actualizado antes de eliminar páginas.")
    }
    throw pageError
  }
}
