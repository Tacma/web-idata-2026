import { supabase } from '../../../lib/supabaseClient';
import { filterVisibleInsights } from '../../../services/insightVisibility';
import { normalizeBlogPost } from '../../../services/contentUtils';

export async function getAllBlogPosts(filters?: { status?: string }): Promise<any[]> {
  let query = supabase.from('blog_posts').select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('published_date', { ascending: false });

  if (error) throw error;
  return filterVisibleInsights((data || []).map(normalizeBlogPost));
}

export async function getBlogPostById(id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createBlogPost(post: any): Promise<any> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBlogPost(id: string, updates: any): Promise<any> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export const getAll = getAllBlogPosts;
export const getById = getBlogPostById;
export const create = createBlogPost;
export const update = updateBlogPost;
export const remove = deleteBlogPost;
