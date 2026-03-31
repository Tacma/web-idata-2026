import { IndustryCaseCard } from './IndustryCaseCard';
import type { HubIndustry } from '../../../shared/utils/industryCaseHub';
import type { Language } from '../../../shared/types';

interface IndustryHubSectionProps {
  industry: HubIndustry;
  language: Language;
}

const industryTones = [
  { border: '#7DD3FC', glow: 'rgba(14,165,233,0.14)', tint: 'rgba(14,165,233,0.08)' },
  { border: '#A78BFA', glow: 'rgba(124,58,237,0.14)', tint: 'rgba(124,58,237,0.08)' },
  { border: '#34D399', glow: 'rgba(16,185,129,0.14)', tint: 'rgba(16,185,129,0.08)' },
  { border: '#F472B6', glow: 'rgba(219,39,119,0.14)', tint: 'rgba(219,39,119,0.08)' },
  { border: '#FBBF24', glow: 'rgba(245,158,11,0.14)', tint: 'rgba(245,158,11,0.08)' },
] as const;

function getIndustryTone(seed: string) {
  const total = seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return industryTones[total % industryTones.length];
}

export function IndustryHubSection({ industry, language }: IndustryHubSectionProps) {
  const tone = getIndustryTone(industry.slug || industry.id);

  return (
    <section
      id={industry.slug}
      className="scroll-mt-36 overflow-hidden rounded-[34px] border border-[var(--line-soft)] bg-[var(--glass-surface)] p-6 shadow-[0_24px_56px_rgba(8,15,30,0.08)] sm:p-8"
      style={{
        boxShadow: `0 24px 56px rgba(8,15,30,0.08), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px ${tone.tint}`,
      }}
    >
      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <div
            className="overflow-hidden rounded-[24px] border p-5"
            style={{
              borderColor: `${tone.border}40`,
              background: `radial-gradient(circle at top left, ${tone.tint}, transparent 45%), var(--surface-1)`,
            }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--surface-0)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-soft)]">
                {language === 'es' ? 'Industria' : 'Industry'}
              </span>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
                style={{ backgroundColor: `${tone.border}14`, color: tone.border }}
              >
                {industry.cases.length} {language === 'es' ? 'casos' : 'cases'}
              </span>
            </div>

            <h2 className="mt-4 text-[clamp(1.6rem,2.4vw,2.4rem)] font-light leading-[0.96] tracking-[-0.05em] text-[var(--text-strong)]">
              {industry.name}
            </h2>

            {industry.solutionTags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {industry.solutionTags.slice(0, 4).map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-0)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-soft)]"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className="rounded-[24px] border p-4"
            style={{
              borderColor: `${tone.border}26`,
              background: `linear-gradient(180deg, ${tone.tint}, var(--surface-1))`,
            }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: tone.border }}>
              {language === 'es' ? 'Retos frecuentes' : 'Frequent challenges'}
            </p>
            <div className="space-y-2">
              {industry.challenges.slice(0, 3).map((challenge) => (
                <p key={challenge} className="text-sm leading-5 text-[var(--text-strong)]">
                  {challenge}
                </p>
              ))}
            </div>
          </div>

          <div
            className="rounded-[24px] border p-4"
            style={{
              borderColor: `${tone.border}26`,
              background: `linear-gradient(180deg, rgba(255,255,255,0.02), ${tone.tint})`,
            }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: tone.border }}>
              {language === 'es' ? 'Valor que activamos' : 'Value we activate'}
            </p>
            <div className="space-y-2">
              {industry.value.slice(0, 3).map((value) => (
                <p key={value} className="text-sm leading-5 text-[var(--text-strong)]">
                  {value}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {industry.cases.map((caseStudy) => (
            <IndustryCaseCard key={caseStudy.id} caseStudy={caseStudy} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}
