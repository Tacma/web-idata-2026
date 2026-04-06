import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Briefcase,
  Globe2,
  Handshake,
  HeartHandshake,
  Sparkles,
  Target,
} from 'lucide-react';
import { SEOHead } from '../../shared/components/SEOHead';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { getPublished as getPublishedTeamMembers } from '../../../services/teamMembersService';
import { getByKey as getPageByKey } from '../../../services/pagesService';
import { getPublished as getPublishedPartners } from '../../../services/partnersService';
import { buildContactLink } from '../../shared/utils/contactLinks';

import teamImage from '/assets/images/about/team.png';
import purposeGlobeImage from '/assets/images/about/purpose-globe.jpg';
import transformamosImage from '/assets/images/about/transformamos.png';
import globalPresenceGlobeImage from '/assets/images/about/global-presence-globe.jpg';
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

function GlobalFootprintMap({
  isDark,
  language,
}: {
  isDark: boolean;
  language: 'es' | 'en';
}) {
  const labels = {
    us: language === 'es' ? 'Estados Unidos' : 'United States',
    mx: language === 'es' ? 'México' : 'Mexico',
    ca: language === 'es' ? 'Centroamérica' : 'Central America',
    pa: 'Panamá',
    co: 'Colombia',
    cl: 'Chile',
  };

  const markers = [
    {
      id: 'us',
      dotLeft: '41.5%',
      dotTop: '29.5%',
      labelLeft: '7.5%',
      labelTop: '19.5%',
      accent: 'sky',
      anchor: 'left',
      lineTo: { x1: 152, y1: 76, x2: 404, y2: 110 },
    },
    {
      id: 'mx',
      dotLeft: '36.3%',
      dotTop: '44.2%',
      labelLeft: '6.2%',
      labelTop: '43.2%',
      accent: 'fuchsia',
      anchor: 'left',
      lineTo: { x1: 142, y1: 160, x2: 353, y2: 168 },
    },
    {
      id: 'ca',
      dotLeft: '38%',
      dotTop: '49.2%',
      labelLeft: '8.4%',
      labelTop: '58.5%',
      accent: 'sky',
      anchor: 'left',
      lineTo: { x1: 172, y1: 224, x2: 370, y2: 187 },
    },
    {
      id: 'pa',
      dotLeft: '39.5%',
      dotTop: '52.1%',
      labelLeft: '63.2%',
      labelTop: '47.5%',
      accent: 'sky',
      anchor: 'right',
      lineTo: { x1: 616, y1: 182, x2: 384, y2: 198 },
    },
    {
      id: 'co',
      dotLeft: '40.7%',
      dotTop: '58.6%',
      labelLeft: '66.4%',
      labelTop: '59.5%',
      accent: 'fuchsia',
      anchor: 'right',
      lineTo: { x1: 648, y1: 228, x2: 396, y2: 223 },
    },
    {
      id: 'cl',
      dotLeft: '42.8%',
      dotTop: '79.8%',
      labelLeft: '62.2%',
      labelTop: '79.2%',
      accent: 'sky',
      anchor: 'right',
      lineTo: { x1: 606, y1: 302, x2: 418, y2: 303 },
    },
  ] as const;

  return (
    <div className={`relative h-[240px] overflow-hidden rounded-[20px] border md:h-[320px] ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]' : 'border-slate-200 bg-[linear-gradient(180deg,#fbfdff,#f5f9ff)]'}`}>
      <ImageWithFallback
        src={globalPresenceGlobeImage}
        alt="Global footprint map"
        className={`h-full w-full object-cover object-center ${isDark ? 'brightness-[0.96] contrast-[1.08]' : 'brightness-[1.02] contrast-[1.02]'}`}
      />

      <div className={`pointer-events-none absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_32%_42%,rgba(56,189,248,0.12),transparent_20%),radial-gradient(circle_at_64%_34%,rgba(217,70,239,0.12),transparent_18%),linear-gradient(180deg,rgba(4,10,20,0.14),rgba(4,10,20,0.24))]' : 'bg-[radial-gradient(circle_at_32%_42%,rgba(56,189,248,0.06),transparent_20%),radial-gradient(circle_at_64%_34%,rgba(217,70,239,0.06),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.18))]'}`} />

      <svg viewBox="0 0 1000 380" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke={isDark ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.86)'} strokeWidth="1.8">
          {markers.map((marker) => (
            <path
              key={`line-${marker.id}`}
              d={`M ${marker.lineTo.x1} ${marker.lineTo.y1} C ${(marker.lineTo.x1 + marker.lineTo.x2) / 2} ${marker.lineTo.y1}, ${(marker.lineTo.x1 + marker.lineTo.x2) / 2} ${marker.lineTo.y2}, ${marker.lineTo.x2} ${marker.lineTo.y2}`}
              opacity="0.9"
            />
          ))}
        </g>
      </svg>

      {markers.map((marker) => (
        <div
          key={marker.id}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: marker.dotLeft, top: marker.dotTop }}
        >
          <span className={`absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md ${marker.accent === 'sky' ? (isDark ? 'bg-sky-300/28' : 'bg-sky-400/18') : (isDark ? 'bg-fuchsia-400/28' : 'bg-fuchsia-400/18')}`} />
          <span className={`relative flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)] ${marker.accent === 'sky' ? (isDark ? 'bg-sky-300' : 'bg-sky-500') : (isDark ? 'bg-fuchsia-400' : 'bg-fuchsia-600')}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isDark ? 'bg-slate-950' : 'bg-white'}`} />
          </span>
        </div>
      ))}

      {markers.map((marker) => (
        <div
          key={`label-${marker.id}`}
          className={`pointer-events-none absolute hidden rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.04em] shadow-[0_12px_30px_rgba(15,23,42,0.18)] md:block ${marker.anchor === 'right' ? '-translate-y-1/2' : '-translate-y-1/2'} ${isDark ? 'border-white/14 bg-slate-950/72 text-white backdrop-blur-sm' : 'border-white/80 bg-white/88 text-slate-900 backdrop-blur-sm'}`}
          style={{ left: marker.labelLeft, top: marker.labelTop }}
        >
          {labels[marker.id as keyof typeof labels]}
        </div>
      ))}
    </div>
  );
}

