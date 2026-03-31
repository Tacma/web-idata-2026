import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getMockCaseStudies() {
  return [];
}

function getStore() {
  if (DATA_PROVIDER === 'mock') {
    return initializeCollection('case_studies', getMockCaseStudies());
  }
  return [];
}

export async function getAllCaseStudies(filters?: { status?: string; featured?: boolean }): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') {
    let caseStudies = [...getStore()];
    
    if (filters?.status) {
      caseStudies = caseStudies.filter(c => c.status === filters.status);
    }
    
    if (filters?.featured !== undefined) {
      caseStudies = caseStudies.filter(c => c.featured === filters.featured);
    }
    
    return Promise.resolve(caseStudies);
  } else {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    
    const response = await fetch(`${API_BASE_URL}/case-studies?${params}`);
    if (!response.ok) throw new Error('Failed to fetch case studies');
    return response.json();
  }
}

export async function getCaseStudyById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') {
    const caseStudy = getStore().find(c => c.id === id);
    return Promise.resolve(caseStudy || null);
  } else {
    const response = await fetch(`${API_BASE_URL}/case-studies/${id}`);
    if (!response.ok) return null;
    return response.json();
  }
}

export async function createCaseStudy(caseStudy: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newCaseStudy = {
      ...caseStudy,
      id: `case-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    store.push(newCaseStudy);
    saveCollection('case_studies', store);
    return Promise.resolve(newCaseStudy);
  } else {
    const response = await fetch(`${API_BASE_URL}/case-studies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseStudy)
    });
    if (!response.ok) throw new Error('Failed to create case study');
    return response.json();
  }
}

export async function updateCaseStudy(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Case study not found');
    
    store[index] = {
      ...store[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    saveCollection('case_studies', store);
    return Promise.resolve(store[index]);
  } else {
    const response = await fetch(`${API_BASE_URL}/case-studies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update case study');
    return response.json();
  }
}

export async function deleteCaseStudy(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const filtered = store.filter(c => c.id !== id);
    saveCollection('case_studies', filtered);
    return Promise.resolve();
  } else {
    const response = await fetch(`${API_BASE_URL}/case-studies/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete case study');
  }
}
