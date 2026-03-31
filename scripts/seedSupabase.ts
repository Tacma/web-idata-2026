import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
import {
  mockBlogCategories,
  mockCaseStudies,
  mockHomeSections,
  mockIndustries,
  mockInsights,
  mockResources,
  mockServiceCategories,
  mockTestimonials,
} from '../src/app/data/mockData'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables (SUPABASE_URL or VITE_SUPABASE_URL, and/or SUPABASE_SERVICE_ROLE_KEY)')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const seededTableColumns: Record<string, string[]> = {
  services: [
    'id', 'language', 'status', 'title', 'slug', 'excerpt', 'content', 'seo_title', 'seo_description',
    'order', 'created_at', 'updated_at'
  ],
  case_studies: [
    'id', 'language', 'status', 'title', 'slug', 'excerpt', 'content', 'seo_title', 'seo_description',
    'order', 'client', 'title_es', 'title_en', 'slug_es', 'slug_en', 'excerpt_es', 'excerpt_en',
    'content_es', 'content_en', 'challenge_es', 'challenge_en', 'solution_es', 'solution_en',
    'results_es', 'results_en', 'cover_image', 'client_logo_url', 'featured', 'published_date',
    'seo_es', 'seo_en', 'updated_at'
  ],
  team_members: [
    'id', 'name', 'position_es', 'position_en', 'photo_url', 'order', 'status', 'featured',
    'bio_es', 'bio_en', 'linkedin_url', 'email', 'updated_at'
  ],
  partners: [
    'id', 'name', 'slug', 'logo_url', 'featured', 'order', 'status', 'description_es',
    'description_en', 'website_url', 'updated_at'
  ],
  blog_posts: [
    'id', 'language', 'status', 'title', 'slug', 'excerpt', 'content', 'seo_title', 'seo_description',
    'featured', 'published_date', 'title_es', 'title_en', 'slug_es', 'slug_en', 'excerpt_es',
    'excerpt_en', 'content_es', 'content_en', 'author', 'featured_image', 'seo_es', 'seo_en',
    'read_time', 'tags', 'display_variant', 'content_blocks', 'category_ids', 'updated_at'
  ],
  industries: [
    'id', 'title_es', 'title_en', 'slug_es', 'slug_en', 'description_es', 'description_en', 'order',
    'status', 'excerpt_es', 'excerpt_en', 'content_es', 'content_en', 'challenges_es', 'challenges_en',
    'value_es', 'value_en', 'seo_es', 'seo_en', 'featured_image', 'updated_at'
  ],
  service_categories: [
    'id', 'title_es', 'title_en', 'slug_es', 'slug_en', 'description_es', 'description_en', 'order',
    'status', 'category_slug', 'updated_at'
  ],
  blog_categories: [
    'id', 'title_es', 'title_en', 'slug_es', 'slug_en', 'description_es', 'description_en', 'order',
    'status', 'updated_at'
  ],
  jobs: [
    'id', 'language', 'status', 'title', 'slug', 'excerpt', 'content', 'seo_title', 'seo_description',
    'featured', 'published_date', 'order', 'location', 'type', 'department_es', 'department_en',
    'title_es', 'title_en', 'slug_es', 'slug_en', 'excerpt_es', 'excerpt_en', 'location_es',
    'location_en', 'type_es', 'type_en', 'description_es', 'description_en', 'overview_es',
    'overview_en', 'responsibilities_es', 'responsibilities_en', 'requirements_es', 'requirements_en',
    'nice_to_have_es', 'nice_to_have_en', 'benefits_es', 'benefits_en', 'modality', 'seniority',
    'salary_visible', 'salary_min', 'salary_max', 'currency', 'active', 'updated_at'
  ],
  resources: [
    'id', 'title_es', 'title_en', 'slug_es', 'slug_en', 'type_es', 'type_en', 'description_es',
    'description_en', 'content_es', 'content_en', 'featured_image', 'download_url', 'file_url',
    'file_type', 'featured', 'published_date', 'order', 'status', 'updated_at'
  ],
  testimonials: [
    'id', 'name', 'client_name', 'client_position_es', 'client_position_en', 'client_company',
    'company', 'quote_es', 'quote_en', 'content_es', 'content_en', 'photo_url', 'rating', 'order',
    'status', 'updated_at'
  ],
  home_sections: [
    'id', 'page_slug', 'language', 'type', 'is_enabled', 'order', 'title', 'subtitle', 'cta_label', 'cta_href',
    'referenced_ids', 'content', 'config', 'updated_at'
  ],
  site_pages: [
    'slug', 'page_name', 'route_es', 'route_en', 'is_visible', 'status', 'updated_at'
  ],
  seo_pages: ['slug', 'language', 'title', 'description'],
}

const reseedCleanupKeys: Record<string, string[]> = {
  services: ['id', 'slug'],
  case_studies: ['id', 'slug', 'slug_es', 'slug_en'],
  team_members: ['id'],
  partners: ['id', 'slug'],
  blog_posts: ['id', 'slug', 'slug_es', 'slug_en'],
  industries: ['id', 'slug_es', 'slug_en'],
  service_categories: ['id', 'slug_es', 'slug_en', 'category_slug'],
  blog_categories: ['id', 'slug_es', 'slug_en'],
  jobs: ['id', 'slug', 'slug_es', 'slug_en'],
  resources: ['id', 'slug_es', 'slug_en'],
  testimonials: ['id'],
  home_sections: ['id'],
  site_pages: ['slug'],
}

const reseedDeduplicationKey: Record<string, string> = {
  services: 'slug',
  case_studies: 'slug',
  team_members: 'id',
  partners: 'slug',
  blog_posts: 'slug',
  industries: 'slug_en',
  service_categories: 'slug_en',
  blog_categories: 'slug_en',
  jobs: 'slug',
  resources: 'slug_en',
  testimonials: 'id',
  home_sections: 'id',
  site_pages: 'slug',
}

