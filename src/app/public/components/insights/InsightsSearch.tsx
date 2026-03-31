import { Search } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface InsightsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function InsightsSearch({ value, onChange }: InsightsSearchProps) {
  const { language } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={language === 'es' ? 'Buscar insights...' : 'Search insights...'}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-gray-900 placeholder:text-gray-400 bg-white/80 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
