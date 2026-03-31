import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ExternalLink, Download, Quote as QuoteIcon, Linkedin, TrendingUp } from 'lucide-react';
import type { ContentBlock } from '../../../../types/contentBlocks';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import { ImageWithFallback } from '../../../../components/figma/ImageWithFallback';

// Export individual block components
export { HeaderImageBlock } from './HeaderImageBlock';
export { RichTextBlock } from './RichTextBlock';

// Image + Text Block
export function ImageTextBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  
  const title = getLocalizedValue(block.title_es, block.title_en);
  const text = getLocalizedValue(block.text_es, block.text_en);
  const caption = getLocalizedValue(block.caption_es, block.caption_en);
  
  return (
    <motion.div
      className={`flex flex-col ${block.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 my-12`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="md:w-1/2">
        <div className="rounded-xl overflow-hidden">
          <ImageWithFallback src={block.image} alt={title} className="w-full h-auto" />
        </div>
        {caption && (
          <p className="text-sm text-gray-500 mt-2 font-light italic">{caption}</p>
        )}
      </div>
      <div className="md:w-1/2 flex flex-col justify-center">
        <h3 className="text-2xl font-light text-gray-900 mb-4">{title}</h3>
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </motion.div>
  );
}

// Image Only Block
export function ImageOnlyBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  
  const altText = getLocalizedValue(block.altText_es, block.altText_en);
  const caption = getLocalizedValue(block.caption_es, block.caption_en);
  
  const sizeClasses = {
    full: 'w-full',
    medium: 'max-w-4xl mx-auto',
    contained: 'max-w-2xl mx-auto'
  };
  
  return (
    <motion.div
      className={`my-8 ${sizeClasses[block.sizeVariant]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-xl overflow-hidden">
        <ImageWithFallback src={block.image} alt={altText} className="w-full h-auto" />
      </div>
      {caption && (
        <p className="text-sm text-gray-500 mt-2 text-center font-light italic">{caption}</p>
      )}
    </motion.div>
  );
}

// Logo Strip Block
export function LogoStripBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  const title = getLocalizedValue(block.sectionTitle_es, block.sectionTitle_en);
  
  return (
    <motion.div
      className="my-12 py-8 bg-gray-50 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title && <h3 className="text-xl font-light text-gray-900 mb-6 text-center">{title}</h3>}
      <div className="flex flex-wrap items-center justify-center gap-8 px-6">
        {block.logos.map((logo: any, index: number) => {
          const alt = getLocalizedValue(logo.altText_es, logo.altText_en);
          const content = (
            <ImageWithFallback
              key={index}
              src={logo.image}
              alt={alt}
              className="h-8 md:h-10 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            />
          );
          
          return logo.link ? (
            <a key={index} href={logo.link} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          ) : content;
        })}
      </div>
    </motion.div>
  );
}

// Links List Block
export function LinksListBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  const title = getLocalizedValue(block.sectionTitle_es, block.sectionTitle_en);
  
  return (
    <motion.div
      className="my-8 p-6 bg-gray-50 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-light text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {block.items.map((item: any, index: number) => {
          const label = getLocalizedValue(item.label_es, item.label_en);
          const description = getLocalizedValue(item.description_es, item.description_en);
          
          return (
            <li key={index}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium group"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{label}</span>
              </a>
              {description && (
                <p className="text-sm text-gray-600 mt-1 ml-6">{description}</p>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

// Bullet List Block
export function BulletListBlock({ block }: { block: any }) {
  const { language, getLocalizedValue } = useLanguage();
  const title = getLocalizedValue(block.sectionTitle_es, block.sectionTitle_en);
  const items = language === 'es' ? block.items_es : block.items_en;
  
  return (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title && <h3 className="text-xl font-light text-gray-900 mb-4">{title}</h3>}
      <ul className="space-y-3 ml-6">
        {items.map((item: string, index: number) => (
          <li key={index} className="flex items-start gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
            <span className="text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// Quote Block
export function QuoteBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  const quote = getLocalizedValue(block.quote_es, block.quote_en);
  const authorRole = getLocalizedValue(block.authorRole_es, block.authorRole_en);
  
  return (
    <motion.div
      className="my-12 py-8 px-6 md:px-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-l-4 border-purple-600"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <QuoteIcon className="w-10 h-10 text-purple-600 mb-4 opacity-50" />
      <blockquote className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed mb-4">
        "{quote}"
      </blockquote>
      {block.authorName && (
        <div className="text-gray-700">
          <p className="font-medium">{block.authorName}</p>
          {authorRole && <p className="text-sm text-gray-600">{authorRole}</p>}
        </div>
      )}
    </motion.div>
  );
}

// Stats Block
export function StatsBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  const title = getLocalizedValue(block.sectionTitle_es, block.sectionTitle_en);
  
  return (
    <motion.div
      className="my-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title && <h3 className="text-xl font-light text-gray-900 mb-8 text-center">{title}</h3>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {block.stats.map((stat: any, index: number) => {
          const label = getLocalizedValue(stat.label_es, stat.label_en);
          const description = getLocalizedValue(stat.description_es, stat.description_en);
          
          return (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
                <div className="text-4xl font-light text-purple-600">{stat.value}</div>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{label}</h4>
              {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// CTA Banner Block
export function CTABannerBlock({ block }: { block: any }) {
  const { language, getLocalizedValue } = useLanguage();
  
  const title = getLocalizedValue(block.title_es, block.title_en);
  const text = getLocalizedValue(block.text_es, block.text_en);
  const buttonLabel = getLocalizedValue(block.buttonLabel_es, block.buttonLabel_en);
  const buttonUrl = language === 'es' ? block.buttonUrl_es : block.buttonUrl_en;
  
  return (
    <motion.div
      className="my-12 relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {block.backgroundImage && (
        <div className="absolute inset-0">
          <ImageWithFallback
            src={block.backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      )}
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-8 md:p-12 text-white">
        <h3 className="text-2xl md:text-3xl font-light mb-4">{title}</h3>
        <p className="text-lg mb-6 text-white/90">{text}</p>
        <Link
          to={buttonUrl}
          className="inline-block bg-white text-purple-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
        >
          {buttonLabel}
        </Link>
      </div>
    </motion.div>
  );
}

// Two Column Text Block
export function TwoColumnTextBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  
  const title = getLocalizedValue(block.title_es, block.title_en);
  const leftContent = getLocalizedValue(block.leftContent_es, block.leftContent_en);
  const rightContent = getLocalizedValue(block.rightContent_es, block.rightContent_en);
  
  return (
    <motion.div
      className="my-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title && <h3 className="text-2xl font-light text-gray-900 mb-6">{title}</h3>}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: leftContent }} />
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: rightContent }} />
      </div>
    </motion.div>
  );
}

// Divider Block
export function DividerBlock({ block }: { block: any }) {
  if (block.styleVariant === 'space') {
    return <div className="my-12" />;
  }
  
  if (block.styleVariant === 'subtle_graphic') {
    return (
      <div className="my-12 flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-600 opacity-30" />
          <div className="w-2 h-2 rounded-full bg-purple-600 opacity-50" />
          <div className="w-2 h-2 rounded-full bg-purple-600 opacity-30" />
        </div>
      </div>
    );
  }
  
  return <hr className="my-12 border-gray-200" />;
}

// Download Block
export function DownloadBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  
  const title = getLocalizedValue(block.title_es, block.title_en);
  const description = getLocalizedValue(block.description_es, block.description_en);
  const buttonLabel = getLocalizedValue(block.buttonLabel_es, block.buttonLabel_en);
  
  return (
    <motion.div
      className="my-8 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-start gap-4">
        <Download className="w-8 h-8 text-purple-600 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900 mb-2">{title}</h4>
          {description && <p className="text-gray-600 mb-4">{description}</p>}
          <a
            href={block.fileUrl}
            download
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            {buttonLabel}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// Author Box Block
export function AuthorBoxBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  
  const authorRole = getLocalizedValue(block.authorRole_es, block.authorRole_en);
  const bio = getLocalizedValue(block.bio_es, block.bio_en);
  
  return (
    <motion.div
      className="my-12 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {block.authorPhoto && (
          <ImageWithFallback
            src={block.authorPhoto}
            alt={block.authorName}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h4 className="text-xl font-light text-gray-900 mb-1">{block.authorName}</h4>
          {authorRole && <p className="text-sm text-purple-600 mb-3">{authorRole}</p>}
          <p className="text-gray-700 leading-relaxed mb-4">{bio}</p>
          {block.linkedinUrl && (
            <a
              href={block.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Embed Block (simplified - for YouTube, Vimeo, etc.)
export function EmbedBlock({ block }: { block: any }) {
  const { getLocalizedValue } = useLanguage();
  
  const title = getLocalizedValue(block.title_es, block.title_en);
  const caption = getLocalizedValue(block.caption_es, block.caption_en);
  
  return (
    <motion.div
      className="my-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title && <h3 className="text-xl font-light text-gray-900 mb-4">{title}</h3>}
      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
        <iframe
          src={block.embedUrl}
          className="w-full h-full"
          allowFullScreen
          title={title || 'Embedded content'}
        />
      </div>
      {caption && <p className="text-sm text-gray-500 mt-2 text-center font-light italic">{caption}</p>}
    </motion.div>
  );
}
