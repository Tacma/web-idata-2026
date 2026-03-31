import { useLocation } from 'react-router';
import { SEO, buildCanonicalUrl, buildAlternateUrl, getAlternateLanguage } from '../../utils/seo';
import { getLanguageFromPath } from '../../utils/i18n';
import type { Language } from '../../types';
import { mockCollections } from '../../data/mockData';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);
  
  // Get home sections for this language
  const homeSections = mockCollections.homeSections
    .filter(section => section.language === language && section.isEnabled)
    .sort((a, b) => a.order - b.order);

  const alternateLang = getAlternateLanguage(language);
  const canonicalUrl = buildCanonicalUrl(`/${language}/`);
  const alternateUrl = buildAlternateUrl(location.pathname, alternateLang);

  const title = language === 'es' 
    ? 'iData - Transformamos Datos en Valor'
    : 'iData - We Transform Data into Value';
  const description = language === 'es'
    ? 'Soluciones enterprise de datos y analítica para empresas globales'
    : 'Enterprise data and analytics solutions for global companies';

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonicalUrl}
        language={language}
        alternateLanguage={alternateLang}
        alternateUrl={alternateUrl}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        {homeSections.map((section) => {
          switch (section.type) {
            case 'hero':
              return <HeroSection key={section.id} section={section} language={language} />;
            case 'strategicBannerTriple':
              return <RotatingBannerSection key={section.id} section={section} language={language} />;
            default:
              return null;
          }
        })}
      </div>
    </>
  );
}

function HeroSection({ section, language }: { section: any; language: Language }) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card - Text Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              {section.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              {section.subtitle}
            </p>
            {section.ctaLabel && section.ctaHref && (
              <div>
                <a
                  href={section.ctaHref}
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-250 group"
                >
                  {section.ctaLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-250" />
                </a>
              </div>
            )}
          </div>

          {/* Right Card - Large Image with Gradient */}
          <div className="relative bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 rounded-3xl overflow-hidden shadow-xl min-h-[500px] lg:min-h-[600px]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1679639539537-0d2e452890f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhaW4lMjAzZCUyMHJlbmRlcnxlbnwxfHx8fDE3NzI1NTk3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AI Brain Technology"
                className="w-full h-full object-cover opacity-90 mix-blend-overlay"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-blue-500/30 to-purple-600/30" />
            <div className="relative h-full flex flex-col justify-end p-8 sm:p-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl sm:text-3xl text-white mb-3 leading-tight">
                  {language === 'es' 
                    ? 'Innova con Datos, Eleva tu Negocio' 
                    : 'Innovate with Data, Elevate Your Business'}
                </h2>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {language === 'es'
                    ? 'Descubre el potencial ilimitado de tus datos con soluciones enterprise que convergen tecnología de vanguardia.'
                    : 'Discover unlimited potential in your data with enterprise solutions that converge cutting-edge technology.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RotatingBannerSection({ section, language }: { section: any; language: Language }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get panels from config
  const panels = section.config?.panels || [];

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
    <section className="px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card - Image */}
          <div className="relative bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-3xl overflow-hidden shadow-xl min-h-[300px] lg:min-h-[400px]">
            <img
              src={currentPanel.backgroundImage}
              alt={currentPanel.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>

          {/* Right Card - Text Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl mb-4 leading-tight">
              {currentPanel.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
              {currentPanel.description}
            </p>
            {currentPanel.ctaLabel && currentPanel.ctaHref && (
              <a
                href={currentPanel.ctaHref}
                className="text-black font-medium hover:gap-3 inline-flex items-center gap-2 transition-all duration-250 group"
              >
                {currentPanel.ctaLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-250" />
              </a>
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
                        ? 'w-8 bg-[#4387DF]' 
                        : 'w-1.5 bg-gray-300 hover:bg-gray-400'
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
