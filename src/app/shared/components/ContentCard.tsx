import { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface ContentCardProps {
  title: string;
  excerpt: string;
  href: string;
  linkLabel: string;
  image?: string;
  badge?: string;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export function ContentCard({
  title,
  excerpt,
  href,
  linkLabel,
  image,
  badge,
  variant = 'default',
  className,
}: ContentCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        'group relative glass-card overflow-hidden',
        isFeatured && 'glass-hover-glow',
        className
      )}
    >
      {image && (
        <div className={cn('overflow-hidden', isCompact ? 'h-40' : 'h-48')}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className={cn('p-6', isCompact && 'p-4')}>
        {badge && (
          <span className="glass-badge inline-block px-3 py-1 text-xs font-semibold text-[#4387DF] mb-3">
            {badge}
          </span>
        )}

        <h3
          className={cn(
            'font-semibold text-gray-900 mb-2 group-hover:text-[#4387DF] glass-transition',
            isFeatured ? 'text-2xl' : isCompact ? 'text-lg' : 'text-xl'
          )}
        >
          {title}
        </h3>

        <p className={cn('text-gray-600 mb-4 font-light', isCompact ? 'text-sm' : 'text-base')}>
          {excerpt}
        </p>

        <Link
          to={href}
          className="inline-flex items-center gap-2 text-[#4387DF] hover:text-[#3577cf] font-semibold text-sm group/link glass-transition-fast"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
