import { Link } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Container } from '../../shared/components/Container';
import { Section } from '../../shared/components/Section';
import { mockJobs } from '../../data/mockData';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function JobsIndex() {
  const { language, getLocalizedValue } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const jobs = mockJobs
    .filter(j => j.active && j.status === 'published')
    .filter(j => !selectedDepartment || getLocalizedValue(j.department_es, j.department_en) === selectedDepartment);

  // Get unique departments
  const departments = Array.from(
    new Set(
      mockJobs
        .filter(j => j.active && j.status === 'published')
        .map(j => getLocalizedValue(j.department_es, j.department_en))
    )
  );

  const seoTitle =
    language === 'es' ? 'Ofertas de Empleo - iData' : 'Job Openings - iData';
  const seoDescription =
    language === 'es'
      ? 'Descubre las oportunidades laborales disponibles en iData'
      : 'Discover available job opportunities at iData';
  const basePath = language === 'es' ? '/es/talento/ofertas' : '/en/careers/jobs';

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`${basePath}/`}
        alternateES="/es/talento/ofertas/"
        alternateEN="/en/careers/jobs/"
        language={language}
      />

      <Section background="white" padding="xl">
        <Container>
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'es' ? 'Ofertas de Empleo' : 'Job Openings'}
            </h1>
            <p className="text-xl text-gray-600">
              {language === 'es'
                ? 'Encuentra tu próximo desafío profesional en iData'
                : 'Find your next professional challenge at iData'}
            </p>
          </div>

          {/* Department Filter */}
          {departments.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDepartment(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDepartment === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'es' ? 'Todos' : 'All'}
              </button>
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}

          {/* Jobs List */}
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => (
                <Link
                  key={job.id}
                  to={`${basePath}/${getLocalizedValue(job.slug_es, job.slug_en)}`}
                  className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {getLocalizedValue(job.title_es, job.title_en)}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-3">
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
                      <p className="text-gray-600 line-clamp-2">
                        {getLocalizedValue(job.description_es, job.description_en)}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                {language === 'es'
                  ? 'No hay posiciones disponibles en este momento'
                  : 'No positions available at this time'}
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}