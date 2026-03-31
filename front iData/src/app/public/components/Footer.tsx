import { Link } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { t, getLocalizedRoute } from '../../shared/utils/i18n';
import { Linkedin, Instagram, Youtube } from 'lucide-react';
import logoComplete from 'figma:asset/4c7049aaff013a605e31fb46a88d0dba9bdf9428.png';

export function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Official iData social media links
  const OFFICIAL_SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/idata.global/',
    linkedin: 'https://www.linkedin.com/company/idata-global-latam/posts/?feedView=all',
    youtube: 'https://www.youtube.com/@idata.global',
  };

  const footerLinks = {
    services: [
      { key: 'services', label: t('services', language), href: getLocalizedRoute('services', language) },
    ],
    company: [
      { key: 'about', label: t('about', language), href: getLocalizedRoute('about', language) },
      { key: 'careers', label: t('careers', language), href: getLocalizedRoute('careers', language) },
      { key: 'contact', label: t('contact', language), href: getLocalizedRoute('contact', language) },
    ],
    resources: [
      { key: 'insights', label: t('insights', language), href: getLocalizedRoute('insights', language) },
      { key: 'resources', label: t('resources', language), href: getLocalizedRoute('resources', language) },
      { key: 'cases', label: t('cases', language), href: getLocalizedRoute('cases', language) },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to={getLocalizedRoute('home', language)} className="block mb-4">
              <img 
                src={logoComplete} 
                alt="iData Global" 
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-gray-400 text-sm font-light">
              {language === 'es' 
                ? 'Transformamos datos en valor empresarial' 
                : 'We transform data into business value'}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-medium mb-4">{t('services', language)}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-4">
              {language === 'es' ? 'Empresa' : 'Company'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium mb-4">{t('resources', language)}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex justify-center items-center gap-4">
            <p className="text-gray-400 text-sm mr-2">
              {language === 'es' ? 'Síguenos' : 'Follow us'}
            </p>
            
            {/* LinkedIn */}
            <a
              href={OFFICIAL_SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#0A66C2] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a
              href={OFFICIAL_SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* YouTube */}
            <a
              href={OFFICIAL_SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} iData. {language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}.</p>
          
          {/* Admin access - small and discreet */}
          <Link 
            to="/admin" 
            className="inline-block mt-3 text-[11px] text-gray-600 hover:text-purple-400 transition-colors opacity-50 hover:opacity-100"
          >
            {language === 'es' ? 'Administrador' : 'Admin'}
          </Link>
        </div>
      </div>
    </footer>
  );
}