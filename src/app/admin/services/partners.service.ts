import { supabase } from '../../../lib/supabaseClient';

export async function getAllPartners(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('partners').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getPartnerById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createPartner(partner: any): Promise<any> {
  const { data, error } = await supabase
    .from('partners')
    .insert(partner)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePartner(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('partners')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePartner(id: string): Promise<void> {
  const { error } = await supabase
    .from('partners')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export const getAll = getAllPartners;
export const getById = getPartnerById;
export const create = createPartner;
export const update = updatePartner;
export const remove = deletePartner;
