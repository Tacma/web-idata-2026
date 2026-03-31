import { useEffect, useState } from 'react';
import { CTABandSection } from '../components/sections/CTABandSection';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { CaseStudyCard } from '../components/case-studies/CaseStudyCard';
import { getPublished as getPublishedServices } from '../../../services/servicesService';
import { getPublished as getPublishedCaseStudies } from '../../../services/caseStudiesService';
import { buildPublicCaseStudyView } from '../../shared/utils/caseStudyPublic';

import dataStrategyImage from '/assets/images/services/data-strategy.png';
import dataEngineeringImage from '/assets/images/services/data-engineering.png';
import dataPlatformsImage from '/assets/images/services/data-platforms.png';
import dataOperationsImage from '/assets/images/services/data-operations.png';

const serviceImageMap: Record<string, string> = {
  'strategy-consulting': dataStrategyImage,
  'data-delivery': dataEngineeringImage,
  'data-operations': dataOperationsImage,
  'cloud-services-provider': dataPlatformsImage,
};

const featuredCaseSlugs = ['cueros-velez', 'haceb', 'nadro'];
const routeStepColors = ['#0891B2', '#2563EB', '#7C3AED', '#DB2777'];
const serviceStoryImageMap = {
  banner: '/assets/images/services/story-build/banner-foundation.png',
  foundation: '/assets/images/services/story-build/step-1-foundation-grid.png',
  structure: '/assets/images/services/story-build/step-2-structure.png',
  enablement: '/assets/images/services/story-build/step-3-platform.png',
  operations: '/assets/images/services/story-build/step-4-operations.png',
} as const;

const serviceCopyFallbacks = {
  'strategy-consulting': {
    title_es: 'Estrategia y consultoría',
    title_en: 'Strategy & Consulting',
    excerpt_es: 'Diseñamos estrategias de datos, gobierno y calidad para maximizar el valor de la información.',
    excerpt_en: 'We design data strategies, governance and quality frameworks to maximize information value.',
  },
  'data-delivery': {
    title_es: 'Entrega de datos',
    title_en: 'Data Delivery',
    excerpt_es: 'Construimos arquitecturas modernas de datos, analítica avanzada y soluciones de inteligencia artificial.',
    excerpt_en: 'We build modern data architectures and advanced analytics and artificial intelligence solutions.',
  },
  'data-operations': {
    title_es: 'Operaciones de datos',
    title_en: 'Data Operations',
    excerpt_es: 'Operamos y optimizamos ecosistemas de datos con modelos ágiles, confiables y automatizados.',
    excerpt_en: 'We operate and optimize data ecosystems with agile and automated models.',
  },
  'cloud-services-provider': {
    title_es: 'Plataformas cloud',
    title_en: 'Cloud Services Provider',
    excerpt_es: 'Implementamos y administramos plataformas de datos en la nube con tecnologías líderes.',
    excerpt_en: 'We implement and manage cloud data platforms with leading technologies.',
  },
} as const;

