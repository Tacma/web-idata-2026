export type DiscoveryCaseType = 'real' | 'placeholder';

export interface TechnologyTagDefinition {
  id: string;
  label_es: string;
  label_en: string;
}

export interface IndustryDiscoverySeed {
  id: string;
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
  challenges_es: string[];
  challenges_en: string[];
  value_es: string[];
  value_en: string[];
  discovery_description_es: string;
  discovery_description_en: string;
  solution_tags: string[];
  order: number;
  status: 'draft' | 'published' | 'archived';
}

export interface CaseStudyDiscoverySeed {
  id: string;
  client: string;
  industry_id: string;
  related_industries?: string[];
  service_ids?: string[];
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  excerpt_es: string;
  excerpt_en: string;
  discovery_summary_es: string;
  discovery_summary_en: string;
  challenge_es: string;
  challenge_en: string;
  solution_es: string;
  solution_en: string;
  results_es: string;
  results_en: string;
  cover_image?: string | null;
  client_logo_url?: string | null;
  technology_tags: string[];
  case_type: DiscoveryCaseType;
  featured: boolean;
  order: number;
  status: 'draft' | 'published' | 'archived';
  published_date?: string | null;
}

const genericCaseCover = '/assets/images/hero/case-studies-index.png';

export const technologyTagCatalog: TechnologyTagDefinition[] = [
  { id: 'data-strategy', label_es: 'Data Strategy', label_en: 'Data Strategy' },
  { id: 'data-engineering', label_es: 'Data Engineering', label_en: 'Data Engineering' },
  { id: 'data-science-ai', label_es: 'Data Science & AI', label_en: 'Data Science & AI' },
  { id: 'business-intelligence', label_es: 'Business Intelligence', label_en: 'Business Intelligence' },
  { id: 'cloud', label_es: 'Cloud', label_en: 'Cloud' },
  { id: 'machine-learning', label_es: 'Machine Learning', label_en: 'Machine Learning' },
  { id: 'computer-vision', label_es: 'Computer Vision', label_en: 'Computer Vision' },
  { id: 'automation', label_es: 'Automatización', label_en: 'Automation' },
  { id: 'predictive-analytics', label_es: 'Analítica predictiva', label_en: 'Predictive Analytics' },
  { id: 'data-governance', label_es: 'Gobierno de datos', label_en: 'Data Governance' },
  { id: 'operational-analytics', label_es: 'Analítica operativa', label_en: 'Operational Analytics' },
  { id: 'inventory-analytics', label_es: 'Analítica de inventario', label_en: 'Inventory Analytics' },
  { id: 'impact-analytics', label_es: 'Analítica de impacto', label_en: 'Impact Analytics' },
  { id: 'data-delivery', label_es: 'Data Delivery', label_en: 'Data Delivery' },
];

