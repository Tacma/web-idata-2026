import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://batzmvsbqcivybuskfnc.supabase.co';
const serviceRoleKey = 'sb_secret_zJ_i7Uzu0daC0vzuAiyH7A_DE0siyrk';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkTables() {
  try {
    console.log('Checking team_members...');
    const { data: teamData, error: teamError } = await supabase.from('team_members').select('id').limit(1);
    console.log('team_members exists:', !teamError);
    if (teamError) console.log('team_members error:', teamError.message);

    console.log('Checking jobs with published_date...');
    const { data: jobsData, error: jobsError } = await supabase.from('jobs').select('id, published_date').limit(1);
    console.log('jobs exists with published_date:', !jobsError);
    if (jobsError) console.log('jobs error:', jobsError.message);

    // Check if tables have data
    const { count: teamCount, error: teamCountError } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
    console.log('team_members records:', teamCount || 0);

    const { count: jobsCount, error: jobsCountError } = await supabase.from('jobs').select('*', { count: 'exact', head: true });
    console.log('jobs records:', jobsCount || 0);

  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkTables();