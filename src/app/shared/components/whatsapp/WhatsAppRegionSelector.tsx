import { ExternalLink } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { cn } from '../../../components/ui/utils';
import type { Language } from '../../types';
import type { WhatsAppRegionSettings, WhatsAppSettings } from '../../services/contactSettings';
import {
  getLocalizedRegionAvailability,
  getLocalizedRegionHelper,
  getLocalizedRegionName,
} from '../../utils/whatsapp';
import { WhatsAppBrandIcon } from './WhatsAppBrandIcon';

interface WhatsAppRegionSelectorProps {
  language: Language;
  settings: WhatsAppSettings;
  regions: WhatsAppRegionSettings[];
  variant?: 'floating' | 'contact';
  onSelectRegion: (region: WhatsAppRegionSettings) => void;
}

export function WhatsAppRegionSelector({
  language,
  settings,
  regions,
  variant = 'floating',
  onSelectRegion,
}: WhatsAppRegionSelectorProps) {
  const title =
    language === 'es' ? settings.selectorTitle_es : settings.selectorTitle_en;
  const subtitle =
    language === 'es' ? settings.selectorSubtitle_es : settings.selectorSubtitle_en;
  const regionCtaLabel =
    language === 'es' ? settings.regionCtaLabel_es : settings.regionCtaLabel_en;

  return (
    <div className={cn('space-y-4', variant === 'contact' && 'space-y-5')}>
      <div className={cn('space-y-2', variant === 'contact' ? 'text-left' : 'text-left')}>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--surface-1)] px-3 py-1 text-xs font-medium text-[var(--text-soft)]">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366]/12">
            <WhatsAppBrandIcon
              iconUrl={settings.iconUrl}
              label="WhatsApp"
              className="h-3.5 w-3.5 object-contain"
            />
          </div>
          WhatsApp
        </div>
        <h3 className={cn('font-medium text-[var(--text-strong)]', variant === 'contact' ? 'text-2xl' : 'text-lg')}>
          {title}
        </h3>
        <p className={cn('text-[var(--text-soft)]', variant === 'floating' ? 'text-[13px] leading-5' : 'text-sm leading-6')}>
          {subtitle}
        </p>
      </div>

      <div className={cn('space-y-3', variant === 'floating' && 'space-y-2')}>
        {regions.map((region) => {
          const regionName = getLocalizedRegionName(region, language);
          const helperText = getLocalizedRegionHelper(region, language);
          const availabilityText = getLocalizedRegionAvailability(region, language);

          return (
            <button
              key={region.id}
              type="button"
              onClick={() => onSelectRegion(region)}
              className={cn(
                'group w-full text-left transition-all duration-300',
                variant === 'floating' ? 'rounded-xl border px-3.5 py-3' : 'rounded-2xl border p-4',
                'border-[var(--line-soft)] bg-[var(--glass-surface)] hover:border-[#25D366]/35 hover:bg-[var(--surface-1)]',
                'focus:outline-none focus:ring-2 focus:ring-[#25D366]/35'
              )}
            >
              <div className={cn('min-w-0', variant === 'floating' ? 'space-y-1.5' : 'space-y-3')}>
                <div className={cn('flex min-w-0 items-start', variant === 'floating' ? 'justify-between gap-2.5' : 'flex-col gap-2')}>
                  <p className={cn('font-medium text-[var(--text-strong)]', variant === 'floating' ? 'text-[15px] leading-5' : 'text-base leading-5')}>
                    {regionName}
                  </p>
                  {availabilityText && (
                    <span className={cn(
                      'rounded-full bg-[#25D366]/10 font-medium text-[#25D366]',
                      variant === 'floating' ? 'shrink-0 px-2 py-1 text-[10px] leading-none' : 'px-2.5 py-1 text-[11px]'
                    )}>
                      {availabilityText}
                    </span>
                  )}
                </div>
                {helperText && (
                  <p className={cn(
                    'text-[var(--text-soft)]',
                    variant === 'floating'
                      ? 'max-w-none text-[12px] leading-4'
                      : 'max-w-[30ch] text-sm leading-7 sm:max-w-none sm:leading-6'
                  )}>
                    {helperText}
                  </p>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    'h-auto justify-start rounded-full px-0 font-medium text-[#25D366] hover:bg-transparent hover:text-[#128C7E]',
                    variant === 'floating' ? 'py-0 text-[12px]' : 'py-0 text-sm'
                  )}
                  tabIndex={-1}
                >
                  <span>{regionCtaLabel}</span>
                  <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
