import { supabase } from '../../../lib/supabaseClient';

export async function getAllJobs(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('jobs').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getJobById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createJob(job: any): Promise<any> {
  const { data, error } = await supabase
    .from('jobs')
    .insert(job)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateJob(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteJob(id: string): Promise<void> {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}