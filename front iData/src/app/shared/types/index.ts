// Core Types for iData CMS

export type Language = 'es' | 'en';
export type Status = 'draft' | 'published';

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  keywords?: string[];
}

export interface LocalizedContent {
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  seo_es: SEOMetadata;
  seo_en: SEOMetadata;
}

export interface BaseEntity extends LocalizedContent {
  id: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

// Service Categories (Clusters SEO)
export type ServiceCategorySlug = 
  | 'strategy-consulting' 
  | 'data-delivery' 
  | 'data-operations' 
  | 'cloud-services';

export interface ServiceCategory extends BaseEntity {
  categorySlug: ServiceCategorySlug;
  description_es: string;
  description_en: string;
  icon?: string;
  order: number;
}

// Services
export interface Service extends BaseEntity {
  categoryId: string;
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
  featuredImage?: string;
  featured: boolean;
  order: number;
}

// Industries
export interface Industry extends BaseEntity {
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
  challenges_es?: string[];
  challenges_en?: string[];
  value_es?: string[];
  value_en?: string[];
  featuredImage?: string;
  featured: boolean;
  order: number;
}

// Case Studies
export interface CaseStudy extends BaseEntity {
  client: string;
  industryId: string;
  serviceIds: string[];
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
  challenge_es?: string; // El desafío específico
  challenge_en?: string;
  solution_es?: string; // La solución específica
  solution_en?: string;
  results_es?: string;
  results_en?: string;
  featuredImage?: string;
  featured: boolean;
  publishedDate: string;
  order: number;
}

// Blog Posts
export interface BlogPost extends BaseEntity {
  categoryIds: string[];
  author: string;
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
  featuredImage?: string;
  featured: boolean;
  publishedDate: string;
  readTime?: number;
}

// Blog Categories
export interface BlogCategory extends BaseEntity {
  description_es: string;
  description_en: string;
  order: number;
}

// Jobs
export interface Job extends BaseEntity {
  department_es: string;
  department_en: string;
  location_es: string;
  location_en: string;
  type_es: string; // Full-time, Part-time, etc.
  type_en: string;
  description_es: string;
  description_en: string;
  requirements_es: string;
  requirements_en: string;
  benefits_es?: string;
  benefits_en?: string;
  active: boolean;
  publishedDate: string;
  order: number;
}

// Team Members
export interface TeamMember extends BaseEntity {
  name: string;
  position_es: string;
  position_en: string;
  bio_es: string;
  bio_en: string;
  photo?: string;
  linkedin?: string;
  email?: string;
  featured: boolean;
  order: number;
}

// Resources
export interface Resource extends BaseEntity {
  type_es: string; // eBook, Whitepaper, Webinar, etc.
  type_en: string;
  description_es: string;
  description_en: string;
  content_es: string;
  content_en: string;
  featuredImage?: string;
  downloadUrl?: string;
  featured: boolean;
  publishedDate: string;
  order: number;
}

// Testimonials
export interface Testimonial {
  id: string;
  clientName: string;
  clientPosition_es: string;
  clientPosition_en: string;
  clientCompany: string;
  quote_es: string;
  quote_en: string;
  photo?: string;
  featured: boolean;
  order: number;
  status: Status;
  createdAt: string;
}

// Home Sections
export type HomeSectionType = 
  | 'preHero'
  | 'hero'
  | 'strategicBannerTriple'
  | 'serviceHighlights'
  | 'industryHighlights'
  | 'caseHighlights'
  | 'insightsHighlights'
  | 'insightsEditorial'
  | 'testimonials'
  | 'logos'
  | 'partners'
  | 'clients'
  | 'ctaBand'
  | 'stats'
  | 'maturityJourney'
  | 'custom';

export interface HomeSection {
  id: string;
  language: Language;
  type: HomeSectionType;
  isEnabled: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  referencedIds?: string[]; // IDs of referenced items (e.g., featured case studies)
  customContent?: string; // JSON or HTML for custom sections
  content?: any; // For sections with complex content like preHero
  config?: Record<string, any>; // Additional configuration
  createdAt: string;
  updatedAt: string;
}

// CMS Collection Names
export type CollectionName = 
  | 'services'
  | 'serviceCategories'
  | 'industries'
  | 'caseStudies'
  | 'blogPosts'
  | 'blogCategories'
  | 'jobs'
  | 'teamMembers'
  | 'resources'
  | 'testimonials'
  | 'homeSections';