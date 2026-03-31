import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Language } from '../../../shared/types';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

export interface CaseStudyCardProps {
  href: string;
  language: Language;
  title: string;
  summary: string;
  industry?: string;
  region?: string;
  solutionType?: string;
  results?: string[];
  technologyTags?: string[];
  badge?: string;
  placeholder?: boolean;
  logoSrc?: string | null;
  coverImage?: string | null;
}

export function CaseStudyCard({
  href,
  language,
  title,
  summary,
  industry,
  region,
  solutionType,
  results = [],
  technologyTags = [],
  badge,
  placeholder = false,
  logoSrc,
  coverImage,
}: CaseStudyCardProps) {
  const ctaLabel = language === 'es' ? 'Ver caso' : 'View case';
  const hasBackdrop = Boolean(coverImage);

  return (
    <Link
      to={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-[var(--line-soft)] bg-[var(--glass-surface)] shadow-[0_20px_48px_rgba(8,15,30,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4387DF]/30 hover:shadow-[0_30px_64px_rgba(8,15,30,0.16)] focus:outline-none focus:ring-2 focus:ring-[#4387DF]/30"
    >
      <div className="relative min-h-[280px] overflow-hidden">
        {coverImage ? (
          <ImageWithFallback
            src={coverImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,43,122,0.18),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.94),rgba(8,15,30,0.94))]" />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,21,0.2),rgba(6,11,21,0.5)_48%,rgba(6,11,21,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,135,223,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,43,122,0.14),transparent_24%)] opacity-80" />

        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {industry ? (
                <span className="rounded-full border border-white/14 bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/88 backdrop-blur-md">
                  {industry}
                </span>
              ) : null}
              {region ? (
                <span className="rounded-full border border-white/14 bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/88 backdrop-blur-md">
                  {region}
                </span>
              ) : null}
              {solutionType ? (
                <span className="rounded-full border border-white/14 bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/88 backdrop-blur-md">
                  {solutionType}
                </span>
              ) : null}
              {badge ? (
                <span className="rounded-full border border-white/14 bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/88 backdrop-blur-md">
                  {badge}
                </span>
              ) : null}
              {placeholder ? (
                <span className="rounded-full border border-fuchsia-300/24 bg-fuchsia-500/18 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md">
                  {language === 'es' ? 'Prueba' : 'Placeholder'}
                </span>
              ) : null}
            </div>

            {logoSrc ? (
              <div className="flex h-14 min-w-[5rem] items-center justify-center rounded-2xl border border-white/14 bg-white/88 px-3 shadow-[0_16px_32px_rgba(8,15,30,0.18)] backdrop-blur-md">
                <img src={logoSrc} alt={title} className="max-h-8 w-auto object-contain" loading="lazy" />
              </div>
            ) : null}
          </div>

          <div className="max-w-[32rem]">
            <h3 className="text-[1.7rem] font-light leading-[0.96] tracking-[-0.04em] text-white sm:text-[1.9rem]">
              {title}
            </h3>
            <p className="mt-3 max-w-[34rem] text-sm leading-6 text-white/84">
              {summary}
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col bg-[var(--glass-surface)] p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,135,223,0.08),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,43,122,0.06),transparent_26%)] opacity-70" />
        <div className="relative flex h-full flex-col">
          {results.length > 0 ? (
            <div className="space-y-2.5">
              {results.slice(0, 3).map((result) => (
                <div key={result} className="flex items-start gap-2 text-sm text-[var(--text-soft)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                  <span>{result}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`rounded-[18px] border border-dashed border-[var(--line-soft)] px-4 py-4 text-sm leading-6 ${hasBackdrop ? 'text-[var(--text-soft)]' : 'text-[var(--text-soft)]'}`}>
              {language === 'es'
                ? 'Caso orientado a resultados, adopción y evolución de capacidades de datos.'
                : 'Case focused on outcomes, adoption, and evolution of data capabilities.'}
            </div>
          )}

          {technologyTags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {technologyTags.slice(0, 4).map((tag) => (
                <span
                  key={`${title}-${tag}`}
                  className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-1.5 text-xs font-medium text-[var(--text-soft)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#4387DF]">
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
