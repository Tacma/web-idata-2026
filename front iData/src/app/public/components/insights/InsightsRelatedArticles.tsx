import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { useEffect } from 'react';

interface RelatedArticle {
  id: string;
  slug_es: string;
  slug_en: string;
  title_es: string;
  title_en: string;
  excerpt_es: string;
  excerpt_en: string;
  featuredImage?: string;
  publishedDate: string;
  readingTime?: number;
  categoryTitle_es?: string;
  categoryTitle_en?: string;
}

interface InsightsRelatedArticlesProps {
  articles: RelatedArticle[];
}

export function InsightsRelatedArticles({ articles }: InsightsRelatedArticlesProps) {
  const { language, getLocalizedValue } = useLanguage();

  // Scroll to top when component mounts or when navigating to another article
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl md:text-3xl font-light text-gray-900 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {language === 'es' ? 'Otras noticias e insights' : 'More news and insights'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article, index) => {
            const slug = getLocalizedValue(article.slug_es, article.slug_en);
            const title = getLocalizedValue(article.title_es, article.title_en);
            const excerpt = getLocalizedValue(article.excerpt_es, article.excerpt_en);
            const categoryTitle = getLocalizedValue(article.categoryTitle_es, article.categoryTitle_en);

            const date = new Date(article.publishedDate);
            const formattedDate = date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/${language}/insights/${slug}`}
                  className="group block h-full"
                  onClick={() => {
                    // Smooth scroll to top when clicking
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  <div className="h-full rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    
                    {/* Image */}
                    {article.featuredImage && (
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <ImageWithFallback
                          src={article.featuredImage}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Category Badge */}
                        {categoryTitle && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
                              {categoryTitle}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="text-lg font-light text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                        {title}
                      </h3>

                      {/* Excerpt */}
                      {excerpt && (
                        <p className="text-gray-600 font-light leading-relaxed mb-4 line-clamp-2 text-sm">
                          {excerpt}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formattedDate}</span>
                          </div>
                          
                          {article.readingTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {article.readingTime} {language === 'es' ? 'min' : 'min'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Read More Link */}
                      <div className="mt-4">
                        <div className="inline-flex items-center gap-2 text-purple-600 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                          <span>{language === 'es' ? 'Leer más' : 'Read more'}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to={`/${language}/insights/`}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium group"
          >
            <span>{language === 'es' ? 'Ver todos los insights' : 'View all insights'}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
