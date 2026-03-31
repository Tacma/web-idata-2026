import { useParams, Navigate } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Container } from '../../shared/components/Container';
import { Section } from '../../shared/components/Section';
import { RichText } from '../../shared/components/RichText';
import { formatDate } from '../../shared/utils/dateFormat';
import { mockResources } from '../../data/mockData';
import { Calendar, Download, FileText } from 'lucide-react';

export function ResourceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();

  const resource = mockResources.find(
    r =>
      r.status === 'published' &&
      (r.slug_es === slug || r.slug_en === slug)
  );

  if (!resource) {
    const basePath = language === 'es' ? '/es/recursos' : '/en/resources';
    return <Navigate to={`${basePath}/`} replace />;
  }

  const title = getLocalizedValue(resource.title_es, resource.title_en);
  const description = getLocalizedValue(resource.description_es, resource.description_en);
  const content = getLocalizedValue(resource.content_es, resource.content_en);
  const type = getLocalizedValue(resource.type_es, resource.type_en);
  const seo = language === 'es' ? resource.seo_es : resource.seo_en;
  const currentSlug = getLocalizedValue(resource.slug_es, resource.slug_en);
  const basePath = language === 'es' ? '/es/recursos' : '/en/resources';

  const breadcrumbs = [
    {
      label: language === 'es' ? 'Inicio' : 'Home',
      href: `/${language}/`,
    },
    {
      label: language === 'es' ? 'Recursos' : 'Resources',
      href: `${basePath}/`,
    },
    {
      label: title,
      href: `${basePath}/${currentSlug}`,
    },
  ];

  return (
    <>
      <SEOHead
        title={seo.metaTitle}
        description={seo.metaDescription}
        canonical={`${basePath}/${currentSlug}`}
        ogImage={resource.featuredImage}
        alternateES={`/es/recursos/${resource.slug_es}`}
        alternateEN={`/en/resources/${resource.slug_en}`}
        language={language}
      />

      {/* Header */}
      <Section background="white" padding="xl">
        <Container size="md">
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {type}
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(resource.publishedDate, language, true)}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {description}
          </p>

          {resource.downloadUrl && (
            <a
              href={resource.downloadUrl}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-5 h-5" />
              {language === 'es' ? 'Descargar Recurso' : 'Download Resource'}
            </a>
          )}
        </Container>
      </Section>

      {/* Content Preview */}
      <Section background="gray" padding="lg">
        <Container size="md">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-start gap-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'es' ? 'Vista Previa' : 'Preview'}
              </h2>
            </div>
            <RichText content={content} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="white" padding="lg">
        <Container>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'es'
                ? '¿Necesitas ayuda implementando estas ideas?'
                : 'Need help implementing these ideas?'}
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              {language === 'es'
                ? 'Nuestro equipo de expertos puede ayudarte a llevarlas a la práctica'
                : 'Our team of experts can help you put them into practice'}
            </p>
            <a
              href={`/${language}/${language === 'es' ? 'contacto' : 'contact'}/`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {language === 'es' ? 'Contáctanos' : 'Contact us'}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}