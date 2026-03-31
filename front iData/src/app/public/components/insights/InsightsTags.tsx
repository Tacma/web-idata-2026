import { motion } from 'motion/react';
import { Tag } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface InsightsTagsProps {
  tags: string[];
}

export function InsightsTags({ tags }: InsightsTagsProps) {
  const { language } = useLanguage();

  if (!tags || tags.length === 0) return null;

  return (
    <motion.div
      className="border-t border-gray-200 pt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
        <Tag className="w-4 h-4" />
        {language === 'es' ? 'Etiquetas' : 'Tags'}
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              to={`/${language}/insights?tag=${encodeURIComponent(tag)}`}
              className="inline-block px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
            >
              {tag}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
