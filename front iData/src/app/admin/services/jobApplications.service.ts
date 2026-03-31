import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('job_applications', []) : [];
}

export async function getAllJobApplications(filters?: { status?: string; jobId?: string }): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') {
    let applications = [...getStore()];
    if (filters?.status) applications = applications.filter(a => a.status === filters.status);
    if (filters?.jobId) applications = applications.filter(a => a.jobId === filters.jobId);
    return Promise.resolve(applications);
  }
  const response = await fetch(`${API_BASE_URL}/job-applications`);
  if (!response.ok) throw new Error('Failed to fetch job applications');
  return response.json();
}

export async function getJobApplicationById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(a => a.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/job-applications/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function updateJobApplicationStatus(id: string, status: string): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Application not found');
    store[index] = { ...store[index], status, updatedAt: new Date().toISOString() };
    saveCollection('job_applications', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/job-applications/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('Failed to update application');
  return response.json();
}

export async function deleteJobApplication(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('job_applications', getStore().filter(a => a.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/job-applications/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete application');
}
