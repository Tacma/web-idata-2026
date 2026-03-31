import { supabase } from '../../../lib/supabaseClient';

export async function getAllTestimonials(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('testimonials').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getTestimonialById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createTestimonial(testimonial: any): Promise<any> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTestimonial(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) throw error;
}