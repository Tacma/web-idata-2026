import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { getAlternateLanguage } from '../../shared/utils/i18n';
import { mockHomeSections } from '../../data/mockData';
import { HomeSectionRenderer } from '../components/HomeSections';

export function Home() {
  const { language, getLocalizedValue } = useLanguage();
  const alternateLanguage = getAlternateLanguage(language);

  // Get sections for current language
  const sections = mockHomeSections
    .filter(section => section.language === language && section.isEnabled)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <SEOHead
        title={language === 'es' ? 'iData - Transformación Digital y Data Analytics | Consultoría Empresarial' : 'iData - Digital Transformation & Data Analytics | Enterprise Consulting'}
        description={language === 'es' 
          ? 'Impulsamos la transformación tecnológica de organizaciones líderes con soluciones end-to-end en datos, analítica avanzada e inteligencia artificial. Partner estratégico en madurez analítica.'
          : 'We drive technological transformation for leading organizations with end-to-end solutions in data, advanced analytics, and artificial intelligence. Strategic partner in analytical maturity.'
        }
        canonical={`/${language}/`}
        alternateES="/es/"
        alternateEN="/en/"
        language={language}
      />

      <div className="min-h-screen">
        {sections.map((section) => (
          <HomeSectionRenderer 
            key={section.id}
            section={section}
            language={language}
            getLocalizedValue={getLocalizedValue}
          />
        ))}
      </div>
    </>
  );
}