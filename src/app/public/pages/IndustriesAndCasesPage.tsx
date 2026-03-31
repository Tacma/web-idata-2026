import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { CTABandSection } from '../components/sections/CTABandSection';
import { getPublished as getPublishedIndustries } from '../../../services/industriesService';
import { getPublished as getPublishedCaseStudies } from '../../../services/caseStudiesService';
import { getPublished as getPublishedPartners } from '../../../services/partnersService';
import {
  buildIndustryCaseHubData,
  filterIndustryCaseHubData,
} from '../../shared/utils/industryCaseHub';
import { IndustryHubFilters } from '../components/industry-hub/IndustryHubFilters';
import { IndustryHubSection } from '../components/industry-hub/IndustryHubSection';
import { CaseHighlightsSection } from '../components/sections/CaseHighlightsSection';

function toggleArrayValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function IndustriesAndCasesPage() {
  const location = useLocation();
  const { language, getLocalizedValue } = useLanguage();
  const [industries, setIndustries] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [selectedIndustryIds, setSelectedIndustryIds] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [selectedPartnerIds, setSelectedPartnerIds] = useState<string[]>([]);
  const [selectedCaseType, setSelectedCaseType] = useState<'all' | 'real' | 'placeholder'>('all');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [industryRows, caseRows, partnerRows] = await Promise.all([
          getPublishedIndustries(),
          getPublishedCaseStudies(language),
          getPublishedPartners(),
        ]);

        if (cancelled) return;
        setIndustries(industryRows || []);
        setCaseStudies(caseRows || []);
        setPartners(partnerRows || []);
      } catch (error) {
        console.error('Error loading industries and cases hub:', error);
        if (!cancelled) {
          setIndustries([]);
          setCaseStudies([]);
          setPartners([]);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [language]);

  const hubData = useMemo(
    () => buildIndustryCaseHubData(industries, caseStudies, language, partners),
    [industries, caseStudies, language, partners]
  );

  const filteredIndustries = useMemo(
    () => filterIndustryCaseHubData(hubData.industries, selectedIndustryIds, selectedTagIds, selectedPartnerIds, selectedCaseType),
    [hubData.industries, selectedIndustryIds, selectedTagIds, selectedPartnerIds, selectedCaseType]
  );

  const isCasesEntry = location.pathname.includes(language === 'es' ? '/casos' : '/case-studies');
  const title = language === 'es'
    ? 'Industrias y casos de éxito en Data & AI - iData'
    : 'Industries and Data & AI success stories - iData';
  const description = language === 'es'
    ? 'Explora las industrias donde iData trabaja, filtra por soluciones y descubre casos reales y oportunidades aplicables a tu sector.'
    : 'Explore the industries where iData works, filter by solutions and discover real cases and applicable opportunities for your sector.';

  const ctaSection = {
    title: language === 'es'
      ? '¿Quieres ver cómo se vería esto aplicado a tu industria?'
      : 'Want to see how this could look in your industry?',
    subtitle: language === 'es'
      ? 'Conversemos sobre los retos, tecnologías y resultados que más importan a tu equipo.'
      : 'Let’s talk about the challenges, technologies and outcomes that matter most to your team.',
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}`,
  };

  const caseStatsSection = {
    id: `case-stats-${language}`,
    language,
    type: 'caseHighlights' as const,
    isEnabled: true,
    order: 0,
    title: language === 'es' ? 'Lectura agregada de casos reales' : 'Aggregated view of real case studies',
    subtitle: language === 'es'
      ? 'Resumimos señales repetidas de los casos publicados para mostrar el impacto que ya se está logrando.'
      : 'We summarize recurring signals from published case studies to show the impact already being delivered.',
    ctaLabel: '',
    ctaHref: '',
    referencedIds: [],
    createdAt: '',
    updatedAt: '',
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={location.pathname}
        alternateES="/es/casos-de-exito/"
        alternateEN="/en/case-studies/"
        language={language}
      />

      <div className="pt-6 md:pt-8">
        <CaseHighlightsSection
          section={caseStatsSection}
          language={language}
          getLocalizedValue={getLocalizedValue}
        />
      </div>

      <div id="industry-discovery" className="pb-20">
        <section className="px-6 pt-6 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1440px] gap-8 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start">
            <aside className="xl:sticky xl:top-24">
              <IndustryHubFilters
                language={language}
                industries={hubData.industries.map((industry) => ({ id: industry.id, name: industry.name }))}
                tags={hubData.tags}
                partners={hubData.partners}
                selectedIndustryIds={selectedIndustryIds}
                selectedTagIds={selectedTagIds}
                selectedPartnerIds={selectedPartnerIds}
                selectedCaseType={selectedCaseType}
                onToggleIndustry={(id) => setSelectedIndustryIds((current) => toggleArrayValue(current, id))}
                onToggleTag={(id) => setSelectedTagIds((current) => toggleArrayValue(current, id))}
                onTogglePartner={(id) => setSelectedPartnerIds((current) => toggleArrayValue(current, id))}
                onClearIndustries={() => setSelectedIndustryIds([])}
                onClearTags={() => setSelectedTagIds([])}
                onClearPartners={() => setSelectedPartnerIds([])}
                onChangeCaseType={setSelectedCaseType}
                onReset={() => {
                  setSelectedIndustryIds([]);
                  setSelectedTagIds([]);
                  setSelectedPartnerIds([]);
                  setSelectedCaseType('all');
                }}
              />
            </aside>

            <div className="space-y-7">
              {filteredIndustries.length === 0 ? (
                <div className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] px-6 py-10 text-center shadow-[0_20px_48px_rgba(8,15,30,0.08)]">
                  <p className="text-xl font-medium text-[var(--text-strong)]">
                    {language === 'es' ? 'No encontramos coincidencias con esos filtros.' : 'No matches found for those filters.'}
                  </p>
                  <p className="mt-3 text-sm text-[var(--text-soft)]">
                    {language === 'es'
                      ? 'Prueba quitando algunos filtros para volver a ver la experiencia completa.'
                      : 'Try removing some filters to see the full experience again.'}
                  </p>
                </div>
              ) : (
                filteredIndustries.map((industry) => (
                  <IndustryHubSection key={industry.id} industry={industry} language={language} />
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      <CTABandSection section={ctaSection} />
    </>
  );
}
