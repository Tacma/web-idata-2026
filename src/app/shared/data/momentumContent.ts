import type { Language } from '../types';

export interface MomentumNewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  href: string;
  label: string;
  image?: string | null;
}

export interface MomentumCollectionItem {
  id: string;
  slug?: string;
  label: string;
  title: string;
  description: string;
  href: string;
  meta: string;
  isoDate?: string;
  image?: string | null;
  sponsorLogos?: string[];
}

export interface MomentumEventSpeaker {
  name: string;
  role: string;
}

export interface MomentumEventAgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface MomentumEventDetail extends MomentumCollectionItem {
  slug: string;
  format: string;
  location: string;
  audience: string[];
  takeaways: string[];
  agenda: MomentumEventAgendaItem[];
  speakers: MomentumEventSpeaker[];
  seatsNote: string;
  registrationTitle: string;
  registrationDescription: string;
}

export interface MomentumLabDetail extends MomentumCollectionItem {
  slug: string;
  overview: string;
  problem: string;
  audience: string[];
  includes: string[];
  signals: string[];
  featuredImage?: string | null;
  contentBlocks?: any[] | null;
  seoTitle?: string;
  seoDescription?: string;
}

const sectionHashByLanguage = {
  es: {
    events: 'eventos',
    builds: 'desarrollos',
  },
  en: {
    events: 'events',
    builds: 'builds',
  },
} as const;

export const DEFAULT_MOMENTUM_SPONSOR_LOGOS = [
  '/assets/logos/partners/microsoft.png',
  '/assets/logos/partners/aws.png',
  '/assets/logos/partners/google-cloud.png',
  '/assets/logos/partners/databricks.png',
  '/assets/logos/partners/snowflake.png',
] as const;

function buildEventPath(language: Language, slug: string) {
  return `/${language}/insights/events/${slug}`;
}

function buildLabPath(language: Language, slug: string) {
  return `/${language}/insights/builds/${slug}`;
}

