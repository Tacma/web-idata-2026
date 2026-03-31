import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { HomeSection, Language } from '../../../shared/types';
import { InsightCard } from '../insights/InsightCard';
import { getPublished as getPublishedBlogPosts } from '../../../../services/blogService';
import { filterVisibleInsights } from '../../../../services/insightVisibility';
import { mockInsights } from '../../../data/mockData';

interface InsightsEditorialSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

const allowMockFallback = import.meta.env.DEV;

/**
 * InsightsEditorialSection
 * Editorial layout with 3-column composition for blog articles
 */
export function InsightsEditorialSection({
  section,
  language,
  getLocalizedValue,
}: InsightsEditorialSectionProps) {
  const [articles, setArticles] = useState<any[]>([]);
  const moreInsightsTitle =
    section.config?.moreInsightsTitle ||
    (language === 'es' ? 'Más insights' : 'More Insights');
  const moreInsightsText =
    section.config?.moreInsightsText ||
    (language === 'es'
      ? 'Explora nuestra biblioteca completa de artículos sobre datos, analítica e inteligencia artificial.'
      : 'Explore our full library of articles on data, analytics, and artificial intelligence.');
  const moreInsightsCtaLabel =
    section.config?.moreInsightsCtaLabel ||
    (language === 'es' ? 'Ver todos los artículos' : 'View all articles');
  const moreInsightsCtaHref = section.config?.moreInsightsCtaHref || `/${language}/insights/`;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const blogPosts = await getPublishedBlogPosts(language);
        if (!cancelled) {
          const selected = blogPosts.length >= 4
            ? blogPosts
            : (allowMockFallback ? filterVisibleInsights(mockInsights) : []);
          setArticles(selected.slice(0, 4));
        }
      } catch (error) {
        console.error('Error loading home insights:', error);
        if (!cancelled) {
          setArticles((allowMockFallback ? filterVisibleInsights(mockInsights) : []).slice(0, 4));
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language]);

  if (articles.length < 4) return null;

  const featuredImage =
    articles[2].featuredImage ||
    articles[2].featured_image ||
    (language === 'es'
      ? 'https://images.unsplash.com/photo-1761912149936-8f662fc2a13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZnV0dXJpc3RpYyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMDc5MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      : 'https://images.unsplash.com/photo-1761912149936-8f662fc2a13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZnV0dXJpc3RpYyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMDc5MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080');

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-16 sm:py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        {section.title && (
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-lg sm:text-xl text-gray-600 font-light max-w-3xl mx-auto">
                {section.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Editorial Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          
          {/* COLUMN 1 - Two Compact Articles */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Article 1 */}
            <div className="flex-1">
              <InsightCard
                title={getLocalizedValue(articles[0].title_es, articles[0].title_en)}
                description={getLocalizedValue(articles[0].excerpt_es, articles[0].excerpt_en)}
                link={`/${language}/insights/${getLocalizedValue(articles[0].slug_es, articles[0].slug_en)}`}
                variant="compact"
                language={language}
              />
            </div>

            {/* Article 2 */}
            <div className="flex-1">
              <InsightCard
                title={getLocalizedValue(articles[1].title_es, articles[1].title_en)}
                description={getLocalizedValue(articles[1].excerpt_es, articles[1].excerpt_en)}
                link={`/${language}/insights/${getLocalizedValue(articles[1].slug_es, articles[1].slug_en)}`}
                variant="compact"
                language={language}
              />
            </div>
          </motion.div>

          {/* COLUMN 2 - Featured Article */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <InsightCard
              title={getLocalizedValue(articles[2].title_es, articles[2].title_en)}
              description={getLocalizedValue(articles[2].excerpt_es, articles[2].excerpt_en)}
              link={`/${language}/insights/${getLocalizedValue(articles[2].slug_es, articles[2].slug_en)}`}
              image={featuredImage}
              variant="featured"
              language={language}
            />
          </motion.div>

          {/* COLUMN 3 - Small Article + CTA */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Article 4 */}
            <div className="flex-1">
              <InsightCard
                title={getLocalizedValue(articles[3].title_es, articles[3].title_en)}
                description={getLocalizedValue(articles[3].excerpt_es, articles[3].excerpt_en)}
                link={`/${language}/insights/${getLocalizedValue(articles[3].slug_es, articles[3].slug_en)}`}
                variant="compact"
                language={language}
              />
            </div>

            {/* CTA Block */}
            <div className="flex-1">
              <div className="theme-glass-accent-panel flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="mb-2 text-2xl font-semibold text-[var(--glass-text-primary)]">
                  {moreInsightsTitle}
                </h3>
                
                <p className="mb-6 text-sm font-light leading-relaxed text-[var(--glass-text-secondary)]">
                  {moreInsightsText}
                </p>
                
                <Link
                  to={moreInsightsCtaHref}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 text-sm"
                >
                  <span>{moreInsightsCtaLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
