import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Sparkles } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { InsightsEditorialGrid } from '../components/insights/InsightsEditorialGrid';
import { InsightsPagination } from '../components/insights/InsightsPagination';
import { InsightsSidebar } from '../components/insights/InsightsSidebar';
import { getPublished as getPublishedInsights } from '../../../services/blogService';
import { filterVisibleInsights } from '../../../services/insightVisibility';
import { getAll as getBlogCategories } from '../../../services/blogCategoriesService';
import { getInsightEvents, getInsightLabs } from '../../../services/insightMomentumService';
import { mockBlogCategories, mockInsights } from '../../data/mockData';
import { useTheme } from '../../shared/contexts/ThemeContext';

const INSIGHTS_PER_PAGE = 12;
const allowMockFallback = import.meta.env.DEV;

function getEventCountdownLabel(isoDate: string | undefined, language: 'es' | 'en') {
  if (!isoDate) return language === 'es' ? 'Próximamente' : 'Coming soon';

  const now = Date.now();
  const target = new Date(isoDate).getTime();
  const diff = target - now;

  if (Number.isNaN(target)) {
    return language === 'es' ? 'Próximamente' : 'Coming soon';
  }

  if (diff <= 0) {
    return language === 'es' ? 'Hoy' : 'Today';
  }

  const totalHours = Math.ceil(diff / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);

  if (days >= 1) {
    return language === 'es'
      ? `En ${days} día${days === 1 ? '' : 's'}`
      : `In ${days} day${days === 1 ? '' : 's'}`;
  }

  return language === 'es'
    ? `En ${totalHours} hora${totalHours === 1 ? '' : 's'}`
    : `In ${totalHours} hour${totalHours === 1 ? '' : 's'}`;
}

