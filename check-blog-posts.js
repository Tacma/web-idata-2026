import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://batzmvsbqcivybuskfnc.supabase.co';
const serviceRoleKey = 'sb_secret_zJ_i7Uzu0daC0vzuAiyH7A_DE0siyrk';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkBlogPosts() {
  try {
    console.log('Checking blog_posts...');
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title')
      .limit(10);

    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log(`Found ${data.length} blog posts:`);
      data.forEach(post => {
        console.log(`- ${post.slug}: ${post.title}`);
      });
    }
  } catch (e) {
    console.log('Exception:', e.message);
  }
}

checkBlogPosts();