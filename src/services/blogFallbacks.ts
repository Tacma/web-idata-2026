import { mockInsights } from '../app/data/mockData';

const DEFAULT_INSIGHT_IMAGE = '/assets/images/hero/insights.png';

function firstText(...values: any[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return '';
}

function firstArray(...values: any[]) {
  for (const value of values) {
    if (Array.isArray(value) && value.length > 0) {
      return value;
    }
  }
  return [];
}

function estimateReadTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.round(words / 180));
}

function buildGeneratedBody(title: string, excerpt: string, language: 'es' | 'en') {
  if (language === 'es') {
    return `${excerpt}\n\nEn iData vemos este tema como una conversación práctica entre estrategia, operación y adopción. Más allá de la tendencia, el valor aparece cuando se conecta el problema real del negocio con decisiones de arquitectura, gobierno y ejecución sostenida.\n\nEste insight sirve como base para identificar oportunidades, priorizar capacidades y abrir conversaciones con líderes de datos, analítica e inteligencia artificial que necesitan aterrizar iniciativas en un contexto empresarial concreto.`;
  }

  return `${excerpt}\n\nAt iData, we see this topic as a practical conversation between strategy, operations, and adoption. Beyond the trend itself, value appears when a real business problem is connected to architecture, governance, and sustained execution decisions.\n\nThis insight is meant to serve as a starting point to identify opportunities, prioritize capabilities, and open conversations with data, analytics, and AI leaders who need to land initiatives in a concrete business context.`;
}

function findFallbackInsight(row: any) {
  const slugEs = String(row?.slug_es || row?.slug || '').trim();
  const slugEn = String(row?.slug_en || row?.slug || '').trim();
  const id = String(row?.id || '').trim();

  return (
    mockInsights.find((item) => item.id === id) ||
    mockInsights.find((item) => item.slug_es === slugEs || item.slug_en === slugEs) ||
    mockInsights.find((item) => item.slug_es === slugEn || item.slug_en === slugEn) ||
    null
  );
}

export function hydrateBlogPostDetail(row: any) {
  if (!row) return row;

  const fallback = findFallbackInsight(row);

  const titleEs = firstText(row?.title_es, row?.title, fallback?.title_es, fallback?.title_en, 'Insight iData');
  const titleEn = firstText(row?.title_en, row?.title, fallback?.title_en, fallback?.title_es, 'iData Insight');
  const excerptEs = firstText(row?.excerpt_es, row?.excerpt, fallback?.excerpt_es, fallback?.excerpt_en, `Exploramos ${titleEs.toLowerCase()} desde una perspectiva aplicada al negocio.`);
  const excerptEn = firstText(row?.excerpt_en, row?.excerpt, fallback?.excerpt_en, fallback?.excerpt_es, `We explore ${titleEn.toLowerCase()} from a business-oriented perspective.`);
  const contentEs = firstText(row?.content_es, row?.content, fallback?.content_es, buildGeneratedBody(titleEs, excerptEs, 'es'));
  const contentEn = firstText(row?.content_en, row?.content, fallback?.content_en, buildGeneratedBody(titleEn, excerptEn, 'en'));
  const featuredImage =
    row?.featured_image ||
    row?.featuredImage ||
    fallback?.featuredImage ||
    DEFAULT_INSIGHT_IMAGE;

  return {
    ...fallback,
    ...row,
    title_es: titleEs,
    title_en: titleEn,
    slug_es: firstText(row?.slug_es, fallback?.slug_es, row?.slug),
    slug_en: firstText(row?.slug_en, fallback?.slug_en, row?.slug),
    excerpt_es: excerptEs,
    excerpt_en: excerptEn,
    content_es: contentEs,
    content_en: contentEn,
    content: firstText(row?.content, contentEn),
    excerpt: firstText(row?.excerpt, excerptEn),
    featured_image: featuredImage,
    featuredImage,
    category_ids: firstArray(row?.category_ids, row?.categoryIds, fallback?.categoryIds),
    categoryIds: firstArray(row?.categoryIds, row?.category_ids, fallback?.categoryIds),
    tags: firstArray(row?.tags, fallback?.tags),
    content_blocks: row?.content_blocks ?? row?.contentBlocks ?? fallback?.content_blocks ?? null,
    author: firstText(row?.author, fallback?.author, 'iData Team'),
    published_date: firstText(row?.published_date, row?.publishedDate, fallback?.publishedDate),
    publishedDate: firstText(row?.publishedDate, row?.published_date, fallback?.publishedDate),
    read_time: row?.read_time ?? row?.readTime ?? fallback?.readTime ?? estimateReadTime(contentEn),
    readTime: row?.readTime ?? row?.read_time ?? fallback?.readTime ?? estimateReadTime(contentEn),
    readingTime: row?.readingTime ?? row?.readTime ?? row?.read_time ?? fallback?.readTime ?? estimateReadTime(contentEn),
    seo_es: row?.seo_es || fallback?.seo_es || {
      metaTitle: titleEs,
      metaDescription: excerptEs,
    },
    seo_en: row?.seo_en || fallback?.seo_en || {
      metaTitle: titleEn,
      metaDescription: excerptEn,
    },
  };
}

export function hydrateBlogPostCollection(rows: any[]) {
  return (rows || []).map((row) => hydrateBlogPostDetail(row));
}
