import { Link } from 'react-router';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel';

interface InsightItem {
  id: string;
  slug_es: string;
  slug_en: string;
  title_es: string;
  title_en: string;
  excerpt_es?: string;
  excerpt_en?: string;
  featuredImage?: string;
  publishedDate: string;
  readingTime?: number;
  categoryTitle_es?: string;
  categoryTitle_en?: string;
}

interface AllInsightsBannerProps {
  insights: InsightItem[];
  currentInsightId?: string;
}

export function AllInsightsBanner({ insights, currentInsightId }: AllInsightsBannerProps) {
  const { language, getLocalizedValue } = useLanguage();

  // Filter out current article
  const filteredInsights = insights.filter(insight => insight.id !== currentInsightId);

  if (filteredInsights.length === 0) return null;

  const sectionTitle = language === 'es' 
    ? 'Explorar todos los insights' 
    : 'Explore all insights';

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 font-light">
            {language === 'es' 
              ? `${filteredInsights.length} artículos disponibles` 
              : `${filteredInsights.length} articles available`}
          </p>
        </motion.div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: 'start',
            loop: false,
            skipSnaps: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {filteredInsights.map((insight, index) => {
              const slug = getLocalizedValue(insight.slug_es, insight.slug_en);
              const title = getLocalizedValue(insight.title_es, insight.title_en);
              const excerpt = getLocalizedValue(insight.excerpt_es, insight.excerpt_en);
              const categoryTitle = getLocalizedValue(
                insight.categoryTitle_es,
                insight.categoryTitle_en
              );
              
              const date = new Date(insight.publishedDate);
              const formattedDate = date.toLocaleDateString(
                language === 'es' ? 'es-ES' : 'en-US',
                { year: 'numeric', month: 'short', day: 'numeric' }
              );

              return (
                <CarouselItem key={insight.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Link
                      to={`/${language}/insights/${slug}`}
                      className="group block h-full"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <div className="h-full rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
                        
                        {/* Image */}
                        {insight.featuredImage && (
                          <div className="relative h-48 overflow-hidden">
                            <ImageWithFallback
                              src={insight.featuredImage}
                              alt={title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Category Badge */}
                            {categoryTitle && (
                              <div className="absolute top-3 left-3">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-purple-700 font-medium text-xs uppercase tracking-wide shadow-md">
                                  {categoryTitle}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          
                          {/* Meta */}
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {formattedDate}
                            </span>
                            {insight.readingTime && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {insight.readingTime} min
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-light text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {title}
                          </h3>

                          {/* Excerpt */}
                          {excerpt && (
                            <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-2 mb-4 flex-1">
                              {excerpt}
                            </p>
                          )}

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-purple-600 text-sm font-medium group-hover:gap-3 transition-all mt-auto pt-4 border-t border-gray-100">
                            <span>{language === 'es' ? 'Leer artículo' : 'Read article'}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to={`/${language}/insights/`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-100 group"
          >
            {language === 'es' ? 'Ver todos los insights' : 'View all insights'}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
