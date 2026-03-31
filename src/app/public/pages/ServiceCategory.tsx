import { useParams } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { t, getAlternateLanguage } from '../../shared/utils/i18n';
import { mockServiceCategories, mockServices } from '../../data/mockData';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function ServiceCategory() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { language, getLocalizedValue } = useLanguage();
  const alternateLanguage = getAlternateLanguage(language);

  const category = mockServiceCategories.find(cat => cat.categorySlug === categorySlug);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          {language === 'es' ? 'Categoría no encontrada' : 'Category not found'}
        </h1>
      </div>
    );
  }

  const services = mockServices
    .filter(s => s.categoryId === category.id && s.status === 'published')
    .sort((a, b) => a.order - b.order);

  const breadcrumbItems = [
    { 
      label: t('services', language),
      href: `/${language}/${language === 'es' ? 'servicios' : 'services'}/`
    },
    { label: getLocalizedValue(category.title_es, category.title_en) }
  ];

  return (
    <>
      <SEOHead
        title={getLocalizedValue(category.seo_es.metaTitle, category.seo_en.metaTitle)}
        description={getLocalizedValue(category.seo_es.metaDescription, category.seo_en.metaDescription)}
        canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${categorySlug}/`}
        alternateES={`/es/servicios/${categorySlug}/`}
        alternateEN={`/en/services/${categorySlug}/`}
        language={language}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          {getLocalizedValue(category.title_es, category.title_en)}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {getLocalizedValue(category.description_es, category.description_en)}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
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
      </div>
    </>
  );
}