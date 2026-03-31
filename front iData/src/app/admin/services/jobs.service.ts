import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('jobs', []) : [];
}

export async function getAllJobs(filters?: { status?: string }): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') {
    let jobs = [...getStore()];
    if (filters?.status) jobs = jobs.filter(j => j.status === filters.status);
    return Promise.resolve(jobs);
  }
  const response = await fetch(`${API_BASE_URL}/jobs`);
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
}

export async function getJobById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(j => j.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createJob(job: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newJob = { ...job, id: `job-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    store.push(newJob);
    saveCollection('jobs', store);
    return Promise.resolve(newJob);
  }
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  });
  if (!response.ok) throw new Error('Failed to create job');
  return response.json();
}

export async function updateJob(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(j => j.id === id);
    if (index === -1) throw new Error('Job not found');
    store[index] = { ...store[index], ...updates, updatedAt: new Date().toISOString() };
    saveCollection('jobs', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update job');
  return response.json();
}

export async function deleteJob(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('jobs', getStore().filter(j => j.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete job');
}
