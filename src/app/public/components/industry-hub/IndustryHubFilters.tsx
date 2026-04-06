import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../../components/ui/utils';
import type { HubPartner, HubTag } from '../../../shared/utils/industryCaseHub';
import type { Language } from '../../../shared/types';

interface IndustryOption {
  id: string;
  name: string;
}

interface IndustryHubFiltersProps {
  language: Language;
  industries: IndustryOption[];
  tags: HubTag[];
  partners: HubPartner[];
  selectedIndustryIds: string[];
  selectedTagIds: string[];
  selectedPartnerIds: string[];
  selectedCaseType: 'all' | 'real' | 'placeholder';
  onToggleIndustry: (id: string) => void;
  onToggleTag: (id: string) => void;
  onTogglePartner: (id: string) => void;
  onClearIndustries: () => void;
  onClearTags: () => void;
  onClearPartners: () => void;
  onChangeCaseType: (value: 'all' | 'real' | 'placeholder') => void;
  onReset: () => void;
}

export function IndustryHubFilters({
  language,
  industries,
  tags,
  partners,
  selectedIndustryIds,
  selectedTagIds,
  selectedPartnerIds,
  selectedCaseType,
  onToggleIndustry,
  onToggleTag,
  onTogglePartner,
  onClearIndustries,
  onClearTags,
  onClearPartners,
  onChangeCaseType,
  onReset,
}: IndustryHubFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsExpanded(event.matches);
    };

    setIsExpanded(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const allIndustryLabel = language === 'es' ? 'Todas' : 'All';
  const allTagLabel = language === 'es' ? 'Todas las tecnologías' : 'All technologies';
  const allPartnerLabel = language === 'es' ? 'Todos los partners' : 'All partners';

  return (
    <div className="overflow-hidden rounded-[30px] border border-[var(--line-soft)] bg-[var(--header-bg)] px-5 py-5 shadow-[0_22px_55px_rgba(8,15,30,0.12)] backdrop-blur-xl sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-1)]">
            <SlidersHorizontal className="h-4 w-4 text-[var(--text-soft)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-strong)]">
              {language === 'es' ? 'Filtra casos e industrias' : 'Filter cases and industries'}
            </p>
            <p className="text-xs text-[var(--text-soft)]">
              {language === 'es'
                ? 'Explora sectores, tecnologías y partners visibles en los casos publicados.'
                : 'Explore sectors, technologies, and partners visible across published case studies.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-[var(--line-soft)] px-4 py-2 text-sm font-medium text-[var(--text-soft)] transition-colors duration-200 hover:border-[#4387DF]/25 hover:text-[var(--text-strong)]"
          >
            {language === 'es' ? 'Limpiar filtros' : 'Clear filters'}
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--surface-1)] px-4 py-2 text-sm font-medium text-[var(--text-strong)] transition-colors duration-200 hover:border-[#4387DF]/25"
          >
            <span>{isExpanded ? (language === 'es' ? 'Ocultar' : 'Hide') : (language === 'es' ? 'Mostrar' : 'Show')}</span>
            <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180')} />
          </button>
        </div>
      </div>

      <div className={cn('grid transition-[grid-template-rows,margin-top] duration-300 ease-out', isExpanded ? 'mt-5 grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="min-h-0 overflow-hidden">
          <div className="max-h-[min(62vh,36rem)] space-y-5 overflow-y-auto pr-1 sm:pr-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">
                {language === 'es' ? 'Industria' : 'Industry'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onClearIndustries}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                    selectedIndustryIds.length === 0
                      ? 'bg-[var(--text-strong)] text-[var(--surface-0)]'
                      : 'border border-[var(--line-soft)] bg-[var(--surface-1)] text-[var(--text-soft)] hover:border-[#4387DF]/25'
                  )}
                >
                  {allIndustryLabel}
                </button>
                {industries.map((industry) => {
                  const selected = selectedIndustryIds.includes(industry.id);
                  return (
                    <button
                      key={industry.id}
                      type="button"
                      onClick={() => onToggleIndustry(industry.id)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                        selected
                          ? 'bg-[#4387DF] text-white shadow-[0_14px_28px_rgba(67,135,223,0.24)]'
                          : 'border border-[var(--line-soft)] bg-[var(--surface-1)] text-[var(--text-soft)] hover:border-[#4387DF]/25 hover:text-[var(--text-strong)]'
                      )}
                    >
                      {industry.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {partners.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">
                  {language === 'es' ? 'Partner visible' : 'Visible partner'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onClearPartners}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                      selectedPartnerIds.length === 0
                        ? 'bg-[var(--text-strong)] text-[var(--surface-0)]'
                        : 'border border-[var(--line-soft)] bg-[var(--surface-1)] text-[var(--text-soft)] hover:border-[#7C3AED]/25'
                    )}
                  >
                    {allPartnerLabel}
                  </button>
                  {partners.map((partner) => {
                    const selected = selectedPartnerIds.includes(partner.id);
                    return (
                      <button
                        key={partner.id}
                        type="button"
                        onClick={() => onTogglePartner(partner.id)}
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                          selected
                            ? 'bg-[#7C3AED] text-white shadow-[0_14px_28px_rgba(124,58,237,0.22)]'
                            : 'border border-[var(--line-soft)] bg-[var(--surface-1)] text-[var(--text-soft)] hover:border-[#7C3AED]/25 hover:text-[var(--text-strong)]'
                        )}
                      >
                        {partner.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">
                {language === 'es' ? 'Tecnologías / soluciones' : 'Technologies / solutions'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onClearTags}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                    selectedTagIds.length === 0
                      ? 'bg-[var(--text-strong)] text-[var(--surface-0)]'
                      : 'border border-[var(--line-soft)] bg-[var(--surface-1)] text-[var(--text-soft)] hover:border-[#FF2B7A]/25'
                  )}
                >
                  {allTagLabel}
                </button>
                {tags.map((tag) => {
                  const selected = selectedTagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => onToggleTag(tag.id)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                        selected
                          ? 'bg-[#FF2B7A] text-white shadow-[0_14px_28px_rgba(255,43,122,0.22)]'
                          : 'border border-[var(--line-soft)] bg-[var(--surface-1)] text-[var(--text-soft)] hover:border-[#FF2B7A]/25 hover:text-[var(--text-strong)]'
                      )}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">
                {language === 'es' ? 'Tipo de caso' : 'Case type'}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: language === 'es' ? 'Todos' : 'All' },
                  { id: 'real', label: language === 'es' ? 'Reales' : 'Real' },
                  { id: 'placeholder', label: language === 'es' ? 'Prueba' : 'Placeholder' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChangeCaseType(option.id as 'all' | 'real' | 'placeholder')}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                      selectedCaseType === option.id
                        ? 'bg-[var(--text-strong)] text-[var(--surface-0)]'
                        : 'border border-[var(--line-soft)] bg-[var(--surface-1)] text-[var(--text-soft)] hover:border-[#4387DF]/25'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