export const industryDiscoverySeeds: IndustryDiscoverySeed[] = [
  {
    id: 'ind-1',
    title_es: 'Petróleo y Gas',
    title_en: 'Oil & Gas',
    slug_es: 'petroleo-gas',
    slug_en: 'oil-gas',
    excerpt_es: 'Impulsamos eficiencia operativa, mantenimiento predictivo y visibilidad de activos en operaciones intensivas en datos.',
    excerpt_en: 'We drive operational efficiency, predictive maintenance and asset visibility in data-intensive operations.',
    content_es: 'Aplicamos plataformas de datos, analítica operativa e inteligencia artificial para mejorar continuidad operacional, mantenimiento y toma de decisiones en petróleo y gas.',
    content_en: 'We apply data platforms, operational analytics and artificial intelligence to improve operational continuity, maintenance and decision-making in oil and gas.',
    challenges_es: ['Disponibilidad de activos', 'Mantenimiento predictivo', 'Visibilidad operacional'],
    challenges_en: ['Asset availability', 'Predictive maintenance', 'Operational visibility'],
    value_es: ['Datos integrados de operación', 'Analítica predictiva', 'Alertas para decisiones críticas'],
    value_en: ['Integrated operational data', 'Predictive analytics', 'Alerts for critical decisions'],
    discovery_description_es: 'Desde producción hasta mantenimiento, ayudamos a convertir datos operativos en decisiones más rápidas y confiables.',
    discovery_description_en: 'From production to maintenance, we help turn operational data into faster, more reliable decisions.',
    solution_tags: ['predictive-analytics', 'operational-analytics', 'data-engineering', 'cloud'],
    order: 1,
    status: 'published',
  },
  {
    id: 'ind-2',
    title_es: 'Energía y Telco',
    title_en: 'Energy & Telco',
    slug_es: 'energia-telco',
    slug_en: 'energy-telco',
    excerpt_es: 'Mejoramos monitoreo, continuidad y experiencia de servicio con datos centralizados y automatización.',
    excerpt_en: 'We improve monitoring, continuity and service experience with centralized data and automation.',
    content_es: 'Ayudamos a equipos de energía y telecomunicaciones a integrar señales operativas, habilitar analítica en tiempo real y optimizar procesos críticos.',
    content_en: 'We help energy and telecommunications teams integrate operational signals, enable real-time analytics and optimize critical processes.',
    challenges_es: ['Continuidad de servicio', 'Monitoreo en tiempo real', 'Gestión de incidentes'],
    challenges_en: ['Service continuity', 'Real-time monitoring', 'Incident management'],
    value_es: ['Visibilidad end-to-end', 'Automatización operativa', 'Mejor experiencia del usuario'],
    value_en: ['End-to-end visibility', 'Operational automation', 'Better user experience'],
    discovery_description_es: 'Conectamos datos técnicos y de negocio para mejorar estabilidad, priorización y capacidad de respuesta.',
    discovery_description_en: 'We connect technical and business data to improve stability, prioritization and responsiveness.',
    solution_tags: ['cloud', 'automation', 'business-intelligence', 'data-engineering'],
    order: 2,
    status: 'published',
  },
  {
    id: 'ind-3',
    title_es: 'Logística',
    title_en: 'Logistics',
    slug_es: 'logistica',
    slug_en: 'logistics',
    excerpt_es: 'Optimizamos planeación, trazabilidad y eficiencia de cadenas logísticas con analítica y automatización.',
    excerpt_en: 'We optimize planning, traceability and supply chain efficiency with analytics and automation.',
    content_es: 'Convertimos operaciones logísticas en flujos más previsibles mediante analítica operativa, forecasting y automatización de decisiones.',
    content_en: 'We turn logistics operations into more predictable flows through operational analytics, forecasting and decision automation.',
    challenges_es: ['Trazabilidad', 'Planeación de demanda', 'Coordinación operativa'],
    challenges_en: ['Traceability', 'Demand planning', 'Operational coordination'],
    value_es: ['Visibilidad de punta a punta', 'Predicción de demanda', 'Mejor nivel de servicio'],
    value_en: ['End-to-end visibility', 'Demand forecasting', 'Better service levels'],
    discovery_description_es: 'Desde inventarios hasta distribución, usamos datos para reducir fricción operativa y mejorar capacidad de respuesta.',
    discovery_description_en: 'From inventory to distribution, we use data to reduce operational friction and improve responsiveness.',
    solution_tags: ['predictive-analytics', 'inventory-analytics', 'automation', 'business-intelligence'],
    order: 3,
    status: 'published',
  },
  {
    id: 'ind-4',
    title_es: 'Construcción y Vías',
    title_en: 'Construction & Roads',
    slug_es: 'construccion-vias',
    slug_en: 'construction-roads',
    excerpt_es: 'Aceleramos visibilidad de obra, control de avance y toma de decisiones con analítica de proyectos.',
    excerpt_en: 'We accelerate worksite visibility, progress control and decision-making with project analytics.',
    content_es: 'Aplicamos analítica y gobierno de datos para consolidar indicadores de ejecución, riesgos y productividad en proyectos de infraestructura.',
    content_en: 'We apply analytics and data governance to consolidate execution, risk and productivity indicators in infrastructure projects.',
    challenges_es: ['Control de avance', 'Riesgos de ejecución', 'Visibilidad de productividad'],
    challenges_en: ['Progress tracking', 'Execution risk', 'Productivity visibility'],
    value_es: ['KPIs unificados', 'Seguimiento oportuno', 'Mejor control de proyecto'],
    value_en: ['Unified KPIs', 'Timely follow-up', 'Better project control'],
    discovery_description_es: 'Hacemos visible el estado real de proyectos complejos para habilitar decisiones oportunas y coordinación entre equipos.',
    discovery_description_en: 'We make the real status of complex projects visible to enable timely decisions and coordination across teams.',
    solution_tags: ['business-intelligence', 'data-governance', 'data-strategy', 'operational-analytics'],
    order: 4,
    status: 'published',
  },
  {
    id: 'ind-5',
    title_es: 'Retail y Manufactura',
    title_en: 'Retail & Manufacturing',
    slug_es: 'retail-manufactura',
    slug_en: 'retail-manufacturing',
    excerpt_es: 'Combinamos analítica comercial, planeación y optimización operativa para mejorar rentabilidad y experiencia.',
    excerpt_en: 'We combine commercial analytics, planning and operational optimization to improve profitability and experience.',
    content_es: 'Desplegamos estrategias de datos, analítica predictiva y tableros operativos para fortalecer planeación, inventarios y ejecución comercial.',
    content_en: 'We deploy data strategies, predictive analytics and operational dashboards to strengthen planning, inventory and commercial execution.',
    challenges_es: ['Inventario', 'Planeación comercial', 'Demanda y abastecimiento'],
    challenges_en: ['Inventory', 'Commercial planning', 'Demand and supply'],
    value_es: ['Predicción de demanda', 'Más visibilidad operativa', 'Mejor decisión comercial'],
    value_en: ['Demand forecasting', 'More operational visibility', 'Better commercial decisions'],
    discovery_description_es: 'Ayudamos a conectar ventas, operación e inventario para tomar decisiones comerciales con más contexto y velocidad.',
    discovery_description_en: 'We help connect sales, operations and inventory to make commercial decisions with more context and speed.',
    solution_tags: ['data-strategy', 'predictive-analytics', 'business-intelligence', 'data-delivery'],
    order: 5,
    status: 'published',
  },
  {
    id: 'ind-6',
    title_es: 'Gobierno',
    title_en: 'Government',
    slug_es: 'gobierno',
    slug_en: 'government',
    excerpt_es: 'Habilitamos transparencia, trazabilidad y mejor priorización de recursos mediante plataformas y analítica de datos.',
    excerpt_en: 'We enable transparency, traceability and better resource prioritization through data platforms and analytics.',
    content_es: 'Trabajamos con entidades del sector público para estructurar información, medir impacto y fortalecer la toma de decisiones con datos.',
    content_en: 'We work with public sector institutions to structure information, measure impact and strengthen data-driven decision-making.',
    challenges_es: ['Transparencia', 'Priorización de recursos', 'Medición de impacto'],
    challenges_en: ['Transparency', 'Resource prioritization', 'Impact measurement'],
    value_es: ['Mayor trazabilidad', 'Indicadores de gestión', 'Mejor servicio al ciudadano'],
    value_en: ['Greater traceability', 'Management indicators', 'Better citizen service'],
    discovery_description_es: 'Consolidamos información dispersa para convertirla en tableros, seguimiento y decisiones públicas más consistentes.',
    discovery_description_en: 'We consolidate fragmented information to turn it into dashboards, follow-up and more consistent public decisions.',
    solution_tags: ['data-governance', 'business-intelligence', 'impact-analytics', 'data-strategy'],
    order: 6,
    status: 'published',
  },
  {
    id: 'ind-7',
    title_es: 'Finanzas y Seguros',
    title_en: 'Finance & Insurance',
    slug_es: 'finanzas-seguros',
    slug_en: 'finance-insurance',
    excerpt_es: 'Aplicamos IA, automatización y plataformas de datos para acelerar evaluación, riesgo y eficiencia operativa.',
    excerpt_en: 'We apply AI, automation and data platforms to accelerate assessment, risk and operational efficiency.',
    content_es: 'Ayudamos a instituciones financieras y aseguradoras a modernizar procesos críticos, automatizar revisiones y mejorar decisiones con modelos analíticos.',
    content_en: 'We help financial and insurance institutions modernize critical processes, automate reviews and improve decisions with analytical models.',
    challenges_es: ['Riesgo', 'Fraude', 'Eficiencia de evaluación'],
    challenges_en: ['Risk', 'Fraud', 'Assessment efficiency'],
    value_es: ['Automatización con IA', 'Menos fricción operativa', 'Decisiones más rápidas'],
    value_en: ['AI-powered automation', 'Less operational friction', 'Faster decisions'],
    discovery_description_es: 'Combinamos analítica, visión por computador y automatización para transformar flujos críticos del negocio financiero.',
    discovery_description_en: 'We combine analytics, computer vision and automation to transform critical financial business workflows.',
    solution_tags: ['data-science-ai', 'computer-vision', 'automation', 'cloud'],
    order: 7,
    status: 'published',
  },
  {
    id: 'ind-8',
    title_es: 'Salud',
    title_en: 'Healthcare',
    slug_es: 'salud',
    slug_en: 'healthcare',
    excerpt_es: 'Diseñamos soluciones de IA y analítica operativa para mejorar visibilidad, inventarios y capacidad de respuesta.',
    excerpt_en: 'We design AI and operational analytics solutions to improve visibility, inventory and responsiveness.',
    content_es: 'Acompañamos organizaciones de salud con soluciones que fortalecen trazabilidad, análisis operativo y toma de decisiones basada en datos.',
    content_en: 'We support healthcare organizations with solutions that strengthen traceability, operational analysis and data-driven decisions.',
    challenges_es: ['Inventario crítico', 'Visibilidad operativa', 'Continuidad del servicio'],
    challenges_en: ['Critical inventory', 'Operational visibility', 'Service continuity'],
    value_es: ['Analítica operativa', 'Mejor trazabilidad', 'IA aplicada a procesos críticos'],
    value_en: ['Operational analytics', 'Better traceability', 'AI applied to critical processes'],
    discovery_description_es: 'Integramos información operativa y analítica para sostener decisiones más precisas en entornos de alta exigencia.',
    discovery_description_en: 'We integrate operational information and analytics to support more precise decisions in high-demand environments.',
    solution_tags: ['data-science-ai', 'computer-vision', 'inventory-analytics', 'operational-analytics'],
    order: 8,
    status: 'published',
  },
  {
    id: 'ind-9',
    title_es: 'Otras industrias',
    title_en: 'Other Industries',
    slug_es: 'otras-industrias',
    slug_en: 'other-industries',
    excerpt_es: 'Adaptamos estrategias de datos y analítica a contextos específicos cuando el reto no cae en una vertical tradicional.',
    excerpt_en: 'We adapt data and analytics strategies to specific contexts when the challenge does not fit a traditional vertical.',
    content_es: 'Llevamos capacidades de estrategia, inteligencia de negocio y medición de impacto a organizaciones con necesidades singulares.',
    content_en: 'We bring strategy, business intelligence and impact measurement capabilities to organizations with singular needs.',
    challenges_es: ['Adaptación sectorial', 'Visibilidad ejecutiva', 'Medición de impacto'],
    challenges_en: ['Sector adaptation', 'Executive visibility', 'Impact measurement'],
    value_es: ['Enfoque flexible', 'Soluciones a medida', 'Datos para decisiones clave'],
    value_en: ['Flexible approach', 'Tailored solutions', 'Data for key decisions'],
    discovery_description_es: 'Tomamos mejores prácticas de Data & AI y las aterrizamos a realidades sectoriales menos estandarizadas.',
    discovery_description_en: 'We bring Data & AI best practices into less standardized sector realities.',
    solution_tags: ['data-strategy', 'business-intelligence', 'impact-analytics'],
    order: 9,
    status: 'published',
  },
];

