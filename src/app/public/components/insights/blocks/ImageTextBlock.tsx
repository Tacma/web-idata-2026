import { ImageWithFallback } from '../../../../components/figma/ImageWithFallback';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { ImageTextBlock } from '../../../../types/content-blocks';

interface ImageTextBlockProps {
  block: ImageTextBlock;
}

export function ImageTextBlockComponent({ block }: ImageTextBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);
  const text = getLocalizedValue(block.text_es, block.text_en);
  const caption = getLocalizedValue(block.caption_es, block.caption_en);

  const isLeft = block.image_position === 'left';

  return (
    <div className="my-12">
      <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-start`}>
        {/* Image */}
        <div className="md:w-1/2">
          <div className="rounded-xl overflow-hidden">
            <ImageWithFallback
              src={block.image}
              alt={title}
              className="w-full h-auto"
            />
          </div>
          {caption && (
            <p className="text-sm text-gray-500 mt-2 italic">
              {caption}
            </p>
          )}
        </div>

        {/* Text */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            {title}
          </h3>
          <div 
            className="prose prose-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </div>
  );
}
