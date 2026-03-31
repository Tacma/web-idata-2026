import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://batzmvsbqcivybuskfnc.supabase.co';
const serviceRoleKey = 'sb_secret_zJ_i7Uzu0daC0vzuAiyH7A_DE0siyrk';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkTableContents() {
  const tables = ['services', 'case_studies', 'jobs', 'team_members', 'partners'];

  for (const table of tables) {
    try {
      console.log(`\n=== ${table.toUpperCase()} ===`);
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(3);

      if (error) {
        console.log('Error:', error.message);
      } else {
        console.log(`Found ${data.length} records:`);
        data.forEach((record, index) => {
          console.log(`${index + 1}.`, JSON.stringify(record, null, 2));
        });
      }
    } catch (e) {
      console.log('Exception:', e.message);
    }
  }
}

checkTableContents();