export const realCaseStudySeeds: CaseStudyDiscoverySeed[] = [
  {
    id: 'case-ins',
    client: 'INS',
    industry_id: 'ind-7',
    title_es: 'INS',
    title_en: 'INS',
    slug_es: 'ins',
    slug_en: 'ins',
    excerpt_es: 'Automatización y modernización de procesos para acelerar evaluaciones en seguros.',
    excerpt_en: 'Process automation and modernization to accelerate insurance assessments.',
    discovery_summary_es: 'Proyecto de transformación con automatización, IA y visión por computador para mejorar tiempos y precisión.',
    discovery_summary_en: 'Transformation project using automation, AI and computer vision to improve speed and accuracy.',
    challenge_es: 'El INS necesitaba reducir la fricción operativa asociada a revisiones manuales, consolidar información crítica y acelerar la toma de decisiones en procesos de seguros.',
    challenge_en: 'INS needed to reduce operational friction tied to manual reviews, consolidate critical information and speed up decision-making in insurance processes.',
    solution_es: 'iData estructuró una solución basada en IA y automatización para transformar validaciones manuales en un flujo más confiable, medible y escalable.',
    solution_en: 'iData designed an AI- and automation-based solution to transform manual validations into a more reliable, measurable and scalable workflow.',
    results_es: '45% reducción en tiempo de procesamiento | 70% mejora en calidad de datos | Mayor agilidad operativa',
    results_en: '45% reduction in processing time | 70% improvement in data quality | Greater operational agility',
    cover_image: '/assets/images/case-studies/ins-hero.png',
    client_logo_url: '/assets/logos/clients/ins.png',
    technology_tags: ['data-science-ai', 'automation', 'computer-vision', 'machine-learning'],
    case_type: 'real',
    featured: true,
    order: 1,
    status: 'published',
    published_date: '2025-02-15',
  },
  {
    id: 'case-ins-2',
    client: 'INS 2',
    industry_id: 'ind-7',
    title_es: 'INS 2',
    title_en: 'INS 2',
    slug_es: 'ins-2',
    slug_en: 'ins-2',
    excerpt_es: 'Clasificación inteligente de imágenes para agilizar decisiones en el proceso asegurador.',
    excerpt_en: 'Intelligent image classification to accelerate decisions in insurance workflows.',
    discovery_summary_es: 'Caso de visión por computador con IA aplicada a fotografías y automatización del flujo de evaluación.',
    discovery_summary_en: 'Computer vision case with AI applied to photographs and workflow automation.',
    challenge_es: 'La revisión de imágenes de vehículos implicaba tiempos altos, dependencia de procesos manuales y una experiencia lenta para los usuarios.',
    challenge_en: 'Vehicle image reviews involved long lead times, manual effort and a slow user experience.',
    solution_es: 'Se implementó una solución de visión por computador y automatización para acelerar el análisis, reducir errores y escalar la capacidad de atención.',
    solution_en: 'A computer vision and automation solution was implemented to speed up analysis, reduce errors and scale service capacity.',
    results_es: 'Más del 90% de casos analizados automáticamente | Menos revisiones manuales | Respuestas más rápidas y confiables',
    results_en: 'More than 90% of cases analyzed automatically | Fewer manual reviews | Faster and more reliable responses',
    cover_image: '/assets/images/case-studies/ins-hero.png',
    client_logo_url: '/assets/logos/clients/ins.png',
    technology_tags: ['data-science-ai', 'computer-vision', 'automation', 'machine-learning'],
    case_type: 'real',
    featured: true,
    order: 2,
    status: 'published',
    published_date: '2025-02-18',
  },
  {
    id: 'case-jfk',
    client: 'JFK',
    industry_id: 'ind-7',
    title_es: 'JFK',
    title_en: 'JFK',
    slug_es: 'jfk',
    slug_en: 'jfk',
    excerpt_es: 'Arquitectura de datos y visibilidad ejecutiva para mejorar eficiencia operativa.',
    excerpt_en: 'Data architecture and executive visibility to improve operational efficiency.',
    discovery_summary_es: 'Proyecto orientado a cloud, ingeniería de datos e inteligencia de negocio para consolidar operación y decisiones.',
    discovery_summary_en: 'Project focused on cloud, data engineering and business intelligence to consolidate operations and decisions.',
    challenge_es: 'La organización necesitaba centralizar información operativa, reducir tiempos de respuesta y mejorar la visibilidad para la toma de decisiones.',
    challenge_en: 'The organization needed to centralize operational information, reduce response times and improve visibility for decision-making.',
    solution_es: 'Se diseñó una arquitectura moderna de datos con flujos integrados, analítica ejecutiva y automatización de procesos recurrentes.',
    solution_en: 'A modern data architecture was designed with integrated flows, executive analytics and automation of recurring processes.',
    results_es: '50% mejora en tiempos de respuesta | 35% reducción de costos operativos | Mejor trazabilidad del negocio',
    results_en: '50% improvement in response times | 35% reduction in operating costs | Better business traceability',
    cover_image: '/assets/images/case-studies/data-architecture-hero.png',
    client_logo_url: '/assets/logos/clients/jfk.png',
    technology_tags: ['cloud', 'data-engineering', 'business-intelligence', 'automation'],
    case_type: 'real',
    featured: true,
    order: 3,
    status: 'published',
    published_date: '2025-02-10',
  },
  {
    id: 'case-velez',
    client: 'Cueros Vélez',
    industry_id: 'ind-5',
    title_es: 'Cueros Vélez',
    title_en: 'Cueros Vélez',
    slug_es: 'cueros-velez',
    slug_en: 'cueros-velez',
    excerpt_es: 'Analítica avanzada para optimizar inventario, planeación y experiencia comercial.',
    excerpt_en: 'Advanced analytics to optimize inventory, planning and commercial experience.',
    discovery_summary_es: 'Caso orientado a analítica predictiva, BI y estrategia de datos para retail y manufactura.',
    discovery_summary_en: 'Case focused on predictive analytics, BI and data strategy for retail and manufacturing.',
    challenge_es: 'La empresa requería mayor precisión en demanda, mejor uso del inventario y más contexto para decisiones comerciales.',
    challenge_en: 'The company needed better demand accuracy, improved inventory usage and more context for commercial decisions.',
    solution_es: 'iData consolidó analítica de negocio, modelos predictivos y tableros para mejorar rotación, abastecimiento y personalización.',
    solution_en: 'iData consolidated business analytics, predictive models and dashboards to improve turnover, replenishment and personalization.',
    results_es: '30% aumento en rotación de inventario | 25% incremento en ventas | 4.2x ROI',
    results_en: '30% increase in inventory turnover | 25% increase in sales | 4.2x ROI',
    cover_image: genericCaseCover,
    client_logo_url: '/assets/logos/clients/velez.png',
    technology_tags: ['predictive-analytics', 'business-intelligence', 'data-strategy'],
    case_type: 'real',
    featured: true,
    order: 4,
    status: 'published',
    published_date: '2025-02-20',
  },
  {
    id: 'case-haceb',
    client: 'HACEB',
    industry_id: 'ind-5',
    title_es: 'HACEB',
    title_en: 'HACEB',
    slug_es: 'haceb',
    slug_en: 'haceb',
    excerpt_es: 'Estrategia de datos y analítica predictiva para fortalecer manufactura y planeación.',
    excerpt_en: 'Data strategy and predictive analytics to strengthen manufacturing and planning.',
    discovery_summary_es: 'Caso enfocado en estrategia, planeación y entrega de datos para decisiones de manufactura.',
    discovery_summary_en: 'Case focused on strategy, planning and data delivery for manufacturing decisions.',
    challenge_es: 'HACEB buscaba anticipar variaciones operativas, reducir tiempos muertos y mejorar planeación de suministro.',
    challenge_en: 'HACEB sought to anticipate operational variations, reduce downtime and improve supply planning.',
    solution_es: 'La solución combinó estrategia de datos, analítica predictiva y tableros de seguimiento para manufactura y cadena de suministro.',
    solution_en: 'The solution combined data strategy, predictive analytics and monitoring dashboards for manufacturing and the supply chain.',
    results_es: '28% reducción en tiempo de inactividad | 40% mejora en planificación | Más coordinación operativa',
    results_en: '28% reduction in downtime | 40% improvement in planning | Greater operational coordination',
    cover_image: '/assets/images/case-studies/haceb-hero.png',
    client_logo_url: '/assets/logos/clients/haceb.png',
    technology_tags: ['data-strategy', 'predictive-analytics', 'data-delivery'],
    case_type: 'real',
    featured: true,
    order: 5,
    status: 'published',
    published_date: '2025-02-25',
  },
  {
    id: 'case-nadro',
    client: 'NADRO',
    industry_id: 'ind-8',
    title_es: 'NADRO',
    title_en: 'NADRO',
    slug_es: 'nadro',
    slug_en: 'nadro',
    excerpt_es: 'IA y analítica operativa para mejorar visibilidad e inventario en el sector salud.',
    excerpt_en: 'AI and operational analytics to improve visibility and inventory in healthcare.',
    discovery_summary_es: 'Caso de salud con visión por computador, IA y analítica operativa aplicada a inventario y continuidad.',
    discovery_summary_en: 'Healthcare case with computer vision, AI and operational analytics applied to inventory and continuity.',
    challenge_es: 'La operación requería mejor trazabilidad de inventario crítico, más velocidad para decisiones y visibilidad operacional confiable.',
    challenge_en: 'The operation required better critical inventory traceability, faster decision-making and reliable operational visibility.',
    solution_es: 'Se integraron analítica operativa y componentes de IA para identificar patrones, fortalecer control de inventario y mejorar la respuesta operativa.',
    solution_en: 'Operational analytics and AI components were integrated to identify patterns, strengthen inventory control and improve operational response.',
    results_es: 'Mayor visibilidad del inventario | Mejor capacidad de respuesta operativa | Decisiones más oportunas',
    results_en: 'Greater inventory visibility | Improved operational responsiveness | More timely decisions',
    cover_image: genericCaseCover,
    client_logo_url: '/assets/logos/clients/nadro.png',
    technology_tags: ['computer-vision', 'data-science-ai', 'inventory-analytics', 'operational-analytics'],
    case_type: 'real',
    featured: true,
    order: 6,
    status: 'published',
    published_date: '2025-02-28',
  },
  {
    id: 'case-davis-direction-foundation',
    client: 'Davis Direction Foundation',
    industry_id: 'ind-9',
    title_es: 'Davis Direction Foundation',
    title_en: 'Davis Direction Foundation',
    slug_es: 'davis-direction-foundation',
    slug_en: 'davis-direction-foundation',
    excerpt_es: 'Estrategia de datos para medir programas, asignar recursos y maximizar impacto social.',
    excerpt_en: 'Data strategy to measure programs, allocate resources and maximize social impact.',
    discovery_summary_es: 'Caso orientado a estrategia, BI y medición de impacto para organizaciones con objetivos sociales.',
    discovery_summary_en: 'Case focused on strategy, BI and impact measurement for mission-driven organizations.',
    challenge_es: 'La fundación requería visibilidad consolidada de programas y evidencia para priorizar inversión e impacto.',
    challenge_en: 'The foundation required consolidated program visibility and evidence to prioritize investment and impact.',
    solution_es: 'iData estructuró una estrategia de datos con indicadores, tableros e instrumentos de medición para mejorar seguimiento y decisiones.',
    solution_en: 'iData structured a data strategy with indicators, dashboards and measurement instruments to improve follow-up and decisions.',
    results_es: '60% mejora en medición de impacto | 45% optimización de recursos | Más visibilidad ejecutiva',
    results_en: '60% improvement in impact measurement | 45% resource optimization | Greater executive visibility',
    cover_image: genericCaseCover,
    client_logo_url: '/assets/logos/clients/davis.png',
    technology_tags: ['data-strategy', 'business-intelligence', 'impact-analytics'],
    case_type: 'real',
    featured: false,
    order: 7,
    status: 'published',
    published_date: '2025-02-05',
  },
];

