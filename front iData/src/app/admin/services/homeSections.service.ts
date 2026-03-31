import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('home_sections', []) : [];
}

export async function getAllHomeSections(): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve([...getStore()]);
  const response = await fetch(`${API_BASE_URL}/home-sections`);
  if (!response.ok) throw new Error('Failed to fetch home sections');
  return response.json();
}

export async function getHomeSectionById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(s => s.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/home-sections/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createHomeSection(section: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newSection = { ...section, id: `section-${Date.now()}` };
    store.push(newSection);
    saveCollection('home_sections', store);
    return Promise.resolve(newSection);
  }
  const response = await fetch(`${API_BASE_URL}/home-sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(section)
  });
  if (!response.ok) throw new Error('Failed to create home section');
  return response.json();
}

export async function updateHomeSection(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Home section not found');
    store[index] = { ...store[index], ...updates };
    saveCollection('home_sections', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/home-sections/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update home section');
  return response.json();
}

export async function deleteHomeSection(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('home_sections', getStore().filter(s => s.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/home-sections/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete home section');
}
