ALTER TABLE industries
  ADD COLUMN IF NOT EXISTS discovery_description_es TEXT,
  ADD COLUMN IF NOT EXISTS discovery_description_en TEXT,
  ADD COLUMN IF NOT EXISTS solution_tags TEXT[] DEFAULT '{}'::TEXT[],
  ADD COLUMN IF NOT EXISTS related_case_study_ids TEXT[] DEFAULT '{}'::TEXT[];

ALTER TABLE case_studies
  ADD COLUMN IF NOT EXISTS discovery_summary_es TEXT,
  ADD COLUMN IF NOT EXISTS discovery_summary_en TEXT,
  ADD COLUMN IF NOT EXISTS technology_tags TEXT[] DEFAULT '{}'::TEXT[],
  ADD COLUMN IF NOT EXISTS related_industries TEXT[] DEFAULT '{}'::TEXT[],
  ADD COLUMN IF NOT EXISTS related_case_study_ids TEXT[] DEFAULT '{}'::TEXT[],
  ADD COLUMN IF NOT EXISTS case_type TEXT NOT NULL DEFAULT 'real';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'case_studies_case_type_check'
  ) THEN
    ALTER TABLE case_studies
      ADD CONSTRAINT case_studies_case_type_check
      CHECK (case_type IN ('real', 'placeholder'));
  END IF;
END $$;
