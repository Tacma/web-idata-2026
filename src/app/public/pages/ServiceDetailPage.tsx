import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Database,
  Network,
  Cloud,
  Settings,
  CheckCircle2,
  TrendingUp,
  Zap,
  Target,
  Shield,
  Sparkles,
  Activity,
  Users,
  Gauge,
} from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { CaseStudyCard } from '../components/case-studies/CaseStudyCard';
import { SEOHead } from '../../shared/components/SEOHead';
import { CTABandSection } from '../components/sections/CTABandSection';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { FloatingElements } from '../components/FloatingElements';
import { InternalPageHero } from '../components/InternalPageHero';
import { serviceColors, type ServiceSlug } from './serviceColors';
import { buildContactLink } from '../../shared/utils/contactLinks';
import { getBySlug, getPublished as getPublishedServices } from '../../../services/servicesService';
import { getPublished as getPublishedCaseStudies } from '../../../services/caseStudiesService';
import { getPublished as getPublishedPartners } from '../../../services/partnersService';
import { buildPublicCaseStudyView } from '../../shared/utils/caseStudyPublic';

import dataStrategyImage from '/assets/images/services/data-strategy.png';
import dataEngineeringImage from '/assets/images/services/data-engineering.png';
import dataPlatformsImage from '/assets/images/services/data-platforms.png';
import dataOperationsImage from '/assets/images/services/data-operations.png';
import microsoftLogo from '/assets/logos/partners/microsoft.png';
import snowflakeLogo from '/assets/logos/partners/snowflake.png';
import databricksLogo from '/assets/logos/partners/databricks.png';
import googleCloudLogo from '/assets/logos/partners/google-cloud.png';
import awsLogo from '/assets/logos/partners/aws.png';

const serviceSlugEntries = [
  { slug: 'strategy-consulting', slug_es: 'strategy-consulting', slug_en: 'strategy-consulting' },
  { slug: 'data-delivery', slug_es: 'data-delivery', slug_en: 'data-delivery' },
  { slug: 'data-operations', slug_es: 'data-operations', slug_en: 'data-operations' },
  { slug: 'cloud-services-provider', slug_es: 'cloud-services-provider', slug_en: 'cloud-services-provider' },
];

const serviceImageMap: Record<string, string> = {
  'strategy-consulting': dataStrategyImage,
  'data-delivery': dataEngineeringImage,
  'data-operations': dataOperationsImage,
  'cloud-services-provider': dataPlatformsImage,
};

const allTechnologies: Record<string, string> = {
  'Microsoft': microsoftLogo,
  'Databricks': databricksLogo,
  'Snowflake': snowflakeLogo,
  'AWS': awsLogo,
  'Google Cloud': googleCloudLogo,
};

const serviceIconMap: Record<string, any> = {
  'strategy-consulting': Database,
  'data-delivery': Network,
  'data-operations': Settings,
  'cloud-services-provider': Cloud,
};

const capabilityIcons = [Target, Shield, CheckCircle2, Sparkles, Network, Cloud, Settings, Activity, Users, Gauge];
const benefitIcons = [TrendingUp, Shield, Zap, Target, CheckCircle2, Cloud, Sparkles, Gauge];
const allowMockFallback = import.meta.env.DEV;

