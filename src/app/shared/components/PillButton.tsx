import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface PillButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'white';
  className?: string;
}

/**
 * PillButton Component - Rounded pill-style button with liquid glass effect
 * Used for primary CTAs and navigation buttons
 */
export function PillButton({
  to,
  children,
  variant = 'glass',
  className,
}: PillButtonProps) {
  const baseClasses =
    'group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:gap-4';

  const variantStyles = {
    glass: {
      className: 'text-gray-900 border border-white/30',
      style: {
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
      },
    },
    solid: {
      className: 'bg-white text-[#4387DF] hover:bg-white/95 hover:shadow-2xl hover:scale-[1.02] active:scale-100',
      style: {},
    },
    white: {
      className: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20',
      style: {},
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <Link
      to={to}
      className={cn(baseClasses, currentVariant.className, className)}
      style={currentVariant.style}
    >
      <span>{children}</span>
      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
