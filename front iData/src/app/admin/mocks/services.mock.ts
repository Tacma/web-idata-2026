import type { Service } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    slug: 'data-analytics',
    title_es: 'Data Analytics',
    title_en: 'Data Analytics',
    slug_es: 'data-analytics',
    slug_en: 'data-analytics',
    summary_es: 'Transformamos datos en decisiones estratégicas',
    summary_en: 'We transform data into strategic decisions',
    description_es: 'Soluciones avanzadas de análisis de datos para impulsar tu negocio.',
    description_en: 'Advanced data analytics solutions to drive your business forward.',
    icon: 'BarChart',
    hero_image: '/images/services/data-analytics.jpg',
    hero_content: {
      es: {
        title: 'Data Analytics',
        subtitle: 'Transformamos datos en valor',
        description: 'Soluciones avanzadas de análisis de datos',
        cta_label: 'Conocer más',
        cta_url: '/es/contacto'
      },
      en: {
        title: 'Data Analytics',
        subtitle: 'We transform data into value',
        description: 'Advanced data analytics solutions',
        cta_label: 'Learn more',
        cta_url: '/en/contact'
      }
    },
    content_blocks: [],
    features: {
      es: [
        { title: 'Visualización avanzada', description: 'Dashboards interactivos' },
        { title: 'Análisis predictivo', description: 'Machine Learning' }
      ],
      en: [
        { title: 'Advanced visualization', description: 'Interactive dashboards' },
        { title: 'Predictive analytics', description: 'Machine Learning' }
      ]
    },
    benefits: {
      es: [
        { title: 'Mejora en toma de decisiones', description: 'Datos en tiempo real' }
      ],
      en: [
        { title: 'Better decision making', description: 'Real-time data' }
      ]
    },
    cta_config: {
      enabled: true,
      label_es: 'Solicitar consulta',
      label_en: 'Request consultation',
      destination: 'contact',
      intent: 'data-analytics-inquiry'
    },
    contact_prefill_config: {
      project_type: 'data-analytics',
      message_template_es: 'Hola, estoy interesado en servicios de Data Analytics',
      message_template_en: 'Hello, I am interested in Data Analytics services'
    },
    status: 'published',
    featured: true,
    order: 1,
    seo: {
      seo_title_es: 'Data Analytics - iData Global',
      seo_title_en: 'Data Analytics - iData Global',
      seo_description_es: 'Transformamos datos en decisiones estratégicas con nuestras soluciones avanzadas de Data Analytics.',
      seo_description_en: 'We transform data into strategic decisions with our advanced Data Analytics solutions.',
      robots_index: true,
      robots_follow: true
    },
    market_visibility: {
      visibility_mode: 'all'
    },
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-03-10T14:30:00Z'
  },
  {
    id: '2',
    slug: 'ai-ml',
    title_es: 'Inteligencia Artificial y ML',
    title_en: 'Artificial Intelligence & ML',
    slug_es: 'inteligencia-artificial',
    slug_en: 'artificial-intelligence',
    summary_es: 'Soluciones de IA y Machine Learning personalizadas',
    summary_en: 'Custom AI and Machine Learning solutions',
    description_es: 'Implementamos soluciones de inteligencia artificial adaptadas a tu negocio.',
    description_en: 'We implement AI solutions tailored to your business needs.',
    icon: 'Brain',
    hero_image: '/images/services/ai-ml.jpg',
    hero_content: {
      es: {
        title: 'IA & Machine Learning',
        subtitle: 'Automatiza e innova',
        description: 'Soluciones inteligentes para tu empresa'
      },
      en: {
        title: 'AI & Machine Learning',
        subtitle: 'Automate and innovate',
        description: 'Intelligent solutions for your business'
      }
    },
    content_blocks: [],
    features: {
      es: [
        { title: 'Modelos predictivos', description: 'ML personalizado' },
        { title: 'NLP', description: 'Procesamiento de lenguaje natural' }
      ],
      en: [
        { title: 'Predictive models', description: 'Custom ML' },
        { title: 'NLP', description: 'Natural language processing' }
      ]
    },
    benefits: {
      es: [
        { title: 'Automatización', description: 'Reduce costos operativos' }
      ],
      en: [
        { title: 'Automation', description: 'Reduce operational costs' }
      ]
    },
    cta_config: {
      enabled: true,
      label_es: 'Explorar IA',
      label_en: 'Explore AI',
      destination: 'contact'
    },
    contact_prefill_config: {
      project_type: 'ai-ml'
    },
    status: 'published',
    featured: true,
    order: 2,
    seo: {
      seo_title_es: 'Inteligencia Artificial - iData Global',
      seo_title_en: 'Artificial Intelligence - iData Global',
      seo_description_es: 'Soluciones de IA y Machine Learning para transformar tu negocio.',
      seo_description_en: 'AI and Machine Learning solutions to transform your business.',
      robots_index: true,
      robots_follow: true
    },
    market_visibility: {
      visibility_mode: 'all'
    },
    created_at: '2026-01-16T10:00:00Z',
    updated_at: '2026-03-11T09:15:00Z'
  },
  {
    id: '3',
    slug: 'data-engineering',
    title_es: 'Data Engineering',
    title_en: 'Data Engineering',
    slug_es: 'data-engineering',
    slug_en: 'data-engineering',
    summary_es: 'Infraestructura de datos escalable y eficiente',
    summary_en: 'Scalable and efficient data infrastructure',
    description_es: 'Construimos pipelines de datos robustos y escalables.',
    description_en: 'We build robust and scalable data pipelines.',
    icon: 'Database',
    hero_content: {
      es: { title: 'Data Engineering', description: 'Infraestructura de datos moderna' },
      en: { title: 'Data Engineering', description: 'Modern data infrastructure' }
    },
    content_blocks: [],
    features: { es: [], en: [] },
    benefits: { es: [], en: [] },
    cta_config: {
      enabled: true,
      label_es: 'Consultar',
      label_en: 'Inquire',
      destination: 'contact'
    },
    contact_prefill_config: {},
    status: 'published',
    featured: false,
    order: 3,
    seo: {
      seo_title_es: 'Data Engineering - iData Global',
      seo_title_en: 'Data Engineering - iData Global',
      seo_description_es: 'Infraestructura de datos escalable para tu empresa.',
      seo_description_en: 'Scalable data infrastructure for your business.',
      robots_index: true,
      robots_follow: true
    },
    market_visibility: {
      visibility_mode: 'all'
    },
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-03-12T11:00:00Z'
  }
];
