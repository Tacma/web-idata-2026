import { useLocation, Link } from 'react-router';
import { SEO, buildCanonicalUrl, buildAlternateUrl, getAlternateLanguage } from '../../utils/seo';
import { getLanguageFromPath, t, getServiceRoute } from '../../utils/i18n';
import { Breadcrumb } from '../../components/public/Breadcrumb';
import { mockCollections } from '../../data/mockData';

export function ServicesIndex() {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);
  
  const services = mockCollections.services
    .filter(s => s.status === 'published')
    .sort((a, b) => a.order - b.order);

  const categories = mockCollections.serviceCategories
    .filter(c => c.status === 'published')
    .sort((a, b) => a.order - b.order);

  const alternateLang = getAlternateLanguage(language);
  const canonicalUrl = buildCanonicalUrl(location.pathname);
  const alternateUrl = buildAlternateUrl(location.pathname, alternateLang);

  const title = language === 'es' ? 'Servicios - iData' : 'Services - iData';
  const description = language === 'es'
    ? 'Soluciones integrales de datos y analítica para tu empresa'
    : 'Comprehensive data and analytics solutions for your business';

  const breadcrumbItems = [
    { label: t('home', language), href: `/${language}/` },
    { label: t('services', language) },
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonicalUrl}
        language={language}
        alternateLanguage={alternateLang}
        alternateUrl={alternateUrl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-12">
          <h1 className="text-4xl font-light mb-4">{t('services', language)}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        {/* Service Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            {language === 'es' ? 'Categorías de Servicios' : 'Service Categories'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'es' ? category.title_es : category.title_en}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'es' ? category.description_es : category.description_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* All Services */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {language === 'es' ? 'Todos los Servicios' : 'All Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => {
              const slug = language === 'es' ? service.slug_es : service.slug_en;
              const route = getServiceRoute(slug, language);

              return (
                <Link
                  key={service.id}
                  to={route}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow block"
                >
                  {service.featured && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3">
                      {language === 'es' ? 'Destacado' : 'Featured'}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-3">
                    {language === 'es' ? service.title_es : service.title_en}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'es' ? service.excerpt_es : service.excerpt_en}
                  </p>
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    {t('learnMore', language)} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
