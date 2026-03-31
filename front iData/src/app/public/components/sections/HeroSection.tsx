import type { HomeSection, Language } from '../../../shared/types';
import { HomeHero } from '../hero/HomeHero';

interface HeroSectionProps {
  section: HomeSection;
  language: Language;
}

export function HeroSection({ section, language }: HeroSectionProps) {
  return (
    <HomeHero
      title={section.title}
      subtitle={section.subtitle || ''}
      primaryCtaLabel={section.ctaLabel || ''}
      primaryCtaHref={section.ctaHref || ''}
      secondaryCtaLabel={section.config?.secondaryCtaLabel}
      secondaryCtaHref={section.config?.secondaryCtaHref}
      categoryPills={section.config?.categoryPills}
      partnerLogos={section.config?.partnerLogos}
      bannerPanels={section.config?.bannerPanels}
    />
  );
}