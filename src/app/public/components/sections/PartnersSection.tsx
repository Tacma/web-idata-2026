import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { HomeSection } from '../../../shared/types';
import { getPublished as getPublishedPartners } from '../../../../services/partnersService';

import awsLogo from '/assets/logos/partners/aws.png';
import databricksLogo from '/assets/logos/partners/databricks.png';
import googleCloudLogo from '/assets/logos/partners/google-cloud.png';
import microsoftLogo from '/assets/logos/partners/microsoft.png';
import snowflakeLogo from '/assets/logos/partners/snowflake.png';
import tdSynnexLogo from '/assets/logos/partners/td-synnex.png';

interface PartnersSectionProps {
  section: HomeSection;
}

interface TechnologyProfile {
  name: string;
  logo: string;
  badge: { es: string; en: string };
  description: { es: string; en: string };
}

const technologyProfiles: Record<string, TechnologyProfile> = {
  microsoft: {
    name: 'Microsoft',
    logo: microsoftLogo,
    badge: {
      es: 'Microsoft Fabric y Azure Data & AI',
      en: 'Microsoft Fabric and Azure Data & AI',
    },
    description: {
      es: 'Diseñamos soluciones sobre Microsoft Fabric y Azure con experiencia respaldada por ofertas publicadas en Microsoft Marketplace y casos reales de modernización analítica.',
      en: 'We design solutions on Microsoft Fabric and Azure backed by published Microsoft Marketplace offers and real-world analytics modernization engagements.',
    },
  },
  databricks: {
    name: 'Databricks',
    logo: databricksLogo,
    badge: {
      es: 'Arquitecturas Lakehouse y gobierno moderno',
      en: 'Lakehouse architecture and modern governance',
    },
    description: {
      es: 'Acompañamos implementaciones sobre Databricks con foco en Lakehouse, Unity Catalog, ingeniería de datos y analítica avanzada para escenarios empresariales de escala.',
      en: 'We support Databricks implementations focused on Lakehouse, Unity Catalog, data engineering, and advanced analytics for enterprise-scale scenarios.',
    },
  },
  'td synnex': {
    name: 'TD SYNNEX',
    logo: tdSynnexLogo,
    badge: {
      es: 'Habilitación regional y reconocimiento conjunto',
      en: 'Regional enablement and joint recognition',
    },
    description: {
      es: 'Nuestra relación con TD SYNNEX fortalece la habilitación comercial y tecnológica del negocio, y en iData hemos comunicado el reconocimiento Microsoft & TD SYNNEX Award 2024.',
      en: 'Our relationship with TD SYNNEX strengthens commercial and technical enablement, and iData has publicly highlighted the Microsoft & TD SYNNEX Award 2024 recognition.',
    },
  },
  snowflake: {
    name: 'Snowflake',
    logo: snowflakeLogo,
    badge: {
      es: 'Plataformas cloud-ready para datos compartidos',
      en: 'Cloud-ready platforms for shared data',
    },
    description: {
      es: 'Integramos Snowflake en arquitecturas modernas que priorizan elasticidad, consumo eficiente y acceso gobernado a datos para múltiples áreas del negocio.',
      en: 'We integrate Snowflake into modern architectures focused on elasticity, efficient consumption, and governed data access across business teams.',
    },
  },
  aws: {
    name: 'AWS',
    logo: awsLogo,
    badge: {
      es: 'Data platforms y escalabilidad cloud',
      en: 'Data platforms and cloud scalability',
    },
    description: {
      es: 'Construimos entornos de datos sobre AWS para cargas analíticas, integración, observabilidad y operación continua de plataformas críticas.',
      en: 'We build data environments on AWS for analytics workloads, integration, observability, and continuous operation of critical platforms.',
    },
  },
  'google cloud': {
    name: 'Google Cloud',
    logo: googleCloudLogo,
    badge: {
      es: 'Analítica moderna e IA en la nube',
      en: 'Modern analytics and cloud AI',
    },
    description: {
      es: 'Aprovechamos Google Cloud para acelerar soluciones de datos e inteligencia artificial con servicios listos para escalar en entornos corporativos.',
      en: 'We leverage Google Cloud to accelerate data and AI solutions with services ready to scale in enterprise environments.',
    },
  },
};

const fallbackTechnologyOrder = ['Microsoft', 'Databricks', 'TD SYNNEX', 'Snowflake', 'AWS', 'Google Cloud'];

function normalizeName(value: unknown) {
  return String(value || '').trim().toLowerCase();
}

