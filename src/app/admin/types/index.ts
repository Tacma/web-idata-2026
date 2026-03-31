// ========================================
// ADMIN/CMS TYPE DEFINITIONS
// iData Global Website Admin Architecture
// ========================================

// ----------------------------------------
// COMMON TYPES
// ----------------------------------------

export type Language = 'es' | 'en';
export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';
export type MarketVisibility = 'all' | 'selected' | 'excluded';

export interface LocalizedField<T = string> {
  es: T;
  en: T;
}

export interface TimestampFields {
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface SEOFields {
  seo_title_es: string;
  seo_title_en: string;
  seo_description_es: string;
  seo_description_en: string;
  canonical_url_override?: string;
  og_title_es?: string;
  og_title_en?: string;
  og_description_es?: string;
  og_description_en?: string;
  og_image?: string;
  robots_index: boolean;
  robots_follow: boolean;
  schema_type?: string;
  breadcrumb_title_es?: string;
  breadcrumb_title_en?: string;
}

export interface MarketVisibilityRules {
  visibility_mode: MarketVisibility;
  included_markets?: string[];
  excluded_markets?: string[];
}

// ----------------------------------------
// PAGE MODELS
// ----------------------------------------

export interface Page extends TimestampFields {
  id: string;
  page_name: string;
  route_es: string;
  route_en: string;
  status: ContentStatus;
  hero_content: LocalizedField<HeroContent>;
  content_blocks: ContentBlock[];
  seo: SEOFields;
  market_visibility: MarketVisibilityRules;
}

export interface HeroContent {
  title: string;
  subtitle?: string;
  description?: string;
  cta_label?: string;
  cta_url?: string;
  background_image?: string;
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'cta' | 'stats' | 'testimonials' | 'logos' | 'team' | 'custom';
  order: number;
  content: any; // Flexible content based on block type
  visibility_rules?: MarketVisibilityRules;
}

// ----------------------------------------
// SERVICE MODELS
// ----------------------------------------

export interface Service extends TimestampFields {
  id: string;
  slug: string; // Unique key
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  summary_es: string;
  summary_en: string;
  description_es: string;
  description_en: string;
  icon?: string;
  hero_image?: string;
  hero_content: LocalizedField<HeroContent>;
  content_blocks: ContentBlock[];
  features: LocalizedField<Feature[]>;
  benefits: LocalizedField<Benefit[]>;
  cta_config: CTAConfig;
  contact_prefill_config: ContactPrefillConfig;
  related_services?: string[];
  related_industries?: string[];
  related_case_studies?: string[];
  status: ContentStatus;
  featured: boolean;
  order: number;
  seo: SEOFields;
  market_visibility: MarketVisibilityRules;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface CTAConfig {
  enabled: boolean;
  label_es: string;
  label_en: string;
  destination: 'contact' | 'custom';
  custom_url?: string;
  intent?: string;
  style?: 'primary' | 'secondary' | 'outline';
}

export interface ContactPrefillConfig {
  project_type?: string;
  industry?: string;
  message_template_es?: string;
  message_template_en?: string;
}

// ----------------------------------------
// INDUSTRY MODELS
// ----------------------------------------

export interface Industry extends TimestampFields {
  id: string;
  slug: string;
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  summary_es: string;
  summary_en: string;
  description_es: string;
  description_en: string;
  icon?: string;
  hero_image?: string;
  content_blocks: ContentBlock[];
  challenges: LocalizedField<string[]>;
  solutions: LocalizedField<string[]>;
  discovery_description_es?: string;
  discovery_description_en?: string;
  solution_tags?: string[];
  related_case_study_ids?: string[];
  cta_config: CTAConfig;
  contact_prefill_config: ContactPrefillConfig;
  related_services?: string[];
  related_case_studies?: string[];
  status: ContentStatus;
  featured: boolean;
  order: number;
  seo: SEOFields;
  market_visibility: MarketVisibilityRules;
}

// ----------------------------------------
// CASE STUDY MODELS
// ----------------------------------------

export interface CaseStudy extends TimestampFields {
  id: string;
  slug: string;
  client_name: string;
  public_client_name?: string;
  show_client_identity?: boolean;
  title_es: string;
  title_en: string;
  public_title_es?: string;
  public_title_en?: string;
  slug_es: string;
  slug_en: string;
  summary_es: string;
  summary_en: string;
  challenge_es: string;
  challenge_en: string;
  objective_es?: string;
  objective_en?: string;
  solution_es: string;
  solution_en: string;
  solution_description_es?: string;
  solution_description_en?: string;
  results_es: string;
  results_en: string;
  business_pains_es?: string[];
  business_pains_en?: string[];
  capabilities_public_es?: string[];
  capabilities_public_en?: string[];
  quantitative_impacts_es?: string[];
  quantitative_impacts_en?: string[];
  qualitative_impacts_es?: string[];
  qualitative_impacts_en?: string[];
  metrics_text_es?: string;
  metrics_text_en?: string;
  additional_opportunities_es?: string;
  additional_opportunities_en?: string;
  testimonial_es?: string;
  testimonial_en?: string;
  show_testimonial?: boolean;
  metrics: Metric[];
  hero_image?: string;
  gallery_images?: string[];
  technology_icons?: string[];
  content_blocks: ContentBlock[];
  related_services: string[];
  related_industries: string[];
  related_case_study_ids?: string[];
  industry_category?: string;
  region_es?: string;
  region_en?: string;
  solution_type_es?: string;
  solution_type_en?: string;
  project_duration?: string;
  project_year?: number;
  technologies_used?: string[];
  technology_tags?: string[];
  discovery_summary_es?: string;
  discovery_summary_en?: string;
  case_type?: 'real' | 'placeholder';
  status: ContentStatus;
  featured: boolean;
  order: number;
  seo: SEOFields;
  market_visibility: MarketVisibilityRules;
}

export interface Metric {
  label_es: string;
  label_en: string;
  value: string;
  icon?: string;
}

// ----------------------------------------
// INSIGHTS / BLOG MODELS
// ----------------------------------------

export interface Insight extends TimestampFields {
  id: string;
  slug: string;
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  summary_es: string;
  summary_en: string;
  category_id: string;
  tags: string[];
  featured_image: string;
  display_variant: 'default' | 'large' | 'compact';
  content_blocks: InsightContentBlock[];
  related_services?: string[];
  related_industries?: string[];
  author_id?: string;
  publish_date: string;
  reading_time: number;
  featured: boolean;
  status: ContentStatus;
  seo: SEOFields;
  market_visibility: MarketVisibilityRules;
}

export interface InsightCategory {
  id: string;
  name_es: string;
  name_en: string;
  slug: string;
  color?: string;
  icon?: string;
  order: number;
}

export interface InsightContentBlock {
  id: string;
  type: 'hero_image' | 'text' | 'subtext' | 'image' | 'image_text' | 'quote' | 'list' | 'stats' | 'buttons' | 'links' | 'embed' | 'download' | 'logos' | 'social_links';
  order: number;
  content: any;
}

// ----------------------------------------
// TEAM / ABOUT MODELS
// ----------------------------------------

export interface TeamMember extends TimestampFields {
  id: string;
  name: string;
  role_es: string;
  role_en: string;
  bio_es?: string;
  bio_en?: string;
  photo?: string;
  linkedin_url?: string;
  email?: string;
  category: 'leadership' | 'team' | 'advisor';
  order: number;
  status: ContentStatus;
  market_visibility: MarketVisibilityRules;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  url?: string;
  category?: string;
  order: number;
  status: ContentStatus;
  market_visibility: MarketVisibilityRules;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
  category?: string;
  order: number;
  status: ContentStatus;
  market_visibility: MarketVisibilityRules;
}

export interface AboutContent extends TimestampFields {
  id: string;
  intro_title_es: string;
  intro_title_en: string;
  intro_description_es: string;
  intro_description_en: string;
  culture_blocks: LocalizedField<CultureBlock[]>;
  stats: Stat[];
  global_presence_es: string;
  global_presence_en: string;
  seo: SEOFields;
}

export interface CultureBlock {
  title: string;
  description: string;
  icon?: string;
}

export interface Stat {
  label_es: string;
  label_en: string;
  value: string;
  suffix?: string;
}

// ----------------------------------------
// CAREERS MODELS
// ----------------------------------------

export interface Job extends TimestampFields {
  id: string;
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  department_es: string;
  department_en: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  remote: boolean;
  description_es: string;
  description_en: string;
  responsibilities_es: string[];
  responsibilities_en: string[];
  requirements_es: string[];
  requirements_en: string[];
  benefits_es: string[];
  benefits_en: string[];
  salary_range_min?: number;
  salary_range_max?: number;
  currency?: string;
  application_deadline?: string;
  status: 'open' | 'closed' | 'filled' | 'on-hold';
  featured: boolean;
  order: number;
  seo: SEOFields;
  market_visibility: MarketVisibilityRules;
}

export interface JobApplication extends TimestampFields {
  id: string;
  job_id?: string; // Optional: could be open application
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_file_url: string;
  cover_letter?: string;
  current_location: string;
  available_to_relocate?: boolean;
  expected_salary?: string;
  notice_period?: string;
  how_did_you_hear?: string;
  language: Language;
  market?: string;
  source_url: string;
  application_type: 'job' | 'open';
  status: 'new' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'hired';
  notes?: string;
}

export interface CareersContent extends TimestampFields {
  id: string;
  landing_title_es: string;
  landing_title_en: string;
  landing_description_es: string;
  landing_description_en: string;
  culture_title_es: string;
  culture_title_en: string;
  culture_blocks: LocalizedField<CultureBlock[]>;
  benefits_title_es: string;
  benefits_title_en: string;
  benefits: LocalizedField<Benefit[]>;
  recruiter_email: string;
  hr_email?: string;
  seo: SEOFields;
}

// ----------------------------------------
// CONTACT / LEADS MODELS
// ----------------------------------------

export interface ContactContent extends TimestampFields {
  id: string;
  page_title_es: string;
  page_title_en: string;
  page_description_es: string;
  page_description_en: string;
  contact_phones: ContactPhone[];
  contact_email: string;
  social_links: SocialLink[];
  map_embed_code?: string;
  map_latitude?: string;
  map_longitude?: string;
  marketing_email: string; // Default: marketing@idata.global
  confirmation_email_template_es: string;
  confirmation_email_template_en: string;
  seo: SEOFields;
}

export interface ContactPhone {
  label_es: string;
  label_en: string;
  number: string;
  type: 'primary' | 'secondary' | 'administrative';
  order: number;
}

export interface SocialLink {
  platform: 'linkedin' | 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'github';
  url: string;
  enabled: boolean;
}

export interface ContactSubmission extends TimestampFields {
  id: string;
  // Form data
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  project_type?: string;
  industry?: string;
  budget_range?: string;
  timeline?: string;
  message: string;
  privacy_policy_acceptance: boolean;
  
