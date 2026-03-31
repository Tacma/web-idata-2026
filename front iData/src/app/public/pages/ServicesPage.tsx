import { CTABandSection } from '../components/sections/CTABandSection';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Database, Network, LineChart, Brain, Cloud, Settings } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { mockCaseStudies } from '../../data/mockData';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { LivingHaloBackground } from '../components/hero/LivingHaloBackground';

import heroImage from 'figma:asset/807f4652c8d95ddbee1d44684e9e0291c16c029f.png';
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

interface ServiceArea {
  icon: React.ComponentType<{ className?: string }>;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  slug: string;
  image?: string;
}

const serviceAreas: ServiceArea[] = [
  {
    icon: Database,
    title_es: 'Strategy & Consulting',
    title_en: 'Strategy & Consulting',
    description_es: 'Diseñamos estrategias de datos, gobierno y marcos de calidad para maximizar el valor de la información.',
    description_en: 'We design data strategies, governance and quality frameworks to maximize information value.',
    slug: 'strategy-consulting',
    image: dataStrategyImage
  },
  {
    icon: Network,
    title_es: 'Data Delivery',
    title_en: 'Data Delivery',
    description_es: 'Construimos arquitecturas modernas de datos y soluciones de analítica avanzada e inteligencia artificial.',
    description_en: 'We build modern data architectures and advanced analytics and artificial intelligence solutions.',
    slug: 'data-delivery',
    image: dataEngineeringImage
  },
  {
    icon: Settings,
    title_es: 'Data Operations',
    title_en: 'Data Operations',
    description_es: 'Operamos y optimizamos ecosistemas de datos con modelos ágiles y automatizados.',
    description_en: 'We operate and optimize data ecosystems with agile and automated models.',
    slug: 'data-operations',
    image: dataOperationsImage
  },
  {
    icon: Cloud,
    title_es: 'Cloud Services Provider',
    title_en: 'Cloud Services Provider',
    description_es: 'Implementamos y administramos plataformas de datos en la nube con tecnologías líderes.',
    description_en: 'We implement and manage cloud data platforms with leading technologies.',
    slug: 'cloud-services-provider',
    image: dataPlatformsImage
  }
];

const workProcess = {
  es: [
    { title: 'Diagnóstico', description: 'Evaluamos el estado actual de tus datos' },
    { title: 'Diseño', description: 'Creamos la arquitectura y estrategia óptima' },
    { title: 'Implementación', description: 'Ejecutamos la solución con excelencia' },
    { title: 'Evolución', description: 'Mejoramos continuamente tu plataforma' }
  ],
  en: [
    { title: 'Diagnosis', description: 'We assess your current data state' },
    { title: 'Design', description: 'We create the optimal architecture and strategy' },
    { title: 'Implementation', description: 'We execute the solution with excellence' },
    { title: 'Evolution', description: 'We continuously improve your platform' }
  ]
};

const technologies = [
  { 
    name: 'Microsoft', 
    logo: microsoftLogo
  },
  { 
    name: 'Databricks', 
    logo: databricksLogo
  },
  { 
    name: 'Snowflake', 
    logo: snowflakeLogo
  },
  { 
    name: 'AWS', 
    logo: awsLogo
  },
  { 
    name: 'Google Cloud', 
    logo: googleCloudLogo
  }
];

const featuredCases = {
  es: [
    { name: 'Cueros Vélez', slug: 'cueros-velez' },
    { name: 'HACEB', slug: 'haceb' },
    { name: 'NADRO', slug: 'nadro' }
  ],
  en: [
    { name: 'Cueros Vélez', slug: 'cueros-velez' },
    { name: 'HACEB', slug: 'haceb' },
    { name: 'NADRO', slug: 'nadro' }
  ]
};

