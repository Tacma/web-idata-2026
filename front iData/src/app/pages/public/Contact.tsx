import { useLocation } from 'react-router';
import { SEO, buildCanonicalUrl, buildAlternateUrl, getAlternateLanguage } from '../../utils/seo';
import { getLanguageFromPath, t } from '../../utils/i18n';
import { Breadcrumb } from '../../components/public/Breadcrumb';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  const alternateLang = getAlternateLanguage(language);
  const canonicalUrl = buildCanonicalUrl(location.pathname);
  const alternateUrl = buildAlternateUrl(location.pathname, alternateLang);

  const title = language === 'es' ? 'Contacto - iData' : 'Contact - iData';
  const description = language === 'es'
    ? 'Contáctanos para conocer cómo podemos ayudarte con tus proyectos de datos'
    : 'Contact us to learn how we can help you with your data projects';

  const breadcrumbItems = [
    { label: t('home', language), href: `/${language}/` },
    { label: t('contact', language) },
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-12">
          <h1 className="text-4xl font-light mb-4">{t('contact', language)}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-light mb-6">
              {language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('name', language)}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('email', language)}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('phone', language)}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('message', language)}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t('send', language)}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-light mb-6">
              {language === 'es' ? 'Información de contacto' : 'Contact information'}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a href="mailto:contact@idata.com" className="text-gray-600 hover:text-blue-600">
                    contact@idata.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">
                    {language === 'es' ? 'Teléfono' : 'Phone'}
                  </h3>
                  <a href="tel:+34000000000" className="text-gray-600 hover:text-blue-600">
                    +34 000 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">
                    {language === 'es' ? 'Oficina' : 'Office'}
                  </h3>
                  <p className="text-gray-600">
                    Madrid, España
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gray-100 rounded-lg p-6">
              <h3 className="font-medium mb-2">
                {language === 'es' ? 'Horario de atención' : 'Business hours'}
              </h3>
              <p className="text-gray-600">
                {language === 'es' 
                  ? 'Lunes a Viernes: 9:00 - 18:00'
                  : 'Monday to Friday: 9:00 AM - 6:00 PM'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
