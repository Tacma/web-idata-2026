import { supabase } from '../lib/supabase'
import { normalizeService } from './contentUtils'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order', { ascending: true })

  if (error) throw error
  return (data || []).map(normalizeService)
}

export const getPublished = async (_language?: 'es' | 'en') => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })

  if (error) throw error
  return (data || []).map(normalizeService)
}

export const getById = async (id: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return normalizeService(data)
}

export const getBySlug = async (slug: string, language: 'es' | 'en' = 'en') => {
  const slugKey = language === 'es' ? 'slug_es' : 'slug_en'

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq(slugKey, slug)
    .eq('status', 'published')
    .single()

  if (error) return null
  return normalizeService(data)
}

export const create = async (data: any) => {
  const { data: result, error } = await supabase
    .from('services')
    .insert(data)
  if (error) throw error
  return result
}

export const update = async (id: string, data: any) => {
  const { data: result, error } = await supabase
    .from('services')
    .update(data)
    .eq('id', id)
  if (error) throw error
  return result
}

export const deleteItem = async (id: string) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export const getServiceCategories = async () => {
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })

  if (error) throw error
  return data || []
}
