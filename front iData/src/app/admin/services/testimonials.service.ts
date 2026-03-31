import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('testimonials', []) : [];
}

export async function getAllTestimonials(filters?: { status?: string; featured?: boolean }): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') {
    let testimonials = [...getStore()];
    if (filters?.status) testimonials = testimonials.filter(t => t.status === filters.status);
    if (filters?.featured !== undefined) testimonials = testimonials.filter(t => t.featured === filters.featured);
    return Promise.resolve(testimonials);
  }
  const response = await fetch(`${API_BASE_URL}/testimonials`);
  if (!response.ok) throw new Error('Failed to fetch testimonials');
  return response.json();
}

export async function getTestimonialById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(t => t.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/testimonials/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createTestimonial(testimonial: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newTestimonial = { ...testimonial, id: `test-${Date.now()}`, createdAt: new Date().toISOString() };
    store.push(newTestimonial);
    saveCollection('testimonials', store);
    return Promise.resolve(newTestimonial);
  }
  const response = await fetch(`${API_BASE_URL}/testimonials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testimonial)
  });
  if (!response.ok) throw new Error('Failed to create testimonial');
  return response.json();
}

export async function updateTestimonial(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Testimonial not found');
    store[index] = { ...store[index], ...updates };
    saveCollection('testimonials', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update testimonial');
  return response.json();
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('testimonials', getStore().filter(t => t.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete testimonial');
}
