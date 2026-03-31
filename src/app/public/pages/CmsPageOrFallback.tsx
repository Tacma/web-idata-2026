import { useEffect, useState, type ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { getHomeSections } from '../../../services/homeSectionsService';
import { getByKey as getPageByKey } from '../../../services/pagesService';
import { HomeSectionRenderer } from '../components/HomeSections';

interface CmsPageOrFallbackProps {
  pageKey: string;
  fallback: ReactElement;
}

export function CmsPageOrFallback({ pageKey, fallback }: CmsPageOrFallbackProps) {
  const { language, getLocalizedValue } = useLanguage();
  const [page, setPage] = useState<any | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [pageRecord, sectionRows] = await Promise.all([
          getPageByKey(pageKey),
          getHomeSections(language, pageKey),
        ]);

        if (!cancelled) {
          setPage(pageRecord);
          setSections(sectionRows.filter((section) => section.isEnabled));
        }
      } catch (error) {
        console.error(`Error loading CMS-backed page '${pageKey}':`, error);
        if (!cancelled) {
          setPage(null);
          setSections([]);
        }
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language, pageKey]);

  if (!loaded) {
    return fallback;
  }

  if (page && (!page.is_visible || page.status !== 'published')) {
    return <Navigate to={`/${language}/`} replace />;
  }

  if (!page || sections.length === 0) {
    return fallback;
  }

  return (
    <>
      <SEOHead
        title={getLocalizedValue(page.title_es, page.title_en) || page.page_name}
        description={getLocalizedValue(page.description_es, page.description_en)}
        canonical={language === 'es' ? page.route_es : page.route_en}
        alternateES={page.route_es}
        alternateEN={page.route_en}
        language={language}
      />

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
    </>
  );
}
