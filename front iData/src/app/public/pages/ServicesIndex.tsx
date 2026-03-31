import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { t, getAlternateLanguage } from '../../shared/utils/i18n';
import { mockServiceCategories, mockServices } from '../../data/mockData';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

// Hero image from Figma
import heroImage from 'figma:asset/f13e93a5336016cfdd179a5fe66e5a9ffb036446.png';

export function ServicesIndex() {
  const { language, getLocalizedValue } = useLanguage();

  const categories = mockServiceCategories
    .filter(cat => cat.status === 'published')
    .sort((a, b) => a.order - b.order);

  const breadcrumbItems = [
    { label: t('services', language) }
  ];

  const heroContent = {
    eyebrow: language === 'es' ? 'Áreas de Servicio' : 'Service Areas',
    title: language === 'es' ? 'Servicios de Datos y Analítica' : 'Data & Analytics Services',
    description: language === 'es' 
      ? 'Soluciones integrales de datos y analítica para transformar su negocio con tecnología de punta e innovación'
      : 'Comprehensive data and analytics solutions to transform your business with cutting-edge technology and innovation',
    subtitle: language === 'es'
      ? 'Desde la estrategia hasta la operación de plataformas de datos, ayudamos a las empresas a aprovechar todo el potencial de sus datos.'
      : 'From strategy to data platform operations, we help companies unlock the full potential of their data.'
  };

  return (
    <>
      <SEOHead
        title={language === 'es' ? 'Servicios - iData' : 'Services - iData'}
        description={language === 'es' 
          ? 'Soluciones integrales de datos y analítica empresarial'
          : 'Comprehensive enterprise data and analytics solutions'
        }
        canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/`}
        alternateES="/es/servicios/"
        alternateEN="/en/services/"
        language={language}
      />

      {/* Hero Section - Full Width Banner */}
      <section className="relative mt-20 min-h-[380px] flex items-center overflow-hidden bg-gray-900">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <img
            src={heroImage}
            alt="Business analytics dashboard"
            className="w-full h-full object-cover opacity-40"
          />
          {/* Dark overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.6) 100%)',
            }}
          />
        </motion.div>

        {/* Content - Left Aligned */}
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-16">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.p 
              className="text-sm md:text-base uppercase tracking-wider text-blue-300 mb-4 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {heroContent.eyebrow}
            </motion.p>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-5 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {heroContent.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-4 font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {heroContent.description}
            </motion.p>

            <motion.p 
              className="text-base md:text-lg text-gray-300 mb-8 font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroContent.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link
                to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-xl group"
              >
                {language === 'es' ? 'Hablar con un experto' : 'Talk to an expert'}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-medium hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                {language === 'es' ? 'Ver casos de éxito' : 'View success stories'}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Service Categories */}
        <div id="services" className="space-y-16">
          {categories.map((category) => {
            const categoryServices = mockServices
              .filter(s => s.categoryId === category.id && s.status === 'published')
              .sort((a, b) => a.order - b.order);

            return (
              <section key={category.id}>
                <div className="mb-8">
                  <Link
                    to={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${category.categorySlug}/`}
                    className="inline-block group"
                  >
                    <h2 className="text-3xl font-light text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {getLocalizedValue(category.title_es, category.title_en)}
                    </h2>
                  </Link>
                  <p className="text-lg text-gray-600">
                    {getLocalizedValue(category.description_es, category.description_en)}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.id}
                      to={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${getLocalizedValue(service.slug_es, service.slug_en)}`}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all"
                    >
                      <h3 className="text-xl font-light text-gray-900 mb-3">
                        {getLocalizedValue(service.title_es, service.title_en)}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {getLocalizedValue(service.excerpt_es, service.excerpt_en)}
                      </p>
                      <span className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1">
                        {language === 'es' ? 'Conoce más' : 'Learn more'}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}