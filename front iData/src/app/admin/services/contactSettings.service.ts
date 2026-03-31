import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeSettings, saveSettings } from './localStorage.service';

interface ContactSettings {
  email: string;
  phone: string;
  address_es: string;
  address_en: string;
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  businessHours_es: string;
  businessHours_en: string;
  autoReplyEnabled: boolean;
  autoReplyMessage_es: string;
  autoReplyMessage_en: string;
}

const defaultSettings: ContactSettings = {
  email: 'contacto@idata.global',
  phone: '+52 123 456 7890',
  address_es: 'Ciudad de México, México',
  address_en: 'Mexico City, Mexico',
  socialMedia: {
    instagram: 'https://instagram.com/idata',
    linkedin: 'https://linkedin.com/company/idata',
    youtube: 'https://youtube.com/@idata'
  },
  businessHours_es: 'Lun-Vie 9:00-18:00',
  businessHours_en: 'Mon-Fri 9:00-18:00',
  autoReplyEnabled: true,
  autoReplyMessage_es: 'Gracias por contactarnos. Te responderemos pronto.',
  autoReplyMessage_en: 'Thank you for contacting us. We will reply soon.'
};

export async function getContactSettings(): Promise<ContactSettings> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve(initializeSettings('contact_settings', defaultSettings));
  }
  const response = await fetch(`${API_BASE_URL}/settings/contact`);
  if (!response.ok) throw new Error('Failed to fetch contact settings');
  return response.json();
}

export async function saveContactSettings(settings: ContactSettings): Promise<ContactSettings> {
  if (DATA_PROVIDER === 'mock') {
    saveSettings('contact_settings', settings);
    return Promise.resolve(settings);
  }
  const response = await fetch(`${API_BASE_URL}/settings/contact`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  if (!response.ok) throw new Error('Failed to save contact settings');
  return response.json();
}
