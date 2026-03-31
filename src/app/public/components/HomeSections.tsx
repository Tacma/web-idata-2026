import type { ReactNode } from 'react';
import type { HomeSection } from '../../shared/types';
import type { Language } from '../../shared/types';

// Import all section components
import { PreHeroSection } from './hero/PreHeroSection';
import { HeroSection } from './sections/HeroSection';
import { StrategicBannerTripleSection } from './sections/StrategicBannerTripleSection';
import { LogosSection } from './sections/LogosSection';
import { PartnersSection } from './sections/PartnersSection';
import { HomeMomentumSection } from './sections/HomeMomentumSection';
import { HomeWhyIDataSection } from './sections/HomeWhyIDataSection';
import { HomeCommercialTeamSection } from './sections/HomeCommercialTeamSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { CTABandSection } from './sections/CTABandSection';
import { StatsSection } from './sections/StatsSection';
import { CustomSection } from './sections/CustomSection';

interface HomeSectionRendererProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

function HomeSnapSection({ children }: { children: ReactNode }) {
  return (
    <div
      data-home-snap-section="true"
      className="relative flex min-h-screen items-center"
    >
      <div className="w-full">{children}</div>
    </div>
  );
}

export function HomeSectionRenderer({ section, language, getLocalizedValue }: HomeSectionRendererProps) {
  switch (section.type) {
    case 'preHero':
      return (
        <HomeSnapSection>
          <PreHeroSection content={section.content} />
        </HomeSnapSection>
      );
    
    case 'hero':
      return <HeroSection section={section} />;
    
    case 'strategicBannerTriple':
      return (
        <HomeSnapSection>
          <StrategicBannerTripleSection section={section} />
        </HomeSnapSection>
      );
    
    case 'logos':
      return (
        <HomeSnapSection>
          <LogosSection section={section} />
        </HomeSnapSection>
      );
    
    case 'partners':
      return (
        <>
          <PartnersSection section={section} />
          <HomeSnapSection>
            <HomeMomentumSection language={language} getLocalizedValue={getLocalizedValue} />
          </HomeSnapSection>
          <HomeSnapSection>
            <HomeWhyIDataSection language={language} />
          </HomeSnapSection>
          <HomeSnapSection>
            <HomeCommercialTeamSection language={language} />
          </HomeSnapSection>
        </>
      );
    
    case 'clients':
    case 'maturityJourney':
    case 'serviceHighlights':
    case 'industryHighlights':
    case 'caseHighlights':
    case 'insightsEditorial':
      return null;
    
    case 'testimonials':
      return (
        <HomeSnapSection>
          <TestimonialsSection section={section} language={language} getLocalizedValue={getLocalizedValue} />
        </HomeSnapSection>
      );
    
    case 'ctaBand':
      return <CTABandSection section={section} />;
    
    case 'stats':
      return (
        <HomeSnapSection>
          <StatsSection section={section} />
        </HomeSnapSection>
      );
    
    case 'custom':
      return (
        <HomeSnapSection>
          <CustomSection section={section} />
        </HomeSnapSection>
      );
    
    default:
      return null;
  }
}
