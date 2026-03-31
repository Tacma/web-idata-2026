import { useParams, useLocation, Navigate } from 'react-router';
import { SEO, buildCanonicalUrl, buildAlternateUrl, getAlternateLanguage } from '../../utils/seo';
import { getLanguageFromPath, t } from '../../utils/i18n';
import { Breadcrumb } from '../../components/public/Breadcrumb';
import { getBySlug } from '../../services/servicesService';
import { useState, useEffect } from 'react';

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      if (!slug) return;
      try {
        const data = await getBySlug(slug, language);
        setService(data);
      } catch (error) {
        console.error('Error loading service:', error);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [slug, language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return <Navigate to={`/${language}/${language === 'es' ? 'servicios' : 'services'}/`} replace />;
  }

  const alternateLang = getAlternateLanguage(language);
  const canonicalUrl = buildCanonicalUrl(location.pathname);
  const alternateSlug = alternateLang === 'es' ? service.slug_es : service.slug_en;
  const alternateUrl = `${alternateLang === 'es' ? '/es/servicios/' : '/en/services/'}${alternateSlug}`;

  const title = language === 'es' ? service.seo_es?.metaTitle : service.seo_en?.metaTitle;
  const description = language === 'es' ? service.seo_es?.metaDescription : service.seo_en?.metaDescription;

  const breadcrumbItems = [
    { label: t('home', language), href: `/${language}/` },
    { label: t('services', language), href: `/${language}/${language === 'es' ? 'servicios' : 'services'}/` },
    { label: language === 'es' ? service.title_es : service.title_en },
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
        image={service.featuredImage}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'es' ? service.title_es : service.title_en}
            </h1>
            <p className="text-xl text-gray-600">
              {language === 'es' ? service.excerpt_es : service.excerpt_en}
            </p>
          </header>

          {service.featuredImage && (
            <div className="mb-8">
              <div className="aspect-video bg-gray-200 rounded-lg" />
            </div>
          )}

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {language === 'es' ? service.content_es : service.content_en}
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'es' 
                ? '¿Interesado en este servicio?' 
                : 'Interested in this service?'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'es'
                ? 'Contáctanos para conocer cómo podemos ayudarte'
                : 'Contact us to learn how we can help you'}
            </p>
            <a
              href={`/${language}/${language === 'es' ? 'contacto' : 'contact'}/`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('contact', language)}
            </a>
          </div>
        </article>
      </div>
    </>
  );
}