export function getMomentumEvents(language: Language): MomentumEventDetail[] {
  return [
    {
      id: 'event-breakfast',
      slug: 'breakfast-gobierno-datos-ia',
      label: language === 'es' ? 'Abril 18' : 'April 18',
      title:
        language === 'es'
          ? 'Breakfast ejecutivo: gobierno de datos e IA'
          : 'Executive breakfast: data governance and AI',
      description:
        language === 'es'
          ? 'Conversación cerrada con líderes de tecnología sobre prioridades de adopción, operación y escalabilidad.'
          : 'Private conversation with technology leaders about adoption, operations, and scale priorities.',
      href: buildEventPath(language, 'breakfast-gobierno-datos-ia'),
      isoDate: '2026-04-18T08:00:00-05:00',
      meta: language === 'es' ? 'Bogotá / cupos limitados' : 'Bogota / limited seats',
      format: language === 'es' ? 'Desayuno ejecutivo presencial' : 'In-person executive breakfast',
      location: language === 'es' ? 'Bogotá, Colombia' : 'Bogota, Colombia',
      audience:
        language === 'es'
          ? ['C-level', 'Data leaders', 'IT managers']
          : ['C-level', 'Data leaders', 'IT managers'],
      takeaways:
        language === 'es'
          ? [
              'Prioridades realistas para gobierno de datos',
              'Quick wins para activar IA con control',
              'Criterios para operar con continuidad',
            ]
          : [
              'Realistic priorities for data governance',
              'Quick wins to activate AI with control',
              'Criteria to operate with continuity',
            ],
      agenda:
        language === 'es'
          ? [
              { time: '08:00', title: 'Recepción y networking', description: 'Registro de asistentes, café y contexto del encuentro.' },
              { time: '08:30', title: 'Panel ejecutivo', description: 'Conversación sobre decisiones de gobierno, ownership y adopción.' },
              { time: '09:10', title: 'Mesa de discusión', description: 'Intercambio entre asistentes sobre retos actuales y próximos pasos.' },
            ]
          : [
              { time: '08:00', title: 'Welcome and networking', description: 'Guest check-in, coffee, and context for the session.' },
              { time: '08:30', title: 'Executive panel', description: 'Conversation on governance decisions, ownership, and adoption.' },
              { time: '09:10', title: 'Discussion table', description: 'Peer exchange on current challenges and next steps.' },
            ],
      speakers:
        language === 'es'
          ? [
              { name: 'Equipo iData', role: 'Moderación y apertura' },
              { name: 'Invitado del ecosistema', role: 'Perspectiva de negocio y tecnología' },
            ]
          : [
              { name: 'iData team', role: 'Moderation and opening' },
              { name: 'Ecosystem guest', role: 'Business and technology perspective' },
            ],
      seatsNote: language === 'es' ? 'Sesión privada con aforo limitado.' : 'Private session with limited capacity.',
      registrationTitle: language === 'es' ? 'Reserva tu cupo' : 'Reserve your seat',
      registrationDescription:
        language === 'es'
          ? 'Completa tus datos para confirmar interés y recibir validación del equipo.'
          : 'Complete your details to confirm interest and receive validation from the team.',
    },
    {
      id: 'event-workshop',
      slug: 'workshop-plataformas-modernas',
      label: language === 'es' ? 'Mayo 09' : 'May 09',
      title:
        language === 'es'
          ? 'Workshop iData sobre plataformas modernas'
          : 'iData workshop on modern platforms',
      description:
        language === 'es'
          ? 'Sesión práctica para revisar arquitecturas, quick wins y decisiones de plataforma para equipos de datos.'
          : 'Hands-on session to review architectures, quick wins, and platform decisions for data teams.',
      href: buildEventPath(language, 'workshop-plataformas-modernas'),
      isoDate: '2026-05-09T09:00:00-05:00',
      meta: language === 'es' ? 'Formato hands-on' : 'Hands-on format',
      format: language === 'es' ? 'Workshop práctico presencial' : 'In-person hands-on workshop',
      location: language === 'es' ? 'Medellín, Colombia' : 'Medellin, Colombia',
      audience:
        language === 'es'
          ? ['Arquitectos de datos', 'Platform owners', 'Engineering leads']
          : ['Data architects', 'Platform owners', 'Engineering leads'],
      takeaways:
        language === 'es'
          ? [
              'Patrones de arquitectura aplicables',
              'Decisiones de plataforma comparables',
              'Checklist para priorización técnica',
            ]
          : [
              'Applicable architecture patterns',
              'Comparable platform decisions',
              'Checklist for technical prioritization',
            ],
      agenda:
        language === 'es'
          ? [
              { time: '09:00', title: 'Contexto del workshop', description: 'Panorama de decisiones comunes en plataformas modernas.' },
              { time: '09:30', title: 'Hands-on review', description: 'Revisión guiada de arquitectura, observabilidad y operación.' },
              { time: '10:20', title: 'Cierre operativo', description: 'Definición de quick wins y próximos movimientos.' },
            ]
          : [
              { time: '09:00', title: 'Workshop context', description: 'Overview of common decisions in modern platforms.' },
              { time: '09:30', title: 'Hands-on review', description: 'Guided review of architecture, observability, and operations.' },
              { time: '10:20', title: 'Operational close', description: 'Definition of quick wins and next moves.' },
            ],
      speakers:
        language === 'es'
          ? [
              { name: 'Arquitecto principal iData', role: 'Lead facilitator' },
              { name: 'Especialista cloud', role: 'Platform discussion' },
            ]
          : [
              { name: 'iData principal architect', role: 'Lead facilitator' },
              { name: 'Cloud specialist', role: 'Platform discussion' },
            ],
      seatsNote: language === 'es' ? 'Recomendado para equipos técnicos y de plataforma.' : 'Recommended for technical and platform teams.',
      registrationTitle: language === 'es' ? 'Inscríbete al workshop' : 'Register for the workshop',
      registrationDescription:
        language === 'es'
          ? 'Déjanos tus datos y te enviaremos confirmación con agenda y detalles logísticos.'
          : 'Leave your details and we will send confirmation with agenda and logistics.',
    },
    {
      id: 'event-roundtable',
      slug: 'mesa-ejecutiva-modernizacion-datos',
      label: language === 'es' ? 'Mayo 23' : 'May 23',
      title:
        language === 'es'
          ? 'Mesa ejecutiva: modernización de datos'
          : 'Executive roundtable: data modernization',
      description:
        language === 'es'
          ? 'Espacio curado para revisar hoja de ruta, quick wins y decisiones de plataforma con líderes de negocio y tecnología.'
          : 'Curated session to review roadmap, quick wins, and platform decisions with business and technology leaders.',
      href: buildEventPath(language, 'mesa-ejecutiva-modernizacion-datos'),
      isoDate: '2026-05-23T08:30:00-05:00',
      meta: language === 'es' ? 'Roundtable privado' : 'Private roundtable',
      format: language === 'es' ? 'Roundtable ejecutivo' : 'Executive roundtable',
      location: language === 'es' ? 'Ciudad de México, México' : 'Mexico City, Mexico',
      audience:
        language === 'es'
          ? ['Directores de tecnología', 'Gerentes de datos', 'Sponsors de transformación']
          : ['Technology directors', 'Data managers', 'Transformation sponsors'],
      takeaways:
        language === 'es'
          ? [
              'Roadmap priorizado',
              'Señales de madurez organizacional',
              'Alineación entre negocio y tecnología',
            ]
          : [
              'Prioritized roadmap',
              'Signals of organizational maturity',
              'Alignment between business and technology',
            ],
      agenda:
        language === 'es'
          ? [
              { time: '08:30', title: 'Bienvenida ejecutiva', description: 'Apertura, objetivo del encuentro y marco de conversación.' },
              { time: '08:50', title: 'Roundtable guiado', description: 'Discusión de prioridades, riesgos y decisiones habilitadoras.' },
              { time: '09:40', title: 'Acciones de salida', description: 'Síntesis de acuerdos y siguientes pasos para los asistentes.' },
            ]
          : [
              { time: '08:30', title: 'Executive welcome', description: 'Opening, session goal, and discussion framework.' },
              { time: '08:50', title: 'Guided roundtable', description: 'Discussion on priorities, risks, and enabling decisions.' },
              { time: '09:40', title: 'Exit actions', description: 'Summary of agreements and next steps for attendees.' },
            ],
      speakers:
        language === 'es'
          ? [
              { name: 'Executive advisor iData', role: 'Session host' },
              { name: 'Invitados del mercado', role: 'Peer conversation' },
            ]
          : [
              { name: 'iData executive advisor', role: 'Session host' },
              { name: 'Market guests', role: 'Peer conversation' },
            ],
      seatsNote: language === 'es' ? 'Acceso por confirmación del equipo.' : 'Access by team confirmation.',
      registrationTitle: language === 'es' ? 'Solicita participación' : 'Request participation',
      registrationDescription:
        language === 'es'
          ? 'Comparte tus datos y revisaremos afinidad del perfil para enviarte confirmación.'
          : 'Share your details and we will review profile fit before confirming your seat.',
    },
    {
      id: 'event-clinic',
      slug: 'clinica-arquitectura-gobierno',
      label: language === 'es' ? 'Junio 06' : 'June 06',
      title:
        language === 'es'
          ? 'Clínica de arquitectura y gobierno'
          : 'Architecture and governance clinic',
      description:
        language === 'es'
          ? 'Sesión breve para aterrizar gobierno, observabilidad y operación continua sobre plataformas de datos.'
          : 'Short session to land governance, observability, and continuous operations on data platforms.',
      href: buildEventPath(language, 'clinica-arquitectura-gobierno'),
      isoDate: '2026-06-06T10:00:00-05:00',
      meta: language === 'es' ? 'Clinic session' : 'Clinic session',
      format: language === 'es' ? 'Sesión clínica híbrida' : 'Hybrid clinic session',
      location: language === 'es' ? 'Sesión híbrida / Bogotá' : 'Hybrid session / Bogota',
      audience:
        language === 'es'
          ? ['Arquitectura empresarial', 'Data governance', 'Operaciones']
          : ['Enterprise architecture', 'Data governance', 'Operations'],
      takeaways:
        language === 'es'
          ? [
              'Mapa de dependencias críticas',
              'Priorización de observabilidad',
              'Controles base de operación continua',
            ]
          : [
              'Map of critical dependencies',
              'Observability prioritization',
              'Baseline controls for continuous operations',
            ],
      agenda:
        language === 'es'
          ? [
              { time: '10:00', title: 'Diagnóstico rápido', description: 'Lectura de arquitectura actual y riesgos visibles.' },
              { time: '10:25', title: 'Clínica guiada', description: 'Revisión de casos y decisiones recomendadas.' },
              { time: '10:55', title: 'Cierre', description: 'Resumen de acciones para continuidad y gobierno.' },
            ]
          : [
              { time: '10:00', title: 'Rapid diagnosis', description: 'Readout of current architecture and visible risks.' },
              { time: '10:25', title: 'Guided clinic', description: 'Review of scenarios and recommended decisions.' },
              { time: '10:55', title: 'Closing', description: 'Summary of actions for continuity and governance.' },
            ],
      speakers:
        language === 'es'
          ? [
              { name: 'Equipo de arquitectura iData', role: 'Clínica técnica' },
              { name: 'Especialista governance', role: 'Operational controls' },
            ]
          : [
              { name: 'iData architecture team', role: 'Technical clinic' },
              { name: 'Governance specialist', role: 'Operational controls' },
            ],
      seatsNote: language === 'es' ? 'Espacios asignados por orden de registro.' : 'Seats assigned by registration order.',
      registrationTitle: language === 'es' ? 'Reserva tu espacio' : 'Reserve your spot',
      registrationDescription:
        language === 'es'
          ? 'Déjanos tus datos para enviarte acceso, modalidad y recomendaciones previas.'
          : 'Leave your details so we can send access instructions, modality, and pre-session recommendations.',
    },
    {
      id: 'event-lab',
      slug: 'laboratorio-copilots-automatizacion',
      label: language === 'es' ? 'Junio 20' : 'June 20',
      title:
        language === 'es'
          ? 'Laboratorio de copilots y automatización'
          : 'Copilots and automation lab',
      description:
        language === 'es'
          ? 'Revisión aplicada de escenarios de IA empresarial con foco en operaciones, service desk y analítica aumentada.'
          : 'Applied review of enterprise AI scenarios focused on operations, service desk, and augmented analytics.',
      href: buildEventPath(language, 'laboratorio-copilots-automatizacion'),
      isoDate: '2026-06-20T09:30:00-05:00',
      meta: language === 'es' ? 'AI adoption lab' : 'AI adoption lab',
      format: language === 'es' ? 'Laboratorio aplicado' : 'Applied lab',
      location: language === 'es' ? 'Virtual + invitados regionales' : 'Virtual + regional guests',
      audience:
        language === 'es'
          ? ['Innovation leads', 'Automation owners', 'Service teams']
          : ['Innovation leads', 'Automation owners', 'Service teams'],
      takeaways:
        language === 'es'
          ? [
              'Casos de uso viables por prioridad',
              'Criterios de gobierno para copilots',
              'Próximos pasos para activación controlada',
            ]
          : [
              'Viable use cases by priority',
              'Governance criteria for copilots',
              'Next steps for controlled activation',
            ],
      agenda:
        language === 'es'
          ? [
              { time: '09:30', title: 'Contexto del laboratorio', description: 'Escenarios de uso y expectativas de negocio.' },
              { time: '10:00', title: 'Casos aplicados', description: 'Revisión de automatización, copilots y analítica aumentada.' },
              { time: '10:40', title: 'Roadmap de activación', description: 'Definición de criterios y acciones siguientes.' },
            ]
          : [
              { time: '09:30', title: 'Lab context', description: 'Use scenarios and business expectations.' },
              { time: '10:00', title: 'Applied cases', description: 'Review of automation, copilots, and augmented analytics.' },
              { time: '10:40', title: 'Activation roadmap', description: 'Definition of criteria and next actions.' },
            ],
      speakers:
        language === 'es'
          ? [
              { name: 'AI lead iData', role: 'Applied session' },
              { name: 'Automation specialist', role: 'Use-case walkthrough' },
            ]
          : [
              { name: 'iData AI lead', role: 'Applied session' },
              { name: 'Automation specialist', role: 'Use-case walkthrough' },
            ],
      seatsNote: language === 'es' ? 'Sesión enfocada en equipos de transformación e innovación.' : 'Session focused on transformation and innovation teams.',
      registrationTitle: language === 'es' ? 'Regístrate al laboratorio' : 'Register for the lab',
      registrationDescription:
        language === 'es'
          ? 'Completa el formulario y te compartiremos acceso, cupo y recomendaciones de participación.'
          : 'Complete the form and we will share access details, seat confirmation, and participation recommendations.',
    },
  ];
}

