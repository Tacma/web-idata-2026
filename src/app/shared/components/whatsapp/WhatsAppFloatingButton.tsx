import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { useIsMobile } from '../../../components/ui/use-mobile';
import { useLanguage } from '../../contexts/LanguageContext';
import { useContactSettings } from '../../hooks/useContactSettings';
import { defaultContactSettings } from '../../services/contactSettings';
import { buildWhatsAppRegionUrl, getActiveWhatsAppRegions } from '../../utils/whatsapp';
import { WhatsAppBrandIcon } from './WhatsAppBrandIcon';
import { WhatsAppRegionSelector } from './WhatsAppRegionSelector';

export function WhatsAppFloatingButton() {
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const { settings } = useContactSettings();
  const [open, setOpen] = useState(false);
  const desktopPanelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const whatsappSettings = settings.whatsapp;

  const activeRegions = useMemo(
    () => getActiveWhatsAppRegions(whatsappSettings),
    [whatsappSettings]
  );
  const availableRegions = activeRegions.length
    ? activeRegions
    : getActiveWhatsAppRegions(defaultContactSettings.whatsapp);

  if (!whatsappSettings.enabled || !whatsappSettings.floatingButtonEnabled) {
    return null;
  }

  const floatingLabel =
    language === 'es' ? whatsappSettings.floatingLabel_es : whatsappSettings.floatingLabel_en;

  const handleSelectRegion = (region: (typeof activeRegions)[number]) => {
    const url = buildWhatsAppRegionUrl(region, language);
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (availableRegions.length === 1 && whatsappSettings.directOpenWhenSingleRegion) {
      event.preventDefault();
      event.stopPropagation();
      handleSelectRegion(availableRegions[0]);
      return;
    }

    if (!isMobile) {
      setOpen((currentOpen) => !currentOpen);
    }
  };

  useEffect(() => {
    if (isMobile || !open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (
        target &&
        !desktopPanelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, open]);

  const buttonContent = (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleTriggerClick}
      aria-label={floatingLabel}
      className="group animate-whatsapp-float fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-[90] inline-flex h-20 w-20 items-center justify-center rounded-full bg-transparent text-[var(--text-strong)] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#25D366]/35 sm:right-5 sm:bottom-5 sm:h-24 sm:w-24"
    >
      <WhatsAppBrandIcon
        iconUrl={whatsappSettings.iconUrl}
        label={floatingLabel}
        className="h-[58px] w-[58px] object-contain drop-shadow-[0_18px_20px_rgba(8,15,30,0.18)] transition-transform duration-300 group-hover:scale-[1.04] sm:h-[66px] sm:w-[66px]"
      />
      {!whatsappSettings.iconUrl && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
          Chat
        </span>
      )}
      <span className="sr-only">{floatingLabel}</span>
    </button>
  );

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{buttonContent}</DialogTrigger>
        <DialogContent className="z-[100] max-w-[calc(100%-1.5rem)] rounded-[1.75rem] border-[var(--line-soft)] bg-[var(--surface-0)] p-0 shadow-[0_24px_80px_rgba(8,15,30,0.35)]">
          <div className="relative overflow-hidden rounded-[1.75rem] p-4 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,211,102,0.16),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(67,135,223,0.16),_transparent_34%)]" />
            <DialogTitle className="sr-only">{floatingLabel}</DialogTitle>
            <DialogDescription className="sr-only">
              {language === 'es' ? whatsappSettings.selectorSubtitle_es : whatsappSettings.selectorSubtitle_en}
            </DialogDescription>
            <div className="relative">
              <WhatsAppRegionSelector
                language={language}
                settings={whatsappSettings}
                regions={availableRegions}
                onSelectRegion={handleSelectRegion}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {buttonContent}
      {open && (
        <div
          ref={desktopPanelRef}
          className="fixed right-28 bottom-5 z-[90] w-[360px] rounded-3xl border border-[var(--line-soft)] bg-[var(--surface-0)] p-5 shadow-[0_24px_80px_rgba(8,15,30,0.24)]"
        >
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,_rgba(37,211,102,0.12),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(67,135,223,0.12),_transparent_34%)]" />
          <div className="relative">
            <WhatsAppRegionSelector
              language={language}
              settings={whatsappSettings}
              regions={availableRegions}
              onSelectRegion={handleSelectRegion}
            />
          </div>
        </div>
      )}
    </>
  );
}
