import { Search, Linkedin, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { useState } from 'react';

interface SuggestedArticle {
  id: string;
  slug_es: string;
  slug_en: string;
  title_es: string;
  title_en: string;
  featuredImage?: string;
}

interface Category {
  id: string;
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
}

interface InsightsSidebarProps {
  suggestedArticles?: SuggestedArticle[];
  onSearch?: (query: string) => void;
  categories?: Category[];
  selectedCategory?: string | null;
  onCategorySelect?: (categoryId: string | null) => void;
}

export function InsightsSidebar({ 
  suggestedArticles = [], 
  onSearch,
  categories = [],
  selectedCategory = null,
  onCategorySelect
}: InsightsSidebarProps) {
  const { language, getLocalizedValue } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  // Tags - bilingual
  const tags = [
    { label_es: 'IA', label_en: 'AI' },
    { label_es: 'Gobernanza de Datos', label_en: 'Data Governance' },
    { label_es: 'Analítica', label_en: 'Analytics' },
    { label_es: 'Machine Learning', label_en: 'Machine Learning' },
    { label_es: 'Cloud', label_en: 'Cloud' },
    { label_es: 'Arquitectura de Datos', label_en: 'Data Architecture' },
    { label_es: 'Power BI', label_en: 'Power BI' },
    { label_es: 'Estrategia de Datos', label_en: 'Data Strategy' },
  ];

  // Official iData social networks
  const socialNetworks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/idata.global/',
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/idata-global-latam/posts/?feedView=all',
      color: 'hover:bg-[#0A66C2]',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@idata.global',
      color: 'hover:bg-red-600',
    },
  ];

  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      
      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-light text-xl text-gray-900 mb-4">
          {language === 'es' ? 'Buscar' : 'Search'}
        </h3>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'es' ? 'Buscar insights...' : 'Search insights...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-light text-xl text-gray-900 mb-4">
          {language === 'es' ? 'Etiquetas' : 'Tags'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => {
            const label = getLocalizedValue(tag.label_es, tag.label_en);
            return (
              <button
                key={index}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-purple-600 hover:text-white transition-colors duration-200"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-light text-xl text-gray-900 mb-4">
            {language === 'es' ? 'Categorías' : 'Categories'}
          </h3>
          <div className="space-y-4">
            {categories.map((category) => {
              const slug = getLocalizedValue(category.slug_es, category.slug_en);
              const title = getLocalizedValue(category.title_es, category.title_en);

              return (
                <Link
                  key={category.id}
                  to={`/${language}/insights/category/${slug}`}
                  className="group flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-light text-sm text-gray-900 leading-tight line-clamp-3 group-hover:text-purple-600 transition-colors">
                      {title}
                    </h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Suggested Articles */}
      {suggestedArticles.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-light text-xl text-gray-900 mb-4">
            {language === 'es' ? 'Artículos Sugeridos' : 'Suggested Articles'}
          </h3>
          <div className="space-y-4">
            {suggestedArticles.slice(0, 3).map((article) => {
              const slug = getLocalizedValue(article.slug_es, article.slug_en);
              const title = getLocalizedValue(article.title_es, article.title_en);

              return (
                <Link
                  key={article.id}
                  to={`/${language}/insights/${slug}`}
                  className="group flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  {article.featuredImage && (
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={article.featuredImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-light text-sm text-gray-900 leading-tight line-clamp-3 group-hover:text-purple-600 transition-colors">
                      {title}
                    </h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Social Networks */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-light text-xl text-gray-900 mb-4">
          {language === 'es' ? 'Síguenos' : 'Follow Us'}
        </h3>
        <div className="flex flex-wrap gap-3">
          {socialNetworks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-700 ${social.color} hover:text-white transition-all duration-300 hover:scale-110`}
                title={social.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>

    </aside>
  );
}