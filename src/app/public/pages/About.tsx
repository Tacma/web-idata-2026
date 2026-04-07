import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Globe2,
  Handshake,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { SEOHead } from '../../shared/components/SEOHead';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { CTABandSection } from '../components/sections/CTABandSection';
import { getPublished as getPublishedTeamMembers } from '../../../services/teamMembersService';
import { getByKey as getPageByKey } from '../../../services/pagesService';
import { getPublished as getPublishedPartners } from '../../../services/partnersService';
import { buildContactLink } from '../../shared/utils/contactLinks';
import { defaultAboutPageContent, getAboutPageContent, type AboutPageContent } from '../../admin/services/aboutPageContent.service';

import teamImage from '/assets/images/about/team.png';
import purposeGlobeImage from '/assets/images/about/purpose-globe.jpg';
import transformamosImage from '/assets/images/about/transformamos.png';
import angelaMoralesImage from '/assets/images/about/angela-morales-herrera.png';
import bayronQuinteroImage from '/assets/images/about/bayron-elias-quintero-sandoval.png';
import dayanaRomanImage from '/assets/images/about/dayana-roman-castillo.png';
import luciaCardenoImage from '/assets/images/about/lucia-cardeno-gaviria.png';
import victorHoyosImage from '/assets/images/about/victor-hoyos.png';

