import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BrainCircuit,
  Database,
  Globe2,
  GraduationCap,
  Network,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users2,
} from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../../../shared/contexts/ThemeContext';
import type { Language } from '../../../shared/types';

interface HomeWhyIDataSectionProps {
  language: Language;
}

export function HomeWhyIDataSection({ language }: HomeWhyIDataSectionProps) {
  const isSpanish = language === 'es';
  const { isDark } = useTheme();

  const eyebrow = isSpanish ? 'Lo que podemos construir juntos' : 'What we can build together';
  const description = isSpanish
    ? 'Somos un partner que aterriza visión de negocio en plataformas, operación y analítica aplicada. Sumamos experiencia regional, un equipo experto, formación continua con iData Academy y un ecosistema tecnológico sólido para convertir datos en crecimiento.'
    : 'We are a partner that turns business vision into platforms, operations, and applied analytics. We bring regional experience, an expert team, continuous enablement through iData Academy, and a strong technology ecosystem to turn data into growth.';
  const neutralAccent = isDark ? 'from-[#0f172a] to-[#14233b]' : 'from-white to-slate-50';
  const neutralBorderTone = isDark ? 'border-white/10' : 'border-slate-200/70';
  const neutralShellTone = isDark
    ? 'text-white shadow-[0_18px_42px_rgba(2,6,23,0.28)]'
    : 'text-slate-950 shadow-[0_16px_36px_rgba(15,23,42,0.08)]';
  const skyAccent = isDark ? 'from-[#0d1a2d] to-[#122742]' : 'from-sky-50 to-white';
  const skyBorderTone = isDark ? 'border-sky-300/18' : 'border-sky-200/70';
  const skyShellTone = isDark
    ? 'text-white shadow-[0_18px_44px_rgba(14,165,233,0.12)]'
    : 'text-slate-950 shadow-[0_18px_40px_rgba(67,135,223,0.16)]';

  const cards = [
    {
      icon: Sparkles,
      accent: 'from-fuchsia-500 to-violet-900',
      iconTone: 'border-white/20 bg-white/10 text-white',
      borderTone: 'border-fuchsia-200/60',
      shellTone: 'text-white shadow-[0_24px_60px_rgba(91,33,182,0.28)]',
      value: '13+',
      eyebrow: isSpanish ? 'Años de experiencia' : 'Years of experience',
      title: isSpanish ? 'Innovación sostenida en Data & AI' : 'Sustained Data & AI innovation',
      description: isSpanish
        ? 'Más de una década acompañando estrategia, delivery y operación para transformar datos en decisiones.'
        : 'More than a decade combining strategy, delivery, and operations to turn data into decisions.',
      dark: true,
    },
    {
      icon: Users2,
      accent: skyAccent,
      iconTone: isDark ? 'bg-sky-400/12 text-sky-200' : 'bg-sky-100 text-sky-600',
      borderTone: skyBorderTone,
      shellTone: skyShellTone,
      value: '100+',
      eyebrow: isSpanish ? 'Clientes' : 'Clients',
      title: isSpanish ? 'Confianza construida en múltiples industrias' : 'Trust built across industries',
      description: isSpanish
        ? 'Organizaciones que siguen apostando por iData para modernización, analítica e inteligencia aplicada.'
        : 'Organizations that continue to rely on iData for modernization, analytics, and applied intelligence.',
    },
    {
      icon: GraduationCap,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-violet-400/12 text-violet-200' : 'bg-violet-100 text-violet-600',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      value: '50+',
      eyebrow: 'iData Academy',
      title: isSpanish ? 'Talento experto y formación continua' : 'Expert talent and continuous enablement',
      description: isSpanish
        ? 'Un equipo que se fortalece con aprendizaje constante, criterio técnico y visión de negocio.'
        : 'A team strengthened by continuous learning, technical rigor, and business perspective.',
    },
    {
      icon: Globe2,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-emerald-400/12 text-emerald-200' : 'bg-emerald-100 text-emerald-600',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      value: '10+',
      eyebrow: isSpanish ? 'Países' : 'Countries',
      title: isSpanish ? 'Presencia regional con ejecución real' : 'Regional presence with real execution',
      description: isSpanish
        ? 'Cobertura internacional para operar con cercanía, contexto de negocio y alcance regional.'
        : 'International coverage to operate with proximity, business context, and regional reach.',
    },
    {
      icon: Award,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-amber-400/12 text-amber-200' : 'bg-amber-100 text-amber-600',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      value: '2024',
      eyebrow: 'Microsoft & TD SYNNEX',
      title: isSpanish ? 'Reconocimiento que sí podemos mostrar' : 'Recognition we can actually stand behind',
      description: isSpanish
        ? 'Un hito público dentro del ecosistema partner que refuerza capacidad comercial y tecnológica.'
        : 'A public milestone within the partner ecosystem that reinforces commercial and technical strength.',
    },
    {
      icon: Database,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-cyan-400/12 text-cyan-200' : 'bg-cyan-100 text-cyan-700',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      eyebrow: isSpanish ? 'Estrategia de datos' : 'Data strategy',
      title: isSpanish ? 'Diseño de hojas de ruta y prioridades de negocio' : 'Business-aligned roadmaps and priorities',
      description: isSpanish
        ? 'Alineamos visión ejecutiva, casos de uso, gobierno y foco de inversión para que el dato responda al negocio.'
        : 'We align executive vision, use cases, governance, and investment focus so data responds to business priorities.',
    },
    {
      icon: ShieldCheck,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-emerald-400/12 text-emerald-200' : 'bg-emerald-100 text-emerald-700',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      eyebrow: isSpanish ? 'Gobierno y calidad' : 'Governance and quality',
      title: isSpanish ? 'Modelos de control, calidad y trazabilidad' : 'Control, quality, and traceability models',
      description: isSpanish
        ? 'Estructuramos cimientos de gobierno, calidad y reglas operables para escalar sin perder confianza.'
        : 'We structure governance, quality, and operable rules to scale without losing trust.',
    },
    {
      icon: Network,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-indigo-400/12 text-indigo-200' : 'bg-indigo-100 text-indigo-700',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      eyebrow: isSpanish ? 'Arquitectura de datos' : 'Data architecture',
      title: isSpanish ? 'Plataformas modernas, integración y lakehouse' : 'Modern platforms, integration, and lakehouse',
      description: isSpanish
        ? 'Diseñamos arquitecturas empresariales que conectan fuentes, procesos y consumo analítico con criterio técnico.'
        : 'We design enterprise architectures that connect sources, processes, and analytical consumption with technical rigor.',
    },
    {
      icon: BrainCircuit,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-fuchsia-400/12 text-fuchsia-200' : 'bg-fuchsia-100 text-fuchsia-700',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      eyebrow: isSpanish ? 'IA y analítica aplicada' : 'Applied AI and analytics',
      title: isSpanish ? 'Modelos, automatización y decisiones aumentadas' : 'Models, automation, and augmented decisions',
      description: isSpanish
        ? 'Activamos analítica avanzada e inteligencia artificial sobre bases gobernadas y listas para producción.'
        : 'We activate advanced analytics and artificial intelligence on governed foundations ready for production.',
    },
    {
      icon: Settings2,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-orange-400/12 text-orange-200' : 'bg-orange-100 text-orange-700',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      eyebrow: isSpanish ? 'Operación continua' : 'Continuous operations',
      title: isSpanish ? 'Soporte, observabilidad y evolución sostenida' : 'Support, observability, and sustained evolution',
      description: isSpanish
        ? 'No solo implementamos: ayudamos a operar, medir y evolucionar plataformas críticas con continuidad.'
        : 'We do not only implement: we help run, measure, and evolve critical platforms with continuity.',
    },
    {
      icon: Sparkles,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-sky-400/12 text-sky-200' : 'bg-sky-100 text-sky-700',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      eyebrow: isSpanish ? 'Impacto medible' : 'Measurable impact',
      title: isSpanish ? 'Proyectos ejecutados hasta 30% más rápido' : 'Projects delivered up to 30% faster',
      description: isSpanish
        ? 'Una señal clara de ejecución con foco, método y capacidad de llevar iniciativas a resultados.'
        : 'A clear signal of execution with focus, method, and the ability to turn initiatives into outcomes.',
    },
    {
      icon: Users2,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-rose-400/12 text-rose-200' : 'bg-rose-100 text-rose-700',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      eyebrow: isSpanish ? 'Equipo multidisciplinario' : 'Multidisciplinary team',
      title: isSpanish ? 'Negocio, datos, producto y operación conectados' : 'Business, data, product, and operations connected',
      description: isSpanish
        ? 'Combinamos criterio de negocio con talento técnico para aterrizar soluciones que sí se pueden operar.'
        : 'We combine business perspective with technical talent to land solutions that can actually be operated.',
    },
    {
      icon: Globe2,
      accent: neutralAccent,
      iconTone: isDark ? 'bg-teal-400/12 text-teal-200' : 'bg-teal-100 text-teal-700',
      borderTone: neutralBorderTone,
      shellTone: neutralShellTone,
      eyebrow: isSpanish ? 'Cobertura sectorial' : 'Industry coverage',
      title: isSpanish ? 'Experiencia en organizaciones líderes y contextos complejos' : 'Experience with leading organizations and complex contexts',
      description: isSpanish
        ? 'Hemos acompañado múltiples industrias donde el dato necesita continuidad, escala y lectura estratégica.'
        : 'We have supported multiple industries where data requires continuity, scale, and strategic insight.',
    },
  ];

  const topRowCards = [cards[0], cards[5], cards[1], cards[6], cards[4], cards[9]];
  const bottomRowCards = [cards[2], cards[7], cards[3], cards[8], cards[1], cards[10]];
  const repeatedTopRowCards = [...topRowCards, ...topRowCards];
  const repeatedBottomRowCards = [...bottomRowCards, ...bottomRowCards];
  const mobileTopRowCards = [cards[0], cards[1], cards[5], cards[4], cards[9]];
  const mobileBottomRowCards = [cards[2], cards[3], cards[7], cards[8], cards[10]];
  const repeatedMobileTopRowCards = [...mobileTopRowCards, ...mobileTopRowCards, ...mobileTopRowCards];
  const repeatedMobileBottomRowCards = [...mobileBottomRowCards, ...mobileBottomRowCards, ...mobileBottomRowCards];

  function renderMobileCard(card: (typeof cards)[number]) {
    const Icon = card.icon;

    return (
      <div
        className={`min-h-[8.5rem] w-[11.4rem] shrink-0 rounded-[22px] border bg-gradient-to-br p-3 shadow-[0_14px_32px_rgba(15,23,42,0.08)] ${card.accent} ${card.borderTone} ${card.shellTone}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className={`inline-flex h-7 w-7 items-center justify-center rounded-xl ${card.iconTone}`}>
              <Icon className="h-3 w-3" />
            </div>
            {card.value ? (
              <p className={`text-right text-[1.55rem] font-light leading-none tracking-[-0.06em] ${card.dark ? 'text-white' : isDark ? 'text-white' : 'text-slate-950'}`}>
                {card.value}
              </p>
            ) : null}
          </div>

          <div className="mt-auto pt-2">
            <p className={`text-[7px] font-medium uppercase tracking-[0.18em] ${card.dark ? 'text-white/70' : isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              {card.eyebrow}
            </p>
            <h3 className={`mt-1 max-w-[9rem] text-[0.82rem] font-light leading-[0.95] tracking-[-0.03em] ${card.dark ? 'text-white' : isDark ? 'text-white' : 'text-slate-950'}`}>
              {card.title}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  function renderCard(card: (typeof cards)[number], compact = false, mobileCompact = false) {
    const Icon = card.icon;

    return (
      <div
        className={`rounded-[30px] border bg-gradient-to-br ${card.accent} p-5 ${card.borderTone} ${card.shellTone} ${
          mobileCompact ? 'w-[12.75rem] shrink-0 rounded-[22px] p-3 max-[390px]:w-[11.9rem]' : compact ? 'w-[27rem] shrink-0 md:w-[28rem]' : 'w-full'
        }`}
      >
        <div
          className={`grid gap-5 ${
            mobileCompact
              ? 'grid-cols-[48px_minmax(0,1fr)] items-start gap-2 max-[390px]:grid-cols-[42px_minmax(0,1fr)]'
              : compact
              ? 'grid-cols-[100px_minmax(0,1fr)] items-start'
              : 'grid-cols-[78px_minmax(0,1fr)] items-start sm:grid-cols-[88px_minmax(0,1fr)] md:grid-cols-[112px_minmax(0,1fr)]'
          }`}
        >
          <div className="min-w-0">
            <div className={`inline-flex items-center justify-center rounded-2xl ${mobileCompact ? 'h-7 w-7 max-[390px]:h-6 max-[390px]:w-6' : 'h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12'} ${card.iconTone}`}>
              <Icon className={`${mobileCompact ? 'h-3 w-3 max-[390px]:h-2.5 max-[390px]:w-2.5' : 'h-4 w-4 sm:h-5 sm:w-5'}`} />
            </div>
            {card.value ? (
              <p className={`font-light leading-none tracking-[-0.08em] ${mobileCompact ? 'mt-2 text-[1.65rem] max-[390px]:text-[1.4rem]' : 'mt-4 text-[clamp(1rem,3.5vw,1.9rem)] sm:mt-5'} ${compact ? 'text-[1.575rem]' : ''} ${card.dark ? 'text-white' : isDark ? 'text-white' : 'text-slate-950'}`}>
                {card.value}
              </p>
            ) : null}
            <p className={`mt-1 whitespace-normal break-words font-medium uppercase leading-[1.02] tracking-[0.16em] ${mobileCompact ? 'text-[7px] max-[390px]:text-[6px]' : 'text-[11px]'} ${card.dark ? 'text-white/70' : isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              {card.eyebrow}
            </p>
          </div>

          <div className="min-w-0">
            <h3 className={`font-light leading-[0.92] tracking-[-0.04em] ${mobileCompact ? 'max-w-[7.3rem] text-[0.76rem] max-[390px]:max-w-[6.8rem] max-[390px]:text-[0.7rem]' : 'text-[clamp(1.05rem,4.8vw,2rem)] sm:text-[clamp(1.2rem,3.8vw,2rem)]'} ${compact ? 'max-w-[18rem] text-[1.05rem] md:text-[1.18rem]' : ''} ${card.dark ? 'text-white' : isDark ? 'text-white' : 'text-slate-950'}`}>
              {card.title}
            </h3>
            <p className={`max-w-2xl ${mobileCompact ? 'mt-1 max-w-[7.3rem] text-[8.5px] leading-[1.1rem] max-[390px]:max-w-[6.8rem] max-[390px]:text-[8px] max-[390px]:leading-[1rem]' : 'mt-2 text-[13px] leading-[1.45] sm:mt-3 sm:text-sm sm:leading-[1.5]'} ${compact ? 'max-w-[18rem] text-[12.5px] leading-[1.45]' : ''} ${card.dark ? 'text-white/82' : isDark ? 'text-slate-200' : 'text-slate-600'}`}>
              {card.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className={`pointer-events-none absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.14),transparent_24%),linear-gradient(180deg,rgba(7,15,28,0.98),rgba(10,20,38,0.96))]' : 'bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,249,255,0.92))]'} `} />
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-px ${isDark ? 'bg-[linear-gradient(90deg,transparent,rgba(125,211,252,0.28),transparent)]' : 'bg-[linear-gradient(90deg,transparent,rgba(67,135,223,0.22),transparent)]'}`} />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.02fr)] xl:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl xl:justify-self-center"
        >
          <p className={`text-xs font-medium uppercase tracking-[0.3em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-[12ch] text-[clamp(2.2rem,3.8vw,4.2rem)] font-light leading-[1.01] tracking-[-0.065em] text-[var(--text-strong)]">
            {isSpanish ? '13+ años convirtiendo ' : '13+ years turning '}
            <span className={`${isDark ? 'bg-[linear-gradient(135deg,#7dd3fc_0%,#60a5fa_28%,#c084fc_72%,#f472b6_100%)]' : 'bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_26%,#d946ef_72%,#7c3aed_100%)]'} bg-clip-text text-transparent`}>
              Data & AI
            </span>
            {isSpanish ? ' en decisiones reales.' : ' into real decisions.'}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.65] text-[var(--text-body)] sm:text-lg sm:leading-[1.7]">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/${language}/${isSpanish ? 'nosotros' : 'about'}/`}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${isDark ? 'bg-white text-slate-950 shadow-[0_18px_40px_rgba(2,6,23,0.28)]' : 'bg-slate-950 text-white shadow-[0_18px_40px_rgba(2,6,23,0.18)]'}`}
            >
              <span>{isSpanish ? 'Conocer iData' : 'Discover iData'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={`/${language}/${isSpanish ? 'contacto' : 'contact'}/`}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${isDark ? 'border-white/12 bg-white/6 text-white shadow-[0_16px_34px_rgba(2,6,23,0.22)] hover:bg-white/10' : 'border-slate-200 bg-white/78 text-slate-800 shadow-[0_16px_34px_rgba(148,163,184,0.12)]'}`}
            >
              <span>{isSpanish ? 'Hablar con un experto' : 'Talk to an expert'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="grid gap-4 max-lg:[margin-left:calc(50%-50vw)] max-lg:[margin-right:calc(50%-50vw)] xl:w-full xl:max-w-[58rem] xl:justify-self-center"
        >
          <div className="xl:hidden">
            <div className={`relative h-[20.25rem] w-screen overflow-hidden max-[390px]:h-[21rem] ${isDark ? 'bg-[linear-gradient(180deg,rgba(8,15,30,0),rgba(8,15,30,0.66)_100%)]' : 'bg-[linear-gradient(180deg,rgba(247,250,255,0),rgba(247,250,255,0.46)_100%)]'}`}>
              <motion.div
                className="absolute left-0 top-3 flex gap-3"
                style={{ width: 'max-content' }}
                animate={{ x: ['0%', '-33.333%'] }}
                transition={{ duration: 16.8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
              >
                {repeatedMobileTopRowCards.map((card, index) => (
                  <div key={`mobile-top-${card.value}-${index}`}>{renderMobileCard(card)}</div>
                ))}
              </motion.div>

              <motion.div
                className="absolute left-0 top-[11.2rem] flex gap-3 max-[390px]:top-[11.7rem]"
                style={{ width: 'max-content' }}
                animate={{ x: ['0%', '-33.333%'] }}
                transition={{ duration: 18.9, repeat: Number.POSITIVE_INFINITY, ease: 'linear', delay: 0.2 }}
              >
                {repeatedMobileBottomRowCards.map((card, index) => (
                  <div key={`mobile-bottom-${card.value}-${index}`}>{renderMobileCard(card)}</div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="hidden xl:block">
            <div className="relative left-1/2 h-[38rem] w-screen -translate-x-1/2 overflow-hidden">
            <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-40 ${isDark ? 'bg-[linear-gradient(90deg,rgba(8,15,30,1)_0%,rgba(8,15,30,0.98)_28%,rgba(8,15,30,0.72)_58%,rgba(8,15,30,0)_100%)]' : 'bg-[linear-gradient(90deg,rgba(245,249,255,1)_0%,rgba(245,249,255,0.98)_28%,rgba(245,249,255,0.72)_58%,rgba(245,249,255,0)_100%)]'}`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-40 ${isDark ? 'bg-[linear-gradient(270deg,rgba(8,15,30,1)_0%,rgba(8,15,30,0.98)_28%,rgba(8,15,30,0.72)_58%,rgba(8,15,30,0)_100%)]' : 'bg-[linear-gradient(270deg,rgba(245,249,255,1)_0%,rgba(245,249,255,0.98)_28%,rgba(245,249,255,0.72)_58%,rgba(245,249,255,0)_100%)]'}`} />

            <motion.div
              className="absolute left-0 top-5 flex gap-4 pl-0"
              style={{ width: 'max-content' }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 21, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            >
              {repeatedTopRowCards.map((card, index) => (
                <div key={`top-${card.value ?? card.eyebrow}-${index}`}>{renderCard(card, true)}</div>
              ))}
            </motion.div>

            <motion.div
              className="absolute left-0 top-[18.75rem] flex gap-4 pl-12"
              style={{ width: 'max-content' }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 24.5, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            >
              {repeatedBottomRowCards.map((card, index) => (
                <div key={`bottom-${card.value ?? card.eyebrow}-${index}`}>{renderCard(card, true)}</div>
              ))}
            </motion.div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
