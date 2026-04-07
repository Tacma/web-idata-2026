import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Compass,
  Filter,
  Globe,
  MapPin,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { getByKey as getPageByKey } from '../../../services/pagesService';
import { getPublished as getJobs } from '../../../services/jobsService';
import { getHomeSections } from '../../../services/homeSectionsService';
import { mockJobs } from '../../data/mockData';
import { JobApplicationForm } from '../components/careers/JobApplicationForm';
import { CTABandSection } from '../components/sections/CTABandSection';

import cultureImage from '/assets/images/careers/culture.png';

const allowMockFallback = import.meta.env.DEV;

function getModalityLabel(language: 'es' | 'en', modality?: string | null) {
  if (modality === 'hybrid') return language === 'es' ? 'Híbrido' : 'Hybrid';
  if (modality === 'onsite') return language === 'es' ? 'Presencial' : 'On-site';
  return language === 'es' ? 'Remoto' : 'Remote';
}

function getSeniorityLabel(language: 'es' | 'en', seniority?: string | null) {
  const normalized = String(seniority || '').toLowerCase();
  const labels: Record<string, { es: string; en: string }> = {
    junior: { es: 'Junior', en: 'Junior' },
    mid: { es: 'Mid-level', en: 'Mid-level' },
    senior: { es: 'Senior', en: 'Senior' },
    lead: { es: 'Lead', en: 'Lead' },
    manager: { es: 'Manager', en: 'Manager' },
  };

  return labels[normalized] ? (language === 'es' ? labels[normalized].es : labels[normalized].en) : seniority || '';
}

function findSectionByVariant(sections: any[], variant: string) {
  return sections.find((section) => section?.config?.variant === variant || section?.config?.key === variant) || null;
}

