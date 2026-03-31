import type { Language } from '../types';
import {
  getLocalizedWhatsAppText,
  type WhatsAppRegionSettings,
  type WhatsAppSettings,
} from '../services/contactSettings';

export function sanitizeWhatsAppNumber(phoneNumber: string) {
  return String(phoneNumber || '').replace(/[^\d]/g, '');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string) {
  const sanitizedNumber = sanitizeWhatsAppNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${sanitizedNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

export function getActiveWhatsAppRegions(settings: WhatsAppSettings) {
  return [...settings.regions]
    .filter((region) => region.isActive)
    .sort((a, b) => a.order - b.order);
}

export function getLocalizedRegionName(region: WhatsAppRegionSettings, language: Language) {
  return getLocalizedWhatsAppText(region.name_es, region.name_en, language);
}

export function getLocalizedRegionHelper(region: WhatsAppRegionSettings, language: Language) {
  return getLocalizedWhatsAppText(region.helperText_es, region.helperText_en, language);
}

export function getLocalizedRegionAvailability(region: WhatsAppRegionSettings, language: Language) {
  return getLocalizedWhatsAppText(region.availabilityLabel_es, region.availabilityLabel_en, language);
}

export function getLocalizedRegionMessage(region: WhatsAppRegionSettings, language: Language) {
  return getLocalizedWhatsAppText(
    region.prefilledMessage_es,
    region.prefilledMessage_en,
    language
  );
}

export function buildWhatsAppRegionUrl(region: WhatsAppRegionSettings, language: Language) {
  return buildWhatsAppUrl(region.phoneNumber, getLocalizedRegionMessage(region, language));
}
