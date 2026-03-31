import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { useLanguage, type Language } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { CTABandSection } from '../components/sections/CTABandSection';
import { mockCaseStudies } from '../../data/mockData';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { FloatingElements } from '../components/FloatingElements';
import { serviceColors, type ServiceSlug } from './serviceColors';
import { useEffect } from 'react';
import { 
  ArrowRight, 
  Database, 
  Network, 
  LineChart, 
  Brain, 
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
  Gauge
} from 'lucide-react';

import dataStrategyImage from 'figma:asset/e0fd18e1974bd95855a2de171535d160bd4bc63e.png';
import dataEngineeringImage from 'figma:asset/76b02f6059883d09d11f4c3a88fd01cd8d66aa9a.png';
import advancedAnalyticsImage from 'figma:asset/1299c30cdfc96cd0398b9935d436448d0134427e.png';
import artificialIntelligenceImage from 'figma:asset/f7cb664cad0f1746ea9066ed03e99d14705dcb0a.png';
import dataPlatformsImage from 'figma:asset/6b516d23f0f656858f47ef4bf97125f4c1f98dbe.png';
import dataOperationsImage from 'figma:asset/0aa3ccc9e83c8e7482164db714ed3d7d8e5ceb33.png';

import microsoftLogo from 'figma:asset/48829b35c832ac4a631d74dcfd8ac69d34b0adfa.png';
import snowflakeLogo from 'figma:asset/0f1a314fdbee8b957c6504f8fff0a07b3918b269.png';
import databricksLogo from 'figma:asset/d77c1b8e6a9a1a6f84c17715022360c027287a95.png';
import googleCloudLogo from 'figma:asset/809f376c4277570a490e5d7e959560b3df1ea78b.png';
import awsLogo from 'figma:asset/b8142854237a06a23c35b902808cc4d698f6938b.png';

interface ServiceContent {
  slug: string;
  slug_es: string;
  slug_en: string;
  icon: React.ComponentType<{ className?: string }>;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  heroImage: string;
  
  // Color theme for floating elements
  colorMain: string;
  colorAccent: string;
  iconColor: string;
  
  whatWeDo_es: string;
  whatWeDo_en: string;
  
  capabilities: {
    icon: React.ComponentType<{ className?: string }>;
    title_es: string;
    title_en: string;
    description_es: string;
    description_en: string;
  }[];
  
  benefits: {
    icon: React.ComponentType<{ className?: string }>;
    title_es: string;
    title_en: string;
    description_es: string;
    description_en: string;
  }[];
  
  technologies: string[];
  relatedCases: string[];
}

