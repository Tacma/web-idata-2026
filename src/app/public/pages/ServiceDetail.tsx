import { useParams } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { t, getAlternateLanguage } from '../../shared/utils/i18n';
import { mockServiceCategories } from '../../data/mockData';
import { getBySlug as getServiceBySlug } from '../../../services/servicesService';
import { useState, useEffect } from 'react';

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();
  const alternateLanguage = getAlternateLanguage(language);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      try {
        const data = await getServiceBySlug(slug);
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          {language === 'es' ? 'Servicio no encontrado' : 'Service not found'}
        </h1>
      </div>
    );
  }

  const category = null; // mockServiceCategories.find(cat => cat.id === service.categoryId);

  const breadcrumbItems = [
    { 
      label: t('services', language),
      href: `/${language}/${language === 'es' ? 'servicios' : 'services'}/`
    },
    { label: service.title }
  ];

  return (
    <>
      <SEOHead
        title={service.seo_title}
        description={service.seo_description}
        canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${slug}`}
        alternateES={`/es/servicios/${service.slug}`}
        alternateEN={`/en/services/${service.slug}`}
        ogImage={service.cover_image}
        language={language}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          {service.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {service.excerpt}
        </p>

        {service.cover_image && (
          <img 
            src={service.cover_image} 
            alt={service.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ 
            __html: service.content 
          }} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              {language === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'es' 
                ? 'Contáctanos para discutir cómo podemos ayudarte con este servicio'
                : 'Contact us to discuss how we can help you with this service'
              }
            </p>
            <a
              href={`/${language}/${language === 'es' ? 'contacto' : 'contact'}/`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t('contact', language)}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}