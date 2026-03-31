import { useLocation, Link } from 'react-router';
import { SEO, buildCanonicalUrl, buildAlternateUrl, getAlternateLanguage } from '../../utils/seo';
import { getLanguageFromPath, t, getIndustryRoute } from '../../utils/i18n';
import { Breadcrumb } from '../../components/public/Breadcrumb';
import { mockCollections } from '../../data/mockData';

export function IndustriesIndex() {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);
  
  const industries = mockCollections.industries
    .filter(i => i.status === 'published')
    .sort((a, b) => a.order - b.order);

  const alternateLang = getAlternateLanguage(language);
  const canonicalUrl = buildCanonicalUrl(location.pathname);
  const alternateUrl = buildAlternateUrl(location.pathname, alternateLang);

  const title = language === 'es' ? 'Industrias - iData' : 'Industries - iData';
  const description = language === 'es'
    ? 'Soluciones especializadas de datos para diferentes industrias'
    : 'Specialized data solutions for different industries';

  const breadcrumbItems = [
    { label: t('home', language), href: `/${language}/` },
    { label: t('industries', language) },
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
          <h1 className="text-4xl font-bold mb-4">{t('industries', language)}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map(industry => {
            const slug = language === 'es' ? industry.slug_es : industry.slug_en;
            const route = getIndustryRoute(slug, language);

            return (
              <Link
                key={industry.id}
                to={route}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {industry.featuredImage && (
                  <div className="aspect-video bg-gray-200" />
                )}
                <div className="p-6">
                  {industry.featured && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3">
                      {language === 'es' ? 'Destacado' : 'Featured'}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold mb-3">
                    {language === 'es' ? industry.title_es : industry.title_en}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {language === 'es' ? industry.excerpt_es : industry.excerpt_en}
                  </p>
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    {t('learnMore', language)} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