const serviceContents: Record<string, ServiceContent> = {
  'strategy-consulting': {
    slug: 'strategy-consulting',
    slug_es: 'strategy-consulting',
    slug_en: 'strategy-consulting',
    icon: Database,
    title_es: 'Strategy & Consulting',
    title_en: 'Strategy & Consulting',
    description_es: 'Diseñamos estrategias de datos, gobierno y marcos de calidad para maximizar el valor de la información.',
    description_en: 'We design data strategies, governance and quality frameworks to maximize information value.',
    heroImage: dataStrategyImage,
    
    // Color theme for floating elements
    colorMain: '#6366F1',
    colorAccent: '#8B5CF6',
    iconColor: '#6366F1',
    
    whatWeDo_es: 'Ayudamos a las organizaciones a construir estrategias de datos sólidas, establecer marcos de gobernanza efectivos y crear una cultura data-driven que impulse la toma de decisiones informadas y genere ventajas competitivas sostenibles.',
    whatWeDo_en: 'We help organizations build solid data strategies, establish effective governance frameworks and create a data-driven culture that drives informed decision-making and generates sustainable competitive advantages.',
    
    capabilities: [
      {
        icon: Target,
        title_es: 'Definición de Estrategia',
        title_en: 'Strategy Definition',
        description_es: 'Diseñamos roadmaps de datos alineados con objetivos de negocio y capacidades organizacionales.',
        description_en: 'We design data roadmaps aligned with business objectives and organizational capabilities.',
      },
      {
        icon: Shield,
        title_es: 'Marcos de Gobernanza',
        title_en: 'Governance Frameworks',
        description_es: 'Establecemos políticas, roles y responsabilidades para gestión efectiva de datos.',
        description_en: 'We establish policies, roles and responsibilities for effective data management.',
      },
      {
        icon: CheckCircle2,
        title_es: 'Calidad de Datos',
        title_en: 'Data Quality',
        description_es: 'Implementamos procesos y herramientas para asegurar confiabilidad y consistencia.',
        description_en: 'We implement processes and tools to ensure reliability and consistency.',
      },
      {
        icon: Sparkles,
        title_es: 'Madurez Analítica',
        title_en: 'Analytics Maturity',
        description_es: 'Evaluamos y elevamos las capacidades analíticas de tu organización.',
        description_en: 'We assess and elevate your organization\'s analytical capabilities.',
      },
    ],
    
    benefits: [
      {
        icon: TrendingUp,
        title_es: 'Decisiones Informadas',
        title_en: 'Informed Decisions',
        description_es: 'Datos confiables para mejores decisiones estratégicas',
        description_en: 'Reliable data for better strategic decisions',
      },
      {
        icon: Shield,
        title_es: 'Cumplimiento Normativo',
        title_en: 'Regulatory Compliance',
        description_es: 'Gestión adecuada de privacidad y seguridad',
        description_en: 'Proper privacy and security management',
      },
      {
        icon: Zap,
        title_es: 'Eficiencia Operativa',
        title_en: 'Operational Efficiency',
        description_es: 'Optimización de procesos de gestión de datos',
        description_en: 'Optimization of data management processes',
      },
      {
        icon: Target,
        title_es: 'Alineación Estratégica',
        title_en: 'Strategic Alignment',
        description_es: 'Datos al servicio de objetivos de negocio',
        description_en: 'Data serving business objectives',
      },
    ],
    
    technologies: ['Microsoft', 'Databricks', 'Snowflake'],
    relatedCases: ['case-2', 'case-4'],
  },
  
  'data-delivery': {
    slug: 'data-delivery',
    slug_es: 'data-delivery',
    slug_en: 'data-delivery',
    icon: Network,
    title_es: 'Data Delivery',
    title_en: 'Data Delivery',
    description_es: 'Construimos arquitecturas modernas de datos y soluciones de analítica avanzada e inteligencia artificial.',
    description_en: 'We build modern data architectures and advanced analytics and artificial intelligence solutions.',
    heroImage: dataEngineeringImage,
    
    // Color theme for floating elements
    colorMain: '#3B82F6',
    colorAccent: '#2563EB',
    iconColor: '#3B82F6',
    
    whatWeDo_es: 'Construimos la infraestructura de datos que impulsa tu transformación digital. Diseñamos arquitecturas modernas, desarrollamos pipelines eficientes, implementamos soluciones de analítica avanzada e inteligencia artificial para establecer las bases técnicas de una organización data-driven.',
    whatWeDo_en: 'We build the data infrastructure that drives your digital transformation. We design modern architectures, develop efficient pipelines, implement advanced analytics and artificial intelligence solutions to establish the technical foundations of a data-driven organization.',
    
    capabilities: [
      {
        icon: Network,
        title_es: 'Arquitectura de Datos',
        title_en: 'Data Architecture',
        description_es: 'Diseñamos arquitecturas modernas como Data Lakes, Lakehouses y Data Mesh.',
        description_en: 'We design modern architectures like Data Lakes, Lakehouses and Data Mesh.',
      },
      {
        icon: Zap,
        title_es: 'Pipelines de Datos',
        title_en: 'Data Pipelines',
        description_es: 'Construimos pipelines ETL/ELT robustos, eficientes y monitorizables.',
        description_en: 'We build robust, efficient and monitorable ETL/ELT pipelines.',
      },
      {
        icon: Database,
        title_es: 'Integración de Datos',
        title_en: 'Data Integration',
        description_es: 'Conectamos y centralizamos datos de múltiples fuentes empresariales.',
        description_en: 'We connect and centralize data from multiple business sources.',
      },
      {
        icon: Cloud,
        title_es: 'Infraestructura Cloud',
        title_en: 'Cloud Infrastructure',
        description_es: 'Desplegamos soluciones en AWS, Azure y Google Cloud.',
        description_en: 'We deploy solutions on AWS, Azure and Google Cloud.',
      },
    ],
    
    benefits: [
      {
        icon: Zap,
        title_es: 'Procesamiento Escalable',
        title_en: 'Scalable Processing',
        description_es: 'Maneja grandes volúmenes de datos eficientemente',
        description_en: 'Handle large data volumes efficiently',
      },
      {
        icon: CheckCircle2,
        title_es: 'Datos Confiables',
        title_en: 'Reliable Data',
        description_es: 'Pipelines robustos con validación y monitoreo',
        description_en: 'Robust pipelines with validation and monitoring',
      },
      {
        icon: TrendingUp,
        title_es: 'Time-to-Insight Reducido',
        title_en: 'Reduced Time-to-Insight',
        description_es: 'Acceso rápido a datos para análisis',
        description_en: 'Fast data access for analysis',
      },
      {
        icon: Cloud,
        title_es: 'Flexibilidad Cloud',
        title_en: 'Cloud Flexibility',
        description_es: 'Escalabilidad y optimización de costos',
        description_en: 'Scalability and cost optimization',
      },
    ],
    
    technologies: ['AWS', 'Google Cloud', 'Databricks', 'Snowflake'],
    relatedCases: ['case-4', 'case-5'],
  },
  
  'data-operations': {
    slug: 'data-operations',
    slug_es: 'data-operations',
    slug_en: 'data-operations',
    icon: Settings,
    title_es: 'Data Operations',
    title_en: 'Data Operations',
    description_es: 'Operamos y optimizamos ecosistemas de datos con modelos ágiles y automatizados.',
    description_en: 'We operate and optimize data ecosystems with agile and automated models.',
    heroImage: dataOperationsImage,
    
    // Color theme for floating elements
    colorMain: '#10B981',
    colorAccent: '#059669',
    iconColor: '#10B981',
    
    whatWeDo_es: 'Ayudamos a las organizaciones a operar sus plataformas de datos con continuidad, visibilidad y soporte especializado. Nuestro enfoque permite reducir incidentes, minimizar la inactividad y mantener el rendimiento de entornos analíticos y de datos en producción.',
    whatWeDo_en: 'We help organizations run their data platforms with continuity, visibility and specialized support. Our approach reduces incidents, minimizes downtime and sustains the performance of production data and analytics environments.',
    
    capabilities: [
      {
        icon: Sparkles,
        title_es: 'Data+',
        title_en: 'Data+',
        description_es: 'Monitoreo, mantenimiento y soporte mensual para garantizar estabilidad, resolver incidencias y minimizar la inactividad del ecosistema de datos.',
        description_en: 'Monitoring, maintenance and monthly support to ensure stability, resolve incidents and minimize downtime in the data ecosystem.',
      },
      {
        icon: Activity,
        title_es: 'Monitoreo continuo',
        title_en: 'Continuous monitoring',
        description_es: 'Supervisión proactiva de pipelines, flujos, jobs y componentes críticos de la operación de datos.',
        description_en: 'Proactive supervision of pipelines, flows, jobs and critical components of the data operation.',
      },
      {
        icon: Settings,
        title_es: 'Mantenimiento y soporte',
        title_en: 'Maintenance and support',
        description_es: 'Atención de incidentes, ajustes operativos y soporte para mantener la continuidad del servicio.',
        description_en: 'Incident handling, operational adjustments and support to maintain service continuity.',
      },
      {
        icon: Users,
        title_es: 'Staffing especializado',
        title_en: 'Specialized staffing',
        description_es: 'Talento por hora o por periodo fijo para reforzar proyectos internos de datos.',
        description_en: 'Talent by the hour or fixed period to reinforce internal data initiatives.',
      },
      {
        icon: Gauge,
        title_es: 'Optimización operativa',
        title_en: 'Operational optimization',
        description_es: 'Mejora continua del performance y confiabilidad de la plataforma de datos.',
        description_en: 'Continuous improvement of data platform performance and reliability.',
      },
    ],
    
    benefits: [
      {
        icon: TrendingUp,
        title_es: 'Menor inactividad operativa',
        title_en: 'Reduced operational downtime',
        description_es: 'Minimiza interrupciones y mantiene continuidad del servicio',
        description_en: 'Minimize interruptions and maintain service continuity',
      },
      {
        icon: Shield,
        title_es: 'Mayor estabilidad de la plataforma de datos',
        title_en: 'Greater data platform stability',
        description_es: 'Operación confiable y predecible',
        description_en: 'Reliable and predictable operation',
      },
      {
        icon: Zap,
        title_es: 'Respuesta más rápida ante incidentes',
        title_en: 'Faster incident response',
        description_es: 'Soporte especializado disponible cuando lo necesitas',
        description_en: 'Specialized support available when you need it',
      },
      {
        icon: CheckCircle2,
        title_es: 'Mayor confiabilidad para equipos de negocio y analítica',
        title_en: 'Higher reliability for business and analytics teams',
        description_es: 'Datos disponibles y confiables 24/7',
        description_en: 'Available and reliable data 24/7',
      },
    ],
    
    technologies: ['Microsoft', 'Databricks', 'Snowflake', 'AWS', 'Google Cloud'],
    relatedCases: ['case-2', 'case-4', 'case-5'],
  },
  
  'cloud-services-provider': {
    slug: 'cloud-services-provider',
    slug_es: 'cloud-services-provider',
    slug_en: 'cloud-services-provider',
    icon: Cloud,
    title_es: 'Cloud Services Provider',
    title_en: 'Cloud Services Provider',
    description_es: 'Operamos y optimizamos infraestructuras cloud con modelos gestionados y automatizados.',
    description_en: 'We operate and optimize cloud infrastructures with managed and automated models.',
    heroImage: dataPlatformsImage,
    
    // Color theme for floating elements
    colorMain: '#8B5CF6',
    colorAccent: '#7C3AED',
    iconColor: '#8B5CF6',
    
    whatWeDo_es: 'Ayudamos a las organizaciones a operar sus infraestructuras cloud con continuidad, seguridad y soporte especializado. Nuestro enfoque permite reducir costos, optimizar recursos y mantener el rendimiento de entornos cloud en producción.',
    whatWeDo_en: 'We help organizations run their cloud infrastructures with continuity, security and specialized support. Our approach reduces costs, optimizes resources and sustains cloud environment performance in production.',
    
    capabilities: [
      {
        icon: Cloud,
        title_es: 'Infraestructura Gestionada',
        title_en: 'Managed Infrastructure',
        description_es: 'Gestión completa de infraestructuras AWS, Azure y Google Cloud Platform.',
        description_en: 'Complete management of AWS, Azure and Google Cloud Platform infrastructures.',
      },
      {
        icon: Shield,
        title_es: 'Seguridad Cloud',
        title_en: 'Cloud Security',
        description_es: 'Implementación de mejores prácticas de seguridad y cumplimiento normativo.',
        description_en: 'Implementation of security best practices and regulatory compliance.',
      },
      {
        icon: Zap,
        title_es: 'Optimización de Costos',
        title_en: 'Cost Optimization',
        description_es: 'Análisis y optimización continua del gasto en servicios cloud.',
        description_en: 'Continuous analysis and optimization of cloud services spending.',
      },
      {
        icon: Activity,
        title_es: 'Monitoreo 24/7',
        title_en: '24/7 Monitoring',
        description_es: 'Supervisión proactiva de recursos cloud y resolución de incidentes.',
        description_en: 'Proactive monitoring of cloud resources and incident resolution.',
      },
      {
        icon: Settings,
        title_es: 'Automatización Cloud',
        title_en: 'Cloud Automation',
        description_es: 'Implementación de IaC, CI/CD y automatización de operaciones.',
        description_en: 'Implementation of IaC, CI/CD and operations automation.',
      },
    ],
    
    benefits: [
      {
        icon: TrendingUp,
        title_es: 'Reducción de Costos Operativos',
        title_en: 'Reduced Operational Costs',
        description_es: 'Optimización de recursos cloud y reducción de gastos',
        description_en: 'Cloud resource optimization and cost reduction',
      },
      {
        icon: Shield,
        title_es: 'Mayor Seguridad',
        title_en: 'Enhanced Security',
        description_es: 'Protección avanzada y cumplimiento normativo',
        description_en: 'Advanced protection and regulatory compliance',
      },
      {
        icon: Zap,
        title_es: 'Alta Disponibilidad',
        title_en: 'High Availability',
        description_es: 'Infraestructura confiable y resiliente 24/7',
        description_en: 'Reliable and resilient infrastructure 24/7',
      },
      {
        icon: CheckCircle2,
        title_es: 'Escalabilidad Automática',
        title_en: 'Auto-scaling',
        description_es: 'Recursos que crecen con tu negocio',
        description_en: 'Resources that grow with your business',
      },
    ],
    
    technologies: ['AWS', 'Microsoft', 'Google Cloud', 'Databricks', 'Snowflake'],
    relatedCases: ['case-4', 'case-5'],
  },
};

