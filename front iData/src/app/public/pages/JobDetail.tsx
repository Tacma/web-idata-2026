import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, MapPin, Briefcase, Clock, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useState } from 'react';

export function JobDetail() {
  const { language } = useLanguage();
  const { slug } = useParams();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Mock job data (in real app, this would be fetched from backend based on slug)
  const job = {
    id: 1,
    title_es: 'Data Engineer Senior',
    title_en: 'Senior Data Engineer',
    slug_es: 'data-engineer-senior',
    slug_en: 'senior-data-engineer',
    area_es: 'Ingeniería de Datos',
    area_en: 'Data Engineering',
    modality: 'remote',
    location_es: 'Colombia / Remoto',
    location_en: 'Colombia / Remote',
    seniority: 'senior',
    employment_type: 'full-time',
    short_summary_es: 'Buscamos un Data Engineer Senior para diseñar e implementar arquitecturas de datos escalables en la nube.',
    short_summary_en: 'We are looking for a Senior Data Engineer to design and implement scalable cloud data architectures.',
    overview_es: 'Como Data Engineer Senior en iData, serás responsable de diseñar, construir y mantener la infraestructura de datos que impulsa las decisiones estratégicas de nuestros clientes. Trabajarás con tecnologías de punta en proyectos de transformación digital para organizaciones líderes en diversos sectores.',
    overview_en: 'As a Senior Data Engineer at iData, you will be responsible for designing, building and maintaining the data infrastructure that drives strategic decisions for our clients. You will work with cutting-edge technologies on digital transformation projects for leading organizations across various sectors.',
    responsibilities_es: [
      'Diseñar e implementar pipelines de datos escalables y robustos',
      'Desarrollar arquitecturas de datos en la nube (AWS, Azure, GCP)',
      'Optimizar el rendimiento de bases de datos y procesos ETL/ELT',
      'Colaborar con Data Scientists y Analysts para habilitar analytics avanzados',
      'Implementar mejores prácticas de data governance y calidad de datos',
      'Mentorear a ingenieros junior y mid-level',
    ],
    responsibilities_en: [
      'Design and implement scalable and robust data pipelines',
      'Develop cloud data architectures (AWS, Azure, GCP)',
      'Optimize database and ETL/ELT process performance',
      'Collaborate with Data Scientists and Analysts to enable advanced analytics',
      'Implement data governance and data quality best practices',
      'Mentor junior and mid-level engineers',
    ],
    requirements_es: [
      '5+ años de experiencia en ingeniería de datos',
      'Experiencia avanzada con SQL y bases de datos relacionales',
      'Conocimiento profundo de Python y/o Scala',
      'Experiencia con herramientas de orquestación (Airflow, Prefect, etc.)',
      'Experiencia con plataformas cloud (AWS, Azure o GCP)',
      'Conocimiento de arquitecturas modernas de datos (Data Lake, Data Warehouse, Lakehouse)',
      'Inglés intermedio/avanzado',
    ],
    requirements_en: [
      '5+ years of experience in data engineering',
      'Advanced experience with SQL and relational databases',
      'Deep knowledge of Python and/or Scala',
      'Experience with orchestration tools (Airflow, Prefect, etc.)',
      'Experience with cloud platforms (AWS, Azure or GCP)',
      'Knowledge of modern data architectures (Data Lake, Data Warehouse, Lakehouse)',
      'Intermediate/advanced English',
    ],
    nice_to_have_es: [
      'Experiencia con Databricks, Snowflake o BigQuery',
      'Conocimiento de tecnologías de streaming (Kafka, Kinesis)',
      'Certificaciones en plataformas cloud',
      'Experiencia con herramientas de BI (Tableau, Power BI, Looker)',
      'Conocimiento de Docker y Kubernetes',
    ],
    nice_to_have_en: [
      'Experience with Databricks, Snowflake or BigQuery',
      'Knowledge of streaming technologies (Kafka, Kinesis)',
      'Cloud platform certifications',
      'Experience with BI tools (Tableau, Power BI, Looker)',
      'Knowledge of Docker and Kubernetes',
    ],
    benefits_es: [
      'Trabajo remoto 100%',
      'Horarios flexibles',
      'Presupuesto para capacitación y certificaciones',
      'Equipamiento completo',
      'Proyectos internacionales',
      'Ambiente de aprendizaje continuo',
    ],
    benefits_en: [
      '100% remote work',
      'Flexible schedules',
      'Budget for training and certifications',
      'Complete equipment',
      'International projects',
      'Continuous learning environment',
    ],
    salary_visible: true,
    salary_min: 4000,
    salary_max: 6000,
    currency: 'USD',
    publication_date: '2024-03-01',
  };

  const title = language === 'es' ? job.title_es : job.title_en;
  const overview = language === 'es' ? job.overview_es : job.overview_en;
  const responsibilities = language === 'es' ? job.responsibilities_es : job.responsibilities_en;
  const requirements = language === 'es' ? job.requirements_es : job.requirements_en;
  const niceToHave = language === 'es' ? job.nice_to_have_es : job.nice_to_have_en;
  const benefits = language === 'es' ? job.benefits_es : job.benefits_en;

  return (
    <>
      <SEOHead
        title={`${title} - ${language === 'es' ? 'Trabaja con nosotros' : 'Work with us'} - iData`}
        description={language === 'es' ? job.short_summary_es : job.short_summary_en}
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
              
              <form className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'Nombre' : 'First name'} *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'Apellido' : 'Last name'} *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'Correo electrónico' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      placeholder={language === 'es' ? 'tu@correo.com' : 'you@email.com'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'Teléfono' : 'Phone'} *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9+\-\s()]{8,20}"
                      placeholder="+57 300 123 4567"
                      title={language === 'es' ? 'Formato: +57 300 123 4567' : 'Format: +57 300 123 4567'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'País' : 'Country'} *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'Ciudad' : 'City'} *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Experience & Availability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'Años de experiencia' : 'Years of experience'} *
                    </label>
                    <select 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">{language === 'es' ? 'Selecciona' : 'Select'}</option>
                      <option value="0-2">0-2</option>
                      <option value="3-5">3-5</option>
                      <option value="6-10">6-10</option>
                      <option value="10+">10+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'Disponibilidad' : 'Availability'} *
                    </label>
                    <select 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">{language === 'es' ? 'Selecciona' : 'Select'}</option>
                      <option value="immediate">{language === 'es' ? 'Inmediata' : 'Immediate'}</option>
                      <option value="2-weeks">{language === 'es' ? '2 semanas' : '2 weeks'}</option>
                      <option value="1-month">{language === 'es' ? '1 mes' : '1 month'}</option>
                      <option value="negotiable">{language === 'es' ? 'A negociar' : 'Negotiable'}</option>
                    </select>
                  </div>
                </div>

                {/* LinkedIn and Portfolio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn *
                    </label>
                    <input
                      type="url"
                      pattern="https://.*"
                      placeholder="https://linkedin.com/in/..."
                      required
                      title={language === 'es' ? 'Debe comenzar con https://' : 'Must start with https://'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio
                    </label>
                    <input
                      type="url"
                      pattern="https://.*"
                      placeholder="https://..."
                      title={language === 'es' ? 'Debe comenzar con https://' : 'Must start with https://'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'CV / Hoja de vida' : 'Resume / CV'} * (PDF, máx. 5MB)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 file:cursor-pointer"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {language === 'es' ? 'Solo archivos PDF, tamaño máximo 5MB' : 'PDF files only, maximum size 5MB'}
                  </p>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? '¿Por qué te interesa esta posición?' : 'Why are you interested in this position?'} *
                  </label>
                  <textarea
                    required
                    rows={6}
                    minLength={50}
                    maxLength={1000}
                    placeholder={language === 'es' 
                      ? 'Describe tu motivación y cómo tus habilidades se alinean con esta posición...'
                      : 'Describe your motivation and how your skills align with this position...'}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {language === 'es' ? 'Mínimo 50 caracteres, máximo 1000' : 'Minimum 50 characters, maximum 1000'}
                  </p>
                </div>

                {/* Salary Expectation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'Expectativa salarial' : 'Salary expectation'} ({job.currency})
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    placeholder={language === 'es' ? 'Ej: 5000' : 'E.g: 5000'}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    id="consent-job"
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="consent-job" className="text-sm text-gray-600">
                    {language === 'es'
                      ? 'Acepto la política de privacidad y el tratamiento de mis datos personales para fines de reclutamiento.'
                      : 'I accept the privacy policy and the processing of my personal data for recruitment purposes.'} *
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100 group"
                  >
                    {language === 'es' ? 'Enviar aplicación' : 'Submit application'}
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
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