import { Search, X } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import type { BlogCategory } from '../../../types';

interface InsightsToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: BlogCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function InsightsToolbar({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategorySelect,
}: InsightsToolbarProps) {
  const { language, getLocalizedValue } = useLanguage();

  const hasActiveFilters = searchQuery || selectedCategory;

  const handleClearFilters = () => {
    onSearchChange('');
    onCategorySelect(null);
  };

  return (
    <div className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center">
          
          {/* Search Input */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === 'es'
                    ? 'Buscar artículos...'
                    : 'Search articles...'
                }
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex-1 flex flex-wrap items-center gap-2">
            {/* All Categories Pill */}
            <button
              onClick={() => onCategorySelect(null)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${!selectedCategory
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {language === 'es' ? 'Todos' : 'All'}
            </button>

            {/* Category Pills */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {getLocalizedValue(category.title_es, category.title_en)}
              </button>
            ))}

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="ml-2 px-3 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                {language === 'es' ? 'Limpiar' : 'Clear'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
