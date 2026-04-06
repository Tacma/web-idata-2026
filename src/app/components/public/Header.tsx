import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '../../types';
import { getLanguageFromPath, t } from '../../utils/i18n';

interface HeaderProps {
  language: Language;
}

const DESKTOP_BREAKPOINT = 768;
const FULL_DESKTOP_NAV_WIDTH = 1280;

// Mapeo de rutas principales entre ES y EN
const routeMapping: Record<string, string> = {
  // ES -> EN
  'servicios': 'services',
  'industrias': 'industries',
  'casos': 'case-studies',
  'nosotros': 'about',
  'contacto': 'contact',
  'recursos': 'resources',
  'trabaja-con-nosotros': 'work-with-us',
  // EN -> ES
  'services': 'servicios',
  'industries': 'industrias',
  'case-studies': 'casos',
  'about': 'nosotros',
  'contact': 'contacto',
  'resources': 'recursos',
  'work-with-us': 'trabaja-con-nosotros',
  // insights se mantiene igual en ambos idiomas
  'insights': 'insights',
};

export function Header({ language }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [forceMobileMenu, setForceMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRowRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  const getNavItems = (lang: Language) => [
    { label: t('services', lang), href: `/${lang}/${lang === 'es' ? 'servicios' : 'services'}` },
    { label: t('industries', lang), href: `/${lang}/${lang === 'es' ? 'industrias' : 'industries'}` },
    { label: t('cases', lang), href: `/${lang}/${lang === 'es' ? 'casos' : 'case-studies'}` },
    { label: t('insights', lang), href: `/${lang}/insights` },
    { label: t('about', lang), href: `/${lang}/${lang === 'es' ? 'nosotros' : 'about'}` },
    { label: t('careers', lang), href: `/${lang}/${lang === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}` },
  ];

  const navItems = getNavItems(language);

  useEffect(() => {
    const measureHeader = () => {
      const headerRow = headerRowRef.current;
      const desktopNav = desktopNavRef.current;

      if (!headerRow || !desktopNav) return;

      const isBelowDesktopBreakpoint = window.innerWidth < DESKTOP_BREAKPOINT;

      if (isBelowDesktopBreakpoint) {
        setForceMobileMenu(false);
        return;
      }

      const shouldPreferMobileLayout = window.innerWidth < FULL_DESKTOP_NAV_WIDTH;
      const rowWrapped = headerRow.scrollWidth > headerRow.clientWidth + 1;
      const navWrapped = desktopNav.scrollWidth > desktopNav.clientWidth + 1;
      const navHasMultipleRows = desktopNav.getBoundingClientRect().height > 40;
      const headerHasMultipleRows = headerRow.getBoundingClientRect().height > 72;

      setForceMobileMenu(
        shouldPreferMobileLayout || rowWrapped || navWrapped || navHasMultipleRows || headerHasMultipleRows
      );
    };

    measureHeader();

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(measureHeader);
    });

    if (headerRowRef.current) {
      resizeObserver.observe(headerRowRef.current);
    }

    if (desktopNavRef.current) {
      resizeObserver.observe(desktopNavRef.current);
    }

    window.addEventListener('resize', measureHeader);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureHeader);
    };
  }, [language, location.pathname]);

  useEffect(() => {
    if (!forceMobileMenu && window.innerWidth >= DESKTOP_BREAKPOINT) {
      setMobileMenuOpen(false);
    }
  }, [forceMobileMenu]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    const currentPath = location.pathname;
    const currentHash = location.hash;
    
    // Dividir path en segmentos
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // Si no hay segmentos o el primero no es un idioma, ir al home del nuevo idioma
    if (pathSegments.length === 0 || (pathSegments[0] !== 'es' && pathSegments[0] !== 'en')) {
      navigate(`/${newLang}/${currentHash}`);
      return;
    }
    
    // Remover el idioma actual
    pathSegments.shift();
    
    // Si solo quedaba el idioma (estamos en home), ir al home del nuevo idioma
    if (pathSegments.length === 0) {
      navigate(`/${newLang}/${currentHash}`);
      return;
    }
    
    // Mapear la primera sección (servicios, casos, etc.)
    const firstSegment = pathSegments[0];
    const mappedSegment = routeMapping[firstSegment] || firstSegment;
    pathSegments[0] = mappedSegment;
    
    // Reconstruir la ruta con el nuevo idioma y mantener todos los slugs
    const newPath = `/${newLang}/${pathSegments.join('/')}${currentHash}`;
    
    // Navegar a la nueva ruta
    navigate(newPath);
    
    // Scroll to top suave
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRowRef} className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={`/${language}/`} className="text-2xl font-light text-gray-900">
              iData
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            ref={desktopNavRef}
            className={`${forceMobileMenu ? 'hidden' : 'hidden xl:flex'} items-center gap-6 min-w-0`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm text-gray-700 hover:text-gray-900 font-medium px-3 py-1 border border-gray-300 rounded transition-colors"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* CTA Button - Hidden on mobile */}
            <Link
              to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}`}
              className={`${forceMobileMenu ? 'hidden' : 'hidden xl:inline-flex'} items-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 whitespace-nowrap`}
            >
              {language === 'es' ? 'Contactar' : 'Contact'}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${forceMobileMenu ? 'inline-flex' : 'xl:hidden'} p-2`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`${forceMobileMenu ? 'block' : 'xl:hidden'} py-4 border-t border-gray-200`}>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
