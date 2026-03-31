import { Link } from 'react-router';
import type { Language } from '../../types';
import { t } from '../../utils/i18n';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('services', language),
      links: [
        { id: 'strategy-consulting', label: 'Strategy Consulting', href: `/${language}/${language === 'es' ? 'servicios' : 'services'}/` },
        { id: 'data-delivery', label: 'Data Delivery', href: `/${language}/${language === 'es' ? 'servicios' : 'services'}/` },
        { id: 'data-operations', label: 'Data Operations', href: `/${language}/${language === 'es' ? 'servicios' : 'services'}/` },
        { id: 'cloud-services', label: 'Cloud Services', href: `/${language}/${language === 'es' ? 'servicios' : 'services'}/` },
      ],
    },
    {
      title: language === 'es' ? 'Empresa' : 'Company',
      links: [
        { id: 'about', label: t('about', language), href: `/${language}/${language === 'es' ? 'nosotros' : 'about'}/` },
        { id: 'cases', label: t('cases', language), href: `/${language}/${language === 'es' ? 'casos' : 'case-studies'}/` },
        { id: 'careers', label: t('careers', language), href: `/${language}/${language === 'es' ? 'talento' : 'careers'}/` },
        { id: 'contact', label: t('contact', language), href: `/${language}/${language === 'es' ? 'contacto' : 'contact'}/` },
      ],
    },
    {
      title: t('resources', language),
      links: [
        { id: 'insights', label: t('insights', language), href: `/${language}/insights/` },
        { id: 'resources', label: t('resources', language), href: `/${language}/${language === 'es' ? 'recursos' : 'resources'}/` },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to={`/${language}/`} className="text-2xl font-bold">
              iData
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              {language === 'es' 
                ? 'Transformamos datos en valor para empresas globales.'
                : 'We transform data into value for global enterprises.'}
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} iData. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              {language === 'es' ? 'Privacidad' : 'Privacy'}
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              {language === 'es' ? 'Términos' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}