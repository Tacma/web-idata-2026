import { supabase } from '../lib/supabase'

function normalizeList(value: any, fallback: string[] = []) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return fallback
}

function normalizeJob(row: any) {
  if (!row) return row

  const requirementsEs = normalizeList(row.required_qualifications_es, normalizeList(row.requirements_es))
  const requirementsEn = normalizeList(row.required_qualifications_en, normalizeList(row.requirements_en))
  const toolsEs = normalizeList(row.tools_and_ways_of_working_es)
  const toolsEn = normalizeList(row.tools_and_ways_of_working_en)
  const offerEs = normalizeList(row.what_we_offer_es, normalizeList(row.benefits_es))
  const offerEn = normalizeList(row.what_we_offer_en, normalizeList(row.benefits_en))
  const hiringProcessEs = normalizeList(row.hiring_process_es)
  const hiringProcessEn = normalizeList(row.hiring_process_en)

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
    about_role_es: row.about_role_es ?? row.overview_es ?? row.content ?? row.description_es ?? row.excerpt ?? '',
    about_role_en: row.about_role_en ?? row.overview_en ?? row.content ?? row.description_en ?? row.excerpt ?? '',
    area_es: row.department_es ?? '',
    area_en: row.department_en ?? '',
    employment_type: row.type_en ?? row.type_es ?? row.type ?? '',
    employment_type_es: row.type_es ?? row.type ?? '',
    employment_type_en: row.type_en ?? row.type ?? '',
    short_summary_es: row.excerpt_es ?? row.description_es ?? row.excerpt ?? '',
    short_summary_en: row.excerpt_en ?? row.description_en ?? row.excerpt ?? '',
    department: row.department_en ?? row.department_es ?? '',
    location: row.location_en ?? row.location_es ?? row.location ?? '',
    typeLabel: row.type_en ?? row.type_es ?? row.type ?? '',
    posted_at: row.published_date ?? null,
    responsibilities_es: row.responsibilities_es ?? [],
    responsibilities_en: row.responsibilities_en ?? [],
    required_qualifications_es: requirementsEs,
    required_qualifications_en: requirementsEn,
    nice_to_have_es: row.nice_to_have_es ?? [],
    nice_to_have_en: row.nice_to_have_en ?? [],
    tools_and_ways_of_working_es: toolsEs,
    tools_and_ways_of_working_en: toolsEn,
    what_we_offer_es: offerEs,
    what_we_offer_en: offerEn,
    hiring_process_es: hiringProcessEs,
    hiring_process_en: hiringProcessEn,
    equal_opportunity_note_es:
      row.equal_opportunity_note_es ??
      'En iData promovemos procesos de selección inclusivos y basados en capacidades, respetando la diversidad de trayectorias, identidades y perspectivas.',
    equal_opportunity_note_en:
      row.equal_opportunity_note_en ??
      'At iData we promote inclusive, capability-based hiring processes that respect diverse backgrounds, identities and perspectives.',
    apply_cta_label_es: row.apply_cta_label_es ?? 'Aplicar',
    apply_cta_label_en: row.apply_cta_label_en ?? 'Apply',
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
