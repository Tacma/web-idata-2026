import { useParams, Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { buildPublicUrl } from '../../shared/utils/siteUrl';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { ArticleContentRenderer } from '../components/insights/ArticleContentRenderer';
import { ArticleShareButton } from '../components/insights/ArticleShareButton';
import { ArticleRelated } from '../components/insights/ArticleRelated';
import { getBySlug, getPublished } from '../../../services/blogService';
import { filterVisibleInsights, isBlockedInsight, isVisibleInsight } from '../../../services/insightVisibility';
import { getAll as getBlogCategories } from '../../../services/blogCategoriesService';
import { mockBlogCategories, mockInsights } from '../../data/mockData';

const allowMockFallback = import.meta.env.DEV;

export function InsightsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedValue } = useLanguage();
  const [article, setArticle] = useState<any | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) return;
      if (isBlockedInsight({ slug_es: slug, slug_en: slug })) {
        if (!cancelled) {
          setArticle(null);
          setArticles([]);
          setCategories([]);
          setLoading(false);
        }
        return;
      }
      try {
        setLoading(true);
        const [articleData, articlesData, categoriesData] = await Promise.all([
          getBySlug(slug, language),
          getPublished(language),
          getBlogCategories(),
        ]);

        if (!cancelled) {
          const fallbackArticle = allowMockFallback
            ? filterVisibleInsights(mockInsights).find((post) =>
                [post.slug_es, post.slug_en].includes(slug)
              ) || null
            : null;

          setArticle(articleData || fallbackArticle);
          setArticles(
            articlesData.length > 0
              ? articlesData
              : (allowMockFallback ? filterVisibleInsights(mockInsights) : [])
          );
          setCategories(categoriesData && categoriesData.length > 0 ? categoriesData : (allowMockFallback ? mockBlogCategories : []));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading insight detail:', error);
        if (!cancelled) {
          const fallbackArticle = allowMockFallback
            ? filterVisibleInsights(mockInsights).find((post) =>
                [post.slug_es, post.slug_en].includes(slug)
              ) || null
            : null;
          setArticle(fallbackArticle && isVisibleInsight(fallbackArticle) ? fallbackArticle : null);
          setArticles(allowMockFallback ? filterVisibleInsights(mockInsights) : []);
          setCategories(allowMockFallback ? mockBlogCategories : []);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug, language]);

  if (!loading && !article) {
    return <Navigate to={`/${language}/insights/`} replace />;
  }

  if (!article) {
    return null;
  }

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

  const category = article.categoryIds?.[0]
    ? categories.find((c) => c.id === article.categoryIds[0])
    : undefined;
  const categoryTitle = category
    ? getLocalizedValue(category.title_es, category.title_en)
    : undefined;

  const date = article.publishedDate ? new Date(article.publishedDate) : null;
  const formattedDate = date
    ? date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const relatedArticles = articles
    .filter((post) => post.id !== article.id)
    .filter((post) => {
      if (article.categoryIds?.length) {
        return (post.categoryIds || []).some((catId: string) => article.categoryIds.includes(catId));
      }
      return true;
    })
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  const publicShareUrl = buildPublicUrl(`/${language}/insights/${slug}/`);
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: language === 'es' ? 'Inicio' : 'Home',
        item: buildPublicUrl(`/${language}/`),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: language === 'es' ? 'Insights' : 'Insights',
        item: buildPublicUrl(`/${language}/insights/`),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: publicShareUrl,
      },
    ],
  };
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: metaDescription,
    image: article.featuredImage ? [buildPublicUrl(article.featuredImage)] : undefined,
    datePublished: article.publishedDate || undefined,
    dateModified: article.updatedAt || article.updated_at || article.publishedDate || undefined,
    author: article.author
      ? {
          '@type': 'Person',
          name: article.author,
        }
      : {
          '@type': 'Organization',
          name: 'iData Global',
        },
    publisher: {
      '@type': 'Organization',
      name: 'iData Global',
      logo: {
        '@type': 'ImageObject',
        url: buildPublicUrl('/assets/logos/brand/logo-complete.png'),
      },
    },
    mainEntityOfPage: publicShareUrl,
    inLanguage: language,
    articleSection: categoryTitle,
  };

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonical={`/${language}/insights/${slug}/`}
        ogImage={article.featuredImage}
        alternateES={`/es/insights/${article.slug_es}/`}
        alternateEN={`/en/insights/${article.slug_en}/`}
        language={language}
        structuredData={[breadcrumbSchema, articleSchema]}
      />

      <article className="bg-white pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[132px_1fr] xl:grid-cols-[148px_1fr] gap-8 lg:gap-12">
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <ArticleShareButton title={title} url={publicShareUrl} />
              </div>
            </aside>

            <div className="max-w-[820px]">
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

              <header className="mb-10 lg:mb-12">
                {categoryTitle && (
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-medium text-sm uppercase tracking-wide">
                      {categoryTitle}
                    </span>
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-[1.1] mb-6">
                  {title}
                </h1>

                {excerpt && (
                  <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-6">
                    {excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200">
                  {formattedDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formattedDate}
                    </span>
                  )}
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

              <div className="article-content">
                {article.content_blocks && article.content_blocks.length > 0 ? (
                  <ArticleContentRenderer blocks={article.content_blocks} />
                ) : (
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p>{getLocalizedValue(article.content_es, article.content_en)}</p>
                  </div>
                )}
              </div>

              <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
                <ArticleShareButton title={title} url={publicShareUrl} />
              </div>
            </div>
          </div>
        </div>
      </article>

      <ArticleRelated articles={relatedArticles} />
    </>
  );
}
