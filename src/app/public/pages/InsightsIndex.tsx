import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { InsightsHero } from '../components/insights/InsightsHero';
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

  // Get featured insight
  const featuredInsight = filteredInsights.find(i => i.featured);
  
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

      {/* Hero Section */}
      <InsightsHero />

      {/* Insights Editorial Grid with Sidebar */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-8 lg:grid-cols-2">
            <div id={language === 'es' ? 'eventos' : 'events'} className="scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {language === 'es' ? 'Eventos' : 'Events'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {language === 'es' ? 'Sesiones, workshops y encuentros' : 'Sessions, workshops and gatherings'}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {events.map((event) => (
                  <article
                    key={event.id}
                    id={event.id}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50/80"
                  >
                    {event.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.62)_100%)]" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                          {event.label}
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600">{event.meta}</p>
                      <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-slate-950">{event.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{event.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div id={language === 'es' ? 'desarrollos' : 'builds'} className="scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {language === 'es' ? 'Ahora construyendo' : 'Now building'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {language === 'es' ? 'Lo que estamos preparando' : 'What we are currently shaping'}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {labs.map((build) => (
                  <article
                    key={build.id}
                    id={build.id}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50/80"
                  >
                    {build.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img src={build.image} alt={build.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.62)_100%)]" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                          {build.label}
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fuchsia-600">{build.meta}</p>
                      <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-slate-950">{build.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{build.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Layout: Main Content 70% + Sidebar 30% */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Content - 76% */}
            <div className="lg:w-[76%]">
              <InsightsEditorialGrid insights={regularInsights} />
              
              {/* Pagination */}
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

            {/* Sidebar - 24% */}
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
