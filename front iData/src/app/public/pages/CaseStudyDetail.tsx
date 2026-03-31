import { useParams, Navigate, Link } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { mockCaseStudies, mockIndustries, mockServices } from '../../data/mockData';
import { CTABandSection } from '../components/sections/CTABandSection';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useEffect } from 'react';

// Technology logos
import microsoftLogo from 'figma:asset/48829b35c832ac4a631d74dcfd8ac69d34b0adfa.png';
import snowflakeLogo from 'figma:asset/0f1a314fdbee8b957c6504f8fff0a07b3918b269.png';
import databricksLogo from 'figma:asset/d77c1b8e6a9a1a6f84c17715022360c027287a95.png';
import googleCloudLogo from 'figma:asset/809f376c4277570a490e5d7e959560b3df1ea78b.png';
import awsLogo from 'figma:asset/b8142854237a06a23c35b902808cc4d698f6938b.png';

// Hero images
import insHeroImage from 'figma:asset/64c2a94903fc2aeb8877fc1cde125accceae6357.png';
import dataArchitectureHero from 'figma:asset/95f5231b46b50e1e0563f086e023eda105bcf13b.png';
import hacebHeroImage from 'figma:asset/2fe699e45c2e6cb3f77d2eab2fbd09019e366523.png';

// Client logos
import insLogo from 'figma:asset/2e14479f6b7066197b9d67ffd124097086808a61.png';
import velezLogo from 'figma:asset/06b06e1855dac275c8812f9479d406e8e9c1ca79.png';
import nadroLogo from 'figma:asset/fea3a17e7a6ead1a7633740672cbe99a239fd082.png';
import hacebLogo from 'figma:asset/c1c9d7e7386341aeb2920aa7bd64068809822c14.png';
import jfkLogo from 'figma:asset/7f2a0e2d34d7f6af4acad574a9b15fad31a6695f.png';
import davisLogo from 'figma:asset/c1583c61ef791e553848a046849ced947984afb5.png';

