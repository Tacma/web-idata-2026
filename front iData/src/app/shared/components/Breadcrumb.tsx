import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t, getLocalizedRoute } from '../utils/i18n';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const { language } = useLanguage();
  const homeUrl = getLocalizedRoute('home', language);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        <li>
          <Link 
            to={homeUrl} 
            className="flex items-center hover:text-gray-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">{t('home', language)}</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {isLast || !item.href ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link 
                  to={item.href} 
                  className="hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
