import { supabase } from '../lib/supabase';

const LOCAL_STORAGE_KEY = 'cms_job_applications';
const RESUME_BUCKET = 'job-applications';

export type JobApplicationType = 'job' | 'open';
export type JobApplicationStatus =
  | 'new'
  | 'reviewing'
  | 'interviewing'
  | 'accepted'
  | 'rejected'
  | 'archived';

export interface JobApplicationInput {
  application_type: JobApplicationType;
  job_id?: string | null;
  job_title?: string | null;
  job_slug?: string | null;
  job_area?: string | null;
  job_location?: string | null;
  job_modality?: string | null;
  job_level?: string | null;
  spontaneous_application?: boolean;
  applied_to_label: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  desired_area?: string;
  desired_role?: string;
  experience_level?: string;
  years_of_experience?: string;
  availability?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  cover_letter: string;
  salary_expectation?: string;
  consent_accepted: boolean;
  language: 'es' | 'en';
  source_page: string;
  source_url: string;
  resume_file: File;
}

export interface JobApplicationRecord {
  id: string;
  application_type: JobApplicationType;
  status: JobApplicationStatus;
  job_id?: string | null;
  job_title?: string | null;
  job_slug?: string | null;
  job_area?: string | null;
  job_location?: string | null;
  job_modality?: string | null;
  job_level?: string | null;
  spontaneous_application?: boolean;
  applied_to_label: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  desired_area?: string | null;
  desired_role?: string | null;
  experience_level?: string | null;
  years_of_experience?: string | null;
  availability?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  cover_letter?: string | null;
  salary_expectation?: string | null;
  consent_accepted: boolean;
  language: 'es' | 'en';
  source_page: string;
  source_url: string;
  resume_file_name?: string | null;
  resume_file_path?: string | null;
  resume_file_url?: string | null;
  recruiter_notes?: string | null;
  assigned_reviewer?: string | null;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

function createApplicationId() {
  return `jobapp-${crypto.randomUUID()}`;
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function getLocalStore(): JobApplicationRecord[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error reading local job applications store:', error);
    return [];
  }
}

function saveLocalStore(records: JobApplicationRecord[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
}

function isSupabaseUnavailable(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  return (
    message.includes('job_applications') ||
    message.includes('relation') ||
    message.includes('bucket') ||
    message.includes('storage') ||
    message.includes('network') ||
    message.includes('failed to fetch') ||
    message.includes('could not find the') ||
    message.includes('column')
  );
}

function isMissingColumnError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return message.includes('column') || message.includes('schema cache')
}

async function uploadResume(applicationId: string, file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'pdf';
  const path = `resumes/${new Date().toISOString().slice(0, 10)}/${applicationId}.${extension}`;

  const { error } = await supabase.storage
    .from(RESUME_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'application/pdf',
    });

  if (error) {
    throw error;
  }

  return {
    resume_file_name: file.name,
    resume_file_path: path,
  };
}

async function createResumeSignedUrl(path?: string | null) {
  if (!path) return null;

  const { data, error } = await supabase.storage
    .from(RESUME_BUCKET)
    .createSignedUrl(path, 60 * 60);

  if (error) {
    return null;
  }

  return data.signedUrl;
}

async function normalizeRecord(row: any): Promise<JobApplicationRecord> {
  return {
    id: row.id,
    application_type: row.application_type,
    status: row.status ?? 'new',
    job_id: row.job_id ?? null,
    job_title: row.job_title ?? null,
    job_slug: row.job_slug ?? null,
    job_area: row.job_area ?? null,
    job_location: row.job_location ?? null,
    job_modality: row.job_modality ?? null,
    job_level: row.job_level ?? null,
    spontaneous_application: row.spontaneous_application ?? row.application_type === 'open',
    applied_to_label: row.applied_to_label ?? row.job_title ?? '',
    first_name: row.first_name ?? '',
    last_name: row.last_name ?? '',
    email: row.email ?? '',
    phone: row.phone ?? '',
    country: row.country ?? '',
    city: row.city ?? '',
    desired_area: row.desired_area ?? null,
    desired_role: row.desired_role ?? null,
    experience_level: row.experience_level ?? null,
    years_of_experience: row.years_of_experience ?? null,
    availability: row.availability ?? null,
    linkedin_url: row.linkedin_url ?? null,
    portfolio_url: row.portfolio_url ?? null,
    cover_letter: row.cover_letter ?? null,
    salary_expectation: row.salary_expectation ?? null,
    consent_accepted: Boolean(row.consent_accepted),
    language: row.language ?? 'es',
    source_page: row.source_page ?? '',
    source_url: row.source_url ?? '',
    resume_file_name: row.resume_file_name ?? null,
    resume_file_path: row.resume_file_path ?? null,
    resume_file_url: row.resume_file_path ? await createResumeSignedUrl(row.resume_file_path) : row.resume_file_url ?? null,
    recruiter_notes: row.recruiter_notes ?? null,
    assigned_reviewer: row.assigned_reviewer ?? null,
    submitted_at: row.submitted_at ?? row.created_at ?? new Date().toISOString(),
    created_at: row.created_at ?? row.submitted_at ?? new Date().toISOString(),
    updated_at: row.updated_at ?? row.submitted_at ?? new Date().toISOString(),
  };
}

