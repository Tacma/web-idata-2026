import { getMomentumLabDetails } from '../../shared/data/momentumContent';
import { getCollection, saveCollection } from './localStorage.service';

export interface InsightLabAdminRecord {
  id: string;
  slug_es: string;
  slug_en: string;
  label_es: string;
  label_en: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  meta_es: string;
  meta_en: string;
  overview_es: string;
  overview_en: string;
  problem_es: string;
  problem_en: string;
  audience_es: string[];
  audience_en: string[];
  includes_es: string[];
  includes_en: string[];
  signals_es: string[];
  signals_en: string[];
  featured_image?: string | null;
  content_blocks?: any[] | null;
  seo_es?: { metaTitle?: string; metaDescription?: string } | null;
  seo_en?: { metaTitle?: string; metaDescription?: string } | null;
  status: 'draft' | 'published' | 'archived';
  order: number;
  created_at?: string;
  updated_at?: string;
}

function buildSeedRecords(): InsightLabAdminRecord[] {
  const es = getMomentumLabDetails('es');
  const en = getMomentumLabDetails('en');

  return es.map((item, index) => {
    const enItem = en.find((candidate) => candidate.id === item.id) || item;

    return {
      id: item.id,
      slug_es: item.slug,
      slug_en: enItem.slug,
      label_es: item.label,
      label_en: enItem.label,
      title_es: item.title,
      title_en: enItem.title,
      description_es: item.description,
      description_en: enItem.description,
      meta_es: item.meta,
      meta_en: enItem.meta,
      overview_es: item.overview,
      overview_en: enItem.overview,
      problem_es: item.problem,
      problem_en: enItem.problem,
      audience_es: item.audience,
      audience_en: enItem.audience,
      includes_es: item.includes,
      includes_en: enItem.includes,
      signals_es: item.signals,
      signals_en: enItem.signals,
      featured_image: item.featuredImage || null,
      content_blocks: item.contentBlocks || null,
      seo_es: {
        metaTitle: item.title,
        metaDescription: item.description,
      },
      seo_en: {
        metaTitle: enItem.title,
        metaDescription: enItem.description,
      },
      status: 'published',
      order: index,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
}

function getRecords() {
  const existing = getCollection<InsightLabAdminRecord>('insight_labs');
  if (existing && existing.length > 0 && existing.every((item) => item.slug_es && item.slug_en)) {
    return existing;
  }

  const seeded = buildSeedRecords();
  saveCollection('insight_labs', seeded);
  return seeded;
}

export async function getAllInsightLabs() {
  return [...getRecords()].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getInsightLabById(id: string) {
  return getRecords().find((item) => item.id === id) || null;
}

export async function createInsightLab(payload: InsightLabAdminRecord) {
  const records = getRecords();
  const next = [...records, payload];
  saveCollection('insight_labs', next);
  return payload;
}

export async function updateInsightLab(id: string, updates: Partial<InsightLabAdminRecord>) {
  const records = getRecords();
  const next = records.map((item) => (item.id === id ? { ...item, ...updates } : item));
  const updated = next.find((item) => item.id === id) || null;
  saveCollection('insight_labs', next);
  return updated;
}

export async function deleteInsightLab(id: string) {
  const next = getRecords().filter((item) => item.id !== id);
  saveCollection('insight_labs', next);
}
