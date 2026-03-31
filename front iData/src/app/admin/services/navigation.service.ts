import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeSettings, saveSettings } from './localStorage.service';

interface NavigationSettings {
  mainMenu_es: Array<{ label: string; url: string; children?: Array<{ label: string; url: string }> }>;
  mainMenu_en: Array<{ label: string; url: string; children?: Array<{ label: string; url: string }> }>;
  footerMenu_es: Array<{ label: string; url: string }>;
  footerMenu_en: Array<{ label: string; url: string }>;
}

const defaultSettings: NavigationSettings = {
  mainMenu_es: [
    { label: 'Servicios', url: '/es/servicios' },
    { label: 'Industrias', url: '/es/industrias' },
    { label: 'Insights', url: '/es/insights' },
    { label: 'Nosotros', url: '/es/nosotros' },
    { label: 'Contacto', url: '/es/contacto' }
  ],
  mainMenu_en: [
    { label: 'Services', url: '/en/services' },
    { label: 'Industries', url: '/en/industries' },
    { label: 'Insights', url: '/en/insights' },
    { label: 'About', url: '/en/about' },
    { label: 'Contact', url: '/en/contact' }
  ],
  footerMenu_es: [],
  footerMenu_en: []
};

export async function getNavigationSettings(): Promise<NavigationSettings> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve(initializeSettings('navigation', defaultSettings));
  }
  const response = await fetch(`${API_BASE_URL}/settings/navigation`);
  if (!response.ok) throw new Error('Failed to fetch navigation settings');
  return response.json();
}

export async function saveNavigationSettings(settings: NavigationSettings): Promise<NavigationSettings> {
  if (DATA_PROVIDER === 'mock') {
    saveSettings('navigation', settings);
    return Promise.resolve(settings);
  }
  const response = await fetch(`${API_BASE_URL}/settings/navigation`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  if (!response.ok) throw new Error('Failed to save navigation settings');
  return response.json();
}
