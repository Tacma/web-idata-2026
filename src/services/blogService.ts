import { supabase } from '../lib/supabase'
import { normalizeBlogPost } from './contentUtils'
import { filterVisibleInsights, hasRenderableInsightContent, isBlockedInsight } from './insightVisibility'
import { hydrateBlogPostCollection, hydrateBlogPostDetail } from './blogFallbacks'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_date', { ascending: false })
  if (error) throw error
  return hydrateBlogPostCollection(data || []).map(normalizeBlogPost)
}

export const getPublished = async (_language?: 'es' | 'en') => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false })
  if (error) throw error
  return filterVisibleInsights(hydrateBlogPostCollection(data || [])).map(normalizeBlogPost)
}

export const getById = async (id: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return normalizeBlogPost(hydrateBlogPostDetail(data))
}

export const getBySlug = async (slug: string, language: 'es' | 'en' = 'en') => {
  const slugKey = language === 'es' ? 'slug_es' : 'slug_en'

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq(slugKey, slug)
    .eq('status', 'published')
    .single()
  if (error) return null
  const hydrated = hydrateBlogPostDetail(data)
  if (isBlockedInsight(hydrated)) return null
  if (!hasRenderableInsightContent(hydrated)) return null
  return normalizeBlogPost(hydrated)
}

export const create = async (data: any) => {
  const { data: result, error } = await supabase
    .from('blog_posts')
    .insert(data)
  if (error) throw error
  return result
}

export const update = async (id: string, data: any) => {
  const { data: result, error } = await supabase
    .from('blog_posts')
    .update(data)
    .eq('id', id)
  if (error) throw error
  return result
}

export const deleteItem = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
  if (error) throw error
}