export function InsightsIndex() {
  const location = useLocation();
  const { language, getLocalizedValue } = useLanguage();
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(INSIGHTS_PER_PAGE);
  const [insights, setInsights] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [labs, setLabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const eventsScrollRef = useRef<HTMLDivElement>(null);
  const buildsScrollRef = useRef<HTMLDivElement>(null);
  const [eventsCanScrollLeft, setEventsCanScrollLeft] = useState(false);
  const [eventsCanScrollRight, setEventsCanScrollRight] = useState(false);
  const [buildsCanScrollLeft, setBuildsCanScrollLeft] = useState(false);
  const [buildsCanScrollRight, setBuildsCanScrollRight] = useState(false);

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const [insightsData, categoriesData, eventsData, labsData] = await Promise.all([
          getPublishedInsights(language),
          getBlogCategories(),
          getInsightEvents(language),
          getInsightLabs(language),
        ])

        if (!cancelled) {
          setInsights(
            insightsData.length > 0
              ? insightsData
              : (allowMockFallback ? filterVisibleInsights(mockInsights) : [])
          )
          setCategories(categoriesData && categoriesData.length > 0 ? categoriesData : (allowMockFallback ? mockBlogCategories : []))
          setEvents(eventsData)
          setLabs(labsData)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error loading insights index:', error)
        if (!cancelled) {
          setInsights(allowMockFallback ? filterVisibleInsights(mockInsights) : [])
          setCategories(allowMockFallback ? mockBlogCategories : [])
          setEvents([])
          setLabs([])
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
  useEffect(() => {
    const updateScrollState = (
      element: HTMLDivElement | null,
      setCanLeft: (value: boolean) => void,
      setCanRight: (value: boolean) => void
    ) => {
      if (!element) return;
      setCanLeft(element.scrollLeft > 4);
      setCanRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 4);
    };

    const eventsElement = eventsScrollRef.current;
    const buildsElement = buildsScrollRef.current;

    const syncAll = () => {
      updateScrollState(eventsElement, setEventsCanScrollLeft, setEventsCanScrollRight);
      updateScrollState(buildsElement, setBuildsCanScrollLeft, setBuildsCanScrollRight);
    };

    syncAll();

    eventsElement?.addEventListener('scroll', syncAll, { passive: true });
    buildsElement?.addEventListener('scroll', syncAll, { passive: true });
    window.addEventListener('resize', syncAll);

    return () => {
      eventsElement?.removeEventListener('scroll', syncAll);
      buildsElement?.removeEventListener('scroll', syncAll);
      window.removeEventListener('resize', syncAll);
    };
  }, [events.length, labs.length]);

  const scrollRow = (ref: { current: HTMLDivElement | null }, direction: 'left' | 'right') => {
    ref.current?.scrollBy({
      left: direction === 'right' ? 320 : -320,
      behavior: 'smooth',
    });
  };

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

      <section className={`pb-12 pt-28 md:pb-16 md:pt-32 ${isDark ? 'bg-[linear-gradient(180deg,#07101d_0%,#0b1527_100%)]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-6">
            <div
              id={language === 'es' ? 'eventos' : 'events'}
              className={`scroll-mt-28 rounded-[32px] border p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-7 ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(10,20,38,0.96),rgba(13,24,43,0.94))] shadow-[0_24px_60px_rgba(2,6,23,0.32)]' : 'border-slate-200 bg-white'}`}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? 'bg-sky-400/12 text-sky-300' : 'bg-sky-500/10 text-sky-600'}`}>
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div>
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                      {language === 'es' ? 'Calendario activo' : 'Live calendar'}
                    </p>
                    <h2 className={`mt-1 text-xl font-medium tracking-[-0.03em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {language === 'es' ? 'Próximos eventos' : 'Upcoming events'}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {eventsCanScrollLeft && (
                    <button
                      type="button"
                      onClick={() => scrollRow(eventsScrollRef, 'left')}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${isDark ? 'border-white/12 bg-white/6 text-slate-200 hover:border-white/20 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'}`}
                      aria-label={language === 'es' ? 'Deslizar eventos a la izquierda' : 'Scroll events left'}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                  )}
                  {eventsCanScrollRight && (
                    <button
                      type="button"
                      onClick={() => scrollRow(eventsScrollRef, 'right')}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${isDark ? 'border-white/12 bg-white/6 text-slate-200 hover:border-white/20 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'}`}
                      aria-label={language === 'es' ? 'Deslizar eventos a la derecha' : 'Scroll events right'}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div ref={eventsScrollRef} className="overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max gap-4">
                  {events.map((event, index) => {
                    const countdownLabel = getEventCountdownLabel(event.isoDate, language);
                    return (
                      <article
                        key={event.id}
                        id={event.id}
                        className={`relative flex w-[248px] shrink-0 flex-col overflow-hidden rounded-[24px] border ${
                          isDark
                            ? index === 0
                              ? 'border-sky-300/18 bg-[linear-gradient(180deg,rgba(8,18,34,0.98)_0%,rgba(9,30,52,0.96)_100%)] shadow-[0_18px_36px_rgba(14,116,144,0.18)]'
                              : index % 2 === 0
                                ? 'border-fuchsia-300/16 bg-[linear-gradient(180deg,rgba(17,16,34,0.98)_0%,rgba(36,18,48,0.94)_100%)] shadow-[0_14px_28px_rgba(236,72,153,0.12)]'
                                : 'border-cyan-300/16 bg-[linear-gradient(180deg,rgba(8,18,34,0.98)_0%,rgba(10,28,44,0.94)_100%)] shadow-[0_14px_28px_rgba(14,165,233,0.12)]'
                            :
                          index === 0
                            ? 'border-sky-200 bg-[linear-gradient(180deg,#ffffff_0%,#f4faff_100%)] shadow-[0_18px_36px_rgba(14,116,144,0.10)]'
                            : index % 2 === 0
                              ? 'border-fuchsia-100 bg-[linear-gradient(180deg,#ffffff_0%,#fff8fc_100%)] shadow-[0_14px_28px_rgba(236,72,153,0.06)]'
                              : 'border-cyan-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fcff_100%)] shadow-[0_14px_28px_rgba(14,165,233,0.06)]'
                        }`}
                      >
                        <div className={`absolute inset-y-0 left-0 w-1.5 ${
                          index === 0 ? 'bg-sky-400' : index % 2 === 0 ? 'bg-fuchsia-300' : 'bg-cyan-300'
                        }`} />
                        <div className="flex min-h-[228px] flex-1 flex-col p-4 pl-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${
                                index === 0 ? isDark ? 'text-sky-300' : 'text-sky-600' : index % 2 === 0 ? isDark ? 'text-fuchsia-300' : 'text-fuchsia-600' : isDark ? 'text-cyan-300' : 'text-cyan-600'
                              }`}>
                                {event.label}
                              </p>
                              <p className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                                {event.meta}
                              </p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] ${isDark ? 'border-emerald-300/20 bg-emerald-400/10 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                              <Clock3 className="h-3 w-3" />
                              {countdownLabel}
                            </span>
                          </div>

                          <h3 className={`mt-4 text-[1.02rem] font-medium leading-[1.08] tracking-[-0.04em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                            {event.title}
                          </h3>
                          <p className={`mt-3 min-h-[72px] text-[12px] leading-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            {event.description}
                          </p>

                          <div className="mt-auto pt-3">
                            <div className={`flex w-full items-center justify-center gap-4 rounded-[18px] border px-4 py-2 shadow-sm ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white'}`}>
                              {(event.sponsorLogos || []).slice(0, 2).map((logo: string, logoIndex: number) => (
                                <span
                                  key={`${event.id}-${logo}-${logoIndex}`}
                                  className="flex h-9 flex-1 items-center justify-center"
                                >
                                  <img src={logo} alt="" className="partner-logo-adaptive max-h-8 w-full object-contain" />
                                </span>
                              ))}
                            </div>
                            <a
                              href={event.href}
                              className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-[12px] font-semibold transition ${isDark ? 'border-white/12 bg-white/6 text-white hover:border-sky-300/30 hover:bg-white/10' : 'border-slate-200 bg-white text-slate-950 hover:border-slate-300'}`}
                            >
                              <span>{language === 'es' ? 'Ver agenda' : 'View agenda'}</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              id={language === 'es' ? 'desarrollos' : 'builds'}
              className={`scroll-mt-28 rounded-[32px] border p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-7 ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(10,20,38,0.96),rgba(16,18,38,0.94))] shadow-[0_24px_60px_rgba(2,6,23,0.32)]' : 'border-slate-200 bg-white'}`}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? 'bg-fuchsia-400/12 text-fuchsia-300' : 'bg-fuchsia-500/10 text-fuchsia-600'}`}>
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${isDark ? 'text-fuchsia-300' : 'text-fuchsia-600'}`}>
                    {language === 'es' ? 'Radar de producto' : 'Product radar'}
                  </p>
                  <h2 className={`mt-1 text-xl font-medium tracking-[-0.03em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {language === 'es' ? 'En lo que estamos trabajando' : 'What we are working on'}
                  </h2>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-end gap-2">
                {buildsCanScrollLeft && (
                  <button
                    type="button"
                    onClick={() => scrollRow(buildsScrollRef, 'left')}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${isDark ? 'border-white/12 bg-white/6 text-slate-200 hover:border-white/20 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'}`}
                    aria-label={language === 'es' ? 'Deslizar desarrollos a la izquierda' : 'Scroll builds left'}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                {buildsCanScrollRight && (
                  <button
                    type="button"
                    onClick={() => scrollRow(buildsScrollRef, 'right')}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${isDark ? 'border-white/12 bg-white/6 text-slate-200 hover:border-white/20 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'}`}
                    aria-label={language === 'es' ? 'Deslizar desarrollos a la derecha' : 'Scroll builds right'}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div ref={buildsScrollRef} className="overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max gap-4">
                  {labs.map((build, index) => (
                    <article
                      key={build.id}
                      id={build.id}
                      className={`w-[228px] shrink-0 rounded-[22px] border px-4 py-3.5 shadow-[0_14px_30px_rgba(15,23,42,0.08)] ${
                        isDark
                          ? index % 2 === 0
                            ? 'border-fuchsia-300/16 bg-[linear-gradient(135deg,rgba(22,14,34,0.98)_0%,rgba(36,18,48,0.94)_65%,rgba(17,16,34,0.96)_100%)]'
                            : 'border-sky-300/16 bg-[linear-gradient(135deg,rgba(8,18,34,0.98)_0%,rgba(10,28,44,0.94)_65%,rgba(8,18,34,0.96)_100%)]'
                          :
                        index % 2 === 0
                          ? 'border-fuchsia-100 bg-[linear-gradient(135deg,#fff9fe_0%,#fff4fb_65%,#ffffff_100%)]'
                          : 'border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#f1f8ff_65%,#ffffff_100%)]'
                      }`}
                    >
                      <div className="flex min-h-[138px] flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${
                              index % 2 === 0 ? isDark ? 'text-fuchsia-300' : 'text-fuchsia-600' : isDark ? 'text-sky-300' : 'text-sky-600'
                            }`}>
                              {build.label}
                            </p>
                            <p className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                              {build.meta}
                            </p>
                          </div>
                          <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${isDark ? 'border-white/10 bg-white/6 text-slate-300' : 'border-white/80 bg-white/90 text-slate-400'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className={`mt-3 text-[1rem] font-medium leading-[1.08] tracking-[-0.04em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                          {build.title}
                        </h3>

                        <div className="mt-auto pt-3">
                          <a
                            href={build.href}
                            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition ${isDark ? 'border-white/12 bg-white/6 text-white hover:border-fuchsia-300/30 hover:bg-white/10 hover:text-fuchsia-200' : 'border-slate-200 bg-white text-slate-950 hover:border-fuchsia-300 hover:text-fuchsia-700'}`}
                          >
                            <span>{language === 'es' ? 'Seguir desarrollo' : 'Follow progress'}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {language === 'es' ? 'Noticias e insights' : 'News and insights'}
              </p>
              <h2 className={`mt-2 text-[2rem] font-medium tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
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
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition ${isDark ? 'border-white/12 bg-white/6 text-slate-200 hover:border-white/20 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'}`}
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
