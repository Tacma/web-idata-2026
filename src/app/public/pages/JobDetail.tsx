import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock3,
  Compass,
  DollarSign,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { getBySlug } from '../../../services/jobsService';
import { mockJobs } from '../../data/mockData';
import { JobApplicationForm } from '../components/careers/JobApplicationForm';

const allowMockFallback = import.meta.env.DEV;

function normalizeList(value: any) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function getModalityLabel(language: 'es' | 'en', modality?: string | null) {
  if (modality === 'hybrid') return language === 'es' ? 'Híbrido' : 'Hybrid';
  if (modality === 'onsite') return language === 'es' ? 'Presencial' : 'On-site';
  return language === 'es' ? 'Remoto' : 'Remote';
}

function getSeniorityLabel(language: 'es' | 'en', seniority?: string | null) {
  const labels: Record<string, { es: string; en: string }> = {
    junior: { es: 'Junior', en: 'Junior' },
    mid: { es: 'Mid-level', en: 'Mid-level' },
    senior: { es: 'Senior', en: 'Senior' },
    lead: { es: 'Lead', en: 'Lead' },
    manager: { es: 'Manager', en: 'Manager' },
  };

  const normalized = labels[String(seniority || '').toLowerCase()];
  return normalized ? (language === 'es' ? normalized.es : normalized.en) : seniority || '';
}

function getFallbackHiringProcess(language: 'es' | 'en') {
  return language === 'es'
    ? [
        'Aplicación y revisión inicial del perfil.',
        'Primera conversación con talento o liderazgo del área.',
        'Evaluación técnica o ejercicio contextual según el rol.',
        'Conversación final y alineación de expectativas.',
      ]
    : [
        'Application and initial profile review.',
        'First conversation with talent or area leadership.',
        'Technical evaluation or contextual exercise depending on the role.',
        'Final conversation and expectations alignment.',
      ];
}

function getDefaultEqualOpportunity(language: 'es' | 'en') {
  return language === 'es'
    ? 'En iData valoramos la diversidad de trayectorias, identidades y perspectivas. Nuestras decisiones de selección se basan en capacidades, potencial y ajuste al rol.'
    : 'At iData we value diverse backgrounds, identities and perspectives. Our hiring decisions are based on capabilities, potential and role fit.';
}

