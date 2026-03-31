import { supabase } from '../../../lib/supabaseClient';
import type { Service } from '../types';

/**
 * Get all services
 */
export async function getServices(filters?: {
  status?: Service['status'];
  featured?: boolean;
}): Promise<Service[]> {
  let query = supabase.from('services').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export const getAll = getServices;
export const getById = getServiceById;
export const create = createService;
export const update = updateService;
export const remove = deleteService;

/**
 * Get service by ID
 */
export async function getServiceById(id: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

/**
 * Get service by slug
 */
export async function getServiceBySlug(slug: string, language: 'es' | 'en'): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('language', language)
    .single();

  if (error) return null;
  return data;
}

/**
 * Create new service
 */
export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update service
 */
export async function updateService(id: string, updates: Partial<Service>): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete service
 */
export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Get services statistics
 */
export async function getServicesStats(): Promise<{
  total: number;
  published: number;
  draft: number;
  featured: number;
}> {
  const { data: all, error: allError } = await supabase
    .from('services')
    .select('status');

  if (allError) throw allError;

  const total = all?.length || 0;
  const published = all?.filter(s => s.status === 'published').length || 0;
  const draft = all?.filter(s => s.status === 'draft').length || 0;
  const featured = 0; // No featured in schema

  return { total, published, draft, featured };
}
