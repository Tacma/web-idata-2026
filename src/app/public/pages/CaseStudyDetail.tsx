import { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { CTABandSection } from '../components/sections/CTABandSection';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { CaseStudyCard } from '../components/case-studies/CaseStudyCard';
import { getBySlug, getPublished as getPublishedCaseStudies } from '../../../services/caseStudiesService';
import { getPublished as getPublishedIndustries } from '../../../services/industriesService';
import { getPublished as getPublishedServices } from '../../../services/servicesService';
import { buildPublicCaseStudyView } from '../../shared/utils/caseStudyPublic';

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();
  const [caseStudy, setCaseStudy] = useState<any | null>(null);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) return;

      try {
        setLoading(true);
        const [caseStudyData, caseStudiesData, industriesData, servicesData] = await Promise.all([
          getBySlug(slug, language),
          getPublishedCaseStudies(language),
          getPublishedIndustries(),
          getPublishedServices(language),
        ]);

        if (cancelled) return;

        setCaseStudy(caseStudyData);
        setCaseStudies(caseStudiesData);
        setIndustries(industriesData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading case study detail:', error);
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
  }, [slug, language]);

  const basePath = language === 'es' ? '/es/casos' : '/en/case-studies';

  const industry = useMemo(
    () => industries.find((item: any) => item.id === caseStudy?.industryId),
    [industries, caseStudy]
  );

  const servicesById = useMemo(
    () => new Map(services.map((service: any) => [service.id, service])),
    [services]
  );

  const appliedServices = useMemo(
    () => services.filter((service: any) => (caseStudy?.serviceIds || []).includes(service.id)),
    [services, caseStudy]
  );

  const publicCase = useMemo(() => {
    if (!caseStudy) return null;

    return buildPublicCaseStudyView(caseStudy, language, {
      industryName: industry ? getLocalizedValue(industry.title_es, industry.title_en) : '',
      serviceTitles: appliedServices.map((service: any) => getLocalizedValue(service.title_es, service.title_en)).filter(Boolean),
    });
  }, [appliedServices, caseStudy, getLocalizedValue, industry, language]);

  const relatedCases = useMemo(() => {
    const currentTags = Array.isArray(caseStudy?.technology_tags) ? caseStudy.technology_tags : [];

    return caseStudies
      .filter((item: any) => item.id !== caseStudy?.id)
      .map((item: any) => {
        const itemTags = Array.isArray(item.technology_tags) ? item.technology_tags : [];
        const sharedTagScore = itemTags.reduce(
          (total: number, tag: string) => (currentTags.includes(tag) ? total + 1 : total),
          0
        );
        const score = (item.industryId === caseStudy?.industryId ? 4 : 0) + sharedTagScore;

        return { ...item, _score: score };
      })
      .sort((a: any, b: any) => {
        if (b._score !== a._score) return b._score - a._score;
        return (a.order || 0) - (b.order || 0);
      })
      .slice(0, 3);
  }, [caseStudies, caseStudy]);

  if (!loading && !caseStudy) {
    return <Navigate to={`${basePath}/`} replace />;
  }

  const currentSlug = getLocalizedValue(caseStudy?.slug_es || '', caseStudy?.slug_en || '');
  const seo = language === 'es' ? caseStudy?.seo_es : caseStudy?.seo_en;
  const ctaSection = {
    title: language === 'es'
      ? '¿Quieres construir un caso similar para tu organización?'
      : 'Want to build a similar outcome for your organization?',
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: `/${language}/${language === 'es' ? 'contacto' : 'contact'}`,
  };

  const industryName = industry ? getLocalizedValue(industry.title_es, industry.title_en) : '';

  return (
    <>
      <SEOHead
        title={seo?.metaTitle || publicCase?.title || ''}
        description={seo?.metaDescription || publicCase?.summary || ''}
        canonical={`${basePath}/${currentSlug}`}
        ogImage={publicCase?.coverImage || undefined}
        alternateES={`/es/casos/${caseStudy?.slug_es || slug}`}
        alternateEN={`/en/case-studies/${caseStudy?.slug_en || slug}`}
        language={language}
      />

      <section className="mt-20 px-6 pb-8 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[34px] border border-[var(--line-soft)] bg-slate-950 shadow-[0_24px_80px_rgba(8,15,30,0.28)]">
            {publicCase?.coverImage ? (
              <ImageWithFallback
                src={publicCase.coverImage}
                alt={publicCase.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,22,0.2),rgba(7,12,22,0.62)_48%,rgba(7,12,22,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,135,223,0.2),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,43,122,0.16),transparent_24%)]" />

            <div className="relative z-10 px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {publicCase?.industry ? (
                      <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/88 backdrop-blur-md">
                        {publicCase.industry}
                      </span>
                    ) : null}
                    {publicCase?.region ? (
                      <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/88 backdrop-blur-md">
                        {publicCase.region}
                      </span>
                    ) : null}
                    {publicCase?.solutionType ? (
                      <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/88 backdrop-blur-md">
                        {publicCase.solutionType}
                      </span>
                    ) : null}
                  </div>

                  <h1 className="mt-5 text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.92] tracking-[-0.06em] text-white">
                    {publicCase?.title}
                  </h1>
                  {publicCase?.subtitle ? (
                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/82 md:text-lg">
                      {publicCase.subtitle}
                    </p>
                  ) : null}
                </div>

                {publicCase?.clientLogoUrl ? (
                  <div className="inline-flex items-center justify-center rounded-[24px] border border-white/14 bg-white/88 px-5 py-4 shadow-[0_18px_42px_rgba(8,15,30,0.22)] backdrop-blur-md">
                    <ImageWithFallback
                      src={publicCase.clientLogoUrl}
                      alt={`${publicCase.clientName} logo`}
                      className="h-12 w-auto object-contain md:h-16"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[1400px] space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] p-6 shadow-[0_20px_48px_rgba(8,15,30,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">
                {language === 'es' ? 'Contexto' : 'Context'}
              </p>
              <h2 className="mt-4 text-[2rem] font-light leading-[1] tracking-[-0.04em] text-[var(--text-strong)]">
                {language === 'es' ? 'El reto' : 'The challenge'}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-soft)]">
                {publicCase?.challenge || publicCase?.summary}
              </p>

              {publicCase?.businessPains?.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {publicCase.businessPains.map((pain) => (
                    <span key={pain} className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-1.5 text-sm text-[var(--text-soft)]">
                      {pain}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] p-6 shadow-[0_20px_48px_rgba(8,15,30,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                {language === 'es' ? 'Objetivo' : 'Objective'}
              </p>
              <h2 className="mt-4 text-[2rem] font-light leading-[1] tracking-[-0.04em] text-[var(--text-strong)]">
                {language === 'es' ? 'Lo que se buscaba lograr' : 'What the client wanted to achieve'}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-soft)]">
                {publicCase?.objective || publicCase?.summary}
              </p>
            </motion.div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] p-6 shadow-[0_20px_48px_rgba(8,15,30,0.08)]"
          >
            <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-600 dark:text-fuchsia-300">
                  {language === 'es' ? 'Solución' : 'Solution'}
                </p>
                <h2 className="mt-4 text-[2rem] font-light leading-[1] tracking-[-0.04em] text-[var(--text-strong)]">
                  {language === 'es' ? 'Cómo se estructuró la respuesta' : 'How the response was structured'}
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--text-soft)]">
                  {publicCase?.solutionDescription || publicCase?.summary}
                </p>

                {publicCase?.technologies?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {publicCase.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-1.5 text-sm text-[var(--text-soft)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {(publicCase?.capabilities || []).slice(0, 6).map((item) => (
                  <div key={item} className="rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-1)] px-4 py-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4387DF]" />
                      <p className="text-sm leading-6 text-[var(--text-strong)]">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {publicCase?.galleryImages?.length ? (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] p-6 shadow-[0_20px_48px_rgba(8,15,30,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">
                {language === 'es' ? 'Visuales del proyecto' : 'Project visuals'}
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {publicCase.galleryImages.slice(0, 6).map((image) => (
                  <div key={image} className="overflow-hidden rounded-[24px] border border-[var(--line-soft)] bg-[var(--surface-1)]">
                    <ImageWithFallback src={image} alt={publicCase.title} className="h-56 w-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.section>
          ) : null}

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] p-6 shadow-[0_20px_48px_rgba(8,15,30,0.08)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">
              {language === 'es' ? 'Impacto y resultados' : 'Impact and outcomes'}
            </p>
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[24px] border border-[var(--line-soft)] bg-[var(--surface-1)] p-5">
                <h3 className="text-xl font-medium text-[var(--text-strong)]">
                  {language === 'es' ? 'Impacto cuantitativo' : 'Quantitative impact'}
                </h3>
                <div className="mt-4 space-y-3">
                  {(publicCase?.quantitativeImpacts || []).slice(0, 6).map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-[var(--text-soft)]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {!publicCase?.quantitativeImpacts?.length ? (
                    <p className="text-sm leading-6 text-[var(--text-soft)]">
                      {language === 'es' ? 'No hay métricas cuantitativas publicadas para este caso.' : 'There are no published quantitative metrics for this case.'}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--line-soft)] bg-[var(--surface-1)] p-5">
                <h3 className="text-xl font-medium text-[var(--text-strong)]">
                  {language === 'es' ? 'Impacto cualitativo' : 'Qualitative impact'}
                </h3>
                <div className="mt-4 space-y-3">
                  {(publicCase?.qualitativeImpacts || []).slice(0, 6).map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-[var(--text-soft)]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4387DF]" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {!publicCase?.qualitativeImpacts?.length ? (
                    <p className="text-sm leading-6 text-[var(--text-soft)]">
                      {language === 'es' ? 'No hay impactos cualitativos adicionales publicados para este caso.' : 'There are no additional published qualitative outcomes for this case.'}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {publicCase?.metricsText ? (
              <div className="mt-5 rounded-[24px] border border-[var(--line-soft)] bg-[var(--surface-1)] px-5 py-4">
                <p className="text-sm leading-7 text-[var(--text-soft)]">{publicCase.metricsText}</p>
              </div>
            ) : null}
          </motion.section>

          {publicCase?.showTestimonial ? (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] p-6 shadow-[0_20px_48px_rgba(8,15,30,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                {language === 'es' ? 'Testimonio' : 'Testimonial'}
              </p>
              <p className="mt-5 text-[1.2rem] font-light leading-8 text-[var(--text-strong)]">
                “{publicCase.testimonial}”
              </p>
            </motion.section>
          ) : null}

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] p-6 shadow-[0_20px_48px_rgba(8,15,30,0.08)]"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">
                  {language === 'es' ? 'Cierre' : 'Closing'}
                </p>
                <h2 className="mt-4 text-[2rem] font-light leading-[1] tracking-[-0.04em] text-[var(--text-strong)]">
                  {language === 'es' ? 'El valor que quedó instalado' : 'The value that was put in place'}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-soft)]">
                  {publicCase?.additionalOpportunities || publicCase?.summary}
                </p>
              </div>

              <Link
                to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}?source_type=case_study&source_title=${encodeURIComponent(publicCase?.title || '')}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text-strong)] px-6 py-3 text-sm font-medium text-[var(--surface-0)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                {language === 'es' ? 'Hablar sobre un caso similar' : 'Talk about a similar case'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.section>
        </div>
      </section>

      {relatedCases.length > 0 && (
        <section className="bg-[var(--surface-1)] py-16 md:py-20">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <motion.div
              className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-light text-[var(--text-strong)] md:text-4xl">
                {language === 'es' ? 'Casos relacionados' : 'Related case studies'}
              </h2>

              <Link
                to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}`}
                className="inline-flex items-center gap-2 text-[#4387DF] transition-all duration-300 hover:gap-3"
              >
                {language === 'es' ? 'Ver todos los casos' : 'View all cases'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {relatedCases.map((relatedCase: any, index: number) => {
                const relatedIndustry = industries.find((item: any) => item.id === relatedCase.industryId);
                const relatedServiceTitles = (Array.isArray(relatedCase.serviceIds) ? relatedCase.serviceIds : [])
                  .map((id: string) => servicesById.get(id))
                  .filter(Boolean)
                  .map((service: any) => getLocalizedValue(service.title_es, service.title_en));
                const relatedPublic = buildPublicCaseStudyView(relatedCase, language, {
                  industryName: relatedIndustry ? getLocalizedValue(relatedIndustry.title_es, relatedIndustry.title_en) : '',
                  serviceTitles: relatedServiceTitles,
                });

                return (
                  <motion.div
                    key={relatedCase.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CaseStudyCard
                      href={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/${getLocalizedValue(relatedCase.slug_es, relatedCase.slug_en)}`}
                      language={language}
                      title={relatedPublic.title}
                      summary={relatedPublic.summary}
                      industry={relatedPublic.industry}
                      region={relatedPublic.region}
                      solutionType={relatedPublic.solutionType}
                      results={[...relatedPublic.quantitativeImpacts.slice(0, 2), ...relatedPublic.qualitativeImpacts.slice(0, 1)]}
                      technologyTags={relatedPublic.technologies}
                      logoSrc={relatedPublic.clientLogoUrl}
                      coverImage={relatedPublic.coverImage}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTABandSection section={ctaSection} />
    </>
  );
}
