import { useParams, Navigate } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Container } from '../../shared/components/Container';
import { Section } from '../../shared/components/Section';
import { RichText } from '../../shared/components/RichText';
import { ContentCard } from '../../shared/components/ContentCard';
import { CTABandSection } from '../components/sections/CTABandSection';
import { getPublished as getCaseStudies } from '../../../services/caseStudiesService';
import { getBySlug as getIndustryBySlug } from '../../../services/industriesService';
import { useState, useEffect } from 'react';
import { buildContactLink } from '../../shared/utils/contactLinks';

export function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();
  const [industry, setIndustry] = useState<any | null>(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [industryData, caseStudiesData] = await Promise.all([
          getIndustryBySlug(slug || '', language),
          getCaseStudies(),
        ]);
        setIndustry(industryData);
        setCaseStudies(caseStudiesData);
      } catch (error) {
        console.error('Error fetching industry detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, language]);

  if (!loading && !industry) {
    return <Navigate to={`/${language}/${language === 'es' ? 'casos-de-exito' : 'case-studies'}/`} replace />;
  }

  if (!industry) return null;

  const title = getLocalizedValue(industry.title_es, industry.title_en);
  const content = getLocalizedValue(industry.content_es, industry.content_en);
  const seo = language === 'es' ? industry.seo_es : industry.seo_en;
  const currentSlug = getLocalizedValue(industry.slug_es, industry.slug_en);
  const basePath = language === 'es' ? '/es/casos-de-exito' : '/en/case-studies';

  // Find related case studies
  const relatedCases = caseStudies
    .filter((c: any) => c.industryId === industry.id || c.industry_id === industry.id)
    .slice(0, 3);

  // Breadcrumb data for schema
  const breadcrumbs = [
    {
      label: language === 'es' ? 'Inicio' : 'Home',
      href: `/${language}/`,
    },
    {
      label: language === 'es' ? 'Casos de éxito' : 'Case Studies',
      href: `${basePath}/`,
    },
    {
      label: title,
      href: `${basePath}/${currentSlug}`,
    },
  ];

  const ctaSection = {
    id: `industry-detail-cta-${language}-${currentSlug}`,
    language,
    type: 'ctaBand' as const,
    isEnabled: true,
    order: 0,
    title: language === 'es'
      ? '¿Listo para transformar tu negocio con datos?'
      : 'Ready to transform your business with data?',
    subtitle: language === 'es'
      ? 'Hablemos sobre cómo podemos ayudarte'
      : 'Let\'s talk about how we can help you',
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: buildContactLink({
      language,
      sourceType: 'industry',
      sourceSlug: currentSlug,
      sourceTitle: title,
      sourceCtaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
      intent: 'industry_consultation',
      referrerPath: `${basePath}/${currentSlug}`,
    }),
    referencedIds: [],
    createdAt: '',
    updatedAt: '',
  };

  return (
    <>
      <SEOHead
        title={seo?.metaTitle || title}
        description={seo?.metaDescription || getLocalizedValue(industry.excerpt_es, industry.excerpt_en)}
        canonical={`${basePath}/${currentSlug}`}
        ogImage={industry.featuredImage}
        alternateES={`/es/industrias/${industry.slug_es}`}
        alternateEN={`/en/industries/${industry.slug_en}`}
        language={language}
      />

      {/* Header */}
      <Section background="gray" padding="xl">
        <Container size="md">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-600">
              {getLocalizedValue(industry.excerpt_es, industry.excerpt_en)}
            </p>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section background="white" padding="lg">
        <Container size="md">
          <RichText content={content} />
        </Container>
      </Section>

      {/* Related Case Studies */}
      {relatedCases.length > 0 && (
        <Section background="gray" padding="lg">
          <Container>
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              {language === 'es' ? 'Casos de Éxito' : 'Success Stories'}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCases.map(caseStudy => (
                <ContentCard
                  key={caseStudy.id}
                  title={getLocalizedValue(caseStudy.title_es, caseStudy.title_en)}
                  excerpt={getLocalizedValue(caseStudy.excerpt_es, caseStudy.excerpt_en)}
                  href={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/${getLocalizedValue(caseStudy.slug_es, caseStudy.slug_en)}`}
                  linkLabel={language === 'es' ? 'Ver caso' : 'View case study'}
                  badge={caseStudy.client}
                  variant="compact"
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABandSection section={ctaSection} />
    </>
  );
}
