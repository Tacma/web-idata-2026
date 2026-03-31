import { supabase } from '../lib/supabase'

export const getAll = async () => {
  // TODO: Implement query to get all users from Supabase table 'users'
  // Example: return await supabase.from('users').select('*')
}

export const getBySlug = async (slug: string) => {
  // TODO: Implement query to get user by slug
  // Example: return await supabase.from('users').select('*').eq('slug', slug).single()
}

export const create = async (data: any) => {
  // TODO: Implement insert query for new user
  // Example: return await supabase.from('users').insert(data)
}

export const update = async (id: string, data: any) => {
  // TODO: Implement update query for user
  // Example: return await supabase.from('users').update(data).eq('id', id)
}

export const deleteItem = async (id: string) => {
  // TODO: Implement delete query for user
  // Example: return await supabase.from('users').delete().eq('id', id)
}