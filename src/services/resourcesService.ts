import { supabase } from '../lib/supabase'
import { normalizeResource } from './contentUtils'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('order', { ascending: true })
  if (error) throw error
  return (data || []).map(normalizeResource)
}

export const getPublished = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('published_date', { ascending: false })
  if (error) throw error
  return (data || []).map(normalizeResource)
}

export const getBySlug = async (slug: string, language: 'es' | 'en' = 'en') => {
  const slugKey = language === 'es' ? 'slug_es' : 'slug_en'

  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq(slugKey, slug)
    .eq('status', 'published')
    .single()
  if (error) return null
  return normalizeResource(data)
}
