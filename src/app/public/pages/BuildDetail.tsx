import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Layers3, Rocket, Target, Wrench } from 'lucide-react';
import { SEOHead } from '../../shared/components/SEOHead';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { buildContactLink } from '../../shared/utils/contactLinks';
import { ArticleContentRenderer } from '../components/insights/ArticleContentRenderer';
import { getInsightLabBySlug, getInsightLabs } from '../../../services/insightMomentumService';

export function BuildDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [build, setBuild] = useState<any | null>(null);
  const [relatedBuilds, setRelatedBuilds] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) {
        if (!cancelled) {
          setBuild(null);
          setRelatedBuilds([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);

      try {
        const [currentBuild, builds] = await Promise.all([
          getInsightLabBySlug(language, slug),
          getInsightLabs(language),
        ]);

        if (!cancelled) {
          setBuild(currentBuild);
          setRelatedBuilds(builds.filter((item) => item.slug !== slug).slice(0, 3));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading build detail:', error);
        if (!cancelled) {
          setBuild(null);
          setRelatedBuilds([]);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language, slug]);

  if (!loading && !build) {
    return <Navigate to={`/${language}/insights/`} replace />;
  }

  if (loading || !build) return null;

  const contactHref = buildContactLink({
    language,
    sourceType: 'insight_build',
    sourceSlug: build.slug,
    sourceTitle: build.title,
    sourceCtaLabel: language === 'es' ? 'Ir a contacto' : 'Go to contact',
    intent: 'build_similar_product',
    projectType: 'data-strategy',
    referrerPath: `/${language}/insights/builds/${build.slug}/`,
  });

  return (
    <>
      <SEOHead
        title={`${build.seoTitle || build.title} - iData`}
        description={build.seoDescription || build.description}
        canonical={`/${language}/insights/builds/${build.slug}/`}
        alternateES={`/es/insights/builds/${build.slug}/`}
        alternateEN={`/en/insights/builds/${build.slug}/`}
        language={language}
      />

      <section className={`pb-16 pt-28 md:pt-32 ${isDark ? 'bg-[linear-gradient(180deg,#07101d_0%,#0b1527_100%)]' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <Link
              to={`/${language}/insights/#${language === 'es' ? 'desarrollos' : 'builds'}`}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${isDark ? 'border-white/12 bg-white/6 text-slate-200 hover:border-white/20 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'}`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{language === 'es' ? 'Volver al radar' : 'Back to radar'}</span>
            </Link>
          </div>

          <article className={`rounded-[32px] border p-6 md:p-8 ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(10,20,38,0.96),rgba(13,24,43,0.94))] shadow-[0_24px_60px_rgba(2,6,23,0.32)]' : 'border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-[132px_1fr] xl:grid-cols-[148px_1fr] gap-8 lg:gap-12">
              <aside className="hidden lg:block">
                <div className="sticky top-32 space-y-3">
                  <div className={`rounded-[24px] border p-4 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-slate-50/80'}`}>
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-fuchsia-300' : 'text-fuchsia-600'}`}>
                      {build.label}
                    </p>
                    <p className={`mt-3 text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                      {build.meta}
                    </p>
                  </div>
                </div>
              </aside>

              <div className="max-w-[920px]">
                <header className="mb-10 lg:mb-12">
                  <div className={`inline-flex rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-200' : 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700'}`}>
                    {build.label}
                  </div>

                  <p className={`mt-5 text-sm font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                    {build.meta}
                  </p>

                  <h1 className={`mt-4 text-4xl md:text-5xl lg:text-6xl font-light leading-[1.02] tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {build.title}
                  </h1>

                  <p className={`mt-6 max-w-4xl text-xl md:text-2xl font-light leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                    {build.description}
                  </p>
                </header>

                <div className="grid gap-4 md:grid-cols-3 mb-10">
                  <div className={`rounded-[24px] border p-5 ${isDark ? 'border-sky-300/16 bg-[#0f1a2d]/88' : 'border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]'}`}>
                    <div className="flex items-center gap-3">
                      <Target className={`h-5 w-5 ${isDark ? 'text-sky-300' : 'text-sky-600'}`} />
                      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                        {language === 'es' ? 'Qué problema resuelve' : 'What problem it addresses'}
                      </p>
                    </div>
                    <p className={`mt-4 text-sm leading-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{build.problem}</p>
                  </div>

                  <div className={`rounded-[24px] border p-5 ${isDark ? 'border-fuchsia-300/16 bg-[#171428]/88' : 'border-fuchsia-100 bg-[linear-gradient(180deg,#ffffff_0%,#fff8fd_100%)]'}`}>
                    <div className="flex items-center gap-3">
                      <Layers3 className={`h-5 w-5 ${isDark ? 'text-fuchsia-300' : 'text-fuchsia-600'}`} />
                      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                        {language === 'es' ? 'Para quién está pensado' : 'Who it is for'}
                      </p>
                    </div>
                    <p className={`mt-4 text-sm leading-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{build.audience.join(' · ')}</p>
                  </div>

                  <div className={`rounded-[24px] border p-5 ${isDark ? 'border-emerald-300/16 bg-[#102018]/88' : 'border-emerald-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fffb_100%)]'}`}>
                    <div className="flex items-center gap-3">
                      <Rocket className={`h-5 w-5 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`} />
                      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                        {language === 'es' ? 'Estado actual' : 'Current stage'}
                      </p>
                    </div>
                    <p className={`mt-4 text-sm leading-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{build.overview}</p>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 mb-10">
                  <section className={`rounded-[24px] border p-5 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-slate-50/70'}`}>
                    <div className="flex items-center gap-3">
                      <Wrench className={`h-5 w-5 ${isDark ? 'text-sky-300' : 'text-sky-600'}`} />
                      <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {language === 'es' ? 'Qué incluye hoy' : 'What it includes today'}
                      </h2>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {build.includes.map((item: string) => (
                        <li key={item} className={`flex gap-3 text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className={`rounded-[24px] border p-5 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-slate-50/70'}`}>
                    <div className="flex items-center gap-3">
                      <Rocket className={`h-5 w-5 ${isDark ? 'text-fuchsia-300' : 'text-fuchsia-600'}`} />
                      <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {language === 'es' ? 'Señales de avance' : 'Progress signals'}
                      </h2>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {build.signals.map((item: string) => (
                        <li key={item} className={`flex gap-3 text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fuchsia-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {Array.isArray(build.contentBlocks) && build.contentBlocks.length > 0 ? (
                  <div className="article-content">
                    <ArticleContentRenderer blocks={build.contentBlocks} />
                  </div>
                ) : null}

                <section className={`mt-12 rounded-[28px] border p-6 ${isDark ? 'border-sky-300/16 bg-[linear-gradient(135deg,rgba(8,18,34,0.98),rgba(11,32,52,0.92))]' : 'border-sky-100 bg-[linear-gradient(135deg,#f7fbff,#ffffff)]'}`}>
                  <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                    {language === 'es' ? 'Llevémoslo a tu contexto' : 'Bring it to your context'}
                  </p>
                  <h2 className={`mt-3 text-2xl font-medium tracking-[-0.03em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {language === 'es' ? 'Quiero desarrollar un producto como estos' : 'I want to build a product like these'}
                  </h2>
                  <p className={`mt-3 max-w-3xl text-sm leading-7 ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                    {language === 'es'
                      ? 'Si estás buscando acelerar discovery, empaquetar una capacidad o convertir un reto operativo en un producto más repetible, conversemos.'
                      : 'If you are looking to accelerate discovery, package a capability, or turn an operational challenge into a more repeatable product, let’s talk.'}
                  </p>
                  <Link
                    to={contactHref}
                    className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${isDark ? 'bg-white text-slate-950 shadow-[0_18px_40px_rgba(2,6,23,0.28)]' : 'bg-slate-950 text-white shadow-[0_18px_40px_rgba(2,6,23,0.18)]'}`}
                  >
                    <span>{language === 'es' ? 'Ir a contacto' : 'Go to contact'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </section>
              </div>
            </div>
          </article>

          {relatedBuilds.length > 0 && (
            <section className={`mt-8 rounded-[32px] border p-6 md:p-8 ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(10,20,38,0.96),rgba(12,22,40,0.94))] shadow-[0_24px_60px_rgba(2,6,23,0.32)]' : 'border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]'}`}>
              <div className="mb-5">
                <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                  {language === 'es' ? 'Otros desarrollos' : 'Other builds'}
                </p>
                <h2 className={`mt-2 text-2xl font-medium tracking-[-0.03em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {language === 'es' ? 'Otros productos que te podrían interesar' : 'Other products you may be interested in'}
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {relatedBuilds.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`relative overflow-hidden rounded-[24px] border p-5 transition hover:-translate-y-0.5 ${
                      isDark
                        ? index % 2 === 0
                          ? 'border-fuchsia-300/16 bg-[linear-gradient(180deg,rgba(17,16,34,0.98)_0%,rgba(36,18,48,0.94)_100%)]'
                          : 'border-sky-300/16 bg-[linear-gradient(180deg,rgba(8,18,34,0.98)_0%,rgba(10,28,44,0.94)_100%)]'
                        : index % 2 === 0
                          ? 'border-fuchsia-100 bg-[linear-gradient(180deg,#ffffff_0%,#fff8fc_100%)]'
                          : 'border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]'
                    }`}
                  >
                    <div className={`absolute inset-y-0 left-0 w-1.5 ${index % 2 === 0 ? 'bg-fuchsia-300' : 'bg-sky-300'}`} />
                    <div className="pl-2">
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${index % 2 === 0 ? isDark ? 'text-fuchsia-300' : 'text-fuchsia-600' : isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                        {item.label}
                      </p>
                      <p className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.meta}
                      </p>
                      <h3 className={`mt-4 text-xl font-medium leading-[1.08] tracking-[-0.04em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {item.title}
                      </h3>
                      <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
                      <span className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold ${isDark ? 'border-white/12 bg-white/6 text-white' : 'border-slate-200 bg-white text-slate-950'}`}>
                        <span>{language === 'es' ? 'Ver detalle' : 'View detail'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