  // System fields
  language: Language;
  source_page: string;
  market?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  
  // Lead context metadata
  source_type?: string;
  source_slug?: string;
  source_title?: string;
  source_url?: string;
  source_language?: string;
  source_cta_label?: string;
  intent?: string;
  campaign_id?: string;
  referrer_path?: string;
  prefill_used?: boolean;
  
  // Email routing
  notification_recipient: string;
  notification_subject: string;
  notification_sent?: boolean;
  confirmation_sent?: boolean;
  
  // Admin notes
  assigned_to?: string;
  notes?: string;
}

// ----------------------------------------
// MEDIA LIBRARY MODELS
// ----------------------------------------

export interface MediaAsset extends TimestampFields {
  id: string;
  filename: string;
  original_filename: string;
  file_url: string;
  file_type: 'image' | 'video' | 'document' | 'audio' | 'other';
  mime_type: string;
  file_size: number;
  width?: number;
  height?: number;
  alt_text_es?: string;
  alt_text_en?: string;
  caption_es?: string;
  caption_en?: string;
  tags: string[];
  category?: string;
  folder?: string;
  usage_count?: number;
  used_in_pages?: string[];
  status: 'active' | 'archived';
}

// ----------------------------------------
// NAVIGATION MODELS
// ----------------------------------------

export interface NavigationItem {
  id: string;
  label_es: string;
  label_en: string;
  url?: string;
  route_key?: string; // e.g., 'services', 'about'
  external: boolean;
  open_in_new_tab: boolean;
  parent_id?: string;
  children?: NavigationItem[];
  location: 'header' | 'footer' | 'utility';
  market_visibility: MarketVisibilityRules;
  order: number;
  enabled: boolean;
}

// ----------------------------------------
// SEO GLOBAL SETTINGS MODELS
// ----------------------------------------

export interface SEOGlobalSettings {
  site_title_template_es: string;
  site_title_template_en: string;
  default_meta_description_es: string;
  default_meta_description_en: string;
  default_og_image: string;
  robots_default_index: boolean;
  robots_default_follow: boolean;
  canonical_domain: string;
  hreflang_enabled: boolean;
  favicon: string;
  apple_touch_icon: string;
  brand_name: string;
  default_share_title_es: string;
  default_share_title_en: string;
  default_share_description_es: string;
  default_share_description_en: string;
  organization_schema: OrganizationSchema;
}

export interface OrganizationSchema {
  name: string;
  legal_name: string;
  url: string;
  logo: string;
  description_es: string;
  description_en: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    region: string;
    postal_code: string;
    country: string;
  };
  social_profiles: string[];
}

// ----------------------------------------
// ANALYTICS MODELS
// ----------------------------------------

export interface AnalyticsSettings {
  ga4_measurement_id: string;
  gtm_container_id: string;
  search_console_verification_code: string;
  google_ads_id?: string;
  meta_pixel_id?: string;
  consent_mode_enabled: boolean;
  anonymize_ip: boolean;
  // Event tracking toggles
  track_form_submissions: boolean;
  track_cta_clicks: boolean;
  track_language_switches: boolean;
  track_scroll_depth: boolean;
  track_file_downloads: boolean;
  track_outbound_clicks: boolean;
  track_job_applications: boolean;
  track_open_applications: boolean;
  track_blog_engagement: boolean;
  track_search_usage: boolean;
  track_video_interactions: boolean;
}

// ----------------------------------------
// MARKET / DOMAIN MODELS
// ----------------------------------------

export interface Market {
  id: string;
  market_name: string;
  domain_name: string;
  default_language: Language;
  enabled_languages: Language[];
  is_primary_market: boolean;
  favicon_override?: string;
  logo_override?: string;
  contact_phone_override?: ContactPhone[];
  contact_email_override?: string;
  seo_defaults_override?: Partial<SEOGlobalSettings>;
  social_links_override?: SocialLink[];
  enabled: boolean;
}

// ----------------------------------------
// REDIRECTS MODELS
// ----------------------------------------

export interface Redirect {
  id: string;
  old_url: string;
  new_url: string;
  status_code: 301 | 302 | 307 | 308;
  notes?: string;
  market?: string;
  locale_mapping?: {
    es: string;
    en: string;
  };
  enabled: boolean;
  created_at: string;
}

// ----------------------------------------
// ADMIN USERS MODELS
// ----------------------------------------

export type AdminRole = 'super_admin' | 'content_admin' | 'marketing_admin' | 'hr_admin' | 'seo_admin' | 'read_only';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: AdminPermissions;
  enabled: boolean;
  last_login?: string;
  created_at: string;
}

