import { BannerCarousel } from './BannerCarousel';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface HomeHeroProps {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  categoryPills?: string[];
  bannerPanels?: Array<{
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    backgroundImage: string;
    accentColor?: string;
  }>;
}

/**
 * Hero section with modern banner carousel
 * Style: Liquid wipe animation with bold typography
 */
export function HomeHero({
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  bannerPanels = [],
}: HomeHeroProps) {
  const { language } = useLanguage();

  // Default slides with vibrant colors
  const defaultSlides = [
    {
      id: '1',
      number: '01',
      title: 'Soluciones Tecnológicas Empresariales',
      bigText: 'INNOVATE',
      subtitle: 'Transformamos tu negocio con tecnología de punta y soluciones personalizadas que impulsan el crecimiento',
      backgroundColor: '#0088FF', // Azul vibrante
    },
    {
      id: '2',
      number: '02',
      title: 'Desarrollo de Software a Medida',
      bigText: 'CREATE',
      subtitle: 'Construimos aplicaciones robustas y escalables que se adaptan perfectamente a las necesidades de tu empresa',
      backgroundColor: '#8E32F5', // Morado corporativo
    },
    {
      id: '3',
      number: '03',
      title: 'Consultoría en Transformación Digital',
      bigText: 'TRANSFORM',
      subtitle: 'Te acompañamos en cada paso hacia la digitalización completa de tus procesos empresariales',
      backgroundColor: '#00C896', // Verde turquesa
    },
  ];

  // Convert bannerPanels to slides format if provided
  const slides = bannerPanels.length > 0
    ? bannerPanels.map((panel, index) => ({
        id: `slide-${index}`,
        number: `0${index + 1}`,
        title: panel.title,
        bigText: panel.title.split(' ')[0].toUpperCase(),
        subtitle: panel.description,
        backgroundColor: panel.accentColor || '#0088FF',
        ctaLabel: panel.ctaLabel,
        ctaHref: panel.ctaHref,
      }))
    : defaultSlides;

  return (
    <section className="px-6 sm:px-8 lg:px-12 pb-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Banner Container with Rounded Corners */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-6">
          <BannerCarousel slides={slides} autoplayInterval={5000} />
        </div>

        {/* CTA Cards Row - Below Banner - Full Width */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1],
            delay: 0.5
          }}
        >
          {/* Primary CTA Card */}
          <a
            href={`/${language}/${language === 'es' ? 'contacto' : 'contact'}/`}
            className="group relative bg-white/70 backdrop-blur-lg rounded-2xl p-3 sm:p-5 border border-gray-200/60 hover:border-blue-300/60 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex items-center justify-center"
          >
            {/* Hover gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/10 group-hover:to-blue-600/10 transition-all duration-500" />
            
            <div className="relative w-full">
              <h3 className="text-sm sm:text-lg font-light text-gray-900 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <span className="hidden sm:inline">
                  {language === 'es' ? 'Hablar con un Experto' : 'Talk to an Expert'}
                </span>
                <span className="sm:hidden">
                  {language === 'es' ? 'Hablar con Experto' : 'Talk to Expert'}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mt-2 hidden sm:block">
                {language === 'es' 
                  ? 'Descubre cómo podemos acelerar tu transformación digital'
                  : 'Discover how we can accelerate your digital transformation'
                }
              </p>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </a>

          {/* Secondary CTA Card */}
          <a
            href={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/`}
            className="group relative bg-white/70 backdrop-blur-lg rounded-2xl p-3 sm:p-5 border border-gray-200/60 hover:border-purple-300/60 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex items-center justify-center"
          >
            {/* Hover gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/10 group-hover:to-purple-600/10 transition-all duration-500" />
            
            <div className="relative w-full">
              <h3 className="text-sm sm:text-lg font-light text-gray-900 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <span className="hidden sm:inline">
                  {language === 'es' ? 'Ver Casos de Éxito' : 'View Case Studies'}
                </span>
                <span className="sm:hidden">
                  {language === 'es' ? 'Casos de Éxito' : 'Case Studies'}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mt-2 hidden sm:block">
                {language === 'es' 
                  ? 'Conoce historias de éxito de nuestros clientes'
                  : 'Explore success stories from our clients'
                }
              </p>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}