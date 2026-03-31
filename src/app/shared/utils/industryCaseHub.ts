import {
  getPlaceholderCaseSeeds,
  getTechnologyTagDefinition,
} from '../data/industryCaseDiscovery';
import type { Language } from '../types';
import { buildPublicCaseStudyView } from './caseStudyPublic';

export interface HubTag {
  id: string;
  label: string;
}

export interface HubPartner {
  id: string;
  label: string;
}

export interface HubCaseStudy {
  id: string;
  client: string;
  title: string;
  region: string;
  solutionType: string;
  slug: string;
  industryId: string;
  industryName: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  technologyTags: HubTag[];
  caseType: 'real' | 'placeholder';
  featured: boolean;
  clientLogoUrl?: string | null;
  coverImage?: string | null;
  partnerIds: string[];
  partnerLabels: string[];
  order: number;
}

export interface HubIndustry {
  id: string;
  name: string;
  slug: string;
  excerpt: string;
  discoveryDescription: string;
  challenges: string[];
  value: string[];
  solutionTags: HubTag[];
  cases: HubCaseStudy[];
  realCaseCount: number;
}

const partnerTechnologyMap: Record<string, string[]> = {
  microsoft: ['cloud', 'business-intelligence', 'data-delivery', 'data-engineering'],
  databricks: ['data-engineering', 'data-delivery', 'data-science-ai', 'machine-learning'],
  snowflake: ['cloud', 'data-engineering', 'business-intelligence'],
  aws: ['cloud', 'automation', 'machine-learning', 'data-engineering'],
  'google-cloud': ['cloud', 'machine-learning', 'computer-vision', 'data-science-ai'],
  'google cloud': ['cloud', 'machine-learning', 'computer-vision', 'data-science-ai'],
  'td-synnex': [],
  'td synnex': [],
};

function getLocalizedTagLabel(tagId: string, language: Language) {
  const definition = getTechnologyTagDefinition(tagId);
  if (!definition) return tagId;
  return language === 'es' ? definition.label_es : definition.label_en;
}

