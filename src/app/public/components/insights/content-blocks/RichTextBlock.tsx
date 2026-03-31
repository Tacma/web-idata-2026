import { motion } from 'motion/react';
import type { RichTextBlock as RichTextBlockType } from '../../../../types/contentBlocks';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';

interface RichTextBlockProps {
  block: RichTextBlockType;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
  const { getLocalizedValue } = useLanguage();
  const content = getLocalizedValue(block.content_es, block.content_en);

  return (
    <motion.div
      className="prose prose-lg max-w-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </motion.div>
  );
}