export interface AdminPermissions {
  can_manage_pages: boolean;
  can_manage_services: boolean;
  can_manage_industries: boolean;
  can_manage_case_studies: boolean;
  can_manage_insights: boolean;
  can_manage_team: boolean;
  can_manage_careers: boolean;
  can_view_contact_submissions: boolean;
  can_view_job_applications: boolean;
  can_manage_media: boolean;
  can_manage_navigation: boolean;
  can_manage_seo: boolean;
  can_manage_analytics: boolean;
  can_manage_markets: boolean;
  can_manage_global_settings: boolean;
  can_manage_users: boolean;
  can_manage_redirects: boolean;
}

// ----------------------------------------
// DASHBOARD WIDGETS DATA
// ----------------------------------------

export interface DashboardStats {
  total_published_pages: number;
  total_insights_posts: number;
  total_active_jobs: number;
  total_contact_submissions: number;
  total_job_applications: number;
  recent_submissions: ContactSubmission[];
  content_pending_translation: number;
  seo_issues_count: number;
  broken_links_count: number;
  pages_missing_market_config: number;
}

// ----------------------------------------
// QUALITY ASSURANCE MODELS
// ----------------------------------------

export interface QACheck {
  id: string;
  entity_type: 'page' | 'service' | 'industry' | 'case_study' | 'insight' | 'job';
  entity_id: string;
  check_type: 'missing_translation' | 'missing_seo_title' | 'missing_meta_description' | 'missing_og_image' | 'slug_conflict' | 'missing_market_visibility' | 'missing_alt_text';
  severity: 'critical' | 'warning' | 'info';
  message_es: string;
  message_en: string;
  resolved: boolean;
  created_at: string;
}

// ----------------------------------------
// FORM BUILDER MODELS (Future)
// ----------------------------------------

export interface FormField {
  id: string;
  name: string;
  label_es: string;
  label_en: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  required: boolean;
  placeholder_es?: string;
  placeholder_en?: string;
  options?: LocalizedField<string[]>;
  validation_rules?: any;
  order: number;
}