export function ServicesPage() {
  const { language, getLocalizedValue } = useLanguage();

  const content = {
    hero: {
      title: language === 'es' 
        ? 'Servicios de Datos, Analítica e Inteligencia Artificial'
        : 'Data, Analytics and Artificial Intelligence Services',
      description: language === 'es'
        ? 'Impulsamos la evolución tecnológica de las organizaciones con soluciones integrales en datos, analítica avanzada e inteligencia artificial.'
        : 'We drive the technological evolution of organizations with comprehensive solutions in data, advanced analytics and artificial intelligence.',
      ctaPrimary: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
      ctaSecondary: language === 'es' ? 'Ver casos de éxito' : 'View success stories'
    },
    whatWeDo: {
      title: language === 'es' 
        ? 'Construimos organizaciones impulsadas por datos'
        : 'We build data-driven organizations',
      text: language === 'es'
        ? 'Desde la estrategia hasta la operación de plataformas de datos, ayudamos a las empresas a aprovechar todo el potencial de sus datos.'
        : 'From strategy to data platform operations, we help companies leverage the full potential of their data.'
    },
    serviceAreas: {
      title: language === 'es' ? 'Áreas de Servicio' : 'Service Areas',
      ctaLabel: language === 'es' ? 'Ver servicio' : 'View service'
    },
    process: {
      title: language === 'es' ? 'Cómo Trabajamos' : 'How We Work'
    },
    technologies: {
      title: language === 'es' ? 'Tecnologías' : 'Technologies'
    },
    cases: {
      title: language === 'es' ? 'Casos Relacionados' : 'Related Cases',
      cta: language === 'es' ? 'Ver caso completo' : 'View full case'
    }
  };

  const ctaSection = {
    title: language === 'es' 
      ? '¿Listo para evolucionar tu estrategia de datos?'
      : 'Ready to evolve your data strategy?',
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}`
  };

  return (
    <>
      <SEOHead
        title={language === 'es' ? 'Servicios de Datos e IA - iData' : 'Data and AI Services - iData'}
        description={content.hero.description}
        canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/`}
        alternateES="/es/servicios/"
        alternateEN="/en/services/"
        language={language}
      />

      {/* Hero Section - Floating Banner Style */}
      <section className="px-6 sm:px-8 lg:px-12 pt-8 pb-8 mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative min-h-[420px] rounded-3xl overflow-hidden shadow-xl flex items-center bg-gray-900">
            {/* Background Image with Parallax */}
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <img
                src={heroImage}
                alt="Data visualization dashboard"
                className="w-full h-full object-cover opacity-50"
              />
              {/* Glass overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.4) 100%)',
                  backdropFilter: 'blur(1px)',
                }}
              />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-20">
              <div className="max-w-3xl">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {content.hero.title}
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {content.hero.description}
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link
                    to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}`}
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-250 hover:shadow-xl hover:scale-[1.02] active:scale-100 group"
                  >
                    {content.hero.ctaPrimary}
                    <ArrowRight className="w-5 h-5 transition-transform duration-250 group-hover:translate-x-1" />
                  </Link>
                  
                  <Link
                    to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}`}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-250 border border-white/30 backdrop-blur-sm"
                  >
                    {content.hero.ctaSecondary}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceAreas.map((area, index) => {
              const Icon = area.icon;
              // Colores para los elementos flotantes de cada servicio
              const floatingColors = [
                { main: 'rgba(99, 102, 241, 0.15)', accent: 'rgba(139, 92, 246, 0.12)' }, // Índigo-Púrpura
                { main: 'rgba(59, 130, 246, 0.15)', accent: 'rgba(37, 99, 235, 0.12)' }, // Azul
                { main: 'rgba(16, 185, 129, 0.15)', accent: 'rgba(5, 150, 105, 0.12)' }, // Verde
                { main: 'rgba(139, 92, 246, 0.15)', accent: 'rgba(124, 58, 237, 0.12)' }, // Púrpura
                { main: 'rgba(14, 165, 233, 0.15)', accent: 'rgba(2, 132, 199, 0.12)' }, // Cyan
                { main: 'rgba(249, 115, 22, 0.15)', accent: 'rgba(234, 88, 12, 0.12)' }, // Naranja
              ];
              
              // Colores del icono para cada servicio
              const iconColors = [
                '#6366F1', // Índigo
                '#3B82F6', // Azul
                '#10B981', // Verde
                '#8B5CF6', // Púrpura
                '#0EA5E9', // Cyan
                '#F97316', // Naranja
              ];
              
              return (
                <motion.div
                  key={area.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col bg-white border border-gray-200"
                  >
                    {/* Elementos flotantes de fondo */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {/* Elemento flotante 1 - Superior derecha */}
                      <motion.div
                        className="absolute w-48 h-48 rounded-full"
                        style={{ background: floatingColors[index].main, filter: 'blur(50px)' }}
                        animate={{
                          scale: [1, 1.3, 1.1, 1],
                          x: ['-20%', '0%', '10%', '-20%'],
                          y: ['-20%', '0%', '-10%', '-20%'],
                          opacity: [0.7, 0.9, 0.75, 0.7],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        initial={{ top: '-10%', right: '-10%' }}
                      />
                      
                      {/* Elemento flotante 2 - Inferior izquierda */}
                      <motion.div
                        className="absolute w-44 h-44 rounded-full"
                        style={{ background: floatingColors[index].accent, filter: 'blur(45px)' }}
                        animate={{
                          scale: [1, 1.25, 1.15, 1],
                          x: ['0%', '-15%', '5%', '0%'],
                          y: ['0%', '10%', '-5%', '0%'],
                          opacity: [0.65, 0.85, 0.7, 0.65],
                        }}
                        transition={{
                          duration: 7,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 1,
                        }}
                        initial={{ bottom: '-15%', left: '-15%' }}
                      />
                    </div>
                    
                    {/* Sección 1: Etiqueta centrada */}
                    <div className="p-6 pb-0 flex justify-center relative z-10">
                      <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                        <Icon className="w-4 h-4" style={{ color: iconColors[index] }} />
                        <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                          {language === 'es' ? 'Servicio' : 'Service'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Sección 2: Título centrado y Descripción debajo */}
                    <div className="p-6 py-4 flex-shrink-0 text-center relative z-10">
                      <h3 className="text-2xl font-light text-gray-900 mb-2 leading-tight">
                        {getLocalizedValue(area.title_es, area.title_en)}
                      </h3>
                      
                      <p className="text-gray-600 font-light leading-relaxed text-sm mb-4 line-clamp-2">
                        {getLocalizedValue(area.description_es, area.description_en)}
                      </p>
                    </div>
                    
                    {/* Sección 3: Imagen centrada */}
                    <div className="px-6 pb-4 flex-grow flex items-center justify-center relative z-10">
                      {area.image && (
                        <img
                          src={area.image}
                          alt={getLocalizedValue(area.title_es, area.title_en)}
                          className="h-44 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                          style={{
                            filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.08))'
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Sección 4: Botón centrado */}
                    <div className="p-6 pt-0 relative z-10">
                      <Link
                        to={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${area.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-250 hover:gap-3 group/btn w-full justify-center"
                        style={{ 
                          backgroundColor: iconColors[index],
                          color: 'white'
                        }}
                      >
                        {content.serviceAreas.ctaLabel}
                        <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-gray-900 mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {content.process.title}
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess[language].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-center group cursor-default">
                  <div className="text-5xl font-light text-gray-300 mb-4 transition-colors duration-300 group-hover:text-fuchsia-600">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 font-light leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-light text-gray-900 mb-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {content.technologies.title}
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className={`flex items-center justify-center ${index === technologies.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-32 lg:w-40 h-16 lg:h-20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <img 
                    src={tech.logo} 
                    alt={tech.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cases Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {content.cases.title}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {mockCaseStudies
              .filter(c => ['case-2', 'case-4', 'case-5'].includes(c.id))
              .map((caseStudy, index) => {
                const results = caseStudy.results_es ? 
                  (language === 'es' ? caseStudy.results_es : caseStudy.results_en || '').split('|').map(r => r.trim()) : 
                  [];
                
                // Background images for each case
                const caseImages: Record<string, string> = {
                  'case-2': 'https://images.unsplash.com/photo-1768550005921-8782adcb798c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwZmFjdG9yeSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzczMDc3NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
                        
                        {/* Top Section: Image Background with Title & Description */}
                        <div className="relative overflow-hidden">
                          
                          {/* Background Image */}
                          {backgroundImage && (
                            <div className="absolute inset-0">
                              <ImageWithFallback
                                src={backgroundImage}
                                alt={caseStudy.client}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Dark Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 to-gray-900/85" />

                          {/* Content over image */}
                          <div className="relative p-4 pb-5">
                            {/* Client Name - Bold */}
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {caseStudy.client}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-white/90 font-light leading-relaxed">
                              {getLocalizedValue(caseStudy.excerpt_es, caseStudy.excerpt_en)}
                            </p>
                          </div>

                        </div>

                        {/* Bottom Section: Liquid Glass Background with Metrics & CTA */}
                        <div className="p-6 pt-5">
                          
                          {/* Results Metrics */}
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

                          {/* CTA */}
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

      {/* CTA Final */}
      <CTABandSection section={ctaSection} />
    </>
  );
}