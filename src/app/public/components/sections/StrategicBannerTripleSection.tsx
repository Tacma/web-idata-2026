import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { HomeSection } from '../../../shared/types';

interface StrategicBannerTripleSectionProps {
  section: HomeSection;
}

interface BannerPanel {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
  accentColor?: string;
}

export function StrategicBannerTripleSection({ section }: StrategicBannerTripleSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const panels: BannerPanel[] = section.config?.panels || [];

  useEffect(() => {
    if (panels.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % panels.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [panels.length]);

  if (panels.length === 0) return null;

  const currentPanel = panels[currentIndex];

  return (
    <section className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card - Image with FIXED HEIGHT */}
          <div className="relative bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-3xl overflow-hidden shadow-xl h-[400px]">
            <img
              src={currentPanel.backgroundImage}
              alt={currentPanel.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>

          {/* Right Card - Text Content */}
          <div className="theme-glass-surface-strong flex flex-col justify-center rounded-3xl p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-light leading-tight tracking-tight text-[var(--glass-text-primary)] sm:text-3xl">
              {currentPanel.title}
            </h2>
            <p className="mb-6 text-sm font-light leading-relaxed text-[var(--glass-text-secondary)] sm:text-base">
              {currentPanel.description}
            </p>
            {currentPanel.ctaLabel && currentPanel.ctaHref && (
              <Link
                to={currentPanel.ctaHref}
                className="text-[#0088FF] font-medium hover:gap-3 inline-flex items-center gap-2 transition-all duration-250 group w-fit text-sm"
              >
                {currentPanel.ctaLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-250" />
              </Link>
            )}

            {/* Indicators */}
            {panels.length > 1 && (
              <div className="flex gap-2 mt-8">
                {panels.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-250 ${
                      index === currentIndex 
                        ? 'w-8 bg-[#0088FF]' 
                        : 'w-1.5 bg-gray-300 hover:bg-gray-400 dark:bg-slate-600 dark:hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
