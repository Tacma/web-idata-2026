import { motion } from 'motion/react';
import type { HeaderImageBlock as HeaderImageBlockType } from '../../../../types/contentBlocks';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../../components/figma/ImageWithFallback';

interface HeaderImageBlockProps {
  block: HeaderImageBlockType;
}

export function HeaderImageBlock({ block }: HeaderImageBlockProps) {
  const { getLocalizedValue } = useLanguage();
  const altText = getLocalizedValue(block.altText_es, block.altText_en);
  const caption = getLocalizedValue(block.caption_es, block.caption_en);

  return (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-xl overflow-hidden">
        <ImageWithFallback
          src={block.image}
          alt={altText}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <p className="text-sm text-gray-500 mt-2 text-center font-light italic">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
