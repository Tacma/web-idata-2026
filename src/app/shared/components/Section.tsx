import { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  transparent: 'bg-transparent',
};

const paddingClasses = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
};

export function Section({
  children,
  className,
  background = 'transparent',
  padding = 'lg',
}: SectionProps) {
  return (
    <section
      className={cn(backgroundClasses[background], paddingClasses[padding], className)}
    >
      {children}
    </section>
  );
}