const serviceDetailFallbacks = {
  'strategy-consulting': {
    content_es:
      'Ayudamos a alinear visión, prioridades, gobierno y hoja de ruta para que la inversión en datos responda al negocio con una base confiable y operable.',
    content_en:
      'We help align vision, priorities, governance, and roadmap so data investment responds to the business with a reliable and operable foundation.',
    capabilities: [
      {
        title_es: 'Definición de estrategia',
        title_en: 'Strategy definition',
        description_es: 'Diseñamos roadmaps de datos conectados con objetivos, casos de uso y capacidad real de ejecución.',
        description_en: 'We design data roadmaps connected to business goals, use cases, and real execution capacity.',
      },
      {
        title_es: 'Marcos de gobernanza',
        title_en: 'Governance frameworks',
        description_es: 'Definimos políticas, roles y reglas para que la gestión de datos sea clara, sostenible y medible.',
        description_en: 'We define policies, roles, and rules so data management becomes clear, sustainable, and measurable.',
      },
      {
        title_es: 'Calidad de datos',
        title_en: 'Data quality',
        description_es: 'Aterrizamos criterios de confiabilidad, trazabilidad y control para que la base no falle en producción.',
        description_en: 'We land reliability, traceability, and control criteria so the foundation does not fail in production.',
      },
      {
        title_es: 'Madurez analítica',
        title_en: 'Analytics maturity',
        description_es: 'Evaluamos capacidades actuales y brechas para priorizar una evolución de datos con criterio.',
        description_en: 'We assess current capabilities and gaps to prioritize a data evolution path with clarity.',
      },
    ],
    benefits: [
      { title_es: 'Decisiones informadas', title_en: 'Informed decisions' },
      { title_es: 'Alineación estratégica', title_en: 'Strategic alignment' },
      { title_es: 'Gobierno operable', title_en: 'Operable governance' },
    ],
  },
  'data-delivery': {
    content_es:
      'Convertimos la visión en arquitectura, integración y activos analíticos listos para mover datos con velocidad, orden y escalabilidad.',
    content_en:
      'We turn the vision into architecture, integration, and analytical assets ready to move data with speed, order, and scalability.',
    capabilities: [
      {
        title_es: 'Arquitectura de datos',
        title_en: 'Data architecture',
        description_es: 'Diseñamos data lakes, lakehouses y modelos modernos para soportar crecimiento, gobierno y consumo analítico.',
        description_en: 'We design data lakes, lakehouses, and modern models that support growth, governance, and analytical consumption.',
      },
      {
        title_es: 'Pipelines de datos',
        title_en: 'Data pipelines',
        description_es: 'Construimos flujos ETL y ELT robustos, observables y preparados para cargas críticas.',
        description_en: 'We build robust, observable ETL and ELT flows ready for critical workloads.',
      },
      {
        title_es: 'Integración de datos',
        title_en: 'Data integration',
        description_es: 'Conectamos fuentes, procesos y aplicaciones para consolidar una operación analítica más coherente.',
        description_en: 'We connect sources, processes, and applications to consolidate a more coherent analytical operation.',
      },
      {
        title_es: 'Infraestructura cloud',
        title_en: 'Cloud infrastructure',
        description_es: 'Desplegamos la base técnica sobre Azure, AWS o Google Cloud según el contexto operativo del cliente.',
        description_en: 'We deploy the technical foundation on Azure, AWS, or Google Cloud according to the client’s operating context.',
      },
    ],
    benefits: [
      { title_es: 'Time-to-insight menor', title_en: 'Faster time-to-insight' },
      { title_es: 'Datos confiables', title_en: 'Reliable data' },
      { title_es: 'Base escalable', title_en: 'Scalable foundation' },
    ],
  },
  'cloud-services-provider': {
    content_es:
      'Activamos la plataforma, el entorno cloud y los componentes que permiten operar con seguridad, elasticidad y trazabilidad desde el día uno.',
    content_en:
      'We activate the platform, cloud environment, and core components that enable secure, elastic, and traceable operations from day one.',
    capabilities: [
      {
        title_es: 'Infraestructura gestionada',
        title_en: 'Managed infrastructure',
        description_es: 'Orquestamos entornos cloud listos para correr plataformas de datos con control operativo y escalabilidad.',
        description_en: 'We orchestrate cloud environments ready to run data platforms with operational control and scalability.',
      },
      {
        title_es: 'Seguridad cloud',
        title_en: 'Cloud security',
        description_es: 'Alineamos acceso, cumplimiento y buenas prácticas para proteger la operación desde la base.',
        description_en: 'We align access, compliance, and best practices to protect the operation from the foundation.',
      },
      {
        title_es: 'Optimización de costos',
        title_en: 'Cost optimization',
        description_es: 'Diseñamos la plataforma para crecer sin perder visibilidad ni eficiencia financiera.',
        description_en: 'We design the platform to grow without losing visibility or financial efficiency.',
      },
      {
        title_es: 'Monitoreo 24/7',
        title_en: '24/7 monitoring',
        description_es: 'Dejamos monitoreo proactivo y señales operativas para sostener continuidad en producción.',
        description_en: 'We leave proactive monitoring and operational signals in place to sustain production continuity.',
      },
    ],
    benefits: [
      { title_es: 'Seguridad base', title_en: 'Core security' },
      { title_es: 'Elasticidad real', title_en: 'Real elasticity' },
      { title_es: 'Menor fricción operativa', title_en: 'Lower operational friction' },
    ],
  },
  'data-operations': {
    content_es:
      'Sostenemos la operación con monitoreo, soporte y mejora continua para que la plataforma no solo funcione, sino que evolucione con control.',
    content_en:
      'We sustain operations through monitoring, support, and continuous improvement so the platform not only runs, but evolves with control.',
    capabilities: [
      {
        title_es: 'Soporte operativo',
        title_en: 'Operational support',
        description_es: 'Acompañamos la operación diaria con atención especializada sobre componentes y flujos críticos.',
        description_en: 'We support day-to-day operations with specialized attention on critical components and flows.',
      },
      {
        title_es: 'Monitoreo continuo',
        title_en: 'Continuous monitoring',
        description_es: 'Detectamos desvíos, incidentes y degradaciones antes de que afecten a negocio y analítica.',
        description_en: 'We detect deviations, incidents, and degradation before they impact business and analytics.',
      },
      {
        title_es: 'Mantenimiento evolutivo',
        title_en: 'Evolutionary maintenance',
        description_es: 'Ajustamos procesos, jobs y componentes para sostener rendimiento, confiabilidad y crecimiento.',
        description_en: 'We tune processes, jobs, and components to sustain performance, reliability, and growth.',
      },
      {
        title_es: 'Talento especializado',
        title_en: 'Specialized talent',
        description_es: 'Sumamos capacidad experta para reforzar iniciativas, backlog y operación continua.',
        description_en: 'We add expert capacity to reinforce initiatives, backlog, and continuous operation.',
      },
    ],
    benefits: [
      { title_es: 'Continuidad operativa', title_en: 'Operational continuity' },
      { title_es: 'Respuesta más rápida', title_en: 'Faster response' },
      { title_es: 'Evolución sostenida', title_en: 'Sustained evolution' },
    ],
  },
} as const;

