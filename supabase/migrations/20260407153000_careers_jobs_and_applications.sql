ALTER TABLE IF EXISTS public.jobs
  ADD COLUMN IF NOT EXISTS tools_and_ways_of_working_es TEXT[],
  ADD COLUMN IF NOT EXISTS tools_and_ways_of_working_en TEXT[],
  ADD COLUMN IF NOT EXISTS what_we_offer_es TEXT[],
  ADD COLUMN IF NOT EXISTS what_we_offer_en TEXT[],
  ADD COLUMN IF NOT EXISTS hiring_process_es TEXT[],
  ADD COLUMN IF NOT EXISTS hiring_process_en TEXT[],
  ADD COLUMN IF NOT EXISTS equal_opportunity_note_es TEXT,
  ADD COLUMN IF NOT EXISTS equal_opportunity_note_en TEXT,
  ADD COLUMN IF NOT EXISTS apply_cta_label_es TEXT,
  ADD COLUMN IF NOT EXISTS apply_cta_label_en TEXT;

ALTER TABLE IF EXISTS public.job_applications
  ADD COLUMN IF NOT EXISTS job_area TEXT,
  ADD COLUMN IF NOT EXISTS job_location TEXT,
  ADD COLUMN IF NOT EXISTS job_modality TEXT,
  ADD COLUMN IF NOT EXISTS job_level TEXT,
  ADD COLUMN IF NOT EXISTS spontaneous_application BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS experience_level TEXT;
