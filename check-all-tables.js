import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://batzmvsbqcivybuskfnc.supabase.co';
const serviceRoleKey = 'sb_secret_zJ_i7Uzu0daC0vzuAiyH7A_DE0siyrk';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkAllTables() {
  const tables = [
    'services', 'blog_posts', 'case_studies', 'jobs', 'team_members',
    'partners', 'industries', 'home_sections', 'seo_pages', 'resources',
    'testimonials', 'service_categories', 'blog_categories'
  ];

  console.log('Checking all tables...\n');

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`${table}: ERROR - ${error.message}`);
      } else {
        console.log(`${table}: ${count || 0} records`);
      }
    } catch (e) {
      console.log(`${table}: EXCEPTION - ${e.message}`);
    }
  }
}

checkAllTables();