const guidedRoute = {
  es: [
    {
      stage: 'Paso 1',
      title: 'Empezamos por el cimiento del valor',
      description: 'Leemos prioridades, fricciones, gobierno y decisiones críticas para definir sobre qué base debe construirse la solución.',
      question: '¿Qué necesita realmente el negocio para que la base no falle?',
      outcome: 'Salimos con una lectura clara del contexto, riesgos y prioridades.',
      primaryService: 'strategy-consulting',
      subservices: ['Diagnóstico de madurez', 'Gobierno y calidad', 'Priorización de casos de uso'],
    },
    {
      stage: 'Paso 2',
      title: 'Le damos estructura a la plataforma',
      description: 'Traducimos la necesidad de negocio en arquitectura, flujos de datos, integración y capacidades analíticas concretas.',
      question: '¿Qué estructura de datos y analítica debe sostener esa visión?',
      outcome: 'Convertimos la necesidad en un diseño técnico y funcional accionable.',
      primaryService: 'data-delivery',
      subservices: ['Arquitectura de datos', 'Pipelines e integración', 'Analítica e IA aplicada'],
    },
    {
      stage: 'Paso 3',
      title: 'Activamos el entorno para operar',
      description: 'Seleccionamos y activamos los componentes que permiten operar la solución con velocidad, escalabilidad y trazabilidad.',
      question: '¿Qué habilitadores permiten ejecutar bien la estructura?',
      outcome: 'Definimos la plataforma, herramientas y capacidades base para operar.',
      primaryService: 'cloud-services-provider',
      subservices: ['Plataformas cloud', 'Lakehouse y data sharing', 'Observabilidad y seguridad base'],
    },
    {
      stage: 'Paso 4',
      title: 'Llevamos el edificio a operación continua',
      description: 'Estabilizamos la operación, medimos desempeño y dejamos una ruta clara para evolucionar con control.',
      question: '¿Cómo hacemos que la solución no solo funcione, sino que evolucione?',
      outcome: 'Dejamos una operación medible, soportada y lista para escalar.',
      primaryService: 'data-operations',
      subservices: ['Soporte operativo', 'Automatización y monitoreo', 'Optimización continua'],
    },
  ],
  en: [
    {
      stage: 'Step 1',
      title: 'We start with the foundation of value',
      description: 'We read priorities, friction points, governance and critical decisions to define the base the solution must stand on.',
      question: 'What does the business really need so the foundation does not fail?',
      outcome: 'We leave with a clear reading of context, risk and priorities.',
      primaryService: 'strategy-consulting',
      subservices: ['Maturity assessment', 'Governance and quality', 'Use case prioritization'],
    },
    {
      stage: 'Step 2',
      title: 'We give the platform its structure',
      description: 'We translate the business need into architecture, data flows, integration and concrete analytics capabilities.',
      question: 'What data and analytics structure should support that vision?',
      outcome: 'We turn the need into an actionable technical and functional design.',
      primaryService: 'data-delivery',
      subservices: ['Data architecture', 'Pipelines and integration', 'Applied analytics and AI'],
    },
    {
      stage: 'Step 3',
      title: 'We activate the environment to operate',
      description: 'We select and activate the components that allow the solution to run with speed, scalability and traceability.',
      question: 'Which enablers make that structure executable?',
      outcome: 'We define the platform, tools and core capabilities required to operate.',
      primaryService: 'cloud-services-provider',
      subservices: ['Cloud platforms', 'Lakehouse and data sharing', 'Observability and core security'],
    },
    {
      stage: 'Step 4',
      title: 'We take the building into continuous operation',
      description: 'We stabilize operations, measure performance and leave a clear path to evolve with control.',
      question: 'How do we ensure the solution not only runs, but evolves?',
      outcome: 'We leave a measurable, supported operation ready to scale.',
      primaryService: 'data-operations',
      subservices: ['Operational support', 'Automation and monitoring', 'Continuous optimization'],
    },
  ],
} as const;

