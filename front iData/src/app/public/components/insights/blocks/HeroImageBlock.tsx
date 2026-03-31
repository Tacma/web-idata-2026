import { ImageWithFallback } from '../../../../components/figma/ImageWithFallback';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { HeroImageBlock } from '../../../../types/content-blocks';

interface HeroImageBlockProps {
  block: HeroImageBlock;
}

export function HeroImageBlockComponent({ block }: HeroImageBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const altText = getLocalizedValue(block.alt_text_es, block.alt_text_en);
  const caption = getLocalizedValue(block.caption_es, block.caption_en);

  return (
    <div className="my-12">
      <div className="rounded-2xl overflow-hidden">
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
  );
}
