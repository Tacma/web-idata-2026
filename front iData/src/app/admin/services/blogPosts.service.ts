import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  if (DATA_PROVIDER === 'mock') {
    return initializeCollection('blog_posts', []);
  }
  return [];
}

export async function getAllBlogPosts(filters?: { status?: string }): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') {
    let posts = [...getStore()];
    if (filters?.status) posts = posts.filter(p => p.status === filters.status);
    return Promise.resolve(posts);
  }
  const response = await fetch(`${API_BASE_URL}/blog-posts`);
  if (!response.ok) throw new Error('Failed to fetch blog posts');
  return response.json();
}

export async function getBlogPostById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve(getStore().find(p => p.id === id) || null);
  }
  const response = await fetch(`${API_BASE_URL}/blog-posts/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createBlogPost(post: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newPost = { ...post, id: `post-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    store.push(newPost);
    saveCollection('blog_posts', store);
    return Promise.resolve(newPost);
  }
  const response = await fetch(`${API_BASE_URL}/blog-posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  if (!response.ok) throw new Error('Failed to create blog post');
  return response.json();
}

export async function updateBlogPost(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Blog post not found');
    store[index] = { ...store[index], ...updates, updatedAt: new Date().toISOString() };
    saveCollection('blog_posts', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/blog-posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update blog post');
  return response.json();
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    saveCollection('blog_posts', store.filter(p => p.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/blog-posts/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete blog post');
}
