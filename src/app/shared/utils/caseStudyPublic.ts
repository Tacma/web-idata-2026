import type { Language } from '../types';
import { getTechnologyTagDefinition } from '../data/industryCaseDiscovery';

function getLocalizedField(item: any, language: Language, baseKey: string) {
  const esKey = `${baseKey}_es`;
  const enKey = `${baseKey}_en`;
  const esValue = String(item?.[esKey] || '').trim();
  const enValue = String(item?.[enKey] || '').trim();
  return language === 'es' ? esValue || enValue : enValue || esValue;
}

function getLocalizedArray(item: any, language: Language, baseKey: string) {
  const esKey = `${baseKey}_es`;
  const enKey = `${baseKey}_en`;
  const esValue = Array.isArray(item?.[esKey]) ? item[esKey] : [];
  const enValue = Array.isArray(item?.[enKey]) ? item[enKey] : [];
  const source = language === 'es' ? (esValue.length ? esValue : enValue) : (enValue.length ? enValue : esValue);
  return source.map((entry: any) => String(entry || '').trim()).filter(Boolean);
}

function splitPipedLines(value: string | undefined) {
  return String(value || '')
    .split('|')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function includesQuantifiedSignal(value: string) {
  return /(\d+(?:[.,]\d+)?)\s*(%|x|k|m|h|hrs|hours|min|mins|meses|meses|dias|days)|roi|\$\s*\d/i.test(value);
}

function humanizeIndustry(industryName: string | undefined, language: Language) {
  if (!industryName) {
    return language === 'es' ? 'empresa' : 'company';
  }

  return language === 'es'
    ? `empresa del sector ${industryName.toLowerCase()}`
    : `${industryName.toLowerCase()} company`;
}

function buildAnonymousClientName(industryName: string | undefined, region: string | undefined, language: Language) {
  const base = humanizeIndustry(industryName, language);
  if (region) {
    return language === 'es' ? `${base} en ${region}` : `${base} in ${region}`;
  }
  return base;
}

function buildFallbackTitle(industryName: string | undefined, solutionType: string | undefined, language: Language) {
  if (industryName && solutionType) {
    return language === 'es'
      ? `${solutionType} para ${industryName}`
      : `${solutionType} for ${industryName}`;
  }

  if (solutionType) return solutionType;
  if (industryName) {
    return language === 'es'
      ? `Transformación de datos para ${industryName}`
      : `Data transformation for ${industryName}`;
  }

  return language === 'es' ? 'Caso de éxito iData' : 'iData success story';
}

function mapTechnologyLabels(tags: string[], language: Language) {
  return tags
    .map((tag) => getTechnologyTagDefinition(tag)?.[language === 'es' ? 'label_es' : 'label_en'] || tag)
    .filter(Boolean);
}

export interface PublicCaseStudyView {
  title: string;
  subtitle: string;
  clientName: string;
  showClientIdentity: boolean;
  showTestimonial: boolean;
  testimonial: string;
  industry: string;
  region: string;
  solutionType: string;
  summary: string;
  challenge: string;
  objective: string;
  businessPains: string[];
  solutionDescription: string;
  capabilities: string[];
  technologies: string[];
  quantitativeImpacts: string[];
  qualitativeImpacts: string[];
  metricsText: string;
  additionalOpportunities: string;
  coverImage: string | null;
  galleryImages: string[];
  clientLogoUrl: string | null;
}

export function buildPublicCaseStudyView(
  caseStudy: any,
  language: Language,
  options?: {
    industryName?: string;
    serviceTitles?: string[];
  }
): PublicCaseStudyView {
  const industryName = options?.industryName || '';
  const region = getLocalizedField(caseStudy, language, 'region');
  const solutionType = getLocalizedField(caseStudy, language, 'solution_type') || options?.serviceTitles?.[0] || '';
  const showClientIdentity = !!caseStudy?.show_client_identity;
  const explicitPublicClientName = getLocalizedField(caseStudy, language, 'public_client_name');
  const clientName = showClientIdentity
    ? explicitPublicClientName || String(caseStudy?.client || '').trim()
    : explicitPublicClientName || buildAnonymousClientName(industryName, region, language);

  const explicitPublicTitle = getLocalizedField(caseStudy, language, 'public_title');
  const fallbackTitle = getLocalizedField(caseStudy, language, 'title') || buildFallbackTitle(industryName, solutionType, language);
  const title = showClientIdentity ? explicitPublicTitle || fallbackTitle : explicitPublicTitle || buildFallbackTitle(industryName, solutionType, language);
  const summary = getLocalizedField(caseStudy, language, 'excerpt');
  const subtitle = summary || getLocalizedField(caseStudy, language, 'discovery_summary');
  const challenge = getLocalizedField(caseStudy, language, 'challenge');
  const objective = getLocalizedField(caseStudy, language, 'objective') || summary;
  const solutionDescription = getLocalizedField(caseStudy, language, 'solution_description') || getLocalizedField(caseStudy, language, 'solution');
  const additionalOpportunities = getLocalizedField(caseStudy, language, 'additional_opportunities');
  const testimonial = getLocalizedField(caseStudy, language, 'testimonial');
  const showTestimonial = !!caseStudy?.show_testimonial && !!testimonial;

  const businessPains = getLocalizedArray(caseStudy, language, 'business_pains');
  const capabilities = getLocalizedArray(caseStudy, language, 'capabilities_public');
  const quantitativeImpacts = getLocalizedArray(caseStudy, language, 'quantitative_impacts');
  const qualitativeImpacts = getLocalizedArray(caseStudy, language, 'qualitative_impacts');
  const metricsText = getLocalizedField(caseStudy, language, 'metrics_text');
  const rawTechnologyTags = Array.isArray(caseStudy?.technology_tags) ? caseStudy.technology_tags : [];
  const technologies = mapTechnologyLabels(rawTechnologyTags, language);
  const results = splitPipedLines(getLocalizedField(caseStudy, language, 'results'));

  const derivedQuantitative = results.filter(includesQuantifiedSignal);
  const derivedQualitative = results.filter((item) => !includesQuantifiedSignal(item));

  return {
    title,
    subtitle,
    clientName,
    showClientIdentity,
    showTestimonial,
    testimonial,
    industry: industryName,
    region,
    solutionType,
    summary,
    challenge,
    objective,
    businessPains,
    solutionDescription,
    capabilities: capabilities.length ? capabilities : technologies.slice(0, 4),
    technologies,
    quantitativeImpacts: quantitativeImpacts.length ? quantitativeImpacts : derivedQuantitative,
    qualitativeImpacts: qualitativeImpacts.length ? qualitativeImpacts : derivedQualitative,
    metricsText,
    additionalOpportunities,
    coverImage: caseStudy?.coverImage || caseStudy?.cover_image || null,
    galleryImages: Array.isArray(caseStudy?.gallery_images) ? caseStudy.gallery_images.filter(Boolean) : [],
    clientLogoUrl: showClientIdentity ? (caseStudy?.clientLogoUrl || caseStudy?.client_logo_url || null) : null,
  };
}
