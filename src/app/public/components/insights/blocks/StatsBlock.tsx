import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { StatsBlock } from '../../../../types/content-blocks';

interface StatsBlockProps {
  block: StatsBlock;
}

export function StatsBlockComponent({ block }: StatsBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);

  return (
    <div className="my-12">
      {title && (
        <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
          {title}
        </h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {block.stats.map((stat, index) => {
          const label = getLocalizedValue(stat.label_es, stat.label_en);
          const description = getLocalizedValue(stat.description_es, stat.description_en);
          
          return (
            <div 
              key={index} 
              className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50"
            >
              <p className="text-4xl md:text-5xl font-light text-purple-600 mb-3">
                {stat.value}
              </p>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {label}
              </p>
              {description && (
                <p className="text-sm text-gray-600">
                  {description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
