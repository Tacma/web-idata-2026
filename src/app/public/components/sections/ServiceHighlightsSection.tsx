import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { HomeSection, Language } from '../../../shared/types';
import { useEffect, useState } from 'react';
import { ArrowRight, BarChart3, Cpu, Lightbulb, Database, Layers } from 'lucide-react';
import { ArrowLink } from '../../../shared/components/ArrowLink';
import { getPublished as getPublishedServices } from '../../../../services/servicesService';

const fallbackServices = [
  {
    id: 'service-strategy-consulting',
    title_es: 'Strategy & Consulting',
    title_en: 'Strategy & Consulting',
    slug_es: 'strategy-consulting',
    slug_en: 'strategy-consulting',
    excerpt_es: 'Alineamos estrategia, gobierno y hoja de ruta para acelerar una operación realmente data-driven.',
    excerpt_en: 'We align strategy, governance and roadmap to accelerate a truly data-driven operation.',
    technologies: ['Microsoft', 'Databricks', 'Snowflake'],
    capabilities: [
      {
        title_es: 'Gobierno y hoja de ruta',
        title_en: 'Governance and roadmap',
      },
    ],
  },
  {
    id: 'service-data-delivery',
    title_es: 'Data Delivery',
    title_en: 'Data Delivery',
    slug_es: 'data-delivery',
    slug_en: 'data-delivery',
    excerpt_es: 'Construimos arquitecturas modernas, pipelines y soluciones analíticas listas para operar a escala.',
    excerpt_en: 'We build modern architectures, pipelines and analytics solutions ready to operate at scale.',
    technologies: ['AWS', 'Databricks', 'Snowflake'],
    capabilities: [
      {
        title_es: 'Arquitectura y pipelines',
        title_en: 'Architecture and pipelines',
      },
    ],
  },
  {
    id: 'service-data-operations',
    title_es: 'Data Operations',
    title_en: 'Data Operations',
    slug_es: 'data-operations',
    slug_en: 'data-operations',
    excerpt_es: 'Monitoreamos, soportamos y optimizamos ecosistemas de datos para mantener continuidad y rendimiento.',
    excerpt_en: 'We monitor, support and optimize data ecosystems to sustain continuity and performance.',
    technologies: ['Microsoft', 'Databricks', 'AWS'],
    capabilities: [
      {
        title_es: 'Monitoreo y soporte continuo',
        title_en: 'Continuous monitoring and support',
      },
    ],
  },
];

interface ServiceHighlightsSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

