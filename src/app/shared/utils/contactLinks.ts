import type { Language } from '../types';

interface ContactLinkOptions {
  language: Language;
  sourceType?: string;
  sourceSlug?: string;
  sourceTitle?: string;
  sourceCtaLabel?: string;
  intent?: string;
  campaignId?: string;
  referrerPath?: string;
  sourceUrl?: string;
  projectType?: string;
  industry?: string;
  budgetRange?: string;
  timeline?: string;
}

export function buildContactLink({
  language,
  sourceType,
  sourceSlug,
  sourceTitle,
  sourceCtaLabel,
  intent,
  campaignId,
  referrerPath,
  sourceUrl,
  projectType,
  industry,
  budgetRange,
  timeline,
}: ContactLinkOptions) {
  const basePath = `/${language}/${language === 'es' ? 'contacto' : 'contact'}`;
  const params = new URLSearchParams();

  if (sourceType) params.set('source_type', sourceType);
  if (sourceSlug) params.set('source_slug', sourceSlug);
  if (sourceTitle) params.set('source_title', sourceTitle);
  if (sourceCtaLabel) params.set('source_cta_label', sourceCtaLabel);
  if (intent) params.set('intent', intent);
  if (campaignId) params.set('campaign_id', campaignId);
  if (referrerPath) params.set('referrer_path', referrerPath);
  if (sourceUrl) params.set('source_url', sourceUrl);
  if (projectType) params.set('project_type', projectType);
  if (industry) params.set('industry', industry);
  if (budgetRange) params.set('budget_range', budgetRange);
  if (timeline) params.set('timeline', timeline);

  params.set('source_language', language);

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}