function buildFallbackSectionItems(
  language: 'es' | 'en',
  type: 'responsibilities' | 'requirements' | 'nice' | 'tools' | 'offer',
  context: {
    title: string;
    area?: string;
    modality?: string;
    seniority?: string;
    location?: string;
  },
) {
  const role = context.title || (language === 'es' ? 'este rol' : 'this role');
  const area = context.area || (language === 'es' ? 'el equipo' : 'the team');
  const modality = context.modality || (language === 'es' ? 'un esquema flexible de trabajo' : 'a flexible work setup');
  const seniority = context.seniority || (language === 'es' ? 'un nivel de autonomía acorde al rol' : 'the level of autonomy expected for the role');
  const location = context.location || (language === 'es' ? 'el mercado asignado' : 'the assigned market');

  if (type === 'responsibilities') {
    return language === 'es'
      ? [
          `Liderar o ejecutar iniciativas clave asociadas a ${role} con foco en calidad, claridad técnica y valor para negocio.`,
          `Colaborar con ${area} y con stakeholders para traducir necesidades en entregables accionables.`,
          `Asegurar documentación, seguimiento y comunicación oportuna durante el ciclo de trabajo.`,
          `Proponer mejoras continuas en prácticas, procesos y entregables del equipo.`,
        ]
      : [
          `Lead or execute key initiatives related to ${role} with a focus on quality, technical clarity and business value.`,
          `Collaborate with ${area} and stakeholders to translate needs into actionable deliverables.`,
          `Ensure documentation, follow-up and timely communication across the work cycle.`,
          `Propose continuous improvements in team practices, processes and deliverables.`,
        ];
  }

  if (type === 'requirements') {
    return language === 'es'
      ? [
          `Experiencia previa relevante para ${role} y capacidad para desenvolverse con ${seniority}.`,
          `Buena comunicación, pensamiento estructurado y criterio para trabajar con equipos multidisciplinarios.`,
          `Capacidad para priorizar, ejecutar con autonomía y mantener foco en resultados.`,
          `Disponibilidad para colaborar con clientes, equipos internos y contextos asociados a ${location}.`,
        ]
      : [
          `Relevant previous experience for ${role} and the ability to operate with ${seniority}.`,
          `Strong communication, structured thinking and judgment to work with multidisciplinary teams.`,
          `Ability to prioritize, execute autonomously and stay focused on outcomes.`,
          `Availability to collaborate with clients, internal teams and contexts related to ${location}.`,
        ];
  }

  if (type === 'nice') {
    return language === 'es'
      ? [
          'Experiencia en entornos consultivos, proyectos regionales o iniciativas de transformación.',
          'Capacidad para moverse bien entre detalle técnico y conversación de negocio.',
          'Curiosidad por aprender nuevas herramientas, frameworks o metodologías.',
        ]
      : [
          'Experience in consulting environments, regional projects or transformation initiatives.',
          'Ability to move comfortably between technical detail and business conversation.',
          'Curiosity to learn new tools, frameworks or methodologies.',
        ];
  }

  if (type === 'tools') {
    return language === 'es'
      ? [
          `Trabajo colaborativo con equipos cross-functional y comunicación continua bajo ${modality}.`,
          'Uso de herramientas de seguimiento, documentación y colaboración técnica según la práctica del equipo.',
          'Cultura de feedback, iteración y mejora continua en entregables y forma de trabajo.',
        ]
      : [
          `Collaborative work with cross-functional teams and ongoing communication under ${modality}.`,
          'Use of tracking, documentation and technical collaboration tools according to team practices.',
          'A culture of feedback, iteration and continuous improvement in deliverables and ways of working.',
        ];
  }

  return language === 'es'
    ? [
        'Un entorno donde importan la excelencia técnica, el criterio y la calidad humana.',
        'Espacios para aprender, colaborar y crecer en proyectos con impacto real.',
        'Acompañamiento cercano, contexto claro y oportunidades de aportar en iniciativas de transformación.',
      ]
    : [
        'An environment where technical excellence, judgment and human quality matter.',
        'Space to learn, collaborate and grow through projects with real impact.',
        'Close support, clear context and opportunities to contribute to transformation initiatives.',
      ];
}