const technologies = [
  { name: 'Microsoft', logo: microsoftLogo },
  { name: 'Databricks', logo: databricksLogo },
  { name: 'Snowflake', logo: snowflakeLogo },
  { name: 'AWS', logo: awsLogo },
  { name: 'Google Cloud', logo: googleCloudLogo }
];

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();

  const caseStudy = mockCaseStudies.find(
    c =>
      c.status === 'published' &&
      (c.slug_es === slug || c.slug_en === slug)
  );

  if (!caseStudy) {
    const basePath = language === 'es' ? '/es/casos' : '/en/case-studies';
    return <Navigate to={`${basePath}/`} replace />;
  }

  const title = getLocalizedValue(caseStudy.title_es, caseStudy.title_en);
  const content = getLocalizedValue(caseStudy.content_es, caseStudy.content_en);
  const excerpt = getLocalizedValue(caseStudy.excerpt_es, caseStudy.excerpt_en);
  const resultsString = getLocalizedValue(caseStudy.results_es, caseStudy.results_en);
  const results = resultsString ? resultsString.split('|').map(r => r.trim()) : []
  const seo = language === 'es' ? caseStudy.seo_es : caseStudy.seo_en;
  const currentSlug = getLocalizedValue(caseStudy.slug_es, caseStudy.slug_en);
  const basePath = language === 'es' ? '/es/casos' : '/en/case-studies';

  const industry = mockIndustries.find(i => i.id === caseStudy.industryId);

  // Get 3 related cases (excluding current one)
  const relatedCases = mockCaseStudies
    .filter(c => c.id !== caseStudy.id && c.status === 'published')
    .slice(0, 3);

  // Background images for hero (use different ones per case)
  const heroImages: Record<string, string> = {
    'case-1': insHeroImage,
    'case-2': 'https://images.unsplash.com/photo-1768550005921-8782adcb798c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwZmFjdG9yeSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzczMDc3NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'case-3': dataArchitectureHero,
    'case-4': hacebHeroImage,
    'case-5': 'https://images.unsplash.com/photo-1641561421189-a6bf2fd5ca10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxvZ2lzdGljcyUyMG1vZGVybnxlbnwxfHx8fDE3NzMwNzc1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'case-6': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzb2NpYWwlMjBwcm9ncmFtfGVufDF8fHx8MTczMzA3NzUzOXww&ixlib=rb-4.1.0&q=80&w=1080',
  };
  const heroImage = heroImages[caseStudy.id] || heroImages['case-1'];

  // Background images for related cases
  const caseImages: Record<string, string> = {
    'case-1': insHeroImage,
    'case-2': heroImages['case-2'],
    'case-3': dataArchitectureHero,
    'case-4': hacebHeroImage,
    'case-5': heroImages['case-5'],
    'case-6': heroImages['case-6'],
  };

  // Client logos
  const clientLogos: Record<string, string> = {
    'case-1': insLogo,
    'case-2': velezLogo,
    'case-3': jfkLogo,      // JFK - CORREGIDO
    'case-4': hacebLogo,
    'case-5': nadroLogo,    // NADRO - CORREGIDO
    'case-6': davisLogo,
  };
  const clientLogo = clientLogos[caseStudy.id];

  const ctaSection = {
    title: language === 'es' 
      ? '¿Listo para transformar tus datos en resultados reales?'
      : 'Ready to transform your data into real results?',
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}`
  };

  // Scroll to top when slug changes (cuando navegas a otro caso)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  return (
    <>
      <SEOHead
        title={seo.metaTitle}
        description={seo.metaDescription}
        canonical={`${basePath}/${currentSlug}`}
        ogImage={caseStudy.featuredImage}
        alternateES={`/es/casos/${caseStudy.slug_es}`}
        alternateEN={`/en/case-studies/${caseStudy.slug_en}`}
        language={language}
      />

      {/* 1. HERO - Floating Banner Style */}
      <section className="px-6 sm:px-8 lg:px-12 pt-8 pb-8 mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative min-h-[260px] rounded-3xl overflow-hidden shadow-xl flex items-center bg-gray-900">
            {/* Background Image */}
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <ImageWithFallback
                src={heroImage}
                alt={caseStudy.client}
                className="w-full h-full object-cover opacity-60"
              />
              {/* Glass overlay - más claro */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.35) 100%)',
                  backdropFilter: 'blur(1px)',
                }}
              />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-10 md:py-12">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
                
                {/* Left: Text Content */}
                <div>
                  {/* Logo del cliente */}
                  {clientLogo && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden inline-block shadow-lg">
                        <ImageWithFallback
                          src={clientLogo}
                          alt={`${caseStudy.client} logo`}
                          className="h-16 md:h-20 w-auto object-contain"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Industry label + Client name inline */}
                  <motion.div 
                    className="flex flex-wrap items-center gap-3 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {industry && (
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-sm font-medium text-white">
                          {getLocalizedValue(industry.title_es, industry.title_en)}
                        </span>
                      </div>
                    )}
                    <h2 className="text-xl md:text-2xl font-light text-white/90">
                      {caseStudy.client}
                    </h2>
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {excerpt}
                  </motion.h1>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Link
                      to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}`}
                      className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-100 group"
                    >
                      {language === 'es' ? 'Hablar con un experto' : 'Talk to an expert'}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </div>
                
                {/* Right: Results bullets */}
                {results.length > 0 && (
                  <motion.div 
                    className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {results.map((result, index) => (
                      <div 
                        key={index}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 min-w-[240px] lg:min-w-0 lg:w-[280px]"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-white font-light text-sm leading-relaxed">
                            {result}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EL DESAFÍO, LA SOLUCIÓN Y RESULTADOS - Todo en una sección unificada */}
      <section className="bg-gray-50 py-16 md:py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Fondo decorativo con círculos difuminados */}
          <div className="relative">
            
            {/* Círculos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div 
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, transparent 70%)',
                  filter: 'blur(100px)',
                }}
              />
              <div 
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(34, 197, 94, 0.5) 0%, transparent 70%)',
                  filter: 'blur(100px)',
                }}
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(147, 197, 253, 0.6) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                }}
              />
            </div>

            {/* PARTE 1: DESAFÍO Y SOLUCIÓN (Tarjetas flotantes) */}
            <div className="relative grid lg:grid-cols-2 gap-0 lg:gap-0 mb-16 md:mb-20">
              
              {/* IZQUIERDA: EL DESAFÍO */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative lg:pr-8"
              >
                <div 
                  className="relative overflow-hidden rounded-3xl lg:mr-[-40px] z-10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    boxShadow: `
                      0 0 0 1px rgba(239, 68, 68, 0.1),
                      0 8px 32px rgba(239, 68, 68, 0.08),
                      0 16px 64px rgba(239, 68, 68, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.8),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                    `,
                  }}
                >
                  {/* Borde superior luminoso */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.5) 20%, rgba(249, 115, 22, 0.5) 80%, transparent 100%)',
                    }}
                  />
                  
                  {/* Borde lateral luminoso */}
                  <div 
                    className="absolute top-0 bottom-0 left-0 w-px"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(239, 68, 68, 0.3) 50%, transparent 100%)',
                    }}
                  />
                  
                  {/* Gradiente rojo sutil interno */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-50"
                    style={{
                      background: 'radial-gradient(ellipse at top left, rgba(239, 68, 68, 0.12) 0%, transparent 60%)',
                    }}
                  />
                  
                  <div className="relative p-8 md:p-10 lg:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      {/* Icono sin fondo, solo color */}
                      <div className="flex-shrink-0">
                        <AlertCircle 
                          className="w-10 h-10 md:w-12 md:h-12"
                          style={{
                            stroke: 'url(#redGradient)',
                            strokeWidth: 1.5,
                            filter: 'drop-shadow(0 2px 8px rgba(239, 68, 68, 0.3))',
                          }}
                        />
                        <svg width="0" height="0">
                          <defs>
                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgb(239, 68, 68)" />
                              <stop offset="100%" stopColor="rgb(249, 115, 22)" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        {language === 'es' ? 'El desafío' : 'The challenge'}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <p className="text-lg text-gray-800 font-light leading-relaxed">
                        {content}
                      </p>
                      
                      {industry && (
                        <div className="pt-6">
                          <div 
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                            style={{
                              background: 'rgba(255, 255, 255, 0.7)',
                              backdropFilter: 'blur(12px)',
                              border: '1px solid rgba(239, 68, 68, 0.15)',
                              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                            }}
                          >
                            <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                              {language === 'es' ? 'Industria' : 'Industry'}
                            </span>
                            <span className="text-sm text-gray-900 font-medium">
                              {getLocalizedValue(industry.title_es, industry.title_en)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* DERECHA: LA SOLUCIÓN */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative lg:pl-8 mt-8 lg:mt-0"
              >
                <div 
                  className="relative overflow-hidden rounded-3xl lg:ml-[-40px] z-20"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    boxShadow: `
                      0 0 0 1px rgba(34, 197, 94, 0.1),
                      0 8px 32px rgba(34, 197, 94, 0.08),
                      0 16px 64px rgba(34, 197, 94, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.8),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                    `,
                  }}
                >
                  {/* Borde superior luminoso */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.5) 20%, rgba(16, 185, 129, 0.5) 80%, transparent 100%)',
                    }}
                  />
                  
                  {/* Borde lateral luminoso */}
                  <div 
                    className="absolute top-0 bottom-0 right-0 w-px"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(34, 197, 94, 0.3) 50%, transparent 100%)',
                    }}
                  />
                  
                  {/* Gradiente verde sutil interno */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-50"
                    style={{
                      background: 'radial-gradient(ellipse at top right, rgba(34, 197, 94, 0.12) 0%, transparent 60%)',
                    }}
                  />
                  
                  <div className="relative p-8 md:p-10 lg:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      {/* Icono sin fondo, solo color */}
                      <div className="flex-shrink-0">
                        <Lightbulb 
                          className="w-10 h-10 md:w-12 md:h-12"
                          style={{
                            stroke: 'url(#greenGradient)',
                            strokeWidth: 1.5,
                            filter: 'drop-shadow(0 2px 8px rgba(34, 197, 94, 0.3))',
                          }}
                        />
                        <svg width="0" height="0">
                          <defs>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgb(34, 197, 94)" />
                              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        {language === 'es' ? 'La solución' : 'The solution'}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <p className="text-lg text-gray-800 font-light leading-relaxed">
                        {content}
                      </p>
                      
                      {caseStudy.serviceIds && caseStudy.serviceIds.length > 0 && (
                        <div className="pt-6">
                          <p className="text-sm text-gray-600 font-medium mb-3 uppercase tracking-wide">
                            {language === 'es' ? 'Servicios aplicados' : 'Services applied'}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {caseStudy.serviceIds.map(serviceId => {
                              const service = mockServices.find(s => s.id === serviceId);
                              if (!service) return null;
                              return (
                                <span 
                                  key={serviceId}
                                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm text-gray-800 font-light shadow-sm"
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(34, 197, 94, 0.15)',
                                    boxShadow: '0 2px 8px rgba(34, 197, 94, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                                  }}
                                >
                                  {getLocalizedValue(service.title_es, service.title_en)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* PARTE 2: RESULTADOS (Integrado en la misma sección) */}
            {results.length > 0 && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
                  {language === 'es' ? 'Resultados' : 'Results'}
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-full flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-lg text-gray-900 font-light leading-relaxed">
                          {result}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* 3. TECNOLOGÍAS */}
      <section className="bg-white py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-light text-gray-900 mb-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {language === 'es' ? 'Tecnologías' : 'Technologies'}
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
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

      {/* 4. CASOS RELACIONADOS */}
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
                {language === 'es' ? 'Otros Casos de Éxito' : 'Other Case Studies'}
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
              {relatedCases.map((relatedCase, index) => {
                const relatedResults = relatedCase.results_es ? 
                  (language === 'es' ? relatedCase.results_es : relatedCase.results_en || '').split('|').map(r => r.trim()) : 
                  [];
                const backgroundImage = caseImages[relatedCase.id];
                
                return (
                  <motion.div
                    key={relatedCase.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/${getLocalizedValue(relatedCase.slug_es, relatedCase.slug_en)}`}
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
                                alt={relatedCase.client}
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
                              {relatedCase.client}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-white/90 font-light leading-relaxed">
                              {getLocalizedValue(relatedCase.excerpt_es, relatedCase.excerpt_en)}
                            </p>
                          </div>

                        </div>

                        {/* Bottom Section: Liquid Glass Background with Metrics & CTA */}
                        <div className="p-6 pt-5">
                          
                          {/* Results Metrics */}
                          <div className="space-y-2 mb-5">
                            {relatedResults.slice(0, 2).map((result, idx) => (
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
      )}

      {/* 5. CTA FINAL */}
      <CTABandSection section={ctaSection} />
    </>
  );
}