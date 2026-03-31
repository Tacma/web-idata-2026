import { supabase } from '../../../lib/supabaseClient';

export async function getAllTeamMembers(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('team_members').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getTeamMemberById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createTeamMember(member: any): Promise<any> {
  const { data, error } = await supabase
    .from('team_members')
    .insert(member)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTeamMember(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export const getAll = getAllTeamMembers;
export const getById = getTeamMemberById;
export const create = createTeamMember;
export const update = updateTeamMember;
export const remove = deleteTeamMember;
