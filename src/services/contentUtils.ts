function normalizeMediaPath(value: any) {
  if (typeof value !== 'string') return value
  const trimmed = value.trim()
  if (!trimmed) return null
  if (
    trimmed.startsWith('/assets/') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed
  }
  if (trimmed.startsWith('assets/')) {
    return `/${trimmed}`
  }
  return trimmed
}

function extractImageFromContentBlocks(blocks: any) {
  if (!Array.isArray(blocks)) return null

  for (const block of blocks) {
    const candidate = normalizeMediaPath(
      block?.image ??
      block?.src ??
      block?.image_url ??
      block?.imageUrl ??
      block?.hero_image ??
      block?.heroImage ??
      block?.header_image ??
      block?.headerImage ??
      null
    )

    if (candidate) return candidate
  }

  return null
}

export function normalizeService(row: any) {
  if (!row) return row
  const title = row.title ?? row.title_en ?? row.title_es ?? ''
  const slug = row.slug ?? row.slug_en ?? row.slug_es ?? ''
  const excerpt = row.excerpt ?? row.excerpt_en ?? row.excerpt_es ?? ''
  const content = row.content ?? row.content_en ?? row.content_es ?? ''
  return {
    ...row,
    title,
    slug,
    excerpt,
    content,
    title_es: row.title_es ?? title,
    title_en: row.title_en ?? title,
    slug_es: row.slug_es ?? slug,
    slug_en: row.slug_en ?? slug,
    excerpt_es: row.excerpt_es ?? excerpt,
    excerpt_en: row.excerpt_en ?? excerpt,
    content_es: row.content_es ?? content,
    content_en: row.content_en ?? content,
    heroImage: normalizeMediaPath(row.hero_image ?? row.heroImage ?? row.featured_image ?? row.featuredImage ?? null),
    featuredImage: normalizeMediaPath(row.featured_image ?? row.featuredImage ?? row.hero_image ?? row.heroImage ?? null),
    capabilities: Array.isArray(row.capabilities) ? row.capabilities : [],
    benefits: Array.isArray(row.benefits) ? row.benefits : [],
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    relatedCaseStudies: row.related_case_studies ?? row.relatedCaseStudies ?? [],
  }
}

export function normalizeIndustry(row: any) {
  if (!row) return row
  const descriptionEs = row.description_es ?? row.excerpt_es ?? ''
  const descriptionEn = row.description_en ?? row.excerpt_en ?? ''

  return {
    ...row,
    excerpt_es: row.excerpt_es ?? descriptionEs,
    excerpt_en: row.excerpt_en ?? descriptionEn,
    content_es: row.content_es ?? descriptionEs,
    content_en: row.content_en ?? descriptionEn,
    featuredImage: normalizeMediaPath(row.featured_image ?? row.featuredImage ?? row.hero_image ?? row.heroImage ?? null),
    challenges_es: Array.isArray(row.challenges_es) ? row.challenges_es : [],
    challenges_en: Array.isArray(row.challenges_en) ? row.challenges_en : [],
    value_es: Array.isArray(row.value_es) ? row.value_es : [],
    value_en: Array.isArray(row.value_en) ? row.value_en : [],
    solution_tags: Array.isArray(row.solution_tags) ? row.solution_tags : [],
    related_case_study_ids: Array.isArray(row.related_case_study_ids) ? row.related_case_study_ids : [],
    discovery_description_es: row.discovery_description_es ?? row.description_es ?? row.excerpt_es ?? '',
    discovery_description_en: row.discovery_description_en ?? row.description_en ?? row.excerpt_en ?? '',
  }
}