export function getMomentumEventBySlug(language: Language, slug: string) {
  return getMomentumEvents(language).find((event) => event.slug === slug) || null;
}

export function getMomentumLabDetails(language: Language): MomentumLabDetail[] {
  return [
    {
      id: 'build-ai-accelerators',
      slug: 'aceleradores-adopcion-ia',
      label: language === 'es' ? 'En desarrollo' : 'In development',
      title:
        language === 'es'
          ? 'Aceleradores para adopción de IA empresarial'
          : 'Accelerators for enterprise AI adoption',
      description:
        language === 'es'
          ? 'Estamos estructurando paquetes de descubrimiento y despliegue para casos de copilots, automatización y analítica aumentada.'
          : 'We are shaping discovery and deployment packages for copilots, automation, and augmented analytics use cases.',
      href: buildLabPath(language, 'aceleradores-adopcion-ia'),
      meta: language === 'es' ? 'AI adoption studio' : 'AI adoption studio',
      overview:
        language === 'es'
          ? 'Estamos empaquetando una base reutilizable para que equipos de negocio y tecnología prueben productos de IA con más velocidad, menos fricción operativa y mejores criterios de priorización.'
          : 'We are packaging a reusable foundation so business and technology teams can test AI products faster, with less operational friction and stronger prioritization criteria.',
      problem:
        language === 'es'
          ? 'Muchas iniciativas de IA se quedan en pilotos aislados porque no cuentan con discovery, gobierno y aceleradores de activación listos para repetirse en más de un caso de uso.'
          : 'Many AI initiatives stay trapped in isolated pilots because they lack discovery, governance, and activation accelerators ready to be reused across more than one use case.',
      audience:
        language === 'es'
          ? ['Líderes de innovación', 'Sponsors de automatización', 'Equipos de data y AI']
          : ['Innovation leaders', 'Automation sponsors', 'Data and AI teams'],
      includes:
        language === 'es'
          ? [
              'Blueprint de discovery para priorizar casos de uso',
              'Paquetes base para copilots, automatización y analytics',
              'Criterios de gobierno, riesgo y activación por etapa',
            ]
          : [
              'Discovery blueprint to prioritize use cases',
              'Base packages for copilots, automation, and analytics',
              'Governance, risk, and activation criteria by stage',
            ],
      signals:
        language === 'es'
          ? [
              'Definición de journeys de adopción por perfil de cliente',
              'Diseño de componentes reutilizables para activación rápida',
              'Priorización de quick wins y criterios de escalamiento',
            ]
          : [
              'Definition of adoption journeys by customer profile',
              'Design of reusable components for faster activation',
              'Prioritization of quick wins and scaling criteria',
            ],
    },
    {
      id: 'build-ops-frameworks',
      slug: 'frameworks-operacion-observabilidad',
      label: language === 'es' ? 'Radar de producto' : 'Product radar',
      title:
        language === 'es'
          ? 'Frameworks de operación y observabilidad'
          : 'Operations and observability frameworks',
      description:
        language === 'es'
          ? 'Estamos refinando componentes para gobernanza, monitoreo y evolución continua de data products.'
          : 'We are refining components for governance, monitoring, and continuous evolution of data products.',
      href: buildLabPath(language, 'frameworks-operacion-observabilidad'),
      meta: language === 'es' ? 'Ops + governance' : 'Ops + governance',
      overview:
        language === 'es'
          ? 'Estamos convirtiendo aprendizajes operativos de proyectos reales en un framework que ayude a equipos de plataforma a diseñar continuidad, monitoreo y gobierno desde el inicio.'
          : 'We are turning operational lessons from real projects into a framework that helps platform teams design continuity, monitoring, and governance from day one.',
      problem:
        language === 'es'
          ? 'Las plataformas suelen crecer antes de que existan reglas claras para observar salud, ownership, dependencias y cumplimiento operativo.'
          : 'Platforms often grow before clear rules exist to observe health, ownership, dependencies, and operational compliance.',
      audience:
        language === 'es'
          ? ['Platform owners', 'DataOps', 'Arquitectura empresarial']
          : ['Platform owners', 'DataOps', 'Enterprise architecture'],
      includes:
        language === 'es'
          ? [
              'Patrones de observabilidad por capa de plataforma',
              'Checklists de gobierno y continuidad operativa',
              'Guías de ownership y resolución de incidentes',
            ]
          : [
              'Observability patterns by platform layer',
              'Governance and operational continuity checklists',
              'Ownership and incident resolution guides',
            ],
      signals:
        language === 'es'
          ? [
              'Mapeo de señales críticas para operaciones de datos',
              'Definición de estándares base para reliability',
              'Pruebas de diseño con equipos de operación y arquitectura',
            ]
          : [
              'Mapping of critical signals for data operations',
              'Definition of baseline standards for reliability',
              'Design validation with operations and architecture teams',
            ],
    },
    {
      id: 'build-decision-kits',
      slug: 'kits-decision-comites-ejecutivos',
      label: language === 'es' ? 'Diseño activo' : 'Active design',
      title:
        language === 'es'
          ? 'Kits de decisión para comités ejecutivos'
          : 'Decision kits for executive committees',
      description:
        language === 'es'
          ? 'Estamos empaquetando tableros, indicadores y narrativas para acelerar decisiones con mejor contexto.'
          : 'We are packaging dashboards, indicators, and narratives to accelerate decisions with better context.',
      href: buildLabPath(language, 'kits-decision-comites-ejecutivos'),
      meta: language === 'es' ? 'Decision systems' : 'Decision systems',
      overview:
        language === 'es'
          ? 'Estamos diseñando una capa de producto para que los comités ejecutivos reciban contexto, riesgos y oportunidades con una narrativa más útil para decidir.'
          : 'We are designing a product layer so executive committees receive context, risks, and opportunities with a more useful decision narrative.',
      problem:
        language === 'es'
          ? 'Los tableros tradicionales muestran datos, pero no siempre preparan a los líderes para decidir con claridad, urgencia y alineación entre áreas.'
          : 'Traditional dashboards show data, but they do not always prepare leaders to decide with clarity, urgency, and cross-functional alignment.',
      audience:
        language === 'es'
          ? ['Comités ejecutivos', 'Sponsors de transformación', 'Equipos de estrategia']
          : ['Executive committees', 'Transformation sponsors', 'Strategy teams'],
      includes:
        language === 'es'
          ? [
              'Narrativas ejecutivas listas para discusión',
              'Indicadores y señales resumidas por prioridad',
              'Formatos de comité para decisiones recurrentes',
            ]
          : [
              'Executive narratives ready for discussion',
              'Indicators and signals summarized by priority',
              'Committee-ready formats for recurring decisions',
            ],
      signals:
        language === 'es'
          ? [
              'Diseño de estructuras de decisión más legibles',
              'Pruebas de storytelling con señales de negocio y operación',
              'Empaque de formatos replicables por comité',
            ]
          : [
              'Design of more readable decision structures',
              'Storytelling tests with business and operational signals',
              'Packaging of repeatable committee-ready formats',
            ],
    },
    {
      id: 'build-observability',
      slug: 'observabilidad-data-products',
      label: language === 'es' ? 'Próximo release' : 'Upcoming release',
      title:
        language === 'es'
          ? 'Observabilidad para data products'
          : 'Observability for data products',
      description:
        language === 'es'
          ? 'Estamos conectando alertas, métricas de uso y señales operativas para equipos que necesitan continuidad real.'
          : 'We are connecting alerts, usage metrics, and operational signals for teams that need real continuity.',
      href: buildLabPath(language, 'observabilidad-data-products'),
      meta: language === 'es' ? 'Reliability layer' : 'Reliability layer',
      overview:
        language === 'es'
          ? 'Estamos consolidando una capa que combine métricas de uso, salud operativa y alertas de producto para equipos que necesitan continuidad real.'
          : 'We are consolidating a layer that combines usage metrics, operational health, and product alerts for teams that need real continuity.',
      problem:
        language === 'es'
          ? 'Muchos data products pierden tracción porque nadie ve a tiempo degradaciones, cambios de consumo o señales tempranas de riesgo.'
          : 'Many data products lose traction because no one sees degradations, usage changes, or early risk signals in time.',
      audience:
        language === 'es'
          ? ['Product owners', 'Data platform teams', 'Reliability leaders']
          : ['Product owners', 'Data platform teams', 'Reliability leaders'],
      includes:
        language === 'es'
          ? [
              'Señales de salud técnica y adopción en un solo punto',
              'Criterios para alertas, ownership y escalamiento',
              'Lecturas rápidas para continuidad del producto',
            ]
          : [
              'Technical health and adoption signals in one place',
              'Criteria for alerts, ownership, and escalation',
              'Quick readouts for product continuity',
            ],
      signals:
        language === 'es'
          ? [
              'Definición de taxonomía de señales operativas',
              'Diseño de alertas y vistas para equipos dueños',
              'Preparación para siguiente release funcional',
            ]
          : [
              'Definition of an operational signals taxonomy',
              'Design of alerts and views for owning teams',
              'Preparation for the next functional release',
            ],
    },
    {
      id: 'build-governance-copilot',
      slug: 'copilot-governance-stewardship',
      label: language === 'es' ? 'Diseño activo' : 'Active design',
      title:
        language === 'es'
          ? 'Copilot para gobierno y stewardship'
          : 'Copilot for governance and stewardship',
      description:
        language === 'es'
          ? 'Estamos definiendo flujos para resolver preguntas de calidad, ownership y políticas con contexto operacional.'
          : 'We are defining flows to resolve quality, ownership, and policy questions with operational context.',
      href: buildLabPath(language, 'copilot-governance-stewardship'),
      meta: language === 'es' ? 'Governance copilot' : 'Governance copilot',
      overview:
        language === 'es'
          ? 'Estamos explorando un asistente que ayude a resolver preguntas sobre calidad, ownership y políticas con contexto operativo y trazabilidad.'
          : 'We are exploring an assistant that helps resolve questions about quality, ownership, and policies with operational context and traceability.',
      problem:
        language === 'es'
          ? 'Los equipos de gobierno suelen responder manualmente las mismas dudas, sin contexto suficiente ni una forma simple de escalar criterios consistentes.'
          : 'Governance teams often answer the same questions manually, without enough context and without a simple way to scale consistent criteria.',
      audience:
        language === 'es'
          ? ['Data stewards', 'Gobierno de datos', 'Equipos de cumplimiento']
          : ['Data stewards', 'Data governance', 'Compliance teams'],
      includes:
        language === 'es'
          ? [
              'Flujos conversacionales para dudas frecuentes de gobierno',
              'Contexto de ownership, políticas y calidad',
              'Criterios para escalar excepciones y decisiones',
            ]
          : [
              'Conversational flows for frequent governance questions',
              'Ownership, policy, and quality context',
              'Criteria to escalate exceptions and decisions',
            ],
      signals:
        language === 'es'
          ? [
              'Definición de intents y journeys de soporte',
              'Pruebas de contexto operativo para respuestas más útiles',
              'Diseño de guardrails para uso controlado',
            ]
          : [
              'Definition of intents and support journeys',
              'Operational-context tests for more useful answers',
              'Design of guardrails for controlled usage',
            ],
    },
    {
      id: 'build-executive-room',
      slug: 'war-room-ejecutivo-datos',
      label: language === 'es' ? 'En desarrollo' : 'In development',
      title:
        language === 'es'
          ? 'War room ejecutivo para decisiones de datos'
          : 'Executive war room for data decisions',
      description:
        language === 'es'
          ? 'Estamos consolidando señales de operación, riesgo y negocio en una misma superficie de decisión.'
          : 'We are consolidating operations, risk, and business signals into a single decision surface.',
      href: buildLabPath(language, 'war-room-ejecutivo-datos'),
      meta: language === 'es' ? 'Decision room' : 'Decision room',
      overview:
        language === 'es'
          ? 'Estamos construyendo una superficie ejecutiva para leer riesgo, operación y negocio en conjunto cuando la decisión necesita velocidad y contexto.'
          : 'We are building an executive surface to read risk, operations, and business together when decisions need speed and context.',
      problem:
        language === 'es'
          ? 'Cuando la información está fragmentada entre áreas, los comités reaccionan tarde o toman decisiones sin una foto integral de lo que está pasando.'
          : 'When information is fragmented across teams, committees react too late or make decisions without an integrated view of what is happening.',
      audience:
        language === 'es'
          ? ['C-level', 'PMO de transformación', 'Líderes de operación']
          : ['C-level', 'Transformation PMO', 'Operations leaders'],
      includes:
        language === 'es'
          ? [
              'Vista integrada de riesgo, negocio y operación',
              'Lecturas de comité con foco en decisiones urgentes',
              'Señales accionables para destrabar fricción ejecutiva',
            ]
          : [
              'Integrated view of risk, business, and operations',
              'Committee readouts focused on urgent decisions',
              'Actionable signals to unblock executive friction',
            ],
      signals:
        language === 'es'
          ? [
              'Exploración de layouts de decisión ejecutiva',
              'Selección de señales clave por tipo de comité',
              'Validación de narrativa y jerarquía visual',
            ]
          : [
              'Exploration of executive decision layouts',
              'Selection of key signals by committee type',
              'Validation of narrative and visual hierarchy',
            ],
    },
    {
      id: 'build-data-product-starter',
      slug: 'starter-kit-data-products',
      label: language === 'es' ? 'Próximo release' : 'Upcoming release',
      title:
        language === 'es'
          ? 'Starter kit para data products'
          : 'Starter kit for data products',
      description:
        language === 'es'
          ? 'Estamos empaquetando estándares de dominio, ownership y observabilidad para lanzar productos con menos fricción.'
          : 'We are packaging domain, ownership, and observability standards to launch products with less friction.',
      href: buildLabPath(language, 'starter-kit-data-products'),
      meta: language === 'es' ? 'Product starter' : 'Product starter',
      overview:
        language === 'es'
          ? 'Estamos empaquetando una base para lanzar data products con menos fricción: ownership, dominio, observabilidad y entregables mínimos claros.'
          : 'We are packaging a foundation to launch data products with less friction: ownership, domain, observability, and clear minimum deliverables.',
      problem:
        language === 'es'
          ? 'Muchos equipos quieren lanzar productos de datos, pero parten desde cero cada vez y pierden tiempo alineando prácticas básicas.'
          : 'Many teams want to launch data products, but they start from scratch every time and lose time aligning baseline practices.',
      audience:
        language === 'es'
          ? ['Product teams', 'Data domains', 'Arquitectura y gobierno']
          : ['Product teams', 'Data domains', 'Architecture and governance'],
      includes:
        language === 'es'
          ? [
              'Plantillas de ownership y definición de dominio',
              'Estándares base para monitoreo y adopción',
              'Kit mínimo para activar producto y operación',
            ]
          : [
              'Ownership templates and domain definition',
              'Baseline standards for monitoring and adoption',
              'Minimum kit to activate product and operations',
            ],
      signals:
        language === 'es'
          ? [
              'Empaque de artefactos mínimos por lanzamiento',
              'Diseño de journeys de activación por equipo',
              'Preparación para release inicial replicable',
            ]
          : [
              'Packaging of minimum artifacts per launch',
              'Design of activation journeys by team',
              'Preparation for a repeatable initial release',
            ],
    },
    {
      id: 'build-ai-ops-desk',
      slug: 'mesa-operaciones-agentes-ia',
      label: language === 'es' ? 'Radar de producto' : 'Product radar',
      title:
        language === 'es'
          ? 'Mesa de operaciones para agentes de IA'
          : 'Operations desk for AI agents',
      description:
        language === 'es'
          ? 'Estamos explorando monitoreo, fallback y gobierno para agentes que operan sobre procesos críticos.'
          : 'We are exploring monitoring, fallback, and governance for agents operating across critical processes.',
      href: buildLabPath(language, 'mesa-operaciones-agentes-ia'),
      meta: language === 'es' ? 'Agent operations' : 'Agent operations',
      overview:
        language === 'es'
          ? 'Estamos explorando una consola para monitorear agentes, fallback, incidentes y uso cuando la IA empieza a tocar procesos sensibles.'
          : 'We are exploring a console to monitor agents, fallback, incidents, and usage as AI begins to touch sensitive processes.',
      problem:
        language === 'es'
          ? 'Los agentes de IA necesitan una operación visible y gobernada; de lo contrario, fallas y desvíos aparecen sin contexto ni respuesta rápida.'
          : 'AI agents need visible, governed operations; otherwise failures and drift surface without context or fast response.',
      audience:
        language === 'es'
          ? ['Equipos de AI Ops', 'Operación tecnológica', 'Risk owners']
          : ['AI Ops teams', 'Technology operations', 'Risk owners'],
      includes:
        language === 'es'
          ? [
              'Señales para monitorear comportamiento de agentes',
              'Fallback y rutas de escalamiento operacional',
              'Contexto para gobernar uso y desempeño',
            ]
          : [
              'Signals to monitor agent behavior',
              'Fallback and operational escalation paths',
              'Context to govern usage and performance',
            ],
      signals:
        language === 'es'
          ? [
              'Exploración de métricas y alertas para agentes',
              'Definición de vistas para operación y riesgo',
              'Diseño de fallback y control operativo',
            ]
          : [
              'Exploration of metrics and alerts for agents',
              'Definition of views for operations and risk',
              'Design of fallback and operational control',
            ],
    },
  ];
}