function VacantLotScene({ language, isDark }: { language: 'es' | 'en'; isDark: boolean }) {
  return (
    <div
      className="relative min-h-[26rem] overflow-hidden rounded-[36px] border border-[var(--line-soft)] p-6 shadow-[0_28px_60px_rgba(8,15,30,0.18)]"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, rgba(14,23,38,0.98), rgba(10,18,32,0.94))'
          : 'linear-gradient(180deg, rgba(248,250,252,0.96), rgba(226,232,240,0.8))',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[54%] bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_62%)]" />
      <div
        className="absolute inset-x-10 bottom-8 h-24 rounded-[2.1rem] border"
        style={{
          borderColor: isDark ? 'rgba(148,163,184,0.18)' : 'rgba(148,163,184,0.42)',
          background: isDark
            ? 'linear-gradient(180deg, rgba(24,35,56,0.9), rgba(15,23,42,0.96))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.86), rgba(226,232,240,0.95))',
        }}
      />
      <div
        className="absolute inset-x-[18%] bottom-[5.5rem] h-12 rounded-[1.6rem] border"
        style={{
          borderColor: isDark ? 'rgba(148,163,184,0.18)' : 'rgba(148,163,184,0.44)',
          background: isDark
            ? 'linear-gradient(180deg, rgba(30,41,59,0.92), rgba(18,26,41,0.94))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(235,241,248,0.92))',
          boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : 'inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      />
      <div className="absolute left-[20%] right-[20%] top-[28%] h-px bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.28),transparent)]" />
      <div className="absolute left-[22%] top-[28%] h-[30%] w-px bg-[linear-gradient(180deg,rgba(59,130,246,0.26),transparent)]" />
      <div className="absolute right-[22%] top-[28%] h-[36%] w-px bg-[linear-gradient(180deg,rgba(59,130,246,0.24),transparent)]" />
      <div className="absolute left-[22%] top-[28%] h-3 w-3 rounded-full border border-sky-300 bg-[var(--surface-0)] shadow-[0_0_18px_rgba(14,165,233,0.18)]" />
      <div className="absolute right-[22%] top-[28%] h-3 w-3 rounded-full border border-violet-300 bg-[var(--surface-0)] shadow-[0_0_18px_rgba(124,58,237,0.16)]" />
      <div className="absolute left-[30%] top-[43%] h-2.5 w-[20%] rounded-full bg-sky-200/80 blur-[1px]" />
      <div className="absolute right-[28%] top-[48%] h-2.5 w-[18%] rounded-full bg-fuchsia-200/80 blur-[1px]" />
      <div className={`absolute left-[16%] bottom-[5.2rem] h-8 w-6 border-x-2 border-t-2 ${isDark ? 'border-white/18' : 'border-slate-300/80'}`} />
      <div className={`absolute right-[16%] bottom-[5.2rem] h-8 w-6 border-x-2 border-t-2 ${isDark ? 'border-white/18' : 'border-slate-300/80'}`} />
      <div className={`absolute left-[17%] bottom-[4.6rem] h-1.5 w-4 rounded-full ${isDark ? 'bg-white/18' : 'bg-slate-300/70'}`} />
      <div className={`absolute right-[17%] bottom-[4.6rem] h-1.5 w-4 rounded-full ${isDark ? 'bg-white/18' : 'bg-slate-300/70'}`} />
      <img
        src={serviceStoryImageMap.banner}
        alt={language === 'es' ? 'Base de construcción lista para iniciar' : 'Construction base ready to start'}
        className="absolute bottom-[2.2rem] left-1/2 z-[1] w-[66%] max-w-[22rem] -translate-x-1/2 object-contain drop-shadow-[0_24px_40px_rgba(14,165,233,0.18)]"
      />
    </div>
  );
}

