import { Download } from 'lucide-react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { DownloadBlock } from '../../../../types/content-blocks';

interface DownloadBlockProps {
  block: DownloadBlock;
}

export function DownloadBlockComponent({ block }: DownloadBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);
  const buttonLabel = getLocalizedValue(block.button_label_es, block.button_label_en);
  const description = getLocalizedValue(block.description_es, block.description_en);

  return (
    <div className="my-10">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600">
                {description}
              </p>
            )}
          </div>
          
          <a
            href={block.file_url}
            download
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl flex-shrink-0"
          >
            <Download className="w-5 h-5" />
            {buttonLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
