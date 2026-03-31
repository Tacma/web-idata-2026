import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { ArrowRight, CalendarDays, Clock3, Sparkles } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { InsightsEditorialGrid } from '../components/insights/InsightsEditorialGrid';
import { InsightsPagination } from '../components/insights/InsightsPagination';
import { InsightsSidebar } from '../components/insights/InsightsSidebar';
import { getPublished as getPublishedInsights } from '../../../services/blogService';
import { filterVisibleInsights } from '../../../services/insightVisibility';
import { getAll as getBlogCategories } from '../../../services/blogCategoriesService';
import { mockBlogCategories, mockInsights } from '../../data/mockData';
import { buildMomentumContent } from '../../shared/data/momentumContent';

const INSIGHTS_PER_PAGE = 12;
const allowMockFallback = import.meta.env.DEV;

export function InsightsIndex() {
  const location = useLocation();
  const { language, getLocalizedValue } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(INSIGHTS_PER_PAGE);
  const [insights, setInsights] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const [insightsData, categoriesData] = await Promise.all([
          getPublishedInsights(language),
          getBlogCategories(),
        ])

        if (!cancelled) {
          setInsights(
            insightsData.length > 0
              ? insightsData
              : (allowMockFallback ? filterVisibleInsights(mockInsights) : [])
          )
          setCategories(categoriesData && categoriesData.length > 0 ? categoriesData : (allowMockFallback ? mockBlogCategories : []))
          setLoading(false)
        }
      } catch (error) {
        console.error('Error loading insights index:', error)
        if (!cancelled) {
          setInsights(allowMockFallback ? filterVisibleInsights(mockInsights) : [])
          setCategories(allowMockFallback ? mockBlogCategories : [])
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [language])

  useEffect(() => {
    if (loading || !location.hash) return;

    const hash = location.hash.slice(1);
    const timer = window.setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [loading, location.hash]);

  useEffect(() => {
    setDisplayCount(INSIGHTS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  // Filter and sort insights
  const filteredInsights = insights
    .filter(p => p.status === 'published')
    .filter(p => !selectedCategory || (p.categoryIds || []).includes(selectedCategory))
    .filter(p => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const title = getLocalizedValue(p.title_es, p.title_en).toLowerCase();
      const content = getLocalizedValue(p.excerpt_es, p.excerpt_en).toLowerCase();
      const tags = (p.tags || []).join(' ').toLowerCase();
      return title.includes(query) || content.includes(query) || tags.includes(query);
    })
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });

  const publishedCategories = categories.filter(c => c.status === 'published');
  const momentumNewsCards = useMemo(
    () =>
      insights.slice(0, 3).map((article, index) => ({
        id: article.id,
        title: getLocalizedValue(article.title_es, article.title_en),
        description: getLocalizedValue(article.excerpt_es, article.excerpt_en),
        date: article.publishedDate || article.published_date || '',
        href: `/${language}/insights/${getLocalizedValue(article.slug_es, article.slug_en)}`,
        label:
          index === 0
            ? language === 'es'
              ? 'Publicación reciente'
              : 'Recent publish'
            : language === 'es'
              ? 'Insight destacado'
              : 'Featured insight',
        image: article.featuredImage || article.featured_image || null,
      })),
    [getLocalizedValue, insights, language]
  );
  const { events, labs } = useMemo(
    () =>
      buildMomentumContent({
        language,
        articles: momentumNewsCards,
        insightsHref: `/${language}/insights`,
      }),
    [language, momentumNewsCards]
  );

  const eventCountdown = useMemo(() => {
    const nextEvent = events[0];
    if (!nextEvent?.isoDate) return null;

    const now = Date.now();
    const target = new Date(nextEvent.isoDate).getTime();
    const diff = target - now;

    if (Number.isNaN(target) || diff <= 0) {
      return language === 'es' ? 'Hoy' : 'Today';
    }

    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    if (days > 0) {
      return language === 'es'
        ? `En ${days} día${days === 1 ? '' : 's'}`
        : `In ${days} day${days === 1 ? '' : 's'}`;
    }

    return language === 'es'
      ? `En ${hours} hora${hours === 1 ? '' : 's'}`
      : `In ${hours} hour${hours === 1 ? '' : 's'}`;
  }, [events, language]);

  const eventPanels = useMemo(() => {
    const panels: Array<Array<(typeof events)[number]>> = [];
    for (let index = 0; index < events.length; index += 5) {
      panels.push(events.slice(index, index + 5));
    }
    return panels;
  }, [events]);

  const buildPanels = useMemo(() => {
    const panels: Array<Array<(typeof labs)[number]>> = [];
    for (let index = 0; index < labs.length; index += 4) {
      panels.push(labs.slice(index, index + 4));
    }
    return panels;
  }, [labs]);

  // Get non-featured insights with category info
  const regularInsights = filteredInsights
    .slice(0, displayCount)
    .map(insight => {
      const category = categories.find(c => insight.categoryIds.includes(c.id));
      return {
        ...insight,
        categoryTitle_es: category?.title_es,
        categoryTitle_en: category?.title_en,
      };
    });

  const hasMore = filteredInsights.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + INSIGHTS_PER_PAGE);
  };

  const seoTitle = language === 'es' ? 'Insights - Blog iData' : 'Insights - iData Blog';
  const seoDescription =
    language === 'es'
      ? 'Ideas, tendencias y experiencias sobre datos, analítica e inteligencia artificial'
      : 'Ideas, trends and experiences about data, analytics and artificial intelligence';

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`/${language}/insights/`}
        alternateES="/es/insights/"
        alternateEN="/en/insights/"
        language={language}
      />

      <section className="bg-gray-50 pb-12 pt-28 md:pb-16 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-6">
            <div
              id={language === 'es' ? 'eventos' : 'events'}
              className="scroll-mt-28 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-600">
                    {language === 'es' ? 'Calendario activo' : 'Live calendar'}
                  </p>
                  <h2 className="mt-1 text-xl font-medium tracking-[-0.03em] text-slate-950">
                    {language === 'es' ? 'Próximos eventos' : 'Upcoming events'}
                  </h2>
                </div>
              </div>

              <div className="overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-5 min-w-max">
                  {eventPanels.map((panel, panelIndex) => (
                    <div
                      key={`event-panel-${panelIndex}`}
                      className="grid min-w-[1220px] grid-cols-5 gap-4"
                    >
                      {panel.map((event, index) => {
                        const isLead = panelIndex === 0 && index === 0;
                        return (
                          <article
                            key={event.id}
                            id={event.id}
                            className={`relative overflow-hidden rounded-[24px] border ${
                              isLead
                                ? 'border-sky-200 bg-[linear-gradient(180deg,#eff9ff_0%,#dff2ff_100%)] shadow-[0_18px_55px_rgba(14,116,144,0.16)]'
                                : 'border-slate-200 bg-slate-50/80 shadow-[0_14px_38px_rgba(15,23,42,0.08)]'
                            }`}
                          >
                            <div className={`relative flex h-full flex-col ${isLead ? 'min-h-[320px] p-5' : 'min-h-[320px] p-4'}`}>
                              {event.image && (
                                <>
                                  <img
                                    src={event.image}
                                    alt={event.title}
                                    className={`absolute inset-0 h-full w-full object-cover ${isLead ? 'opacity-16' : 'opacity-12'}`}
                                  />
                                  <div className={`absolute inset-0 ${isLead ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(240,249,255,0.94)_100%)]' : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.52)_0%,rgba(248,250,252,0.96)_100%)]'}`} />
                                </>
                              )}

                              <div className="relative flex h-full flex-col">
                                <div className="flex items-start justify-between gap-3">
                                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${isLead ? 'border border-sky-200 bg-white/85 text-sky-700' : 'border border-slate-200 bg-white text-slate-600'}`}>
                                    {event.label}
                                  </span>
                                  {isLead && eventCountdown && (
                                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                      <Clock3 className="h-3.5 w-3.5" />
                                      {eventCountdown}
                                    </span>
                                  )}
                                </div>

                                {isLead ? (
                                  <div className="mt-5 rounded-[22px] border border-sky-100 bg-white/88 p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-600">
                                        <CalendarDays className="h-5 w-5" />
                                      </span>
                                      <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-600">
                                          {language === 'es' ? 'Alerta de agenda' : 'Calendar alert'}
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-slate-950">{event.meta}</p>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                                    {event.meta}
                                  </p>
                                )}

                                <h3 className={`mt-4 font-medium tracking-[-0.04em] text-slate-950 ${isLead ? 'text-[1.65rem] leading-[1.02]' : 'text-[1.1rem] leading-[1.06]'}`}>
                                  {event.title}
                                </h3>
                                <p className={`mt-3 text-slate-600 ${isLead ? 'text-sm leading-6' : 'text-[13px] leading-6'}`}>
                                  {event.description}
                                </p>

                                <div className="mt-auto pt-5">
                                  <a
                                    href={event.href}
                                    className={`inline-flex items-center gap-2 rounded-full ${isLead ? 'bg-slate-950 px-5 py-3 text-white hover:bg-slate-800' : 'border border-slate-200 bg-white px-4 py-2.5 text-slate-950 hover:border-slate-300'} text-sm font-semibold transition`}
                                  >
                                    <span>{language === 'es' ? 'Ver agenda' : 'View agenda'}</span>
                                    <ArrowRight className="h-4 w-4" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              id={language === 'es' ? 'desarrollos' : 'builds'}
              className="scroll-mt-28 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fuchsia-600">
                    {language === 'es' ? 'Radar de producto' : 'Product radar'}
                  </p>
                  <h2 className="mt-1 text-xl font-medium tracking-[-0.03em] text-slate-950">
                    {language === 'es' ? 'En lo que estamos trabajando' : 'What we are working on'}
                  </h2>
                </div>
              </div>

              <div className="overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-5 min-w-max">
                  {buildPanels.map((panel, panelIndex) => (
                    <div
                      key={`build-panel-${panelIndex}`}
                      className="grid min-w-[760px] grid-cols-2 gap-4"
                    >
                      {panel.map((build, index) => (
                        <article
                          key={build.id}
                          id={build.id}
                          className={`overflow-hidden rounded-[24px] border shadow-[0_18px_50px_rgba(217,70,239,0.10)] ${
                            index % 2 === 0
                              ? 'border-fuchsia-100 bg-[linear-gradient(135deg,#fff7fe_0%,#fff3fb_60%,#ffffff_100%)]'
                              : 'border-sky-100 bg-[linear-gradient(135deg,#f6fbff_0%,#eef7ff_60%,#ffffff_100%)]'
                          }`}
                        >
                          <div className="relative min-h-[260px] p-5">
                            {build.image && (
                              <img
                                src={build.image}
                                alt={build.title}
                                className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-16 mix-blend-multiply"
                              />
                            )}
                            <div className="relative flex h-full flex-col">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${
                                  index % 2 === 0
                                    ? 'border-fuchsia-200 bg-white/85 text-fuchsia-700'
                                    : 'border-sky-200 bg-white/85 text-sky-700'
                                }`}>
                                  {build.label}
                                </span>
                                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                  {build.meta}
                                </span>
                              </div>
                              <h3 className="mt-4 max-w-[18rem] text-[1.3rem] font-medium tracking-[-0.04em] text-slate-950 leading-[1.06]">
                                {build.title}
                              </h3>
                              <p className="mt-3 max-w-[19rem] text-[13px] leading-6 text-slate-600">
                                {build.description}
                              </p>
                              <div className="mt-auto pt-5">
                                <a
                                  href={build.href}
                                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:border-fuchsia-300 hover:text-fuchsia-700"
                                >
                                  <span>{language === 'es' ? 'Seguir desarrollo' : 'Follow progress'}</span>
                                  <ArrowRight className="h-4 w-4" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                {language === 'es' ? 'Noticias e insights' : 'News and insights'}
              </p>
              <h2 className="mt-2 text-[2rem] font-medium tracking-[-0.05em] text-slate-950">
                {language === 'es' ? 'Últimas publicaciones' : 'Latest stories'}
              </h2>
            </div>
            {(selectedCategory || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                  setDisplayCount(INSIGHTS_PER_PAGE);
                }}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                {language === 'es' ? 'Limpiar filtros' : 'Clear filters'}
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="lg:w-[76%]">
              <InsightsEditorialGrid insights={regularInsights} />
              
              {hasMore && (
                <div className="mt-12">
                  <InsightsPagination
                    currentCount={displayCount}
                    totalCount={filteredInsights.length}
                    onLoadMore={handleLoadMore}
                    hasMore={hasMore}
                  />
                </div>
              )}
            </div>

            <div className="lg:w-[24%]">
              <InsightsSidebar 
                suggestedArticles={regularInsights.slice(0, 3)}
                onSearch={setSearchQuery}
                categories={publishedCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