function BuildingProgress({
  activeIndex,
  colors,
  language,
  isDark,
}: {
  activeIndex: number;
  colors: string[];
  language: 'es' | 'en';
  isDark: boolean;
}) {
  const activeColor = colors[Math.min(activeIndex, colors.length - 1)];

  return (
    <div
      className="relative overflow-hidden rounded-[36px] border border-[var(--line-soft)] p-6 shadow-[0_18px_50px_rgba(8,15,30,0.16)]"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, rgba(15,23,42,0.94), rgba(11,20,35,0.94))'
          : 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,248,255,0.98))',
      }}
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <a
            key={`step-tab-${index}`}
            href={`#build-step-${index + 1}`}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200"
            style={{
              borderColor: index === activeIndex ? `${color}60` : isDark ? 'rgba(148,163,184,0.18)' : 'rgba(148,163,184,0.22)',
              background: index === activeIndex
                ? `linear-gradient(135deg, ${color}16, ${isDark ? 'rgba(15,23,42,0.94)' : 'rgba(255,255,255,0.92)'})`
                : isDark
                  ? 'rgba(15,23,42,0.72)'
                  : 'rgba(255,255,255,0.84)',
              color: index === activeIndex ? color : isDark ? '#c6d4e5' : '#64748B',
            }}
          >
            <span>{language === 'es' ? `Paso ${index + 1}` : `Step ${index + 1}`}</span>
          </a>
        ))}
      </div>

      <div
        className="relative min-h-[18rem] rounded-[30px] border border-[var(--line-soft)]"
        style={{
          background: isDark
            ? 'radial-gradient(circle at top, rgba(56,189,248,0.12), transparent 34%), rgba(255,255,255,0.03)'
            : 'radial-gradient(circle at top, rgba(56,189,248,0.1), transparent 34%), rgba(255,255,255,0.65)',
        }}
      >
        <div className={`absolute inset-x-[20%] top-5 h-5 rounded-full border ${isDark ? 'border-white/12 bg-white/6' : 'border-slate-200/80 bg-white/72'}`} />
        <div
          className="absolute left-[9%] right-[9%] top-[82%] h-10 rounded-[1.55rem] border"
          style={{
            borderColor: isDark ? 'rgba(148,163,184,0.18)' : 'rgba(226,232,240,0.92)',
            background: isDark
              ? 'linear-gradient(180deg, rgba(30,41,59,0.88), rgba(15,23,42,0.95))'
              : 'linear-gradient(180deg, rgba(255,255,255,0.82), rgba(226,232,240,0.92))',
          }}
        />
        <div
          className="absolute left-1/2 top-[22%] h-[52%] w-[30%] -translate-x-1/2 rounded-[2.35rem] border"
          style={{
            borderColor: isDark ? 'rgba(148,163,184,0.18)' : 'rgba(226,232,240,0.92)',
            background: isDark
              ? 'linear-gradient(180deg, rgba(30,41,59,0.88), rgba(15,23,42,0.55))'
              : 'linear-gradient(180deg, rgba(255,255,255,0.88), rgba(226,232,240,0.55))',
            boxShadow: isDark
              ? 'inset -14px 0 18px rgba(15,23,42,0.18), inset 12px 0 18px rgba(255,255,255,0.03)'
              : 'inset -14px 0 18px rgba(148,163,184,0.12), inset 12px 0 18px rgba(255,255,255,0.6)',
          }}
        />
        <div className={`absolute left-[18%] top-[42%] h-[19%] w-[15%] rounded-[1.35rem] border ${isDark ? 'border-white/12 bg-white/6' : 'border-slate-200/80 bg-white/82'}`} />
        <div className={`absolute right-[18%] top-[46%] h-[17%] w-[14%] rounded-[1.25rem] border ${isDark ? 'border-white/12 bg-white/6' : 'border-slate-200/80 bg-white/82'}`} />

        {activeIndex >= 0 ? (
          <div className="absolute left-[15%] right-[15%] top-[74%] h-[11%] rounded-[1.45rem] border shadow-[0_18px_36px_rgba(8,145,178,0.14)]" style={{ borderColor: `${colors[0]}42`, background: `linear-gradient(180deg, ${colors[0]}20, rgba(255,255,255,0.78))` }} />
        ) : null}
        {activeIndex >= 1 ? (
          <div className="absolute left-1/2 top-[30%] h-[46%] w-[28%] -translate-x-1/2 rounded-[2.05rem] border shadow-[0_18px_38px_rgba(37,99,235,0.12)]" style={{ borderColor: `${colors[1]}46`, background: `linear-gradient(180deg, rgba(255,255,255,0.82), ${colors[1]}18)` }} />
        ) : null}
        {activeIndex >= 2 ? (
          <div className="absolute left-1/2 top-[14%] h-[18%] w-[18%] -translate-x-1/2 rounded-[1.15rem] border shadow-[0_14px_26px_rgba(124,58,237,0.14)]" style={{ borderColor: `${colors[2]}46`, background: `linear-gradient(180deg, rgba(255,255,255,0.86), ${colors[2]}18)` }} />
        ) : null}
        {activeIndex >= 3 ? (
          <div className="absolute left-[56%] top-[23%] h-[26%] w-[14%] rounded-[1.25rem] border shadow-[0_14px_28px_rgba(219,39,119,0.14)]" style={{ borderColor: `${colors[3]}46`, background: `linear-gradient(180deg, rgba(255,255,255,0.86), ${colors[3]}18)` }} />
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.12),transparent_62%)]" />
        <div className="absolute right-5 top-5 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ backgroundColor: `${activeColor}12`, color: activeColor }}>
          {activeIndex + 1}/4
        </div>
      </div>
    </div>
  );
}

