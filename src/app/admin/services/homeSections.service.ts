import { supabase } from '../../../lib/supabaseClient';
import type { HomeSection } from '../../shared/types';

/**
 * Get all home sections
 */
export async function getAllHomeSections(): Promise<HomeSection[]> {
  const { data, error } = await supabase
    .from('home_sections')
    .select('*')
    .order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Get home section by ID
 */
export async function getHomeSectionById(id: string): Promise<HomeSection | null> {
  const { data, error } = await supabase
    .from('home_sections')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

/**
 * Create home section
 */
export async function createHomeSection(section: Omit<HomeSection, 'id' | 'created_at' | 'updated_at'>): Promise<HomeSection> {
  const { data, error } = await supabase
    .from('home_sections')
    .insert(section)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update home section
 */
export async function updateHomeSection(id: string, updates: Partial<HomeSection>): Promise<HomeSection> {
  const { data, error } = await supabase
    .from('home_sections')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete home section
 */
export async function deleteHomeSection(id: string): Promise<void> {
  const { error } = await supabase
    .from('home_sections')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
