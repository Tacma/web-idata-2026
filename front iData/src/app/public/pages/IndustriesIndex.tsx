import { useState } from 'react';
import { CTABandSection } from '../components/sections/CTABandSection';
import { IndustryExpandableCard } from '../components/IndustryExpandableCard';
import { motion } from 'motion/react';
import { Droplet, Zap, Truck, HardHat, ShoppingCart, Building2, DollarSign, Heart, Layers } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { mockIndustries } from '../../data/mockData';
import type { LucideIcon } from 'lucide-react';

// Hero image
import heroImage from 'figma:asset/202ec833b06c7799e876fd83c520fa94807e6fe3.png';

// Icon mapping for industries
const industryIcons: Record<string, LucideIcon> = {
  'ind-1': Droplet,        // Petróleo y Gas
  'ind-2': Zap,            // Energía y Telco
  'ind-3': Truck,          // Logística
  'ind-4': HardHat,        // Construcción y Vías
  'ind-5': ShoppingCart,   // Retail y Manufactura
  'ind-6': Building2,      // Gobierno
  'ind-7': DollarSign,     // Finanzas y Seguros
  'ind-8': Heart,          // Salud
  'ind-9': Layers,         // Otras Industrias
};

export function IndustriesIndex() {
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const industries = mockIndustries
    .filter(i => i.status === 'published')
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.order - b.order;
    });

  const content = {
    hero: {
      eyebrow: language === 'es' 
        ? 'Experiencia en múltiples sectores'
        : 'Experience across multiple sectors',
      title: language === 'es' 
        ? 'Soluciones de datos para cada industria'
        : 'Data solutions for every industry',
      description: language === 'es'
        ? 'Cada sector enfrenta desafíos únicos. Ayudamos a organizaciones de diferentes industrias a aprovechar sus datos para mejorar decisiones, optimizar operaciones y generar ventajas competitivas.'
        : 'Every industry faces unique challenges. We help organizations leverage their data to improve decision making, optimize operations and unlock new opportunities.',
      subtitle: language === 'es'
        ? 'Trabajamos con organizaciones aplicando analítica avanzada, inteligencia artificial y plataformas de datos para resolver desafíos reales del negocio.'
        : 'We work with organizations applying advanced analytics, artificial intelligence and data platforms to solve real business challenges.'
    },
    industries: {
      title: language === 'es' ? 'Nuestras Industrias' : 'Our Industries',
      subtitle: language === 'es' 
        ? 'Haz clic en cualquier industria para conocer más'
        : 'Click on any industry to learn more'
    }
  };

  const ctaSection = {
    title: language === 'es' 
      ? '¿Listo para transformar tu industria con datos?'
      : 'Ready to transform your industry with data?',
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}`
  };

  const basePath = language === 'es' ? '/es/industrias' : '/en/industries';

  const handleCardClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCardClose = () => {
    setExpandedId(null);
  };

  return (
    <>
      <SEOHead
        title={language === 'es' ? 'Industrias - iData' : 'Industries - iData'}
        description={content.hero.description}
        canonical={`${basePath}/`}
        alternateES="/es/industrias/"
        alternateEN="/en/industries/"
        language={language}
      />

      {/* 1. HERO */}
      <section className="px-6 sm:px-8 lg:px-12 pt-8 pb-8 mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative min-h-[380px] rounded-3xl overflow-hidden shadow-xl flex items-center bg-gray-900">
            {/* Background Image */}
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <img
                src={heroImage}
                alt="Industries data solutions"
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
                  className="text-sm md:text-base uppercase tracking-wider text-blue-300 mb-4 font-medium"
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
                  className="text-base md:text-lg text-gray-300 font-light leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {content.hero.subtitle}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID EXPANDIBLE DE INDUSTRIAS */}
      <section className="bg-gray-50 py-16 md:py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs for glass effect */}
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl"
          />
          <div 
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {content.industries.title}
            </motion.h2>
            <motion.p 
              className="text-base text-gray-600 font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {content.industries.subtitle}
            </motion.p>
          </div>

          {/* Grid Container - Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto sm:auto-rows-fr"
            layout
          >
            {industries.map((industry) => {
              const Icon = industryIcons[industry.id] || Building2;
              
              return (
                <IndustryExpandableCard
                  key={industry.id}
                  industry={industry}
                  icon={Icon}
                  isExpanded={expandedId === industry.id}
                  onClick={() => handleCardClick(industry.id)}
                  onClose={handleCardClose}
                />
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. CTA FINAL */}
      <CTABandSection section={ctaSection} />
    </>
  );
}