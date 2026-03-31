import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Apple-style Liquid Glass Input Component
 * Provides consistent form input styling with glassmorphism effects
 */
export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'glass-input w-full px-4 py-2.5 text-gray-900 placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-[#4387DF]/30',
            error && 'border-red-400 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';
