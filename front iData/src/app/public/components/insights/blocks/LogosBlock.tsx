import { ImageWithFallback } from '../../../../components/figma/ImageWithFallback';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { LogosBlock } from '../../../../types/content-blocks';

interface LogosBlockProps {
  block: LogosBlock;
}

export function LogosBlockComponent({ block }: LogosBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);

  return (
    <div className="my-12">
      {title && (
        <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
          {title}
        </h3>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
        {block.logos.map((logo, index) => {
          const altText = getLocalizedValue(logo.alt_text_es, logo.alt_text_en);
          
          const content = (
            <div className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <ImageWithFallback
                src={logo.image}
                alt={altText}
                className="w-full h-auto max-h-16 object-contain"
              />
            </div>
          );
          
          if (logo.url_optional) {
            return (
              <a
                key={index}
                href={logo.url_optional}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                {content}
              </a>
            );
          }
          
          return (
            <div key={index} className="flex items-center justify-center">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