function getCareersDefaults(language: 'es' | 'en') {
  const isEs = language === 'es';

  return {
    hero: {
      eyebrow: isEs ? 'Talento iData' : 'iData Talent',
      title: isEs ? 'Únete a iData Global' : 'Join iData Global',
      subtitle: isEs
        ? 'Buscamos personas que quieran transformar negocios con datos, analítica e inteligencia artificial, trabajando en una cultura donde importan tanto la excelencia técnica como el impacto humano.'
        : 'We are looking for people who want to transform businesses with data, analytics and artificial intelligence, in a culture where technical excellence matters as much as human impact.',
    },
    culture: {
      title: isEs ? 'Por qué es cool trabajar con nosotros' : 'Why it is cool to work with us',
      subtitle: isEs
        ? 'En iData Global creemos que el mejor trabajo sucede cuando se unen grandes personas, decisiones basadas en datos y soluciones que realmente generan impacto.'
        : 'At iData Global we believe the best work happens when great people, data-driven decisions and solutions that truly create impact come together.',
      closing: isEs
        ? 'Nuestra cultura está diseñada para que el talento crezca con propósito, colabore con confianza y deje huella en proyectos que importan.'
        : 'Our culture is designed so talent can grow with purpose, collaborate with confidence and leave a mark on projects that matter.',
      cards: [
        {
          eyebrow: 'Cool People',
          title: isEs ? 'Personas que elevan al equipo' : 'People who elevate the team',
          description: isEs
            ? 'Trabajamos con empatía, liderazgo con ejemplo, colaboración real y una mentalidad de crecimiento continuo.'
            : 'We work with empathy, lead by example, collaborate for real and keep a mindset of continuous growth.',
        },
        {
          eyebrow: 'Cool Tech',
          title: isEs ? 'Tecnología con criterio' : 'Technology with purpose',
          description: isEs
            ? 'Usamos datos, analítica e inteligencia artificial con rigor, curiosidad y un enfoque ético para tomar mejores decisiones.'
            : 'We use data, analytics and AI with rigor, curiosity and an ethical approach to make better decisions.',
        },
        {
          eyebrow: 'Cool Solutions',
          title: isEs ? 'Soluciones que aterrizan en negocio' : 'Solutions grounded in business',
          description: isEs
            ? 'Nos enfocamos en resolver problemas reales con creatividad, visión de usuario e impacto sostenible.'
            : 'We focus on solving real problems with creativity, user perspective and sustainable impact.',
        },
      ],
    },
    benefits: {
      title: isEs ? 'Algunos beneficios de crecer con iData' : 'Some benefits of growing with iData',
      subtitle: isEs
        ? 'Queremos que trabajar en iData también se sienta bien en lo cotidiano, con beneficios que acompañen tu bienestar, tu crecimiento y tu vida personal.'
        : 'We want working at iData to feel good in everyday life too, with benefits that support your wellbeing, growth and personal life.',
      cards: [
        {
          eyebrow: isEs ? 'Tiempo para ti' : 'Time for you',
          title: isEs ? 'Día libre de cumpleaños' : 'Birthday day off',
          description: isEs
            ? 'Queremos que celebres tu día con calma. Tendrás un espacio para desconectarte, compartir con los tuyos y recargar energía.'
            : 'We want you to celebrate your day with ease. You will have time to disconnect, be with your people and recharge.',
          icon: 'sparkles',
        },
        {
          eyebrow: isEs ? 'Bienestar' : 'Wellbeing',
          title: isEs ? 'Bono para salud y bienestar' : 'Health and wellbeing bonus',
          description: isEs
            ? 'Impulsamos beneficios que te ayuden a cuidar tu salud física y mental, con apoyo pensado para tu bienestar integral.'
            : 'We promote benefits that help you take care of your physical and mental health, with support designed for your wellbeing.',
          icon: 'globe',
        },
        {
          eyebrow: isEs ? 'Flexibilidad' : 'Flexibility',
          title: isEs ? 'Espacios para balancear tu vida' : 'Room to balance your life',
          description: isEs
            ? 'Promovemos dinámicas que te permitan organizarte mejor, trabajar con autonomía y sostener un equilibrio sano entre vida y trabajo.'
            : 'We encourage ways of working that help you organize your time, work with autonomy and keep a healthy work-life balance.',
          icon: 'users',
        },
      ],
    },
    process: {
      title: isEs ? 'Proceso de selección' : 'Hiring process',
      subtitle: isEs ? 'Un recorrido claro, humano y ágil.' : 'A clear, human and agile journey.',
      steps: [
        {
          title: isEs ? 'Aplica' : 'Apply',
          description: isEs ? 'Comparte tu perfil, tu experiencia y el rol que te interesa.' : 'Share your profile, experience and the role you are interested in.',
        },
        {
          title: isEs ? 'Revisión de perfil' : 'Profile review',
          description: isEs ? 'Nuestro equipo valida el match entre tu recorrido y la oportunidad.' : 'Our team validates the match between your background and the opportunity.',
        },
        {
          title: isEs ? 'Primera conversación' : 'First conversation',
          description: isEs ? 'Nos conocemos, resolvemos dudas y profundizamos en tu experiencia.' : 'We get to know each other, answer questions and go deeper into your experience.',
        },
        {
          title: isEs ? 'Evaluación técnica' : 'Technical evaluation',
          description: isEs ? 'Dependiendo del rol, te propondremos un reto o conversación técnica.' : 'Depending on the role, we may propose a challenge or technical conversation.',
        },
        {
          title: isEs ? 'Conversación final' : 'Final conversation',
          description: isEs ? 'Alineamos expectativas con líderes del equipo y del contexto de negocio.' : 'We align expectations with team leaders and the business context.',
        },
        {
          title: isEs ? 'Oferta' : 'Offer',
          description: isEs ? 'Si hay fit mutuo, te invitamos a construir con nosotros.' : 'If there is mutual fit, we invite you to build with us.',
        },
      ],
    },
    faq: {
      title: isEs ? 'Preguntas frecuentes' : 'Frequently asked questions',
      items: [
        {
          question: isEs
            ? '¿Puedo aplicar si no hay una vacante activa que coincida con mi perfil?'
            : 'Can I apply if there is no current opening that matches my profile?',
          answer: isEs
            ? 'Sí. Puedes aplicar para otro cargo y tendremos tu perfil en cuenta para futuras oportunidades.'
            : 'Yes. You can apply for a different role and we will consider your profile for future opportunities.',
        },
        {
          question: isEs ? '¿El proceso es remoto?' : 'Is the process remote?',
          answer: isEs
            ? 'Sí. La mayor parte del proceso puede realizarse de forma remota, con espacios de conversación claros y acompañamiento del equipo.'
            : 'Yes. Most of the process can happen remotely, with clear conversation spaces and guidance from the team.',
        },
        {
          question: isEs ? '¿Qué debo enviar para aplicar?' : 'What should I send to apply?',
          answer: isEs
            ? 'Tu CV en PDF y, si tienes, un enlace a LinkedIn o portfolio. Eso es suficiente para iniciar.'
            : 'Your resume in PDF and, if available, a LinkedIn or portfolio link. That is enough to get started.',
        },
        {
          question: isEs ? '¿Cuánto tarda el proceso?' : 'How long does the process take?',
          answer: isEs
            ? 'Depende del rol, pero siempre buscamos un proceso ágil, transparente y con comunicación oportuna.'
            : 'It depends on the role, but we always aim for an agile, transparent process with timely communication.',
        },
      ],
    },
    openApplication: {
      title: isEs ? '¿No ves una vacante para ti? Aplica para otro cargo aquí' : "Don't see a role for you? Apply for a different role here",
      subtitle: isEs
        ? 'Siempre estamos abiertos a conocer talento que quiera crecer con nosotros. Si hoy no hay una vacante que encaje contigo, puedes enviarnos tu perfil para futuras oportunidades.'
        : 'We are always open to meeting talent that wants to grow with us. If there is not a current opening that fits you today, you can send us your profile for future opportunities.',
    },
    cta: {
      id: 'careers-cta-band',
      language,
      type: 'ctaBand',
      isEnabled: true,
      order: 999,
      title: isEs ? '¿Listo para encontrar tu próximo reto con propósito?' : 'Ready to find your next purpose-driven challenge?',
      subtitle: isEs ? 'Explora las vacantes activas o compártenos tu perfil para futuras oportunidades.' : 'Explore active openings or share your profile for future opportunities.',
      ctaLabel: isEs ? 'Ver vacantes' : 'View openings',
      ctaHref: '#openings',
      createdAt: '',
      updatedAt: '',
    },
  };
}

