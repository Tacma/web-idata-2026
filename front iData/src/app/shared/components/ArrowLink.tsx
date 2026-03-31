import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface ArrowLinkProps {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'white' | 'purple' | 'glass';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * ArrowLink Component - Consistent arrow links with expanding gap animation
 * Used for CTAs across sections maintaining liquid glass aesthetic
 */
export function ArrowLink({
  to,
  children,
  variant = 'default',
  size = 'md',
  className,
}: ArrowLinkProps) {
  const baseClasses = 'group inline-flex items-center gap-2 font-medium transition-all duration-300 hover:gap-3 relative';

  const variantClasses = {
    default: 'text-gray-900',
    white: 'text-white',
    purple: 'text-[#8E32F5]',
    glass: 'text-blue-600',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  };

  const underlineColorClasses = {
    default: 'bg-gray-900',
    white: 'bg-white',
    purple: 'bg-[#8E32F5]',
    glass: 'bg-blue-600',
  };

  return (
    <Link
      to={to}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      <span className="relative">
        {children}
        {/* Animated underline */}
        <span 
          className={cn(
            'absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full',
            underlineColorClasses[variant]
          )}
        />
      </span>
      <ArrowRight
        className={cn(
          iconSizeClasses[size],
          'transition-transform duration-300 group-hover:translate-x-1'
        )}
      />
    </Link>
  );
}