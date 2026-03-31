import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeSettings, saveSettings } from './localStorage.service';

/**
 * Analytics Settings Service
 * Manages analytics configuration with localStorage persistence
 */

export interface AnalyticsSettings {
  ga4MeasurementId: string;
  gtmContainerId: string;
  searchConsoleVerification: string;
  enableConsentMode: boolean;
  trackForms: boolean;
  trackCTAs: boolean;
  trackLanguageChanges: boolean;
  trackScroll: boolean;
  trackJobApplications: boolean;
  trackBlogInteraction: boolean;
}

// Default analytics settings
const defaultSettings: AnalyticsSettings = {
  ga4MeasurementId: '',
  gtmContainerId: '',
  searchConsoleVerification: '',
  enableConsentMode: false,
  trackForms: true,
  trackCTAs: true,
  trackLanguageChanges: true,
  trackScroll: false,
  trackJobApplications: true,
  trackBlogInteraction: false
};

/**
 * Get analytics settings
 */
export async function getAnalyticsSettings(): Promise<AnalyticsSettings> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve(initializeSettings('analytics_settings', defaultSettings));
  } else {
    const response = await fetch(`${API_BASE_URL}/settings/analytics`);
    if (!response.ok) throw new Error('Failed to fetch analytics settings');
    return response.json();
  }
}

/**
 * Save analytics settings
 */
export async function saveAnalyticsSettings(settings: AnalyticsSettings): Promise<AnalyticsSettings> {
  if (DATA_PROVIDER === 'mock') {
    saveSettings('analytics_settings', settings);
    return Promise.resolve(settings);
  } else {
    const response = await fetch(`${API_BASE_URL}/settings/analytics`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!response.ok) throw new Error('Failed to save analytics settings');
    return response.json();
  }
}
