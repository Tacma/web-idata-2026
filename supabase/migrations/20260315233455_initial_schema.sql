-- Supabase Schema for iData CMS
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('es', 'en')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  seo_title TEXT,
  seo_description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('es', 'en')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  seo_title TEXT,
  seo_description TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published_date DATE,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category_id TEXT
);

-- Case studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('es', 'en')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  seo_title TEXT,
  seo_description TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published_date DATE,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  industry_id TEXT,
  service_id TEXT
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('es', 'en')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  seo_title TEXT,
  seo_description TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published_date DATE,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  location TEXT,
  type TEXT
);

-- Service categories table
CREATE TABLE IF NOT EXISTS service_categories (
  id TEXT PRIMARY KEY,
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug_es TEXT NOT NULL UNIQUE,
  slug_en TEXT NOT NULL UNIQUE,
  description_es TEXT,
  description_en TEXT,
  "order" INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Industries table
CREATE TABLE IF NOT EXISTS industries (
  id TEXT PRIMARY KEY,
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug_es TEXT NOT NULL UNIQUE,
  slug_en TEXT NOT NULL UNIQUE,
  description_es TEXT,
  description_en TEXT,
  "order" INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id TEXT PRIMARY KEY,
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug_es TEXT NOT NULL UNIQUE,
  slug_en TEXT NOT NULL UNIQUE,
  description_es TEXT,
  description_en TEXT,
  "order" INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position_es TEXT NOT NULL,
  position_en TEXT NOT NULL,
  bio_es TEXT,
  bio_en TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  "order" INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo_url TEXT,
  website_url TEXT,
  description_es TEXT,
  description_en TEXT,
  featured BOOLEAN DEFAULT FALSE,
  "order" INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  file_url TEXT,
  file_type TEXT,
  "order" INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  company TEXT,
  content_es TEXT NOT NULL,
  content_en TEXT NOT NULL,
  photo_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  "order" INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Base column guards for legacy databases
-- NOTE: CREATE TABLE IF NOT EXISTS does not backfill columns on existing tables.
-- These ALTER statements make the script safe to run on old databases before
-- any indexes, policies or seeds reference newer columns.

ALTER TABLE services ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS language TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE services ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE services ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE services ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS language TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_date DATE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category_id TEXT;

ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS language TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS published_date DATE;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS industry_id TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS service_id TEXT;

ALTER TABLE jobs ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS language TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS published_date DATE;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS type TEXT;

ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS slug_es TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE industries ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS slug_es TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE industries ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE industries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS slug_es TEXT;
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE team_members ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position_es TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position_en TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio_es TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio_en TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE partners ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE partners ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE partners ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE resources ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS file_url TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS file_type TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE resources ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE resources ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS content_es TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS rating INTEGER;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Additional columns for mock-driven content (ensure schema can store all UI content)
-- NOTE: These are added with IF NOT EXISTS so running this script multiple times is safe.

-- Services: multi-language fields, category, featured, images, and SEO JSON
ALTER TABLE services ADD COLUMN IF NOT EXISTS category_id TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE services ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS slug_es TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS excerpt_es TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS content_es TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS capabilities JSONB;
ALTER TABLE services ADD COLUMN IF NOT EXISTS benefits JSONB;
ALTER TABLE services ADD COLUMN IF NOT EXISTS technologies TEXT[];
ALTER TABLE services ADD COLUMN IF NOT EXISTS related_case_studies TEXT[];
ALTER TABLE services ADD COLUMN IF NOT EXISTS seo_es JSONB;
ALTER TABLE services ADD COLUMN IF NOT EXISTS seo_en JSONB;

-- Service categories: category slug, icon, and SEO JSON
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS category_slug TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS seo_es JSONB;
ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS seo_en JSONB;

-- Industries: multi-language content, challenges, value propositions and SEO JSON
ALTER TABLE industries ADD COLUMN IF NOT EXISTS excerpt_es TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS content_es TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS challenges_es JSONB;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS challenges_en JSONB;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS value_es JSONB;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS value_en JSONB;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS seo_es JSONB;
ALTER TABLE industries ADD COLUMN IF NOT EXISTS seo_en JSONB;

-- Case studies: client info, relationships, multi-language fields, cover image, and SEO JSON
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS client TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS industry_id TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS service_ids TEXT[];
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS slug_es TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS excerpt_es TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS content_es TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS challenge_es TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS challenge_en TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS solution_es TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS solution_en TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS results_es TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS results_en TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS client_logo_url TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS seo_es JSONB;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS seo_en JSONB;

-- Blog posts: category + language fields, SEO, and featured images
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category_ids TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug_es TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt_es TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_es TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_es JSONB;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_en JSONB;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS read_time INTEGER;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS display_variant TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_blocks JSONB;

-- Jobs: multi-language fields, active flag, and extended properties
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS department_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS department_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS slug_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS excerpt_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS location_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS location_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS type_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS type_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS overview_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS overview_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS responsibilities_es TEXT[];
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS responsibilities_en TEXT[];
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS requirements_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS requirements_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS nice_to_have_es TEXT[];
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS nice_to_have_en TEXT[];
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS benefits_es TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS benefits_en TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS modality TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS seniority TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS salary_visible BOOLEAN DEFAULT FALSE;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS salary_min INTEGER;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS salary_max INTEGER;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS currency TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS seo_es JSONB;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS seo_en JSONB;

-- Team members: social links and bio
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio_es TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio_en TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;

-- Resources: multi-language fields, file download and featured image
ALTER TABLE resources ADD COLUMN IF NOT EXISTS type_es TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS type_en TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS slug_es TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS description_es TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS content_es TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS download_url TEXT;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS published_date DATE;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS seo_es JSONB;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS seo_en JSONB;

-- Testimonials: client fields and quote fields
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_position_es TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_position_en TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS client_company TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS quote_es TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS quote_en TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS rating INTEGER;

-- Home sections: homepage layout sections
CREATE TABLE IF NOT EXISTS home_sections (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL CHECK (language IN ('es', 'en')),
  type TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT TRUE,
  "order" INTEGER DEFAULT 0,
  title TEXT,
  subtitle TEXT,
  cta_label TEXT,
  cta_href TEXT,
  referenced_ids TEXT[],
  content JSONB,
  config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS id TEXT;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS language TEXT;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS is_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS cta_label TEXT;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS cta_href TEXT;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS referenced_ids TEXT[];
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS content JSONB;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS config JSONB;
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS page_slug TEXT DEFAULT 'home';
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE home_sections ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- SEO Pages (optional, used by seed script)
CREATE TABLE IF NOT EXISTS seo_pages (
  slug TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('es', 'en')),
  title TEXT,
  description TEXT,
  PRIMARY KEY (slug, language)
);

ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS language TEXT;
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS description TEXT;

CREATE TABLE IF NOT EXISTS site_pages (
  slug TEXT PRIMARY KEY,
  page_name TEXT NOT NULL,
  route_es TEXT NOT NULL,
  route_en TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE site_pages ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE site_pages ADD COLUMN IF NOT EXISTS page_name TEXT;
ALTER TABLE site_pages ADD COLUMN IF NOT EXISTS route_es TEXT;
ALTER TABLE site_pages ADD COLUMN IF NOT EXISTS route_en TEXT;
ALTER TABLE site_pages ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;
ALTER TABLE site_pages ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE site_pages ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE site_pages ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS key TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS value JSONB DEFAULT '{}'::jsonb;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_language ON services(language);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

CREATE INDEX IF NOT EXISTS idx_case_studies_language ON case_studies(language);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(featured);

CREATE INDEX IF NOT EXISTS idx_jobs_language ON jobs(language);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(featured);

CREATE INDEX IF NOT EXISTS idx_service_categories_status ON service_categories(status);
CREATE INDEX IF NOT EXISTS idx_service_categories_slug_es ON service_categories(slug_es);
CREATE INDEX IF NOT EXISTS idx_service_categories_slug_en ON service_categories(slug_en);

CREATE INDEX IF NOT EXISTS idx_industries_status ON industries(status);
CREATE INDEX IF NOT EXISTS idx_industries_slug_es ON industries(slug_es);
CREATE INDEX IF NOT EXISTS idx_industries_slug_en ON industries(slug_en);

CREATE INDEX IF NOT EXISTS idx_blog_categories_status ON blog_categories(status);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug_es ON blog_categories(slug_es);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug_en ON blog_categories(slug_en);
CREATE INDEX IF NOT EXISTS idx_resources_slug_es ON resources(slug_es);
CREATE INDEX IF NOT EXISTS idx_resources_slug_en ON resources(slug_en);
CREATE INDEX IF NOT EXISTS idx_site_pages_status ON site_pages(status);
CREATE INDEX IF NOT EXISTS idx_site_pages_visibility ON site_pages(is_visible);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

CREATE INDEX IF NOT EXISTS idx_team_members_status ON team_members(status);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_slug ON partners(slug);
CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);

-- Add indexes for new content types
CREATE INDEX IF NOT EXISTS idx_home_sections_language ON home_sections(language);
CREATE INDEX IF NOT EXISTS idx_home_sections_type ON home_sections(type);
CREATE INDEX IF NOT EXISTS idx_home_sections_page_slug ON home_sections(page_slug);

-- Minimal CMS RLS configuration
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_pages' AND policyname = 'site_pages_authenticated_full_access'
  ) THEN
    CREATE POLICY site_pages_authenticated_full_access
      ON site_pages
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_settings' AND policyname = 'site_settings_authenticated_full_access'
  ) THEN
    CREATE POLICY site_settings_authenticated_full_access
      ON site_settings
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_settings' AND policyname = 'site_settings_public_read'
  ) THEN
    CREATE POLICY site_settings_public_read
      ON site_settings
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'site_pages' AND policyname = 'site_pages_public_read_visible'
  ) THEN
    CREATE POLICY site_pages_public_read_visible
      ON site_pages
      FOR SELECT
      TO anon, authenticated
      USING (is_visible = true AND status = 'published');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'seo_pages' AND policyname = 'seo_pages_authenticated_full_access'
  ) THEN
    CREATE POLICY seo_pages_authenticated_full_access
      ON seo_pages
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'services' AND policyname = 'services_authenticated_full_access'
  ) THEN
    CREATE POLICY services_authenticated_full_access
      ON services
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'partners' AND policyname = 'partners_authenticated_full_access'
  ) THEN
    CREATE POLICY partners_authenticated_full_access
      ON partners
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'industries' AND policyname = 'industries_authenticated_full_access'
  ) THEN
    CREATE POLICY industries_authenticated_full_access
      ON industries
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'case_studies' AND policyname = 'case_studies_authenticated_full_access'
  ) THEN
    CREATE POLICY case_studies_authenticated_full_access
      ON case_studies
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'blog_posts_authenticated_full_access'
  ) THEN
    CREATE POLICY blog_posts_authenticated_full_access
      ON blog_posts
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'team_members' AND policyname = 'team_members_authenticated_full_access'
  ) THEN
    CREATE POLICY team_members_authenticated_full_access
      ON team_members
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'jobs' AND policyname = 'jobs_authenticated_full_access'
  ) THEN
    CREATE POLICY jobs_authenticated_full_access
      ON jobs
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
