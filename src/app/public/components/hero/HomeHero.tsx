import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useTheme } from '../../../shared/contexts/ThemeContext';
import { buildContactLink } from '../../../shared/utils/contactLinks';
import { ClientLogosMarquee } from './ClientLogosMarquee';
import { DataBlueprintJourney } from './DataBlueprintJourney';
import { HeroLiquidBackdrop } from './HeroLiquidBackdrop';
import type { ClientLogoMarqueeItem } from './clientLogosMarqueeData';

interface HomeHeroProps {
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  eyebrow?: string;
  marqueeLogos?: ClientLogoMarqueeItem[];
  marqueeDurationSeconds?: number;
}

function renderGlassHighlightText(text: string, language: 'es' | 'en', isDark: boolean): ReactNode {
  const highlightTokens = language === 'es'
    ? ['Te ayudamos', 'futuro']
    : ['We help', 'future'];
  const escapedTokens = highlightTokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
  const parts = text.split(pattern);
  const highlightClass = isDark
    ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(255,214,247,0.92)_20%,rgba(249,168,212,0.82)_48%,rgba(217,70,239,0.9)_100%)]'
    : 'bg-[linear-gradient(135deg,rgba(109,40,217,0.98)_0%,rgba(147,51,234,0.94)_42%,rgba(217,70,239,0.96)_100%)]';

  return parts.map((part, index) => {
    const isHighlighted = highlightTokens.some((token) => token.toLowerCase() === part.toLowerCase());

    if (!isHighlighted) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <span
        key={`${part}-${index}`}
        className={`inline-block whitespace-nowrap bg-clip-text px-[0.05em] py-[0.08em] text-transparent ${highlightClass}`}
        style={{
          filter: 'saturate(1.12)',
        }}
      >
        {part}
      </span>
    );
  });
}

export function HomeHero({
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  eyebrow,
  marqueeLogos,
  marqueeDurationSeconds,
}: HomeHeroProps) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const textPrimaryClass = isDark ? 'text-white' : 'text-slate-950';
  const textSecondaryClass = isDark ? 'text-slate-200' : 'text-slate-700';
  const eyebrowClass = isDark ? 'text-fuchsia-300' : 'text-fuchsia-700';
  const secondaryCtaClass = isDark
    ? 'border-white/18 bg-white/8 text-white hover:border-white/28 hover:bg-white/12'
    : 'border-slate-900/10 bg-white/38 text-slate-900 hover:border-slate-900/18 hover:bg-white/54';
  const chipClass = isDark
    ? 'border-white/14 bg-white/8 text-slate-200'
    : 'border-slate-900/10 bg-white/34 text-slate-800';

  const content = {
    eyebrow:
      eyebrow ||
      (language === 'es' ? 'Consultoría Data & AI' : 'Data & AI Consulting'),
    title:
      title ||
      (language === 'es'
        ? 'Construimos el futuro de las organizaciones con Data & AI'
        : 'We build the future of organizations with Data & AI'),
    subtitle:
      subtitle ||
      (language === 'es'
        ? 'Impulsamos decisiones estratégicas, automatización e inteligencia empresarial a través de datos e inteligencia artificial.'
        : 'We drive strategic decisions, automation, and business intelligence through data and AI.'),
    primaryCtaLabel:
      primaryCtaLabel || (language === 'es' ? 'Hablar con un experto' : 'Talk to an expert'),
    primaryCtaHref:
      primaryCtaHref || buildContactLink({
        language,
        sourceType: 'home',
        sourceTitle: language === 'es' ? 'Home hero' : 'Home hero',
        sourceCtaLabel: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
        intent: 'general_consultation',
        referrerPath: `/${language}/`,
      }),
    secondaryCtaLabel:
      secondaryCtaLabel || (language === 'es' ? 'Explorar servicios' : 'Explore services'),
    secondaryCtaHref:
      secondaryCtaHref || `/${language}/${language === 'es' ? 'servicios' : 'services'}`,
  };

  return (
    <>
      <section data-home-snap-section="true" className="relative min-h-[calc(100vh-5rem)] overflow-hidden pt-20">
        <HeroLiquidBackdrop />

        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(3,5,14,0.28) 0%, rgba(3,5,14,0.56) 52%, rgba(3,5,14,0.72) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,250,253,0.12) 24%, rgba(249,236,247,0.14) 46%, rgba(244,226,245,0.24) 100%)',
          }}
        />

        <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center px-6 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="max-w-[880px]">
              <motion.p
                className={`mb-5 text-sm font-medium uppercase tracking-[0.28em] ${eyebrowClass}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {content.eyebrow}
              </motion.p>

              <motion.h1
                className={`max-w-5xl text-balance text-[clamp(3rem,7vw,6.9rem)] font-light leading-[1] tracking-[-0.055em] ${textPrimaryClass}`}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {renderGlassHighlightText(content.title, language, isDark)}
              </motion.h1>

              <motion.p
                className={`mt-7 max-w-2xl text-base font-light leading-8 sm:text-lg ${textSecondaryClass}`}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32 }}
              >
                {renderGlassHighlightText(content.subtitle, language, isDark)}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.44 }}
              >
                <a
                  href={content.primaryCtaHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-slate-950 shadow-[0_16px_36px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  <span>{content.primaryCtaLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>

                <a
                  href={content.secondaryCtaHref}
                  className={`inline-flex items-center justify-center rounded-full border px-7 py-4 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${secondaryCtaClass}`}
                >
                  {content.secondaryCtaLabel}
                </a>
              </motion.div>
              <motion.div
                className="mt-12 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.56 }}
              >
                {[
                  language === 'es' ? 'Estrategia empresarial' : 'Business strategy',
                  language === 'es' ? 'Data platforms' : 'Data platforms',
                  language === 'es' ? 'IA aplicada' : 'Applied AI',
                ].map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] backdrop-blur-md ${chipClass}`}
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <motion.div
        className="relative z-10 mt-8 w-full sm:mt-10 lg:mt-12"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.62 }}
      >
        <ClientLogosMarquee logos={marqueeLogos} durationSeconds={marqueeDurationSeconds} />
      </motion.div>

      <DataBlueprintJourney language={language} />
    </>
  );
}
