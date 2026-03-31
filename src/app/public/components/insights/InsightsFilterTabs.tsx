import { motion } from 'motion/react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface Category {
  id: string;
  title_es: string;
  title_en: string;
}

interface InsightsFilterTabsProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function InsightsFilterTabs({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: InsightsFilterTabsProps) {
  const { language, getLocalizedValue } = useLanguage();

  const allCategories = [
    { id: null, title_es: 'Todos', title_en: 'All' },
    ...categories.map(c => ({ id: c.id, title_es: c.title_es, title_en: c.title_en }))
  ];

  return (
    <div className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        {allCategories.map((category, index) => {
          const isActive = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id || 'all'}
              onClick={() => onSelectCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white/60 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
              }`}
              style={{
                backdropFilter: isActive ? 'none' : 'blur(10px)',
                WebkitBackdropFilter: isActive ? 'none' : 'blur(10px)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {getLocalizedValue(category.title_es, category.title_en)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