function DetailSection({
  title,
  items,
  isDark,
  accent = 'primary',
  compact = false,
}: {
  title: string;
  items: string[];
  isDark: boolean;
  accent?: 'primary' | 'muted' | 'success';
  compact?: boolean;
}) {
  if (!items.length) return null;

  const accentClass =
    accent === 'success'
      ? 'text-emerald-500'
      : accent === 'muted'
        ? isDark
          ? 'text-slate-500'
          : 'text-slate-400'
        : 'text-[#0088FF]';

  return (
    <section className={`rounded-[30px] border ${compact ? 'p-5' : 'p-6'} shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
      <h2 className={`text-2xl font-light tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
      <ul className={`space-y-3 ${compact ? 'mt-4' : 'mt-5'}`}>
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex items-start gap-3">
            <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-shrink-0 ${accentClass}`} />
            <span className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function JobDetail() {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { slug } = useParams();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const applicationSectionRef = useRef<HTMLDivElement | null>(null);

  function getFallbackJob(currentSlug?: string) {
    const match = mockJobs.find((item: any) =>
      [item.slug, item.slug_es, item.slug_en].filter(Boolean).includes(currentSlug),
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
      about_role_es: match.about_role_es ?? match.overview_es ?? match.description_es ?? '',
      about_role_en: match.about_role_en ?? match.overview_en ?? match.description_en ?? '',
      responsibilities_es: normalizeList(match.responsibilities_es),
      responsibilities_en: normalizeList(match.responsibilities_en),
      required_qualifications_es: normalizeList(match.required_qualifications_es ?? match.requirements_es),
      required_qualifications_en: normalizeList(match.required_qualifications_en ?? match.requirements_en),
      nice_to_have_es: normalizeList(match.nice_to_have_es),
      nice_to_have_en: normalizeList(match.nice_to_have_en),
      what_we_offer_es: normalizeList(match.what_we_offer_es ?? match.benefits_es),
      what_we_offer_en: normalizeList(match.what_we_offer_en ?? match.benefits_en),
      tools_and_ways_of_working_es: normalizeList(match.tools_and_ways_of_working_es),
      tools_and_ways_of_working_en: normalizeList(match.tools_and_ways_of_working_en),
      hiring_process_es: normalizeList(match.hiring_process_es),
      hiring_process_en: normalizeList(match.hiring_process_en),
      equal_opportunity_note_es: match.equal_opportunity_note_es ?? getDefaultEqualOpportunity('es'),
      equal_opportunity_note_en: match.equal_opportunity_note_en ?? getDefaultEqualOpportunity('en'),
      apply_cta_label_es: match.apply_cta_label_es ?? 'Aplicar',
      apply_cta_label_en: match.apply_cta_label_en ?? 'Apply',
      modality: match.modality ?? 'remote',
      seniority: match.seniority ?? 'mid',
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

  useEffect(() => {
    if (!showApplicationForm || !applicationSectionRef.current) return;

    window.requestAnimationFrame(() => {
      applicationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [showApplicationForm]);

  if (!loading && !job) {
    return <Navigate to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}`} replace />;
  }

  if (!job) return null;

  const title = language === 'es' ? job.title_es : job.title_en;
  const summary = language === 'es' ? job.short_summary_es : job.short_summary_en;
  const aboutRole = language === 'es' ? job.about_role_es || job.overview_es : job.about_role_en || job.overview_en;
  const seo = language === 'es' ? job.seo_es : job.seo_en;
  const area = language === 'es' ? job.area_es : job.area_en;
  const location = language === 'es' ? job.location_es : job.location_en;
  const modalityLabel = getModalityLabel(language, job.modality);
  const seniorityLabel = getSeniorityLabel(language, job.seniority);
  const employmentType = language === 'es' ? job.employment_type_es || job.type_es : job.employment_type_en || job.type_en;
  const responsibilitiesRaw = language === 'es' ? normalizeList(job.responsibilities_es) : normalizeList(job.responsibilities_en);
  const qualificationsRaw = language === 'es' ? normalizeList(job.required_qualifications_es ?? job.requirements_es) : normalizeList(job.required_qualifications_en ?? job.requirements_en);
  const niceToHaveRaw = language === 'es' ? normalizeList(job.nice_to_have_es) : normalizeList(job.nice_to_have_en);
  const toolsRaw = language === 'es' ? normalizeList(job.tools_and_ways_of_working_es) : normalizeList(job.tools_and_ways_of_working_en);
  const whatWeOfferRaw = language === 'es' ? normalizeList(job.what_we_offer_es ?? job.benefits_es) : normalizeList(job.what_we_offer_en ?? job.benefits_en);
  const hiringProcess = language === 'es' ? normalizeList(job.hiring_process_es) : normalizeList(job.hiring_process_en);
  const equalOpportunityNote =
    language === 'es'
      ? job.equal_opportunity_note_es || getDefaultEqualOpportunity('es')
      : job.equal_opportunity_note_en || getDefaultEqualOpportunity('en');
  const applyLabel = language === 'es' ? job.apply_cta_label_es || 'Aplicar' : job.apply_cta_label_en || 'Apply';

  const fallbackContext = {
    title,
    area,
    modality: modalityLabel,
    seniority: seniorityLabel,
    location,
  };

  const responsibilities =
    responsibilitiesRaw.length >= 3 ? responsibilitiesRaw : buildFallbackSectionItems(language, 'responsibilities', fallbackContext);
  const qualifications =
    qualificationsRaw.length >= 3 ? qualificationsRaw : buildFallbackSectionItems(language, 'requirements', fallbackContext);
  const niceToHave =
    niceToHaveRaw.length >= 2 ? niceToHaveRaw : buildFallbackSectionItems(language, 'nice', fallbackContext);
  const tools =
    toolsRaw.length >= 2 ? toolsRaw : buildFallbackSectionItems(language, 'tools', fallbackContext);
  const whatWeOffer =
    whatWeOfferRaw.length >= 2 ? whatWeOfferRaw : buildFallbackSectionItems(language, 'offer', fallbackContext);

  return (
    <>
      <SEOHead
        title={seo?.metaTitle || `${title} - ${language === 'es' ? 'Trabaja con nosotros' : 'Work with us'} - iData`}
        description={seo?.metaDescription || summary}
        canonical={`/${language}/${language === 'es' ? 'trabaja-con-nosotros/ofertas' : 'work-with-us/jobs'}/${slug}/`}
        alternateES={`/es/trabaja-con-nosotros/ofertas/${job.slug_es}/`}
        alternateEN={`/en/work-with-us/jobs/${job.slug_en}/`}
        language={language}
      />

      <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'}`}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <Link
            to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0088FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'es' ? 'Volver a vacantes' : 'Back to openings'}
          </Link>

          <div className={`relative mt-8 overflow-hidden rounded-[36px] border p-8 shadow-[0_24px_60px_rgba(15,23,42,0.10)] md:p-10 ${isDark ? 'border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(167,139,250,0.12),transparent_28%),linear-gradient(180deg,#0f172a,#020617)]' : 'border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.9),transparent_28%),radial-gradient(circle_at_top_right,rgba(221,214,254,0.9),transparent_28%),linear-gradient(180deg,#f8fbff,#ffffff)]'}`}>
            <div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0088FF]">
                  {area || (language === 'es' ? 'Talento iData' : 'iData Talent')}
                </p>
                <h1 className={`mt-5 text-balance text-5xl font-light leading-[0.96] tracking-[-0.08em] md:text-6xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {title}
                </h1>
                <p className={`mt-6 max-w-3xl text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {area && (
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                      <Briefcase className="h-4 w-4 text-[#0088FF]" />
                      {area}
                    </span>
                  )}
                  {location && (
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                      <MapPin className="h-4 w-4 text-[#0088FF]" />
                      {location}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <Compass className="h-4 w-4 text-[#0088FF]" />
                    {modalityLabel}
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <Sparkles className="h-4 w-4 text-[#0088FF]" />
                    {seniorityLabel}
                  </span>
                  {employmentType && (
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                      <Clock3 className="h-4 w-4 text-[#0088FF]" />
                      {employmentType}
                    </span>
                  )}
                  {job.salary_visible && (
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                      <DollarSign className="h-4 w-4 text-[#0088FF]" />
                      {job.salary_min?.toLocaleString?.() || job.salary_min} - {job.salary_max?.toLocaleString?.() || job.salary_max} {job.currency}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-12">
            <div className="space-y-8 xl:col-span-8">
              <section className={`rounded-[30px] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                <h2 className={`text-2xl font-light tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {language === 'es' ? 'Sobre el rol' : 'About the role'}
                </h2>
                <p className={`mt-5 text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {aboutRole}
                </p>
              </section>

              <div className="grid gap-8 lg:grid-cols-2">
                <DetailSection
                  title={language === 'es' ? 'Responsabilidades' : 'Responsibilities'}
                  items={responsibilities}
                  isDark={isDark}
                  accent="primary"
                />
                <DetailSection
                  title={language === 'es' ? 'Requisitos' : 'Requirements'}
                  items={qualifications}
                  isDark={isDark}
                  accent="primary"
                />
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <DetailSection
                  title={language === 'es' ? 'Plus que suman' : 'Nice to have'}
                  items={niceToHave}
                  isDark={isDark}
                  accent="muted"
                />
                <DetailSection
                  title={language === 'es' ? 'Herramientas y forma de trabajo' : 'Tools and ways of working'}
                  items={tools}
                  isDark={isDark}
                  accent="primary"
                />
              </div>

              <DetailSection
                title={language === 'es' ? 'Qué encontrarás en iData' : 'What you will find at iData'}
                items={whatWeOffer}
                isDark={isDark}
                accent="success"
              />
            </div>

            <div className="space-y-8 xl:col-span-4">
              <section className={`rounded-[30px] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                  {language === 'es' ? 'Resumen del rol' : 'Role snapshot'}
                </p>
                <div className={`mt-5 space-y-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span>{language === 'es' ? 'Ubicación' : 'Location'}</span>
                    <span className={`text-right font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>{location || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>{language === 'es' ? 'Modalidad' : 'Modality'}</span>
                    <span className={`text-right font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>{modalityLabel}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>{language === 'es' ? 'Nivel' : 'Level'}</span>
                    <span className={`text-right font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>{seniorityLabel}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>{language === 'es' ? 'Tipo de contrato' : 'Employment type'}</span>
                    <span className={`text-right font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>{employmentType || '-'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-medium text-white transition-all duration-250 hover:bg-slate-800 hover:shadow-[0_18px_34px_rgba(15,23,42,0.18)]"
                >
                  {applyLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </section>

              <section className={`rounded-[30px] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[#0088FF]/10 p-3 text-[#0088FF]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-light tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {language === 'es' ? 'Compromiso de equidad' : 'Equal opportunity commitment'}
                    </h2>
                    <p className={`mt-4 text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {equalOpportunityNote}
                    </p>
                  </div>
                </div>
              </section>

              <DetailSection
                title={language === 'es' ? 'Proceso de selección' : 'Hiring process'}
                items={hiringProcess.length ? hiringProcess : getFallbackHiringProcess(language)}
                isDark={isDark}
                accent="primary"
                compact
              />
            </div>
          </div>

          <div ref={applicationSectionRef} className="mt-10 scroll-mt-24">
            {showApplicationForm ? (
              <div className={`rounded-[34px] border p-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] md:p-8 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]'}`}>
                <h2 className={`text-3xl font-light tracking-[-0.06em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {language === 'es' ? 'Aplicar a esta vacante' : 'Apply to this role'}
                </h2>
                <p className={`mt-3 text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {language === 'es'
                    ? 'Comparte tu perfil y cargaremos automáticamente el contexto del cargo.'
                    : 'Share your profile and we will automatically load the context of this role.'}
                </p>
                <div className="mt-8">
                  <JobApplicationForm
                    applicationType="job"
                    job={job}
                    language={language}
                    submitLabel={applyLabel}
                    onSubmitted={() => setShowApplicationForm(true)}
                  />
                </div>
              </div>
            ) : (
              <div className={`rounded-[34px] border p-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.10)] ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]'}`}>
                <h3 className={`text-3xl font-light tracking-[-0.06em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {language === 'es' ? '¿Te interesa este rol?' : 'Interested in this role?'}
                </h3>
                <p className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {language === 'es'
                    ? 'Aplica desde aquí y tu postulación viajará con el contexto del cargo, el área, la ubicación, la modalidad y el nivel.'
                    : 'Apply from here and your application will travel with the role, area, location, modality and level context.'}
                </p>
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-medium text-white transition-all duration-250 hover:bg-slate-800 hover:shadow-[0_18px_34px_rgba(15,23,42,0.18)]"
                >
                  {applyLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'es'
                ? '¿No es exactamente tu vacante, pero quieres estar en el radar?'
                : 'Not exactly your role, but want to stay on our radar?'}
            </p>
            <Link
              to={`/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}#open-application`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#0088FF]"
            >
              {language === 'es' ? 'Quiero aplicar para otro cargo' : 'I want to apply for a different role'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
