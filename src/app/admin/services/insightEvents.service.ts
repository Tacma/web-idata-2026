import { getMomentumEvents, DEFAULT_MOMENTUM_SPONSOR_LOGOS } from '../../shared/data/momentumContent';
import { getCollection, initializeCollection, saveCollection } from './localStorage.service';

export interface InsightEventAdminRecord {
  id: string;
  slug_es: string;
  slug_en: string;
  title_es: string;
  title_en: string;
  label_es: string;
  label_en: string;
  description_es: string;
  description_en: string;
  meta_es: string;
  meta_en: string;
  format_es: string;
  format_en: string;
  location_es: string;
  location_en: string;
  audience_es: string[];
  audience_en: string[];
  takeaways_es: string[];
  takeaways_en: string[];
  agenda_es: { time: string; title: string; description: string }[];
  agenda_en: { time: string; title: string; description: string }[];
  speakers_es: { name: string; role: string }[];
  speakers_en: { name: string; role: string }[];
  seats_note_es: string;
  seats_note_en: string;
  registration_title_es: string;
  registration_title_en: string;
  registration_description_es: string;
  registration_description_en: string;
  sponsor_logos: string[];
  iso_date: string;
  status: 'draft' | 'published' | 'archived';
  order: number;
  created_at?: string;
  updated_at?: string;
}

function buildSeedRecords(): InsightEventAdminRecord[] {
  const es = getMomentumEvents('es');
  const en = getMomentumEvents('en');

  return es.map((item, index) => {
    const enItem = en.find((candidate) => candidate.id === item.id) || item;

    return {
      id: item.id,
      slug_es: item.slug,
      slug_en: enItem.slug,
      title_es: item.title,
      title_en: enItem.title,
      label_es: item.label,
      label_en: enItem.label,
      description_es: item.description,
      description_en: enItem.description,
      meta_es: item.meta,
      meta_en: enItem.meta,
      format_es: item.format,
      format_en: enItem.format,
      location_es: item.location,
      location_en: enItem.location,
      audience_es: item.audience,
      audience_en: enItem.audience,
      takeaways_es: item.takeaways,
      takeaways_en: enItem.takeaways,
      agenda_es: item.agenda,
      agenda_en: enItem.agenda,
      speakers_es: item.speakers,
      speakers_en: enItem.speakers,
      seats_note_es: item.seatsNote,
      seats_note_en: enItem.seatsNote,
      registration_title_es: item.registrationTitle,
      registration_title_en: enItem.registrationTitle,
      registration_description_es: item.registrationDescription,
      registration_description_en: enItem.registrationDescription,
      sponsor_logos: [
        DEFAULT_MOMENTUM_SPONSOR_LOGOS[index % DEFAULT_MOMENTUM_SPONSOR_LOGOS.length],
        DEFAULT_MOMENTUM_SPONSOR_LOGOS[(index + 1) % DEFAULT_MOMENTUM_SPONSOR_LOGOS.length],
      ],
      iso_date: item.isoDate || '',
      status: 'published',
      order: index,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
}

function getRecords() {
  const existing = getCollection<InsightEventAdminRecord>('insight_events');
  if (existing && existing.length > 0) {
    return existing;
  }

  return initializeCollection<InsightEventAdminRecord>('insight_events', buildSeedRecords());
}

export async function getAllInsightEvents() {
  return [...getRecords()].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getInsightEventById(id: string) {
  return getRecords().find((item) => item.id === id) || null;
}

export async function createInsightEvent(payload: InsightEventAdminRecord) {
  const records = getRecords();
  const next = [...records, payload];
  saveCollection('insight_events', next);
  return payload;
}

export async function updateInsightEvent(id: string, updates: Partial<InsightEventAdminRecord>) {
  const records = getRecords();
  const next = records.map((item) => (item.id === id ? { ...item, ...updates } : item));
  const updated = next.find((item) => item.id === id) || null;
  saveCollection('insight_events', next);
  return updated;
}

export async function deleteInsightEvent(id: string) {
  const next = getRecords().filter((item) => item.id !== id);
  saveCollection('insight_events', next);
}
