import { Linkedin } from 'lucide-react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { SocialLinksBlock } from '../../../../types/content-blocks';

interface SocialLinksBlockProps {
  block: SocialLinksBlock;
}

export function SocialLinksBlockComponent({ block }: SocialLinksBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);

  return (
    <div className="my-10">
      {title && (
        <h3 className="text-xl font-light text-gray-900 mb-6 text-center">
          {title}
        </h3>
      )}
      
      <div className="flex justify-center gap-4">
        {block.networks.map((network, index) => {
          return (
            <a
              key={index}
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              aria-label="Follow on LinkedIn"
              title="Follow on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}