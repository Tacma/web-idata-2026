import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../utils/cn';

interface ThemeToggleProps {
  className?: string;
  language?: 'es' | 'en';
}

export function ThemeToggle({ className, language = 'en' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  const ariaLabel = isDark
    ? language === 'es'
      ? 'Activar modo claro'
      : 'Switch to light mode'
    : language === 'es'
      ? 'Activar modo oscuro'
      : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      aria-pressed={isDark}
      title={ariaLabel}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300',
        'border-[var(--theme-toggle-border)] bg-[var(--theme-toggle-bg)] text-[var(--theme-toggle-text)]',
        'shadow-[0_8px_30px_rgba(8,15,30,0.08)] hover:scale-[1.02] hover:border-[var(--theme-toggle-border-hover)] hover:bg-[var(--theme-toggle-bg-hover)]',
        'focus:outline-none focus:ring-2 focus:ring-[#4387DF]/35',
        className
      )}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          className={cn(
            'absolute h-[18px] w-[18px] transition-all duration-300',
            isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          )}
        />
        <Moon
          className={cn(
            'absolute h-[18px] w-[18px] transition-all duration-300',
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
          )}
        />
      </span>
    </button>
  );
}
