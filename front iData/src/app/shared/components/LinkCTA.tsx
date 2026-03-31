import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface LinkCTAProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Link CTA Component - Consistent call-to-action links across the application
 * Follows the liquid glass design system with smooth animations
 */
export function LinkCTA({
  to,
  children,
  variant = 'text',
  size = 'md',
  className,
}: LinkCTAProps) {
  const baseClasses = 'inline-flex items-center gap-2 font-medium transition-all duration-250 group';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#4387DF] to-[#3575CC] text-white px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-100',
    secondary:
      'bg-white/80 backdrop-blur-sm text-[#4387DF] px-6 py-3 rounded-xl hover:bg-white hover:shadow-lg border border-white/60',
    text: 'text-[#4387DF] hover:gap-3',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
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
      {children}
      <ArrowRight
        className={cn(
          iconSizeClasses[size],
          'transition-transform duration-250 group-hover:translate-x-1'
        )}
      />
    </Link>
  );
}
