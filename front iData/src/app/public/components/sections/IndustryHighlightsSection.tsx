import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { HomeSection, Language } from '../../../shared/types';
import { mockIndustries } from '../../../data/mockData';
import { Building2, TrendingUp, Users, Globe, ArrowRight } from 'lucide-react';
import { BentoGrid, BentoCard } from '../bento/BentoGrid';
import { ArrowLink } from '../../../shared/components/ArrowLink';

interface IndustryHighlightsSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

export function IndustryHighlightsSection({ 
  section, 
  language, 
  getLocalizedValue 
}: IndustryHighlightsSectionProps) {
  const industries = mockIndustries.filter(i => 
    section.referencedIds?.includes(i.id)
  ).slice(0, 4);

  const industryIcons = [
    <Building2 className="w-12 h-12 text-blue-600" />,
    <TrendingUp className="w-12 h-12 text-purple-600" />,
    <Users className="w-12 h-12 text-green-600" />,
    <Globe className="w-12 h-12 text-orange-600" />,
  ];

  const industryColors = [
    'from-blue-50 to-blue-100',
    'from-purple-50 to-purple-100',
    'from-green-50 to-green-100',
    'from-orange-50 to-orange-100',
  ];

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        {section.title && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-lg sm:text-xl text-gray-600 font-light max-w-3xl">
                {section.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Bento Grid Layout */}
        <BentoGrid>
          {industries.map((industry, index) => {
            const isWide = index % 3 === 0;
            const span = isWide ? 'lg' : 'sm';

            return (
              <BentoCard 
                key={industry.id} 
                span={span}
                background={`bg-gradient-to-br ${industryColors[index % 4]}`}
                className="relative overflow-hidden group"
              >
                <div className="flex flex-col h-full min-h-[280px] justify-between">
                  {/* Icon */}
                  <div className="mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {industryIcons[index % 4]}
                  </div>

                  <div>
                    {/* Title */}
                    <h3 className={`font-light text-gray-900 mb-3 ${isWide ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                      {getLocalizedValue(industry.title_es, industry.title_en)}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 text-base font-light leading-relaxed mb-6">
                      {getLocalizedValue(industry.excerpt_es, industry.excerpt_en)}
                    </p>

                    {/* CTA */}
                    <Link
                      to={`/${language}/${language === 'es' ? 'industrias' : 'industries'}/${getLocalizedValue(industry.slug_es, industry.slug_en)}`}
                      className="inline-flex items-center gap-2 text-gray-900 font-medium text-sm hover:gap-3 transition-all duration-300"
                    >
                      <span>{language === 'es' ? 'Explorar industria' : 'Explore industry'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </BentoCard>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}