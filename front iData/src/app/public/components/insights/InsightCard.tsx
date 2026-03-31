import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface InsightCardProps {
  title: string;
  description: string;
  link: string;
  image?: string;
  variant?: 'featured' | 'compact';
  language?: 'es' | 'en';
}

/**
 * InsightCard Component
 * Editorial card for blog articles with featured and compact variants
 */
export function InsightCard({
  title,
  description,
  link,
  image,
  variant = 'compact',
  language = 'es',
}: InsightCardProps) {
  const ctaText = language === 'es' ? 'Leer artículo' : 'Read article';

  if (variant === 'featured') {
    return (
      <Link
        to={link}
        className="group block h-full min-h-[500px] rounded-2xl overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      >
        {/* Background Image */}
        {image && (
          <div className="absolute inset-0">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/20" />

        {/* Content */}
        <div className="relative h-full p-8 flex flex-col justify-end">
          <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">
            {title}
          </h3>

          <p className="text-white/90 text-base font-light leading-relaxed mb-6 max-w-2xl">
            {description}
          </p>

          {/* CTA */}
          <div className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all duration-300">
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  }

  // Compact variant
  return (
    <Link
      to={link}
      className="group block h-full rounded-2xl p-6 bg-white/60 border border-gray-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300/60"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* CTA */}
        <div className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}