export function ServicesPage() {
  const { language, getLocalizedValue } = useLanguage();
  const { isDark } = useTheme();
  const [services, setServices] = useState<any[]>([]);
  const [featuredCases, setFeaturedCases] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [servicesData, caseStudiesData] = await Promise.all([
          getPublishedServices(language),
          getPublishedCaseStudies(language),
        ]);

        if (cancelled) return;

        const selectedCases = caseStudiesData.filter((caseStudy: any) =>
          featuredCaseSlugs.includes(caseStudy.slug_es) || featuredCaseSlugs.includes(caseStudy.slug_en)
        );

        setServices(servicesData);
        setFeaturedCases(selectedCases.length > 0 ? selectedCases : caseStudiesData.slice(0, 3));
      } catch (error) {
        console.error('Error loading services page content:', error);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language]);

  const content = {
    intro: {
      title: language === 'es'
        ? 'Construimos soluciones de Data & AI paso a paso'
        : 'We build Data & AI solutions step by step',
      description: language === 'es'
        ? 'La página ya no empieza con un catálogo. Empieza con el terreno: ordenamos el problema, construimos la base y vamos levantando el edificio con el servicio correcto en cada fase.'
        : 'This page no longer starts like a catalog. It starts from the ground: we organize the problem, build the foundation, and raise the building with the right service at each phase.',
    },
    steps: {
      eyebrow: language === 'es' ? 'Construcción guiada' : 'Guided construction',
      serviceLabel: language === 'es' ? 'Servicio que construye esta fase' : 'Service building this phase',
      questionLabel: language === 'es' ? 'La pregunta aquí es' : 'The question here is',
      outcomeLabel: language === 'es' ? 'Lo que construimos' : 'What we build here',
      subservicesLabel: language === 'es' ? 'Capacidades que entran en esta fase' : 'Capabilities activated in this phase',
      cta: language === 'es' ? 'Contratar este servicio' : 'Hire this service',
    },
    technologies: {
      title: language === 'es' ? 'Tecnología que sostiene el edificio' : 'Technology sustaining the building',
      description: language === 'es'
        ? 'Estas plataformas no viven separadas del servicio. Son el ecosistema sobre el que diseñamos, implementamos y operamos soluciones empresariales de Data & AI.'
        : 'These platforms do not live apart from the service model. They are the ecosystem on which we design, implement, and operate enterprise Data & AI solutions.',
    },
    cases: {
      title: language === 'es' ? 'Casos de éxito: el edificio ya construido' : 'Success stories: the building already in place',
      description: language === 'es'
        ? 'Aquí se ve el edificio completo en acción: plataformas activas, decisiones más rápidas y resultados medibles que nacen de una construcción bien hecha.'
        : 'This is what the completed building looks like in action: live platforms, faster decisions, and measurable outcomes that come from building it right.',
      cta: language === 'es' ? 'Ver caso completo' : 'View full case',
    },
    cta: {
      title: language === 'es'
        ? 'Conversemos sobre cómo empezar a construir tu edificio de datos'
        : 'Let us talk about how to start building your data foundation',
    },
  };

  const ctaSection = {
    title: content.cta.title,
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}`,
  };

  function pickLocalizedText(
    localizedValue: string | undefined,
    alternateValue: string | undefined,
    fallbackLocalized: string | undefined,
    fallbackAlternate: string | undefined
  ) {
    const localized = String(localizedValue || '').trim();
    const alternate = String(alternateValue || '').trim();
    const fallbackLocal = String(fallbackLocalized || '').trim();
    const fallbackAlt = String(fallbackAlternate || '').trim();

    if (language === 'es') {
      if (localized && localized !== alternate) return localized;
      if (fallbackLocal) return fallbackLocal;
      return localized || alternate || fallbackAlt;
    }

    if (alternate && alternate !== localized) return alternate;
    if (fallbackAlt) return fallbackAlt;
    return alternate || localized || fallbackLocal;
  }

  function getServiceDisplay(service: any) {
    const serviceKey = (service?.slug_en || service?.slug_es || '') as keyof typeof serviceCopyFallbacks;
    const fallbackCopy = serviceCopyFallbacks[serviceKey];
    const fallbackDetail = serviceDetailFallbacks[serviceKey];

    const capabilitiesSource =
      Array.isArray(service?.capabilities) && service.capabilities.length > 0
        ? service.capabilities
        : fallbackDetail?.capabilities || [];

    const localizedCapabilities = capabilitiesSource
      .map((item: any) => ({
        title: pickLocalizedText(item?.title_es, item?.title_en, item?.title_es, item?.title_en),
        description: pickLocalizedText(item?.description_es, item?.description_en, item?.description_es, item?.description_en),
      }))
      .filter((item: { title: string; description: string }) => item.title || item.description);

    const benefitsSource =
      Array.isArray(service?.benefits) && service.benefits.length > 0
        ? service.benefits
        : fallbackDetail?.benefits || [];

    const localizedBenefits = benefitsSource
      .map((item: any) => pickLocalizedText(item?.title_es, item?.title_en, item?.title_es, item?.title_en))
      .filter(Boolean);

    return {
      key: serviceKey,
      title: pickLocalizedText(
        service?.title_es,
        service?.title_en,
        fallbackCopy?.title_es,
        fallbackCopy?.title_en
      ),
      excerpt: pickLocalizedText(
        service?.excerpt_es,
        service?.excerpt_en,
        fallbackCopy?.excerpt_es,
        fallbackCopy?.excerpt_en
      ),
      content: pickLocalizedText(
        service?.content_es,
        service?.content_en,
        fallbackDetail?.content_es,
        fallbackDetail?.content_en
      ),
      slug: getLocalizedValue(service?.slug_es, service?.slug_en),
      image: service?.heroImage || serviceImageMap[service?.slug_en] || serviceImageMap[service?.slug_es],
      capabilities: localizedCapabilities,
      benefits: localizedBenefits,
    };
  }

  const servicesByKey = services.reduce<Record<string, any>>((accumulator, service) => {
    const key = service.slug_en || service.slug_es;
    if (key) accumulator[key] = service;
    return accumulator;
  }, {});

  const routeSteps = guidedRoute[language];

  return (
    <>
      <SEOHead
        title={language === 'es' ? 'Servicios de Datos e IA - iData' : 'Data and AI Services - iData'}
        description={content.intro.description}
        canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/`}
        alternateES="/es/servicios/"
        alternateEN="/en/services/"
        language={language}
      />

      <section className="bg-[var(--surface-0)] pb-8 pt-24 md:pb-12 md:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-light leading-[0.98] text-[var(--text-strong)] md:text-[4.5rem]">
                {language === 'es' ? 'Construimos' : 'We build'}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-soft)] md:text-lg">
                {language === 'es'
                  ? 'Antes de construir, suele haber datos regados, decisiones dispersas y plataformas sin una dirección común. Aquí es donde empezamos a ordenar el terreno.'
                  : 'Before building, there are usually scattered data points, disconnected decisions, and platforms without a common direction. This is where we start organizing the ground.'}
              </p>
              <a
                href="#build-step-1"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white shadow-[0_16px_32px_rgba(15,23,42,0.18)] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
              >
                {language === 'es' ? 'Empecemos a construir' : 'Let’s start building'}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <VacantLotScene language={language} isDark={isDark} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-0)] pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {routeSteps.map((step, index) => {
            const mappedService = servicesByKey[step.primaryService];
            const serviceDisplay = getServiceDisplay(mappedService || { slug_en: step.primaryService, slug_es: step.primaryService });
            const serviceColor = routeStepColors[index % routeStepColors.length];
            const stepVisual =
              index === 0
                ? serviceStoryImageMap.foundation
                : index === 1
                  ? serviceStoryImageMap.structure
                  : index === 2
                    ? serviceStoryImageMap.enablement
                    : serviceStoryImageMap.operations;

            return (
              <section
                id={`build-step-${index + 1}`}
                key={`${step.stage}-${step.primaryService}`}
                className={`${index === 0 ? '' : '-mt-4 md:-mt-8 lg:-mt-12'} relative pb-10 md:pb-14 lg:min-h-[78vh] lg:pb-24`}
                style={{ zIndex: routeSteps.length - index }}
              >
                <motion.article
                  className="sticky top-[5.5rem] overflow-hidden rounded-[34px] border border-[var(--line-soft)] bg-[var(--glass-surface)] shadow-[0_28px_58px_rgba(8,15,30,0.16)] md:top-24"
                  style={{ borderColor: `${serviceColor}30` }}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.55 }}
                >
                  <div
                    className="h-2 w-full"
                    style={{ background: `linear-gradient(90deg, ${serviceColor}, ${serviceColor}66)` }}
                  />

                  <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: serviceColor }}>
                        {step.stage}
                      </p>
                      <h2 className="mt-4 text-3xl font-light leading-[1.02] text-[var(--text-strong)] md:text-[3rem]">
                        {step.title}
                      </h2>
                      <p className="mt-5 max-w-md text-base leading-7 text-[var(--text-soft)] md:text-lg">
                        {step.description}
                      </p>

                      <div className="mt-8">
                        <BuildingProgress activeIndex={index} colors={routeStepColors} language={language} isDark={isDark} />
                      </div>

                      <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div
                          className="rounded-[24px] border px-5 py-5"
                          style={{ borderColor: `${serviceColor}2e`, backgroundColor: `${serviceColor}0d` }}
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: serviceColor }}>
                            {content.steps.questionLabel}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-[var(--text-strong)] md:text-base">
                            {step.question}
                          </p>
                        </div>

                        <div className="rounded-[24px] border border-[var(--line-soft)] bg-[var(--surface-1)] px-5 py-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: serviceColor }}>
                            {content.steps.outcomeLabel}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-[var(--text-strong)] md:text-base">
                            {step.outcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="grid gap-6 xl:grid-cols-[13.5rem_minmax(0,1fr)]">
                        <div
                          className="overflow-hidden rounded-[28px] border p-3.5 xl:self-start"
                          style={{
                            borderColor: `${serviceColor}30`,
                            background: isDark
                              ? `linear-gradient(180deg, ${serviceColor}16, rgba(15,23,42,0.92))`
                              : `linear-gradient(180deg, ${serviceColor}10, rgba(255,255,255,0.96))`,
                          }}
                        >
                          <div className="flex items-center justify-center overflow-hidden rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-0)]/90 px-3 py-4">
                            <img
                              src={stepVisual}
                              alt={serviceDisplay.title}
                              className="h-auto w-full max-w-[10.5rem] object-contain md:max-w-[11.5rem]"
                            />
                          </div>
                        </div>

                        <div className="max-w-3xl">
                          <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: serviceColor }}>
                            {content.steps.serviceLabel}
                          </p>
                          <h3 className="mt-3 text-[2rem] font-light leading-[1.02] text-[var(--text-strong)] md:text-[2.4rem]">
                            {serviceDisplay.title}
                          </h3>
                          {serviceDisplay.content ? (
                            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-soft)] md:text-[15px]">
                              {serviceDisplay.content}
                            </p>
                          ) : null}

                          {serviceDisplay.benefits.length > 0 ? (
                            <div className="mt-5 flex flex-wrap gap-2.5">
                              {serviceDisplay.benefits.slice(0, 3).map((item: string) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-0)] px-3.5 py-2 text-sm font-medium text-[var(--text-soft)] shadow-sm"
                                  style={{ borderColor: `${serviceColor}24` }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div
                        className="mt-8 rounded-[28px] border p-5 md:p-6"
                        style={{
                          borderColor: `${serviceColor}30`,
                          background: isDark
                            ? `linear-gradient(180deg, ${serviceColor}14, rgba(15,23,42,0.92))`
                            : `linear-gradient(180deg, ${serviceColor}10, rgba(255,255,255,0.96))`,
                        }}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--text-soft)]">
                          {content.steps.subservicesLabel}
                        </p>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          {(serviceDisplay.capabilities.length > 0
                            ? serviceDisplay.capabilities
                            : step.subservices.map((item) => ({ title: item, description: '' }))
                          ).map((item: { title: string; description: string }) => (
                            <div
                              key={`${serviceDisplay.key}-${item.title}`}
                              className="rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-0)] px-4 py-4 shadow-[0_10px_30px_rgba(8,15,30,0.12)]"
                              style={{ borderColor: `${serviceColor}22` }}
                            >
                              <p className="text-sm font-semibold text-[var(--text-strong)]">{item.title}</p>
                              {item.description ? (
                                <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                                  {item.description}
                                </p>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}?service=${encodeURIComponent(serviceDisplay.slug)}`}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-medium text-white shadow-[0_18px_36px_rgba(15,23,42,0.14)] transition-transform duration-200 hover:-translate-y-0.5"
                        style={{ backgroundColor: serviceColor }}
                      >
                        {content.steps.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </section>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--surface-0)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto mb-12 max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4387DF]">
              {language === 'es' ? 'Casos de éxito' : 'Success stories'}
            </p>
            <h2 className="mt-4 text-3xl font-light text-[var(--text-strong)] md:text-4xl">
              {content.cases.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-soft)] md:text-lg">
              {content.cases.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {featuredCases.map((caseStudy, index) => {
              const publicCase = buildPublicCaseStudyView(caseStudy, language, {
                industryName: getLocalizedValue(
                  caseStudy.industry?.title_es || '',
                  caseStudy.industry?.title_en || ''
                ),
                serviceTitles: Array.isArray(caseStudy.related_services)
                  ? caseStudy.related_services
                      .map((service: any) =>
                        getLocalizedValue(service?.title_es || '', service?.title_en || '')
                      )
                      .filter(Boolean)
                  : [],
              });

              return (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CaseStudyCard
                    href={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/${getLocalizedValue(caseStudy.slug_es, caseStudy.slug_en)}`}
                    language={language}
                    industry={publicCase.industry}
                    region={publicCase.region}
                    solutionType={publicCase.solutionType}
                    title={publicCase.title}
                    summary={publicCase.summary}
                    results={[...publicCase.quantitativeImpacts, ...publicCase.qualitativeImpacts].slice(0, 3)}
                    technologyTags={publicCase.technologies}
                    logoSrc={publicCase.clientLogoUrl}
                    coverImage={publicCase.coverImage || undefined}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABandSection section={ctaSection} />
    </>
  );
}
