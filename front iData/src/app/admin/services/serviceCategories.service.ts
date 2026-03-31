import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('service_categories', []) : [];
}

export async function getAllServiceCategories(): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve([...getStore()]);
  const response = await fetch(`${API_BASE_URL}/service-categories`);
  if (!response.ok) throw new Error('Failed to fetch service categories');
  return response.json();
}

export async function getServiceCategoryById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(c => c.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/service-categories/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createServiceCategory(category: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newCategory = { ...category, id: `cat-${Date.now()}`, createdAt: new Date().toISOString() };
    store.push(newCategory);
    saveCollection('service_categories', store);
    return Promise.resolve(newCategory);
  }
  const response = await fetch(`${API_BASE_URL}/service-categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  });
  if (!response.ok) throw new Error('Failed to create service category');
  return response.json();
}

export async function updateServiceCategory(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Service category not found');
    store[index] = { ...store[index], ...updates };
    saveCollection('service_categories', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/service-categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update service category');
  return response.json();
}

export async function deleteServiceCategory(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('service_categories', getStore().filter(c => c.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/service-categories/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete service category');
}