const placeholderCaseSeeds: CaseStudyDiscoverySeed[] = [
  {
    id: 'case-placeholder-oil-gas',
    client: 'Prueba - Mantenimiento predictivo para petróleo y gas',
    industry_id: 'ind-1',
    title_es: 'Prueba - Mantenimiento predictivo para petróleo y gas',
    title_en: 'Trial - Predictive maintenance for oil and gas',
    slug_es: 'prueba-mantenimiento-predictivo-petroleo-gas',
    slug_en: 'trial-predictive-maintenance-oil-gas',
    excerpt_es: 'Placeholder para un caso futuro de analítica operativa y mantenimiento predictivo.',
    excerpt_en: 'Placeholder for a future operational analytics and predictive maintenance case.',
    discovery_summary_es: 'Caso de prueba para mostrar experiencia aplicable en continuidad operativa y activos críticos.',
    discovery_summary_en: 'Trial case to showcase applicable experience in operational continuity and critical assets.',
    challenge_es: 'Prueba - Consolidar señales operativas para anticipar fallas y priorizar mantenimiento en activos críticos.',
    challenge_en: 'Trial - Consolidate operational signals to anticipate failures and prioritize maintenance in critical assets.',
    solution_es: 'Prueba - Integración de datos operativos, analítica predictiva y visualización para priorizar intervenciones.',
    solution_en: 'Trial - Integration of operational data, predictive analytics and visualization to prioritize interventions.',
    results_es: 'Prueba - Menor tiempo de inactividad | Prueba - Mejor visibilidad de activos',
    results_en: 'Trial - Lower downtime | Trial - Better asset visibility',
    cover_image: genericCaseCover,
    technology_tags: ['predictive-analytics', 'operational-analytics', 'data-engineering'],
    case_type: 'placeholder',
    featured: false,
    order: 101,
    status: 'published',
  },
  {
    id: 'case-placeholder-energy-telco',
    client: 'Prueba - Analítica operativa para energía y telco',
    industry_id: 'ind-2',
    title_es: 'Prueba - Analítica operativa para energía y telco',
    title_en: 'Trial - Operational analytics for energy and telco',
    slug_es: 'prueba-analitica-operativa-energia-telco',
    slug_en: 'trial-operational-analytics-energy-telco',
    excerpt_es: 'Placeholder para un caso futuro de monitoreo, automatización y continuidad de servicio.',
    excerpt_en: 'Placeholder for a future monitoring, automation and service continuity case.',
    discovery_summary_es: 'Caso de prueba para mostrar la experiencia potencial en monitoreo y continuidad.',
    discovery_summary_en: 'Trial case to showcase potential experience in monitoring and continuity.',
    challenge_es: 'Prueba - Unificar señales técnicas y de negocio para responder más rápido a eventos críticos.',
    challenge_en: 'Trial - Unify technical and business signals to respond faster to critical events.',
    solution_es: 'Prueba - Plataforma de datos y automatización para seguimiento, alertas y priorización operativa.',
    solution_en: 'Trial - Data platform and automation for monitoring, alerts and operational prioritization.',
    results_es: 'Prueba - Más visibilidad operativa | Prueba - Mejor continuidad de servicio',
    results_en: 'Trial - More operational visibility | Trial - Better service continuity',
    cover_image: genericCaseCover,
    technology_tags: ['cloud', 'automation', 'business-intelligence'],
    case_type: 'placeholder',
    featured: false,
    order: 102,
    status: 'published',
  },
  {
    id: 'case-placeholder-logistics',
    client: 'Prueba - Optimización predictiva para logística',
    industry_id: 'ind-3',
    title_es: 'Prueba - Optimización predictiva para logística',
    title_en: 'Trial - Predictive optimization for logistics',
    slug_es: 'prueba-optimizacion-predictiva-logistica',
    slug_en: 'trial-predictive-optimization-logistics',
    excerpt_es: 'Placeholder para un caso futuro de analítica logística, inventarios y trazabilidad.',
    excerpt_en: 'Placeholder for a future logistics analytics, inventory and traceability case.',
    discovery_summary_es: 'Caso de prueba para cubrir visibilidad logística y coordinación operativa.',
    discovery_summary_en: 'Trial case covering logistics visibility and operational coordination.',
    challenge_es: 'Prueba - Mejorar visibilidad de inventario, trazabilidad y planeación en la operación logística.',
    challenge_en: 'Trial - Improve inventory visibility, traceability and planning across logistics operations.',
    solution_es: 'Prueba - Analítica operativa, forecasting y automatización para priorizar abastecimiento y distribución.',
    solution_en: 'Trial - Operational analytics, forecasting and automation to prioritize supply and distribution.',
    results_es: 'Prueba - Menos quiebres de inventario | Prueba - Mejor nivel de servicio',
    results_en: 'Trial - Fewer inventory breaks | Trial - Better service levels',
    cover_image: genericCaseCover,
    technology_tags: ['predictive-analytics', 'inventory-analytics', 'automation'],
    case_type: 'placeholder',
    featured: false,
    order: 103,
    status: 'published',
  },
  {
    id: 'case-placeholder-construction',
    client: 'Prueba - Inteligencia de proyectos para construcción y vías',
    industry_id: 'ind-4',
    title_es: 'Prueba - Inteligencia de proyectos para construcción y vías',
    title_en: 'Trial - Project intelligence for construction and roads',
    slug_es: 'prueba-inteligencia-proyectos-construccion-vias',
    slug_en: 'trial-project-intelligence-construction-roads',
    excerpt_es: 'Placeholder para un caso futuro de control de avance, riesgos y productividad de obra.',
    excerpt_en: 'Placeholder for a future worksite progress, risk and productivity case.',
    discovery_summary_es: 'Caso de prueba enfocado en seguimiento ejecutivo y analítica de proyectos.',
    discovery_summary_en: 'Trial case focused on executive follow-up and project analytics.',
    challenge_es: 'Prueba - Consolidar indicadores de obra para mejorar seguimiento, control y coordinación del proyecto.',
    challenge_en: 'Trial - Consolidate worksite indicators to improve project follow-up, control and coordination.',
    solution_es: 'Prueba - Tableros, gobierno de datos y analítica de ejecución para proyectos de infraestructura.',
    solution_en: 'Trial - Dashboards, data governance and execution analytics for infrastructure projects.',
    results_es: 'Prueba - Más visibilidad del avance | Prueba - Mejor control de riesgos',
    results_en: 'Trial - Better progress visibility | Trial - Better risk control',
    cover_image: genericCaseCover,
    technology_tags: ['business-intelligence', 'data-governance', 'data-strategy'],
    case_type: 'placeholder',
    featured: false,
    order: 104,
    status: 'published',
  },
  {
    id: 'case-placeholder-government',
    client: 'Prueba - Medición de impacto para gobierno',
    industry_id: 'ind-6',
    title_es: 'Prueba - Medición de impacto para gobierno',
    title_en: 'Trial - Impact measurement for government',
    slug_es: 'prueba-medicion-impacto-gobierno',
    slug_en: 'trial-impact-measurement-government',
    excerpt_es: 'Placeholder para un caso futuro de analítica pública, seguimiento y priorización.',
    excerpt_en: 'Placeholder for a future public analytics, monitoring and prioritization case.',
    discovery_summary_es: 'Caso de prueba para cubrir seguimiento, trazabilidad y analítica de impacto en sector público.',
    discovery_summary_en: 'Trial case covering follow-up, traceability and impact analytics in the public sector.',
    challenge_es: 'Prueba - Mejorar trazabilidad de programas y evidencia para priorizar decisiones públicas.',
    challenge_en: 'Trial - Improve program traceability and evidence to prioritize public decisions.',
    solution_es: 'Prueba - Indicadores, tableros y gobierno de datos para seguimiento y medición de resultados.',
    solution_en: 'Trial - Indicators, dashboards and data governance for follow-up and outcome measurement.',
    results_es: 'Prueba - Mejor visibilidad institucional | Prueba - Más claridad para priorizar recursos',
    results_en: 'Trial - Better institutional visibility | Trial - More clarity to prioritize resources',
    cover_image: genericCaseCover,
    technology_tags: ['data-governance', 'business-intelligence', 'impact-analytics'],
    case_type: 'placeholder',
    featured: false,
    order: 105,
    status: 'published',
  },
];