export function Careers() {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const [pageRecord, setPageRecord] = useState<any | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedModality, setSelectedModality] = useState('all');
  const [selectedSeniority, setSelectedSeniority] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const defaults = useMemo(() => getCareersDefaults(language), [language]);

  const fallbackJobs = useMemo(
    () =>
      mockJobs.map((job: any) => ({
        ...job,
        area_es: job.area_es ?? job.department_es ?? '',
        area_en: job.area_en ?? job.department_en ?? '',
        short_summary_es: job.short_summary_es ?? job.excerpt_es ?? job.description_es ?? '',
        short_summary_en: job.short_summary_en ?? job.excerpt_en ?? job.description_en ?? '',
        modality: job.modality ?? 'remote',
        seniority: job.seniority ?? 'mid',
      })),
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadPage() {
      try {
        const [page, sectionRows] = await Promise.all([
          getPageByKey('careers'),
          getHomeSections(language, 'careers').catch(() => []),
        ]);

        if (!cancelled) {
          setPageRecord(page);
          setSections(sectionRows.filter((section) => section.isEnabled));
        }
      } catch (error) {
        console.error('Error loading careers page metadata:', error);
      }
    }

    loadPage();

    return () => {
      cancelled = true;
    };
  }, [language]);

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      try {
        const records = await getJobs();
        if (!cancelled) {
          setJobs(records.length > 0 ? records : allowMockFallback ? fallbackJobs : []);
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
  }, [fallbackJobs]);

  const introSection = findSectionByVariant(sections, 'careersIntro');
  const cultureSection = findSectionByVariant(sections, 'careersCulture');
  const benefitsSection = findSectionByVariant(sections, 'careersBenefits');
  const processSection = findSectionByVariant(sections, 'careersProcess');
  const faqSection = findSectionByVariant(sections, 'careersFaq');
  const openApplicationSection = findSectionByVariant(sections, 'careersOpenApplication');
  const ctaBandSection = sections.find((section) => section.type === 'ctaBand') || defaults.cta;

  const heroTitle = introSection?.title || defaults.hero.title;
  const heroSubtitle = introSection?.subtitle || defaults.hero.subtitle;
  const heroEyebrow = introSection?.config?.eyebrow || defaults.hero.eyebrow;

  const cultureCards = Array.isArray(cultureSection?.config?.cards) && cultureSection.config.cards.length > 0
    ? cultureSection.config.cards
    : defaults.culture.cards;

  const hiringSteps = Array.isArray(processSection?.config?.steps) && processSection.config.steps.length > 0
    ? processSection.config.steps
    : defaults.process.steps;

  const benefitsCards = Array.isArray(benefitsSection?.config?.cards) && benefitsSection.config.cards.length > 0
    ? benefitsSection.config.cards
    : defaults.benefits.cards;

  const faqItems = Array.isArray(faqSection?.config?.items) && faqSection.config.items.length > 0
    ? faqSection.config.items
    : defaults.faq.items;

  const jobOpenings = jobs.filter((job: any) => job.status === 'published' && job.active !== false);

  const filteredJobs = jobOpenings.filter((job) => {
    const title = language === 'es' ? job.title_es : job.title_en;
    const summary = language === 'es' ? job.short_summary_es : job.short_summary_en;
    const area = language === 'es' ? job.area_es : job.area_en;
    const location = language === 'es' ? job.location_es : job.location_en;

    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      title.toLowerCase().includes(normalizedQuery) ||
      String(summary || '').toLowerCase().includes(normalizedQuery) ||
      String(area || '').toLowerCase().includes(normalizedQuery);

    const matchesArea = selectedArea === 'all' || area === selectedArea;
    const matchesLocation = selectedLocation === 'all' || String(location || '').includes(selectedLocation);
    const matchesModality = selectedModality === 'all' || job.modality === selectedModality;
    const matchesSeniority = selectedSeniority === 'all' || job.seniority === selectedSeniority;

    return matchesSearch && matchesArea && matchesLocation && matchesModality && matchesSeniority;
  });

  const areas = Array.from(new Set(jobOpenings.map((job) => (language === 'es' ? job.area_es : job.area_en)).filter(Boolean)));
  const locations = Array.from(
    new Set(
      jobOpenings
        .map((job) => {
          const value = language === 'es' ? job.location_es : job.location_en;
          return value?.split('/')[0]?.trim() || value;
        })
        .filter(Boolean),
    ),
  );

  const selectedJobKey = searchParams.get('job');
  const selectedJob = selectedJobKey
    ? jobOpenings.find((job) =>
        [job.id, job.slug, job.slug_es, job.slug_en].filter(Boolean).includes(selectedJobKey),
      ) || null
    : null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.location.hash) return;

    const targetId = window.location.hash.replace('#', '');
    const element = document.getElementById(targetId);

    if (!element) return;

    window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [selectedJobKey, jobs.length]);

  const seoTitle = pageRecord
    ? language === 'es'
      ? pageRecord.title_es
      : pageRecord.title_en
    : language === 'es'
      ? 'Trabaja con nosotros - iData'
      : 'Work with us - iData';

  const seoDescription = pageRecord
    ? language === 'es'
      ? pageRecord.description_es
      : pageRecord.description_en
    : heroSubtitle;

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

      <div className={`min-h-screen pt-20 pb-20 ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'}`}>
        <section
          id="openings"
          className={`relative overflow-x-hidden border-b ${isDark ? 'border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(167,139,250,0.16),transparent_28%),linear-gradient(180deg,#020617,#0f172a)]' : 'border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.9),transparent_28%),radial-gradient(circle_at_top_right,rgba(221,214,254,0.9),transparent_28%),linear-gradient(180deg,#f8fbff,#ffffff)]'}`}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute left-[-8rem] top-20 h-72 w-72 rounded-full blur-3xl ${isDark ? 'bg-sky-400/10' : 'bg-blue-300/40'}`} />
            <div className={`absolute right-[-6rem] top-12 h-72 w-72 rounded-full blur-3xl ${isDark ? 'bg-violet-400/12' : 'bg-violet-300/40'}`} />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0088FF]">{heroEyebrow}</p>
                <h1 className={`mt-5 max-w-4xl text-balance text-5xl font-light leading-[0.95] tracking-[-0.08em] md:text-6xl lg:text-7xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {heroTitle}
                </h1>
                <p className={`mt-6 max-w-3xl text-lg leading-relaxed md:text-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {heroSubtitle}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`mt-8 overflow-x-auto px-1 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDark ? 'text-white' : 'text-slate-900'}`}
            >
              <div className="flex gap-4 sm:grid sm:w-full sm:grid-cols-3">
                {[
                  {
                    value: `${jobOpenings.length}`,
                    label: language === 'es' ? 'vacantes activas' : 'active openings',
                  },
                  {
                    value: `${areas.length || 1}`,
                    label: language === 'es' ? 'áreas en movimiento' : 'areas in motion',
                  },
                  {
                    value: `${locations.length || 1}`,
                    label: language === 'es' ? 'mercados y ubicaciones' : 'markets and locations',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`min-w-[250px] flex-shrink-0 rounded-[28px] border px-5 py-5 shadow-[0_14px_28px_rgba(15,23,42,0.05),0_4px_10px_rgba(15,23,42,0.04)] backdrop-blur-xl sm:min-w-0 ${isDark ? 'border-white/10 bg-white/5' : 'border-white/80 bg-white/76'}`}
                  >
                    <div className="text-3xl font-light tracking-[-0.06em]">{item.value}</div>
                    <div className={`mt-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`mt-10 rounded-[30px] border p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-white/5' : 'border-white/80 bg-white/82'}`}
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#0088FF]">
                <Filter className="h-4 w-4" />
                {language === 'es' ? 'Filtra oportunidades' : 'Filter opportunities'}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                <div className="relative xl:col-span-2">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={language === 'es' ? 'Busca por cargo, stack o área...' : 'Search by role, stack or area...'}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className={`w-full rounded-2xl border py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/25 ${isDark ? 'border-white/10 bg-slate-950/60 text-white placeholder:text-slate-500' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'}`}
                  />
                </div>

                <select
                  value={selectedArea}
                  onChange={(event) => setSelectedArea(event.target.value)}
                  className={`ui-select rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/25 ${isDark ? 'border-white/10 bg-slate-950/60 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
                >
                  <option value="all">{language === 'es' ? 'Todas las áreas' : 'All areas'}</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedLocation}
                  onChange={(event) => setSelectedLocation(event.target.value)}
                  className={`ui-select rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/25 ${isDark ? 'border-white/10 bg-slate-950/60 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
                >
                  <option value="all">{language === 'es' ? 'Todas las ubicaciones' : 'All locations'}</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-4 xl:grid-cols-2">
                  <select
                    value={selectedModality}
                    onChange={(event) => setSelectedModality(event.target.value)}
                    className={`ui-select rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/25 ${isDark ? 'border-white/10 bg-slate-950/60 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
                  >
                    <option value="all">{language === 'es' ? 'Modalidad' : 'Modality'}</option>
                    <option value="remote">{language === 'es' ? 'Remoto' : 'Remote'}</option>
                    <option value="hybrid">{language === 'es' ? 'Híbrido' : 'Hybrid'}</option>
                    <option value="onsite">{language === 'es' ? 'Presencial' : 'On-site'}</option>
                  </select>

                  <select
                    value={selectedSeniority}
                    onChange={(event) => setSelectedSeniority(event.target.value)}
                    className={`ui-select rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/25 ${isDark ? 'border-white/10 bg-slate-950/60 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
                  >
                    <option value="all">{language === 'es' ? 'Nivel' : 'Level'}</option>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid-level</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => {
                  const jobSlug = language === 'es' ? job.slug_es : job.slug_en;
                  const title = language === 'es' ? job.title_es : job.title_en;
                  const summary = language === 'es' ? job.short_summary_es : job.short_summary_en;
                  const area = language === 'es' ? job.area_es : job.area_en;
                  const location = language === 'es' ? job.location_es : job.location_en;
                  const employmentType = language === 'es' ? job.employment_type_es || job.type_es : job.employment_type_en || job.type_en;

                  return (
                    <motion.article
                      key={job.id}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                      className={`group rounded-[32px] border p-6 shadow-[0_18px_38px_rgba(15,23,42,0.08),0_30px_80px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.10),0_38px_95px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(6,12,24,0.98))] hover:border-sky-400/30' : 'border-white/80 bg-white/88 hover:border-sky-200'}`}
                    >
                      <div className="flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                              {area || (language === 'es' ? 'Equipo iData' : 'iData team')}
                            </p>
                            <h2 className={`mt-3 text-2xl font-light tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                              {title}
                            </h2>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'bg-white/8 text-slate-200' : 'bg-slate-100 text-slate-600'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2 text-sm">
                          {area && (
                            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                              <Briefcase className="h-4 w-4 text-[#0088FF]" />
                              {area}
                            </span>
                          )}
                          {location && (
                            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                              <MapPin className="h-4 w-4 text-[#0088FF]" />
                              {location}
                            </span>
                          )}
                          <span className={`rounded-full border px-3 py-1.5 ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                            {getModalityLabel(language, job.modality)}
                          </span>
                          <span className={`rounded-full border px-3 py-1.5 ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                            {getSeniorityLabel(language, job.seniority)}
                          </span>
                          {employmentType && (
                            <span className={`rounded-full border px-3 py-1.5 ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                              {employmentType}
                            </span>
                          )}
                        </div>

                        <p className={`mt-5 flex-1 text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {summary}
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                          <Link
                            to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros/ofertas' : 'work-with-us/jobs'}/${jobSlug}`}
                            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-250 ${isDark ? 'border border-white/12 bg-white/6 text-white hover:bg-white/10' : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'}`}
                          >
                            {language === 'es' ? 'Ver detalle' : 'View details'}
                          </Link>
                          <Link
                            to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}?job=${jobSlug}#open-application`}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-all duration-250 hover:bg-slate-800 hover:shadow-[0_18px_34px_rgba(15,23,42,0.18)]"
                          >
                            {language === 'es' ? 'Aplicar' : 'Apply'}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })
              ) : (
                <div className={`lg:col-span-2 rounded-[32px] border px-8 py-14 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-white/5' : 'border-white/80 bg-white/86'}`}>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0088FF]/10 text-[#0088FF]">
                    <Compass className="h-8 w-8" />
                  </div>
                  <h3 className={`mt-6 text-3xl font-light tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {language === 'es' ? 'No encontramos vacantes con esos filtros' : 'We could not find openings with those filters'}
                  </h3>
                  <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'es'
                      ? 'Puedes ajustar la búsqueda o aplicar para otro cargo.'
                      : 'You can adjust the search or apply for a different role.'}
                  </p>
                  <a
                    href="#open-application"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-all duration-250 hover:bg-slate-800"
                  >
                    {language === 'es' ? 'Quiero aplicar para otro cargo' : 'I want to apply for a different role'}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={`py-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                  {language === 'es' ? 'Cultura iData' : 'iData Culture'}
                </p>
                <h2 className={`mt-4 text-balance text-4xl font-light tracking-[-0.06em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {cultureSection?.title || defaults.culture.title}
                </h2>
                <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {cultureSection?.subtitle || defaults.culture.subtitle}
                </p>

                <div className={`mt-8 overflow-hidden rounded-[32px] border shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-slate-900' : 'border-slate-200 bg-slate-100'}`}>
                  <img
                    src={cultureSection?.config?.image || cultureImage}
                    alt={language === 'es' ? 'Cultura de equipo iData' : 'iData team culture'}
                    className="h-[380px] w-full object-cover"
                  />
                </div>
              </motion.div>

              <div className="grid gap-5">
                {cultureCards.map((card: any, index: number) => (
                  <motion.article
                    key={`${card.title}-${index}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className={`rounded-[30px] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-white/5' : 'border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.95))]'}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0088FF]">
                      {card.eyebrow || `${language === 'es' ? 'Bloque' : 'Block'} ${index + 1}`}
                    </p>
                    <h3 className={`mt-4 text-2xl font-light tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>{card.title}</h3>
                    <p className={`mt-4 text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{card.description}</p>
                  </motion.article>
                ))}

                <div className={`rounded-[30px] border px-6 py-5 ${isDark ? 'border-sky-400/15 bg-sky-400/5 text-slate-200' : 'border-sky-100 bg-sky-50/70 text-slate-700'}`}>
                  <p className="text-sm leading-relaxed">
                    {cultureSection?.config?.closing || defaults.culture.closing}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${isDark ? 'bg-[linear-gradient(180deg,#020617,#0b1222)]' : 'bg-[linear-gradient(180deg,#f8fbff,#ffffff)]'} py-20`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                {language === 'es' ? 'Beneficios' : 'Benefits'}
              </p>
              <h2 className={`mt-4 text-balance text-4xl font-light tracking-[-0.06em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {benefitsSection?.title || defaults.benefits.title}
              </h2>
              <p className={`mt-4 text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {benefitsSection?.subtitle || defaults.benefits.subtitle}
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {benefitsCards.map((card: any, index: number) => {
                const Icon =
                  card.icon === 'globe'
                    ? Globe
                    : card.icon === 'users'
                      ? Users
                      : Sparkles;

                return (
                  <motion.article
                    key={`${card.title}-${index}`}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    className={`rounded-[30px] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-white/5' : 'border-white/80 bg-white/88'}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                        {card.eyebrow}
                      </p>
                      <div className={`rounded-2xl p-3 ${isDark ? 'bg-white/8 text-[#7dc4ff]' : 'bg-[#0088FF]/10 text-[#0088FF]'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className={`mt-6 text-2xl font-light tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {card.title}
                    </h3>
                    <p className={`mt-4 text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {card.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${isDark ? 'bg-[linear-gradient(180deg,#020617,#0b1222)]' : 'bg-[linear-gradient(180deg,#f8fbff,#ffffff)]'} py-20`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                {language === 'es' ? 'Cómo se vive' : 'How it works'}
              </p>
              <h2 className={`mt-4 text-4xl font-light tracking-[-0.06em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {processSection?.title || defaults.process.title}
              </h2>
              <p className={`mt-4 text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {processSection?.subtitle || defaults.process.subtitle}
              </p>
            </motion.div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
              {hiringSteps.map((step: any, index: number) => (
                <motion.div
                  key={`${step.title}-${index}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className={`rounded-[30px] border p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-white/5' : 'border-white/80 bg-white/85'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0088FF] text-lg font-semibold text-white">
                      {index + 1}
                    </span>
                    <CheckCircle2 className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-slate-300'}`} />
                  </div>
                  <h3 className={`mt-5 text-xl font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>{step.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                {language === 'es' ? 'FAQ' : 'FAQ'}
              </p>
              <h2 className={`mt-4 text-4xl font-light tracking-[-0.06em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {faqSection?.title || defaults.faq.title}
              </h2>
            </motion.div>

            <div className="mt-10 space-y-4">
              {faqItems.map((item: any, index: number) => (
                <motion.div
                  key={`${item.question}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`overflow-hidden rounded-[28px] border ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className={`text-lg font-light ${isDark ? 'text-white' : 'text-slate-950'}`}>{item.question}</span>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''} ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-6">
                      <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="open-application"
          className={`scroll-mt-28 py-20 ${isDark ? 'bg-[linear-gradient(180deg,#0b1222,#020617)]' : 'bg-[linear-gradient(180deg,#f8fbff,#ffffff)]'}`}
        >
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                {selectedJob
                  ? language === 'es'
                    ? 'Aplicación contextual'
                    : 'Contextual application'
                  : language === 'es'
                    ? 'Aplicación a otro cargo'
                    : 'Apply for a different role'}
              </p>
              <h2 className={`mt-4 text-balance text-4xl font-light tracking-[-0.06em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {selectedJob
                  ? language === 'es'
                    ? `Aplica a ${selectedJob.title_es || selectedJob.title_en}`
                    : `Apply to ${selectedJob.title_en || selectedJob.title_es}`
                  : openApplicationSection?.title || defaults.openApplication.title}
              </h2>
              <p className={`mt-4 text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedJob
                  ? language === 'es'
                    ? 'Ya cargamos el contexto de la vacante para que no tengas que volver a seleccionarla manualmente.'
                    : 'We already loaded the job context so you do not have to choose it manually again.'
                  : openApplicationSection?.subtitle || defaults.openApplication.subtitle}
              </p>
              {selectedJob && (
                <Link
                  to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}#open-application`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0088FF]"
                >
                  {language === 'es' ? 'Quiero aplicar para otro cargo' : 'I want to apply for a different role'}
                </Link>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className={`mt-10 rounded-[34px] border p-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8 ${isDark ? 'border-white/10 bg-white/5' : 'border-white/80 bg-white/88'}`}
            >
              <JobApplicationForm
                language={language}
                applicationType={selectedJob ? 'job' : 'open'}
                job={selectedJob}
                submitLabel={language === 'es' ? 'Enviar postulación' : 'Send application'}
              />
            </motion.div>
          </div>
        </section>

        <CTABandSection section={ctaBandSection} />
      </div>
    </>
  );
}
