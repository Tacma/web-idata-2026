import { supabase } from '../lib/supabase'
import { normalizeTeamMember } from './contentUtils'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order', { ascending: true })

  if (error) throw error
  return (data || []).map(normalizeTeamMember)
}

export const getPublished = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })

  if (error) throw error
  return (data || []).map(normalizeTeamMember)
}

export const getById = async (id: string) => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return normalizeTeamMember(data)
}
