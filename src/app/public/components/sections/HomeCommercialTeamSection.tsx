import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { useMemo } from 'react';
import type { Language } from '../../../shared/types';
import { useContactSettings } from '../../../shared/hooks/useContactSettings';
import {
  buildWhatsAppUrl,
  buildWhatsAppRegionUrl,
  getActiveWhatsAppRegions,
} from '../../../shared/utils/whatsapp';

import carlosPhoto from '/assets/images/team/commercial/carlos-luis-veracoechea-frisneda.png';
import juanPhoto from '/assets/images/team/commercial/juan-ignacio-etcheberry-mason.png';
import luisPhoto from '/assets/images/team/commercial/luis-fernando-casas-romero.png';
import nicholasPhoto from '/assets/images/team/commercial/nicholas-anthony-battista.png';
import teamPhoto from '/assets/images/about/team.png';

interface HomeCommercialTeamSectionProps {
  language: Language;
}

interface CommercialProfile {
  image: string;
  name: string;
  role_es: string;
  role_en: string;
  imageClassName?: string;
}

interface CommercialRegionDefinition {
  id: string;
  fallbackRegionIds: string[];
  regionName_es: string;
  regionName_en: string;
  phoneFallback: string;
  messageFallback_es: string;
  messageFallback_en: string;
  profile: CommercialProfile;
}

const profileByRegion: Record<string, CommercialProfile> = {
  chile: {
    image: juanPhoto,
    name: 'Juan Ignacio Etcheberry',
    role_es: 'Director comercial',
    role_en: 'Sales Director',
    imageClassName: 'object-contain object-bottom scale-[1.04]',
  },
  colombia: {
    image: luisPhoto,
    name: 'Luis Fernando Casas',
    role_es: 'Director comercial',
    role_en: 'Sales Director',
    imageClassName: 'object-contain object-bottom scale-[1.08]',
  },
  'central-america': {
    image: carlosPhoto,
    name: 'Carlos Luis Veracoechea',
    role_es: 'Director comercial',
    role_en: 'Sales Director',
    imageClassName: 'object-contain object-bottom scale-[1.02]',
  },
  'centralamerica': {
    image: carlosPhoto,
    name: 'Carlos Luis Veracoechea',
    role_es: 'Director comercial',
    role_en: 'Sales Director',
    imageClassName: 'object-contain object-bottom scale-[1.02]',
  },
  usa: {
    image: nicholasPhoto,
    name: 'Nicholas Battista',
    role_es: 'Managing Director',
    role_en: 'Managing Director',
    imageClassName: 'object-contain object-bottom scale-[1.04]',
  },
};

const commercialRegions: CommercialRegionDefinition[] = [
  {
    id: 'central-america',
    fallbackRegionIds: ['central-america', 'centralamerica', 'latam'],
    regionName_es: 'Centroamérica',
    regionName_en: 'Central America',
    phoneFallback: '+57 320 000 1101',
    messageFallback_es: 'Hola Carlos, quiero comunicarme con el equipo comercial de iData para Centroamérica.',
    messageFallback_en: "Hello Carlos, I'd like to contact the iData commercial team for Central America.",
    profile: profileByRegion['central-america'],
  },
  {
    id: 'chile',
    fallbackRegionIds: ['chile', 'latam'],
    regionName_es: 'Chile',
    regionName_en: 'Chile',
    phoneFallback: '+56 9 0000 1102',
    messageFallback_es: 'Hola Juan Ignacio, quiero comunicarme con el equipo comercial de iData para Chile.',
    messageFallback_en: "Hello Juan Ignacio, I'd like to contact the iData commercial team for Chile.",
    profile: profileByRegion.chile,
  },
  {
    id: 'colombia',
    fallbackRegionIds: ['colombia', 'latam'],
    regionName_es: 'Colombia',
    regionName_en: 'Colombia',
    phoneFallback: '+57 320 000 1103',
    messageFallback_es: 'Hola Luis Fernando, quiero comunicarme con el equipo comercial de iData para Colombia.',
    messageFallback_en: "Hello Luis Fernando, I'd like to contact the iData commercial team for Colombia.",
    profile: profileByRegion.colombia,
  },
  {
    id: 'usa',
    fallbackRegionIds: ['usa', 'us'],
    regionName_es: 'US',
    regionName_en: 'US',
    phoneFallback: '+1 303 555 1104',
    messageFallback_es: 'Hola Nicholas, quiero comunicarme con el equipo comercial de iData para Estados Unidos.',
    messageFallback_en: "Hello Nicholas, I'd like to contact the iData commercial team for the United States.",
    profile: profileByRegion.usa,
  },
];

