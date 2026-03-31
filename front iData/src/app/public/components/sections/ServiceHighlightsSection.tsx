import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { HomeSection, Language } from '../../../shared/types';
import { mockServices } from '../../../data/mockData';
import { ArrowRight, BarChart3, Cpu, Lightbulb, Database, Layers } from 'lucide-react';
import { ArrowLink } from '../../../shared/components/ArrowLink';

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
  const services = section.referencedIds && section.referencedIds.length > 0
    ? mockServices.filter(s => section.referencedIds?.includes(s.id))
    : mockServices.filter(s => s.status === 'published').slice(0, 3);

  const cardsCount = section.config?.cardsCount || 3;
  const displayServices = services.slice(0, cardsCount);

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
            <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-6 hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 ${serviceIcons[0].bg} rounded-2xl flex items-center justify-center mb-4`}>
                {(() => {
                  const Icon = serviceIcons[0].icon;
                  return <Icon className={`w-7 h-7 ${serviceIcons[0].color}`} />;
                })()}
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-2">
                {getLocalizedValue(displayServices[0].title_es, displayServices[0].title_en)}
              </h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                {getLocalizedValue(displayServices[0].excerpt_es, displayServices[0].excerpt_en)}
              </p>
            </div>
          )}

          {/* Stats Card - Large Number */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-sm rounded-3xl border border-white/60 p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center">
            <div className="text-5xl font-light text-gray-900 mb-2">
              200+
            </div>
            <p className="text-xs text-gray-600 font-light">
              {language === 'es' ? 'Proyectos entregados' : 'Delivered projects'}
            </p>
          </div>

          {/* Service 2 - Compact Icon Card */}
          {displayServices[1] && (
            <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-6 hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 ${serviceIcons[1].bg} rounded-2xl flex items-center justify-center mb-4`}>
                {(() => {
                  const Icon = serviceIcons[1].icon;
                  return <Icon className={`w-7 h-7 ${serviceIcons[1].color}`} />;
                })()}
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-2">
                {getLocalizedValue(displayServices[1].title_es, displayServices[1].title_en)}
              </h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                {getLocalizedValue(displayServices[1].excerpt_es, displayServices[1].excerpt_en)}
              </p>
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
              <div className="text-4xl font-light mb-2">
                4.8<span className="text-2xl">★</span>
              </div>
              <p className="text-sm text-white/90 font-light mb-4">
                {language === 'es' ? 'Calificación promedio de clientes' : 'Average client rating'}
              </p>
            </div>
            
            <ArrowLink
              to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}`}
              variant="white"
              size="sm"
              className="relative z-10"
            >
              {language === 'es' ? 'Ver casos de éxito' : 'View case studies'}
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
            <div 
              className="rounded-3xl border border-white/30 p-6 lg:p-8 hover:shadow-xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
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
                  <h3 className="text-xl lg:text-2xl font-light text-gray-900 mb-2">
                    {getLocalizedValue(displayServices[2].title_es, displayServices[2].title_en)}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {getLocalizedValue(displayServices[2].excerpt_es, displayServices[2].excerpt_en)}
                  </p>
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