export function PartnersSection({ section }: PartnersSectionProps) {
  const language = section.language === 'en' ? 'en' : 'es';
  const [partners, setPartners] = useState<any[]>(Array.isArray(section.config?.partners) ? section.config.partners : []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const partnersData = await getPublishedPartners();
        if (!cancelled && partnersData.length > 0) {
          setPartners(partnersData);
        }
      } catch (error) {
        console.error('Error loading partners:', error);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const technologies = useMemo(() => {
    const seen = new Set<string>();
    const sourceNames = [
      ...fallbackTechnologyOrder,
      ...partners.map((partner) => String(partner?.name || '')),
      ...((section.config?.partners as Array<{ name?: string }> | undefined)?.map((partner) => String(partner?.name || '')) || []),
    ];

    return sourceNames
      .map((name) => technologyProfiles[normalizeName(name)])
      .filter((profile): profile is TechnologyProfile => Boolean(profile))
      .filter((profile) => {
        const key = normalizeName(profile.name);
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
  }, [partners, section.config?.partners]);

  useEffect(() => {
    if (activeIndex > technologies.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, technologies.length]);

  if (technologies.length === 0) {
    return null;
  }

  const activeTechnology = technologies[activeIndex] || technologies[0];
  const eyebrow = language === 'es' ? 'Tecnologías líderes' : 'Leading technologies';
  const title =
    language === 'es'
      ? 'Somos expertos en tecnologías líderes'
      : 'We are experts in leading technologies';
  const subtitle =
    language === 'es'
      ? 'Trabajamos con plataformas clave del ecosistema Data & AI para diseñar, implementar y escalar soluciones empresariales con criterio técnico y visión de negocio.'
      : 'We work with key Data & AI platforms to design, implement, and scale enterprise solutions with technical rigor and business perspective.';
  const desktopCardHeight = 128;
  const desktopCardGap = 22;
  const desktopViewportHeight = 428;
  const desktopCenterOffset = desktopViewportHeight / 2 - desktopCardHeight / 2;
  const stackTranslateY = desktopCenterOffset - activeIndex * (desktopCardHeight + desktopCardGap);
  const desktopSectionHeight = 468;
  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? technologies.length - 1 : current - 1));
  };
  const goToNext = () => {
    setActiveIndex((current) => (current === technologies.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.06),transparent_24%)]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="xl:hidden">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-500 dark:text-sky-300">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl text-[clamp(2.2rem,9vw,3.8rem)] font-light leading-[0.92] tracking-[-0.06em] text-[var(--text-strong)]">
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[var(--text-body)]">
              {subtitle}
            </p>
          </motion.div>

          <div className="mt-6">
            <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-sky-500 dark:text-sky-300">
              {language === 'es' ? 'Desliza y explora plataformas' : 'Swipe and explore platforms'}
            </p>
            <div
              className="scrollbar-hide -mx-2 flex snap-x snap-mandatory items-center gap-5 overflow-x-auto overscroll-x-contain px-2 pb-1 scroll-smooth sm:-mx-8 sm:gap-6"
              style={{
                paddingLeft: 'calc(50% - 5.25rem)',
                paddingRight: 'calc(50% - 5.25rem)',
                scrollPaddingLeft: '50%',
                scrollPaddingRight: '50%',
              }}
            >
              {technologies.map((technology, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={`${technology.name}-mobile`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`flex h-[5.6rem] min-w-[168px] snap-center items-center justify-center rounded-full border px-7 transition-all duration-500 sm:min-w-[184px] ${
                      isActive
                        ? 'border-sky-200 bg-[var(--surface-0)] shadow-[0_18px_44px_rgba(14,165,233,0.1)]'
                        : 'border-[var(--line-soft)] bg-[var(--surface-1)]'
                    }`}
                    animate={{ scale: isActive ? 1.04 : 0.94, opacity: isActive ? 1 : 0.5 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    style={{ scrollSnapStop: 'always' }}
                  >
                    <img
                      src={technology.logo}
                      alt={technology.name}
                      className={`partner-logo-adaptive mx-auto h-8 w-auto max-w-[124px] object-contain transition-all duration-500 sm:h-11 sm:max-w-[132px] ${
                        isActive ? 'opacity-100 saturate-100' : 'opacity-55 saturate-75'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-[30px] border border-[var(--line-soft)] bg-[var(--surface-1)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-500 dark:text-sky-300">
              {language === 'es' ? 'Tecnología activa' : 'Active technology'}
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeTechnology.name}-mobile-card`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="mt-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <img
                    src={activeTechnology.logo}
                    alt={activeTechnology.name}
                    className="partner-logo-adaptive h-10 w-auto max-w-[160px] object-contain"
                  />
                  <span className="text-sm font-medium text-[var(--text-faint)]">{activeTechnology.name}</span>
                </div>
                <p className="mt-5 inline-flex w-fit items-center rounded-full border border-sky-300/30 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                  {activeTechnology.badge[language]}
                </p>
                <p className="mt-5 text-base leading-8 text-[var(--text-body)]">
                  {activeTechnology.description[language]}
                </p>
                <div className="mt-5 rounded-[18px] border border-[var(--line-soft)] bg-[var(--surface-0)] px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-500 dark:text-sky-300">
                    {language === 'es' ? 'Enfoque iData' : 'iData focus'}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">
                    {language === 'es'
                      ? 'Seleccionamos la plataforma adecuada según madurez, operación, escalabilidad y objetivos del negocio.'
                      : 'We choose the right platform based on maturity, operations, scalability, and business goals.'}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div
          className="hidden gap-10 xl:grid xl:grid-cols-[minmax(0,0.88fr)_300px_minmax(0,0.86fr)] xl:items-start"
          style={{ minHeight: desktopSectionHeight }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="sticky top-28 self-start"
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-500 dark:text-sky-300">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl text-[clamp(2.3rem,4.2vw,5rem)] font-light leading-[0.92] tracking-[-0.06em] text-[var(--text-strong)]">
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[var(--text-body)]">
              {subtitle}
            </p>
          </motion.div>

          <div className="relative mx-auto w-full max-w-[300px]">
            <div className="sticky top-24 z-20">
              <div className="pointer-events-none absolute inset-x-0 top-3 z-30 flex justify-center">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--surface-0)] text-[var(--text-body)] transition-all duration-300 hover:border-sky-300/40 hover:text-sky-300 hover:shadow-[0_14px_32px_rgba(14,165,233,0.08)]"
                  aria-label={language === 'es' ? 'Tecnología anterior' : 'Previous technology'}
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
              </div>

              <div className="h-[428px] overflow-hidden">
              <motion.div
                animate={{ y: stackTranslateY }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 flex flex-col gap-[22px] will-change-transform"
              >
              {technologies.map((technology, index) => {
                const isActive = index === activeIndex;
                const distance = Math.abs(index - activeIndex);
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.72 : 0.36;
                const scale = distance === 0 ? 1 : distance === 1 ? 0.965 : 0.92;

                return (
                  <div key={technology.name} className="flex h-[128px] items-center justify-center">
                    <motion.button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`relative flex w-full min-h-[128px] items-center justify-center rounded-[28px] border px-6 py-8 transition-all duration-300 ${
                        isActive
                          ? 'border-sky-300/35 bg-[var(--surface-0)] shadow-[0_24px_52px_rgba(14,165,233,0.1)]'
                          : 'border-[var(--line-soft)] bg-[var(--surface-1)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-0)]'
                      }`}
                      animate={{
                        scale,
                        opacity,
                        y: isActive ? 0 : distance === 1 ? 6 : 12,
                      }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img
                        src={technology.logo}
                        alt={technology.name}
                        className={`partner-logo-adaptive h-10 w-auto max-w-[148px] object-contain transition-all duration-300 sm:h-12 ${
                          isActive ? 'opacity-100 saturate-100' : 'opacity-60 saturate-50'
                        }`}
                      />
                    </motion.button>
                  </div>
                );
              })}
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center">
                <button
                  type="button"
                  onClick={goToNext}
                  className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--surface-0)] text-[var(--text-body)] transition-all duration-300 hover:border-sky-300/40 hover:text-sky-300 hover:shadow-[0_14px_32px_rgba(14,165,233,0.08)]"
                  aria-label={language === 'es' ? 'Siguiente tecnología' : 'Next technology'}
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          </div>

          <motion.div
            className="sticky top-28 self-start"
          >
            <div className="rounded-[30px] border border-[var(--line-soft)] bg-[var(--surface-1)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-500 dark:text-sky-300">
                {language === 'es' ? 'Tecnología activa' : 'Active technology'}
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTechnology.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5"
                >
                  <img
                    src={activeTechnology.logo}
                    alt={activeTechnology.name}
                    className="partner-logo-adaptive h-10 w-auto max-w-[160px] object-contain"
                  />
                  <p className="mt-5 inline-flex w-fit items-center rounded-full border border-sky-300/30 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
                    {activeTechnology.badge[language]}
                  </p>
                  <p className="mt-5 text-base leading-8 text-[var(--text-body)]">
                    {activeTechnology.description[language]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
