import { useLanguage } from '../../../shared/contexts/LanguageContext';
import heroImage from '/assets/images/hero/insights.png';
import { InternalPageHero } from '../InternalPageHero';

export function InsightsHero() {
  const { language } = useLanguage();

  return (
    <InternalPageHero
      eyebrow={language === 'es' ? 'Insights' : 'Insights'}
      title="Insights"
      description={
        language === 'es'
          ? 'Ideas, tendencias y experiencias sobre datos, analítica e inteligencia artificial.'
          : 'Ideas, trends and experiences about data, analytics and artificial intelligence.'
      }
      imageSrc={heroImage}
      imageAlt="Insights"
    />
  );
}
