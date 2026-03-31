import { supabase } from '../../../lib/supabaseClient';
import { getMergedCaseStudies, mergeCaseStudyWithSeed } from '../../shared/data/industryCaseDiscovery';
import { normalizeCaseStudy } from '../../../services/contentUtils';

export async function getAllCaseStudies(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('case_studies').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  const merged = getMergedCaseStudies((data || []).map(normalizeCaseStudy), { includePlaceholders: true });
  return filters?.status ? merged.filter((item) => item.status === filters.status) : merged;
}

export async function getCaseStudyById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return getMergedCaseStudies([], { includePlaceholders: true }).find((item) => item.id === id) || null;
  }
  return mergeCaseStudyWithSeed(normalizeCaseStudy(data), true);
}

export async function createCaseStudy(study: any): Promise<any> {
  const { data, error } = await supabase
    .from('case_studies')
    .upsert(study, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCaseStudy(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('case_studies')
    .upsert({ ...updates, id }, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCaseStudy(id: string): Promise<void> {
  const { error } = await supabase
    .from('case_studies')
    .delete()
    .eq('id', id);

  if (error && error.code !== 'PGRST116') throw error;
}

export const getAll = getAllCaseStudies;
export const getById = getCaseStudyById;
export const create = createCaseStudy;
export const update = updateCaseStudy;
export const remove = deleteCaseStudy;
