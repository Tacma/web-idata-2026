import { supabase } from '../lib/supabase'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .order('slug', { ascending: true })
    .order('language', { ascending: true })
  if (error) throw error
  return data || []
}

export const getBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('slug', slug)
  if (error) throw error
  return data || []
}

export const create = async (data: any) => {
  const { data: result, error } = await supabase
    .from('seo_pages')
    .insert(data)
    .select()
  if (error) throw error
  return result
}

export const update = async (id: string, data: any) => {
  const { data: result, error } = await supabase
    .from('seo_pages')
    .update(data)
    .eq('slug', id)
    .select()
  if (error) throw error
  return result
}

export const deleteItem = async (id: string) => {
  const { error } = await supabase
    .from('seo_pages')
    .delete()
    .eq('slug', id)
  if (error) throw error
}
