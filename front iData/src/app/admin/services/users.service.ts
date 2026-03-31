import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeCollection, saveCollection } from './localStorage.service';

const defaultUsers = [
  {
    id: '1',
    email: 'admin@idata.global',
    name: 'Administrador',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

function getStore() {
  return DATA_PROVIDER === 'mock' ? initializeCollection('users', defaultUsers) : [];
}

export async function getAllUsers(): Promise<any[]> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve([...getStore()]);
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function getUserById(id: string): Promise<any | null> {
  if (DATA_PROVIDER === 'mock') return Promise.resolve(getStore().find(u => u.id === id) || null);
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function createUser(user: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const newUser = { ...user, id: `user-${Date.now()}`, createdAt: new Date().toISOString() };
    store.push(newUser);
    saveCollection('users', store);
    return Promise.resolve(newUser);
  }
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
}

export async function updateUser(id: string, updates: any): Promise<any> {
  if (DATA_PROVIDER === 'mock') {
    const store = getStore();
    const index = store.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    store[index] = { ...store[index], ...updates };
    saveCollection('users', store);
    return Promise.resolve(store[index]);
  }
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('users', getStore().filter(u => u.id !== id));
    return Promise.resolve();
  }
  const response = await fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete user');
}
