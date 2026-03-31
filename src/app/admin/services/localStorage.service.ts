/**
 * Local Storage Service
 * Provides a centralized persistence layer for the CMS
 * All collections are stored in localStorage with a cms_ prefix
 */

const PREFIX = 'cms_';

export type CollectionKey =
  | 'home_sections'
  | 'service_categories'
  | 'services'
  | 'industries'
  | 'case_studies'
  | 'blog_posts'
  | 'blog_categories'
  | 'jobs'
  | 'job_applications'
  | 'team_members'
  | 'resources'
  | 'testimonials'
  | 'contact_submissions'
  | 'contact_settings'
  | 'navigation'
  | 'seo_settings'
  | 'analytics_settings'
  | 'markets'
  | 'redirects'
  | 'legal_pages'
  | 'uploaded_media'
  | 'global_settings'
  | 'users';

/**
 * Get a collection from localStorage
 */
export function getCollection<T>(key: CollectionKey): T[] | null {
  try {
    const data = localStorage.getItem(`${PREFIX}${key}`);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading collection ${key}:`, error);
    return null;
  }
}

/**
 * Save a collection to localStorage
 */
export function saveCollection<T>(key: CollectionKey, data: T[]): void {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving collection ${key}:`, error);
    throw error;
  }
}

/**
 * Reset a collection (clear it from localStorage)
 */
export function resetCollection(key: CollectionKey): void {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    console.error(`Error resetting collection ${key}:`, error);
  }
}

/**
 * Initialize a collection with seed data if it doesn't exist
 */
export function initializeCollection<T>(key: CollectionKey, seedData: T[]): T[] {
  const existing = getCollection<T>(key);
  
  if (existing && existing.length > 0) {
    return existing;
  }
  
  // No data exists, initialize with seed data
  saveCollection(key, seedData);
  return seedData;
}

/**
 * Get a settings object (non-array) from localStorage
 */
export function getSettings<T>(key: CollectionKey): T | null {
  try {
    const data = localStorage.getItem(`${PREFIX}${key}`);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading settings ${key}:`, error);
    return null;
  }
}

/**
 * Save a settings object to localStorage
 */
export function saveSettings<T>(key: CollectionKey, data: T): void {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving settings ${key}:`, error);
    throw error;
  }
}

/**
 * Initialize settings with seed data if it doesn't exist
 */
export function initializeSettings<T>(key: CollectionKey, seedData: T): T {
  const existing = getSettings<T>(key);
  
  if (existing) {
    return existing;
  }
  
  // No data exists, initialize with seed data
  saveSettings(key, seedData);
  return seedData;
}

/**
 * Clear all CMS data from localStorage
 */
export function clearAllCMSData(): void {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}
