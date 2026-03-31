-- Row Level Security (RLS) Policies for iData CMS
-- Safe to run multiple times on an existing Supabase project

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'services' AND policyname = 'services_public_read_published'
  ) THEN
    CREATE POLICY services_public_read_published
      ON services
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

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
    WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'blog_posts_public_read_published'
  ) THEN
    CREATE POLICY blog_posts_public_read_published
      ON blog_posts
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

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
    WHERE schemaname = 'public' AND tablename = 'case_studies' AND policyname = 'case_studies_public_read_published'
  ) THEN
    CREATE POLICY case_studies_public_read_published
      ON case_studies
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

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
    WHERE schemaname = 'public' AND tablename = 'jobs' AND policyname = 'jobs_public_read_published'
  ) THEN
    CREATE POLICY jobs_public_read_published
      ON jobs
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

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

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'service_categories' AND policyname = 'service_categories_public_read_published'
  ) THEN
    CREATE POLICY service_categories_public_read_published
      ON service_categories
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'service_categories' AND policyname = 'service_categories_authenticated_full_access'
  ) THEN
    CREATE POLICY service_categories_authenticated_full_access
      ON service_categories
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
    WHERE schemaname = 'public' AND tablename = 'industries' AND policyname = 'industries_public_read_published'
  ) THEN
    CREATE POLICY industries_public_read_published
      ON industries
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

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
    WHERE schemaname = 'public' AND tablename = 'blog_categories' AND policyname = 'blog_categories_public_read_published'
  ) THEN
    CREATE POLICY blog_categories_public_read_published
      ON blog_categories
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'blog_categories' AND policyname = 'blog_categories_authenticated_full_access'
  ) THEN
    CREATE POLICY blog_categories_authenticated_full_access
      ON blog_categories
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
    WHERE schemaname = 'public' AND tablename = 'team_members' AND policyname = 'team_members_public_read_published'
  ) THEN
    CREATE POLICY team_members_public_read_published
      ON team_members
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

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
    WHERE schemaname = 'public' AND tablename = 'partners' AND policyname = 'partners_public_read_published'
  ) THEN
    CREATE POLICY partners_public_read_published
      ON partners
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

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
    WHERE schemaname = 'public' AND tablename = 'resources' AND policyname = 'resources_public_read_published'
  ) THEN
    CREATE POLICY resources_public_read_published
      ON resources
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'resources' AND policyname = 'resources_authenticated_full_access'
  ) THEN
    CREATE POLICY resources_authenticated_full_access
      ON resources
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
    WHERE schemaname = 'public' AND tablename = 'testimonials' AND policyname = 'testimonials_public_read_published'
  ) THEN
    CREATE POLICY testimonials_public_read_published
      ON testimonials
      FOR SELECT
      TO anon, authenticated
      USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'testimonials' AND policyname = 'testimonials_authenticated_full_access'
  ) THEN
    CREATE POLICY testimonials_authenticated_full_access
      ON testimonials
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
    WHERE schemaname = 'public' AND tablename = 'home_sections' AND policyname = 'home_sections_public_read_enabled'
  ) THEN
    CREATE POLICY home_sections_public_read_enabled
      ON home_sections
      FOR SELECT
      TO anon, authenticated
      USING (is_enabled = true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'home_sections' AND policyname = 'home_sections_authenticated_full_access'
  ) THEN
    CREATE POLICY home_sections_authenticated_full_access
      ON home_sections
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
    WHERE schemaname = 'public' AND tablename = 'site_pages' AND policyname = 'site_pages_public_read_visible'
  ) THEN
    CREATE POLICY site_pages_public_read_visible
      ON site_pages
      FOR SELECT
      TO anon, authenticated
      USING (is_visible = true AND status = 'published');
  END IF;

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
    WHERE schemaname = 'public' AND tablename = 'seo_pages' AND policyname = 'seo_pages_public_read'
  ) THEN
    CREATE POLICY seo_pages_public_read
      ON seo_pages
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

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