function SectionHeading({
  eyebrow,
  title,
  description,
  isDark,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  isDark: boolean;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl font-medium tracking-[-0.05em] md:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-7 md:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CultureCard({
  title,
  description,
  icon: Icon,
  accentClass,
  isDark,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentClass: string;
  isDark: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-[28px] border p-6 md:p-7 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]'}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${accentClass}`} />
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? 'bg-white/8' : 'bg-slate-100'}`}>
        <Icon className={`h-5 w-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
      </div>
      <h3 className={`mt-6 text-2xl font-medium tracking-[-0.04em] ${isDark ? 'text-white' : 'text-slate-950'}`}>{title}</h3>
      <p className={`mt-4 text-sm leading-6 md:text-[15px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
    </motion.article>
  );
}

function ValueItem({
  text,
  index,
  isDark,
}: {
  text: string;
  index: number;
  isDark: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`flex min-w-[280px] shrink-0 items-start gap-4 rounded-[22px] border p-5 md:min-w-[360px] ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white'}`}
    >
      <span className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${isDark ? 'bg-sky-400/12 text-sky-200' : 'bg-sky-50 text-sky-700'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className={`text-sm leading-6 md:text-base ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{text}</span>
    </motion.li>
  );
}

function FloatingAwardShape({
  className,
  variant,
  isDark,
}: {
  className: string;
  variant: 'obelisk' | 'gem' | 'prism';
  isDark: boolean;
}) {
  const sharedGlass = isDark
    ? 'border-white/28 bg-white/[0.1] shadow-[0_24px_90px_rgba(0,0,0,0.36)]'
    : 'border-white/90 bg-white/42 shadow-[0_24px_90px_rgba(15,23,42,0.16)]';

  if (variant === 'obelisk') {
    return (
      <div className={`pointer-events-none absolute ${className}`}>
        <div className="relative h-52 w-32 rotate-[-14deg] opacity-95">
          <div
            className={`absolute inset-0 border backdrop-blur-[18px] ${sharedGlass}`}
            style={{ clipPath: 'polygon(18% 0%, 76% 0%, 100% 88%, 26% 100%, 0% 14%)' }}
          />
          <div
            className={`absolute left-[8%] top-[4%] h-[90%] w-[26%] ${isDark ? 'bg-white/40' : 'bg-white/88'}`}
            style={{ clipPath: 'polygon(26% 0%, 100% 6%, 74% 100%, 0% 92%)' }}
          />
          <div
            className={`absolute right-[10%] top-[6%] h-[82%] w-[18%] ${isDark ? 'bg-cyan-200/24' : 'bg-cyan-100/75'}`}
            style={{ clipPath: 'polygon(18% 0%, 100% 10%, 74% 100%, 0% 86%)' }}
          />
          <div
            className={`absolute bottom-[4%] left-[20%] h-[12%] w-[58%] ${isDark ? 'bg-white/24' : 'bg-white/68'}`}
            style={{ clipPath: 'polygon(0% 36%, 100% 0%, 90% 100%, 10% 92%)' }}
          />
          <div className={`absolute inset-x-[14%] bottom-[2%] h-6 rounded-full blur-md ${isDark ? 'bg-cyan-300/22' : 'bg-cyan-200/72'}`} />
          <div className={`absolute left-[22%] top-[6%] h-[10%] w-[44%] rounded-full blur-sm ${isDark ? 'bg-white/28' : 'bg-white/85'}`} />
        </div>
      </div>
    );
  }

  if (variant === 'gem') {
    return (
      <div className={`pointer-events-none absolute ${className}`}>
        <div
          className={`relative h-36 w-36 rotate-[14deg] border backdrop-blur-[18px] opacity-95 ${sharedGlass}`}
          style={{ clipPath: 'polygon(48% 0%, 88% 18%, 100% 60%, 68% 100%, 18% 92%, 0% 42%)' }}
        >
          <div
            className={`absolute inset-[10%] ${isDark ? 'bg-white/10' : 'bg-white/36'}`}
            style={{ clipPath: 'polygon(48% 0%, 88% 18%, 100% 60%, 68% 100%, 18% 92%, 0% 42%)' }}
          />
          <div
            className={`absolute left-[10%] top-[12%] h-[62%] w-[30%] ${isDark ? 'bg-white/30' : 'bg-white/78'}`}
            style={{ clipPath: 'polygon(52% 0%, 100% 24%, 64% 100%, 0% 74%)' }}
          />
          <div
            className={`absolute right-[10%] top-[16%] h-[56%] w-[22%] ${isDark ? 'bg-cyan-100/24' : 'bg-cyan-50/80'}`}
            style={{ clipPath: 'polygon(20% 0%, 100% 16%, 78% 100%, 0% 82%)' }}
          />
          <div
            className={`absolute bottom-[10%] left-[28%] h-[18%] w-[44%] ${isDark ? 'bg-white/22' : 'bg-white/62'}`}
            style={{ clipPath: 'polygon(0% 28%, 100% 0%, 84% 100%, 10% 92%)' }}
          />
          <div className={`absolute inset-x-[18%] bottom-[2%] h-5 rounded-full blur-md ${isDark ? 'bg-fuchsia-300/20' : 'bg-fuchsia-200/60'}`} />
        </div>
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className="relative h-40 w-44 rotate-[8deg] opacity-95">
        <div
          className={`absolute inset-0 border backdrop-blur-[18px] ${sharedGlass}`}
          style={{ clipPath: 'polygon(50% 0%, 100% 78%, 0% 78%)' }}
        />
        <div
          className={`absolute left-[50%] top-[10%] h-[58%] w-[22%] -translate-x-1/2 ${isDark ? 'bg-white/32' : 'bg-white/86'}`}
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
        />
        <div
          className={`absolute bottom-[22%] left-[10%] h-[44%] w-[30%] ${isDark ? 'bg-white/24' : 'bg-white/68'}`}
          style={{ clipPath: 'polygon(100% 0%, 70% 100%, 0% 82%, 18% 14%)' }}
        />
        <div
          className={`absolute bottom-[20%] right-[10%] h-[40%] w-[28%] ${isDark ? 'bg-cyan-100/24' : 'bg-cyan-50/84'}`}
          style={{ clipPath: 'polygon(0% 0%, 100% 16%, 80% 100%, 26% 84%)' }}
        />
        <div
          className={`absolute bottom-[6%] left-[18%] h-[12%] w-[64%] ${isDark ? 'bg-white/24' : 'bg-white/60'}`}
          style={{ clipPath: 'polygon(12% 0%, 100% 28%, 76% 100%, 0% 80%)' }}
        />
        <div className={`absolute inset-x-[20%] bottom-[2%] h-5 rounded-full blur-md ${isDark ? 'bg-cyan-300/18' : 'bg-cyan-200/58'}`} />
      </div>
    </div>
  );
}

export function About() {
  const { language, getLocalizedValue } = useLanguage();
  const { isDark } = useTheme();
  const [leadership, setLeadership] = useState<any[]>([]);
  const [partnerCount, setPartnerCount] = useState(0);
  const [pageRecord, setPageRecord] = useState<any | null>(null);
  const [editableContent, setEditableContent] = useState<AboutPageContent>(defaultAboutPageContent);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [record, teamMembers, partners, aboutContent] = await Promise.all([
          getPageByKey('about'),
          getPublishedTeamMembers(),
          getPublishedPartners(),
          getAboutPageContent().catch(() => null),
        ]);

        if (!cancelled) {
          setPageRecord(record);
          setLeadership(teamMembers);
          setPartnerCount(partners.length);
          setEditableContent(aboutContent ?? defaultAboutPageContent);
        }
      } catch (error) {
        console.error('Error loading about page:', error);
        if (!cancelled) {
          setLeadership([]);
          setPartnerCount(0);
          setEditableContent(defaultAboutPageContent);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const content = {
    heroTitle: language === 'es' ? editableContent?.heroTitle_es || 'Personas, datos e impacto real.' : editableContent?.heroTitle_en || 'People, data, real impact.',
    heroPrimaryCta: language === 'es' ? editableContent?.heroPrimaryCta_es || 'Explorar vacantes' : editableContent?.heroPrimaryCta_en || 'Explore careers',
    heroSecondaryCta: language === 'es' ? editableContent?.heroSecondaryCta_es || 'Hablar con nosotros' : editableContent?.heroSecondaryCta_en || 'Work with us',
    whoEyebrow: language === 'es' ? editableContent?.whoEyebrow_es || 'Quiénes somos' : editableContent?.whoEyebrow_en || 'Who we are',
    whoTitle: language === 'es' ? editableContent?.whoTitle_es || 'Una compañía global de datos, analítica e IA' : editableContent?.whoTitle_en || 'A global data, analytics and AI company',
    whoDescription:
      language === 'es'
        ? editableContent?.whoDescription_es || 'iData Global es una compañía multinacional especializada en soluciones de datos, analítica e inteligencia artificial. Trabajamos con organizaciones de múltiples industrias combinando visión estratégica, ejecución técnica y entendimiento del negocio para acelerar resultados medibles.'
        : editableContent?.whoDescription_en || 'iData Global is a multinational company specialized in data, analytics and AI solutions. We work with organizations across industries, combining strategic thinking, technical execution and business understanding to accelerate measurable outcomes.',
    whoPills: language === 'es' ? editableContent.whoPills_es : editableContent.whoPills_en,
    cultureEyebrow: language === 'es' ? editableContent.cultureEyebrow_es : editableContent.cultureEyebrow_en,
    cultureTitle: language === 'es' ? editableContent.cultureTitle_es : editableContent.cultureTitle_en,
    cultureDescription: language === 'es' ? editableContent.cultureDescription_es : editableContent.cultureDescription_en,
    purposeEyebrow: language === 'es' ? editableContent?.purposeEyebrow_es || 'Nuestro propósito' : editableContent?.purposeEyebrow_en || 'Our Purpose',
    purposeTitle:
      language === 'es'
        ? editableContent?.purposeTitle_es || 'Transformar nuestro entorno a través del poder de los datos'
        : editableContent?.purposeTitle_en || 'Transforming our environment through the power of data.',
    purposeDescription:
      language === 'es'
        ? editableContent?.purposeDescription_es || 'Creemos que los datos no son solo información: son la base para decisiones más inteligentes, más humanas y más sostenibles.'
        : editableContent?.purposeDescription_en || 'We believe data is not just information — it is the foundation for smarter, more human and more sustainable decisions.',
    purposeHighlights: editableContent.purposeHighlights.map((item) => ({
      label: language === 'es' ? item.label_es : item.label_en,
      text: language === 'es' ? item.text_es : item.text_en,
    })),
    mindsetEyebrow: language === 'es' ? editableContent.mindsetEyebrow_es : editableContent.mindsetEyebrow_en,
    mindsetTitle: language === 'es' ? editableContent.mindsetTitle_es : editableContent.mindsetTitle_en,
    mindsetDescription: language === 'es' ? editableContent.mindsetDescription_es : editableContent.mindsetDescription_en,
    mindsetBeforeTitle: language === 'es' ? editableContent.mindsetBeforeTitle_es : editableContent.mindsetBeforeTitle_en,
    mindsetAfterTitle: language === 'es' ? editableContent.mindsetAfterTitle_es : editableContent.mindsetAfterTitle_en,
    mindsetBeforePoints: language === 'es' ? editableContent.mindsetBeforePoints_es : editableContent.mindsetBeforePoints_en,
    mindsetAfterPoints: language === 'es' ? editableContent.mindsetAfterPoints_es : editableContent.mindsetAfterPoints_en,
    valuesEyebrow: language === 'es' ? editableContent?.valuesEyebrow_es || 'Valores en acción' : editableContent?.valuesEyebrow_en || 'Values in action',
    valuesTitle: language === 'es' ? editableContent?.valuesTitle_es || 'Lo que nos define en el día a día' : editableContent?.valuesTitle_en || 'What defines us in action',
    values: language === 'es' ? editableContent.values_es : editableContent.values_en,
    humanEyebrow: language === 'es' ? editableContent?.humanEyebrow_es || 'Cooltura' : editableContent?.humanEyebrow_en || 'Cooltura',
    humanTitle:
      language === 'es'
        ? editableContent?.humanTitle_es || 'La cultura se construye en cómo colaboramos, aprendemos y respondemos'
        : editableContent?.humanTitle_en || 'Culture is built in how we collaborate, learn and respond',
    humanDescription:
      language === 'es'
        ? editableContent?.humanDescription_es || 'Nuestra manera de trabajar combina cercanía, rigor y una vocación real por resolver problemas complejos con equipos diversos, curiosos y comprometidos.'
        : editableContent?.humanDescription_en || 'Our way of working combines proximity, rigor and a real vocation for solving complex problems with diverse, curious and committed teams.',
    ctaEyebrow: language === 'es' ? 'Siguiente paso' : 'Next step',
    ctaTitle:
      language === 'es'
        ? editableContent?.ctaTitle_es || '¿Listo para transformar tu negocio con datos?'
        : editableContent?.ctaTitle_en || 'Ready to transform your business with data?',
    ctaDescription:
      language === 'es'
        ? editableContent?.ctaDescription_es || 'Si buscas un socio para acelerar decisiones, modernizar capacidades o escalar una operación de datos e IA, conversemos.'
        : editableContent?.ctaDescription_en || 'If you are looking for a partner to accelerate decisions, modernize capabilities or scale a data and AI operation, let’s talk.',
    ctaLabel: language === 'es' ? editableContent?.ctaLabel_es || 'Contactarnos' : editableContent?.ctaLabel_en || 'Talk to an expert',
    careersPath: `/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}/`,
    aboutPath: `/${language}/${language === 'es' ? 'nosotros' : 'about'}/`,
  };

  const regions = language === 'es'
    ? [
        { name: 'Colombia', flag: '🇨🇴', detail: 'Operaciones y delivery regional', accent: 'sky' },
        { name: 'Chile', flag: '🇨🇱', detail: 'Analítica aplicada y transformación', accent: 'emerald' },
        { name: 'Panamá', flag: '🇵🇦', detail: 'Conexión estratégica y expansión', accent: 'fuchsia' },
        { name: 'Centroamérica', flag: '🌎', detail: 'Cobertura regional para equipos distribuidos', accent: 'sky' },
        { name: 'México', flag: '🇲🇽', detail: 'Escalamiento comercial y consultoría', accent: 'fuchsia' },
        { name: 'Estados Unidos', flag: '🇺🇸', detail: 'Proyectos enterprise y alcance internacional', accent: 'emerald' },
      ]
    : [
        { name: 'Colombia', flag: '🇨🇴', detail: 'Regional operations and delivery', accent: 'sky' },
        { name: 'Chile', flag: '🇨🇱', detail: 'Applied analytics and transformation', accent: 'emerald' },
        { name: 'Panama', flag: '🇵🇦', detail: 'Strategic connection and expansion', accent: 'fuchsia' },
        { name: 'Central America', flag: '🌎', detail: 'Regional coverage for distributed teams', accent: 'sky' },
        { name: 'Mexico', flag: '🇲🇽', detail: 'Commercial scaling and consulting', accent: 'fuchsia' },
        { name: 'United States', flag: '🇺🇸', detail: 'Enterprise projects with international reach', accent: 'emerald' },
      ];

  const proofCards = [
    {
      label: language === 'es' ? 'Experiencia' : 'Experience',
      value: '13+',
      suffix: language === 'es' ? 'años en Data & AI' : 'years in Data & AI',
      icon: Briefcase,
    },
    {
      label: language === 'es' ? 'Ecosistema partner' : 'Partner ecosystem',
      value: `${Math.max(partnerCount, 5)}+`,
      suffix: language === 'es' ? 'alianzas tecnológicas' : 'technology alliances',
      icon: Handshake,
    },
    {
      label: language === 'es' ? 'Certificaciones' : 'Certifications',
      value: '40+',
      suffix: language === 'es' ? 'credenciales activas' : 'active credentials',
      icon: BadgeCheck,
    },
    {
      label: language === 'es' ? 'Regiones activas' : 'Active regions',
      value: `${regions.length}`,
      suffix: language === 'es' ? 'mercados atendidos' : 'markets served',
      icon: Globe2,
    },
  ];

  const marqueeValues = [...content.values, ...content.values];

  const seoTitle = pageRecord
    ? getLocalizedValue(pageRecord.title_es, pageRecord.title_en)
    : language === 'es'
      ? 'Nosotros - iData Global'
      : 'About - iData Global';

  const seoDescription = pageRecord
    ? getLocalizedValue(pageRecord.description_es, pageRecord.description_en)
    : content.whoDescription;

  const contactHref = buildContactLink({
    language,
    sourceType: 'about',
    sourceTitle: language === 'es' ? 'Nosotros' : 'About',
    sourceCtaLabel: content.ctaLabel,
    intent: 'general_consultation',
    referrerPath: content.aboutPath,
  });

  const ctaSection = {
    id: `about-cta-${language}`,
    language,
    type: 'ctaBand' as const,
    isEnabled: true,
    order: 0,
    title: content.ctaTitle,
    subtitle: content.ctaDescription,
    ctaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    ctaHref: contactHref,
    referencedIds: [],
    createdAt: '',
    updatedAt: '',
  };

  const cultureCards = (editableContent?.cultureCards || []).slice(0, 3).map((card: any, index: number) => ({
    title: language === 'es' ? card.title_es : card.title_en,
    description: language === 'es' ? card.description_es : card.description_en,
    icon: index === 0 ? HeartHandshake : index === 1 ? Sparkles : Target,
    accentClass: index === 0 ? 'bg-[linear-gradient(90deg,#5ec8ff,#9be7ff)]' : index === 1 ? 'bg-[linear-gradient(90deg,#7c3aed,#d946ef)]' : 'bg-[linear-gradient(90deg,#10b981,#7dd3fc)]',
  }));

  const recognitionCards = (editableContent?.recognitionCards || []).slice(0, 4).map((card: any, index: number) => ({
    title: language === 'es' ? card.title_es : card.title_en,
    description: language === 'es' ? card.description_es : card.description_en,
    detail: language === 'es' ? card.detail_es : card.detail_en,
    metric: card.metric,
    icon: index === 0 ? Trophy : index === 1 ? BadgeCheck : index === 2 ? ShieldCheck : Award,
  }));

  const humanCards = leadership.length > 0
    ? leadership
    : [
        {
          id: 'fallback-1',
          name: language === 'es' ? 'Equipo regional' : 'Regional team',
          position_es: 'Consultoría, datos e IA',
          position_en: 'Consulting, data and AI',
          photo: teamImage,
        },
        {
          id: 'fallback-2',
          name: 'iData Global',
          position_es: 'Colaboración interdisciplinaria',
          position_en: 'Cross-functional collaboration',
          photo: transformamosImage,
        },
      ];

  const culturePhotoByName: Record<string, string> = {
    'Angela Morales': angelaMoralesImage,
    'Angela Morales Herrera': angelaMoralesImage,
    'Bayron Quintero': bayronQuinteroImage,
    'Bayron Elias Quintero Sandoval': bayronQuinteroImage,
    'Bayron Elías Quintero Sandoval': bayronQuinteroImage,
    'Dayana Lopez': dayanaRomanImage,
    'Dayana López': dayanaRomanImage,
    'Dayana Roman Castillo': dayanaRomanImage,
    'Dayana Román Castillo': dayanaRomanImage,
    'Lucia Cardeno': luciaCardenoImage,
    'Lucia Cardeno Gaviria': luciaCardenoImage,
    'Lucía Cardeño Gaviria': luciaCardenoImage,
    'Victor Hoyos': victorHoyosImage,
    'Víctor Hoyos': victorHoyosImage,
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`/${language}/${language === 'es' ? 'nosotros' : 'about'}/`}
        alternateES="/es/nosotros/"
        alternateEN="/en/about/"
        language={language}
      />

      <section className={`relative overflow-hidden pb-14 pt-28 md:pb-18 md:pt-32 ${isDark ? 'bg-[linear-gradient(180deg,#07101d_0%,#0b1527_68%,#0d1830_100%)]' : 'bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_62%,#f8fbff_100%)]'}`}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className={`absolute left-[-8%] top-24 h-72 w-72 rounded-full blur-3xl ${isDark ? 'bg-sky-400/12' : 'bg-sky-300/25'}`} />
          <div className={`absolute right-[-10%] top-20 h-80 w-80 rounded-full blur-3xl ${isDark ? 'bg-fuchsia-500/12' : 'bg-fuchsia-300/20'}`} />
          <div className={`absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl ${isDark ? 'bg-emerald-400/8' : 'bg-emerald-200/20'}`} />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
            <div className="max-w-3xl">
              <h1 className={`text-4xl font-light leading-[1.02] tracking-[-0.06em] sm:text-5xl md:text-[3.9rem] xl:text-[4.4rem] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {content.heroTitle}
              </h1>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={content.careersPath}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition md:text-base ${isDark ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-slate-950 text-white hover:bg-slate-800'}`}
                >
                  {content.heroPrimaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={contactHref}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition md:text-base ${isDark ? 'border-white/12 bg-white/6 text-white hover:border-white/20 hover:bg-white/10' : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300'}`}
                >
                  {content.heroSecondaryCta}
                </Link>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:gap-4">
              {proofCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`rounded-[20px] border p-3 sm:rounded-[24px] sm:p-4 md:p-5 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]'}`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl md:h-11 md:w-11 ${isDark ? 'bg-white/8 text-white' : 'bg-slate-100 text-slate-900'}`}>
                      <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" />
                    </span>
                    <p className={`mt-4 text-[8px] font-semibold uppercase tracking-[0.14em] sm:mt-5 sm:text-[9px] sm:tracking-[0.18em] md:text-[10px] md:tracking-[0.22em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{item.label}</p>
                    <p className={`mt-2 text-2xl font-medium tracking-[-0.05em] sm:mt-2.5 sm:text-[1.7rem] md:text-3xl ${isDark ? 'text-white' : 'text-slate-950'}`}>{item.value}</p>
                    <p className={`mt-2 text-[11px] leading-4 sm:text-[12px] sm:leading-5 md:text-sm md:leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.suffix}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={`${isDark ? 'bg-[#0b1527]' : 'bg-white'} pb-4`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className={`rounded-[32px] border p-6 md:p-8 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_50px_rgba(15,23,42,0.06)]'}`}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
              <div>
                <SectionHeading
                  eyebrow={content.whoEyebrow}
                  title={content.whoTitle}
                  description={content.whoDescription}
                  isDark={isDark}
                />

                <div className="mt-6 flex flex-wrap gap-3">
                  {content.whoPills.map((pill) => (
                    <div
                      key={pill}
                      className={`rounded-full border px-4 py-2 text-sm font-medium ${isDark ? 'border-white/10 bg-white/6 text-slate-100' : 'border-slate-200 bg-white text-slate-700'}`}
                    >
                      {pill}
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-[28px] border p-5 md:p-6 ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(15,26,45,0.96),rgba(13,24,43,0.92))]' : 'border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]'}`}>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-sky-300' : 'text-slate-500'}`}>
                  {language === 'es' ? 'Huella global' : 'Global footprint'}
                </p>
                <h3 className={`mt-3 text-xl font-medium tracking-[-0.03em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {language === 'es' ? 'Presencia en mercados clave de Latinoamérica y Estados Unidos' : 'Presence across key markets in Latin America and the United States'}
                </h3>

                <div className={`relative mt-5 overflow-hidden rounded-[24px] border p-5 ${isDark ? 'border-white/10 bg-[#0b1527]' : 'border-slate-200 bg-white'}`}>
                  <div className={`pointer-events-none absolute inset-0 opacity-70 ${isDark ? 'bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_75%_35%,rgba(217,70,239,0.12),transparent_24%),radial-gradient(circle_at_58%_70%,rgba(16,185,129,0.12),transparent_22%)]' : 'bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.10),transparent_28%),radial-gradient(circle_at_75%_35%,rgba(217,70,239,0.08),transparent_24%),radial-gradient(circle_at_58%_70%,rgba(16,185,129,0.08),transparent_22%)]'}`} />
                  <div className="relative">
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                      {language === 'es' ? 'Países y regiones' : 'Countries and regions'}
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {regions.map((region) => (
                        <motion.article
                          key={region.name}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={{ duration: 0.4 }}
                          className={`group relative overflow-hidden rounded-[22px] border p-4 transition-transform duration-300 hover:-translate-y-1 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]'}`}
                        >
                          <div
                            className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${
                              region.accent === 'sky'
                                ? 'bg-[linear-gradient(90deg,#38bdf8,#7dd3fc)]'
                                : region.accent === 'fuchsia'
                                  ? 'bg-[linear-gradient(90deg,#c026d3,#f472b6)]'
                                  : 'bg-[linear-gradient(90deg,#10b981,#67e8f9)]'
                            }`}
                          />
                          <div className="flex items-start gap-3">
                            <span className={`inline-flex h-11 min-w-11 items-center justify-center rounded-2xl text-lg ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                              {region.flag}
                            </span>
                            <div className="min-w-0">
                              <p className={`text-sm font-semibold tracking-[-0.02em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                                {region.name}
                              </p>
                              <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                {region.detail}
                              </p>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${isDark ? 'bg-[#09111f]' : 'bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]'} py-16 md:py-20`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={content.cultureEyebrow}
            title={content.cultureTitle}
            description={content.cultureDescription}
            isDark={isDark}
            centered
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {cultureCards.map((card) => (
              <CultureCard key={card.title} {...card} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${isDark ? 'bg-[#0b1527]' : 'bg-white'} py-16 md:py-20`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
            <div className={`overflow-hidden rounded-[30px] border ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]'}`}>
              <ImageWithFallback
                src={purposeGlobeImage}
                alt="Transforming our environment through data"
                className="h-[320px] w-full object-cover md:h-[420px]"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow={content.purposeEyebrow}
                title={content.purposeTitle}
                description={content.purposeDescription}
                isDark={isDark}
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {content.purposeHighlights.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-[24px] border p-5 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-slate-50/80'}`}
                  >
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>{item.label}</p>
                    <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${isDark ? 'bg-[#09111f]' : 'bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]'} py-16 md:py-20`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={content.mindsetEyebrow}
            title={content.mindsetTitle}
            description={content.mindsetDescription}
            isDark={isDark}
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_80px_1fr]">
            <div className={`rounded-[28px] border p-6 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white'}`}>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.26em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {content.mindsetBeforeTitle}
              </p>
              <ul className="mt-5 space-y-3">
                {content.mindsetBeforePoints.map((point) => (
                  <li key={point} className={`flex gap-3 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${isDark ? 'bg-slate-400' : 'bg-slate-400'}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className={`relative h-full min-h-[220px] w-px ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                <span className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border ${isDark ? 'border-sky-300/20 bg-sky-400/10 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-700'}`}>
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>

            <div className={`rounded-[28px] border p-6 ${isDark ? 'border-sky-300/16 bg-[linear-gradient(180deg,rgba(9,24,46,0.98),rgba(11,34,57,0.92))]' : 'border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]'}`}>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.26em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                {content.mindsetAfterTitle}
              </p>
              <ul className="mt-5 space-y-3">
                {content.mindsetAfterPoints.map((point) => (
                  <li key={point} className={`flex gap-3 text-sm leading-6 ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>
                    <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${isDark ? 'bg-sky-300' : 'bg-sky-500'}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${isDark ? 'bg-[#0b1527]' : 'bg-white'} py-16 md:py-20`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div>
            <SectionHeading
              eyebrow={content.valuesEyebrow}
              title={content.valuesTitle}
              isDark={isDark}
            />

            <div className="relative mt-10 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide">
              <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 ${isDark ? 'bg-[linear-gradient(90deg,#0b1527,transparent)]' : 'bg-[linear-gradient(90deg,#ffffff,transparent)]'}`} />
              <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 ${isDark ? 'bg-[linear-gradient(270deg,#0b1527,transparent)]' : 'bg-[linear-gradient(270deg,#ffffff,transparent)]'}`} />
              <motion.ul
                className="flex w-max gap-4 pr-6"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  duration: 28,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {marqueeValues.map((value, index) => (
                  <ValueItem
                    key={`${value}-${index}`}
                    text={value}
                    index={index % content.values.length}
                    isDark={isDark}
                  />
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${isDark ? 'bg-[#09111f]' : 'bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]'} py-16 md:py-20`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-[32px] border p-6 md:p-8 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]'}`}>
            <div className="pointer-events-none absolute inset-0">
              <ImageWithFallback
                src={teamImage}
                alt="iData team collaboration"
                className="h-full w-full object-cover opacity-[0.26]"
              />
              <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(90deg,rgba(9,17,31,0.96)_0%,rgba(9,17,31,0.9)_48%,rgba(9,17,31,0.82)_100%)]' : 'bg-[linear-gradient(90deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.9)_46%,rgba(248,251,255,0.84)_100%)]'}`} />
            </div>

            <div className="relative">
              <div className="max-w-4xl">
                <SectionHeading
                  eyebrow={content.humanEyebrow}
                  title={content.humanTitle}
                  description={content.humanDescription}
                  isDark={isDark}
                />
              </div>

              <div className="mt-8 flex gap-5 overflow-x-auto pb-2 scrollbar-hide xl:grid xl:grid-cols-5 xl:overflow-visible">
                {humanCards.map((member, index) => (
                  <motion.article
                    key={member.id || member.name}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className={`group relative h-[470px] w-[320px] shrink-0 overflow-hidden rounded-[28px] border p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:h-[500px] sm:w-[320px] sm:rounded-[32px] sm:p-5 xl:h-auto xl:w-auto xl:min-w-0 xl:self-start xl:p-4 ${isDark ? 'border-white/12 bg-[#111c30]' : 'border-slate-200 bg-white/92'}`}
                  >
                    <div className={`pointer-events-none absolute inset-0 ${index % 3 === 0
                      ? 'bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_30%)]'
                      : index % 3 === 1
                        ? 'bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.08),transparent_30%)]'
                        : 'bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_30%)]'}`}
                    />

                    <div className="relative">
                      <div className={`relative h-[300px] overflow-hidden rounded-[24px] border xl:h-[250px] ${isDark ? 'border-white/10 bg-[linear-gradient(135deg,#162237_0%,#0f172a_100%)]' : 'border-slate-200 bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_48%,#f8fafc_100%)]'}`}>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.24),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.18),transparent_34%)]" />
                        <ImageWithFallback
                          src={culturePhotoByName[member.name] || member.photo}
                          alt={member.name}
                          className="relative h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="flex min-h-[96px] flex-col justify-start pt-4 xl:min-h-0">
                        <p className={`text-[1.3rem] font-semibold leading-[1] tracking-[-0.04em] xl:text-[1.15rem] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                          {member.name}
                        </p>
                        <p className={`mt-3 text-xs font-medium uppercase tracking-[0.18em] xl:text-[10px] xl:tracking-[0.14em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                          {getLocalizedValue(member.position_es, member.position_en)}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${isDark ? 'bg-[#08101d]' : 'bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]'} py-16 md:py-20`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-[36px] border p-6 md:p-8 lg:p-10 ${isDark ? 'border-white/10 bg-[linear-gradient(135deg,rgba(7,13,24,0.98),rgba(10,18,34,0.96))]' : 'border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(245,249,255,0.92))] shadow-[0_24px_70px_rgba(15,23,42,0.08)]'}`}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className={`absolute left-[-8%] top-[12%] h-56 w-56 rounded-full blur-3xl ${isDark ? 'bg-cyan-400/12' : 'bg-cyan-200/40'}`} />
              <div className={`absolute right-[8%] top-[8%] h-64 w-64 rounded-full blur-3xl ${isDark ? 'bg-fuchsia-500/12' : 'bg-fuchsia-200/35'}`} />
              <div className={`absolute bottom-[-8%] left-[30%] h-56 w-56 rounded-full blur-3xl ${isDark ? 'bg-amber-300/10' : 'bg-amber-100/40'}`} />
              <FloatingAwardShape className="left-[-2.8rem] top-[7.5rem] hidden lg:block xl:left-[-2rem]" variant="obelisk" isDark={isDark} />
              <FloatingAwardShape className="bottom-[-1.25rem] left-[47%] hidden lg:block" variant="gem" isDark={isDark} />
              <FloatingAwardShape className="right-[-1.5rem] top-[7.5rem] hidden lg:block xl:right-[-0.5rem]" variant="prism" isDark={isDark} />
            </div>

            <div className="relative z-10">
              <div className="max-w-3xl">
                <SectionHeading
                  eyebrow={language === 'es' ? editableContent.recognitionEyebrow_es : editableContent.recognitionEyebrow_en}
                  title={language === 'es' ? editableContent.recognitionTitle_es : editableContent.recognitionTitle_en}
                  description={language === 'es' ? editableContent.recognitionDescription_es : editableContent.recognitionDescription_en}
                  isDark={isDark}
                />
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {recognitionCards.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <motion.article
                      key={card.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className={`group relative min-h-[320px] overflow-hidden rounded-[30px] border p-5 backdrop-blur-[22px] md:min-h-[360px] md:p-6 ${isDark ? 'border-white/12 bg-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.28)]' : 'border-white/70 bg-white/35 shadow-[0_24px_80px_rgba(15,23,42,0.12)]'}`}
                    >
                      <div className={`pointer-events-none absolute inset-0 ${index % 4 === 0
                        ? 'bg-[radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_28%)]'
                        : index % 4 === 1
                          ? 'bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.14),transparent_28%)]'
                          : index % 4 === 2
                            ? 'bg-[radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.20),transparent_34%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_28%)]'
                            : 'bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.20),transparent_34%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.14),transparent_28%)]'}`}
                      />
                      <div className={`pointer-events-none absolute inset-x-5 top-0 h-px ${isDark ? 'bg-white/30' : 'bg-white/90'}`} />
                      <div className={`pointer-events-none absolute inset-x-8 top-4 h-16 rounded-full blur-2xl ${isDark ? 'bg-white/8' : 'bg-white/35'}`} />

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${isDark ? 'border-white/12 bg-white/8 text-white' : 'border-white/80 bg-white/50 text-slate-950'}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className={`text-[2rem] font-medium tracking-[-0.06em] ${isDark ? 'text-white/28' : 'text-slate-900/18'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <div className="mt-8">
                          <p className={`text-[10px] font-semibold uppercase tracking-[0.26em] ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                            {card.metric}
                          </p>
                          <h3 className={`mt-3 text-[1.8rem] font-medium leading-[1.02] tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                            {card.title}
                          </h3>
                          <p className={`mt-4 text-sm leading-6 md:text-[15px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-auto pt-8">
                          <div className={`inline-flex rounded-full border px-3 py-2 text-xs font-medium ${isDark ? 'border-white/12 bg-white/8 text-slate-200' : 'border-white/80 bg-white/55 text-slate-700'}`}>
                            {card.detail}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABandSection section={ctaSection} />
    </>
  );
}