export function ServiceHighlightsSection({ 
  section, 
  language, 
  getLocalizedValue 
}: ServiceHighlightsSectionProps) {
  const [services, setServices] = useState<any[]>([]);
  const metricValue = section.config?.metricValue || '200+';
  const metricLabel =
    section.config?.metricLabel ||
    (language === 'es' ? '200+ proyectos entregados' : '200+ Projects Delivered');
  const featuredCardTitle =
    section.config?.featuredCardTitle ||
    (language === 'es' ? '4.8★' : '4.8★');
  const featuredCardText =
    section.config?.featuredCardText ||
    (language === 'es' ? 'Calificación promedio de clientes' : 'Average client rating');
  const featuredCardCtaLabel =
    section.config?.featuredCardCtaLabel ||
    (language === 'es' ? 'Ver casos de éxito' : 'View case studies');
  const featuredCardCtaHref =
    section.config?.featuredCardCtaHref ||
    `/${language}/${language === 'es' ? 'casos' : 'case-studies'}`;

  const isCompleteService = (service: any) => {
    if (!service) return false;
    const title = getLocalizedValue(service.title_es || service.title || '', service.title_en || service.title || '').trim();
    const excerpt = getLocalizedValue(service.excerpt_es || service.excerpt || '', service.excerpt_en || service.excerpt || '').trim();
    return Boolean(title && excerpt);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const servicesData = await getPublishedServices(language);
        if (!cancelled) {
          const filtered = section.referencedIds && section.referencedIds.length > 0
            ? servicesData.filter((service: any) => section.referencedIds?.includes(service.id))
            : servicesData;
          const selected = filtered.length > 0 ? filtered : servicesData;
          setServices(selected);
        }
      } catch (error) {
        console.error('Error loading services highlights:', error);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language, section.referencedIds]);

  const cardsCount = section.config?.cardsCount || 3;
  const mergedServices = services.slice(0, cardsCount).map((service, index) =>
    isCompleteService(service) ? service : { ...fallbackServices[index], ...service }
  );
  const displayServices = mergedServices.length >= cardsCount
    ? mergedServices
    : [...mergedServices, ...fallbackServices.slice(mergedServices.length, cardsCount)];

  const getSupportLine = (service: any) => {
    const technologies = Array.isArray(service.technologies) ? service.technologies.filter(Boolean) : [];
    if (technologies.length > 0) {
      return technologies.slice(0, 3).join(' · ');
    }

    const capabilities = Array.isArray(service.capabilities) ? service.capabilities : [];
    if (capabilities.length > 0) {
      const firstCapability = capabilities[0];
      return getLocalizedValue(firstCapability?.title_es || '', firstCapability?.title_en || '');
    }

    return language === 'es' ? 'Soluciones end-to-end' : 'End-to-end solutions';
  };

  // Icons for services
  const serviceIcons = [
    { icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Lightbulb, color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: BarChart3, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        {section.title && (
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-3">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-base text-gray-600 font-light max-w-2xl">
                {section.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Horizontal Compact Grid - Inspired by reference image */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          
          {/* Service 1 - Compact Icon Card */}
          {displayServices[0] && (
            <div className="theme-glass-surface lg:col-span-3 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl">
              <div className={`w-14 h-14 ${serviceIcons[0].bg} rounded-2xl flex items-center justify-center mb-4`}>
                {(() => {
                  const Icon = serviceIcons[0].icon;
                  return <Icon className={`w-7 h-7 ${serviceIcons[0].color}`} />;
                })()}
              </div>
              <h3 className="mb-2 text-lg font-light text-[var(--glass-text-primary)]">
                {getLocalizedValue(displayServices[0].title_es, displayServices[0].title_en)}
              </h3>
              <p className="text-sm font-light leading-relaxed text-[var(--glass-text-secondary)]">
                {getLocalizedValue(displayServices[0].excerpt_es, displayServices[0].excerpt_en)}
              </p>
              {getSupportLine(displayServices[0]) && (
                <p className="text-xs text-gray-500 font-medium mt-4 uppercase tracking-[0.18em]">
                  {getSupportLine(displayServices[0])}
                </p>
              )}
            </div>
          )}

          {/* Stats Card - Large Number */}
          <div className="theme-glass-accent-panel lg:col-span-2 flex flex-col items-center justify-center rounded-3xl p-6 text-center transition-all duration-300 hover:shadow-xl">
            <div className="mb-2 text-5xl font-light text-[var(--glass-text-primary)]">
              {metricValue}
            </div>
            <p className="text-xs font-light text-[var(--glass-text-secondary)]">
              {metricLabel}
            </p>
          </div>

          {/* Service 2 - Compact Icon Card */}
          {displayServices[1] && (
            <div className="theme-glass-surface lg:col-span-3 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl">
              <div className={`w-14 h-14 ${serviceIcons[1].bg} rounded-2xl flex items-center justify-center mb-4`}>
                {(() => {
                  const Icon = serviceIcons[1].icon;
                  return <Icon className={`w-7 h-7 ${serviceIcons[1].color}`} />;
                })()}
              </div>
              <h3 className="mb-2 text-lg font-light text-[var(--glass-text-primary)]">
                {getLocalizedValue(displayServices[1].title_es, displayServices[1].title_en)}
              </h3>
              <p className="text-sm font-light leading-relaxed text-[var(--glass-text-secondary)]">
                {getLocalizedValue(displayServices[1].excerpt_es, displayServices[1].excerpt_en)}
              </p>
              {getSupportLine(displayServices[1]) && (
                <p className="text-xs text-gray-500 font-medium mt-4 uppercase tracking-[0.18em]">
                  {getSupportLine(displayServices[1])}
                </p>
              )}
            </div>
          )}

          {/* CTA Card - Dark Blue with Tech Icons */}
          <div className="lg:col-span-4 bg-gradient-to-br from-blue-600 to-blue-700 backdrop-blur-sm rounded-3xl border border-blue-500/20 p-6 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex flex-col justify-between text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex gap-2 mb-4">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-4xl font-light mb-2">{featuredCardTitle}</div>
              <p className="text-sm text-white/90 font-light mb-4">
                {featuredCardText}
              </p>
            </div>
            
            <ArrowLink
              to={featuredCardCtaHref}
              variant="white"
              size="sm"
              className="relative z-10"
            >
              {featuredCardCtaLabel}
            </ArrowLink>
          </div>

        </motion.div>

        {/* Bottom Row - Service 3 Full Width */}
        {displayServices[2] && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="theme-glass-surface rounded-3xl p-6 transition-all duration-300 hover:shadow-xl lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
                {/* Icon */}
                <div className={`w-14 h-14 ${serviceIcons[2].bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  {(() => {
                    const Icon = serviceIcons[2].icon;
                    return <Icon className={`w-7 h-7 ${serviceIcons[2].color}`} />;
                  })()}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-light text-[var(--glass-text-primary)] lg:text-2xl">
                    {getLocalizedValue(displayServices[2].title_es, displayServices[2].title_en)}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-[var(--glass-text-secondary)]">
                    {getLocalizedValue(displayServices[2].excerpt_es, displayServices[2].excerpt_en)}
                  </p>
                  {getSupportLine(displayServices[2]) && (
                    <p className="text-xs text-gray-500 font-medium mt-4 uppercase tracking-[0.18em]">
                      {getSupportLine(displayServices[2])}
                    </p>
                  )}
                </div>
                
                {/* CTA */}
                <ArrowLink
                  to={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${getLocalizedValue(displayServices[2].slug_es, displayServices[2].slug_en)}`}
                  variant="purple"
                  className="flex-shrink-0"
                >
                  {language === 'es' ? 'Explorar' : 'Explore'}
                </ArrowLink>
              </div>
            </div>
          </motion.div>
        )}
        
      </div>
    </section>
  );
}