export function getTechnologyTagDefinition(tagId: string) {
  return technologyTagCatalog.find((tag) => tag.id === tagId);
}

function buildIndustryKeys(industry: Partial<IndustryDiscoverySeed>) {
  return [industry.id, industry.slug_es, industry.slug_en, industry.title_es, industry.title_en]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());
}

function buildCaseKeys(caseStudy: Partial<CaseStudyDiscoverySeed>) {
  return [caseStudy.id, caseStudy.slug_es, caseStudy.slug_en, caseStudy.client]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());
}

export function findIndustrySeed(candidate: any) {
  const keys = new Set(buildIndustryKeys(candidate || {}));
  return industryDiscoverySeeds.find((seed) => buildIndustryKeys(seed).some((key) => keys.has(key)));
}

export function findCaseStudySeed(candidate: any, includePlaceholders = true) {
  const keys = new Set(buildCaseKeys(candidate || {}));
  const source = includePlaceholders ? [...realCaseStudySeeds, ...placeholderCaseSeeds] : realCaseStudySeeds;
  return source.find((seed) => buildCaseKeys(seed).some((key) => keys.has(key)));
}

export function mergeIndustryWithSeed(industry: any) {
  const seed = findIndustrySeed(industry);
  if (!seed) return industry;

  return {
    ...seed,
    ...industry,
    title_es: industry?.title_es || seed.title_es,
    title_en: industry?.title_en || seed.title_en,
    slug_es: industry?.slug_es || seed.slug_es,
    slug_en: industry?.slug_en || seed.slug_en,
    excerpt_es: industry?.excerpt_es || industry?.description_es || seed.excerpt_es,
    excerpt_en: industry?.excerpt_en || industry?.description_en || seed.excerpt_en,
    content_es: industry?.content_es || seed.content_es,
    content_en: industry?.content_en || seed.content_en,
    challenges_es: Array.isArray(industry?.challenges_es) && industry.challenges_es.length ? industry.challenges_es : seed.challenges_es,
    challenges_en: Array.isArray(industry?.challenges_en) && industry.challenges_en.length ? industry.challenges_en : seed.challenges_en,
    value_es: Array.isArray(industry?.value_es) && industry.value_es.length ? industry.value_es : seed.value_es,
    value_en: Array.isArray(industry?.value_en) && industry.value_en.length ? industry.value_en : seed.value_en,
    discovery_description_es: industry?.discovery_description_es || seed.discovery_description_es,
    discovery_description_en: industry?.discovery_description_en || seed.discovery_description_en,
    solution_tags: Array.isArray(industry?.solution_tags) && industry.solution_tags.length ? industry.solution_tags : seed.solution_tags,
  };
}

