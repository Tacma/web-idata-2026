import { supabase } from '../../../lib/supabaseClient';

export async function getAllBlogCategories(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('blog_categories').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getBlogCategoryById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createBlogCategory(category: any): Promise<any> {
  const { data, error } = await supabase
    .from('blog_categories')
    .insert(category)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBlogCategory(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('blog_categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBlogCategory(id: string): Promise<void> {
  const { error } = await supabase
    .from('blog_categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
}