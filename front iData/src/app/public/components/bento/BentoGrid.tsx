import { ReactNode } from 'react';
import { cn } from '../../../shared/utils/cn';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Bento Grid Layout System
 * Creates a modular, Pinterest-style grid layout
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 w-full',
      className
    )}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: 'sm' | 'md' | 'lg' | 'full';
  background?: string;
  hover?: boolean;
}

/**
 * Bento Card Component
 * Individual card in the bento grid with customizable size
 */
export function BentoCard({ 
  children, 
  className, 
  span = 'md',
  background = 'bg-white',
  hover = true,
}: BentoCardProps) {
  const spanClasses = {
    sm: 'lg:col-span-4',
    md: 'lg:col-span-6',
    lg: 'lg:col-span-8',
    full: 'lg:col-span-12',
  };

  return (
    <div
      className={cn(
        'rounded-[24px] p-6 sm:p-8 border border-gray-200/60',
        background,
        hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        spanClasses[span],
        className
      )}
    >
      {children}
    </div>
  );
}