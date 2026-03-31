import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/cn';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'light' | 'medium' | 'heavy' | 'card';
  hover?: 'lift' | 'scale' | 'glow' | 'none';
  as?: 'div' | 'section' | 'article' | 'aside';
}

/**
 * Apple-style Liquid Glass Card Component
 * Provides consistent glassmorphism effect across the application
 */
export function GlassCard({
  children,
  variant = 'card',
  hover = 'lift',
  as: Component = 'div',
  className,
  ...props
}: GlassCardProps) {
  const variantClasses = {
    light: 'glass-light',
    medium: 'glass-medium',
    heavy: 'glass-heavy',
    card: 'glass-card',
  };

  const hoverClasses = {
    lift: 'glass-hover-lift',
    scale: 'glass-hover-scale',
    glow: 'glass-hover-glow',
    none: '',
  };

  return (
    <Component
      className={cn(
        variantClasses[variant],
        hoverClasses[hover],
        'glass-transition',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
