import type { HomeSection } from '../../../shared/types';
import { HomeHero } from '../hero/HomeHero';

interface HeroSectionProps {
  section: HomeSection;
}

export function HeroSection({ section }: HeroSectionProps) {
  return (
    <HomeHero
      title={section.title}
      subtitle={section.subtitle || ''}
      primaryCtaLabel={section.ctaLabel || ''}
      primaryCtaHref={section.ctaHref || ''}
      secondaryCtaLabel={section.config?.secondaryCtaLabel}
      secondaryCtaHref={section.config?.secondaryCtaHref}
      eyebrow={section.config?.eyebrow}
      marqueeLogos={section.config?.marqueeLogos}
      marqueeDurationSeconds={section.config?.marqueeDurationSeconds}
    />
  );
}
