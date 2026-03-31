import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { motion } from 'motion/react';
import { ArrowRight, Search, MapPin, Briefcase, Clock, Users, Target, TrendingUp, Award, CheckCircle, Heart, Lightbulb, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useState } from 'react';
import { useEffect } from 'react';
import { getByKey as getPageByKey } from '../../../services/pagesService';
import { getPublished as getJobs } from '../../../services/jobsService';
import { mockJobs } from '../../data/mockData';
import { InternalPageHero } from '../components/InternalPageHero';
import { EXTERNAL_DATA_POLICY_URL } from '../../shared/constants/legalLinks';

const allowMockFallback = import.meta.env.DEV;
const NAME_PATTERN = "[A-Za-zÀ-ÿ' -]+";
const PHONE_PATTERN = "[0-9+() -]{8,20}";

// Hero banner image
import careersBannerImage from '/assets/images/careers/careers-banner.png';

// Culture section image
import cultureImage from '/assets/images/careers/culture.png';

export function Careers() {
  const { language } = useLanguage();
  const [pageRecord, setPageRecord] = useState<any | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);

  // State for job filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedModality, setSelectedModality] = useState('all');
  const [selectedSeniority, setSelectedSeniority] = useState('all');

  // State for FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const fallbackJobs = mockJobs.map((job: any) => ({
    ...job,
    area_es: job.area_es ?? job.department_es ?? '',
    area_en: job.area_en ?? job.department_en ?? '',
    short_summary_es: job.short_summary_es ?? job.excerpt_es ?? job.description_es ?? '',
    short_summary_en: job.short_summary_en ?? job.excerpt_en ?? job.description_en ?? '',
    modality: job.modality ?? 'remote',
    seniority: job.seniority ?? 'mid',
  }));

  useEffect(() => {
    let cancelled = false;

    async function loadPageRecord() {
      try {
        const record = await getPageByKey('careers');
        if (!cancelled) {
          setPageRecord(record);
        }
      } catch (error) {
        console.error('Error loading careers page metadata:', error);
      }
    }

    loadPageRecord();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      try {
        const records = await getJobs();
        if (!cancelled) {
          setJobs(records.length > 0 ? records : (allowMockFallback ? fallbackJobs : []));
        }
      } catch (error) {
        console.error('Error loading careers jobs:', error);
        if (!cancelled) {
          setJobs(allowMockFallback ? fallbackJobs : []);
        }
      }
    }

    loadJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  // SEO Content
  const seoTitle = pageRecord
    ? (language === 'es' ? pageRecord.title_es : pageRecord.title_en)
    : language === 'es' ? 'Trabaja con nosotros - iData' : 'Work with us - iData';
  const seoDescription = pageRecord
    ? (language === 'es' ? pageRecord.description_es : pageRecord.description_en)
    : language === 'es'
      ? 'Únete a nuestro equipo de CoolStars y crece como experto en Data & AI, aportando a iniciativas de transformación estratégica y digital.'
      : 'Join our team of CoolStars and grow as a Data & AI expert, contributing to strategic and digital transformation initiatives.';

  // Hero Content
  const heroContent = {
    title: language === 'es' ? 'Trabaja con nosotros' : 'Work with us',
    description: language === 'es'
      ? 'Únete a nuestro equipo de CoolStars y crece como experto en Data & AI, aportando a iniciativas de transformación estratégica y digital para organizaciones visionarias.'
      : 'Join our team of CoolStars and grow as a Data & AI expert, contributing to strategic and digital transformation initiatives for visionary organizations.',
  };

  // Culture Content (in real app, this would come from CMS)
  const cultureContent = {
    title: language === 'es' ? 'Nuestra Cooltura' : 'Our Coolture',
    text: language === 'es'
      ? 'En iData valoramos la innovación, la empatía y la excelencia. Creemos en el balance entre personas, datos y soluciones. Fomentamos un ambiente donde cada CoolStar puede crecer profesionalmente, aprender continuamente y contribuir a proyectos que transforman organizaciones. Trabajamos con tecnologías de punta, metodologías ágiles y equipos multidisciplinarios que hacen la diferencia.'
      : 'At iData we value innovation, empathy and excellence. We believe in the balance between people, data and solutions. We foster an environment where each CoolStar can grow professionally, learn continuously and contribute to projects that transform organizations. We work with cutting-edge technologies, agile methodologies and multidisciplinary teams that make a difference.',
  };

  // Benefits (Why work with us)
  const benefits = [
    {
      icon: TrendingUp,
      title: language === 'es' ? 'Crecimiento profesional' : 'Professional growth',
      description: language === 'es'
        ? 'Oportunidades de desarrollo continuo y rutas de carrera claras'
        : 'Continuous development opportunities and clear career paths',
    },
    {
      icon: Lightbulb,
      title: language === 'es' ? 'Proyectos innovadores' : 'Innovative projects',
      description: language === 'es'
        ? 'Trabaja con tecnologías de punta en proyectos de transformación digital'
        : 'Work with cutting-edge technologies on digital transformation projects',
    },
    {
      icon: Users,
      title: language === 'es' ? 'Equipo internacional' : 'International team',
      description: language === 'es'
        ? 'Colabora con expertos de más de 10 países'
        : 'Collaborate with experts from over 10 countries',
    },
    {
      icon: Heart,
      title: language === 'es' ? 'Cultura people-first' : 'People-first culture',
      description: language === 'es'
        ? 'Balance vida-trabajo y ambiente de respeto mutuo'
        : 'Work-life balance and mutual respect environment',
    },
  ];

  // Hiring Process Steps
  const hiringSteps = [
    {
      number: 1,
      title: language === 'es' ? 'Aplica' : 'Apply',
      description: language === 'es'
        ? 'Envía tu CV y carta de presentación'
        : 'Submit your CV and cover letter',
    },
    {
      number: 2,
      title: language === 'es' ? 'Revisión de perfil' : 'Profile review',
      description: language === 'es'
        ? 'Nuestro equipo evalúa tu experiencia'
        : 'Our team evaluates your experience',
    },
    {
      number: 3,
      title: language === 'es' ? 'Entrevista' : 'Interview',
      description: language === 'es'
        ? 'Conversación con el equipo de reclutamiento'
        : 'Conversation with the recruitment team',
    },
    {
      number: 4,
      title: language === 'es' ? 'Evaluación técnica' : 'Technical assessment',
      description: language === 'es'
        ? 'Caso práctico o evaluación de habilidades'
        : 'Practical case or skills assessment',
    },
    {
      number: 5,
      title: language === 'es' ? 'Conversación final' : 'Final conversation',
      description: language === 'es'
        ? 'Reunión con líderes del área'
        : 'Meeting with area leaders',
    },
    {
      number: 6,
      title: language === 'es' ? 'Oferta' : 'Offer',
      description: language === 'es'
        ? 'Bienvenido al equipo de CoolStars'
        : 'Welcome to the CoolStars team',
    },
  ];

  // FAQ Content
  const faqItems = [
    {
      question: language === 'es'
        ? '¿Puedo aplicar si no hay una vacante activa que coincida con mi perfil?'
        : 'Can I apply if there is no current opening that matches my profile?',
      answer: language === 'es'
        ? 'Sí, absolutamente. Puedes enviar una aplicación espontánea a través de nuestro formulario de aplicación general. Mantendremos tu perfil en nuestra base de datos y te contactaremos cuando surja una oportunidad que se ajuste a tu experiencia.'
        : 'Yes, absolutely. You can submit an open application through our general application form. We will keep your profile in our database and contact you when an opportunity arises that matches your experience.',
    },
    {
      question: language === 'es'
        ? '¿El proceso de reclutamiento es remoto?'
        : 'Is the recruitment process remote?',
      answer: language === 'es'
        ? 'Sí, nuestro proceso de reclutamiento es completamente remoto. Todas las entrevistas y evaluaciones se realizan de forma virtual para garantizar accesibilidad a candidatos de diferentes ubicaciones.'
        : 'Yes, our recruitment process is completely remote. All interviews and assessments are conducted virtually to ensure accessibility for candidates from different locations.',
    },
    {
      question: language === 'es'
        ? '¿Qué documentos debo presentar?'
        : 'What documents should I submit?',
      answer: language === 'es'
        ? 'Necesitas enviar tu CV actualizado en formato PDF. Opcionalmente, puedes incluir una carta de presentación, portfolio o enlaces a proyectos relevantes. También te pediremos tu perfil de LinkedIn si está disponible.'
        : 'You need to submit your updated CV in PDF format. Optionally, you can include a cover letter, portfolio or links to relevant projects. We will also ask for your LinkedIn profile if available.',
    },
    {
      question: language === 'es'
        ? '¿Cuánto tiempo toma el proceso de selección?'
        : 'How long does the selection process take?',
      answer: language === 'es'
        ? 'El proceso completo suele tomar entre 2 y 4 semanas desde la aplicación inicial hasta la oferta final. Sin embargo, esto puede variar según la posición y disponibilidad de los candidatos y evaluadores.'
        : 'The complete process usually takes between 2 and 4 weeks from initial application to final offer. However, this may vary depending on the position and availability of candidates and evaluators.',
    },
  ];

  const jobOpenings = jobs.filter((job: any) => job.status === 'published');

  // Filter jobs based on current filters
  const filteredJobs = jobOpenings.filter((job) => {
    const title = language === 'es' ? job.title_es : job.title_en;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === 'all' || (language === 'es' ? job.area_es : job.area_en) === selectedArea;
    const matchesLocation = selectedLocation === 'all' || (language === 'es' ? job.location_es : job.location_en).includes(selectedLocation);
    const matchesModality = selectedModality === 'all' || job.modality === selectedModality;
    const matchesSeniority = selectedSeniority === 'all' || job.seniority === selectedSeniority;

    return matchesSearch && matchesArea && matchesLocation && matchesModality && matchesSeniority;
  });

  // Get unique values for filters
  const areas = Array.from(new Set(jobOpenings.map(job => language === 'es' ? job.area_es : job.area_en)));
  const locations = Array.from(new Set(jobOpenings.map(job => {
    const value = language === 'es' ? job.location_es : job.location_en;
    return value?.split('/')[0]?.trim() || value;
  }).filter(Boolean)));

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}/`}
        alternateES="/es/trabaja-con-nosotros/"
        alternateEN="/en/work-with-us/"
        language={language}
      />

      <InternalPageHero
        eyebrow={language === 'es' ? 'Talento iData' : 'iData Talent'}
        title={heroContent.title}
        description={heroContent.description}
        imageSrc={careersBannerImage}
        imageAlt="Careers at iData"
      />

      {/* SECTION 2: Culture / Cooltura */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                {cultureContent.title}
              </h2>
              <p className="text-lg text-gray-700 font-light leading-relaxed">
                {cultureContent.text}
              </p>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                <img
                  src={cultureImage}
                  alt={language === 'es' ? 'Equipo iData - Nuestra Cooltura' : 'iData Team - Our Coolture'}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Why work with us / Benefits */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {language === 'es' ? '¿Por qué trabajar con nosotros?' : 'Why work with us?'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Icon className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-3 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 font-light text-center">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Open Positions Listing */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {language === 'es' ? 'Vacantes abiertas' : 'Open positions'}
            </h2>
            <p className="text-xl text-gray-600 font-light">
              {language === 'es'
                ? 'Encuentra tu próxima oportunidad'
                : 'Find your next opportunity'}
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'es' ? 'Buscar por título...' : 'Search by title...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Area */}
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">{language === 'es' ? 'Todas las áreas' : 'All areas'}</option>
                {areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>

              {/* Location */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">{language === 'es' ? 'Todas las ubicaciones' : 'All locations'}</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              {/* Modality */}
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">{language === 'es' ? 'Todas las modalidades' : 'All modalities'}</option>
                <option value="remote">{language === 'es' ? 'Remoto' : 'Remote'}</option>
                <option value="hybrid">{language === 'es' ? 'Híbrido' : 'Hybrid'}</option>
                <option value="onsite">{language === 'es' ? 'Presencial' : 'On-site'}</option>
              </select>

              {/* Seniority */}
              <select
                value={selectedSeniority}
                onChange={(e) => setSelectedSeniority(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">{language === 'es' ? 'Todos los niveles' : 'All levels'}</option>
                <option value="junior">Junior</option>
                <option value="mid">{language === 'es' ? 'Intermedio' : 'Mid'}</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          {/* Job Listings */}
          {filteredJobs.length > 0 ? (
            <div className="grid gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Left: Job Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-light text-gray-900 mb-3">
                        {language === 'es' ? job.title_es : job.title_en}
                      </h3>
                      
                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          <Briefcase className="w-4 h-4" />
                          {language === 'es' ? job.area_es : job.area_en}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          <MapPin className="w-4 h-4" />
                          {language === 'es' ? job.location_es : job.location_en}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          <Clock className="w-4 h-4" />
                          {job.modality === 'remote' ? (language === 'es' ? 'Remoto' : 'Remote') : 
                           job.modality === 'hybrid' ? (language === 'es' ? 'Híbrido' : 'Hybrid') : 
                           (language === 'es' ? 'Presencial' : 'On-site')}
                        </span>
                      </div>

                      <p className="text-gray-600 font-light">
                        {language === 'es' ? job.short_summary_es : job.short_summary_en}
                      </p>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex-shrink-0">
                      <Link
                        to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}/${language === 'es' ? job.slug_es : job.slug_en}`}
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100 group"
                      >
                        {language === 'es' ? 'Aplicar' : 'Apply now'}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200"
            >
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-gray-900 mb-3">
                {language === 'es'
                  ? 'No tenemos vacantes activas en este momento'
                  : 'We do not have active openings at the moment'}
              </h3>
              <p className="text-gray-600 font-light mb-6">
                {language === 'es'
                  ? 'Pero nos encantaría conocerte. Envía tu aplicación espontánea.'
                  : 'But we would still love to hear from you. Submit your open application.'}
              </p>
              <a
                href="#open-application"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100 group"
              >
                {language === 'es' ? 'Aplicación espontánea' : 'Open application'}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 5: Hiring Process */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {language === 'es' ? 'Proceso de selección' : 'Hiring process'}
            </h2>
            <p className="text-xl text-gray-600 font-light">
              {language === 'es'
                ? 'Un proceso transparente y ágil'
                : 'A transparent and agile process'}
            </p>
          </motion.div>

          {/* Timeline - Desktop & Tablet View */}
          <div className="hidden md:block relative">
            {/* Horizontal Timeline Line */}
            <div className="absolute top-[60px] left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200" />
            
            <div className="grid grid-cols-6 gap-4">
              {hiringSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="relative z-10 w-[120px] h-[120px] rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white flex flex-col items-center justify-center shadow-xl border-4 border-white">
                      <div className="text-3xl font-light mb-1">{step.number}</div>
                      <div className="text-xs font-medium opacity-90">
                        {language === 'es' ? 'PASO' : 'STEP'}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 min-h-[180px] flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light text-center flex-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow Connector (except for last item) */}
                  {index < hiringSteps.length - 1 && (
                    <div className="absolute top-[60px] -right-2 z-20">
                      <ArrowRight className="w-6 h-6 text-purple-600" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline - Mobile View (Vertical) */}
          <div className="md:hidden relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[30px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-400 to-purple-200" />
            
            <div className="space-y-8">
              {hiringSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 flex-shrink-0 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white flex flex-col items-center justify-center shadow-xl border-4 border-white">
                    <div className="text-xl font-light">{step.number}</div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {language === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-light text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Open Application / General Application Form */}
      <section id="open-application" className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {language === 'es' ? 'Aplicación espontánea' : 'Open application'}
            </h2>
            <p className="text-xl text-gray-600 font-light">
              {language === 'es'
                ? '¿No encuentras una vacante que se ajuste a tu perfil? Envíanos tu información y te contactaremos cuando surja una oportunidad.'
                : "Can't find an opening that matches your profile? Send us your information and we'll contact you when an opportunity arises."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
          >
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
                    pattern={NAME_PATTERN}
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
                    pattern={NAME_PATTERN}
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
                    pattern={PHONE_PATTERN}
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
                    pattern={NAME_PATTERN}
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
                    pattern={NAME_PATTERN}
                    title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Desired Area and Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'Área de interés' : 'Desired area'}
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">{language === 'es' ? 'Selecciona un área' : 'Select an area'}</option>
                    <option value="data-engineering">{language === 'es' ? 'Ingeniería de Datos' : 'Data Engineering'}</option>
                    <option value="data-science">{language === 'es' ? 'Ciencia de Datos' : 'Data Science'}</option>
                    <option value="analytics">{language === 'es' ? 'Analítica' : 'Analytics'}</option>
                    <option value="ai-ml">{language === 'es' ? 'IA & ML' : 'AI & ML'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'Rol deseado' : 'Desired role'}
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* LinkedIn and Portfolio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    pattern="https://.*"
                    placeholder="https://linkedin.com/in/..."
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
                  {language === 'es' ? 'Cuéntanos sobre ti' : 'Tell us about yourself'} *
                </label>
                <textarea
                  required
                  rows={6}
                  minLength={50}
                  maxLength={1000}
                  placeholder={language === 'es' 
                    ? 'Describe tu experiencia, habilidades y por qué te gustaría trabajar en iData...'
                    : 'Describe your experience, skills and why you would like to work at iData...'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {language === 'es' ? 'Mínimo 50 caracteres, máximo 1000' : 'Minimum 50 characters, maximum 1000'}
                </p>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  id="consent-open"
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="consent-open" className="text-sm text-gray-600">
                  {language === 'es' ? 'Acepto la ' : 'I accept the '}
                  <a
                    href={EXTERNAL_DATA_POLICY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0088FF] hover:underline"
                  >
                    {language === 'es' ? 'política de privacidad y el tratamiento de mis datos personales' : 'privacy policy and the processing of my personal data'}
                  </a>
                  {language === 'es' ? ' para fines de reclutamiento.' : ' for recruitment purposes.'} *
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
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Background blobs */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-50" />
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50" />

            {/* Card */}
            <div className="theme-glass-panel relative overflow-hidden rounded-2xl p-8 md:rounded-3xl">
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="mb-2 text-xl font-light leading-tight tracking-tight text-[var(--glass-text-primary)] md:text-2xl lg:text-3xl">
                      {language === 'es'
                        ? '¿Listo para unirte a los CoolStars?'
                        : 'Ready to join the CoolStars?'}
                    </h2>
                    <p className="text-sm font-light leading-relaxed text-[var(--glass-text-secondary)] md:text-base">
                      {language === 'es'
                        ? 'Explora nuestras vacantes o envía tu aplicación espontánea'
                        : 'Explore our openings or submit your open application'}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-end md:flex-shrink-0">
                    <a
                      href="#openings"
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-250 hover:shadow-xl hover:scale-[1.02] active:scale-100 group whitespace-nowrap"
                    >
                      {language === 'es' ? 'Ver vacantes' : 'View openings'}
                      <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
