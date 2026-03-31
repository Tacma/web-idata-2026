import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { mockGlobalSettings, mockGlobalConfiguration, type GlobalConfiguration } from '../mocks/globalSettings.mock';
import type { SEOGlobalSettings } from '../types';

/**
 * Global Settings Service
 * Manages site-wide configuration
 */

// In-memory store for mock mode
let mockSEOStore: SEOGlobalSettings = { ...mockGlobalSettings };
let mockConfigStore: GlobalConfiguration = { ...mockGlobalConfiguration };

/**
 * Get SEO global settings
 */
export async function getSEOGlobalSettings(): Promise<SEOGlobalSettings> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve({ ...mockSEOStore });
  } else {
    const response = await fetch(`${API_BASE_URL}/settings/seo`);
    if (!response.ok) throw new Error('Failed to fetch SEO settings');
    return response.json();
  }
}

/**
 * Update SEO global settings
 */
export async function updateSEOGlobalSettings(updates: Partial<SEOGlobalSettings>): Promise<SEOGlobalSettings> {
  if (DATA_PROVIDER === 'mock') {
    mockSEOStore = {
      ...mockSEOStore,
      ...updates
    };
    return Promise.resolve({ ...mockSEOStore });
  } else {
    const response = await fetch(`${API_BASE_URL}/settings/seo`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update SEO settings');
    return response.json();
  }
}

/**
 * Get global configuration
 */
export async function getGlobalConfiguration(): Promise<GlobalConfiguration> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve({ ...mockConfigStore });
  } else {
    const response = await fetch(`${API_BASE_URL}/settings/global`);
    if (!response.ok) throw new Error('Failed to fetch global configuration');
    return response.json();
  }
}

/**
 * Update global configuration
 */
export async function updateGlobalConfiguration(updates: Partial<GlobalConfiguration>): Promise<GlobalConfiguration> {
  if (DATA_PROVIDER === 'mock') {
    mockConfigStore = {
      ...mockConfigStore,
      ...updates
    };
    return Promise.resolve({ ...mockConfigStore });
  } else {
    const response = await fetch(`${API_BASE_URL}/settings/global`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update global configuration');
    return response.json();
  }
}

/**
 * Get default public language
 */
export async function getDefaultPublicLanguage(): Promise<'es' | 'en'> {
  const config = await getGlobalConfiguration();
  return config.default_public_language;
}

/**
 * Set default public language
 */
export async function setDefaultPublicLanguage(language: 'es' | 'en'): Promise<void> {
  await updateGlobalConfiguration({ default_public_language: language });
}
