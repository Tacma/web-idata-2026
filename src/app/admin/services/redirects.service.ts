import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('redirects', []) : [];
}

export async function getAllRedirects(): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve([...getStore()]);
  const response = await fetch(`${API_BASE_URL}/redirects`);
  if (!response.ok) throw new Error('Failed to fetch redirects');
  return response.json();
}

export async function getRedirectById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(r => r.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/redirects/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createRedirect(redirect: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newRedirect = { ...redirect, id: `redir-${Date.now()}`, createdAt: new Date().toISOString() };
    store.push(newRedirect);
    saveCollection('redirects', store);
    return Promise.resolve(newRedirect);
  }
  const response = await fetch(`${API_BASE_URL}/redirects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(redirect)
  });
  if (!response.ok) throw new Error('Failed to create redirect');
  return response.json();
}

export async function updateRedirect(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Redirect not found');
    store[index] = { ...store[index], ...updates };
    saveCollection('redirects', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/redirects/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update redirect');
  return response.json();
}

export async function deleteRedirect(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('redirects', getStore().filter(r => r.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/redirects/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete redirect');
}
