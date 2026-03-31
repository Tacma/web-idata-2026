import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('resources', []) : [];
}

export async function getAllResources(filters?: { status?: string }): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') {
    let resources = [...getStore()];
    if (filters?.status) resources = resources.filter(r => r.status === filters.status);
    return Promise.resolve(resources);
  }
  const response = await fetch(`${API_BASE_URL}/resources`);
  if (!response.ok) throw new Error('Failed to fetch resources');
  return response.json();
}

export async function getResourceById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(r => r.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/resources/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createResource(resource: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newResource = { ...resource, id: `res-${Date.now()}`, createdAt: new Date().toISOString() };
    store.push(newResource);
    saveCollection('resources', store);
    return Promise.resolve(newResource);
  }
  const response = await fetch(`${API_BASE_URL}/resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource)
  });
  if (!response.ok) throw new Error('Failed to create resource');
  return response.json();
}

export async function updateResource(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Resource not found');
    store[index] = { ...store[index], ...updates };
    saveCollection('resources', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/resources/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update resource');
  return response.json();
}

export async function deleteResource(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('resources', getStore().filter(r => r.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/resources/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete resource');
}
