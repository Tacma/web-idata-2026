import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface InsightsPaginationProps {
  hasMore: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
}

export function InsightsPagination({ hasMore, isLoading, onLoadMore }: InsightsPaginationProps) {
  const { language } = useLanguage();

  if (!hasMore) return null;

  return (
    <motion.div
      className="flex justify-center mt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{language === 'es' ? 'Cargando...' : 'Loading...'}</span>
          </>
        ) : (
          <span>{language === 'es' ? 'Cargar más artículos' : 'Load more articles'}</span>
        )}
      </button>
    </motion.div>
  );
}
