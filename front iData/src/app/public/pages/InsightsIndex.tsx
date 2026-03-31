import { useState } from 'react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { mockInsights, mockBlogCategories } from '../../data/mockData';
import { InsightsHero } from '../components/insights/InsightsHero';
import { InsightsEditorialGrid } from '../components/insights/InsightsEditorialGrid';
import { InsightsPagination } from '../components/insights/InsightsPagination';
import { InsightsSidebar } from '../components/insights/InsightsSidebar';

const INSIGHTS_PER_PAGE = 12;

export function InsightsIndex() {
  const { language, getLocalizedValue } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(INSIGHTS_PER_PAGE);

  // Filter and sort insights
  const filteredInsights = mockInsights
    .filter(p => p.status === 'published')
    .filter(p => !selectedCategory || p.categoryIds.includes(selectedCategory))
    .filter(p => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const title = getLocalizedValue(p.title_es, p.title_en).toLowerCase();
      const content = getLocalizedValue(p.excerpt_es, p.excerpt_en).toLowerCase();
      const tags = p.tags?.join(' ').toLowerCase() || '';
      return title.includes(query) || content.includes(query) || tags.includes(query);
    })
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });

  const categories = mockBlogCategories.filter(c => c.status === 'published');

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
                categories={categories}
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