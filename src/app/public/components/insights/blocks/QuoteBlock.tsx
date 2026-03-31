import { Quote } from 'lucide-react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { QuoteBlock } from '../../../../types/content-blocks';

interface QuoteBlockProps {
  block: QuoteBlock;
}

export function QuoteBlockComponent({ block }: QuoteBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const quote = getLocalizedValue(block.quote_es, block.quote_en);
  const authorRole = getLocalizedValue(block.author_role_es, block.author_role_en);

  return (
    <div className="my-12">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12 relative">
        <Quote className="absolute top-6 left-6 w-12 h-12 text-purple-300 opacity-50" />
        
        <blockquote className="relative z-10">
          <p className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed mb-6 italic">
            "{quote}"
          </p>
          
          {(block.author_name || authorRole) && (
            <footer className="flex items-center gap-3 text-gray-600">
              <div className="h-px flex-1 bg-gray-300" />
              <div className="text-right">
                {block.author_name && (
                  <p className="font-medium text-gray-900">{block.author_name}</p>
                )}
                {authorRole && (
                  <p className="text-sm">{authorRole}</p>
                )}
              </div>
            </footer>
          )}
        </blockquote>
      </div>
    </div>
  );
}