export function HomeCommercialTeamSection({ language }: HomeCommercialTeamSectionProps) {
  const { settings } = useContactSettings();
  const contactHref = `/${language}/${language === 'es' ? 'contacto' : 'contact'}`;
  const activeRegions = useMemo(
    () => getActiveWhatsAppRegions(settings.whatsapp),
    [settings.whatsapp]
  );

  const regionCards = useMemo(() => {
    return commercialRegions.map((definition, index) => {
      const region =
        activeRegions.find((item) => definition.fallbackRegionIds.includes(item.id)) ||
        activeRegions.find((item) => definition.fallbackRegionIds.includes(item.slug));

      const profile = definition.profile || {
        image: teamPhoto,
        name: language === 'es' ? 'Equipo comercial iData' : 'iData commercial team',
        role_es: 'Atención comercial regional',
        role_en: 'Regional commercial support',
      };

      return {
        id: definition.id,
        regionName: language === 'es' ? definition.regionName_es : definition.regionName_en,
        regionLabelMobile:
          definition.id === 'central-america'
            ? language === 'es'
              ? 'Centro\namérica'
              : 'Central\nAmerica'
            : language === 'es'
              ? definition.regionName_es
              : definition.regionName_en,
        whatsappHref: region
          ? buildWhatsAppRegionUrl(region, language)
          : buildWhatsAppUrl(
              definition.phoneFallback,
              language === 'es'
                ? definition.messageFallback_es
                : definition.messageFallback_en
            ),
        profile,
        accent:
          index % 3 === 0
            ? 'from-sky-500/18 via-cyan-300/10 to-transparent'
            : index % 3 === 1
              ? 'from-fuchsia-500/16 via-violet-300/10 to-transparent'
              : 'from-emerald-500/18 via-cyan-300/10 to-transparent',
        portraitSurface:
          definition.id === 'central-america'
            ? 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.34),transparent_34%),linear-gradient(135deg,#dbeafe_0%,#eff6ff_52%,#f8fafc_100%)]'
            : definition.id === 'chile'
              ? 'bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.24),transparent_34%),linear-gradient(135deg,#ede9fe_0%,#f5f3ff_48%,#f8fafc_100%)]'
              : definition.id === 'colombia'
                ? 'bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.24),transparent_34%),linear-gradient(135deg,#dcfce7_0%,#ecfeff_48%,#f8fafc_100%)]'
                : 'bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_34%),linear-gradient(135deg,#dbeafe_0%,#eef2ff_48%,#f8fafc_100%)]',
      };
    });
  }, [activeRegions, contactHref, language]);

  return (
    <section className="relative overflow-hidden px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.1),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.08),transparent_34%)]" />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          className="mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-500 dark:text-sky-300">
            {language === 'es' ? 'Equipo comercial' : 'Commercial team'}
          </p>
          <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[0.92] tracking-[-0.06em] text-[var(--text-strong)]">
            {language === 'es' ? 'Habla con iData en tu región' : 'Talk to iData in your region'}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-body)]">
            {language === 'es'
              ? 'Encuentra el equipo comercial que corresponde a tu mercado y contáctalo directamente por WhatsApp o desde nuestra página de contacto.'
              : 'Find the commercial team for your market and contact them directly on WhatsApp or through our contact page.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {regionCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-[28px] border border-[var(--line-soft)] bg-[var(--surface-1)] p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[32px] sm:p-5 dark:border-white/12 dark:bg-[#111c30]"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent}`} />

              <div className="relative">
                <div className="flex items-stretch gap-4 sm:block">
                  <div className={`relative w-[106px] shrink-0 overflow-hidden rounded-[22px] border border-[var(--line-soft)] dark:border-white/10 sm:mt-5 sm:w-auto sm:rounded-[26px] ${card.portraitSurface}`}>
                    <span className="absolute bottom-3 left-3 z-10 max-w-[96px] whitespace-pre-line rounded-2xl border border-white/35 bg-white/78 px-2.5 py-1.5 text-center text-[10px] font-semibold uppercase leading-[1.1] tracking-[0.18em] text-sky-700 backdrop-blur-md sm:bottom-4 sm:left-4 sm:max-w-none sm:whitespace-nowrap sm:rounded-full sm:px-3 sm:py-1 sm:text-[11px] sm:leading-none sm:tracking-[0.22em] dark:border-white/15 dark:bg-slate-950/62 dark:text-sky-200">
                      <span className="sm:hidden">{card.regionLabelMobile}</span>
                      <span className="hidden sm:inline">{card.regionName}</span>
                    </span>
                    <img
                      src={card.profile.image}
                      alt={card.profile.name}
                      className={`h-[132px] w-full transition-transform duration-500 group-hover:scale-[1.03] sm:h-[224px] ${card.profile.imageClassName || 'object-cover object-top'}`}
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="sm:mt-5">
                      <h3 className="text-[1.3rem] font-semibold leading-[1] tracking-[-0.04em] text-[var(--text-strong)] sm:text-[1.55rem] dark:text-white">
                        {card.profile.name}
                      </h3>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-soft)] sm:text-sm dark:text-slate-300">
                        {language === 'es' ? card.profile.role_es : card.profile.role_en}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:flex sm:flex-col sm:gap-3">
                  <a
                    href={card.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text-strong)] px-4 py-2.5 text-[13px] font-medium text-[var(--surface-0)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:px-5 sm:py-3 sm:text-sm dark:bg-white dark:text-slate-950"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="sm:hidden">WhatsApp</span>
                    <span className="hidden sm:inline">
                      {language === 'es' ? 'Abrir WhatsApp' : 'Open WhatsApp'}
                    </span>
                  </a>

                  <Link
                    to={contactHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--surface-0)] px-4 py-2.5 text-[13px] font-medium text-[var(--text-strong)] transition-all duration-300 hover:border-sky-300/40 hover:bg-[var(--surface-1)] sm:px-5 sm:py-3 sm:text-sm dark:border-white/12 dark:bg-[#16233a] dark:text-white dark:hover:border-sky-300/30 dark:hover:bg-[#1b2b45]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{language === 'es' ? 'Ir a contacto' : 'Go to contact'}</span>
                    <ArrowRight className="hidden h-4 w-4 sm:block" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
