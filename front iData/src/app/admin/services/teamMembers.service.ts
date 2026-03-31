import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('team_members', []) : [];
}

export async function getAllTeamMembers(filters?: { status?: string }): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') {
    let members = [...getStore()];
    if (filters?.status) members = members.filter(m => m.status === filters.status);
    return Promise.resolve(members);
  }
  const response = await fetch(`${API_BASE_URL}/team-members`);
  if (!response.ok) throw new Error('Failed to fetch team members');
  return response.json();
}

export async function getTeamMemberById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(m => m.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/team-members/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createTeamMember(member: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newMember = { ...member, id: `member-${Date.now()}`, createdAt: new Date().toISOString() };
    store.push(newMember);
    saveCollection('team_members', store);
    return Promise.resolve(newMember);
  }
  const response = await fetch(`${API_BASE_URL}/team-members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member)
  });
  if (!response.ok) throw new Error('Failed to create team member');
  return response.json();
}

export async function updateTeamMember(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Team member not found');
    store[index] = { ...store[index], ...updates };
    saveCollection('team_members', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/team-members/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update team member');
  return response.json();
}

export async function deleteTeamMember(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('team_members', getStore().filter(m => m.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/team-members/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete team member');
}
