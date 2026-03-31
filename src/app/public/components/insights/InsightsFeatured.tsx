import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { formatDate } from '../../../shared/utils/dateFormat';

interface FeaturedInsight {
  id: string;
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  excerpt_es: string;
  excerpt_en: string;
  featuredImage?: string;
  publishedDate: string;
  readingTime: number;
  author?: string;
  categoryTitle_es?: string;
  categoryTitle_en?: string;
}

interface InsightsFeaturedProps {
  insight: FeaturedInsight;
}

export function InsightsFeatured({ insight }: InsightsFeaturedProps) {
  const { language, getLocalizedValue } = useLanguage();

  const slug = getLocalizedValue(insight.slug_es, insight.slug_en);
  const insightsPath = language === 'es' ? 'insights' : 'insights';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="group"
    >
      <Link 
        to={`/${language}/${insightsPath}/${slug}`}
        className="block"
      >
        <div 
          className="rounded-2xl overflow-hidden bg-white/60 border border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          {/* Image */}
          {insight.featuredImage && (
            <div className="relative overflow-hidden aspect-[16/9]">
              <ImageWithFallback
                src={insight.featuredImage}
                alt={getLocalizedValue(insight.title_es, insight.title_en)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Category badge on image */}
              {(insight.categoryTitle_es || insight.categoryTitle_en) && (
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
                    {getLocalizedValue(insight.categoryTitle_es, insight.categoryTitle_en)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors duration-200">
              {getLocalizedValue(insight.title_es, insight.title_en)}
            </h2>

            <p className="text-base text-gray-600 font-light leading-relaxed mb-6 line-clamp-2">
              {getLocalizedValue(insight.excerpt_es, insight.excerpt_en)}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              {insight.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{insight.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(insight.publishedDate, language)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  {insight.readingTime} {language === 'es' ? 'min lectura' : 'min read'}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="inline-flex items-center gap-2 text-indigo-600 font-medium group-hover:gap-3 transition-all duration-300">
              <span>{language === 'es' ? 'Leer artículo' : 'Read article'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
