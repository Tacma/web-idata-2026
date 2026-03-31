import { ReactNode } from 'react';
import { FileText, Clock } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  articleCount?: number;
  readTime?: string;
}

/**
 * Feature Card - Vertical card with icon/image
 * Style: Clean, minimal, with metadata
 */
export function FeatureCard({ 
  title, 
  description, 
  icon,
  image,
  articleCount,
  readTime,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-base font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Metadata */}
      {(articleCount || readTime) && (
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          {articleCount && (
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>{articleCount} articles</span>
            </div>
          )}
          {readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="mt-auto">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-contain"
          />
        </div>
      )}

      {/* Icon */}
      {icon && !image && (
        <div className="mt-auto flex items-center justify-center h-48">
          {icon}
        </div>
      )}
    </div>
  );
}
