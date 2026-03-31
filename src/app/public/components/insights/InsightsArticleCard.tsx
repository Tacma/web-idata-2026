import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

export type CardVariant = 'wide' | 'regular';

interface InsightsArticleCardProps {
  insight: {
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
  };
  variant?: CardVariant;
  index?: number;
}

export function InsightsArticleCard({ insight, variant = 'regular', index = 0 }: InsightsArticleCardProps) {
  const { language, getLocalizedValue } = useLanguage();

  const slug = getLocalizedValue(insight.slug_es, insight.slug_en);
  const title = getLocalizedValue(insight.title_es, insight.title_en);
  const excerpt = getLocalizedValue(insight.excerpt_es, insight.excerpt_en);
  const categoryTitle = getLocalizedValue(insight.categoryTitle_es, insight.categoryTitle_en);

  const date = new Date(insight.publishedDate);
  const formattedDate = date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Fixed image height for all cards
  const imageHeight = 'h-[240px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        to={`/${language}/insights/${slug}`}
        className="group block h-full"
      >
        <div className="h-full rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
          
          {/* Image Section - Fixed height */}
          {insight.featuredImage && (
            <div className={`relative overflow-hidden ${imageHeight}`}>
              <ImageWithFallback
                src={insight.featuredImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Category Badge */}
              {categoryTitle && (
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
                    {categoryTitle}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content Section - Flexible */}
          <div className="flex-1 p-6 flex flex-col">
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              {insight.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {insight.readingTime} min
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-light text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {excerpt}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
              <span>{language === 'es' ? 'Leer más' : 'Read more'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}