const serviceFallbackContent: Record<string, any> = {
  'strategy-consulting': {
    slug: 'strategy-consulting',
    slug_es: 'strategy-consulting',
    slug_en: 'strategy-consulting',
    title_es: 'Strategy & Consulting',
    title_en: 'Strategy & Consulting',
    excerpt_es: 'Diseñamos estrategias de datos, gobierno y marcos de calidad para maximizar el valor de la información.',
    excerpt_en: 'We design data strategies, governance and quality frameworks to maximize information value.',
    content_es:
      'Ayudamos a las organizaciones a construir estrategias de datos sólidas, establecer marcos de gobernanza efectivos y crear una cultura data-driven que impulse la toma de decisiones informadas y genere ventajas competitivas sostenibles.',
    content_en:
      'We help organizations build solid data strategies, establish effective governance frameworks and create a data-driven culture that drives informed decision-making and generates sustainable competitive advantages.',
    capabilities: [
      { title_es: 'Definición de estrategia', title_en: 'Strategy definition', description_es: 'Diseñamos roadmaps de datos alineados con objetivos de negocio y capacidades organizacionales.', description_en: 'We design data roadmaps aligned with business objectives and organizational capabilities.' },
      { title_es: 'Marcos de gobernanza', title_en: 'Governance frameworks', description_es: 'Establecemos políticas, roles y responsabilidades para una gestión efectiva de datos.', description_en: 'We establish policies, roles and responsibilities for effective data management.' },
      { title_es: 'Calidad de datos', title_en: 'Data quality', description_es: 'Implementamos procesos y herramientas para asegurar confiabilidad y consistencia.', description_en: 'We implement processes and tools to ensure reliability and consistency.' },
      { title_es: 'Madurez analítica', title_en: 'Analytics maturity', description_es: 'Evaluamos y elevamos las capacidades analíticas de tu organización.', description_en: 'We assess and elevate your organization’s analytical capabilities.' },
    ],
    benefits: [
      { title_es: 'Decisiones informadas', title_en: 'Informed decisions', description_es: 'Datos confiables para mejores decisiones estratégicas.', description_en: 'Reliable data for better strategic decisions.' },
      { title_es: 'Cumplimiento normativo', title_en: 'Regulatory compliance', description_es: 'Gestión adecuada de privacidad, seguridad y gobierno.', description_en: 'Proper privacy, security and governance management.' },
      { title_es: 'Eficiencia operativa', title_en: 'Operational efficiency', description_es: 'Optimizamos procesos de gestión y consumo de datos.', description_en: 'We optimize data management and consumption processes.' },
      { title_es: 'Alineación estratégica', title_en: 'Strategic alignment', description_es: 'Los datos al servicio de objetivos concretos de negocio.', description_en: 'Data serving concrete business goals.' },
    ],
    technologies: ['Microsoft', 'Databricks', 'Snowflake'],
    relatedCaseStudies: ['cueros-velez', 'haceb'],
  },
  'data-delivery': {
    slug: 'data-delivery',
    slug_es: 'data-delivery',
    slug_en: 'data-delivery',
    title_es: 'Data Delivery',
    title_en: 'Data Delivery',
    excerpt_es: 'Construimos arquitecturas modernas de datos y soluciones de analítica avanzada e inteligencia artificial.',
    excerpt_en: 'We build modern data architectures and advanced analytics and artificial intelligence solutions.',
    content_es:
      'Construimos la infraestructura de datos que impulsa tu transformación digital. Diseñamos arquitecturas modernas, desarrollamos pipelines eficientes e implementamos soluciones analíticas para establecer las bases técnicas de una organización data-driven.',
    content_en:
      'We build the data infrastructure that drives your digital transformation. We design modern architectures, develop efficient pipelines and implement analytics solutions to establish the technical foundations of a data-driven organization.',
    capabilities: [
      { title_es: 'Arquitectura de datos', title_en: 'Data architecture', description_es: 'Diseñamos Data Lakes, Lakehouses y arquitecturas modernas para escalar.', description_en: 'We design Data Lakes, Lakehouses and modern architectures to scale.' },
      { title_es: 'Pipelines de datos', title_en: 'Data pipelines', description_es: 'Construimos pipelines ETL/ELT robustos, eficientes y monitorizables.', description_en: 'We build robust, efficient and monitorable ETL/ELT pipelines.' },
      { title_es: 'Integración de datos', title_en: 'Data integration', description_es: 'Conectamos y centralizamos datos de múltiples fuentes empresariales.', description_en: 'We connect and centralize data from multiple business sources.' },
      { title_es: 'Infraestructura cloud', title_en: 'Cloud infrastructure', description_es: 'Desplegamos soluciones en AWS, Azure y Google Cloud.', description_en: 'We deploy solutions on AWS, Azure and Google Cloud.' },
    ],
    benefits: [
      { title_es: 'Procesamiento escalable', title_en: 'Scalable processing', description_es: 'Maneja grandes volúmenes de datos eficientemente.', description_en: 'Handle large data volumes efficiently.' },
      { title_es: 'Datos confiables', title_en: 'Reliable data', description_es: 'Pipelines robustos con validación y monitoreo.', description_en: 'Robust pipelines with validation and monitoring.' },
      { title_es: 'Time-to-insight reducido', title_en: 'Reduced time-to-insight', description_es: 'Acceso rápido a datos para análisis y decisiones.', description_en: 'Fast data access for analysis and decisions.' },
      { title_es: 'Flexibilidad cloud', title_en: 'Cloud flexibility', description_es: 'Escalabilidad y optimización continua de costos.', description_en: 'Scalability and continuous cost optimization.' },
    ],
    technologies: ['AWS', 'Google Cloud', 'Databricks', 'Snowflake'],
    relatedCaseStudies: ['haceb'],
  },
  'data-operations': {
    slug: 'data-operations',
    slug_es: 'data-operations',
    slug_en: 'data-operations',
    title_es: 'Data Operations',
    title_en: 'Data Operations',
    excerpt_es: 'Operamos y optimizamos ecosistemas de datos con modelos ágiles y automatizados.',
    excerpt_en: 'We operate and optimize data ecosystems with agile and automated models.',
    content_es:
      'Ayudamos a las organizaciones a operar sus plataformas de datos con continuidad, visibilidad y soporte especializado para reducir incidentes y sostener el rendimiento de entornos productivos.',
    content_en:
      'We help organizations run their data platforms with continuity, visibility and specialized support to reduce incidents and sustain production performance.',
    capabilities: [
      { title_es: 'Data+', title_en: 'Data+', description_es: 'Monitoreo, mantenimiento y soporte mensual para garantizar estabilidad.', description_en: 'Monitoring, maintenance and monthly support to ensure stability.' },
      { title_es: 'Monitoreo continuo', title_en: 'Continuous monitoring', description_es: 'Supervisión proactiva de pipelines, flujos, jobs y componentes críticos.', description_en: 'Proactive supervision of pipelines, flows, jobs and critical components.' },
      { title_es: 'Mantenimiento y soporte', title_en: 'Maintenance and support', description_es: 'Atención de incidentes y ajustes operativos para mantener continuidad.', description_en: 'Incident handling and operational adjustments to maintain continuity.' },
      { title_es: 'Staffing especializado', title_en: 'Specialized staffing', description_es: 'Talento por hora o periodo fijo para reforzar iniciativas de datos.', description_en: 'Talent by the hour or fixed period to reinforce data initiatives.' },
    ],
    benefits: [
      { title_es: 'Menor inactividad operativa', title_en: 'Reduced operational downtime', description_es: 'Minimiza interrupciones y mantiene continuidad del servicio.', description_en: 'Minimize interruptions and maintain service continuity.' },
      { title_es: 'Mayor estabilidad', title_en: 'Greater stability', description_es: 'Operación confiable y predecible de la plataforma de datos.', description_en: 'Reliable and predictable operation of the data platform.' },
      { title_es: 'Respuesta más rápida', title_en: 'Faster response', description_es: 'Soporte especializado disponible cuando se necesita.', description_en: 'Specialized support available when needed.' },
      { title_es: 'Mayor confiabilidad', title_en: 'Higher reliability', description_es: 'Datos disponibles y confiables para negocio y analítica.', description_en: 'Available and reliable data for business and analytics.' },
    ],
    technologies: ['Microsoft', 'Databricks', 'Snowflake', 'AWS', 'Google Cloud'],
    relatedCaseStudies: ['cueros-velez', 'haceb'],
  },
  'cloud-services-provider': {
    slug: 'cloud-services-provider',
    slug_es: 'cloud-services-provider',
    slug_en: 'cloud-services-provider',
    title_es: 'Cloud Services Provider',
    title_en: 'Cloud Services Provider',
    excerpt_es: 'Operamos y optimizamos infraestructuras cloud con modelos gestionados y automatizados.',
    excerpt_en: 'We operate and optimize cloud infrastructures with managed and automated models.',
    content_es:
      'Ayudamos a operar infraestructuras cloud con continuidad, seguridad y soporte especializado para reducir costos, optimizar recursos y sostener el rendimiento en producción.',
    content_en:
      'We help operate cloud infrastructures with continuity, security and specialized support to reduce costs, optimize resources and sustain production performance.',
    capabilities: [
      { title_es: 'Infraestructura gestionada', title_en: 'Managed infrastructure', description_es: 'Gestión completa de infraestructuras AWS, Azure y Google Cloud Platform.', description_en: 'Complete management of AWS, Azure and Google Cloud Platform infrastructures.' },
      { title_es: 'Seguridad cloud', title_en: 'Cloud security', description_es: 'Implementación de mejores prácticas de seguridad y cumplimiento.', description_en: 'Implementation of security and compliance best practices.' },
      { title_es: 'Optimización de costos', title_en: 'Cost optimization', description_es: 'Análisis y optimización continua del gasto en servicios cloud.', description_en: 'Continuous analysis and optimization of cloud services spending.' },
      { title_es: 'Monitoreo 24/7', title_en: '24/7 monitoring', description_es: 'Supervisión proactiva de recursos cloud y resolución de incidentes.', description_en: 'Proactive monitoring of cloud resources and incident resolution.' },
    ],
    benefits: [
      { title_es: 'Reducción de costos operativos', title_en: 'Reduced operational costs', description_es: 'Optimización de recursos cloud y reducción de gastos.', description_en: 'Cloud resource optimization and cost reduction.' },
      { title_es: 'Mayor seguridad', title_en: 'Enhanced security', description_es: 'Protección avanzada y cumplimiento normativo.', description_en: 'Advanced protection and regulatory compliance.' },
      { title_es: 'Alta disponibilidad', title_en: 'High availability', description_es: 'Infraestructura confiable y resiliente 24/7.', description_en: 'Reliable and resilient infrastructure 24/7.' },
      { title_es: 'Escalabilidad automática', title_en: 'Auto-scaling', description_es: 'Recursos que crecen con la demanda del negocio.', description_en: 'Resources that grow with business demand.' },
    ],
    technologies: ['AWS', 'Microsoft', 'Google Cloud', 'Databricks', 'Snowflake'],
    relatedCaseStudies: ['haceb'],
  },
};

