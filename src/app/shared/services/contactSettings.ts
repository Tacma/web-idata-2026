import { API_BASE_URL, DATA_PROVIDER } from '../../admin/config/dataProvider';
import { initializeSettings, saveSettings } from '../../admin/services/localStorage.service';
import type { Language } from '../types';

export interface WhatsAppRegionSettings {
  id: string;
  slug: string;
  name_es: string;
  name_en: string;
  phoneNumber: string;
  prefilledMessage_es: string;
  prefilledMessage_en: string;
  isActive: boolean;
  order: number;
  availabilityLabel_es?: string;
  availabilityLabel_en?: string;
  helperText_es?: string;
  helperText_en?: string;
}

export interface WhatsAppSettings {
  enabled: boolean;
  floatingButtonEnabled: boolean;
  directOpenWhenSingleRegion: boolean;
  iconUrl: string;
  floatingLabel_es: string;
  floatingLabel_en: string;
  selectorTitle_es: string;
  selectorTitle_en: string;
  selectorSubtitle_es: string;
  selectorSubtitle_en: string;
  regionCtaLabel_es: string;
  regionCtaLabel_en: string;
  contactCardTitle_es: string;
  contactCardTitle_en: string;
  contactCardSubtitle_es: string;
  contactCardSubtitle_en: string;
  regions: WhatsAppRegionSettings[];
}

export interface ContactSettings {
  email: string;
  phone: string;
  administrativePhone: string;
  address_es: string;
  address_en: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  businessHours_es: string;
  businessHours_en: string;
  autoReplyEnabled: boolean;
  autoReplyMessage_es: string;
  autoReplyMessage_en: string;
  whatsapp: WhatsAppSettings;
}

export const DEFAULT_WHATSAPP_REGION_PRESETS: WhatsAppRegionSettings[] = [
  {
    id: 'central-america',
    slug: 'central-america',
    name_es: 'Centroamérica',
    name_en: 'Central America',
    phoneNumber: '+57 320 000 1101',
    prefilledMessage_es: 'Hola, quiero comunicarme con el equipo comercial de iData para Centroamérica.',
    prefilledMessage_en: "Hello, I'd like to contact the iData commercial team for Central America.",
    isActive: true,
    order: 1,
    availabilityLabel_es: 'Atención comercial',
    availabilityLabel_en: 'Commercial support',
    helperText_es: 'Ideal si tu operación está en Centroamérica.',
    helperText_en: 'Best if your operation is in Central America.',
  },
  {
    id: 'chile',
    slug: 'chile',
    name_es: 'Chile',
    name_en: 'Chile',
    phoneNumber: '+56 9 0000 1102',
    prefilledMessage_es: 'Hola, quiero comunicarme con el equipo comercial de iData para Chile.',
    prefilledMessage_en: "Hello, I'd like to contact the iData commercial team for Chile.",
    isActive: true,
    order: 2,
    availabilityLabel_es: 'Atención comercial',
    availabilityLabel_en: 'Commercial support',
    helperText_es: 'Ideal si tu operación está en Chile.',
    helperText_en: 'Best if your operation is in Chile.',
  },
  {
    id: 'colombia',
    slug: 'colombia',
    name_es: 'Colombia',
    name_en: 'Colombia',
    phoneNumber: '+57 320 000 1103',
    prefilledMessage_es: 'Hola, quiero comunicarme con el equipo comercial de iData para Colombia.',
    prefilledMessage_en: "Hello, I'd like to contact the iData commercial team for Colombia.",
    isActive: true,
    order: 3,
    availabilityLabel_es: 'Atención comercial',
    availabilityLabel_en: 'Commercial support',
    helperText_es: 'Ideal si tu operación está en Colombia.',
    helperText_en: 'Best if your operation is in Colombia.',
  },
  {
    id: 'usa',
    slug: 'usa',
    name_es: 'Estados Unidos',
    name_en: 'United States',
    phoneNumber: '+1 303 901 9526',
    prefilledMessage_es: 'Hola, quiero comunicarme con el equipo comercial de iData para Estados Unidos.',
    prefilledMessage_en: "Hello, I'd like to contact the iData commercial team for the United States.",
    isActive: true,
    order: 4,
    availabilityLabel_es: 'Business team',
    availabilityLabel_en: 'Business team',
    helperText_es: 'Para consultas desde Estados Unidos.',
    helperText_en: 'For inquiries from the United States.',
  },
];