const allTechnologies = {
  'Microsoft': microsoftLogo,
  'Databricks': databricksLogo,
  'Snowflake': snowflakeLogo,
  'AWS': awsLogo,
  'Google Cloud': googleCloudLogo,
};

// All service areas for "Other Services" section
const allServiceAreas: ServiceContent[] = [
  serviceContents['strategy-consulting'],
  serviceContents['data-delivery'],
  serviceContents['data-operations'],
  serviceContents['cloud-services-provider'],
];

// Helper functions for localized slug lookup
export function findServiceByLocalizedSlug(
  slug: string, 
  language: Language
): ServiceContent | null {
  const field = language === 'es' ? 'slug_es' : 'slug_en';
  return Object.values(serviceContents).find(s => s[field] === slug) || null;
}

export function getLocalizedServiceSlug(service: ServiceContent, language: Language): string {
  return language === 'es' ? service.slug_es : service.slug_en;
}

export type { ServiceContent };
export { serviceContents };

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();

  // Scroll to top when slug changes (cuando navegas a otro servicio)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Find service: try by KEY first, then by localized slug
  let serviceContent: ServiceContent | null = null;
  if (slug) {
    // Try finding by key (backward compatibility)
    serviceContent = serviceContents[slug] || null;
    
    // If not found, try finding by localized slug
    if (!serviceContent) {
      serviceContent = findServiceByLocalizedSlug(slug, language);
    }
  }

  if (!serviceContent) {
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

  const Icon = serviceContent.icon;
  
  // Get colors for this service
  const colors = serviceColors[serviceContent.slug as ServiceSlug];
  
  // Filter out current service from "other services"
  const otherServices = allServiceAreas.filter(s => s.slug !== serviceContent.slug);

  // CTA personalizado para Data Operations
  const ctaSection = serviceContent.slug === 'data-operations'
    ? {
        title: language === 'es' 
          ? 'Convirtamos tu operación de datos en una ventaja competitiva'
          : 'Let\'s turn your data operations into competitive advantage',
        subtitle: language === 'es'
          ? 'Hablemos sobre cómo estabilizar, optimizar y escalar tu ecosistema de datos'
          : 'Let\'s talk about how to stabilize, optimize and scale your data ecosystem',
        ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
        ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}?service=${serviceContent.slug}`
      }
    : {
        title: language === 'es' 
          ? 'Convirtamos tus datos en ventaja competitiva'
          : 'Let\'s turn your data into competitive advantage',
        subtitle: language === 'es'
          ? 'Inicia una conversación con nuestros expertos'
          : 'Start a conversation with our experts',
        ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
        ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}?service=${serviceContent.slug}`
      };

  return (
    <>
      <SEOHead
        title={`${getLocalizedValue(serviceContent.title_es, serviceContent.title_en)} - iData`}
        description={getLocalizedValue(serviceContent.description_es, serviceContent.description_en)}
        canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${slug}`}
        alternateES={`/es/servicios/${slug}`}
        alternateEN={`/en/services/${slug}`}
        language={language}
      />

      {/* SECCIÓN 1 — INTRO DEL SERVICIO (Editorial Layout) */}
      <section className="relative bg-white py-16 md:py-20 pt-28">
        {/* Floating elements for this service */}
        <FloatingElements colorMain={colors.main} colorAccent={colors.accent} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Service Title & Description */}
            <motion.div 
              className="md:flex-1 md:pr-8 order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                {getLocalizedValue(serviceContent.title_es, serviceContent.title_en)}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
                {getLocalizedValue(serviceContent.description_es, serviceContent.description_en)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}?service=${serviceContent.slug}`}
                  className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-medium transition-all duration-250 hover:shadow-xl hover:scale-[1.02] active:scale-100 group"
                  style={{ backgroundColor: colors.iconColor }}
                >
                  {language === 'es' ? 'Hablar con un experto' : 'Talk to an expert'}
                  <ArrowRight className="w-5 h-5 transition-transform duration-250 group-hover:translate-x-1" />
                </Link>
                
                <Link
                  to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}`}
                  className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-250 border"
                  style={{ color: colors.iconColor, borderColor: colors.iconColor + '33' }}
                >
                  {language === 'es' ? 'Ver casos de éxito' : 'View case studies'}
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Service Image - 50% smaller, no overlay - Mobile: antes del título */}
            <motion.div
              className="relative flex justify-center lg:justify-end order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div 
                className="w-full max-w-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={serviceContent.heroImage}
                  alt={getLocalizedValue(serviceContent.title_es, serviceContent.title_en)}
                  className="w-full h-auto rounded-2xl"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — QUÉ HACEMOS + CAPACIDADES (Layout Horizontal) */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left: Qué hacemos - Jerarquía mejorada */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 w-fit"
                style={{ backgroundColor: colors.iconColor + '15' }}
              >
                <span 
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: colors.iconColor }}
                >
                  {language === 'es' ? 'Enfoque' : 'Approach'}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 leading-tight">
                {language === 'es' ? 'Qué hacemos en este servicio' : 'What we do in this service'}
              </h2>
              
              <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
                {getLocalizedValue(serviceContent.whatWeDo_es, serviceContent.whatWeDo_en)}
              </p>
            </motion.div>

            {/* Right: Capacidades */}
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
                {serviceContent.capabilities.map((capability, index) => {
                  const CapIcon = capability.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex gap-4">
                        <div 
                          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: colors.iconColor + '15' }}
                        >
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

      {/* SECCIÓN 3 — BENEFICIOS (Misma estructura que Capacidades) */}
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
            {serviceContent.benefits.map((benefit, index) => {
              const BenIcon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex gap-4">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: colors.iconColor + '15' }}
                    >
                      <BenIcon className="w-5 h-5" style={{ color: colors.iconColor }} />
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

      {/* SECCIÓN 4 — TECNOLOGÍAS */}
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

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {serviceContent.technologies.map((tech, index) => (
              <motion.div
                key={tech}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-32 lg:w-40 h-16 lg:h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0">
                  <img 
                    src={allTechnologies[tech as keyof typeof allTechnologies]} 
                    alt={tech}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 — CASOS RELACIONADOS */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              {language === 'es' ? 'Casos de Éxito Relacionados' : 'Related Case Studies'}
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
            {mockCaseStudies
              .filter(c => serviceContent.relatedCases.includes(c.id))
              .slice(0, 3)
              .map((caseStudy, index) => {
                const results = caseStudy.results_es ? 
                  (language === 'es' ? caseStudy.results_es : caseStudy.results_en || '').split('|').map(r => r.trim()) : 
                  [];
                
                const caseImages: Record<string, string> = {
                  'case-2': 'https://images.unsplash.com/photo-1768550005921-8782adcb798c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZWF0aGVyJTIwZmFjdG9yeSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzczMDc3NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
                  'case-4': 'https://images.unsplash.com/photo-1642979427252-13d5fd18bb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYXBwbGlhbmNlcyUyMG1vZGVybiUyMGtpdGNoZW58ZW58MXx8fHwxNzczMDQ4ODczfDA&ixlib=rb-4.1.0&q=80&w=1080',
                  'case-5': 'https://images.unsplash.com/photo-1641561421189-a6bf2fd5ca10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxvZ2lzdGljcyUyMG1vZGVybnxlbnwxfHx8fDE3NzMwNzc1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
                };
                const backgroundImage = caseImages[caseStudy.id];
                
                return (
                  <motion.div
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/${getLocalizedValue(caseStudy.slug_es, caseStudy.slug_en)}`}
                      className="group block h-full"
                    >
                      <div className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/40 border border-white/20"
                        style={{
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                      >
                        <div className="relative overflow-hidden">
                          {backgroundImage && (
                            <div className="absolute inset-0">
                              <ImageWithFallback
                                src={backgroundImage}
                                alt={caseStudy.client}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 to-gray-900/85" />
                          <div className="relative p-4 pb-5">
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {caseStudy.client}
                            </h3>
                            <p className="text-sm text-white/90 font-light leading-relaxed">
                              {getLocalizedValue(caseStudy.excerpt_es, caseStudy.excerpt_en)}
                            </p>
                          </div>
                        </div>
                        <div className="p-6 pt-5">
                          <div className="space-y-2 mb-5">
                            {results.slice(0, 2).map((result, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-blue-600 text-xs mt-0.5">●</span>
                                <span className="text-xs text-gray-800 font-light leading-snug">
                                  {result}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="inline-flex items-center gap-2 text-gray-900 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                            <span>{language === 'es' ? 'Ver caso' : 'View case'}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 6 — OTROS SERVICIOS (Horizontal Scroll con layout horizontal) */}
      <section className="relative bg-white py-16 md:py-20 overflow-hidden">
        {/* Floating elements for this service */}
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

          {/* Horizontal Scroll Container - Desktop y Mobile */}
          <div className="overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
            <div className="flex gap-6 min-w-max">
              {otherServices.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    className="w-[90vw] sm:w-[500px] flex-shrink-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${service.slug}`}
                      className="group block h-full"
                    >
                      <div 
                        className="rounded-2xl overflow-hidden transition-all duration-300 h-full border border-gray-200 flex flex-col sm:flex-row"
                        style={{
                          background: 'rgba(255, 255, 255, 0.65)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                      >
                        
                        {/* Left: Image only - sin icono, imagen sin recorte */}
                        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                          <ImageWithFallback
                            src={service.heroImage}
                            alt={getLocalizedValue(service.title_es, service.title_en)}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Right: Content */}
                        <div className="p-6 flex flex-col justify-center flex-1">
                          <h3 className="text-xl font-light text-gray-900 mb-3 leading-tight">
                            {getLocalizedValue(service.title_es, service.title_en)}
                          </h3>
                          
                          <p className="text-sm text-gray-600 font-light leading-relaxed mb-4 line-clamp-2">
                            {getLocalizedValue(service.description_es, service.description_en)}
                          </p>

                          <div className="inline-flex items-center gap-2 text-purple-600 text-sm font-medium group-hover:gap-3 transition-all duration-300 w-fit">
                            <span>{language === 'es' ? 'Ver servicio' : 'View service'}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Indicador de scroll para mobile */}
          <div className="sm:hidden mt-4 text-center text-xs text-gray-400 font-light">
            {language === 'es' ? 'Desliza para ver más →' : 'Swipe to see more →'}
          </div>
        </div>
      </section>

      {/* SECCIÓN 7 — CTA FINAL */}
      <CTABandSection section={ctaSection} />
    </>
  );
}