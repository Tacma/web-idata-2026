import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { SubtextBlock } from '../../../../types/content-blocks';

interface SubtextBlockProps {
  block: SubtextBlock;
}

export function SubtextBlockComponent({ block }: SubtextBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const text = getLocalizedValue(block.text_es, block.text_en);

  return (
    <div className="my-10">
      <p className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed italic border-l-4 border-purple-500 pl-6 py-2">
        {text}
      </p>
    </div>
  );
}
