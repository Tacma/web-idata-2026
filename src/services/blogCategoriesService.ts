import { supabase } from '../lib/supabase'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })
  if (error) throw error
  return data
}

export const getById = async (id: string) => {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}
