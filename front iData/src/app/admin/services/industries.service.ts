import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

// Import mock data for seed
function getMockIndustries() {
  // This will be imported from the actual mock data
  return [];
}

/**
 * Industries Service
 * Manages industries with localStorage persistence
 */

function getStore() {
  if (DATA_PROVIDER === 'mock') {
    return initializeCollection('industries', getMockIndustries());
  }
  return [];
}

export async function getAllIndustries(filters?: { status?: string; featured?: boolean }): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') {
    let industries = [...getStore()];
    
    if (filters?.status) {
      industries = industries.filter(i => i.status === filters.status);
    }
    
    if (filters?.featured !== undefined) {
      industries = industries.filter(i => i.featured === filters.featured);
    }
    
    return Promise.resolve(industries);
  } else {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    
    const response = await fetch(`${API_BASE_URL}/industries?${params}`);
    if (!response.ok) throw new Error('Failed to fetch industries');
    return response.json();
  }
}

export async function getIndustryById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') {
    const industry = getStore().find(i => i.id === id);
    return Promise.resolve(industry || null);
  } else {
    const response = await fetch(`${API_BASE_URL}/industries/${id}`);
    if (!response.ok) return null;
    return response.json();
  }
}

export async function createIndustry(industry: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newIndustry = {
      ...industry,
      id: `ind-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    store.push(newIndustry);
    saveCollection('industries', store);
    return Promise.resolve(newIndustry);
  } else {
    const response = await fetch(`${API_BASE_URL}/industries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(industry)
    });
    if (!response.ok) throw new Error('Failed to create industry');
    return response.json();
  }
}

export async function updateIndustry(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Industry not found');
    
    store[index] = {
      ...store[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    saveCollection('industries', store);
    return Promise.resolve(store[index]);
  } else {
    const response = await fetch(`${API_BASE_URL}/industries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update industry');
    return response.json();
  }
}

export async function deleteIndustry(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const filtered = store.filter(i => i.id !== id);
    saveCollection('industries', filtered);
    return Promise.resolve();
  } else {
    const response = await fetch(`${API_BASE_URL}/industries/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete industry');
  }
}
