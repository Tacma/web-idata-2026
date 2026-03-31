import { Link } from 'react-router';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import type { ButtonsBlock } from '../../../../types/content-blocks';

interface ButtonsBlockProps {
  block: ButtonsBlock;
}

export function ButtonsBlockComponent({ block }: ButtonsBlockProps) {
  const { getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(block.title_es, block.title_en);

  return (
    <div className="my-10">
      {title && (
        <h3 className="text-xl font-light text-gray-900 mb-6 text-center">
          {title}
        </h3>
      )}
      
      <div className="flex flex-wrap justify-center gap-4">
        {block.buttons.map((button, index) => {
          const label = getLocalizedValue(button.label_es, button.label_en);
          const isPrimary = button.style_variant === 'primary';
          
          return (
            <Link
              key={index}
              to={button.url}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                isPrimary
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
