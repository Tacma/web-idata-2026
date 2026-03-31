import type { HomeSection } from '../../shared/types';
import type { Language } from '../../shared/types';

// Import all section components
import { PreHeroSection } from './hero/PreHeroSection';
import { HeroSection } from './sections/HeroSection';
import { StrategicBannerTripleSection } from './sections/StrategicBannerTripleSection';
import { LogosSection } from './sections/LogosSection';
import { PartnersSection } from './sections/PartnersSection';
import { ClientsSection } from './sections/ClientsSection';
import { MaturityJourneySection } from './sections/MaturityJourneySection';
import { ServiceHighlightsSection } from './sections/ServiceHighlightsSection';
import { IndustryHighlightsSection } from './sections/IndustryHighlightsSection';
import { CaseHighlightsSection } from './sections/CaseHighlightsSection';
import { InsightsEditorialSection } from './sections/InsightsEditorialSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { CTABandSection } from './sections/CTABandSection';
import { StatsSection } from './sections/StatsSection';
import { CustomSection } from './sections/CustomSection';

interface HomeSectionRendererProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

export function HomeSectionRenderer({ section, language, getLocalizedValue }: HomeSectionRendererProps) {
  switch (section.type) {
    case 'preHero':
      return <PreHeroSection content={section.content} />;
    
    case 'hero':
      return <HeroSection section={section} language={language} />;
    
    case 'strategicBannerTriple':
      return <StrategicBannerTripleSection section={section} />;
    
    case 'logos':
      return <LogosSection section={section} />;
    
    case 'partners':
      return <PartnersSection section={section} />;
    
    case 'clients':
      return <ClientsSection section={section} />;
    
    case 'maturityJourney':
      return <MaturityJourneySection section={section} />;
    
    case 'serviceHighlights':
      return <ServiceHighlightsSection section={section} language={language} getLocalizedValue={getLocalizedValue} />;
    
    case 'industryHighlights':
      return <IndustryHighlightsSection section={section} language={language} getLocalizedValue={getLocalizedValue} />;
    
    case 'caseHighlights':
      return <CaseHighlightsSection section={section} language={language} getLocalizedValue={getLocalizedValue} />;
    
    case 'insightsEditorial':
      return <InsightsEditorialSection section={section} language={language} getLocalizedValue={getLocalizedValue} />;
    
    case 'testimonials':
      return <TestimonialsSection section={section} language={language} getLocalizedValue={getLocalizedValue} />;
    
    case 'ctaBand':
      return <CTABandSection section={section} language={language} />;
    
    case 'stats':
      return <StatsSection section={section} />;
    
    case 'custom':
      return <CustomSection section={section} />;
    
    default:
      return null;
  }
}