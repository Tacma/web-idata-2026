import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Container } from '../../shared/components/Container';
import { Section } from '../../shared/components/Section';
import { getHomeSections } from '../../../services/homeSectionsService';
import { getByRoute as getPageByRoute } from '../../../services/pagesService';
import { HomeSectionRenderer } from '../components/HomeSections';
import { NotFoundPage } from './NotFoundPage';

export function DynamicSitePage() {
  const location = useLocation();
  const { language, getLocalizedValue } = useLanguage();
  const [page, setPage] = useState<any | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const currentPage = await getPageByRoute(language, location.pathname);
        if (!cancelled) {
          setPage(currentPage);
          if (currentPage?.slug) {
            const pageSections = await getHomeSections(language, currentPage.slug);
            if (!cancelled) {
              setSections(pageSections.filter((section) => section.isEnabled));
            }
          } else {
            setSections([]);
          }
        }
      } catch (error) {
        console.error('Error loading dynamic page:', error);
        if (!cancelled) {
          setPage(null);
          setSections([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language, location.pathname]);

  if (loading) return null;

  if (!page || !page.is_visible || page.status !== 'published') {
    return <NotFoundPage />;
  }

  const title = getLocalizedValue(page.title_es, page.title_en) || page.page_name;
  const description = getLocalizedValue(page.description_es, page.description_en);

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={location.pathname}
        alternateES={page.route_es}
        alternateEN={page.route_en}
        language={language}
      />

      {sections.length > 0 ? (
        <div className="min-h-screen">
          {sections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section) => (
              <HomeSectionRenderer
                key={section.id}
                section={section}
                language={language}
                getLocalizedValue={getLocalizedValue}
              />
            ))}
        </div>
      ) : (
        <Section background="white" padding="xl">
          <Container>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10">
              <h1 className="text-4xl font-light text-gray-900">{page.page_name}</h1>
              {description && <p className="mt-4 max-w-2xl text-lg text-gray-600">{description}</p>}
              <p className="mt-6 text-sm text-gray-500">
                Esta página existe en el CMS, pero todavía no tiene secciones publicadas.
              </p>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
