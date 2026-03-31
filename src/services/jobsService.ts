import { supabase } from '../lib/supabase'

function normalizeJob(row: any) {
  if (!row) return row
  return {
    ...row,
    title_es: row.title_es ?? row.title ?? '',
    title_en: row.title_en ?? row.title ?? '',
    slug_es: row.slug_es ?? row.slug ?? '',
    slug_en: row.slug_en ?? row.slug ?? '',
    excerpt_es: row.excerpt_es ?? row.description_es ?? row.excerpt ?? '',
    excerpt_en: row.excerpt_en ?? row.description_en ?? row.excerpt ?? '',
    description_es: row.description_es ?? row.content ?? row.excerpt ?? '',
    description_en: row.description_en ?? row.content ?? row.excerpt ?? '',
    overview_es: row.overview_es ?? row.content ?? row.description_es ?? row.excerpt ?? '',
    overview_en: row.overview_en ?? row.content ?? row.description_en ?? row.excerpt ?? '',
    area_es: row.department_es ?? '',
    area_en: row.department_en ?? '',
    employment_type: row.type_en ?? row.type_es ?? row.type ?? '',
    short_summary_es: row.excerpt_es ?? row.description_es ?? row.excerpt ?? '',
    short_summary_en: row.excerpt_en ?? row.description_en ?? row.excerpt ?? '',
    department: row.department_en ?? row.department_es ?? '',
    location: row.location_en ?? row.location_es ?? row.location ?? '',
    typeLabel: row.type_en ?? row.type_es ?? row.type ?? '',
    posted_at: row.published_date ?? null,
    responsibilities_es: row.responsibilities_es ?? [],
    responsibilities_en: row.responsibilities_en ?? [],
    nice_to_have_es: row.nice_to_have_es ?? [],
    nice_to_have_en: row.nice_to_have_en ?? [],
  }
}

export const getPublished = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false })
  if (error) throw error
  return (data || []).map(normalizeJob)
}

export const getBySlug = async (slug: string, language: 'es' | 'en') => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .or(`slug.eq.${slug},slug_es.eq.${slug},slug_en.eq.${slug}`)
    .eq('status', 'published')
    .single()
  if (error) return null
  return normalizeJob(data)
}

export const create = async (data: any) => {
  const { data: result, error } = await supabase
    .from('jobs')
    .insert(data)
  if (error) throw error
  return result
}

export const update = async (id: string, data: any) => {
  const { data: result, error } = await supabase
    .from('jobs')
    .update(data)
    .eq('id', id)
  if (error) throw error
  return result
}

export const deleteItem = async (id: string) => {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id)
  if (error) throw error
}
