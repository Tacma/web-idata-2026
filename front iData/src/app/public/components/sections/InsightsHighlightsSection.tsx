import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { HomeSection, Language } from '../../../shared/types';
import { mockBlogPosts } from '../../../data/mockData';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ArrowLink } from '../../../shared/components/ArrowLink';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface InsightsHighlightsSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

export function InsightsHighlightsSection({ 
  section, 
  language, 
  getLocalizedValue 
}: InsightsHighlightsSectionProps) {
  const insights = mockBlogPosts.filter(i => 
    section.referencedIds?.includes(i.id)
  ).slice(0, 4);

  // Featured images for insights
  const insightImages: Record<string, string> = {
    'blog-1': 'https://images.unsplash.com/photo-1749006590639-e749e6b7d84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDF8fHx8MTc3Mjk5ODMwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    'blog-2': 'https://images.unsplash.com/photo-1770013277247-ab7a08d3d9ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGlnaXRhbCUyMHRyYW5zZm9ybWF0aW9ufGVufDF8fHx8MTc3MzA3ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'blog-3': 'https://images.unsplash.com/photo-1765728617352-895327fcf036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGlubm92YXRpb24lMjBtb2Rlcm58ZW58MXx8fHwxNzczMDc4NTg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'blog-4': 'https://images.unsplash.com/photo-1736175549681-c24c552da1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZnV0dXJlJTIwYWJzdHJhY3QlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzMwNzg1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        {section.title && (
          <motion.div 
            className="mb-8 flex items-start justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-base text-gray-600 font-light max-w-2xl">
                  {section.subtitle}
                </p>
              )}
            </div>
            
            {/* View All Button */}
            {section.ctaLabel && section.ctaHref && (
              <div className="pt-1">
                <ArrowLink
                  to={section.ctaHref}
                  size="sm"
                  variant="purple"
                >
                  {section.ctaLabel}
                </ArrowLink>
              </div>
            )}
          </motion.div>
        )}

        {/* Dynamic Bento Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[200px] w-full">
          
          {/* Featured Hero Card - Large (spans 7 columns, 2 rows) */}
          {insights[0] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-1 md:col-span-7 row-span-2"
            >
              <Link
                to={`/${language}/${language === 'es' ? 'insights' : 'insights'}/${getLocalizedValue(insights[0].slug_es, insights[0].slug_en)}`}
                className="group block h-full"
              >
                <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  
                  {/* Background Image */}
                  {insightImages[insights[0].id] && (
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={insightImages[insights[0].id]}
                        alt={getLocalizedValue(insights[0].title_es, insights[0].title_en)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/20" />

                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col justify-between">
                    
                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-medium self-start border border-white/20">
                      <Sparkles className="w-3 h-3" />
                      <span>{insights[0].category}</span>
                    </div>

                    {/* Bottom Content */}
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {getLocalizedValue(insights[0].title_es, insights[0].title_en)}
                      </h3>

                      <p className="text-white/90 text-base font-light leading-relaxed mb-4 max-w-2xl">
                        {getLocalizedValue(insights[0].excerpt_es, insights[0].excerpt_en)}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(insights[0].publishedDate).toLocaleDateString(language)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>5 min</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{language === 'es' ? 'Leer artículo' : 'Read article'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          )}

          {/* Secondary Cards Column (spans 5 columns) */}
          <div className="col-span-12 md:col-span-5 row-span-2 grid grid-rows-2 gap-4">
            
            {/* Card 2 - Top */}
            {insights[1] && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="row-span-1"
              >
                <Link
                  to={`/${language}/${language === 'es' ? 'insights' : 'insights'}/${getLocalizedValue(insights[1].slug_es, insights[1].slug_en)}`}
                  className="group block h-full"
                >
                  <div 
                    className="h-full rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/40 border border-white/20 flex flex-col justify-between"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-50 rounded-full text-blue-700 text-xs font-medium mb-3">
                        <span>{insights[1].category}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {getLocalizedValue(insights[1].title_es, insights[1].title_en)}
                      </h3>

                      <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-2">
                        {getLocalizedValue(insights[1].excerpt_es, insights[1].excerpt_en)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mt-3 group-hover:gap-3 transition-all duration-300">
                      <span>{language === 'es' ? 'Leer más' : 'Read more'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Card 3 - Bottom */}
            {insights[2] && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="row-span-1"
              >
                <Link
                  to={`/${language}/${language === 'es' ? 'insights' : 'insights'}/${getLocalizedValue(insights[2].slug_es, insights[2].slug_en)}`}
                  className="group block h-full"
                >
                  <div 
                    className="h-full rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/40 border border-white/20 flex flex-col justify-between"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-50 rounded-full text-purple-700 text-xs font-medium mb-3">
                        <span>{insights[2].category}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {getLocalizedValue(insights[2].title_es, insights[2].title_en)}
                      </h3>

                      <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-2">
                        {getLocalizedValue(insights[2].excerpt_es, insights[2].excerpt_en)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mt-3 group-hover:gap-3 transition-all duration-300">
                      <span>{language === 'es' ? 'Leer más' : 'Read more'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

          </div>

          {/* Bottom Row - Wide cards */}
          {insights[3] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-12 md:col-span-8 row-span-1"
            >
              <Link
                to={`/${language}/${language === 'es' ? 'insights' : 'insights'}/${getLocalizedValue(insights[3].slug_es, insights[3].slug_en)}`}
                className="group block h-full"
              >
                <div 
                  className="h-full rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-600 to-purple-600 border border-white/20 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-medium mb-3 border border-white/20">
                      <span>{insights[3].category}</span>
                    </div>

                    <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors">
                      {getLocalizedValue(insights[3].title_es, insights[3].title_en)}
                    </h3>

                    <div className="flex items-center gap-2 text-white font-medium text-sm mt-4 group-hover:gap-3 transition-all duration-300">
                      <span>{language === 'es' ? 'Descubrir' : 'Discover'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* CTA Card - Explore All */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-12 md:col-span-4 row-span-1"
          >
            <div 
              className="h-full rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/40 border border-white/20 flex flex-col justify-center items-center text-center"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <Sparkles className="w-8 h-8 text-[#8E32F5] mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'es' ? 'Más insights' : 'More insights'}
              </h3>
              <p className="text-sm text-gray-600 font-light mb-4">
                {language === 'es' ? 'Explora nuestra biblioteca completa' : 'Explore our full library'}
              </p>
              <Link
                to={`/${language}/${language === 'es' ? 'insights' : 'insights'}`}
                className="group inline-flex items-center gap-2 px-4 py-2 bg-[#8E32F5] text-white rounded-full font-medium hover:bg-[#7a28d9] transition-all duration-300 text-sm"
              >
                <span>{language === 'es' ? 'Ver todo' : 'View all'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}