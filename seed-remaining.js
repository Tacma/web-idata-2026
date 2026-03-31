import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

const supabaseUrl = 'https://batzmvsbqcivybuskfnc.supabase.co';
const serviceRoleKey = 'sb_secret_zJ_i7Uzu0daC0vzuAiyH7A_DE0siyrk';

const supabase = createClient(supabaseUrl, serviceRoleKey);

function deterministicUUID(value) {
  const hash = createHash('sha256').update(value).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

async function seedRemainingTables() {
  try {
    // Seed jobs
    const jobsData = [
      {
        id: deterministicUUID('job-senior-data-engineer'),
        language: 'en',
        status: 'published',
        title: 'Senior Data Engineer',
        slug: 'senior-data-engineer',
        excerpt: 'We are looking for a Senior Data Engineer to design and implement scalable cloud data architectures.',
        content: 'We are looking for a Senior Data Engineer to design and implement scalable cloud data architectures.',
        seo_title: 'Senior Data Engineer - iData',
        seo_description: 'We are looking for a Senior Data Engineer to design and implement scalable cloud data architectures.',
        featured: false,
        published_date: '2024-03-01',
        order: 1,
        location: 'Colombia / Remote',
        type: 'Full-time',
        title_es: 'Data Engineer Senior',
        title_en: 'Senior Data Engineer',
        slug_es: 'data-engineer-senior',
        slug_en: 'senior-data-engineer',
        excerpt_es: 'Buscamos un Data Engineer Senior para diseñar e implementar arquitecturas de datos escalables en la nube.',
        excerpt_en: 'We are looking for a Senior Data Engineer to design and implement scalable cloud data architectures.',
        department_es: 'Ingeniería de Datos',
        department_en: 'Data Engineering',
        location_es: 'Colombia / Remoto',
        location_en: 'Colombia / Remote',
        type_es: 'Tiempo completo',
        type_en: 'Full-time',
        active: true,
      }
    ];

    const { error: jobsError } = await supabase.from('jobs').insert(jobsData);
    if (jobsError) {
      console.log('Jobs error:', jobsError.message);
    } else {
      console.log('Jobs seeded successfully');
    }

    // Seed home sections
    const homeSectionsData = [
      {
        id: deterministicUUID('home-hero'),
        language: 'en',
        type: 'hero',
        title: 'Transforming Data into Strategic Decisions',
        is_enabled: true,
        order: 1,
        content: {
          subtitle: 'We drive technological transformation for leading organizations',
          description: 'with end-to-end solutions in data, advanced analytics and artificial intelligence.'
        }
      },
      {
        id: deterministicUUID('home-services'),
        language: 'en',
        type: 'services',
        title: 'Our Services',
        is_enabled: true,
        order: 2
      },
      {
        id: deterministicUUID('home-case-studies'),
        language: 'en',
        type: 'case_studies',
        title: 'Case Studies',
        is_enabled: true,
        order: 3
      },
      {
        id: deterministicUUID('home-partners'),
        language: 'en',
        type: 'partners',
        title: 'Our Partners',
        is_enabled: true,
        order: 4
      },
      {
        id: deterministicUUID('home-team'),
        language: 'en',
        type: 'team',
        title: 'Our Team',
        is_enabled: true,
        order: 5
      }
    ];

    const { error: homeError } = await supabase.from('home_sections').insert(homeSectionsData);
    if (homeError) {
      console.log('Home sections error:', homeError.message);
    } else {
      console.log('Home sections seeded successfully');
    }

  } catch (e) {
    console.log('Exception:', e.message);
  }
}

seedRemainingTables();