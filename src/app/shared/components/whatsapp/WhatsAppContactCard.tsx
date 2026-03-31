import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useContactSettings } from '../../hooks/useContactSettings';
import { buildWhatsAppRegionUrl, getActiveWhatsAppRegions } from '../../utils/whatsapp';
import { WhatsAppBrandIcon } from './WhatsAppBrandIcon';
import { WhatsAppRegionSelector } from './WhatsAppRegionSelector';

export function WhatsAppContactCard() {
  const { language } = useLanguage();
  const { settings } = useContactSettings();
  const whatsappSettings = settings.whatsapp;
  const activeRegions = getActiveWhatsAppRegions(whatsappSettings);

  if (!whatsappSettings.enabled || activeRegions.length === 0) {
    return null;
  }

  const title =
    language === 'es' ? whatsappSettings.contactCardTitle_es : whatsappSettings.contactCardTitle_en;
  const subtitle =
    language === 'es'
      ? whatsappSettings.contactCardSubtitle_es
      : whatsappSettings.contactCardSubtitle_en;

  return (
    <div className="theme-glass-panel relative overflow-hidden rounded-[28px] p-6 sm:p-7">
      <div className="theme-glass-panel-overlay absolute inset-0 rounded-[28px]" />
      <div className="relative space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-1)]">
            <WhatsAppBrandIcon
              iconUrl={whatsappSettings.iconUrl}
              label={title}
              className="h-10 w-10 object-contain"
            />
            {!whatsappSettings.iconUrl && <MessageCircle className="h-6 w-6 text-[#25D366]" />}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-[var(--glass-text-primary)]">{title}</h3>
            <p className="text-sm leading-6 text-[var(--glass-text-secondary)]">{subtitle}</p>
          </div>
        </div>

        <WhatsAppRegionSelector
          language={language}
          settings={whatsappSettings}
          regions={activeRegions}
          variant="contact"
          onSelectRegion={(region) => {
            window.open(buildWhatsAppRegionUrl(region, language), '_blank', 'noopener,noreferrer');
          }}
        />
      </div>
    </div>
  );
}
