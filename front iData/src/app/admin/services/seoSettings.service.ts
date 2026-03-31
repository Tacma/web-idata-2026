import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeSettings, saveSettings } from './localStorage.service';

/**
 * SEO Settings Service
 * Manages global SEO configuration with localStorage persistence
 */

export interface SEOSettings {
  siteTitleTemplate_es: string;
  siteTitleTemplate_en: string;
  defaultDescription_es: string;
  defaultDescription_en: string;
  defaultOgImage: string;
  canonicalDomain: string;
  favicon: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  enableHreflang: boolean;
}

// Default SEO settings
const defaultSettings: SEOSettings = {
  siteTitleTemplate_es: '%page_title% | iData Global',
  siteTitleTemplate_en: '%page_title% | iData Global',
  defaultDescription_es: 'Transformamos datos en valor empresarial. Soluciones de Data Analytics, AI & ML para empresas en LATAM y el mundo.',
  defaultDescription_en: 'We transform data into business value. Data Analytics, AI & ML solutions for companies in LATAM and worldwide.',
  defaultOgImage: 'https://idata.global/og-default.png',
  canonicalDomain: 'https://idata.global',
  favicon: '/favicon.ico',
  robotsIndex: true,
  robotsFollow: true,
  enableHreflang: true
};

/**
 * Get SEO settings
 */
export async function getSEOSettings(): Promise<SEOSettings> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve(initializeSettings('seo_settings', defaultSettings));
  } else {
    const response = await fetch(`${API_BASE_URL}/settings/seo`);
    if (!response.ok) throw new Error('Failed to fetch SEO settings');
    return response.json();
  }
}

/**
 * Save SEO settings
 */
export async function saveSEOSettings(settings: SEOSettings): Promise<SEOSettings> {
  if (DATA_PROVIDER === 'mock') {
    saveSettings('seo_settings', settings);
    return Promise.resolve(settings);
  } else {
    const response = await fetch(`${API_BASE_URL}/settings/seo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!response.ok) throw new Error('Failed to save SEO settings');
    return response.json();
  }
}