function getServiceKey(service: any) {
  return service?.slug_en || service?.slug_es || '';
}

export function findServiceByLocalizedSlug(slug: string, language: 'es' | 'en') {
  const slugKey = language === 'es' ? 'slug_es' : 'slug_en';
  return serviceSlugEntries.find((service) => service[slugKey] === slug) || null;
}

export function getLocalizedServiceSlug(service: any, language: 'es' | 'en') {
  return language === 'es' ? service?.slug_es : service?.slug_en;
}

function findServiceFallbackBySlug(slug: string | undefined, language: 'es' | 'en') {
  if (!slug) return null;
  return Object.values(serviceFallbackContent).find((service: any) => {
    const localizedSlug = language === 'es' ? service.slug_es : service.slug_en;
    return service.slug === slug || localizedSlug === slug;
  }) || null;
}

function getTechnologyItems(service: any, partners: any[]) {
  const partnerMap = new Map(
    partners.map((partner: any) => [partner.name.toLowerCase(), partner])
  );

  return (service?.technologies || []).map((name: string) => {
    const partner = partnerMap.get(name.toLowerCase());
    return {
      name,
      logo: partner?.logo || allTechnologies[name] || null,
    };
  });
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();
  const [service, setService] = useState<any | null>(null);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) return;

      try {
        setLoading(true);
        const [serviceData, servicesData, caseStudiesData, partnersData] = await Promise.all([
          getBySlug(slug, language),
          getPublishedServices(language),
          getPublishedCaseStudies(language),
          getPublishedPartners(),
        ]);

        if (cancelled) return;

        setService(serviceData);
        setAllServices(servicesData);
        setCaseStudies(caseStudiesData);
        setPartners(partnersData);
      } catch (error) {
        console.error('Error loading service detail:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug, language]);

  const requestedFallback = allowMockFallback ? findServiceFallbackBySlug(slug, language) : null;
  const serviceKey = getServiceKey(service) || requestedFallback?.slug || '';
  const fallbackContent = allowMockFallback
    ? serviceFallbackContent[serviceKey] || requestedFallback || null
    : null;
  const resolvedService = service || fallbackContent
    ? {
        ...fallbackContent,
        ...service,
        id: service?.id || fallbackContent?.slug,
        title_es: service?.title_es || fallbackContent?.title_es || service?.title || '',
        title_en: service?.title_en || fallbackContent?.title_en || service?.title || '',
        slug_es: service?.slug_es || fallbackContent?.slug_es || service?.slug || '',
        slug_en: service?.slug_en || fallbackContent?.slug_en || service?.slug || '',
        excerpt_es: service?.excerpt_es || fallbackContent?.excerpt_es || service?.excerpt || '',
        excerpt_en: service?.excerpt_en || fallbackContent?.excerpt_en || service?.excerpt || '',
        content_es: service?.content_es || fallbackContent?.content_es || service?.content || '',
        content_en: service?.content_en || fallbackContent?.content_en || service?.content || '',
        technologies:
          Array.isArray(service?.technologies) && service.technologies.length > 0
            ? service.technologies
            : fallbackContent?.technologies || [],
        relatedCaseStudies:
          Array.isArray(service?.relatedCaseStudies) && service.relatedCaseStudies.length > 0
            ? service.relatedCaseStudies
            : Array.isArray(service?.related_case_studies) && service.related_case_studies.length > 0
              ? service.related_case_studies
              : fallbackContent?.relatedCaseStudies || [],
        capabilities:
          Array.isArray(service?.capabilities) && service.capabilities.length > 0
            ? service.capabilities
            : fallbackContent?.capabilities || [],
        benefits:
          Array.isArray(service?.benefits) && service.benefits.length > 0
            ? service.benefits
            : fallbackContent?.benefits || [],
      }
    : null;
  const colors = serviceColors[(serviceKey || 'strategy-consulting') as ServiceSlug] || serviceColors['strategy-consulting'];
  const Icon = serviceIconMap[serviceKey] || Database;
  const heroImage = resolvedService?.heroImage || serviceImageMap[serviceKey];

  const relatedCases = useMemo(() => {
    if (!resolvedService) return [];
    const slugs = resolvedService.relatedCaseStudies || [];
    const selected = caseStudies.filter((caseStudy: any) =>
      slugs.includes(caseStudy.slug_es) || slugs.includes(caseStudy.slug_en)
    );
    return selected.length > 0 ? selected : caseStudies.slice(0, 3);
  }, [resolvedService, caseStudies]);

  const otherServices = useMemo(() => {
    const published = allServices.filter((item: any) => item.id !== resolvedService?.id).slice(0, 3);
    if (published.length > 0) return published;

    if (!allowMockFallback) return [];

    return Object.values(serviceFallbackContent)
      .filter((item: any) => item.slug !== serviceKey)
      .slice(0, 3);
  }, [allServices, resolvedService, serviceKey]);

  const technologies = useMemo(
    () => getTechnologyItems(resolvedService, partners),
    [resolvedService, partners]
  );

  if (!loading && !resolvedService) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          {language === 'es' ? 'Servicio no encontrado' : 'Service not found'}
        </h1>
        <Link
          to={`/${language}/${language === 'es' ? 'servicios' : 'services'}`}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700"
        >
          {language === 'es' ? 'Ver todos los servicios' : 'View all services'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const ctaSection = serviceKey === 'data-operations'
    ? {
        title: language === 'es'
          ? 'Convirtamos tu operación de datos en una ventaja competitiva'
          : 'Let\'s turn your data operations into competitive advantage',
        subtitle: language === 'es'
          ? 'Hablemos sobre cómo estabilizar, optimizar y escalar tu ecosistema de datos'
          : 'Let\'s talk about how to stabilize, optimize and scale your data ecosystem',
        ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
        ctaHref: buildContactLink({
          language,
          sourceType: 'service',
          sourceSlug: serviceKey,
          sourceTitle: getLocalizedValue(resolvedService?.title_es || '', resolvedService?.title_en || ''),
          sourceCtaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
          intent: 'service_consultation',
          referrerPath: `/${language}/${language === 'es' ? 'servicios' : 'services'}/${slug}`,
        })
      }
    : {
        title: language === 'es'
          ? 'Convirtamos tus datos en ventaja competitiva'
          : 'Let\'s turn your data into competitive advantage',
        subtitle: language === 'es'
          ? 'Inicia una conversación con nuestros expertos'
          : 'Start a conversation with our experts',
        ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
        ctaHref: buildContactLink({
          language,
          sourceType: 'service',
          sourceSlug: serviceKey,
          sourceTitle: getLocalizedValue(resolvedService?.title_es || '', resolvedService?.title_en || ''),
          sourceCtaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
          intent: 'service_consultation',
          referrerPath: `/${language}/${language === 'es' ? 'servicios' : 'services'}/${slug}`,
        })
      };

  return (
    <>
      <SEOHead
        title={getLocalizedValue(
          resolvedService?.seo_es?.metaTitle || resolvedService?.title_es || '',
          resolvedService?.seo_en?.metaTitle || resolvedService?.title_en || '',
        )}
        description={getLocalizedValue(
          resolvedService?.seo_es?.metaDescription || resolvedService?.excerpt_es || '',
          resolvedService?.seo_en?.metaDescription || resolvedService?.excerpt_en || '',
        )}
        canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${slug}`}
        alternateES={`/es/servicios/${resolvedService?.slug_es || slug}`}
        alternateEN={`/en/services/${resolvedService?.slug_en || slug}`}
        language={language}
      />

      <InternalPageHero
        eyebrow={language === 'es' ? 'Servicio' : 'Service'}
        title={getLocalizedValue(resolvedService?.title_es || '', resolvedService?.title_en || '')}
        description={getLocalizedValue(resolvedService?.excerpt_es || '', resolvedService?.excerpt_en || '')}
        imageSrc={heroImage}
        imageAlt={getLocalizedValue(resolvedService?.title_es || '', resolvedService?.title_en || '')}
      />

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 w-fit" style={{ backgroundColor: `${colors.iconColor}15` }}>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: colors.iconColor }}>
                  {language === 'es' ? 'Enfoque' : 'Approach'}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 leading-tight">
                {language === 'es' ? 'Qué hacemos en este servicio' : 'What we do in this service'}
              </h2>

              <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
                {getLocalizedValue(resolvedService?.content_es || '', resolvedService?.content_en || '')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-6">
                {language === 'es' ? 'Capacidades Principales' : 'Key Capabilities'}
              </h3>

              <div className="space-y-4">
                {(resolvedService?.capabilities || []).map((capability: any, index: number) => {
                  const CapIcon = capabilityIcons[index % capabilityIcons.length];
                  return (
                    <motion.div
                      key={`${capability.title_es || capability.title_en}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.iconColor}15` }}>
                          <CapIcon className="w-5 h-5" style={{ color: colors.iconColor }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-light text-gray-900 mb-1">
                            {getLocalizedValue(capability.title_es, capability.title_en)}
                          </h3>
                          <p className="text-sm text-gray-600 font-light leading-relaxed">
                            {getLocalizedValue(capability.description_es, capability.description_en)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-xl md:text-2xl font-light text-gray-900 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {language === 'es' ? 'Beneficios para el Negocio' : 'Business Benefits'}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {(resolvedService?.benefits || []).map((benefit: any, index: number) => {
              const BenefitIcon = benefitIcons[index % benefitIcons.length];
              return (
                <motion.div
                  key={`${benefit.title_es || benefit.title_en}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.iconColor}15` }}>
                      <BenefitIcon className="w-5 h-5" style={{ color: colors.iconColor }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-gray-900 mb-1">
                        {getLocalizedValue(benefit.title_es, benefit.title_en)}
                      </h3>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        {getLocalizedValue(benefit.description_es, benefit.description_en)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl md:text-3xl font-light text-gray-900 mb-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {language === 'es' ? 'Tecnologías' : 'Technologies'}
          </motion.h2>

          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
            {technologies.map((tech: any, index: number) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {tech.logo ? (
                  <div className="w-32 lg:w-40 h-16 lg:h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0">
                    <img src={tech.logo} alt={tech.name} className="partner-logo-adaptive max-w-full max-h-full object-contain" />
                  </div>
                ) : (
                  <div className="px-5 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-700 font-light">
                    {tech.name}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {relatedCases.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                {language === 'es' ? 'Casos Relacionados' : 'Related Case Studies'}
              </h2>

              <Link
                to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}`}
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium group"
              >
                {language === 'es' ? 'Ver todos los casos' : 'View all cases'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {relatedCases.map((caseStudy: any, index: number) => {
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
      )}

      {otherServices.length > 0 && (
        <section className="relative bg-white py-16 md:py-20 overflow-hidden">
          <FloatingElements colorMain={colors.main} colorAccent={colors.accent} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-light text-gray-900 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {language === 'es' ? 'Explora otros servicios' : 'Explore other services'}
            </motion.h2>

            <div className="overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
              <div className="flex gap-6 min-w-max">
              {otherServices.map((item: any, index: number) => (
                <motion.div
                  key={item.id || item.slug}
                  className="w-[90vw] sm:w-[500px] flex-shrink-0"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${getLocalizedValue(item.slug_es, item.slug_en)}`}
                    className="group block h-full"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div
                      className="rounded-2xl overflow-hidden transition-all duration-300 h-full border border-gray-200 flex flex-col sm:flex-row"
                      style={{
                        background: 'rgba(255, 255, 255, 0.65)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
                    >
                      <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src={item.heroImage || item.featuredImage || serviceImageMap[getLocalizedValue(item.slug_es, item.slug_en)]}
                          alt={getLocalizedValue(item.title_es, item.title_en)}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-6 flex flex-col justify-center flex-1">
                        <h3 className="text-xl font-light text-gray-900 mb-3 leading-tight">
                          {getLocalizedValue(item.title_es, item.title_en)}
                        </h3>

                        <p className="text-sm text-gray-600 font-light leading-relaxed mb-4 line-clamp-2">
                          {getLocalizedValue(item.excerpt_es, item.excerpt_en)}
                        </p>

                        <div className="inline-flex items-center gap-2 text-purple-600 text-sm font-medium group-hover:gap-3 transition-all duration-300 w-fit">
                          <span>{language === 'es' ? 'Ver servicio' : 'View service'}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              </div>
            </div>

            <div className="sm:hidden mt-4 text-center text-xs text-gray-400 font-light">
              {language === 'es' ? 'Desliza para ver más →' : 'Swipe to see more →'}
            </div>
          </div>
        </section>
      )}

      <CTABandSection section={ctaSection} />
    </>
  );
}
