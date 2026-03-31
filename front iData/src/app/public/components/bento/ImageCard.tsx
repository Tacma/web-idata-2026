import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

interface ImageCardProps {
  title: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
  overlay?: boolean;
}

/**
 * Image Card - Large image with optional overlay text
 * Style: Modern, clean, with hover effects
 */
export function ImageCard({ 
  title, 
  image, 
  ctaLabel,
  ctaHref,
  overlay = true,
}: ImageCardProps) {
  const content = (
    <div className="relative w-full h-full min-h-[300px] rounded-[20px] overflow-hidden group">
      {/* Image */}
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      )}

      {/* Content Overlay */}
      {(title || ctaLabel) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
          <motion.h3
            className="text-2xl sm:text-3xl font-light mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h3>

          {ctaLabel && (
            <div className="flex items-center gap-2 text-sm font-medium mt-3 group-hover:gap-3 transition-all duration-300">
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (ctaHref) {
    return <Link to={ctaHref}>{content}</Link>;
  }

  return content;
}