function createDefaultWhatsAppRegions() {
  return DEFAULT_WHATSAPP_REGION_PRESETS.map((region) => ({ ...region }));
}

const defaultWhatsAppRegions = createDefaultWhatsAppRegions();

const defaultWhatsAppSettings: WhatsAppSettings = {
  enabled: true,
  floatingButtonEnabled: true,
  directOpenWhenSingleRegion: false,
  iconUrl: '/assets/logos/contact/whatsapp-optimized.png',
  floatingLabel_es: 'WhatsApp',
  floatingLabel_en: 'WhatsApp',
  selectorTitle_es: '¿Con qué región quieres comunicarte?',
  selectorTitle_en: 'Which region would you like to contact?',
  selectorSubtitle_es: 'Selecciona el equipo de iData que mejor corresponde a tu ubicación.',
  selectorSubtitle_en: 'Select the iData team that best matches your location.',
  regionCtaLabel_es: 'Abrir chat',
  regionCtaLabel_en: 'Open chat',
  contactCardTitle_es: 'Escríbenos por WhatsApp',
  contactCardTitle_en: 'Message us on WhatsApp',
  contactCardSubtitle_es: 'Elige la región que mejor corresponda a tu ubicación para iniciar una conversación directa.',
  contactCardSubtitle_en: 'Choose the region that best matches your location to start a direct conversation.',
  regions: defaultWhatsAppRegions,
};

export const defaultContactSettings: ContactSettings = {
  email: 'contacto@idata.global',
  phone: '+57 300 571 3092',
  administrativePhone: '+57 300 479 9152',
  address_es: 'Bogotá, Colombia',
  address_en: 'Bogota, Colombia',
  socialMedia: {
    facebook: 'https://www.facebook.com/iData.Global.IA/',
    instagram: 'https://www.instagram.com/idata.global/',
    linkedin: 'https://www.linkedin.com/company/idata-global-latam/posts/?feedView=all',
    youtube: 'https://www.youtube.com/@idata.global',
  },
  businessHours_es: 'Lun-Vie 9:00-18:00',
  businessHours_en: 'Mon-Fri 9:00-18:00',
  autoReplyEnabled: true,
  autoReplyMessage_es: 'Gracias por contactarnos. Te responderemos pronto.',
  autoReplyMessage_en: 'Thank you for contacting us. We will reply soon.',
  whatsapp: defaultWhatsAppSettings,
};

function normalizeRegion(
  region: Partial<WhatsAppRegionSettings> | undefined,
  fallback?: WhatsAppRegionSettings
): WhatsAppRegionSettings {
  const base = fallback || defaultWhatsAppRegions[0];
  return {
    ...base,
    ...region,
    id: region?.id || base.id,
    slug: region?.slug || base.slug,
    name_es: region?.name_es || base.name_es,
    name_en: region?.name_en || base.name_en,
    phoneNumber: region?.phoneNumber || base.phoneNumber,
    prefilledMessage_es: region?.prefilledMessage_es || base.prefilledMessage_es,
    prefilledMessage_en: region?.prefilledMessage_en || base.prefilledMessage_en,
    isActive: region?.isActive ?? base.isActive,
    order: region?.order ?? base.order,
    availabilityLabel_es: region?.availabilityLabel_es ?? base.availabilityLabel_es ?? '',
    availabilityLabel_en: region?.availabilityLabel_en ?? base.availabilityLabel_en ?? '',
    helperText_es: region?.helperText_es ?? base.helperText_es ?? '',
    helperText_en: region?.helperText_en ?? base.helperText_en ?? '',
  };
}

