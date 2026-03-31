import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, MapPin, Briefcase, Clock, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { getBySlug } from '../../../services/jobsService';
import { mockJobs } from '../../data/mockData';
import { JobApplicationForm } from '../components/careers/JobApplicationForm';

const allowMockFallback = import.meta.env.DEV;

export function JobDetail() {
  const { language } = useLanguage();
  const { slug } = useParams();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  function getFallbackJob(currentSlug?: string) {
    const match = mockJobs.find((item: any) =>
      [item.slug, item.slug_es, item.slug_en].filter(Boolean).includes(currentSlug)
    );

    if (!match) return null;

    return {
      ...match,
      area_es: match.area_es ?? match.department_es ?? '',
      area_en: match.area_en ?? match.department_en ?? '',
      short_summary_es: match.short_summary_es ?? match.excerpt_es ?? match.description_es ?? '',
      short_summary_en: match.short_summary_en ?? match.excerpt_en ?? match.description_en ?? '',
      overview_es: match.overview_es ?? match.description_es ?? '',
      overview_en: match.overview_en ?? match.description_en ?? '',
      responsibilities_es: Array.isArray(match.responsibilities_es) ? match.responsibilities_es : [],
      responsibilities_en: Array.isArray(match.responsibilities_en) ? match.responsibilities_en : [],
      requirements_es: match.requirements_es ?? '',
      requirements_en: match.requirements_en ?? '',
      nice_to_have_es: Array.isArray(match.nice_to_have_es) ? match.nice_to_have_es : [],
      nice_to_have_en: Array.isArray(match.nice_to_have_en) ? match.nice_to_have_en : [],
      benefits_es: match.benefits_es ?? '',
      benefits_en: match.benefits_en ?? '',
      modality: match.modality ?? 'remote',
    };
  }

  useEffect(() => {
    let cancelled = false;

    async function loadJob() {
      if (!slug) return;
      try {
        setLoading(true);
        const record = await getBySlug(slug, language);
        if (!cancelled) {
          setJob(record || (allowMockFallback ? getFallbackJob(slug) : null));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading job detail:', error);
        if (!cancelled) {
          setJob(allowMockFallback ? getFallbackJob(slug) : null);
          setLoading(false);
        }
      }
    }

    loadJob();

    return () => {
      cancelled = true;
    };
  }, [slug, language]);

  if (!loading && !job) {
    return <Navigate to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}`} replace />;
  }

  if (!job) return null;

  const title = language === 'es' ? job.title_es : job.title_en;
  const overview = language === 'es' ? job.overview_es : job.overview_en;
  const seo = language === 'es' ? job.seo_es : job.seo_en;
  const responsibilities = language === 'es' ? (job.responsibilities_es || []) : (job.responsibilities_en || []);
  const requirements = (language === 'es' ? job.requirements_es : job.requirements_en)?.split('\n').filter(Boolean) || [];
  const niceToHave = language === 'es' ? (job.nice_to_have_es || []) : (job.nice_to_have_en || []);
  const benefits = (language === 'es' ? job.benefits_es : job.benefits_en)?.split('\n').filter(Boolean) || [];

  return (
    <>
      <SEOHead
        title={seo?.metaTitle || `${title} - ${language === 'es' ? 'Trabaja con nosotros' : 'Work with us'} - iData`}
        description={seo?.metaDescription || (language === 'es' ? job.short_summary_es : job.short_summary_en)}
        canonical={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}/${slug}/`}
        alternateES={`/es/trabaja-con-nosotros/${job.slug_es}/`}
        alternateEN={`/en/work-with-us/${job.slug_en}/`}
        language={language}
      />

      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back button */}
          <Link
            to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}`}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {language === 'es' ? 'Volver a vacantes' : 'Back to openings'}
          </Link>

          {/* Job Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
                <Briefcase className="w-4 h-4" />
                {language === 'es' ? job.area_es : job.area_en}
              </span>
              <span className="inline-flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                <MapPin className="w-4 h-4" />
                {language === 'es' ? job.location_es : job.location_en}
              </span>
              <span className="inline-flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                <Clock className="w-4 h-4" />
                {job.modality === 'remote' ? (language === 'es' ? 'Remoto' : 'Remote') : 
                 job.modality === 'hybrid' ? (language === 'es' ? 'Híbrido' : 'Hybrid') : 
                 (language === 'es' ? 'Presencial' : 'On-site')}
              </span>
              {job.salary_visible && (
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                  <DollarSign className="w-4 h-4" />
                  {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()} {job.currency}
                </span>
              )}
            </div>

            {/* Apply button - sticky on mobile */}
            <button
              onClick={() => setShowApplicationForm(true)}
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100 group"
            >
              {language === 'es' ? 'Aplicar ahora' : 'Apply now'}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Job Content */}
          <div className="space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                {language === 'es' ? 'Descripción' : 'Overview'}
              </h2>
              <p className="text-lg text-gray-700 font-light leading-relaxed">
                {overview}
              </p>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                {language === 'es' ? 'Responsabilidades' : 'Responsibilities'}
              </h2>
              <ul className="space-y-3">
                {responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                {language === 'es' ? 'Requisitos' : 'Requirements'}
              </h2>
              <ul className="space-y-3">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Nice to have */}
            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                {language === 'es' ? 'Deseable' : 'Nice to have'}
              </h2>
              <ul className="space-y-3">
                {niceToHave.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                {language === 'es' ? 'Beneficios' : 'Benefits'}
              </h2>
              <ul className="space-y-3">
                {benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Application Form or CTA */}
          {showApplicationForm ? (
            <div className="mt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                {language === 'es' ? 'Aplicar a esta vacante' : 'Apply for this position'}
              </h2>
              <JobApplicationForm
                applicationType="job"
                job={job}
                language={language}
                onSubmitted={() => setShowApplicationForm(true)}
              />
            </div>
          ) : (
            <div className="mt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl p-8 text-center border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                {language === 'es' ? '¿Te interesa esta posición?' : 'Interested in this position?'}
              </h3>
              <p className="text-gray-600 font-light mb-6">
                {language === 'es'
                  ? 'Aplica ahora y únete a nuestro equipo de CoolStars'
                  : 'Apply now and join our team of CoolStars'}
              </p>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100 group"
              >
                {language === 'es' ? 'Aplicar ahora' : 'Apply now'}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {/* Alternative: Open Application */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 font-light mb-4">
              {language === 'es'
                ? '¿Esta vacante no es para ti pero te gustaría trabajar en iData?'
                : "This position isn't for you but you'd like to work at iData?"}
            </p>
            <Link
              to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}#open-application`}
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium group"
            >
              {language === 'es' ? 'Enviar aplicación espontánea' : 'Submit open application'}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
