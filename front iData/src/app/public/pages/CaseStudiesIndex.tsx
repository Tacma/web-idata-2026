import { CTABandSection } from '../components/sections/CTABandSection';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { mockCaseStudies } from '../../data/mockData';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { FloatingElements } from '../components/FloatingElements';

import heroImage from 'figma:asset/921b886abff2b12e01dec8866e9d861ee838fd1b.png';
import microsoftLogo from 'figma:asset/48829b35c832ac4a631d74dcfd8ac69d34b0adfa.png';
import snowflakeLogo from 'figma:asset/0f1a314fdbee8b957c6504f8fff0a07b3918b269.png';
import databricksLogo from 'figma:asset/d77c1b8e6a9a1a6f84c17715022360c027287a95.png';
import googleCloudLogo from 'figma:asset/809f376c4277570a490e5d7e959560b3df1ea78b.png';
import awsLogo from 'figma:asset/b8142854237a06a23c35b902808cc4d698f6938b.png';

// Client logos for case studies
import insLogo from 'figma:asset/2e14479f6b7066197b9d67ffd124097086808a61.png';
import velezLogo from 'figma:asset/06b06e1855dac275c8812f9479d406e8e9c1ca79.png';
import nadroLogo from 'figma:asset/fea3a17e7a6ead1a7633740672cbe99a239fd082.png';
import hacebLogo from 'figma:asset/c1c9d7e7386341aeb2920aa7bd64068809822c14.png';
import jfkLogo from 'figma:asset/7f2a0e2d34d7f6af4acad574a9b15fad31a6695f.png';
import davisLogo from 'figma:asset/c1583c61ef791e553848a046849ced947984afb5.png';

