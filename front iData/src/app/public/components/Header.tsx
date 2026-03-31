import { Link } from 'react-router';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { t, getLocalizedRoute, getAlternateLanguage } from '../../shared/utils/i18n';
import { TextLink } from '../../shared/components/TextLink';
import { findServiceByLocalizedSlug, getLocalizedServiceSlug } from '../pages/ServiceDetailPage';
import logoComplete from 'figma:asset/4c7049aaff013a605e31fb46a88d0dba9bdf9428.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const alternateLanguage = getAlternateLanguage(language);

  const navigation = [
    { key: 'services', label: t('services', language), href: getLocalizedRoute('services', language) },
    { key: 'industries', label: t('industries', language), href: getLocalizedRoute('industries', language) },
    { key: 'cases', label: t('cases', language), href: getLocalizedRoute('cases', language) },
    { key: 'insights', label: t('insights', language), href: getLocalizedRoute('insights', language) },
    { key: 'about', label: t('about', language), href: getLocalizedRoute('about', language) },
    { key: 'careers', label: t('careers', language), href: getLocalizedRoute('careers', language) },
    { key: 'contact', label: t('contact', language), href: getLocalizedRoute('contact', language) },
  ];

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  // Compute alternate path with dynamic route resolution for ALL content types
  const getAlternatePath = (): string => {
    console.log('🔍 [Language Switcher] Current path:', currentPath);
    console.log('🔍 [Language Switcher] Current language:', language);
    console.log('🔍 [Language Switcher] Target language:', alternateLanguage);
    
    // 1. SERVICE DETAIL PAGES: /es/servicios/[slug] ↔ /en/services/[slug]
    const serviceRegex = /^\/(es|en)\/(servicios|services)\/([^\/]+)\/?$/;
    const serviceMatch = currentPath.match(serviceRegex);
    
    if (serviceMatch) {
      const currentLang = serviceMatch[1] as 'es' | 'en';
      const slug = serviceMatch[3];
      
      console.log('✅ [Language Switcher] Detected SERVICE page with slug:', slug);
      
      // Find the service by its localized slug
      const service = findServiceByLocalizedSlug(slug, currentLang);
      
      if (service) {
        // Get the slug in the alternate language
        const newSlug = getLocalizedServiceSlug(service, alternateLanguage);
        const newBase = alternateLanguage === 'es' ? 'servicios' : 'services';
        const newPath = `/${alternateLanguage}/${newBase}/${newSlug}`;
        
        console.log('✅ [Language Switcher] Resolved service:', service.slug);
        console.log('✅ [Language Switcher] New slug:', newSlug);
        console.log('✅ [Language Switcher] New path:', newPath);
        
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
      
      // Industries index
      '/es/industrias': '/en/industries',
      '/en/industries': '/es/industrias',
      '/es/industrias/': '/en/industries/',
      '/en/industries/': '/es/industrias/',
      
      // Case studies index
      '/es/casos': '/en/case-studies',
      '/en/case-studies': '/es/casos',
      '/es/casos/': '/en/case-studies/',
      '/en/case-studies/': '/es/casos/',
      
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
    };
    
    // Check for exact static route match
    if (routeMappings[currentPath]) {
      const mappedPath = routeMappings[currentPath];
      console.log('✅ [Language Switcher] Found static route mapping:', mappedPath);
      return mappedPath;
    }
    
    // 3. DYNAMIC DETAIL PAGES with same slug (cases, insights, industries, jobs, resources)
    // Pattern: /[lang]/[base]/[slug]
    const dynamicPatterns = [
      { es: 'casos', en: 'case-studies' },           // Case studies
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
        
        console.log(`✅ [Language Switcher] Detected ${pattern.es}/${pattern.en} page with slug:`, slug);
        console.log('✅ [Language Switcher] New path:', newPath);
        
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
      
      console.log('✅ [Language Switcher] Detected JOBS page with slug:', slug);
      console.log('✅ [Language Switcher] New path:', newPath);
      
      return newPath;
    }
    
    // 5. FALLBACK: Simple language replacement
    const fallbackPath = currentPath.replace(`/${language}`, `/${alternateLanguage}`);
    console.log('⚠️ [Language Switcher] Using fallback replacement:', fallbackPath);
    
    return fallbackPath;
  };
  
  const alternatePath = getAlternatePath();
  
  // Check if a navigation item is active
  const isActive = (href: string) => {
    if (currentPath === href) return true;
    if (href !== `/${language}/` && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-0 border-b border-white/30" style={{
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)'
    }}>
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - Left - 15% smaller */}
          <div className="flex-shrink-0">
            <Link 
              to={getLocalizedRoute('home', language)} 
              className="block transition-opacity duration-300 hover:opacity-70"
            >
              <img 
                src={logoComplete} 
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
                    active ? 'text-[#0088FF]' : 'text-gray-700 hover:text-gray-900'
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
            {/* Language Switcher - With hover interaction */}
            <Link
              to={alternatePath}
              className="group relative px-3 py-2 text-gray-600 hover:text-[#0088FF] text-sm font-medium transition-all duration-300 rounded-lg hover:bg-gray-100/50"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">🌐</span>
                {alternateLanguage.toUpperCase()}
              </span>
            </Link>

            {/* Sign Up Button - Solid Gray with Purple Hover */}
            <Link
              to={getLocalizedRoute('contact', language)}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-[#8E32F5] transition-all duration-300 hover:shadow-lg hover:shadow-[#8E32F5]/20"
            >
              <span>{language === 'es' ? 'Contactar' : 'Sign up'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`block py-3 transition-colors duration-300 text-base font-medium ${
                    active ? 'text-[#0088FF]' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-4 border-t border-white/20 space-y-3">
              <Link
                to={alternatePath}
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0088FF] text-sm font-medium rounded-lg hover:bg-gray-100/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xs">🌐</span>
                {alternateLanguage.toUpperCase()}
              </Link>
              <Link
                to={getLocalizedRoute('contact', language)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-[#8E32F5] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{language === 'es' ? 'Contactar' : 'Sign up'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}