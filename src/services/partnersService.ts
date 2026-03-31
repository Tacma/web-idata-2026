import { supabase } from '../lib/supabase'
import { normalizePartner } from './contentUtils'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('order', { ascending: true })

  if (error) throw error
  return (data || []).map(normalizePartner)
}

export const getPublished = async () => {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })

  if (error) throw error
  return (data || []).map(normalizePartner)
}

export const getById = async (id: string) => {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return normalizePartner(data)
}
