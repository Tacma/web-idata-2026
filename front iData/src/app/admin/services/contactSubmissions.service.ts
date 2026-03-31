import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { mockContactSubmissions } from '../mocks/contactSubmissions.mock';
import type { ContactSubmission } from '../types';
import { initializeCollection, saveCollection, getCollection } from './localStorage.service';

/**
 * Contact Submissions Service
 * Supports both mock and API modes with localStorage persistence
 */

// Initialize from localStorage or seed data
function getStore(): ContactSubmission[] {
  if (DATA_PROVIDER === 'mock') {
    return initializeCollection('contact_submissions', mockContactSubmissions);
  }
  return [];
}

/**
 * Get all contact submissions
 */
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  if (DATA_PROVIDER === 'mock') {
    // Mock mode: return from localStorage
    const store = getStore();
    return Promise.resolve([...store].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ));
  } else {
    // API mode: fetch from backend
    const response = await fetch(`${API_BASE_URL}/contact-submissions`);
    if (!response.ok) throw new Error('Failed to fetch contact submissions');
    return response.json();
  }
}

/**
 * Get contact submission by ID
 */
export async function getContactSubmissionById(id: string): Promise<ContactSubmission | null> {
  if (DATA_PROVIDER === 'mock') {
    const submission = getStore().find(s => s.id === id);
    return Promise.resolve(submission || null);
  } else {
    const response = await fetch(`${API_BASE_URL}/contact-submissions/${id}`);
    if (!response.ok) return null;
    return response.json();
  }
}

/**
 * Update contact submission status
 */
export async function updateContactSubmissionStatus(
  id: string, 
  status: ContactSubmission['status'],
  notes?: string
): Promise<ContactSubmission> {
  if (DATA_PROVIDER === 'mock') {
    const index = getStore().findIndex(s => s.id === id);
    if (index === -1) throw new Error('Submission not found');
    
    const updatedSubmission = {
      ...getStore()[index],
      status,
      notes: notes || getStore()[index].notes,
      updated_at: new Date().toISOString()
    };
    
    saveCollection('contact_submissions', [
      ...getStore().slice(0, index),
      updatedSubmission,
      ...getStore().slice(index + 1)
    ]);
    
    return Promise.resolve(updatedSubmission);
  } else {
    const response = await fetch(`${API_BASE_URL}/contact-submissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes })
    });
    if (!response.ok) throw new Error('Failed to update submission');
    return response.json();
  }
}

/**
 * Delete contact submission
 */
export async function deleteContactSubmission(id: string): Promise<void> {
  if (DATA_PROVIDER === 'mock') {
    saveCollection('contact_submissions', getStore().filter(s => s.id !== id));
    return Promise.resolve();
  } else {
    const response = await fetch(`${API_BASE_URL}/contact-submissions/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete submission');
  }
}

/**
 * Get submissions statistics
 */
export async function getContactSubmissionsStats(): Promise<{
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  last_30_days: number;
}> {
  const submissions = await getContactSubmissions();
  
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  return {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    qualified: submissions.filter(s => s.status === 'qualified').length,
    converted: submissions.filter(s => s.status === 'converted').length,
    last_30_days: submissions.filter(s => new Date(s.created_at) >= thirtyDaysAgo).length
  };
}

/**
 * Export submissions as CSV
 */
export function exportSubmissionsAsCSV(submissions: ContactSubmission[]): string {
  const headers = [
    'ID', 'Date', 'Name', 'Email', 'Company', 'Phone', 'Status',
    'Source Type', 'Source Title', 'Language', 'Message'
  ];
  
  const rows = submissions.map(s => [
    s.id,
    new Date(s.created_at).toLocaleDateString(),
    `${s.first_name} ${s.last_name}`,
    s.email,
    s.company,
    s.phone,
    s.status,
    s.source_type || '',
    s.source_title || '',
    s.language,
    s.message.substring(0, 100)
  ]);
  
  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
    
  return csv;
}