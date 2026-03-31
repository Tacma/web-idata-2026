import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Container } from '../../shared/components/Container';
import { Section } from '../../shared/components/Section';
import { ContentCard } from '../../shared/components/ContentCard';
import { mockResources } from '../../data/mockData';
import { Download } from 'lucide-react';

export function ResourcesIndex() {
  const { language, getLocalizedValue } = useLanguage();

  const resources = mockResources
    .filter(r => r.status === 'published')
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });

  const seoTitle =
    language === 'es' ? 'Recursos - iData' : 'Resources - iData';
  const seoDescription =
    language === 'es'
      ? 'Descarga guías, eBooks, whitepapers y recursos sobre datos y analítica'
      : 'Download guides, eBooks, whitepapers, and resources about data and analytics';
  const basePath = language === 'es' ? '/es/recursos' : '/en/resources';

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`${basePath}/`}
        alternateES="/es/recursos/"
        alternateEN="/en/resources/"
        language={language}
      />

      <Section background="white" padding="xl">
        <Container>
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'es' ? 'Recursos' : 'Resources'}
            </h1>
            <p className="text-xl text-gray-600">
              {language === 'es'
                ? 'Explora nuestra biblioteca de recursos gratuitos sobre datos y analítica'
                : 'Explore our library of free resources about data and analytics'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
              <div key={resource.id} className="group">
                <ContentCard
                  title={getLocalizedValue(resource.title_es, resource.title_en)}
                  excerpt={getLocalizedValue(resource.description_es, resource.description_en)}
                  href={`${basePath}/${getLocalizedValue(resource.slug_es, resource.slug_en)}`}
                  linkLabel={language === 'es' ? 'Ver detalles' : 'View details'}
                  badge={getLocalizedValue(resource.type_es, resource.type_en)}
                  variant={resource.featured ? 'featured' : 'default'}
                />
                {resource.downloadUrl && (
                  <div className="mt-2 px-2">
                    <a
                      href={resource.downloadUrl}
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4" />
                      {language === 'es' ? 'Descargar' : 'Download'}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {resources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {language === 'es'
                  ? 'Próximamente nuevos recursos'
                  : 'New resources coming soon'}
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}