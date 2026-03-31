import { Link } from 'react-router';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface RelatedArticle {
  id: string;
  slug_es: string;
  slug_en: string;
  title_es: string;
  title_en: string;
  featuredImage?: string;
  publishedDate: string;
  readingTime?: number;
}

interface ArticleRelatedProps {
  articles: RelatedArticle[];
}

export function ArticleRelated({ articles }: ArticleRelatedProps) {
  const { language, getLocalizedValue } = useLanguage();

  const sectionTitle = language === 'es' ? 'Otras noticias e insights' : 'More insights';

  if (articles.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            {sectionTitle}
          </h2>
          
          <Link
            to={`/${language}/insights`}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium group"
          >
            {language === 'es' ? 'Ver todos los insights' : 'View all insights'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => {
            const slug = getLocalizedValue(article.slug_es, article.slug_en);
            const title = getLocalizedValue(article.title_es, article.title_en);
            
            const date = new Date(article.publishedDate);
            const formattedDate = date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={`/${language}/insights/${slug}`}
                  className="group block h-full"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="h-full rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
                    {/* Image */}
                    {article.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={article.featuredImage}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formattedDate}
                        </span>
                        {article.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readingTime} min
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-light text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors flex-1">
                        {title}
                      </h3>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-purple-600 text-sm font-medium group-hover:gap-3 transition-all">
                        <span>{language === 'es' ? 'Leer más' : 'Read more'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}