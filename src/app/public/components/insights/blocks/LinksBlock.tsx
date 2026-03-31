import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { LinksBlock } from '../../../../types/content-blocks';

interface LinksBlockProps {
  block: LinksBlock;
}

export function LinksBlockComponent({ block }: LinksBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);

  return (
    <div className="my-10">
      {title && (
        <h3 className="text-2xl font-light text-gray-900 mb-6">
          {title}
        </h3>
      )}
      
      <div className="space-y-4">
        {block.links.map((link, index) => {
          const label = getLocalizedValue(link.label_es, link.label_en);
          const description = getLocalizedValue(link.description_es, link.description_en);
          
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium text-purple-600 group-hover:text-purple-700 mb-1">
                    {label}
                  </p>
                  {description && (
                    <p className="text-sm text-gray-600">
                      {description}
                    </p>
                  )}
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-600 flex-shrink-0 mt-0.5" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