export function normalizeCaseStudy(row: any) {
  if (!row) return row
  return {
    ...row,
    publishedDate: row.published_date ?? row.publishedDate ?? null,
    coverImage: normalizeMediaPath(row.cover_image ?? row.coverImage ?? null),
    featuredImage: normalizeMediaPath(row.cover_image ?? row.coverImage ?? row.featured_image ?? row.featuredImage ?? null),
    clientLogoUrl: normalizeMediaPath(row.client_logo_url ?? row.clientLogoUrl ?? null),
    industryId: row.industry_id ?? row.industryId ?? null,
    serviceIds: row.service_ids ?? row.serviceIds ?? (row.service_id ? [row.service_id] : []),
    challenge_es: row.challenge_es ?? row.challengeEs ?? '',
    challenge_en: row.challenge_en ?? row.challengeEn ?? '',
    solution_es: row.solution_es ?? row.solutionEs ?? '',
    solution_en: row.solution_en ?? row.solutionEn ?? '',
    case_type: row.case_type ?? 'real',
    metrics: Array.isArray(row.metrics) ? row.metrics : [],
    technology_tags: Array.isArray(row.technology_tags) ? row.technology_tags : [],
    business_pains_es: Array.isArray(row.business_pains_es) ? row.business_pains_es : [],
    business_pains_en: Array.isArray(row.business_pains_en) ? row.business_pains_en : [],
    capabilities_public_es: Array.isArray(row.capabilities_public_es) ? row.capabilities_public_es : [],
    capabilities_public_en: Array.isArray(row.capabilities_public_en) ? row.capabilities_public_en : [],
    quantitative_impacts_es: Array.isArray(row.quantitative_impacts_es) ? row.quantitative_impacts_es : [],
    quantitative_impacts_en: Array.isArray(row.quantitative_impacts_en) ? row.quantitative_impacts_en : [],
    qualitative_impacts_es: Array.isArray(row.qualitative_impacts_es) ? row.qualitative_impacts_es : [],
    qualitative_impacts_en: Array.isArray(row.qualitative_impacts_en) ? row.qualitative_impacts_en : [],
    gallery_images: Array.isArray(row.gallery_images) ? row.gallery_images.map(normalizeMediaPath).filter(Boolean) : [],
    technology_icons: Array.isArray(row.technology_icons) ? row.technology_icons.map(normalizeMediaPath).filter(Boolean) : [],
    show_client_identity: !!row.show_client_identity,
    show_testimonial: !!row.show_testimonial,
    related_industries: Array.isArray(row.related_industries) ? row.related_industries : [],
    related_case_study_ids: Array.isArray(row.related_case_study_ids) ? row.related_case_study_ids : [],
    discovery_summary_es: row.discovery_summary_es ?? row.excerpt_es ?? '',
    discovery_summary_en: row.discovery_summary_en ?? row.excerpt_en ?? '',
  }
}

export function normalizeBlogPost(row: any) {
  if (!row) return row
  const contentBlocks = row.content_blocks ?? row.contentBlocks ?? null
  const fallbackImage = extractImageFromContentBlocks(contentBlocks)

  return {
    ...row,
    publishedDate: row.published_date ?? row.publishedDate ?? null,
    featuredImage: normalizeMediaPath(
      row.featured_image ??
      row.featuredImage ??
      row.hero_image ??
      row.heroImage ??
      row.cover_image ??
      row.coverImage ??
      fallbackImage ??
      null
    ),
    categoryIds: row.category_ids ?? row.categoryIds ?? [],
    readTime: row.read_time ?? row.readTime ?? null,
    readingTime: row.read_time ?? row.readingTime ?? row.readTime ?? null,
    content_blocks: contentBlocks,
  }
}

export function normalizeTeamMember(row: any) {
  if (!row) return row
  return {
    ...row,
    photo: normalizeMediaPath(row.photo_url ?? row.photo ?? null),
    linkedin: row.linkedin_url ?? row.linkedin ?? null,
  }
}

export function normalizePartner(row: any) {
  if (!row) return row
  return {
    ...row,
    logo: normalizeMediaPath(row.logo_url ?? row.logo ?? null),
    website: row.website_url ?? row.website ?? null,
  }
}

export function normalizeResource(row: any) {
  if (!row) return row
  return {
    ...row,
    slug_es: row.slug_es ?? row.slug ?? '',
    slug_en: row.slug_en ?? row.slug ?? '',
    type_es: row.type_es ?? row.file_type ?? '',
    type_en: row.type_en ?? row.file_type ?? '',
    content_es: row.content_es ?? row.description_es ?? '',
    content_en: row.content_en ?? row.description_en ?? '',
    featuredImage: normalizeMediaPath(row.featured_image ?? row.featuredImage ?? null),
    downloadUrl: normalizeMediaPath(row.download_url ?? row.downloadUrl ?? row.file_url ?? null),
    publishedDate: row.published_date ?? row.publishedDate ?? null,
  }
}

export function normalizeTestimonial(row: any) {
  if (!row) return row
  return {
    ...row,
    clientName: row.client_name ?? row.name ?? '',
    clientPosition_es: row.client_position_es ?? row.position ?? '',
    clientPosition_en: row.client_position_en ?? row.position ?? '',
    clientCompany: row.client_company ?? row.company ?? '',
    quote_es: row.quote_es ?? row.content_es ?? '',
    quote_en: row.quote_en ?? row.content_en ?? '',
    photo: normalizeMediaPath(row.photo_url ?? row.photo ?? null),
    createdAt: row.created_at ?? row.createdAt ?? null,
    updatedAt: row.updated_at ?? row.updatedAt ?? null,
  }
}
