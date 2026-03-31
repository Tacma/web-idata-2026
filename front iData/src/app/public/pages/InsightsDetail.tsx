import { useParams, Navigate } from 'react-router';
import { useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { mockInsights, mockBlogCategories } from '../../data/mockData';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { ArticleContentRenderer } from '../components/insights/ArticleContentRenderer';
import { ArticleShareButton } from '../components/insights/ArticleShareButton';
import { ArticleRelated } from '../components/insights/ArticleRelated';

export function InsightsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Find article by slug
  const article = mockInsights.find(
    (p) =>
      p.status === 'published' &&
      (p.slug_es === slug || p.slug_en === slug)
  );

  if (!article) {
    return <Navigate to={`/${language}/insights/`} replace />;
  }

  // Get article data
  const title = getLocalizedValue(article.title_es, article.title_en);
  const excerpt = getLocalizedValue(article.excerpt_es, article.excerpt_en);
  const metaTitle = getLocalizedValue(
    article.seo_es?.metaTitle,
    article.seo_en?.metaTitle
  ) || title;
  const metaDescription = getLocalizedValue(
    article.seo_es?.metaDescription,
    article.seo_en?.metaDescription
  ) || excerpt;

  // Get category info
  const category = article.categoryIds[0]
    ? mockBlogCategories.find((c) => c.id === article.categoryIds[0])
    : undefined;
  const categoryTitle = category
    ? getLocalizedValue(category.title_es, category.title_en)
    : undefined;

  // Format date
  const date = new Date(article.publishedDate);
  const formattedDate = date.toLocaleDateString(
    language === 'es' ? 'es-ES' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  // Get related articles (same category or latest)
  const relatedArticles = mockInsights
    .filter((p) => p.status === 'published' && p.id !== article.id)
    .filter((p) => {
      // Try to get articles from same category
      if (article.categoryIds.length > 0) {
        return p.categoryIds.some((catId) => article.categoryIds.includes(catId));
      }
      return true;
    })
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  // Get all published insights with category info for the banner
  const allInsights = mockInsights
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .map((insight) => {
      const insightCategory = insight.categoryIds[0]
        ? mockBlogCategories.find((c) => c.id === insight.categoryIds[0])
        : undefined;
      
      return {
        ...insight,
        categoryTitle_es: insightCategory?.title_es,
        categoryTitle_en: insightCategory?.title_en,
      };
    });

  // Current article URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonical={`/${language}/insights/${slug}/`}
        alternateES={`/es/insights/${article.slug_es}/`}
        alternateEN={`/en/insights/${article.slug_en}/`}
        language={language}
      />

      {/* Article Container - Editorial Layout */}
      <article className="bg-white pt-24 pb-16">
        {/* Main Grid Container */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] xl:grid-cols-[120px_1fr] gap-8 lg:gap-12">
            
            {/* LEFT COLUMN - Social Share (Sticky on Desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <ArticleShareButton 
                  title={title} 
                  url={currentUrl}
                />
              </div>
            </aside>

            {/* CENTER COLUMN - Main Content */}
            <div className="max-w-[820px]">
              
              {/* Featured Image - Compact Editorial Style */}
              {article.featuredImage && (
                <div className="mb-8 lg:mb-10">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <div className="h-[240px] sm:h-[260px] overflow-hidden">
                      <ImageWithFallback
                        src={article.featuredImage}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Article Header */}
              <header className="mb-10 lg:mb-12">
                
                {/* Category Tag */}
                {categoryTitle && (
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-medium text-sm uppercase tracking-wide">
                      {categoryTitle}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-[1.1] mb-6">
                  {title}
                </h1>

                {/* Subtitle/Excerpt */}
                {excerpt && (
                  <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-6">
                    {excerpt}
                  </p>
                )}

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </span>
                  {article.readingTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {article.readingTime} {language === 'es' ? 'min de lectura' : 'min read'}
                    </span>
                  )}
                  {article.author && (
                    <span className="ml-auto text-gray-700 font-medium">
                      {article.author}
                    </span>
                  )}
                </div>
              </header>

              {/* Article Body - Modular Content */}
              <div className="article-content">
                {article.content_blocks && article.content_blocks.length > 0 ? (
                  <ArticleContentRenderer blocks={article.content_blocks} />
                ) : (
                  // Fallback to old content if no blocks
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p>{getLocalizedValue(article.content_es, article.content_en)}</p>
                  </div>
                )}
              </div>

              {/* Mobile Social Share */}
              <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
                <ArticleShareButton 
                  title={title} 
                  url={currentUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles - Only ONE section */}
      <ArticleRelated articles={relatedArticles} />
    </>
  );
}