function createLocalFallbackRecord(input: JobApplicationInput): JobApplicationRecord {
  const timestamp = new Date().toISOString();

  return {
    id: createApplicationId(),
    application_type: input.application_type,
    status: 'new',
    job_id: input.job_id ?? null,
    job_title: input.job_title ?? null,
    job_slug: input.job_slug ?? null,
    job_area: input.job_area ?? null,
    job_location: input.job_location ?? null,
    job_modality: input.job_modality ?? null,
    job_level: input.job_level ?? null,
    spontaneous_application: input.spontaneous_application ?? input.application_type === 'open',
    applied_to_label: input.applied_to_label,
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    phone: input.phone,
    country: input.country,
    city: input.city,
    desired_area: input.desired_area ?? null,
    desired_role: input.desired_role ?? null,
    experience_level: input.experience_level ?? null,
    years_of_experience: input.years_of_experience ?? null,
    availability: input.availability ?? null,
    linkedin_url: input.linkedin_url ?? null,
    portfolio_url: input.portfolio_url ?? null,
    cover_letter: input.cover_letter ?? null,
    salary_expectation: input.salary_expectation ?? null,
    consent_accepted: input.consent_accepted,
    language: input.language,
    source_page: input.source_page,
    source_url: input.source_url,
    resume_file_name: input.resume_file.name,
    resume_file_path: null,
    resume_file_url: null,
    recruiter_notes: null,
    assigned_reviewer: null,
    submitted_at: timestamp,
    created_at: timestamp,
    updated_at: timestamp,
  };
}

export async function createJobApplication(input: JobApplicationInput): Promise<JobApplicationRecord> {
  const applicationId = createApplicationId();
  const timestamp = new Date().toISOString();

  try {
    const resume = await uploadResume(applicationId, input.resume_file);

    const basePayload = {
      id: applicationId,
      application_type: input.application_type,
      status: 'new',
      job_id: input.job_id ?? null,
      job_title: input.job_title ?? null,
      job_slug: input.job_slug ?? null,
      applied_to_label: input.applied_to_label,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      phone: input.phone,
      country: input.country,
      city: input.city,
      desired_area: input.desired_area ?? null,
      desired_role: input.desired_role ?? null,
      years_of_experience: input.years_of_experience ?? null,
      availability: input.availability ?? null,
      linkedin_url: input.linkedin_url ?? null,
      portfolio_url: input.portfolio_url ?? null,
      cover_letter: input.cover_letter,
      salary_expectation: input.salary_expectation ?? null,
      consent_accepted: input.consent_accepted,
      language: input.language,
      source_page: input.source_page,
      source_url: input.source_url,
      submitted_at: timestamp,
      created_at: timestamp,
      updated_at: timestamp,
      ...resume,
    };

    const extendedPayload = {
      ...basePayload,
      job_area: input.job_area ?? null,
      job_location: input.job_location ?? null,
      job_modality: input.job_modality ?? null,
      job_level: input.job_level ?? null,
      spontaneous_application: input.spontaneous_application ?? input.application_type === 'open',
      experience_level: input.experience_level ?? null,
    };

    let insertResponse = await supabase
      .from('job_applications')
      .insert(extendedPayload)
      .select()
      .single();

    if (insertResponse.error && isMissingColumnError(insertResponse.error)) {
      insertResponse = await supabase
        .from('job_applications')
        .insert(basePayload)
        .select()
        .single();
    }

    if (insertResponse.error) {
      throw insertResponse.error;
    }

    return normalizeRecord(insertResponse.data);
  } catch (error) {
    if (!isSupabaseUnavailable(error)) {
      throw error;
    }

    const fallback = createLocalFallbackRecord(input);
    fallback.id = applicationId;
    fallback.submitted_at = timestamp;
    fallback.created_at = timestamp;
    fallback.updated_at = timestamp;
    saveLocalStore([fallback, ...getLocalStore()]);
    return fallback;
  }
}

export async function getAllJobApplications(filters?: { status?: string; jobId?: string }): Promise<JobApplicationRecord[]> {
  try {
    let query = supabase
      .from('job_applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.jobId) {
      query = query.eq('job_id', filters.jobId);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return Promise.all((data || []).map(normalizeRecord));
  } catch (error) {
    if (!isSupabaseUnavailable(error)) {
      throw error;
    }

    return getLocalStore()
      .filter((item) => !filters?.status || item.status === filters.status)
      .filter((item) => !filters?.jobId || item.job_id === filters.jobId)
      .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
  }
}

export async function getJobApplicationById(id: string): Promise<JobApplicationRecord | null> {
  const all = await getAllJobApplications();
  return all.find((item) => item.id === id) || null;
}

export async function updateJobApplicationStatus(id: string, status: JobApplicationStatus): Promise<JobApplicationRecord> {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return normalizeRecord(data);
  } catch (error) {
    if (!isSupabaseUnavailable(error)) {
      throw error;
    }

    const store = getLocalStore();
    const index = store.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Application not found');
    }

    const updated = {
      ...store[index],
      status,
      updated_at: new Date().toISOString(),
    };

    store[index] = updated;
    saveLocalStore(store);
    return updated;
  }
}

export async function deleteJobApplication(id: string): Promise<void> {
  try {
    const existing = await getJobApplicationById(id);

    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    if (existing?.resume_file_path) {
      await supabase.storage.from(RESUME_BUCKET).remove([existing.resume_file_path]);
    }
  } catch (error) {
    if (!isSupabaseUnavailable(error)) {
      throw error;
    }

    saveLocalStore(getLocalStore().filter((item) => item.id !== id));
  }
}
