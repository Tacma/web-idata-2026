import { Link } from 'react-router';
import { cn } from '../utils/cn';

interface TextLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

/**
 * TextLink Component - Consistent text links with animated underline
 * Used in navigation menus and inline CTAs across the application
 * Follows the liquid glass design system with smooth animations
 */
export function TextLink({
  to,
  children,
  className,
  isActive = false,
}: TextLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'relative text-[15px] font-medium transition-colors duration-300 group py-2 inline-block',
        isActive ? 'text-[#0088FF]' : 'text-gray-700 hover:text-gray-900',
        className
      )}
    >
      {children}
      {/* Animated underline - Purple on hover, Blue when active */}
      <span 
        className={cn(
          'absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out',
          isActive 
            ? 'w-full bg-[#0088FF]' 
            : 'w-0 bg-[#8E32F5] group-hover:w-full'
        )} 
      />
    </Link>
  );
}
