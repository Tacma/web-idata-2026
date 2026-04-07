import { Link } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useContactSettings } from '../../shared/hooks/useContactSettings';
import { EXTERNAL_DATA_POLICY_URL } from '../../shared/constants/legalLinks';
import {
  buildWhatsAppRegionUrl,
  getActiveWhatsAppRegions,
  getLocalizedRegionName,
} from '../../shared/utils/whatsapp';
import { t, getLocalizedRoute } from '../../shared/utils/i18n';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';
import logoComplete from '/assets/logos/brand/logo-complete.png';
import { getManagedSocialMedia } from '../../shared/utils/socialLinks';

export function Footer() {
  const { language } = useLanguage();
  const { settings } = useContactSettings();
  const currentYear = new Date().getFullYear();
  const officeContacts = getActiveWhatsAppRegions(settings.whatsapp);
  const officeFlags: Record<string, string> = {
    'central-america': '🌎',
    centralamerica: '🌎',
    chile: '🇨🇱',
    colombia: '🇨🇴',
    usa: '🇺🇸',
  };

  const managedSocialLinks = getManagedSocialMedia(settings.socialMedia);

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
    legal: [
      {
        key: 'cookies',
        label: language === 'es' ? 'Cookies' : 'Cookies',
        href: EXTERNAL_DATA_POLICY_URL,
      },
      {
        key: 'privacy',
        label: language === 'es' ? 'Politica de privacidad' : 'Privacy Policy',
        href: EXTERNAL_DATA_POLICY_URL,
      },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to={getLocalizedRoute('home', language)} className="block mb-4">
              <img 
                src={logoComplete} 
                alt="iData Global" 
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-gray-400 text-sm font-light">
              {language === 'es' 
                ? 'Transformamos datos en valor para el negocio' 
                : 'We transform data into business value'}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-medium mb-4">{t('services', language)}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
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

          <div>
            <h3 className="font-medium mb-4">{language === 'es' ? 'Legal' : 'Legal'}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
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

        {officeContacts.length > 0 && (
          <div className="mt-10 border-t border-gray-800 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="font-medium text-white">
                  {language === 'es' ? 'Oficinas y atención' : 'Offices and support'}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {language === 'es'
                    ? 'Habla con el equipo comercial de tu región.'
                    : 'Talk to the commercial team in your region.'}
                </p>
              </div>

              <ul className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:justify-end">
                {officeContacts.map((region) => (
                  <li key={region.id} className="min-w-0">
                    <a
                      href={buildWhatsAppRegionUrl(region, language)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-full w-full min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8 lg:min-w-[190px]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-lg">
                        {officeFlags[region.id] || '🌐'}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-white/90">
                          {getLocalizedRegionName(region, language)}
                        </span>
                        <span className="block text-gray-400">
                          {region.phoneNumber}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Social Media Links */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex justify-center items-center gap-4">
            <p className="text-gray-400 text-sm mr-2">
              {language === 'es' ? 'Síguenos' : 'Follow us'}
            </p>
            
            <a
              href={managedSocialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#1877F2] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>

            {/* LinkedIn */}
            <a
              href={managedSocialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#0A66C2] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a
              href={managedSocialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* YouTube */}
            <a
              href={managedSocialLinks.youtube}
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
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            {footerLinks.legal.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
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
