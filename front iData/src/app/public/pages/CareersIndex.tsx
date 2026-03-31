import { Link } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Container } from '../../shared/components/Container';
import { Section } from '../../shared/components/Section';
import { mockJobs } from '../../data/mockData';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

export function CareersIndex() {
  const { language, getLocalizedValue } = useLanguage();

  const activeJobs = mockJobs.filter(j => j.active && j.status === 'published');

  const seoTitle =
    language === 'es' ? 'Talento - Trabaja con nosotros - iData' : 'Careers - Join our team - iData';
  const seoDescription =
    language === 'es'
      ? 'Únete al equipo de iData y ayuda a transformar el mundo de los datos'
      : 'Join the iData team and help transform the world of data';
  const basePath = language === 'es' ? '/es/talento' : '/en/careers';

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`${basePath}/`}
        alternateES="/es/talento/"
        alternateEN="/en/careers/"
        language={language}
      />

      {/* Hero */}
      <Section background="white" padding="xl">
        <Container>
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'es' ? 'Únete a iData' : 'Join iData'}
            </h1>
            <p className="text-xl text-gray-600">
              {language === 'es'
                ? 'Construye tu carrera en un equipo apasionado por los datos y la innovación. Trabajamos en proyectos desafiantes que transforman industrias.'
                : 'Build your career with a team passionate about data and innovation. We work on challenging projects that transform industries.'}
            </p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section background="gray" padding="lg">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'es' ? 'Por qué iData' : 'Why iData'}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Crecimiento Profesional' : 'Professional Growth'}
              </h3>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Oportunidades constantes de aprendizaje y desarrollo con tecnologías de vanguardia'
                  : 'Constant learning and development opportunities with cutting-edge technologies'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Flexibilidad' : 'Flexibility'}
              </h3>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Trabajo remoto y horarios flexibles para balance vida-trabajo'
                  : 'Remote work and flexible hours for work-life balance'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Impacto Real' : 'Real Impact'}
              </h3>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Proyectos que generan impacto medible en organizaciones líderes'
                  : 'Projects that generate measurable impact in leading organizations'}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Open Positions */}
      <Section background="white" padding="lg">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'es' ? 'Posiciones Abiertas' : 'Open Positions'}
            </h2>
            {activeJobs.length > 0 && (
              <Link
                to={`${basePath}/ofertas/`}
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                {language === 'es' ? 'Ver todas' : 'View all'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {activeJobs.length > 0 ? (
            <div className="space-y-4">
              {activeJobs.slice(0, 5).map(job => (
                <Link
                  key={job.id}
                  to={`${basePath}/ofertas/${getLocalizedValue(job.slug_es, job.slug_en)}`}
                  className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {getLocalizedValue(job.title_es, job.title_en)}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{getLocalizedValue(job.department_es, job.department_en)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{getLocalizedValue(job.location_es, job.location_en)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{getLocalizedValue(job.type_es, job.type_en)}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                {language === 'es'
                  ? 'No hay posiciones abiertas en este momento'
                  : 'No open positions at this time'}
              </p>
              <p className="text-gray-500 text-sm">
                {language === 'es'
                  ? 'Pero siempre estamos interesados en conocer talento. Envíanos tu CV.'
                  : 'But we\'re always interested in meeting talent. Send us your resume.'}
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'es'
                ? '¿No encuentras la posición ideal?'
                : 'Can\'t find the ideal position?'}
            </h2>
            <p className="text-xl mb-6 text-blue-100">
              {language === 'es'
                ? 'Envíanos tu CV de todas formas. Siempre buscamos talento excepcional.'
                : 'Send us your resume anyway. We\'re always looking for exceptional talent.'}
            </p>
            <a
              href={`/${language}/${language === 'es' ? 'contacto' : 'contact'}/`}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              {language === 'es' ? 'Contáctanos' : 'Contact us'}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}