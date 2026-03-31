import { Link } from 'react-router';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Container } from '../../shared/components/Container';
import { Section } from '../../shared/components/Section';
import { getPublished as getJobs } from '../../../services/jobsService';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockJobs } from '../../data/mockData';

const allowMockFallback = import.meta.env.DEV;

export function JobsIndex() {
  const { language, getLocalizedValue } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackJobs = mockJobs.map((job: any) => ({
    ...job,
    title_es: job.title_es ?? job.title ?? '',
    title_en: job.title_en ?? job.title ?? '',
    department_es: job.department_es ?? job.area_es ?? '',
    department_en: job.department_en ?? job.area_en ?? '',
    location_es: job.location_es ?? job.location ?? '',
    location_en: job.location_en ?? job.location ?? '',
    description_es: job.description_es ?? job.excerpt_es ?? '',
    description_en: job.description_en ?? job.excerpt_en ?? '',
  }));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.length > 0 ? data : (allowMockFallback ? fallbackJobs : []));
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs(allowMockFallback ? fallbackJobs : []);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const localizedJobs = jobs.map((job: any) => ({
    ...job,
    title: getLocalizedValue(job.title_es, job.title_en),
    department: getLocalizedValue(job.department_es, job.department_en),
    location: getLocalizedValue(job.location_es, job.location_en),
    description: getLocalizedValue(job.description_es, job.description_en),
  }))

  const filteredJobs = localizedJobs
    .filter(j => !selectedDepartment || j.department === selectedDepartment);

  // Get unique departments
  const departments = Array.from(
    new Set(
      localizedJobs.map(j => j.department)
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
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <Link
                  key={job.id}
                  to={`${basePath}/${language === 'es' ? job.slug_es : job.slug_en}`}
                  className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-2">
                        {job.description}
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
