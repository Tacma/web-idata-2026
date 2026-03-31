import { motion } from 'motion/react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { InsightsCard } from './InsightsCard';

interface RelatedInsight {
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

interface InsightsRelatedProps {
  insights: RelatedInsight[];
}

export function InsightsRelated({ insights }: InsightsRelatedProps) {
  const { language } = useLanguage();

  if (!insights || insights.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-light text-gray-900 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {language === 'es' ? 'Artículos Relacionados' : 'Related Articles'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.slice(0, 3).map((insight, index) => (
            <InsightsCard 
              key={insight.id} 
              insight={insight}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
