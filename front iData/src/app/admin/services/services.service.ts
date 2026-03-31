import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { mockServices } from '../mocks/services.mock';
import type { Service } from '../types';
import { initializeCollection, saveCollection } from './localStorage.service';

/**
 * Services Service
 * Manages service offerings with localStorage persistence
 */

// Initialize from localStorage or seed data
function getStore(): Service[] {
  if (DATA_PROVIDER === 'mock') {
    return initializeCollection('services', mockServices);
  }
  return [];
}

/**
 * Get all services
 */
export async function getServices(filters?: {
  status?: Service['status'];
  featured?: boolean;
}): Promise<Service[]> {
  if (DATA_PROVIDER === 'mock') {
    let services = [...getStore()];
    
    if (filters?.status) {
      services = services.filter(s => s.status === filters.status);
    }
    
    if (filters?.featured !== undefined) {
      services = services.filter(s => s.featured === filters.featured);
    }
    
    return Promise.resolve(services.sort((a, b) => a.order - b.order));
  } else {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    
    const response = await fetch(`${API_BASE_URL}/services?${params}`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  }
}

/**
 * Get service by ID
 */
export async function getServiceById(id: string): Promise<Service | null> {
  if (DATA_PROVIDER === 'mock') {
    const service = getStore().find(s => s.id === id);
    return Promise.resolve(service || null);
  } else {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    if (!response.ok) return null;
    return response.json();
  }
}

/**
 * Get service by slug
 */
export async function getServiceBySlug(slug: string, language: 'es' | 'en'): Promise<Service | null> {
  if (DATA_PROVIDER === 'mock') {
    const service = getStore().find(s => 
      language === 'es' ? s.slug_es === slug : s.slug_en === slug
    );
    return Promise.resolve(service || null);
  } else {
    const response = await fetch(`${API_BASE_URL}/services/slug/${slug}?language=${language}`);
    if (!response.ok) return null;
    return response.json();
  }
}

/**
 * Create new service
 */
export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
  if (DATA_PROVIDER === 'mock') {
    const newService: Service = {
      ...service,
      id: `srv-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const store = getStore();
    store.push(newService);
    saveCollection('services', store);
    return Promise.resolve(newService);
  } else {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service)
    });
    if (!response.ok) throw new Error('Failed to create service');
    return response.json();
  }
}

/**
 * Update service
 */
export async function updateService(id: string, updates: Partial<Service>): Promise<Service> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Service not found');
    
    store[index] = {
      ...store[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    saveCollection('services', store);
    return Promise.resolve(store[index]);
  } else {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update service');
    return response.json();
  }
}

/**
 * Delete service
 */
export async function deleteService(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Service not found');
    
    store.splice(index, 1);
    saveCollection('services', store);
    return Promise.resolve();
  } else {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete service');
  }
}

/**
 * Get services statistics
 */
export async function getServicesStats(): Promise<{
  total: number;
  published: number;
  draft: number;
  featured: number;
}> {
  const services = await getServices();
  
  return {
    total: services.length,
    published: services.filter(s => s.status === 'published').length,
    draft: services.filter(s => s.status === 'draft').length,
    featured: services.filter(s => s.featured).length
  };
}