import { supabase } from '../lib/supabase'
import { normalizeCaseStudy } from './contentUtils'
import { getMergedCaseStudies, mergeCaseStudyWithSeed } from '../app/shared/data/industryCaseDiscovery'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('order', { ascending: true })
  if (error) throw error
  return getMergedCaseStudies((data || []).map(normalizeCaseStudy), { includePlaceholders: false })
}

export const getPublished = async (_language?: 'es' | 'en') => {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })
  if (error) throw error
  return getMergedCaseStudies((data || []).map(normalizeCaseStudy), { includePlaceholders: false })
    .filter((item) => item.status === 'published' && item.case_type !== 'placeholder')
}

export const getById = async (id: string) => {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) {
    return getMergedCaseStudies([], { includePlaceholders: true }).find((item) => item.id === id) || null
  }
  return mergeCaseStudyWithSeed(normalizeCaseStudy(data), true)
}

export const getBySlug = async (slug: string, language: 'es' | 'en' = 'en') => {
  const slugKey = language === 'es' ? 'slug_es' : 'slug_en'

  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq(slugKey, slug)
    .eq('status', 'published')
    .single()
  if (error || !data) {
    return getMergedCaseStudies([], { includePlaceholders: true })
      .find((item) => item[slugKey] === slug && item.status === 'published') || null
  }
  return mergeCaseStudyWithSeed(normalizeCaseStudy(data), true)
}

export const create = async (data: any) => {
  const { data: result, error } = await supabase
    .from('case_studies')
    .insert(data)
  if (error) throw error
  return result
}

export const update = async (id: string, data: any) => {
  const { data: result, error } = await supabase
    .from('case_studies')
    .update(data)
    .eq('id', id)
  if (error) throw error
  return result
}

export const deleteItem = async (id: string) => {
  const { error } = await supabase
    .from('case_studies')
    .delete()
    .eq('id', id)
  if (error) throw error
}
