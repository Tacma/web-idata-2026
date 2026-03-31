import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { t, getAlternateLanguage } from '../../shared/utils/i18n';
import { mockServiceCategories } from '../../data/mockData';
import { getPublished as getServices } from '../../../services/servicesService';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { InternalPageHero } from '../components/InternalPageHero';

// Hero image from Figma
import heroImage from '/assets/images/hero/business-analytics.png';

export function ServicesIndex() {
  const { language, getLocalizedValue } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices(language);
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [language]);

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

      <InternalPageHero
        eyebrow={heroContent.eyebrow}
        title={heroContent.title}
        description={heroContent.description}
        supportingText={heroContent.subtitle}
        imageSrc={heroImage}
        imageAlt="Business analytics dashboard"
      />

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
