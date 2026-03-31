import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { getAlternateLanguage } from '../../shared/utils/i18n';
import { useEffect, useState } from 'react';
import { getHomeSections } from '../../../services/homeSectionsService';
import { getByKey as getPageByKey } from '../../../services/pagesService';
import { mockHomeSections } from '../../data/mockData';
import { HomeSectionRenderer } from '../components/HomeSections';
import type { HomeSection, Language } from '../../shared/types';

const allowMockFallback = import.meta.env.DEV;

function getSectionScore(section: HomeSection) {
  let score = 0;
  if (section.title) score += 2;
  if (section.subtitle) score += 2;
  if (section.ctaLabel) score += 1;
  if (section.ctaHref) score += 1;
  if (section.referencedIds?.length) score += 2;
  if (section.content && Object.keys(section.content).length > 0) score += 3;
  if (section.config && Object.keys(section.config).length > 0) score += 4;
  return score;
}

function sanitizeHomeSections(sections: HomeSection[]) {
  const filtered = sections
    .filter((section) => section.isEnabled)
    .sort((a, b) => a.order - b.order);

  const byType = new Map<string, HomeSection>();

  for (const section of filtered) {
    const existing = byType.get(section.type);
    if (!existing) {
      byType.set(section.type, section);
      continue;
    }

    const currentScore = getSectionScore(section);
    const existingScore = getSectionScore(existing);

    if (
      currentScore > existingScore ||
      (currentScore === existingScore &&
        new Date(section.updatedAt || 0).getTime() > new Date(existing.updatedAt || 0).getTime())
    ) {
      byType.set(section.type, section);
    }
  }

  let sanitized = Array.from(byType.values()).sort((a, b) => a.order - b.order);

  const hero = sanitized.find((section) => section.type === 'hero');
  if (hero) {
    sanitized = sanitized.filter((section) => section.type !== 'preHero');
    sanitized = sanitized.filter((section) => section.type !== 'strategicBannerTriple');
  }

  return sanitized;
}

export function Home() {
  const { language, getLocalizedValue } = useLanguage();
  const alternateLanguage = getAlternateLanguage(language);
  const [sectionsByLanguage, setSectionsByLanguage] = useState<Record<Language, HomeSection[]>>({
    es: [],
    en: [],
  });
  const [displayedSections, setDisplayedSections] = useState<HomeSection[]>([]);
  const [pageRecord, setPageRecord] = useState<any | null>(null);

  useEffect(() => {
    const cachedSections = sectionsByLanguage[language];
    if (cachedSections.length > 0) {
      setDisplayedSections(cachedSections);
    }
  }, [language, sectionsByLanguage]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const sectionsData = await getHomeSections(language);
        if (!cancelled && sectionsData.length > 0) {
          setSectionsByLanguage((current) => ({
            ...current,
            [language]: sectionsData,
          }));
          setDisplayedSections(sectionsData);
          return;
        }
      } catch (error) {
        console.error('Error loading home sections:', error);
      }

      if (!cancelled) {
        const fallbackSections = allowMockFallback
          ? mockHomeSections.filter((section) => section.language === language)
          : [];

        setSectionsByLanguage((current) => ({
          ...current,
          [language]: fallbackSections,
        }));

        if (fallbackSections.length > 0) {
          setDisplayedSections(fallbackSections);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language]);

  useEffect(() => {
    let cancelled = false;

    async function loadPageRecord() {
      try {
        const record = await getPageByKey('home');
        if (!cancelled) {
          setPageRecord(record);
        }
      } catch (error) {
        console.error('Error loading home page metadata:', error);
      }
    }

    loadPageRecord();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleSections = sanitizeHomeSections(displayedSections);

  return (
    <>
      <SEOHead
        title={pageRecord ? getLocalizedValue(pageRecord.title_es, pageRecord.title_en) : language === 'es' ? 'iData - Transformación Digital y Data Analytics | Consultoría Empresarial' : 'iData - Digital Transformation & Data Analytics | Enterprise Consulting'}
        description={pageRecord
          ? getLocalizedValue(pageRecord.description_es, pageRecord.description_en)
          : language === 'es'
            ? 'Impulsamos la transformación tecnológica de organizaciones líderes con soluciones end-to-end en datos, analítica avanzada e inteligencia artificial. Partner estratégico en madurez analítica.'
            : 'We drive technological transformation for leading organizations with end-to-end solutions in data, advanced analytics, and artificial intelligence. Strategic partner in analytical maturity.'
        }
        canonical={`/${language}/`}
        alternateES="/es/"
        alternateEN="/en/"
        language={language}
      />

      <div className="min-h-screen">
        {visibleSections.map((section) => (
          <HomeSectionRenderer 
            key={`${section.type}-${section.order}`}
            section={section}
            language={language}
            getLocalizedValue={getLocalizedValue}
          />
        ))}
      </div>
    </>
  );
}
