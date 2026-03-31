import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/cn';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * Apple-style Liquid Glass Button Component
 * Provides consistent button styling with glassmorphism effects
 */
export function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: GlassButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold glass-transition glass-active-press glass-hover-scale';

  const variantClasses = {
    primary: 'bg-[#4387DF] hover:bg-[#3577cf] text-white glass-shadow-md hover:glass-shadow-lg glass-radius-md',
    secondary: 'bg-gray-900 hover:bg-gray-800 text-white glass-shadow-md hover:glass-shadow-lg glass-radius-md',
    glass: 'glass-button',
    outline: 'glass-border bg-transparent text-[var(--glass-text-primary)] hover:bg-white/30 dark:hover:bg-white/10 glass-radius-md glass-transition',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-2.5 text-base gap-2',
    lg: 'px-8 py-3.5 text-lg gap-2.5',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