function normalizeResultLines(value: string | undefined) {
  return String(value || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildHubTag(tagId: string, language: Language): HubTag {
  return {
    id: tagId,
    label: getLocalizedTagLabel(tagId, language),
  };
}

function normalizePartnerName(value: string) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferPartnerIds(technologyTags: string[]) {
  return Object.entries(partnerTechnologyMap)
    .filter(([, mappedTags]) => mappedTags.length > 0 && mappedTags.some((tag) => technologyTags.includes(tag)))
    .map(([partnerId]) => partnerId);
}

function getLocalizedCaseTitle(caseStudy: any, language: Language) {
  if (caseStudy.case_type === 'placeholder') {
    return language === 'es' ? caseStudy.title_es || caseStudy.client : caseStudy.title_en || caseStudy.client;
  }
  return caseStudy.client || (language === 'es' ? caseStudy.title_es : caseStudy.title_en);
}

function getLocalizedValue(item: any, language: Language, esKey: string, enKey: string) {
  return language === 'es' ? item?.[esKey] || item?.[enKey] || '' : item?.[enKey] || item?.[esKey] || '';
}

export function buildIndustryCaseHubData(
  industries: any[],
  caseStudies: any[],
  language: Language,
  partners: any[] = []
): { industries: HubIndustry[]; tags: HubTag[]; partners: HubPartner[] } {
  const partnerLabelMap = new Map(
    partners.map((partner: any) => [normalizePartnerName(partner?.name), String(partner?.name || '')])
  );

  const placeholderCases = getPlaceholderCaseSeeds();
  const caseSource = [...caseStudies];
  const caseMap = new Map(caseSource.map((item) => [item.id, item]));

  placeholderCases.forEach((placeholder) => {
    const hasRealCaseForIndustry = caseSource.some((caseStudy) => {
      const primaryIndustry = caseStudy.industry_id || caseStudy.industryId;
      return primaryIndustry === placeholder.industry_id && caseStudy.case_type !== 'placeholder';
    });

    const hasSamePlaceholder = caseSource.some((caseStudy) => {
      const caseSlug = language === 'es' ? caseStudy.slug_es : caseStudy.slug_en;
      return caseStudy.case_type === 'placeholder'
        && (caseStudy.industry_id || caseStudy.industryId) === placeholder.industry_id
        && caseSlug === (language === 'es' ? placeholder.slug_es : placeholder.slug_en);
    });

    if (!hasRealCaseForIndustry && !hasSamePlaceholder && !caseMap.has(placeholder.id)) {
      caseSource.push(placeholder);
      caseMap.set(placeholder.id, placeholder);
    }
  });

  const industriesWithCases = industries.map((industry) => {
    const industryId = industry.id;
    const industryName = getLocalizedValue(industry, language, 'title_es', 'title_en');

    const mappedCases = caseSource
      .filter((caseStudy) => {
        const primaryIndustry = caseStudy.industry_id || caseStudy.industryId;
        const relatedIndustries = Array.isArray(caseStudy.related_industries) ? caseStudy.related_industries : [];
        return primaryIndustry === industryId || relatedIndustries.includes(industryId);
      })
      .map((caseStudy) => {
        const partnerIds = inferPartnerIds(Array.isArray(caseStudy.technology_tags) ? caseStudy.technology_tags : []);
        const publicView = buildPublicCaseStudyView(caseStudy, language, {
          industryName,
        });

        return {
        partnerIds,
        id: caseStudy.id,
        client: publicView.clientName,
        title: publicView.title || getLocalizedCaseTitle(caseStudy, language),
        region: publicView.region,
        solutionType: publicView.solutionType,
        slug: getLocalizedValue(caseStudy, language, 'slug_es', 'slug_en'),
        industryId,
        industryName,
        summary: publicView.summary || getLocalizedValue(caseStudy, language, 'discovery_summary_es', 'discovery_summary_en')
          || getLocalizedValue(caseStudy, language, 'excerpt_es', 'excerpt_en'),
        challenge: getLocalizedValue(caseStudy, language, 'challenge_es', 'challenge_en'),
        solution: getLocalizedValue(caseStudy, language, 'solution_es', 'solution_en'),
        results: (publicView.quantitativeImpacts.length || publicView.qualitativeImpacts.length)
          ? [...publicView.quantitativeImpacts.slice(0, 2), ...publicView.qualitativeImpacts.slice(0, 1)].filter(Boolean)
          : normalizeResultLines(getLocalizedValue(caseStudy, language, 'results_es', 'results_en')),
        technologyTags: (Array.isArray(caseStudy.technology_tags) ? caseStudy.technology_tags : [])
          .map((tagId: string) => buildHubTag(tagId, language)),
        caseType: caseStudy.case_type === 'placeholder' ? 'placeholder' : 'real',
        featured: !!caseStudy.featured,
        clientLogoUrl: publicView.clientLogoUrl,
        coverImage: publicView.coverImage,
        partnerLabels: partnerIds.map(
          (partnerId) => partnerLabelMap.get(normalizePartnerName(partnerId)) || partnerId.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
        ),
        order: caseStudy.order || 0,
      };
      })
      .sort((a, b) => {
        if (a.caseType !== b.caseType) return a.caseType === 'real' ? -1 : 1;
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.order - b.order;
      });

    return {
      id: industry.id,
      name: industryName,
      slug: getLocalizedValue(industry, language, 'slug_es', 'slug_en'),
      excerpt: getLocalizedValue(industry, language, 'excerpt_es', 'excerpt_en'),
      discoveryDescription: getLocalizedValue(industry, language, 'discovery_description_es', 'discovery_description_en')
        || getLocalizedValue(industry, language, 'content_es', 'content_en'),
      challenges: Array.isArray(language === 'es' ? industry.challenges_es : industry.challenges_en)
        ? (language === 'es' ? industry.challenges_es : industry.challenges_en)
        : [],
      value: Array.isArray(language === 'es' ? industry.value_es : industry.value_en)
        ? (language === 'es' ? industry.value_es : industry.value_en)
        : [],
      solutionTags: (Array.isArray(industry.solution_tags) ? industry.solution_tags : [])
        .map((tagId: string) => buildHubTag(tagId, language)),
      cases: mappedCases,
      realCaseCount: mappedCases.filter((item) => item.caseType === 'real').length,
    };
  });

  const tagMap = new Map<string, HubTag>();
  industriesWithCases.forEach((industry) => {
    industry.solutionTags.forEach((tag) => tagMap.set(tag.id, tag));
    industry.cases.forEach((caseStudy) => {
      caseStudy.technologyTags.forEach((tag) => tagMap.set(tag.id, tag));
    });
  });

  const partnerMap = new Map<string, HubPartner>();
  industriesWithCases.forEach((industry) => {
    industry.cases.forEach((caseStudy) => {
      caseStudy.partnerIds.forEach((partnerId, index) => {
        if (!partnerMap.has(partnerId)) {
          partnerMap.set(partnerId, {
            id: partnerId,
            label: caseStudy.partnerLabels[index]
              || partnerLabelMap.get(normalizePartnerName(partnerId))
              || partnerId.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
          });
        }
      });
    });
  });

  return {
    industries: industriesWithCases.filter((industry) => industry.cases.length > 0),
    tags: Array.from(tagMap.values()).sort((a, b) => a.label.localeCompare(b.label)),
    partners: Array.from(partnerMap.values()).sort((a, b) => a.label.localeCompare(b.label)),
  };
}

export function filterIndustryCaseHubData(
  industries: HubIndustry[],
  selectedIndustryIds: string[],
  selectedTagIds: string[],
  selectedPartnerIds: string[],
  caseType: 'all' | 'real' | 'placeholder'
) {
  return industries
    .filter((industry) => selectedIndustryIds.length === 0 || selectedIndustryIds.includes(industry.id))
    .map((industry) => {
      const filteredCases = industry.cases.filter((caseStudy) => {
        if (caseType !== 'all' && caseStudy.caseType !== caseType) return false;
        const tagMatch = selectedTagIds.length === 0
          ? true
          : caseStudy.technologyTags.some((tag) => selectedTagIds.includes(tag.id))
            || industry.solutionTags.some((tag) => selectedTagIds.includes(tag.id));
        const partnerMatch = selectedPartnerIds.length === 0
          ? true
          : caseStudy.partnerIds.some((partnerId) => selectedPartnerIds.includes(partnerId));
        return tagMatch && partnerMatch;
      });

      return {
        ...industry,
        cases: filteredCases,
        realCaseCount: filteredCases.filter((item) => item.caseType === 'real').length,
      };
    })
    .filter((industry) => industry.cases.length > 0);
}
