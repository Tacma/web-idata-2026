import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://batzmvsbqcivybuskfnc.supabase.co';
const serviceRoleKey = 'sb_secret_zJ_i7Uzu0daC0vzuAiyH7A_DE0siyrk';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function clearAllTables() {
  const tables = [
    'blog_posts', 'case_studies', 'jobs', 'team_members',
    'partners', 'industries', 'home_sections', 'seo_pages',
    'resources', 'testimonials', 'service_categories', 'blog_categories',
    'services'
  ];

  console.log('Clearing all tables...\n');

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (error) {
        console.log(`${table}: ERROR - ${error.message}`);
      } else {
        console.log(`${table}: cleared`);
      }
    } catch (e) {
      console.log(`${table}: EXCEPTION - ${e.message}`);
    }
  }
}

clearAllTables();