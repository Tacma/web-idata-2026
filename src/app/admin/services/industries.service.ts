import { supabase } from '../../../lib/supabaseClient';
import { getMergedIndustries, mergeIndustryWithSeed } from '../../shared/data/industryCaseDiscovery';
import { normalizeIndustry } from '../../../services/contentUtils';

export async function getAllIndustries(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('industries').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  const merged = getMergedIndustries((data || []).map(normalizeIndustry));
  return filters?.status ? merged.filter((item) => item.status === filters.status) : merged;
}

export async function getIndustryById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return getMergedIndustries([]).find((item) => item.id === id) || null;
  }
  return mergeIndustryWithSeed(normalizeIndustry(data));
}

export async function createIndustry(industry: any): Promise<any> {
  const { data, error } = await supabase
    .from('industries')
    .upsert(industry, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateIndustry(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('industries')
    .upsert({ ...updates, id }, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteIndustry(id: string): Promise<void> {
  const { error } = await supabase
    .from('industries')
    .delete()
    .eq('id', id);

  if (error && error.code !== 'PGRST116') throw error;
}

export const getAll = getAllIndustries;
export const getById = getIndustryById;
export const create = createIndustry;
export const update = updateIndustry;
export const remove = deleteIndustry;
