import { supabase } from '../lib/supabase'
import { getMergedIndustries, mergeIndustryWithSeed } from '../app/shared/data/industryCaseDiscovery'
import { normalizeIndustry } from './contentUtils'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .order('order', { ascending: true })
  if (error) throw error
  return getMergedIndustries((data || []).map(normalizeIndustry))
}

export const getPublished = async () => {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })
  if (error) throw error
  return getMergedIndustries((data || []).map(normalizeIndustry)).filter((item) => item.status === 'published')
}

export const getBySlug = async (slug: string, language: 'es' | 'en') => {
  const slugKey = language === 'es' ? 'slug_es' : 'slug_en'

  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq(slugKey, slug)
    .eq('status', 'published')
    .single()
  if (error || !data) {
    return getMergedIndustries([]).find((item) => item[slugKey] === slug && item.status === 'published') || null
  }
  return normalizeIndustry(mergeIndustryWithSeed(normalizeIndustry(data)))
}

export const getById = async (id: string) => {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) {
    return getMergedIndustries([]).find((item) => item.id === id) || null
  }
  return normalizeIndustry(mergeIndustryWithSeed(normalizeIndustry(data)))
}

export const createIndustry = async (data: any) => {
  const { data: result, error } = await supabase
    .from('industries')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return result
}

export const updateIndustry = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('industries')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteIndustry = async (id: string) => {
  const { error } = await supabase
    .from('industries')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export const create = createIndustry
export const update = updateIndustry
export const remove = deleteIndustry
