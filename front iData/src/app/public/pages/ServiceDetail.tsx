import { useParams } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { t, getAlternateLanguage } from '../../shared/utils/i18n';
import { mockServices, mockServiceCategories } from '../../data/mockData';

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();
  const alternateLanguage = getAlternateLanguage(language);

  const service = mockServices.find(s => 
    language === 'es' ? s.slug_es === slug : s.slug_en === slug
  );

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          {language === 'es' ? 'Servicio no encontrado' : 'Service not found'}
        </h1>
      </div>
    );
  }

  const category = mockServiceCategories.find(cat => cat.id === service.categoryId);

  const breadcrumbItems = [
    { 
      label: t('services', language),
      href: `/${language}/${language === 'es' ? 'servicios' : 'services'}/`
    },
    { label: getLocalizedValue(service.title_es, service.title_en) }
  ];

  return (
    <>
      <SEOHead
        title={getLocalizedValue(service.seo_es.metaTitle, service.seo_en.metaTitle)}
        description={getLocalizedValue(service.seo_es.metaDescription, service.seo_en.metaDescription)}
        canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${slug}`}
        alternateES={`/es/servicios/${service.slug_es}`}
        alternateEN={`/en/services/${service.slug_en}`}
        ogImage={service.featuredImage}
        language={language}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        {category && (
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {getLocalizedValue(category.title_es, category.title_en)}
            </span>
          </div>
        )}

        <h1 className="text-4xl font-light text-gray-900 mb-4">
          {getLocalizedValue(service.title_es, service.title_en)}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {getLocalizedValue(service.excerpt_es, service.excerpt_en)}
        </p>

        {service.featuredImage && (
          <img 
            src={service.featuredImage} 
            alt={getLocalizedValue(service.title_es, service.title_en)}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ 
            __html: getLocalizedValue(service.content_es, service.content_en) 
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