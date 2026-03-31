import { ImageWithFallback } from '../../../../components/figma/ImageWithFallback';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { ImageBlock } from '../../../../types/content-blocks';

interface ImageBlockProps {
  block: ImageBlock;
}

export function ImageBlockComponent({ block }: ImageBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const altText = getLocalizedValue(block.alt_text_es, block.alt_text_en);
  const caption = getLocalizedValue(block.caption_es, block.caption_en);

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-full',
  };

  return (
    <div className="my-10">
      <div className={`mx-auto ${sizeClasses[block.size_variant]}`}>
        <div className="rounded-xl overflow-hidden">
          <ImageWithFallback
            src={block.image}
            alt={altText}
            className="w-full h-auto"
          />
        </div>
        {caption && (
          <p className="text-sm text-gray-500 mt-3 text-center italic">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