export function getMomentumLabs(language: Language, _insightsHref: string) {
  return getMomentumLabDetails(language).map((item) => ({
    id: item.id,
    slug: item.slug,
    label: item.label,
    title: item.title,
    description: item.description,
    href: item.href,
    meta: item.meta,
    image: item.image ?? item.featuredImage ?? null,
  }));
}

export function getMomentumLabBySlug(language: Language, slug: string) {
  return getMomentumLabDetails(language).find((item) => item.slug === slug) || null;
}

export function buildMomentumContent({
  language,
  articles,
  insightsHref,
}: {
  language: Language;
  articles: MomentumNewsItem[];
  insightsHref: string;
}) {
  const articleImages = [articles[0]?.image, articles[1]?.image, articles[2]?.image].filter(Boolean);
  const events: MomentumCollectionItem[] = getMomentumEvents(language).map((event, index) => ({
    ...event,
    image: articleImages[index % Math.max(articleImages.length, 1)] || null,
    sponsorLogos: [
      DEFAULT_MOMENTUM_SPONSOR_LOGOS[index % DEFAULT_MOMENTUM_SPONSOR_LOGOS.length],
      DEFAULT_MOMENTUM_SPONSOR_LOGOS[(index + 1) % DEFAULT_MOMENTUM_SPONSOR_LOGOS.length],
    ],
  }));
  const labs: MomentumCollectionItem[] = getMomentumLabs(language, insightsHref).map((lab, index) => ({
    ...lab,
    image: articleImages[(index + 1) % Math.max(articleImages.length, 1)] || null,
  }));

  return { events, labs };
}
