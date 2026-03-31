import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Calendar, Clock, Tag } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { formatDate } from '../../../shared/utils/dateFormat';

interface InsightCardData {
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
  categoryTitle_es?: string;
  categoryTitle_en?: string;
  tags?: string[];
}

interface InsightsCardProps {
  insight: InsightCardData;
  index?: number;
}

export function InsightsCard({ insight, index = 0 }: InsightsCardProps) {
  const { language, getLocalizedValue } = useLanguage();

  const slug = getLocalizedValue(insight.slug_es, insight.slug_en);
  const insightsPath = language === 'es' ? 'insights' : 'insights';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link 
        to={`/${language}/${insightsPath}/${slug}`}
        className="block h-full"
      >
        <div 
          className="rounded-2xl overflow-hidden bg-white/60 border border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          {/* Image */}
          {insight.featuredImage && (
            <div className="relative overflow-hidden aspect-[16/10]">
              <ImageWithFallback
                src={insight.featuredImage}
                alt={getLocalizedValue(insight.title_es, insight.title_en)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Category badge */}
              {(insight.categoryTitle_es || insight.categoryTitle_en) && (
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
                    {getLocalizedValue(insight.categoryTitle_es, insight.categoryTitle_en)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-light text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
              {getLocalizedValue(insight.title_es, insight.title_en)}
            </h3>

            <p className="text-sm text-gray-600 font-light leading-relaxed mb-4 line-clamp-2 flex-1">
              {getLocalizedValue(insight.excerpt_es, insight.excerpt_en)}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(insight.publishedDate, language)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {insight.readingTime} {language === 'es' ? 'min' : 'min'}
                </span>
              </div>
            </div>

            {/* Tags */}
            {insight.tags && insight.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {insight.tags.slice(0, 3).map((tag, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-indigo-50 text-indigo-700"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
