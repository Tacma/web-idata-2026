import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { HomeSection, Language } from '../../../shared/types';
import { mockCaseStudies } from '../../../data/mockData';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { ArrowLink } from '../../../shared/components/ArrowLink';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface CaseHighlightsSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

export function CaseHighlightsSection({ 
  section, 
  language, 
  getLocalizedValue 
}: CaseHighlightsSectionProps) {
  const cases = mockCaseStudies.filter(c => 
    section.referencedIds?.includes(c.id)
  ).slice(0, 3);

  // Parse results to extract individual metrics
  const parseResults = (resultsString: string) => {
    return resultsString.split('|').map(r => r.trim());
  };

  // Background images for each case
  const caseImages: Record<string, string> = {
    'case-2': 'https://images.unsplash.com/photo-1768550005921-8782adcb798c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwZmFjdG9yeSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzczMDc3NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080', // Cueros Vélez
    'case-4': 'https://images.unsplash.com/photo-1642979427252-13d5fd18bb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYXBwbGlhbmNlcyUyMG1vZGVybiUyMGtpdGNoZW58ZW58MXx8fHwxNzczMDQ4ODczfDA&ixlib=rb-4.1.0&q=80&w=1080', // HACEB
    'case-5': 'https://images.unsplash.com/photo-1641561421189-a6bf2fd5ca10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxvZ2lzdGljcyUyMG1vZGVybnxlbnwxfHx8fDE3NzMwNzc1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080', // NADRO
  };

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12 sm:py-14">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        {section.title && (
          <motion.div 
            className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6"
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
              <div className="sm:pt-1">
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

        {/* Horizontal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {cases.map((caseStudy, index) => {
            const results = parseResults(getLocalizedValue(caseStudy.results_es || '', caseStudy.results_en || ''));
            const backgroundImage = caseImages[caseStudy.id];
            
            return (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/${getLocalizedValue(caseStudy.slug_es, caseStudy.slug_en)}`}
                  className="group block h-full"
                >
                  <div className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/40 border border-white/20"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    
                    {/* Top Section: Image Background with Title & Description */}
                    <div className="relative overflow-hidden">
                      
                      {/* Background Image */}
                      {backgroundImage && (
                        <div className="absolute inset-0">
                          <ImageWithFallback
                            src={backgroundImage}
                            alt={caseStudy.client}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 to-gray-900/85" />

                      {/* Content over image */}
                      <div className="relative p-4 pb-5">
                        {/* Client Name - Bold */}
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {caseStudy.client}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-white/90 font-light leading-relaxed">
                          {getLocalizedValue(caseStudy.excerpt_es, caseStudy.excerpt_en)}
                        </p>
                      </div>

                    </div>

                    {/* Bottom Section: Liquid Glass Background with Metrics & CTA */}
                    <div className="p-6 pt-5">
                      
                      {/* Results Metrics */}
                      <div className="space-y-2 mb-5">
                        {results.slice(0, 2).map((result, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600 text-xs mt-0.5">●</span>
                            <span className="text-xs text-gray-800 font-light leading-snug">
                              {result}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="inline-flex items-center gap-2 text-gray-900 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        <span>{language === 'es' ? 'Ver caso' : 'View case'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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