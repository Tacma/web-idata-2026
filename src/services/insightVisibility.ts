import { normalizeBlogPost } from './contentUtils'

export const BLOCKED_INSIGHT_SLUGS = new Set([
  'ia-generativa-empresas-casos-uso',
  'generative-ai-enterprises-use-cases',
  'arquitectura-lakehouse',
  'lakehouse-architecture',
  'ia-generativa-empresa',
  'generative-ai-enterprise',
  'futuro-analitica-datos',
  'future-data-analytics',
])

const BLOCKED_INSIGHT_TITLES = new Set([
  'El Futuro de la Analítica de Datos',
  'El Futuro de la Analitica de Datos',
  'The Future of Data Analytics',
])

export function isBlockedInsight(post: any) {
  const slugEs = String(post?.slug_es || '').trim()
  const slugEn = String(post?.slug_en || '').trim()
  const titleEs = String(post?.title_es || '').trim()
  const titleEn = String(post?.title_en || '').trim()

  return (
    BLOCKED_INSIGHT_SLUGS.has(slugEs) ||
    BLOCKED_INSIGHT_SLUGS.has(slugEn) ||
    BLOCKED_INSIGHT_TITLES.has(titleEs) ||
    BLOCKED_INSIGHT_TITLES.has(titleEn)
  )
}

export function hasRenderableInsightContent(post: any) {
  const normalized = normalizeBlogPost(post)
  const titleOk =
    Boolean(String(normalized?.title_es || '').trim()) ||
    Boolean(String(normalized?.title_en || '').trim())
  const excerptOk =
    Boolean(String(normalized?.excerpt_es || '').trim()) ||
    Boolean(String(normalized?.excerpt_en || '').trim())
  const imageOk = Boolean(String(normalized?.featuredImage || '').trim())
  const bodyOk =
    Boolean(String(normalized?.content_es || '').trim()) ||
    Boolean(String(normalized?.content_en || '').trim())
  const hasBlocks = Array.isArray(normalized?.content_blocks) && normalized.content_blocks.length > 0

  return titleOk && excerptOk && imageOk && (bodyOk || hasBlocks)
}

export function isVisibleInsight(post: any) {
  return !isBlockedInsight(post) && hasRenderableInsightContent(post)
}

export function filterVisibleInsights<T>(posts: T[]) {
  return (posts || []).filter((post) => isVisibleInsight(post))
}
