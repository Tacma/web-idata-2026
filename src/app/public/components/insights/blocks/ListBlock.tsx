import { Check } from 'lucide-react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { ListBlock } from '../../../../types/content-blocks';

interface ListBlockProps {
  block: ListBlock;
}

export function ListBlockComponent({ block }: ListBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);
  const items = getLocalizedValue(block.items_es, block.items_en);

  return (
    <div className="my-10">
      {title && (
        <h3 className="text-2xl font-light text-gray-900 mb-6">
          {title}
        </h3>
      )}
      
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed flex-1">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
