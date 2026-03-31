import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { TextBlock } from '../../../../types/content-blocks';

interface TextBlockProps {
  block: TextBlock;
}

export function TextBlockComponent({ block }: TextBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);
  const text = getLocalizedValue(block.text_es, block.text_en);

  return (
    <div className="my-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
          {title}
        </h2>
      )}
      <div 
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