export function About() {
  const { language, getLocalizedValue } = useLanguage();
  const { isDark } = useTheme();
  const [leadership, setLeadership] = useState<any[]>([]);
  const [partnerCount, setPartnerCount] = useState(0);
  const [pageRecord, setPageRecord] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [record, teamMembers, partners] = await Promise.all([
          getPageByKey('about'),
          getPublishedTeamMembers(),
          getPublishedPartners(),
        ]);

        if (!cancelled) {
          setPageRecord(record);
          setLeadership(teamMembers);
          setPartnerCount(partners.length);
        }
      } catch (error) {
        console.error('Error loading about page:', error);
        if (!cancelled) {
          setLeadership([]);
          setPartnerCount(0);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const content = {
    heroTitle:
      language === 'es'
        ? 'Personas, datos e impacto real.'
        : 'People, data, real impact.',
    heroPrimaryCta: language === 'es' ? 'Explorar vacantes' : 'Explore careers',
    heroSecondaryCta: language === 'es' ? 'Hablar con nosotros' : 'Work with us',
    whoEyebrow: language === 'es' ? 'Quiénes somos' : 'Who we are',
    whoTitle: language === 'es' ? 'Una compañía global de datos, analítica e IA' : 'A global data, analytics and AI company',
    whoDescription:
      language === 'es'
        ? 'iData Global es una compañía multinacional especializada en soluciones de datos, analítica e inteligencia artificial. Trabajamos con organizaciones de múltiples industrias combinando visión estratégica, ejecución técnica y entendimiento del negocio para acelerar resultados medibles.'
        : 'iData Global is a multinational company specialized in data, analytics and AI solutions. We work with organizations across industries, combining strategic thinking, technical execution and business understanding to accelerate measurable outcomes.',
    whoPills:
      language === 'es'
        ? ['Multinacional', 'Data + AI solutions', 'Múltiples industrias', 'Estrategia + delivery']
        : ['Multinational', 'Data + AI solutions', 'Cross-industry expertise', 'Strategy + delivery'],
    cultureEyebrow: language === 'es' ? 'COOLTURA' : 'COOLTURA',
    cultureTitle: language === 'es' ? 'Cooltura' : 'Cooltura',
    cultureDescription:
      language === 'es'
        ? 'En iData Global, nuestra cultura, o COOLTURA, es el equilibrio entre personas, datos y soluciones. Es lo que nos permite combinar excelencia técnica, empatía y pensamiento estratégico para crear impacto significativo.'
        : 'At iData Global, our culture, or COOLTURA, is the balance between people, data and solutions. It is what allows us to combine technical excellence, empathy and strategic thinking to create meaningful impact.',
    purposeEyebrow: language === 'es' ? 'Nuestro propósito' : 'Our Purpose',
    purposeTitle:
      language === 'es'
        ? 'Transformar nuestro entorno a través del poder de los datos'
        : 'Transforming our environment through the power of data.',
    purposeDescription:
      language === 'es'
        ? 'Creemos que los datos no son solo información: son la base para decisiones más inteligentes, más humanas y más sostenibles.'
        : 'We believe data is not just information — it is the foundation for smarter, more human and more sustainable decisions.',
    mindsetEyebrow: language === 'es' ? 'Evolución' : 'Evolution',
    mindsetTitle:
      language === 'es'
        ? 'De la excelencia individual al impacto colectivo'
        : 'From individual excellence to collective impact',
    mindsetDescription:
      language === 'es'
        ? 'En iData evolucionamos de una mentalidad orientada al rendimiento individual hacia una cultura basada en colaboración, propósito compartido e impacto de largo plazo.'
        : 'At iData, we evolved from a performance-driven mindset to a culture built on collaboration, shared purpose and long-term impact.',
    mindsetBeforeTitle: language === 'es' ? 'Antes' : 'Before',
    mindsetAfterTitle: language === 'es' ? 'Ahora' : 'Now',
    mindsetBeforePoints:
      language === 'es'
        ? ['Excelencia medida por capacidad individual', 'Éxito entendido como entrega puntual', 'Resolución enfocada en disciplinas aisladas']
        : ['Excellence measured by individual capability', 'Success understood as on-time delivery', 'Problem solving centered on isolated disciplines'],
    mindsetAfterPoints:
      language === 'es'
        ? ['Equipos multidisciplinarios con ownership real', 'Impacto compartido entre negocio, datos y experiencia', 'Relaciones de largo plazo y mejora continua']
        : ['Multidisciplinary teams with real ownership', 'Shared impact across business, data and experience', 'Long-term relationships and continuous improvement'],
    valuesEyebrow: language === 'es' ? 'Valores en acción' : 'Values in action',
    valuesTitle: language === 'es' ? 'Lo que nos define en el día a día' : 'What defines us in action',
    values: language === 'es'
      ? [
          'Lideramos con empatía e intención.',
          'Tomamos decisiones basadas en datos y ética.',
          'Innovamos con propósito.',
          'Comunicamos con claridad y actuamos con responsabilidad.',
          'Nos enfocamos en impacto real, no solo en entrega.',
        ]
      : [
          'We lead with empathy and intention.',
          'We make decisions based on data and ethics.',
          'We innovate with purpose.',
          'We communicate clearly and act with responsibility.',
          'We focus on real impact, not just delivery.',
        ],
    humanEyebrow: language === 'es' ? 'Cooltura' : 'Cooltura',
    humanTitle:
      language === 'es'
        ? 'La cultura se construye en cómo colaboramos, aprendemos y respondemos'
        : 'Culture is built in how we collaborate, learn and respond',
    humanDescription:
      language === 'es'
        ? 'Nuestra manera de trabajar combina cercanía, rigor y una vocación real por resolver problemas complejos con equipos diversos, curiosos y comprometidos.'
        : 'Our way of working combines proximity, rigor and a real vocation for solving complex problems with diverse, curious and committed teams.',
    ctaEyebrow: language === 'es' ? 'Siguiente paso' : 'Next step',
    ctaTitle:
      language === 'es'
        ? '¿Listo para construir el futuro con datos?'
        : 'Ready to build the future with data?',
    ctaDescription:
      language === 'es'
        ? 'Si buscas un socio para acelerar decisiones, modernizar capacidades o escalar una operación de datos e IA, conversemos.'
        : 'If you are looking for a partner to accelerate decisions, modernize capabilities or scale a data and AI operation, let’s talk.',
    ctaLabel: language === 'es' ? 'Contactarnos' : 'Talk to an expert',
    careersPath: `/${language}/${language === 'es' ? 'trabaja-con-nosotros' : 'work-with-us'}/`,
    aboutPath: `/${language}/${language === 'es' ? 'nosotros' : 'about'}/`,
  };

  const regions = language === 'es'
    ? [
        { name: 'Colombia', flag: '🇨🇴' },
        { name: 'Chile', flag: '🇨🇱' },
        { name: 'Panamá', flag: '🇵🇦' },
        { name: 'Centroamérica', flag: '🌎' },
        { name: 'México', flag: '🇲🇽' },
        { name: 'Estados Unidos', flag: '🇺🇸' },
      ]
    : [
        { name: 'Colombia', flag: '🇨🇴' },
        { name: 'Chile', flag: '🇨🇱' },
        { name: 'Panama', flag: '🇵🇦' },
        { name: 'Central America', flag: '🌎' },
        { name: 'Mexico', flag: '🇲🇽' },
        { name: 'United States', flag: '🇺🇸' },
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

  const cultureCards = [
    {
      title: language === 'es' ? 'Cool People' : 'Cool People',
      description:
        language === 'es'
          ? 'Creemos en la colaboración, la empatía y el crecimiento continuo. Las personas están en el centro de todo lo que construimos.'
          : 'We believe in collaboration, empathy and continuous growth. People are at the center of everything we build.',
      icon: HeartHandshake,
      accentClass: 'bg-[linear-gradient(90deg,#5ec8ff,#9be7ff)]',
    },
    {
      title: language === 'es' ? 'Cool Tech' : 'Cool Tech',
      description:
        language === 'es'
          ? 'Usamos los datos con rigor, ética e innovación, transformando información en decisiones estratégicas.'
          : 'We use data with rigor, ethics and innovation, transforming information into strategic decisions.',
      icon: Sparkles,
      accentClass: 'bg-[linear-gradient(90deg,#7c3aed,#d946ef)]',
    },
    {
      title: language === 'es' ? 'Cool Solutions' : 'Cool Solutions',
      description:
        language === 'es'
          ? 'Diseñamos soluciones prácticas, creativas y centradas en el usuario que generan valor real para el negocio.'
          : 'We design practical, creative and user-centered solutions that generate real business value.',
      icon: Target,
      accentClass: 'bg-[linear-gradient(90deg,#10b981,#7dd3fc)]',
    },
  ];

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

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {proofCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`rounded-[20px] border p-3 sm:rounded-[26px] sm:p-5 md:p-6 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]'}`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl ${isDark ? 'bg-white/8 text-white' : 'bg-slate-100 text-slate-900'}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <p className={`mt-4 text-[8px] font-semibold uppercase tracking-[0.18em] sm:mt-6 sm:text-[10px] sm:tracking-[0.24em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{item.label}</p>
                    <p className={`mt-2 text-2xl font-medium tracking-[-0.05em] sm:mt-3 sm:text-3xl ${isDark ? 'text-white' : 'text-slate-950'}`}>{item.value}</p>
                    <p className={`mt-2 text-[11px] leading-4 sm:mt-3 sm:text-sm sm:leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.suffix}</p>
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
                    <GlobalFootprintMap isDark={isDark} language={language} />

                    <p className={`mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                      {language === 'es' ? 'Regiones donde trabajamos' : 'Regions where we work'}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {regions.map((region) => (
                        <span
                          key={region.name}
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${isDark ? 'bg-white/8 text-slate-100' : 'bg-white text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.05)]'}`}
                        >
                          <span className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-sm ${isDark ? 'bg-white/10' : 'bg-sky-50'}`}>
                            {region.flag}
                          </span>
                          {region.name}
                        </span>
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
                {[
                  {
                    label: language === 'es' ? 'Más claridad' : 'More clarity',
                    text: language === 'es' ? 'Decisiones con mejor contexto' : 'Decisions with better context',
                  },
                  {
                    label: language === 'es' ? 'Más confianza' : 'More trust',
                    text: language === 'es' ? 'Modelos y procesos con criterio' : 'Models and processes with accountability',
                  },
                  {
                    label: language === 'es' ? 'Más impacto' : 'More impact',
                    text: language === 'es' ? 'Resultados conectados al negocio' : 'Outcomes tied to business value',
                  },
                ].map((item) => (
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

            <div className="relative mt-10 overflow-hidden">
              <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 ${isDark ? 'bg-[linear-gradient(90deg,#0b1527,transparent)]' : 'bg-[linear-gradient(90deg,#ffffff,transparent)]'}`} />
              <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 ${isDark ? 'bg-[linear-gradient(270deg,#0b1527,transparent)]' : 'bg-[linear-gradient(270deg,#ffffff,transparent)]'}`} />
              <motion.ul
                className="flex w-max gap-4 pb-2"
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
                className="h-full w-full object-cover opacity-20"
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

      <section className={`${isDark ? 'bg-[#0b1527]' : 'bg-white'} pb-20 pt-10 md:pb-24`}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-[34px] border p-7 md:p-10 ${isDark ? 'border-sky-300/16 bg-[linear-gradient(135deg,rgba(8,18,34,0.98),rgba(11,30,52,0.92))]' : 'border-slate-200 bg-[linear-gradient(135deg,#f7fbff_0%,#ffffff_70%)] shadow-[0_24px_60px_rgba(15,23,42,0.08)]'}`}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className={`absolute -right-10 top-0 h-44 w-44 rounded-full blur-3xl ${isDark ? 'bg-fuchsia-500/12' : 'bg-fuchsia-300/18'}`} />
              <div className={`absolute left-0 top-8 h-40 w-40 rounded-full blur-3xl ${isDark ? 'bg-sky-400/12' : 'bg-sky-200/24'}`} />
            </div>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                  {content.ctaEyebrow}
                </p>
                <h2 className={`mt-3 text-3xl font-medium tracking-[-0.05em] md:text-4xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {content.ctaTitle}
                </h2>
                <p className={`mt-4 text-base leading-7 md:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {content.ctaDescription}
                </p>
              </div>

              <Link
                to={contactHref}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition md:text-base ${isDark ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-slate-950 text-white hover:bg-slate-800'}`}
              >
                {content.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