export function mergeCaseStudyWithSeed(caseStudy: any, includePlaceholders = true) {
  const seed = findCaseStudySeed(caseStudy, includePlaceholders);
  if (!seed) return caseStudy;

  return {
    ...seed,
    ...caseStudy,
    client: caseStudy?.client || seed.client,
    title_es: caseStudy?.title_es || seed.title_es,
    title_en: caseStudy?.title_en || seed.title_en,
    slug_es: caseStudy?.slug_es || seed.slug_es,
    slug_en: caseStudy?.slug_en || seed.slug_en,
    excerpt_es: caseStudy?.excerpt_es || seed.excerpt_es,
    excerpt_en: caseStudy?.excerpt_en || seed.excerpt_en,
    discovery_summary_es: caseStudy?.discovery_summary_es || seed.discovery_summary_es,
    discovery_summary_en: caseStudy?.discovery_summary_en || seed.discovery_summary_en,
    challenge_es: caseStudy?.challenge_es || seed.challenge_es,
    challenge_en: caseStudy?.challenge_en || seed.challenge_en,
    solution_es: caseStudy?.solution_es || seed.solution_es,
    solution_en: caseStudy?.solution_en || seed.solution_en,
    results_es: caseStudy?.results_es || seed.results_es,
    results_en: caseStudy?.results_en || seed.results_en,
    cover_image: caseStudy?.cover_image || caseStudy?.coverImage || seed.cover_image || null,
    client_logo_url: caseStudy?.client_logo_url || caseStudy?.clientLogoUrl || seed.client_logo_url || null,
    industry_id: caseStudy?.industry_id || caseStudy?.industryId || seed.industry_id,
    service_ids: Array.isArray(caseStudy?.service_ids) && caseStudy.service_ids.length
      ? caseStudy.service_ids
      : Array.isArray(caseStudy?.serviceIds) && caseStudy.serviceIds.length
        ? caseStudy.serviceIds
        : seed.service_ids || [],
    technology_tags: Array.isArray(caseStudy?.technology_tags) && caseStudy.technology_tags.length
      ? caseStudy.technology_tags
      : seed.technology_tags,
    related_industries: Array.isArray(caseStudy?.related_industries) && caseStudy.related_industries.length
      ? caseStudy.related_industries
      : seed.related_industries || [],
    case_type: caseStudy?.case_type || seed.case_type,
  };
}

