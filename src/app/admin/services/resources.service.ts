import { supabase } from '../../../lib/supabaseClient';

export async function getAllResources(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('resources').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getResourceById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createResource(resource: any): Promise<any> {
  const { data, error } = await supabase
    .from('resources')
    .insert(resource)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateResource(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('resources')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteResource(id: string): Promise<void> {
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', id);

  if (error) throw error;
}