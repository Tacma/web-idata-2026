import { motion } from 'motion/react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface PreHeroContent {
  title_es: string;
  title_en: string;
  subtitle_es: string;
  subtitle_en: string;
  ctaPrimary_es: string;
  ctaPrimary_en: string;
  ctaSecondary_es: string;
  ctaSecondary_en: string;
}

interface PreHeroSectionProps {
  content?: PreHeroContent;
}

const defaultContent: PreHeroContent = {
  title_es: "Evoluciona de Datos a Inteligencia Empresarial",
  title_en: "Evolve from Data to Business Intelligence",
  subtitle_es: "Impulsamos la transformación tecnológica de organizaciones líderes con soluciones end-to-end en datos, analítica avanzada e inteligencia artificial.",
  subtitle_en: "We help organizations accelerate their technology maturity with end-to-end solutions in data, advanced analytics and artificial intelligence.",
  ctaPrimary_es: "Hablar con un Experto",
  ctaPrimary_en: "Talk to an Expert",
  ctaSecondary_es: "Ver Casos de Éxito",
  ctaSecondary_en: "View Case Studies",
};

export function PreHeroSection({ content = defaultContent }: PreHeroSectionProps) {
  const { language } = useLanguage();

  const title = language === 'es' ? content.title_es : content.title_en;

  return (
    <section className="relative pt-32 pb-8 px-6 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Main Title - Large, Bold, Clean - Centered */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-gray-900 mb-10 text-center mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1],
            delay: 0.1
          }}
        >
          {title}
        </motion.h1>

      </div>
    </section>
  );
}