function deterministicUUID(value: string) {
  const hash = createHash('sha256').update(value).digest('hex')
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`
}

const tableColumnsCache = new Map<string, Set<string>>()

async function getTableColumns(table: string): Promise<Set<string>> {
  if (tableColumnsCache.has(table)) return tableColumnsCache.get(table)!

  const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name')
    .eq('table_schema', 'public')
    .eq('table_name', table)

  if (!error && data && data.length > 0) {
    const columns = new Set<string>(data.map((row: any) => row.column_name))
    tableColumnsCache.set(table, columns)
    return columns
  }

  if (seededTableColumns[table]) {
    const fallbackColumns = new Set<string>(seededTableColumns[table])
    tableColumnsCache.set(table, fallbackColumns)
    return fallbackColumns
  }

  throw new Error(`No seeded column map defined for table: ${table}`)
}

function filterRowToColumns(row: Record<string, any>, columns: Set<string>) {
  const filtered: Record<string, any> = {}
  for (const key of Object.keys(row)) {
    if (columns.has(key)) filtered[key] = row[key]
  }
  return filtered
}

function normalizeLineArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

function dedupeRows(table: string, rows: Record<string, any>[]) {
  const dedupeKey = reseedDeduplicationKey[table]
  if (!dedupeKey) return rows

  const byKey = new Map<string, Record<string, any>>()
  let unnamedIndex = 0
  for (const row of rows) {
    const value = row[dedupeKey]
    if (!value) {
      byKey.set(`${dedupeKey}:__row_${unnamedIndex++}`, row)
      continue
    }
    if (!byKey.has(value)) {
      byKey.set(value, row)
    }
  }

  return Array.from(byKey.values())
}

function extractMissingColumnName(message: string | undefined) {
  const missingColumnMatch = /column\s+("?[\w\.]+"?)\s+does not exist/i.exec(message || '')
  return missingColumnMatch?.[1]?.replace(/"/g, '').split('.').pop() ?? null
}

async function reseedTable(table: string, rows: Record<string, any>[]) {
  if (rows.length === 0) return

  const columns = await getTableColumns(table)
  let activeColumns = new Set<string>(columns)
  let filteredRows = dedupeRows(
    table,
    rows.map((row) => filterRowToColumns(row, activeColumns))
  )

  const cleanupKeys = reseedCleanupKeys[table] ?? ['id']
  for (const key of cleanupKeys) {
    if (!activeColumns.has(key)) continue

    const values = [...new Set(filteredRows.map((row) => row[key]).filter(Boolean))]
    if (values.length === 0) continue

    const { error: deleteError } = await supabase.from(table).delete().in(key, values)
    if (deleteError) {
      const missingColumn = extractMissingColumnName(deleteError.message)
      if (missingColumn === key) {
        activeColumns.delete(key)
        filteredRows = dedupeRows(
          table,
          rows.map((row) => filterRowToColumns(row, activeColumns))
        )
        continue
      }
      throw deleteError
    }
  }

  while (true) {
    const { error: insertError } = await supabase.from(table).insert(filteredRows)
    if (!insertError) break

    const missingColumn = extractMissingColumnName(insertError.message)

    if (!missingColumn || !activeColumns.has(missingColumn)) {
      throw insertError
    }

    activeColumns.delete(missingColumn)
    filteredRows = dedupeRows(
      table,
      rows.map((row) => filterRowToColumns(row, activeColumns))
    )
  }
}

const serviceSeed = [
  {
    key: 'service-strategy-consulting',
    slug: 'strategy-consulting',
    order: 1,
    title_es: 'Strategy & Consulting',
    title_en: 'Strategy & Consulting',
    excerpt_es: 'Disenamos estrategias de datos, gobierno y marcos de calidad para maximizar el valor de la informacion.',
    excerpt_en: 'We design data strategies, governance and quality frameworks to maximize information value.',
    content_es:
      'Ayudamos a las organizaciones a construir estrategias de datos solidas, establecer marcos de gobernanza efectivos y crear una cultura data-driven que impulse la toma de decisiones informadas y genere ventajas competitivas sostenibles.',
    content_en:
      'We help organizations build solid data strategies, establish effective governance frameworks and create a data-driven culture that drives informed decision-making and generates sustainable competitive advantages.',
    hero_image: '/assets/images/services/data-strategy.png',
    capabilities: [
      {
        title_es: 'Definicion de Estrategia',
        title_en: 'Strategy Definition',
        description_es: 'Disenamos roadmaps de datos alineados con objetivos de negocio y capacidades organizacionales.',
        description_en: 'We design data roadmaps aligned with business objectives and organizational capabilities.',
      },
      {
        title_es: 'Marcos de Gobernanza',
        title_en: 'Governance Frameworks',
        description_es: 'Establecemos politicas, roles y responsabilidades para gestion efectiva de datos.',
        description_en: 'We establish policies, roles and responsibilities for effective data management.',
      },
      {
        title_es: 'Calidad de Datos',
        title_en: 'Data Quality',
        description_es: 'Implementamos procesos y herramientas para asegurar confiabilidad y consistencia.',
        description_en: 'We implement processes and tools to ensure reliability and consistency.',
      },
      {
        title_es: 'Madurez Analitica',
        title_en: 'Analytics Maturity',
        description_es: 'Evaluamos y elevamos las capacidades analiticas de tu organizacion.',
        description_en: "We assess and elevate your organization's analytical capabilities.",
      },
    ],
    benefits: [
      {
        title_es: 'Decisiones Informadas',
        title_en: 'Informed Decisions',
        description_es: 'Datos confiables para mejores decisiones estrategicas',
        description_en: 'Reliable data for better strategic decisions',
      },
      {
        title_es: 'Cumplimiento Normativo',
        title_en: 'Regulatory Compliance',
        description_es: 'Gestion adecuada de privacidad y seguridad',
        description_en: 'Proper privacy and security management',
      },
      {
        title_es: 'Eficiencia Operativa',
        title_en: 'Operational Efficiency',
        description_es: 'Optimizacion de procesos de gestion de datos',
        description_en: 'Optimization of data management processes',
      },
      {
        title_es: 'Alineacion Estrategica',
        title_en: 'Strategic Alignment',
        description_es: 'Datos al servicio de objetivos de negocio',
        description_en: 'Data serving business objectives',
      },
    ],
    technologies: ['Microsoft', 'Databricks', 'Snowflake'],
    related_case_studies: ['cueros-velez', 'haceb'],
  },
  {
    key: 'service-data-delivery',
    slug: 'data-delivery',
    order: 2,
    title_es: 'Data Delivery',
    title_en: 'Data Delivery',
    excerpt_es: 'Construimos arquitecturas modernas de datos y soluciones de analitica avanzada e inteligencia artificial.',
    excerpt_en: 'We build modern data architectures and advanced analytics and artificial intelligence solutions.',
    content_es:
      'Construimos la infraestructura de datos que impulsa tu transformacion digital. Disenamos arquitecturas modernas, desarrollamos pipelines eficientes, implementamos soluciones de analitica avanzada e inteligencia artificial para establecer las bases tecnicas de una organizacion data-driven.',
    content_en:
      'We build the data infrastructure that drives your digital transformation. We design modern architectures, develop efficient pipelines, implement advanced analytics and artificial intelligence solutions to establish the technical foundations of a data-driven organization.',
    hero_image: '/assets/images/services/data-engineering.png',
    capabilities: [
      {
        title_es: 'Arquitectura de Datos',
        title_en: 'Data Architecture',
        description_es: 'Disenamos arquitecturas modernas como Data Lakes, Lakehouses y Data Mesh.',
        description_en: 'We design modern architectures like Data Lakes, Lakehouses and Data Mesh.',
      },
      {
        title_es: 'Pipelines de Datos',
        title_en: 'Data Pipelines',
        description_es: 'Construimos pipelines ETL/ELT robustos, eficientes y monitorizables.',
        description_en: 'We build robust, efficient and monitorable ETL/ELT pipelines.',
      },
      {
        title_es: 'Integracion de Datos',
        title_en: 'Data Integration',
        description_es: 'Conectamos y centralizamos datos de multiples fuentes empresariales.',
        description_en: 'We connect and centralize data from multiple business sources.',
      },
      {
        title_es: 'Infraestructura Cloud',
        title_en: 'Cloud Infrastructure',
        description_es: 'Desplegamos soluciones en AWS, Azure y Google Cloud.',
        description_en: 'We deploy solutions on AWS, Azure and Google Cloud.',
      },
    ],
    benefits: [
      {
        title_es: 'Procesamiento Escalable',
        title_en: 'Scalable Processing',
        description_es: 'Maneja grandes volumenes de datos eficientemente',
        description_en: 'Handle large data volumes efficiently',
      },
      {
        title_es: 'Datos Confiables',
        title_en: 'Reliable Data',
        description_es: 'Pipelines robustos con validacion y monitoreo',
        description_en: 'Robust pipelines with validation and monitoring',
      },
      {
        title_es: 'Time-to-Insight Reducido',
        title_en: 'Reduced Time-to-Insight',
        description_es: 'Acceso rapido a datos para analisis',
        description_en: 'Fast data access for analysis',
      },
      {
        title_es: 'Flexibilidad Cloud',
        title_en: 'Cloud Flexibility',
        description_es: 'Escalabilidad y optimizacion de costos',
        description_en: 'Scalability and cost optimization',
      },
    ],
    technologies: ['AWS', 'Google Cloud', 'Databricks', 'Snowflake'],
    related_case_studies: ['haceb'],
  },
  {
    key: 'service-data-operations',
    slug: 'data-operations',
    order: 3,
    title_es: 'Data Operations',
    title_en: 'Data Operations',
    excerpt_es: 'Operamos y optimizamos ecosistemas de datos con modelos agiles y automatizados.',
    excerpt_en: 'We operate and optimize data ecosystems with agile and automated models.',
    content_es:
      'Ayudamos a las organizaciones a operar sus plataformas de datos con continuidad, visibilidad y soporte especializado. Nuestro enfoque permite reducir incidentes, minimizar la inactividad y mantener el rendimiento de entornos analiticos y de datos en produccion.',
    content_en:
      'We help organizations run their data platforms with continuity, visibility and specialized support. Our approach reduces incidents, minimizes downtime and sustains the performance of production data and analytics environments.',
    hero_image: '/assets/images/services/data-operations.png',
    capabilities: [
      {
        title_es: 'Data+',
        title_en: 'Data+',
        description_es: 'Monitoreo, mantenimiento y soporte mensual para garantizar estabilidad, resolver incidencias y minimizar la inactividad del ecosistema de datos.',
        description_en: 'Monitoring, maintenance and monthly support to ensure stability, resolve incidents and minimize downtime in the data ecosystem.',
      },
      {
        title_es: 'Monitoreo continuo',
        title_en: 'Continuous monitoring',
        description_es: 'Supervision proactiva de pipelines, flujos, jobs y componentes criticos de la operacion de datos.',
        description_en: 'Proactive supervision of pipelines, flows, jobs and critical components of the data operation.',
      },
      {
        title_es: 'Mantenimiento y soporte',
        title_en: 'Maintenance and support',
        description_es: 'Atencion de incidentes, ajustes operativos y soporte para mantener la continuidad del servicio.',
        description_en: 'Incident handling, operational adjustments and support to maintain service continuity.',
      },
      {
        title_es: 'Staffing especializado',
        title_en: 'Specialized staffing',
        description_es: 'Talento por hora o por periodo fijo para reforzar proyectos internos de datos.',
        description_en: 'Talent by the hour or fixed period to reinforce internal data initiatives.',
      },
      {
        title_es: 'Optimizacion operativa',
        title_en: 'Operational optimization',
        description_es: 'Mejora continua del performance y confiabilidad de la plataforma de datos.',
        description_en: 'Continuous improvement of data platform performance and reliability.',
      },
    ],
    benefits: [
      {
        title_es: 'Menor inactividad operativa',
        title_en: 'Reduced operational downtime',
        description_es: 'Minimiza interrupciones y mantiene continuidad del servicio',
        description_en: 'Minimize interruptions and maintain service continuity',
      },
      {
        title_es: 'Mayor estabilidad de la plataforma de datos',
        title_en: 'Greater data platform stability',
        description_es: 'Operacion confiable y predecible',
        description_en: 'Reliable and predictable operation',
      },
      {
        title_es: 'Respuesta mas rapida ante incidentes',
        title_en: 'Faster incident response',
        description_es: 'Soporte especializado disponible cuando lo necesitas',
        description_en: 'Specialized support available when you need it',
      },
      {
        title_es: 'Mayor confiabilidad para equipos de negocio y analitica',
        title_en: 'Higher reliability for business and analytics teams',
        description_es: 'Datos disponibles y confiables 24/7',
        description_en: 'Available and reliable data 24/7',
      },
    ],
    technologies: ['Microsoft', 'Databricks', 'Snowflake', 'AWS', 'Google Cloud'],
    related_case_studies: ['cueros-velez', 'haceb'],
  },
  {
    key: 'service-cloud-services-provider',
    slug: 'cloud-services-provider',
    order: 4,
    title_es: 'Cloud Services Provider',
    title_en: 'Cloud Services Provider',
    excerpt_es: 'Implementamos y administramos plataformas de datos en la nube con tecnologias lideres.',
    excerpt_en: 'We implement and manage cloud data platforms with leading technologies.',
    content_es:
      'Operamos y optimizamos infraestructuras cloud con modelos gestionados y automatizados.',
    content_en:
      'We operate and optimize cloud infrastructures with managed and automated models.',
    hero_image: '/assets/images/services/data-platforms.png',
    capabilities: [],
    benefits: [],
    technologies: ['Microsoft', 'Databricks', 'Snowflake', 'AWS', 'Google Cloud'],
    related_case_studies: [],
  },
]

const teamMembersSeed = [
  {
    key: 'team-bayron-quintero',
    name: 'Bayron Quintero',
    position_es: 'Founder & CEO',
    position_en: 'Founder & CEO',
    photo_url: '/assets/images/team/bayron.png',
    order: 1,
  },
  {
    key: 'team-victor-hoyos',
    name: 'Victor Hoyos',
    position_es: 'Co-Founder & Director de Desarrollo de Negocios',
    position_en: 'Co-Founder & Business Development Director',
    photo_url: '/assets/images/team/victor.png',
    order: 2,
  },
  {
    key: 'team-angela-morales',
    name: 'Angela Morales',
    position_es: 'Directora de Finanzas y Administracion',
    position_en: 'Finance & Administrative Director',
    photo_url: '/assets/images/team/angela.png',
    order: 3,
  },
  {
    key: 'team-lucia-cardeno',
    name: 'Lucia Cardeno',
    position_es: 'Directora de Recursos Humanos',
    position_en: 'Human Resources Director',
    photo_url: '/assets/images/team/lucia.png',
    order: 4,
  },
  {
    key: 'team-dayana-lopez',
    name: 'Dayana Lopez',
    position_es: 'Directora de Proyectos',
    position_en: 'Project Director',
    photo_url: '/assets/images/team/dayana.png',
    order: 5,
  },
]

const partnersSeed = [
  {
    key: 'partner-microsoft',
    name: 'Microsoft',
    slug: 'microsoft',
    logo_url: '/assets/logos/partners/microsoft.png',
    featured: true,
    order: 1,
  },
  {
    key: 'partner-databricks',
    name: 'Databricks',
    slug: 'databricks',
    logo_url: '/assets/logos/partners/databricks.png',
    featured: true,
    order: 2,
  },
  {
    key: 'partner-td-synnex',
    name: 'TD SYNNEX',
    slug: 'td-synnex',
    logo_url: '/assets/logos/partners/td-synnex.png',
    featured: true,
    order: 3,
  },
]

const jobsSeed = [
  {
    key: 'job-senior-data-engineer',
    title_es: 'Data Engineer Senior',
    title_en: 'Senior Data Engineer',
    slug_es: 'data-engineer-senior',
    slug_en: 'senior-data-engineer',
    area_es: 'Ingeniería de Datos',
    area_en: 'Data Engineering',
    modality: 'remote',
    seniority: 'senior',
    location_es: 'Colombia / Remoto',
    location_en: 'Colombia / Remote',
    employment_type_es: 'Tiempo completo',
    employment_type_en: 'Full-time',
    summary_es: 'Buscamos un Data Engineer Senior para diseñar e implementar arquitecturas de datos escalables en la nube.',
    summary_en: 'We are looking for a Senior Data Engineer to design and implement scalable cloud data architectures.',
    overview_es: 'Como Data Engineer Senior en iData, serás responsable de diseñar, construir y mantener la infraestructura de datos que impulsa decisiones estratégicas para nuestros clientes.',
    overview_en: 'As a Senior Data Engineer at iData, you will design, build and maintain the data infrastructure that drives strategic decisions for our clients.',
    responsibilities_es: [
      'Diseñar e implementar pipelines de datos escalables y robustos',
      'Desarrollar arquitecturas de datos en la nube',
      'Optimizar el rendimiento de bases de datos y procesos ETL/ELT',
      'Colaborar con equipos de ciencia de datos y analítica',
    ],
    responsibilities_en: [
      'Design and implement scalable and robust data pipelines',
      'Develop cloud data architectures',
      'Optimize database and ETL/ELT performance',
      'Collaborate with data science and analytics teams',
    ],
    requirements_es: '5+ años de experiencia en ingeniería de datos\nSQL avanzado\nExperiencia con plataformas cloud',
    requirements_en: '5+ years of experience in data engineering\nAdvanced SQL\nExperience with cloud platforms',
    nice_to_have_es: 'Experiencia con Databricks, Snowflake o BigQuery\nCertificaciones cloud',
    nice_to_have_en: 'Experience with Databricks, Snowflake or BigQuery\nCloud certifications',
    benefits_es: 'Trabajo remoto 100%\nHorarios flexibles\nCapacitación y certificaciones',
    benefits_en: '100% remote work\nFlexible schedules\nTraining and certifications',
    salary_visible: true,
    salary_min: 4000,
    salary_max: 6000,
    currency: 'USD',
    publication_date: '2024-03-01',
    order: 1,
  },
  {
    key: 'job-data-scientist',
    title_es: 'Data Scientist',
    title_en: 'Data Scientist',
    slug_es: 'data-scientist',
    slug_en: 'data-scientist',
    area_es: 'Ciencia de Datos',
    area_en: 'Data Science',
    modality: 'hybrid',
    seniority: 'mid',
    location_es: 'Colombia / Híbrido',
    location_en: 'Colombia / Hybrid',
    employment_type_es: 'Tiempo completo',
    employment_type_en: 'Full-time',
    summary_es: 'Únete a nuestro equipo para desarrollar modelos de machine learning que impulsen decisiones estratégicas.',
    summary_en: 'Join our team to develop machine learning models that drive strategic decisions.',
    overview_es: 'Participarás en proyectos de analítica avanzada e inteligencia artificial para resolver desafíos de negocio de alto impacto.',
    overview_en: 'You will participate in advanced analytics and artificial intelligence projects to solve high-impact business challenges.',
    responsibilities_es: [
      'Desarrollar modelos predictivos y de machine learning',
      'Trabajar con equipos multidisciplinarios para llevar modelos a producción',
      'Comunicar hallazgos a stakeholders de negocio',
    ],
    responsibilities_en: [
      'Develop predictive and machine learning models',
      'Work with multidisciplinary teams to productionize models',
      'Communicate findings to business stakeholders',
    ],
    requirements_es: 'Experiencia en Python y ML\nConocimiento de estadística\nComunicación efectiva',
    requirements_en: 'Experience with Python and ML\nKnowledge of statistics\nStrong communication skills',
    nice_to_have_es: 'Experiencia con MLOps\nExperiencia en proyectos cloud',
    nice_to_have_en: 'Experience with MLOps\nExperience in cloud projects',
    benefits_es: 'Modalidad híbrida\nAprendizaje continuo\nProyectos regionales',
    benefits_en: 'Hybrid modality\nContinuous learning\nRegional projects',
    publication_date: '2024-03-05',
    order: 2,
  },
  {
    key: 'job-analytics-engineer',
    title_es: 'Analytics Engineer',
    title_en: 'Analytics Engineer',
    slug_es: 'analytics-engineer',
    slug_en: 'analytics-engineer',
    area_es: 'Analítica de Datos',
    area_en: 'Data Analytics',
    modality: 'remote',
    seniority: 'mid',
    location_es: 'Latam / Remoto',
    location_en: 'Latam / Remote',
    employment_type_es: 'Tiempo completo',
    employment_type_en: 'Full-time',
    summary_es: 'Construye pipelines de datos y dashboards que transformen datos en insights accionables.',
    summary_en: 'Build data pipelines and dashboards that transform data into actionable insights.',
    overview_es: 'Ayudarás a estructurar capas analíticas, métricas y modelos de datos que soporten decisiones rápidas y confiables.',
    overview_en: 'You will help structure analytics layers, metrics and data models that support fast and reliable decisions.',
    responsibilities_es: [
      'Construir modelos de datos para BI y analítica',
      'Diseñar dashboards y capas semánticas',
      'Asegurar calidad y consistencia de métricas',
    ],
    responsibilities_en: [
      'Build data models for BI and analytics',
      'Design dashboards and semantic layers',
      'Ensure metric quality and consistency',
    ],
    requirements_es: 'Experiencia con SQL\nExperiencia con herramientas BI\nPensamiento analítico',
    requirements_en: 'Experience with SQL\nExperience with BI tools\nAnalytical thinking',
    nice_to_have_es: 'Experiencia con dbt\nExperiencia con Modern Data Stack',
    nice_to_have_en: 'Experience with dbt\nExperience with the Modern Data Stack',
    benefits_es: 'Trabajo remoto\nFlexibilidad\nProyectos de transformación',
    benefits_en: 'Remote work\nFlexibility\nTransformation projects',
    publication_date: '2024-03-08',
    order: 3,
  },
]

const pagesSeed = [
  {
    key: 'page-home',
    slug: 'home',
    page_name: 'Home',
    route_es: '/es/',
    route_en: '/en/',
    title_es: 'iData - Transformacion Digital y Data Analytics | Consultoria Empresarial',
    title_en: 'iData - Digital Transformation & Data Analytics | Enterprise Consulting',
    description_es: 'Impulsamos la transformacion tecnologica de organizaciones lideres con soluciones end-to-end en datos, analitica avanzada e inteligencia artificial.',
    description_en: 'We drive technological transformation for leading organizations with end-to-end solutions in data, advanced analytics and artificial intelligence.',
  },
  {
    key: 'page-about',
    slug: 'about',
    page_name: 'About',
    route_es: '/es/nosotros/',
    route_en: '/en/about/',
    title_es: 'Nosotros - iData',
    title_en: 'About Us - iData',
    description_es: 'En iData Global transformamos datos en decisiones estrategicas, combinando inteligencia artificial, aprendizaje automatico y arquitectura en la nube.',
    description_en: 'At iData Global we transform data into strategic decisions through artificial intelligence, machine learning and cloud data architectures.',
  },
  {
    key: 'page-contact',
    slug: 'contact',
    page_name: 'Contact',
    route_es: '/es/contacto/',
    route_en: '/en/contact/',
    title_es: 'Contacto - iData',
    title_en: 'Contact - iData',
    description_es: 'Estamos listos para ayudarte a transformar tus datos en decisiones estrategicas.',
    description_en: 'We are ready to help you transform your data into strategic decisions.',
  },
  {
    key: 'page-careers',
    slug: 'careers',
    page_name: 'Careers',
    route_es: '/es/trabaja-con-nosotros/',
    route_en: '/en/work-with-us/',
    title_es: 'Trabaja con nosotros - iData',
    title_en: 'Work with us - iData',
    description_es: 'Unete a nuestro equipo de CoolStars y crece como experto en Data & AI.',
    description_en: 'Join our team of CoolStars and grow as a Data & AI expert.',
  },
  {
    key: 'page-services',
    slug: 'services',
    page_name: 'Services',
    route_es: '/es/servicios/',
    route_en: '/en/services/',
    title_es: 'Servicios - iData',
    title_en: 'Services - iData',
    description_es: 'Explora nuestras capacidades en estrategia, ingenieria, analitica avanzada y operaciones de datos.',
    description_en: 'Explore our capabilities across strategy, engineering, advanced analytics and data operations.',
  },
  {
    key: 'page-industries',
    slug: 'industries',
    page_name: 'Industries',
    route_es: '/es/industrias/',
    route_en: '/en/industries/',
    title_es: 'Industrias - iData',
    title_en: 'Industries - iData',
    description_es: 'Casos, soluciones y experiencia aplicada a industrias clave.',
    description_en: 'Cases, solutions and expertise applied to key industries.',
  },
  {
    key: 'page-case-studies',
    slug: 'case-studies',
    page_name: 'Case Studies',
    route_es: '/es/casos/',
    route_en: '/en/case-studies/',
    title_es: 'Casos de exito - iData',
    title_en: 'Case Studies - iData',
    description_es: 'Resultados reales de transformacion con datos, analitica e inteligencia artificial.',
    description_en: 'Real transformation outcomes powered by data, analytics and artificial intelligence.',
  },
  {
    key: 'page-insights',
    slug: 'insights',
    page_name: 'Insights',
    route_es: '/es/insights/',
    route_en: '/en/insights/',
    title_es: 'Insights - iData',
    title_en: 'Insights - iData',
    description_es: 'Ideas, tendencias y contenido editorial sobre datos y AI.',
    description_en: 'Ideas, trends and editorial content on data and AI.',
  },
  {
    key: 'page-resources',
    slug: 'resources',
    page_name: 'Resources',
    route_es: '/es/recursos/',
    route_en: '/en/resources/',
    title_es: 'Recursos - iData',
    title_en: 'Resources - iData',
    description_es: 'Biblioteca de recursos descargables sobre datos y analitica.',
    description_en: 'Library of downloadable resources on data and analytics.',
  },
]

const pageSectionSeeds = [
  {
    key: 'about-hero-es',
    page_slug: 'about',
    language: 'es',
    type: 'hero',
    order: 1,
    title: 'Nosotros',
    subtitle:
      'En iData Global transformamos datos en decisiones estrategicas, combinando inteligencia artificial, aprendizaje automatico y arquitectura en la nube para soluciones empresariales en tiempo real.',
    cta_label: 'Hablar con un experto',
    cta_href: '/es/contacto/',
    config: {
      secondaryCtaLabel: 'Ver casos de exito',
      secondaryCtaHref: '/es/casos/',
    },
  },
  {
    key: 'about-body-es',
    page_slug: 'about',
    language: 'es',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Transformamos datos en valor empresarial</h2><p>Ayudamos a las organizaciones a conectar estrategia, tecnologia y talento para convertir los datos en crecimiento medible. Nuestro enfoque combina consultoria, implementacion y evolucion continua.</p><h3>Lo que nos define</h3><ul><li>Vision regional con alcance global.</li><li>Equipos multidisciplinarios de datos, analitica e IA.</li><li>Experiencia construyendo plataformas, productos y capacidades empresariales.</li></ul>',
    },
  },
  {
    key: 'about-cta-es',
    page_slug: 'about',
    language: 'es',
    type: 'ctaBand',
    order: 3,
    title: 'Conoce como iData impulsa transformaciones reales',
    subtitle: 'Conversemos sobre tus retos de datos, analitica e inteligencia artificial.',
    cta_label: 'Contactar al equipo',
    cta_href: '/es/contacto/',
  },
  {
    key: 'about-hero-en',
    page_slug: 'about',
    language: 'en',
    type: 'hero',
    order: 1,
    title: 'About Us',
    subtitle:
      'At iData Global we transform data into strategic decisions through artificial intelligence, machine learning and cloud data architectures for real-time enterprise solutions.',
    cta_label: 'Talk to an expert',
    cta_href: '/en/contact/',
    config: {
      secondaryCtaLabel: 'View case studies',
      secondaryCtaHref: '/en/case-studies/',
    },
  },
  {
    key: 'about-body-en',
    page_slug: 'about',
    language: 'en',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>We turn data into business value</h2><p>We help organizations connect strategy, technology and talent to convert data into measurable growth. Our approach combines consulting, implementation and continuous evolution.</p><h3>What defines us</h3><ul><li>Regional vision with global reach.</li><li>Multidisciplinary teams in data, analytics and AI.</li><li>Experience building platforms, products and enterprise capabilities.</li></ul>',
    },
  },
  {
    key: 'about-cta-en',
    page_slug: 'about',
    language: 'en',
    type: 'ctaBand',
    order: 3,
    title: 'Discover how iData drives real transformation',
    subtitle: 'Let us talk about your data, analytics and artificial intelligence challenges.',
    cta_label: 'Contact the team',
    cta_href: '/en/contact/',
  },
  {
    key: 'contact-hero-es',
    page_slug: 'contact',
    language: 'es',
    type: 'hero',
    order: 1,
    title: 'Hablemos',
    subtitle: 'Estamos listos para ayudarte a transformar tus datos en decisiones estrategicas.',
    cta_label: 'Enviar mensaje',
    cta_href: '/es/contacto/',
  },
  {
    key: 'contact-body-es',
    page_slug: 'contact',
    language: 'es',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Canales de contacto</h2><p><strong>Email:</strong> info@idata.global<br /><strong>LATAM:</strong> (+57) 300 571 3092<br /><strong>USA:</strong> (+1) 303 901 9526</p><h3>Que puedes gestionar aqui</h3><ul><li>Proyectos de datos y analitica.</li><li>Servicios de IA y machine learning.</li><li>Arquitectura, gobierno y modernizacion de plataformas.</li></ul>',
    },
  },
  {
    key: 'contact-cta-es',
    page_slug: 'contact',
    language: 'es',
    type: 'ctaBand',
    order: 3,
    title: 'Cuéntanos tu reto',
    subtitle: 'Nuestro equipo comercial y consultivo puede orientarte desde la primera conversacion.',
    cta_label: 'Hablar con un experto',
    cta_href: '/es/contacto/',
  },
  {
    key: 'contact-hero-en',
    page_slug: 'contact',
    language: 'en',
    type: 'hero',
    order: 1,
    title: "Let's talk",
    subtitle: 'We are ready to help you transform your data into strategic decisions.',
    cta_label: 'Send message',
    cta_href: '/en/contact/',
  },
  {
    key: 'contact-body-en',
    page_slug: 'contact',
    language: 'en',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Contact channels</h2><p><strong>Email:</strong> info@idata.global<br /><strong>LATAM:</strong> (+57) 300 571 3092<br /><strong>USA:</strong> (+1) 303 901 9526</p><h3>What you can start here</h3><ul><li>Data and analytics initiatives.</li><li>AI and machine learning services.</li><li>Architecture, governance and platform modernization.</li></ul>',
    },
  },
  {
    key: 'contact-cta-en',
    page_slug: 'contact',
    language: 'en',
    type: 'ctaBand',
    order: 3,
    title: 'Tell us about your challenge',
    subtitle: 'Our commercial and consulting team can guide you from the first conversation.',
    cta_label: 'Talk to an expert',
    cta_href: '/en/contact/',
  },
  {
    key: 'careers-hero-es',
    page_slug: 'careers',
    language: 'es',
    type: 'hero',
    order: 1,
    title: 'Trabaja con nosotros',
    subtitle:
      'Unete a nuestro equipo de CoolStars y crece como experto en Data & AI, aportando a iniciativas de transformacion estrategica y digital.',
    cta_label: 'Ver vacantes',
    cta_href: '/es/trabaja-con-nosotros/ofertas/',
  },
  {
    key: 'careers-body-es',
    page_slug: 'careers',
    language: 'es',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Nuestra Cooltura</h2><p>En iData valoramos la innovacion, la empatia y la excelencia. Fomentamos un ambiente donde cada persona puede crecer, aprender continuamente y aportar a proyectos de impacto.</p><h3>Proceso de seleccion</h3><ol><li>Aplicacion</li><li>Revision de perfil</li><li>Entrevista</li><li>Evaluacion tecnica</li><li>Conversacion final</li><li>Oferta</li></ol>',
    },
  },
  {
    key: 'careers-cta-es',
    page_slug: 'careers',
    language: 'es',
    type: 'ctaBand',
    order: 3,
    title: 'Explora oportunidades en iData',
    subtitle: 'Conoce vacantes activas o comparte tu perfil para futuras oportunidades.',
    cta_label: 'Ir a vacantes',
    cta_href: '/es/trabaja-con-nosotros/ofertas/',
  },
  {
    key: 'careers-hero-en',
    page_slug: 'careers',
    language: 'en',
    type: 'hero',
    order: 1,
    title: 'Work with us',
    subtitle:
      'Join our CoolStars team and grow as a Data & AI expert while contributing to strategic and digital transformation initiatives.',
    cta_label: 'View jobs',
    cta_href: '/en/work-with-us/jobs/',
  },
  {
    key: 'careers-body-en',
    page_slug: 'careers',
    language: 'en',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Our Coolture</h2><p>At iData we value innovation, empathy and excellence. We foster an environment where each person can grow, learn continuously and contribute to impactful projects.</p><h3>Hiring process</h3><ol><li>Apply</li><li>Profile review</li><li>Interview</li><li>Technical assessment</li><li>Final conversation</li><li>Offer</li></ol>',
    },
  },
  {
    key: 'careers-cta-en',
    page_slug: 'careers',
    language: 'en',
    type: 'ctaBand',
    order: 3,
    title: 'Explore opportunities at iData',
    subtitle: 'Review active openings or share your profile for future opportunities.',
    cta_label: 'Go to jobs',
    cta_href: '/en/work-with-us/jobs/',
  },
  {
    key: 'services-hero-es',
    page_slug: 'services',
    language: 'es',
    type: 'hero',
    order: 1,
    title: 'Servicios de Datos, Analitica e Inteligencia Artificial',
    subtitle:
      'Impulsamos la evolucion tecnologica de las organizaciones con soluciones integrales en datos, analitica avanzada e inteligencia artificial.',
    cta_label: 'Hablar con un experto',
    cta_href: '/es/contacto/',
    config: {
      secondaryCtaLabel: 'Ver casos de exito',
      secondaryCtaHref: '/es/casos/',
    },
  },
  {
    key: 'services-body-es',
    page_slug: 'services',
    language: 'es',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Como trabajamos</h2><ol><li>Diagnostico</li><li>Diseno</li><li>Implementacion</li><li>Evolucion</li></ol><p>Esta pagina conecta con las capacidades, servicios y casos del sitio para mostrar la oferta actual de iData.</p>',
    },
  },
  {
    key: 'services-cta-es',
    page_slug: 'services',
    language: 'es',
    type: 'ctaBand',
    order: 3,
    title: 'Listo para evolucionar tu estrategia de datos',
    subtitle: 'Conecta con el equipo para definir una ruta de valor desde la estrategia hasta la operacion.',
    cta_label: 'Contactar',
    cta_href: '/es/contacto/',
  },
  {
    key: 'services-hero-en',
    page_slug: 'services',
    language: 'en',
    type: 'hero',
    order: 1,
    title: 'Data, Analytics and Artificial Intelligence Services',
    subtitle:
      'We drive the technological evolution of organizations with comprehensive solutions in data, advanced analytics and artificial intelligence.',
    cta_label: 'Talk to an expert',
    cta_href: '/en/contact/',
    config: {
      secondaryCtaLabel: 'View success stories',
      secondaryCtaHref: '/en/case-studies/',
    },
  },
  {
    key: 'services-body-en',
    page_slug: 'services',
    language: 'en',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>How we work</h2><ol><li>Diagnosis</li><li>Design</li><li>Implementation</li><li>Evolution</li></ol><p>This page connects with the site services, capabilities and case studies to present the current iData offer.</p>',
    },
  },
  {
    key: 'services-cta-en',
    page_slug: 'services',
    language: 'en',
    type: 'ctaBand',
    order: 3,
    title: 'Ready to evolve your data strategy',
    subtitle: 'Connect with the team to define a value roadmap from strategy to operation.',
    cta_label: 'Contact us',
    cta_href: '/en/contact/',
  },
  {
    key: 'industries-hero-es',
    page_slug: 'industries',
    language: 'es',
    type: 'hero',
    order: 1,
    title: 'Soluciones de datos para cada industria',
    subtitle:
      'Ayudamos a organizaciones de diferentes sectores a aprovechar sus datos para mejorar decisiones, optimizar operaciones y generar ventajas competitivas.',
    cta_label: 'Hablar con un experto',
    cta_href: '/es/contacto/',
  },
  {
    key: 'industries-body-es',
    page_slug: 'industries',
    language: 'es',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Experiencia multisector</h2><p>Trabajamos con organizaciones aplicando analitica avanzada, inteligencia artificial y plataformas de datos para resolver desafios reales del negocio.</p><p>La pagina actual del sitio enlaza a los detalles por industria disponibles en el catalogo publico.</p>',
    },
  },
  {
    key: 'industries-cta-es',
    page_slug: 'industries',
    language: 'es',
    type: 'ctaBand',
    order: 3,
    title: 'Listo para transformar tu industria con datos',
    subtitle: 'Conozcamos tu contexto y prioricemos los casos de uso con mayor impacto.',
    cta_label: 'Contactar',
    cta_href: '/es/contacto/',
  },
  {
    key: 'industries-hero-en',
    page_slug: 'industries',
    language: 'en',
    type: 'hero',
    order: 1,
    title: 'Data solutions for every industry',
    subtitle:
      'We help organizations across sectors use data to improve decision-making, optimize operations and unlock competitive advantages.',
    cta_label: 'Talk to an expert',
    cta_href: '/en/contact/',
  },
  {
    key: 'industries-body-en',
    page_slug: 'industries',
    language: 'en',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Cross-industry experience</h2><p>We work with organizations applying advanced analytics, artificial intelligence and data platforms to solve real business challenges.</p><p>The live page connects to the public industry detail catalog already available on the site.</p>',
    },
  },
  {
    key: 'industries-cta-en',
    page_slug: 'industries',
    language: 'en',
    type: 'ctaBand',
    order: 3,
    title: 'Ready to transform your industry with data',
    subtitle: 'Let us understand your context and prioritize the highest-impact use cases.',
    cta_label: 'Contact us',
    cta_href: '/en/contact/',
  },
  {
    key: 'case-studies-hero-es',
    page_slug: 'case-studies',
    language: 'es',
    type: 'hero',
    order: 1,
    title: 'Casos de exito en analitica y datos',
    subtitle:
      'Descubre como ayudamos a organizaciones de distintas industrias a transformar sus datos en resultados medibles y ventajas competitivas.',
    cta_label: 'Ver casos',
    cta_href: '/es/casos/',
  },
  {
    key: 'case-studies-body-es',
    page_slug: 'case-studies',
    language: 'es',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Como generamos impacto</h2><ol><li>Entendimiento del negocio</li><li>Diseno de la solucion de datos</li><li>Implementacion tecnologica</li><li>Resultados y evolucion</li></ol><p>La pagina publica enlaza a casos individuales y resultados por cliente.</p>',
    },
  },
  {
    key: 'case-studies-cta-es',
    page_slug: 'case-studies',
    language: 'es',
    type: 'ctaBand',
    order: 3,
    title: 'Listo para generar resultados con tus datos',
    subtitle: 'Inicia una conversacion con nuestros expertos para construir tu proximo caso de exito.',
    cta_label: 'Hablar con un experto',
    cta_href: '/es/contacto/',
  },
  {
    key: 'case-studies-hero-en',
    page_slug: 'case-studies',
    language: 'en',
    type: 'hero',
    order: 1,
    title: 'Data & Analytics Success Stories',
    subtitle:
      'Discover how we help organizations across industries transform their data into measurable results and competitive advantage.',
    cta_label: 'View case studies',
    cta_href: '/en/case-studies/',
  },
  {
    key: 'case-studies-body-en',
    page_slug: 'case-studies',
    language: 'en',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>How we generate impact</h2><ol><li>Business understanding</li><li>Data solution design</li><li>Technology implementation</li><li>Results and evolution</li></ol><p>The public page links to individual case studies and client outcomes.</p>',
    },
  },
  {
    key: 'case-studies-cta-en',
    page_slug: 'case-studies',
    language: 'en',
    type: 'ctaBand',
    order: 3,
    title: 'Ready to generate results with your data',
    subtitle: 'Start a conversation with our experts to build your next success story.',
    cta_label: 'Talk to an expert',
    cta_href: '/en/contact/',
  },
  {
    key: 'insights-hero-es',
    page_slug: 'insights',
    language: 'es',
    type: 'hero',
    order: 1,
    title: 'Insights',
    subtitle: 'Ideas, tendencias y experiencias sobre datos, analitica e inteligencia artificial.',
    cta_label: 'Explorar articulos',
    cta_href: '/es/insights/',
  },
  {
    key: 'insights-body-es',
    page_slug: 'insights',
    language: 'es',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Contenido editorial</h2><p>Esta pagina centraliza articulos, categorias y busqueda para que el equipo pueda publicar contenido estrategico y mantener visible la experiencia editorial actual del sitio.</p>',
    },
  },
  {
    key: 'insights-cta-es',
    page_slug: 'insights',
    language: 'es',
    type: 'ctaBand',
    order: 3,
    title: 'Convierte conocimiento en accion',
    subtitle: 'Descubre articulos, tendencias y puntos de vista sobre el futuro de los datos y la IA.',
    cta_label: 'Ver insights',
    cta_href: '/es/insights/',
  },
  {
    key: 'insights-hero-en',
    page_slug: 'insights',
    language: 'en',
    type: 'hero',
    order: 1,
    title: 'Insights',
    subtitle: 'Ideas, trends and experiences about data, analytics and artificial intelligence.',
    cta_label: 'Explore articles',
    cta_href: '/en/insights/',
  },
  {
    key: 'insights-body-en',
    page_slug: 'insights',
    language: 'en',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Editorial content</h2><p>This page brings together articles, categories and search so the team can publish strategic content while preserving the current editorial experience already live on the site.</p>',
    },
  },
  {
    key: 'insights-cta-en',
    page_slug: 'insights',
    language: 'en',
    type: 'ctaBand',
    order: 3,
    title: 'Turn knowledge into action',
    subtitle: 'Explore articles, trends and points of view about the future of data and AI.',
    cta_label: 'View insights',
    cta_href: '/en/insights/',
  },
  {
    key: 'resources-hero-es',
    page_slug: 'resources',
    language: 'es',
    type: 'hero',
    order: 1,
    title: 'Recursos',
    subtitle: 'Explora nuestra biblioteca de recursos gratuitos sobre datos y analitica.',
    cta_label: 'Ver recursos',
    cta_href: '/es/recursos/',
  },
  {
    key: 'resources-body-es',
    page_slug: 'resources',
    language: 'es',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Biblioteca de recursos</h2><p>Desde esta pagina el equipo puede promover ebooks, whitepapers, guias y piezas descargables relacionadas con datos, analitica e inteligencia artificial.</p>',
    },
  },
  {
    key: 'resources-cta-es',
    page_slug: 'resources',
    language: 'es',
    type: 'ctaBand',
    order: 3,
    title: 'Descarga recursos y comparte valor',
    subtitle: 'Mantiene visible la biblioteca actual del sitio mientras preparas futuras actualizaciones desde el admin.',
    cta_label: 'Ir a recursos',
    cta_href: '/es/recursos/',
  },
  {
    key: 'resources-hero-en',
    page_slug: 'resources',
    language: 'en',
    type: 'hero',
    order: 1,
    title: 'Resources',
    subtitle: 'Explore our library of free resources about data and analytics.',
    cta_label: 'View resources',
    cta_href: '/en/resources/',
  },
  {
    key: 'resources-body-en',
    page_slug: 'resources',
    language: 'en',
    type: 'custom',
    order: 2,
    content: {
      html:
        '<h2>Resource library</h2><p>This page lets the team promote ebooks, whitepapers, guides and downloadable assets related to data, analytics and artificial intelligence.</p>',
    },
  },
  {
    key: 'resources-cta-en',
    page_slug: 'resources',
    language: 'en',
    type: 'ctaBand',
    order: 3,
    title: 'Download resources and share value',
    subtitle: 'Keep the current resource library visible while you prepare future updates from the admin.',
    cta_label: 'Go to resources',
    cta_href: '/en/resources/',
  },
]

const homeEditorialBlogPosts = [
  {
    key: 'blog-home-data-governance',
    title_es: 'Data Governance: Mejores Prácticas',
    title_en: 'Data Governance: Best Practices',
    slug_es: 'data-governance-mejores-practicas',
    slug_en: 'data-governance-best-practices',
    excerpt_es: 'Cómo implementar un framework efectivo de gobierno de datos en organizaciones modernas.',
    excerpt_en: 'How to implement an effective data governance framework in modern organizations.',
  },
  {
    key: 'blog-home-modern-data-architectures',
    title_es: 'Arquitecturas Modernas de Datos',
    title_en: 'Modern Data Architectures',
    slug_es: 'arquitecturas-modernas-de-datos',
    slug_en: 'modern-data-architectures',
    excerpt_es: 'Principios clave para diseñar arquitecturas de datos escalables en entornos cloud.',
    excerpt_en: 'Key principles for designing scalable data architectures in cloud environments.',
  },
  {
    key: 'blog-home-future-data-analytics',
    title_es: 'El Futuro de la Analítica de Datos',
    title_en: 'The Future of Data Analytics',
    slug_es: 'el-futuro-de-la-analitica-de-datos',
    slug_en: 'the-future-of-data-analytics',
    excerpt_es: 'Exploramos cómo la analítica avanzada y la inteligencia artificial están redefiniendo la toma de decisiones empresariales.',
    excerpt_en: 'Exploring how advanced analytics and artificial intelligence are redefining business decision-making.',
    featured_image:
      'https://images.unsplash.com/photo-1761912149936-8f662fc2a13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZnV0dXJpc3RpYyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMDc5MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    key: 'blog-home-generative-ai-use-cases',
    title_es: 'IA Generativa en Empresas: Casos de Uso Reales',
    title_en: 'Generative AI in Business: Real Use Cases',
    slug_es: 'ia-generativa-casos-de-uso',
    slug_en: 'generative-ai-use-cases',
    excerpt_es: 'Aplicaciones prácticas de la inteligencia artificial generativa en empresas.',
    excerpt_en: 'Practical applications of generative artificial intelligence in companies.',
  },
]

const clientLogoByCaseSlug: Record<string, string> = {
  ins: '/assets/logos/clients/ins.png',
  'cueros-velez': '/assets/logos/clients/velez.png',
  jfk: '/assets/logos/clients/jfk.png',
  haceb: '/assets/logos/clients/haceb.png',
  nadro: '/assets/logos/clients/nadro.png',
  'davis-direction-foundation': '/assets/logos/clients/davis.png',
}

const coverImageByCaseSlug: Record<string, string> = {
  ins: '/assets/images/case-studies/ins-hero.png',
  'cueros-velez':
    'https://images.unsplash.com/photo-1768550005921-8782adcb798c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwZmFjdG9yeSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzczMDc3NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  jfk: '/assets/images/case-studies/data-architecture-hero.png',
  haceb: '/assets/images/case-studies/haceb-hero.png',
  nadro:
    'https://images.unsplash.com/photo-1641561421189-a6bf2fd5ca10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxvZ2lzdGljcyUyMG1vZGVybnxlbnwxfHx8fDE3NzMwNzc1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'davis-direction-foundation':
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzb2NpYWwlMjBwcm9ncmFtfGVufDF8fHx8MTczMzA3NzUzOXww&ixlib=rb-4.1.0&q=80&w=1080',
}

function buildServiceRows() {
  return serviceSeed.map((service) => ({
    id: deterministicUUID(service.key),
    language: 'en',
    status: 'published',
    title: service.title_en,
    slug: service.slug,
    excerpt: service.excerpt_en,
    content: service.content_en,
    seo_title: `${service.title_en} - iData`,
    seo_description: service.excerpt_en,
    order: service.order,
    title_es: service.title_es,
    title_en: service.title_en,
    slug_es: service.slug,
    slug_en: service.slug,
    excerpt_es: service.excerpt_es,
    excerpt_en: service.excerpt_en,
    content_es: service.content_es,
    content_en: service.content_en,
    featured_image: service.hero_image,
    hero_image: service.hero_image,
    capabilities: service.capabilities,
    benefits: service.benefits,
    technologies: service.technologies,
    related_case_studies: service.related_case_studies,
    featured: service.order <= 3,
  }))
}

function buildCaseStudyRows() {
  return mockCaseStudies.map((caseStudy) => ({
    id: deterministicUUID(`case-study-${caseStudy.slug_en}`),
    language: 'en',
    status: caseStudy.status,
    title: caseStudy.title_en,
    slug: caseStudy.slug_en,
    excerpt: caseStudy.excerpt_en,
    content: caseStudy.content_en,
    seo_title: caseStudy.seo_en?.metaTitle,
    seo_description: caseStudy.seo_en?.metaDescription,
    order: caseStudy.order,
    client: caseStudy.client,
    title_es: caseStudy.title_es,
    title_en: caseStudy.title_en,
    slug_es: caseStudy.slug_es,
    slug_en: caseStudy.slug_en,
    excerpt_es: caseStudy.excerpt_es,
    excerpt_en: caseStudy.excerpt_en,
    content_es: caseStudy.content_es,
    content_en: caseStudy.content_en,
    challenge_es: caseStudy.challenge_es,
    challenge_en: caseStudy.challenge_en,
    solution_es: caseStudy.solution_es,
    solution_en: caseStudy.solution_en,
    results_es: caseStudy.results_es,
    results_en: caseStudy.results_en,
    cover_image: coverImageByCaseSlug[caseStudy.slug_en] || null,
    client_logo_url: clientLogoByCaseSlug[caseStudy.slug_en] || null,
    featured: caseStudy.featured,
    published_date: caseStudy.publishedDate,
    seo_es: caseStudy.seo_es,
    seo_en: caseStudy.seo_en,
  }))
}

function buildTeamMemberRows() {
  return teamMembersSeed.map((member) => ({
    id: deterministicUUID(member.key),
    name: member.name,
    position_es: member.position_es,
    position_en: member.position_en,
    photo_url: member.photo_url,
    order: member.order,
    status: 'published',
    featured: true,
  }))
}

function buildPartnerRows() {
  return partnersSeed.map((partner) => ({
    id: deterministicUUID(partner.key),
    name: partner.name,
    slug: partner.slug,
    logo_url: partner.logo_url,
    featured: partner.featured,
    order: partner.order,
    status: 'published',
  }))
}

function buildIndustryRows() {
  return mockIndustries.map((industry) => ({
    id: industry.id,
    title_es: industry.title_es,
    title_en: industry.title_en,
    slug_es: industry.slug_es,
    slug_en: industry.slug_en,
    description_es: industry.excerpt_es,
    description_en: industry.excerpt_en,
    excerpt_es: industry.excerpt_es,
    excerpt_en: industry.excerpt_en,
    content_es: industry.content_es,
    content_en: industry.content_en,
    challenges_es: industry.challenges_es,
    challenges_en: industry.challenges_en,
    value_es: industry.value_es,
    value_en: industry.value_en,
    seo_es: industry.seo_es,
    seo_en: industry.seo_en,
    featured_image: null,
    order: industry.order,
    status: industry.status,
    updated_at: industry.updatedAt ?? null,
  }))
}

function buildServiceCategoryRows() {
  return mockServiceCategories.map((category) => ({
    id: category.id,
    title_es: category.title_es,
    title_en: category.title_en,
    slug_es: category.slug_es,
    slug_en: category.slug_en,
    description_es: category.description_es,
    description_en: category.description_en,
    order: category.order,
    status: category.status,
    category_slug: category.categorySlug,
    seo_es: category.seo_es,
    seo_en: category.seo_en,
    updated_at: category.updatedAt ?? null,
  }))
}

function buildBlogCategoryRows() {
  const derivedCategories = [
    ...mockBlogCategories,
    {
      id: 'blog-cat-2',
      title_es: 'Arquitectura de Datos',
      title_en: 'Data Architecture',
      slug_es: 'arquitectura-datos',
      slug_en: 'data-architecture',
      description_es: 'Artículos sobre arquitectura de datos moderna',
      description_en: 'Articles about modern data architecture',
      order: 2,
      status: 'published',
    },
    {
      id: 'blog-cat-3',
      title_es: 'Inteligencia Artificial',
      title_en: 'Artificial Intelligence',
      slug_es: 'inteligencia-artificial',
      slug_en: 'artificial-intelligence',
      description_es: 'Artículos sobre IA aplicada al negocio',
      description_en: 'Articles about AI applied to business',
      order: 3,
      status: 'published',
    },
    {
      id: 'blog-cat-4',
      title_es: 'Gobierno de Datos',
      title_en: 'Data Governance',
      slug_es: 'gobierno-datos',
      slug_en: 'data-governance',
      description_es: 'Artículos sobre gobierno, calidad y cumplimiento',
      description_en: 'Articles about governance, quality and compliance',
      order: 4,
      status: 'published',
    },
    {
      id: 'blog-cat-5',
      title_es: 'Cloud y Optimizacion',
      title_en: 'Cloud and Optimization',
      slug_es: 'cloud-optimizacion',
      slug_en: 'cloud-optimization',
      description_es: 'Artículos sobre cloud, costos y performance',
      description_en: 'Articles about cloud, costs and performance',
      order: 5,
      status: 'published',
    },
  ]

  return derivedCategories.map((category: any) => ({
    id: category.id,
    title_es: category.title_es,
    title_en: category.title_en,
    slug_es: category.slug_es,
    slug_en: category.slug_en,
    description_es: category.description_es,
    description_en: category.description_en,
    order: category.order,
    status: category.status,
    seo_es: category.seo_es ?? null,
    seo_en: category.seo_en ?? null,
    updated_at: category.updatedAt ?? null,
  }))
}

function buildHomeSectionRows() {
  const homeRows = mockHomeSections.map((section) => ({
    id: section.id,
    page_slug: 'home',
    language: section.language,
    type: section.type,
    is_enabled: section.isEnabled,
    order: section.order,
    title: section.title ?? null,
    subtitle: section.subtitle ?? null,
    cta_label: section.ctaLabel ?? null,
    cta_href: section.ctaHref ?? null,
    referenced_ids: section.referencedIds ?? null,
    content: section.content ?? null,
    config: section.config ?? null,
    updated_at: section.updatedAt ?? null,
  }))

  const pageRows = pageSectionSeeds.map((section) => ({
    id: deterministicUUID(`page-section-${section.key}`),
    page_slug: section.page_slug,
    language: section.language,
    type: section.type,
    is_enabled: true,
    order: section.order,
    title: section.title ?? null,
    subtitle: section.subtitle ?? null,
    cta_label: section.cta_label ?? null,
    cta_href: section.cta_href ?? null,
    referenced_ids: null,
    content: section.content ?? null,
    config: section.config ?? null,
    updated_at: null,
  }))

  return [...homeRows, ...pageRows]
}

function buildSitePageRows() {
  return pagesSeed.map((page) => ({
    slug: page.slug,
    page_name: page.page_name,
    route_es: page.route_es,
    route_en: page.route_en,
    is_visible: true,
    status: 'published',
    updated_at: null,
  }))
}

function buildPageRows() {
  return pagesSeed.flatMap((page) => ([
    {
      slug: page.slug,
      language: 'es',
      title: page.title_es,
      description: page.description_es,
    },
    {
      slug: page.slug,
      language: 'en',
      title: page.title_en,
      description: page.description_en,
    },
  ]))
}

function buildJobRows() {
  return jobsSeed.map((job) => ({
    id: deterministicUUID(job.key),
    language: 'en',
    status: 'published',
    title: job.title_en,
    slug: job.slug_en,
    excerpt: job.summary_en,
    content: job.summary_en,
    seo_title: `${job.title_en} - iData`,
    seo_description: job.summary_en,
    featured: false,
    published_date: job.publication_date,
    order: job.order,
    location: job.location_en,
    type: job.employment_type_en,
    title_es: job.title_es,
    title_en: job.title_en,
    slug_es: job.slug_es,
    slug_en: job.slug_en,
    excerpt_es: job.summary_es,
    excerpt_en: job.summary_en,
    department_es: job.area_es,
    department_en: job.area_en,
    location_es: job.location_es,
    location_en: job.location_en,
    type_es: job.employment_type_es,
    type_en: job.employment_type_en,
    description_es: job.summary_es,
    description_en: job.summary_en,
    overview_es: job.overview_es ?? job.summary_es,
    overview_en: job.overview_en ?? job.summary_en,
    responsibilities_es: job.responsibilities_es ?? [],
    responsibilities_en: job.responsibilities_en ?? [],
    requirements_es: job.requirements_es ?? null,
    requirements_en: job.requirements_en ?? null,
    nice_to_have_es: normalizeLineArray(job.nice_to_have_es),
    nice_to_have_en: normalizeLineArray(job.nice_to_have_en),
    benefits_es: job.benefits_es ?? null,
    benefits_en: job.benefits_en ?? null,
    modality: job.modality ?? null,
    seniority: job.seniority ?? null,
    salary_visible: job.salary_visible ?? false,
    salary_min: job.salary_min ?? null,
    salary_max: job.salary_max ?? null,
    currency: job.currency ?? null,
    active: true,
  }))
}

function buildResourceRows() {
  return mockResources.map((resource) => ({
    id: resource.id,
    title_es: resource.title_es,
    title_en: resource.title_en,
    slug_es: resource.slug_es,
    slug_en: resource.slug_en,
    type_es: resource.type_es ?? null,
    type_en: resource.type_en ?? null,
    description_es: resource.description_es ?? null,
    description_en: resource.description_en ?? null,
    content_es: resource.content_es ?? null,
    content_en: resource.content_en ?? null,
    featured_image: resource.featuredImage ?? null,
    download_url: resource.downloadUrl ?? null,
    file_url: resource.downloadUrl ?? null,
    file_type: resource.type_en ?? resource.type_es ?? null,
    featured: resource.featured ?? false,
    published_date: resource.publishedDate ?? null,
    order: resource.order ?? 0,
    status: resource.status,
    updated_at: resource.updatedAt ?? null,
  }))
}

function buildTestimonialRows() {
  return mockTestimonials.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.clientName,
    client_name: testimonial.clientName,
    client_position_es: testimonial.clientPosition_es ?? null,
    client_position_en: testimonial.clientPosition_en ?? null,
    client_company: testimonial.clientCompany ?? null,
    company: testimonial.clientCompany ?? null,
    quote_es: testimonial.quote_es,
    quote_en: testimonial.quote_en,
    content_es: testimonial.quote_es,
    content_en: testimonial.quote_en,
    photo_url: testimonial.photo ?? null,
    rating: null,
    order: testimonial.order ?? 0,
    status: testimonial.status,
    updated_at: testimonial.createdAt ?? null,
  }))
}

function buildBlogPostRows() {
  const insightRows = mockInsights.map((post) => ({
    id: deterministicUUID(`blog-post-${post.slug_en}`),
    language: 'en',
    status: post.status,
    title: post.title_en,
    slug: post.slug_en,
    excerpt: post.excerpt_en,
    content: post.content_en,
    seo_title: post.seo_en?.metaTitle,
    seo_description: post.seo_en?.metaDescription,
    featured: post.featured,
    published_date: post.publishedDate,
    title_es: post.title_es,
    title_en: post.title_en,
    slug_es: post.slug_es,
    slug_en: post.slug_en,
    excerpt_es: post.excerpt_es,
    excerpt_en: post.excerpt_en,
    content_es: post.content_es,
    content_en: post.content_en,
    author: post.author,
    featured_image: post.featuredImage,
    seo_es: post.seo_es,
    seo_en: post.seo_en,
    read_time: post.readTime ?? post.readingTime ?? null,
    tags: post.tags ?? [],
    display_variant: (post as any).displayVariant ?? null,
    content_blocks: (post as any).content_blocks ?? null,
  }))

  const editorialRows = homeEditorialBlogPosts.map((post, index) => ({
    id: deterministicUUID(post.key),
    language: 'en',
    status: 'published',
    title: post.title_en,
    slug: post.slug_en,
    excerpt: post.excerpt_en,
    content: post.excerpt_en,
    seo_title: `${post.title_en} - iData`,
    seo_description: post.excerpt_en,
    featured: post.featured ?? false,
    published_date: `2025-03-${String(20 + index).padStart(2, '0')}`,
    title_es: post.title_es,
    title_en: post.title_en,
    slug_es: post.slug_es,
    slug_en: post.slug_en,
    excerpt_es: post.excerpt_es,
    excerpt_en: post.excerpt_en,
    content_es: post.excerpt_es,
    content_en: post.excerpt_en,
    featured_image: post.featured_image ?? null,
    read_time: null,
    tags: [],
    display_variant: null,
    content_blocks: null,
  }))

  return [...insightRows, ...editorialRows]
}

async function seedServices() {
  await reseedTable('services', buildServiceRows())
  console.log('✔ services')
}

async function seedCaseStudies() {
  await reseedTable('case_studies', buildCaseStudyRows())
  console.log('✔ case_studies')
}

async function seedTeamMembers() {
  await reseedTable('team_members', buildTeamMemberRows())
  console.log('✔ team_members')
}

async function seedPartners() {
  await reseedTable('partners', buildPartnerRows())
  console.log('✔ partners')
}

async function seedIndustries() {
  await reseedTable('industries', buildIndustryRows())
  console.log('✔ industries')
}

async function seedServiceCategories() {
  await reseedTable('service_categories', buildServiceCategoryRows())
  console.log('✔ service_categories')
}

async function seedBlogCategories() {
  await reseedTable('blog_categories', buildBlogCategoryRows())
  console.log('✔ blog_categories')
}

async function seedBlogPosts() {
  await reseedTable('blog_posts', buildBlogPostRows())
  console.log('✔ blog_posts')
}

async function seedJobs() {
  await reseedTable('jobs', buildJobRows())
  console.log('✔ jobs')
}

async function seedResources() {
  await reseedTable('resources', buildResourceRows())
  console.log('✔ resources')
}

async function seedTestimonials() {
  await reseedTable('testimonials', buildTestimonialRows())
  console.log('✔ testimonials')
}

async function seedHomeSections() {
  await reseedTable('home_sections', buildHomeSectionRows())
  console.log('✔ home_sections')
}

async function seedSitePages() {
  await reseedTable('site_pages', buildSitePageRows())
  console.log('✔ site_pages')
}

async function seedPages() {
  const rows = buildPageRows()
  const { error: deleteError } = await supabase
    .from('seo_pages')
    .delete()
    .in('slug', pagesSeed.map((page) => page.slug))
  if (deleteError) throw deleteError

  const { error: insertError } = await supabase
    .from('seo_pages')
    .insert(rows)

  if (insertError) {
    const isLegacySlugUnique =
      insertError.code === '23505' &&
      (insertError.message || '').includes('seo_pages_slug_key')

    if (!isLegacySlugUnique) throw insertError

    const legacyRows = pagesSeed.map((page) => ({
      slug: page.slug,
      language: 'es',
      title: page.title_es,
      description: page.description_es,
    }))

    const { error: legacyInsertError } = await supabase
      .from('seo_pages')
      .upsert(legacyRows, { onConflict: 'slug' })

    if (legacyInsertError) throw legacyInsertError
  }

  console.log('✔ seo_pages')
}

async function main() {
  try {
    await seedServices()
    await seedCaseStudies()
    await seedTeamMembers()
    await seedPartners()
    await seedIndustries()
    await seedServiceCategories()
    await seedBlogCategories()
    await seedBlogPosts()
    await seedJobs()
    await seedResources()
    await seedTestimonials()
    await seedHomeSections()
    await seedSitePages()
    await seedPages()
    console.log('Seed completed successfully.')
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }
}

main()