export function normalizeContactSettings(raw?: Partial<ContactSettings> | null): ContactSettings {
  const storedRegions = raw?.whatsapp?.regions || [];
  const defaultRegionMap = new Map(DEFAULT_WHATSAPP_REGION_PRESETS.map((region) => [region.id, region]));
  const allowedRegionKeys = new Set(
    DEFAULT_WHATSAPP_REGION_PRESETS.flatMap((region) => [
      String(region.id || '').trim().toLowerCase(),
      String(region.slug || '').trim().toLowerCase(),
    ])
  );
  const legacyRegionIds = new Set(['latam', 'latin-america', 'latinamerica']);

  const normalizedStoredRegions = storedRegions.map((region) =>
    normalizeRegion(region, defaultRegionMap.get(region.id))
  ).filter((region) => {
    const regionId = String(region.id || '').trim().toLowerCase();
    const regionSlug = String(region.slug || '').trim().toLowerCase();
    return (
      !legacyRegionIds.has(regionId) &&
      !legacyRegionIds.has(regionSlug) &&
      (allowedRegionKeys.has(regionId) || allowedRegionKeys.has(regionSlug))
    );
  });

  const existingRegionKeys = new Set(
    normalizedStoredRegions.flatMap((region) => [String(region.id || '').trim(), String(region.slug || '').trim()])
  );

  const missingDefaultRegions = createDefaultWhatsAppRegions()
    .filter(
      (region) =>
        !existingRegionKeys.has(region.id) &&
        !existingRegionKeys.has(region.slug)
    )
    .map((region) => normalizeRegion(region, region));

  const normalizedRegions =
    normalizedStoredRegions.length > 0
      ? [...normalizedStoredRegions, ...missingDefaultRegions]
      : createDefaultWhatsAppRegions().map((region) => normalizeRegion(region, region));

  return {
    ...defaultContactSettings,
    ...raw,
    phone: raw?.phone || defaultContactSettings.phone,
    administrativePhone: raw?.administrativePhone || defaultContactSettings.administrativePhone,
    socialMedia: {
      ...defaultContactSettings.socialMedia,
      ...raw?.socialMedia,
    },
    whatsapp: {
      ...defaultWhatsAppSettings,
      ...raw?.whatsapp,
      iconUrl: raw?.whatsapp?.iconUrl || defaultWhatsAppSettings.iconUrl,
      regions: normalizedRegions.sort((a, b) => a.order - b.order),
    },
  };
}

export async function getContactSettings(): Promise<ContactSettings> {
  if (DATA_PROVIDER === 'mock') {
    return Promise.resolve(
      normalizeContactSettings(initializeSettings('contact_settings', defaultContactSettings))
    );
  }

  const response = await fetch(`${API_BASE_URL}/settings/contact`);
  if (!response.ok) throw new Error('Failed to fetch contact settings');
  const raw = await response.json();
  return normalizeContactSettings(raw);
}

export async function saveContactSettings(settings: ContactSettings): Promise<ContactSettings> {
  const normalized = normalizeContactSettings(settings);

  if (DATA_PROVIDER === 'mock') {
    saveSettings('contact_settings', normalized);
    return Promise.resolve(normalized);
  }

  const response = await fetch(`${API_BASE_URL}/settings/contact`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalized),
  });

  if (!response.ok) throw new Error('Failed to save contact settings');
  const raw = await response.json();
  return normalizeContactSettings(raw);
}

export function getLocalizedWhatsAppText(
  valueEs: string | undefined,
  valueEn: string | undefined,
  language: Language
) {
  return language === 'es' ? valueEs || valueEn || '' : valueEn || valueEs || '';
}
