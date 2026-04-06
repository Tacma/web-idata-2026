import type { Language } from '../app/shared/types';
import {
  DEFAULT_MOMENTUM_SPONSOR_LOGOS,
  getMomentumEventBySlug,
  getMomentumEvents,
  getMomentumLabBySlug,
  getMomentumLabs,
  getMomentumLabDetails,
  type MomentumCollectionItem,
  type MomentumEventDetail,
  type MomentumLabDetail,
} from '../app/shared/data/momentumContent';

const EVENTS_STORAGE_KEY = 'cms_insight_events';
const LABS_STORAGE_KEY = 'cms_insight_labs';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readCollection<T>(key: string): T[] | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return null;
  }
}

function normalizeEventRecord(row: any, language: Language, index: number): MomentumEventDetail | null {
  const status = row?.status || 'published';
  if (status !== 'published') return null;

  const slug = language === 'es' ? row?.slug_es : row?.slug_en;
  const title = language === 'es' ? row?.title_es : row?.title_en;

  if (!row?.id || !slug || !title) return null;

  return {
    id: row.id,
    slug,
    label: language === 'es' ? row?.label_es || '' : row?.label_en || '',
    title,
    description: language === 'es' ? row?.description_es || '' : row?.description_en || '',
    href: `/${language}/insights/events/${slug}`,
    meta: language === 'es' ? row?.meta_es || '' : row?.meta_en || '',
    isoDate: row?.iso_date || undefined,
    sponsorLogos: Array.isArray(row?.sponsor_logos) && row.sponsor_logos.length > 0
      ? row.sponsor_logos
      : [
          DEFAULT_MOMENTUM_SPONSOR_LOGOS[index % DEFAULT_MOMENTUM_SPONSOR_LOGOS.length],
          DEFAULT_MOMENTUM_SPONSOR_LOGOS[(index + 1) % DEFAULT_MOMENTUM_SPONSOR_LOGOS.length],
        ],
    format: language === 'es' ? row?.format_es || '' : row?.format_en || '',
    location: language === 'es' ? row?.location_es || '' : row?.location_en || '',
    audience: Array.isArray(language === 'es' ? row?.audience_es : row?.audience_en)
      ? (language === 'es' ? row.audience_es : row.audience_en)
      : [],
    takeaways: Array.isArray(language === 'es' ? row?.takeaways_es : row?.takeaways_en)
      ? (language === 'es' ? row.takeaways_es : row.takeaways_en)
      : [],
    agenda: Array.isArray(language === 'es' ? row?.agenda_es : row?.agenda_en)
      ? (language === 'es' ? row.agenda_es : row.agenda_en)
      : [],
    speakers: Array.isArray(language === 'es' ? row?.speakers_es : row?.speakers_en)
      ? (language === 'es' ? row.speakers_es : row.speakers_en)
      : [],
    seatsNote: language === 'es' ? row?.seats_note_es || '' : row?.seats_note_en || '',
    registrationTitle: language === 'es' ? row?.registration_title_es || '' : row?.registration_title_en || '',
    registrationDescription: language === 'es' ? row?.registration_description_es || '' : row?.registration_description_en || '',
  };
}

function normalizeLabRecord(row: any, language: Language): MomentumCollectionItem | null {
  const status = row?.status || 'published';
  if (status !== 'published') return null;

  const title = language === 'es' ? row?.title_es : row?.title_en;
  if (!row?.id || !title) return null;

  const slug = language === 'es' ? row?.slug_es : row?.slug_en;

  if (!slug) return null;

  return {
    id: row.id,
    slug,
    label: language === 'es' ? row?.label_es || '' : row?.label_en || '',
    title,
    description: language === 'es' ? row?.description_es || '' : row?.description_en || '',
    href: `/${language}/insights/builds/${slug}`,
    meta: language === 'es' ? row?.meta_es || '' : row?.meta_en || '',
  };
}

function normalizeLabDetailRecord(row: any, language: Language): MomentumLabDetail | null {
  const summary = normalizeLabRecord(row, language);
  if (!summary || !summary.slug) return null;

  return {
    ...summary,
    slug: summary.slug,
    overview: language === 'es' ? row?.overview_es || '' : row?.overview_en || '',
    problem: language === 'es' ? row?.problem_es || '' : row?.problem_en || '',
    audience: Array.isArray(language === 'es' ? row?.audience_es : row?.audience_en)
      ? (language === 'es' ? row.audience_es : row.audience_en)
      : [],
    includes: Array.isArray(language === 'es' ? row?.includes_es : row?.includes_en)
      ? (language === 'es' ? row.includes_es : row.includes_en)
      : [],
    signals: Array.isArray(language === 'es' ? row?.signals_es : row?.signals_en)
      ? (language === 'es' ? row.signals_es : row.signals_en)
      : [],
    featuredImage: row?.featured_image || null,
    contentBlocks: row?.content_blocks ?? null,
    seoTitle: language === 'es' ? row?.seo_es?.metaTitle || '' : row?.seo_en?.metaTitle || '',
    seoDescription: language === 'es' ? row?.seo_es?.metaDescription || '' : row?.seo_en?.metaDescription || '',
  };
}

export async function getInsightEvents(language: Language): Promise<MomentumEventDetail[]> {
  const stored = readCollection<any>(EVENTS_STORAGE_KEY);

  if (stored && stored.length > 0) {
    return stored
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((item, index) => normalizeEventRecord(item, language, index))
      .filter(Boolean) as MomentumEventDetail[];
  }

  return getMomentumEvents(language).map((event, index) => ({
    ...event,
    sponsorLogos: [
      DEFAULT_MOMENTUM_SPONSOR_LOGOS[index % DEFAULT_MOMENTUM_SPONSOR_LOGOS.length],
      DEFAULT_MOMENTUM_SPONSOR_LOGOS[(index + 1) % DEFAULT_MOMENTUM_SPONSOR_LOGOS.length],
    ],
  }));
}

export async function getInsightEventBySlug(language: Language, slug: string): Promise<MomentumEventDetail | null> {
  const events = await getInsightEvents(language);
  return events.find((item) => item.slug === slug) || getMomentumEventBySlug(language, slug);
}

export async function getInsightLabs(language: Language): Promise<MomentumCollectionItem[]> {
  const stored = readCollection<any>(LABS_STORAGE_KEY);

  if (stored && stored.length > 0) {
    const normalized = stored
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((item) => normalizeLabRecord(item, language))
      .filter(Boolean) as MomentumCollectionItem[];

    if (normalized.length > 0) {
      return normalized;
    }
  }

  return getMomentumLabs(language, `/${language}/insights`);
}

export async function getInsightLabBySlug(language: Language, slug: string): Promise<MomentumLabDetail | null> {
  const stored = readCollection<any>(LABS_STORAGE_KEY);

  if (stored && stored.length > 0) {
    const detail = stored
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((item) => normalizeLabDetailRecord(item, language))
      .filter(Boolean)
      .find((item) => item?.slug === slug) || null;

    if (detail) return detail;
  }

  return getMomentumLabBySlug(language, slug) || getMomentumLabDetails(language).find((item) => item.slug === slug) || null;
}