function mergeEntitiesWithSeeds<T extends Record<string, any>>(
  items: T[],
  seeds: T[],
  matcher: (item: T, seed: T) => boolean,
  merge: (item: T) => T
) {
  const mergedItems = items.map(merge);
  const missingSeeds = seeds.filter((seed) => !mergedItems.some((item) => matcher(item, seed)));
  return [...mergedItems, ...missingSeeds];
}

export function getMergedIndustries(items: any[] = []) {
  return mergeEntitiesWithSeeds(
    items,
    industryDiscoverySeeds,
    (item, seed) => {
      const itemKeys = new Set(buildIndustryKeys(item));
      return buildIndustryKeys(seed).some((key) => itemKeys.has(key));
    },
    mergeIndustryWithSeed
  ).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getMergedCaseStudies(items: any[] = [], options?: { includePlaceholders?: boolean }) {
  const includePlaceholders = !!options?.includePlaceholders;
  const seeds = includePlaceholders ? [...realCaseStudySeeds, ...placeholderCaseSeeds] : realCaseStudySeeds;

  return mergeEntitiesWithSeeds(
    items,
    seeds,
    (item, seed) => {
      const itemKeys = new Set(buildCaseKeys(item));
      return buildCaseKeys(seed).some((key) => itemKeys.has(key));
    },
    (item) => mergeCaseStudyWithSeed(item, includePlaceholders)
  ).sort((a, b) => {
    const typeWeight = (a.case_type === 'placeholder' ? 1 : 0) - (b.case_type === 'placeholder' ? 1 : 0);
    if (typeWeight !== 0) return typeWeight;
    return (a.order || 0) - (b.order || 0);
  });
}

export function getPlaceholderCaseSeeds() {
  return placeholderCaseSeeds.map((caseStudy) => ({ ...caseStudy }));
}
