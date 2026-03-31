import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { EmbedBlock } from '../../../../types/content-blocks';

interface EmbedBlockProps {
  block: EmbedBlock;
}

export function EmbedBlockComponent({ block }: EmbedBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);
  const caption = getLocalizedValue(block.caption_es, block.caption_en);

  return (
    <div className="my-12">
      {title && (
        <h3 className="text-2xl font-light text-gray-900 mb-6">
          {title}
        </h3>
      )}
      
      <div className="rounded-xl overflow-hidden bg-gray-100 shadow-md">
        <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
          <iframe
            src={block.embed_url}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      
      {caption && (
        <p className="text-sm text-gray-500 mt-3 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
}
