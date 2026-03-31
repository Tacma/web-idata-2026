import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeSettings, saveSettings } from './localStorage.service';

interface MarketsSettings {
  markets: Array<{
    id: string;
    name: string;
    code: string;
    domain: string;
    language: string;
    currency: string;
    enabled: boolean;
  }>;
}

const defaultSettings: MarketsSettings = {
  markets: [
    { id: '1', name: 'Colombia', code: 'CO', domain: 'idata.global', language: 'es', currency: 'COP', enabled: true },
    { id: '2', name: 'United States', code: 'US', domain: 'idata.global', language: 'en', currency: 'USD', enabled: true },
    { id: '3', name: 'Europe', code: 'EU', domain: 'idata.global', language: 'en', currency: 'EUR', enabled: true }
  ]
};

export async function getMarketsSettings(): Promise<MarketsSettings> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve(initializeSettings('markets', defaultSettings));
  }
  const response = await fetch(`${API_BASE_URL}/settings/markets`);
  if (!response.ok) throw new Error('Failed to fetch markets settings');
  return response.json();
}

export async function saveMarketsSettings(settings: MarketsSettings): Promise<MarketsSettings> {
  if (DATA_PROVIDER === 'mock') {
    saveSettings('markets', settings);
    return Promise.resolve(settings);
  }
  const response = await fetch(`${API_BASE_URL}/settings/markets`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  if (!response.ok) throw new Error('Failed to save markets settings');
  return response.json();
}
