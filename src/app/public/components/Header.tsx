import { Link } from 'react-router';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { t, getLocalizedRoute, getAlternateLanguage } from '../../shared/utils/i18n';
import { ThemeToggle } from '../../shared/components/ThemeToggle';
import { findServiceByLocalizedSlug, getLocalizedServiceSlug } from '../pages/ServiceDetailPage';
import logoComplete from '/assets/logos/brand/logo-complete.png';
import logoCompleteDark from '/assets/logos/brand/Logo_iData_Blanco.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const alternateLanguage = getAlternateLanguage(language);
  const activeLogo = isDark ? logoCompleteDark : logoComplete;

  const navigation = [
    { key: 'services', label: t('services', language), href: getLocalizedRoute('services', language) },
    { key: 'cases', label: t('cases', language), href: getLocalizedRoute('cases', language) },
    { key: 'insights', label: t('insights', language), href: getLocalizedRoute('insights', language) },
    { key: 'about', label: t('about', language), href: getLocalizedRoute('about', language) },
    { key: 'careers', label: t('careers', language), href: getLocalizedRoute('careers', language) },
    { key: 'contact', label: t('contact', language), href: getLocalizedRoute('contact', language) },
  ];

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  // Compute alternate path with dynamic route resolution for ALL content types
  const getAlternatePath = (): string => {
    // 1. SERVICE DETAIL PAGES: /es/servicios/[slug] ↔ /en/services/[slug]
    const serviceRegex = /^\/(es|en)\/(servicios|services)\/([^\/]+)\/?$/;
    const serviceMatch = currentPath.match(serviceRegex);
    
    if (serviceMatch) {
      const currentLang = serviceMatch[1] as 'es' | 'en';
      const slug = serviceMatch[3];
      
      // Find the service by its localized slug
      const service = findServiceByLocalizedSlug(slug, currentLang);
      
      if (service) {
        // Get the slug in the alternate language
        const newSlug = getLocalizedServiceSlug(service, alternateLanguage);
        const newBase = alternateLanguage === 'es' ? 'servicios' : 'services';
        const newPath = `/${alternateLanguage}/${newBase}/${newSlug}`;
        
        return newPath;
      }
    }
    
    // 2. STATIC ROUTE MAPPINGS for all known routes
    const routeMappings: Record<string, Record<string, string>> = {
      // Home
      '/es/': '/en/',
      '/en/': '/es/',
      '/es': '/en',
      '/en': '/es',
      
      // Services index
      '/es/servicios': '/en/services',
      '/en/services': '/es/servicios',
      '/es/servicios/': '/en/services/',
      '/en/services/': '/es/servicios/',
      
      // Case studies index
      '/es/casos': '/en/case-studies',
      '/es/casos-de-exito': '/en/case-studies',
      '/en/case-studies': '/es/casos-de-exito',
      '/es/casos/': '/en/case-studies/',
      '/es/casos-de-exito/': '/en/case-studies/',
      '/en/case-studies/': '/es/casos-de-exito/',

      // Legacy industries route reused by the consolidated hub
      '/es/industrias': '/en/case-studies',
      '/en/industries': '/es/casos-de-exito',
      '/es/industrias/': '/en/case-studies/',
      '/en/industries/': '/es/casos-de-exito/',
      
      // Insights index (blog)
      '/es/insights': '/en/insights',
      '/en/insights': '/es/insights',
      '/es/insights/': '/en/insights/',
      '/en/insights/': '/es/insights/',
      
      // About
      '/es/nosotros': '/en/about',
      '/en/about': '/es/nosotros',
      '/es/nosotros/': '/en/about/',
      '/en/about/': '/es/nosotros/',
      
      // Careers
      '/es/trabaja-con-nosotros': '/en/work-with-us',
      '/en/work-with-us': '/es/trabaja-con-nosotros',
      '/es/trabaja-con-nosotros/': '/en/work-with-us/',
      '/en/work-with-us/': '/es/trabaja-con-nosotros/',
      '/es/talento': '/en/careers',
      '/en/careers': '/es/talento',
      '/es/talento/': '/en/careers/',
      '/en/careers/': '/es/talento/',
      '/es/trabaja-con-nosotros/ofertas': '/en/work-with-us/jobs',
      '/en/work-with-us/jobs': '/es/trabaja-con-nosotros/ofertas',
      '/es/trabaja-con-nosotros/ofertas/': '/en/work-with-us/jobs/',
      '/en/work-with-us/jobs/': '/es/trabaja-con-nosotros/ofertas/',
      '/es/talento/ofertas': '/en/careers/jobs',
      '/en/careers/jobs': '/es/talento/ofertas',
      '/es/talento/ofertas/': '/en/careers/jobs/',
      '/en/careers/jobs/': '/es/talento/ofertas/',
      
      // Resources
      '/es/recursos': '/en/resources',
      '/en/resources': '/es/recursos',
      '/es/recursos/': '/en/resources/',
      '/en/resources/': '/es/recursos/',
      
      // Contact
      '/es/contacto': '/en/contact',
      '/en/contact': '/es/contacto',
      '/es/contacto/': '/en/contact/',
      '/en/contact/': '/es/contacto/',

      // Legal
      '/es/politica-de-privacidad': '/en/privacy-policies',
      '/en/privacy-policies': '/es/politica-de-privacidad',
      '/es/politica-de-privacidad/': '/en/privacy-policies/',
      '/en/privacy-policies/': '/es/politica-de-privacidad/',
      '/en/privacy-policy': '/es/politica-de-privacidad',
      '/en/privacy-policy/': '/es/politica-de-privacidad/',
      '/es/politicas-de-cookies': '/en/politicas-de-cookies',
      '/en/politicas-de-cookies': '/es/politicas-de-cookies',
      '/es/politicas-de-cookies/': '/en/politicas-de-cookies/',
      '/en/politicas-de-cookies/': '/es/politicas-de-cookies/',
      '/en/cookie-policy': '/es/politicas-de-cookies',
      '/en/cookie-policy/': '/es/politicas-de-cookies/',
    };
    
    // Check for exact static route match
    if (routeMappings[currentPath]) {
      return routeMappings[currentPath];
    }
    
    // 3. DYNAMIC DETAIL PAGES with same slug (cases, insights, industries, jobs, resources)
    // Pattern: /[lang]/[base]/[slug]
    const dynamicPatterns = [
      { es: 'casos', en: 'case-studies' },           // Case studies
      { es: 'casos-de-exito', en: 'case-studies' },  // Consolidated hub alias
      { es: 'insights', en: 'insights' },            // Blog posts (same slug)
      { es: 'industrias', en: 'industries' },        // Industries
      { es: 'recursos', en: 'resources' },           // Resources
    ];
    
    for (const pattern of dynamicPatterns) {
      const regex = new RegExp(`^\\/(es|en)\\/(${pattern.es}|${pattern.en})\\/([^\\/]+)\\/?$`);
      const match = currentPath.match(regex);
      
      if (match) {
        const slug = match[3];
        const newBase = alternateLanguage === 'es' ? pattern.es : pattern.en;
        const newPath = `/${alternateLanguage}/${newBase}/${slug}`;
        
        return newPath;
      }
    }
    
    // 4. JOBS: /es/trabaja-con-nosotros/ofertas/[slug] ↔ /en/work-with-us/jobs/[slug]
    const jobsRegex = /^\/(es|en)\/(trabaja-con-nosotros\/ofertas|work-with-us\/jobs)\/([^\/]+)\/?$/;
    const jobsMatch = currentPath.match(jobsRegex);
    
    if (jobsMatch) {
      const slug = jobsMatch[3];
      const newBase = alternateLanguage === 'es' ? 'trabaja-con-nosotros/ofertas' : 'work-with-us/jobs';
      const newPath = `/${alternateLanguage}/${newBase}/${slug}`;
      
      return newPath;
    }
    
    // 5. FALLBACK: Simple language replacement
    return currentPath.replace(`/${language}`, `/${alternateLanguage}`);
  };
  
  const alternatePath = getAlternatePath();

  const preserveScrollForLanguageSwitch = () => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem('idata-preserve-scroll-y', String(window.scrollY));
  };
  
  // Check if a navigation item is active
  const isActive = (href: string) => {
    if (currentPath === href) return true;
    if (href !== `/${language}/` && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-0 border-b transition-colors duration-300"
      style={{
        borderColor: 'var(--header-border)',
        background: 'var(--header-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: 'var(--header-shadow)',
      }}
    >
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - Left - 15% smaller */}
          <div className="flex-shrink-0">
            <Link 
              to={getLocalizedRoute('home', language)} 
              className="block transition-opacity duration-300 hover:opacity-70"
            >
              <img 
                src={activeLogo} 
                alt="iData Global" 
                className="w-auto"
                style={{ height: '34px' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex lg:items-center lg:gap-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`relative text-[15px] font-medium transition-colors duration-300 group py-2 ${
                    active ? 'text-[#0088FF]' : 'text-[var(--header-text-muted)] hover:text-[var(--header-text)]'
                  }`}
                >
                  {item.label}
                  {/* Animated underline - Purple on hover, Blue when active */}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out ${
                      active 
                        ? 'w-full bg-[#0088FF]' 
                        : 'w-0 bg-[#8E32F5] group-hover:w-full'
                    }`} 
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side - Language + Sign Up Button */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <ThemeToggle language={language} />

            {/* Language Switcher - With hover interaction */}
            <Link
              to={alternatePath}
              onClick={preserveScrollForLanguageSwitch}
              aria-label={language === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'}
              title={language === 'es' ? 'Cambiar a English' : 'Cambiar a Español'}
              className="group inline-flex items-center rounded-full border border-[var(--header-border)] bg-[var(--header-pill-hover)] px-4 py-2.5 text-sm font-semibold text-[var(--header-text)] shadow-[0_10px_28px_rgba(8,15,30,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4387DF]/35 hover:text-[#0088FF]"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm opacity-70 transition-opacity group-hover:opacity-100">🌐</span>
                {alternateLanguage.toUpperCase()}
              </span>
            </Link>

            {/* Sign Up Button - Solid Gray with Purple Hover */}
            <Link
              to={getLocalizedRoute('contact', language)}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-[#8E32F5] transition-all duration-300 hover:shadow-lg hover:shadow-[#8E32F5]/20"
            >
              <span>{language === 'es' ? 'Contactar' : 'Contact'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t" style={{ borderColor: 'var(--header-border)' }}>
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`block py-3 transition-colors duration-300 text-base font-medium ${
                    active ? 'text-[#0088FF]' : 'text-[var(--header-text-muted)] hover:text-[var(--header-text)]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4" style={{ borderColor: 'var(--header-border)' }}>
              <div className="flex items-center gap-3">
                <ThemeToggle language={language} />
                <Link
                  to={alternatePath}
                  aria-label={language === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'}
                  title={language === 'es' ? 'Cambiar a English' : 'Cambiar a Español'}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--header-border)] bg-[var(--header-pill-hover)] px-4 text-sm font-semibold text-[var(--header-text)] shadow-[0_10px_28px_rgba(8,15,30,0.08)] transition-all duration-300 hover:border-[#4387DF]/35 hover:text-[#0088FF]"
                  onClick={() => {
                    preserveScrollForLanguageSwitch();
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="text-xs">🌐</span>
                  {alternateLanguage.toUpperCase()}
                </Link>
              </div>
              <Link
                to={getLocalizedRoute('contact', language)}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#8E32F5]"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{language === 'es' ? 'Contactar' : 'Contact'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