export function CaseStudiesIndex() {
  const { language, getLocalizedValue } = useLanguage();

  const content = {
    hero: {
      eyebrow: language === 'es' 
        ? 'Impacto real en organizaciones'
        : 'Real Impact on Organizations',
      title: language === 'es' 
        ? 'Casos de éxito en analítica y datos'
        : 'Data & Analytics Success Stories',
      description: language === 'es'
        ? 'Descubre cómo ayudamos a organizaciones de distintas industrias a transformar sus datos en resultados medibles y ventajas competitivas.'
        : 'Discover how we help organizations across industries transform their data into measurable results and competitive advantage.',
      subtitle: language === 'es'
        ? 'Trabajamos con empresas líderes para implementar soluciones de datos, analítica avanzada e inteligencia artificial que generan resultados tangibles.'
        : 'We work with leading companies to implement data, advanced analytics and artificial intelligence solutions that generate tangible results.',
    },
    methodology: {
      title: language === 'es' ? 'Cómo generamos impacto' : 'How We Generate Impact',
      stages: [
        {
          number: '01',
          title_es: 'Entendimiento del negocio',
          title_en: 'Business Understanding',
          description_es: 'Analizamos tus objetivos y desafíos para diseñar soluciones personalizadas.',
          description_en: 'We analyze your goals and challenges to design customized solutions.',
        },
        {
          number: '02',
          title_es: 'Diseño de la solución de datos',
          title_en: 'Data Solution Design',
          description_es: 'Creamos arquitecturas y estrategias que maximizan el valor de tus datos.',
          description_en: 'We create architectures and strategies that maximize the value of your data.',
        },
        {
          number: '03',
          title_es: 'Implementación tecnológica',
          title_en: 'Technology Implementation',
          description_es: 'Desarrollamos y desplegamos soluciones robustas con las mejores tecnologías.',
          description_en: 'We develop and deploy robust solutions with the best technologies.',
        },
        {
          number: '04',
          title_es: 'Resultados y evolución',
          title_en: 'Results and Evolution',
          description_es: 'Medimos el impacto y evolucionamos las soluciones continuamente.',
          description_en: 'We measure impact and continuously evolve the solutions.',
        },
      ],
    },
  };

  // Published case studies
  const publishedCases = mockCaseStudies
    .filter(c => c.status === 'published')
    .sort((a, b) => a.order - b.order);

  // Case logos mapping - real logos
  const caseLogoImages: Record<string, string> = {
    'case-1': insLogo,
    'case-2': velezLogo,
    'case-3': jfkLogo,      // JFK - CORREGIDO
    'case-4': hacebLogo,
    'case-5': nadroLogo,    // NADRO - CORREGIDO
    'case-6': davisLogo,
  };

  // Color mapping for each case - colors behind glass effect
  const caseColors: Record<string, { main: string; accent: string }> = {
    'case-1': { main: 'rgba(245, 158, 11, 0.28)', accent: 'rgba(251, 191, 36, 0.245)' }, // Amber - INS
    'case-2': { main: 'rgba(139, 92, 246, 0.28)', accent: 'rgba(168, 85, 247, 0.245)' }, // Purple - Cueros Vélez
    'case-3': { main: 'rgba(239, 68, 68, 0.28)', accent: 'rgba(248, 113, 113, 0.245)' }, // Red - JFK
    'case-4': { main: 'rgba(59, 130, 246, 0.28)', accent: 'rgba(96, 165, 250, 0.245)' }, // Blue - HACEB
    'case-5': { main: 'rgba(16, 185, 129, 0.28)', accent: 'rgba(52, 211, 153, 0.245)' }, // Green - NADRO
    'case-6': { main: 'rgba(99, 102, 241, 0.28)', accent: 'rgba(129, 140, 248, 0.245)' }, // Indigo - Davis
  };

  // Technology logos
  const technologies = [
    { name: 'Microsoft', logo: microsoftLogo },
    { name: 'Databricks', logo: databricksLogo },
    { name: 'Snowflake', logo: snowflakeLogo },
    { name: 'AWS', logo: awsLogo },
    { name: 'Google Cloud', logo: googleCloudLogo },
  ];

  const ctaSection = {
    title: language === 'es' 
      ? '¿Listo para generar resultados con tus datos?'
      : 'Ready to generate results with your data?',
    subtitle: language === 'es'
      ? 'Inicia una conversación con nuestros expertos'
      : 'Start a conversation with our experts',
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}`
  };

  return (
    <>
      <SEOHead
        title={language === 'es' ? 'Casos de éxito en analítica y datos - iData' : 'Data & Analytics Success Stories - iData'}
        description={content.hero.description}
        canonical={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/`}
        alternateES="/es/casos/"
        alternateEN="/en/case-studies/"
        language={language}
      />

      {/* Hero Section - Floating Banner Style */}
      <section className="px-6 sm:px-8 lg:px-12 pt-8 pb-8 mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative min-h-[380px] rounded-3xl overflow-hidden shadow-xl flex items-center bg-gray-900">
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
            <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-16">
              <div className="max-w-3xl">
                {/* Eyebrow */}
                <motion.p 
                  className="text-sm md:text-base uppercase tracking-wider text-purple-300 mb-4 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {content.hero.eyebrow}
                </motion.p>

                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-5 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {content.hero.title}
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-gray-200 mb-4 font-light leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {content.hero.description}
                </motion.p>

                <motion.p 
                  className="text-base md:text-lg text-gray-300 mb-8 font-light leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {content.hero.subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <a
                    href="#cases"
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-250 hover:shadow-xl hover:scale-[1.02] active:scale-100 group"
                  >
                    {language === 'es' ? 'Ver casos' : 'View case studies'}
                    <ArrowRight className="w-5 h-5 transition-transform duration-250 group-hover:translate-x-1" />
                  </a>
                  
                  <Link
                    to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}`}
                    className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-700 transition-all duration-250"
                  >
                    {language === 'es' ? 'Hablar con un experto' : 'Talk to an expert'}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section id="cases" className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedCases.map((caseStudy, index) => {
              const results = caseStudy.results_es ? 
                (language === 'es' ? caseStudy.results_es : caseStudy.results_en || '').split('|').map(r => r.trim()) : 
                [];
              
              const logoSrc = caseLogoImages[caseStudy.id];
              const colors = caseColors[caseStudy.id] || { main: 'rgba(139, 92, 246, 0.28)', accent: 'rgba(168, 85, 247, 0.245)' };
              
              return (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/${getLocalizedValue(caseStudy.slug_es, caseStudy.slug_en)}`}
                    className="group block h-full"
                  >
                    <div className="relative rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col border border-gray-200">
                      {/* Background color layer behind glass */}
                      <div 
                        className="absolute inset-0 z-0"
                        style={{
                          background: `linear-gradient(135deg, ${colors.main} 0%, ${colors.accent} 100%)`,
                        }}
                      />
                      
                      {/* Glass effect layer */}
                      <div 
                        className="absolute inset-0 z-10"
                        style={{
                          background: 'rgba(255, 255, 255, 0.65)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-20 p-6 flex flex-col h-full">
                        {/* Header - Logo + Name + Description */}
                        <div className="flex gap-4 mb-6">
                          {/* Column 1: Logo */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-xl bg-white shadow-md flex items-center justify-center p-2.5">
                              <img 
                                src={logoSrc} 
                                alt={caseStudy.client}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                          
                          {/* Column 2: Name + Description */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-medium text-gray-900 mb-2 leading-tight">
                              {caseStudy.client}
                            </h3>
                            <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-2">
                              {getLocalizedValue(caseStudy.excerpt_es, caseStudy.excerpt_en)}
                            </p>
                          </div>
                        </div>

                        {/* Results section */}
                        {results.length > 0 && (
                          <div className="space-y-2 mb-6 flex-1">
                            {results.slice(0, 3).map((result, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 font-light leading-snug line-clamp-1">
                                  {result}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="inline-flex items-center gap-2 text-purple-600 text-sm font-medium group-hover:gap-3 transition-all duration-300 mt-auto w-fit">
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

      {/* Methodology Section - "Cómo generamos impacto" */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {content.methodology.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.methodology.stages.map((stage, index) => (
              <motion.div
                key={stage.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col h-full">
                  <div className="text-6xl font-light text-purple-600/20 mb-4">
                    {stage.number}
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-3">
                    {getLocalizedValue(stage.title_es, stage.title_en)}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {getLocalizedValue(stage.description_es, stage.description_en)}
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
            {language === 'es' ? 'Tecnologías' : 'Technologies'}
          </motion.h2>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-32 lg:w-40 h-16 lg:h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0">
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

      {/* CTA Final */}
      <CTABandSection section={ctaSection} />
    </>
  );
}