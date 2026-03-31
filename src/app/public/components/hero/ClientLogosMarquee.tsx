import { useMemo } from 'react';
import { useTheme } from '../../../shared/contexts/ThemeContext';
import {
  clientLogosMarqueeItems,
  type ClientLogoMarqueeItem,
} from './clientLogosMarqueeData';

function splitRows<T>(items: readonly T[]) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)] as const;
}

function normalizeLogoItems(items?: Array<string | ClientLogoMarqueeItem>) {
  if (!Array.isArray(items) || items.length === 0) {
    return clientLogosMarqueeItems;
  }

  return items
    .map((item) => {
      if (typeof item === 'string') {
        return {
          name: item.split('/').pop()?.replace(/\.svg$/i, '') || item,
          logo: item,
          scale: 1,
        } satisfies ClientLogoMarqueeItem;
      }

      if (!item?.logo) {
        return null;
      }

      return {
        name: item.name || item.logo.split('/').pop()?.replace(/\.svg$/i, '') || item.logo,
        logo: item.logo,
        scale: typeof item.scale === 'number' && Number.isFinite(item.scale) ? item.scale : 1,
      } satisfies ClientLogoMarqueeItem;
    })
    .filter((item): item is ClientLogoMarqueeItem => Boolean(item));
}

interface MarqueeRowProps {
  logos: readonly ClientLogoMarqueeItem[];
  direction: 'left' | 'right';
  toneClass: string;
  durationSeconds: number;
}

function MarqueeRow({ logos, direction, toneClass, durationSeconds }: MarqueeRowProps) {
  const duplicated = useMemo(() => [...logos, ...logos], [logos]);
  const animationClass = direction === 'right' ? 'animate-logo-marquee-right' : 'animate-logo-marquee-left';

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex min-w-max items-center gap-[30px] ${animationClass}`}
        style={{
          animationDuration: `${durationSeconds}s`,
          ['--logo-marquee-shift' as string]: 'calc(-50% - 15px)',
        }}
      >
        {duplicated.map((logo, index) => (
          <div
            key={`${logo.logo}-${index}`}
            className="flex shrink-0 items-center justify-center"
            style={{ height: 'clamp(36px, 3.9vw, 46px)' }}
          >
            <img
              src={encodeURI(logo.logo)}
              alt=""
              aria-hidden="true"
              className={`w-auto max-w-none object-contain ${toneClass}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{
                height:
                  logo.scale && logo.scale !== 1
                    ? `calc(clamp(21px, 2.4vw, 31px) * ${logo.scale})`
                    : 'clamp(21px, 2.4vw, 31px)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ClientLogosMarqueeProps {
  logos?: Array<string | ClientLogoMarqueeItem>;
  durationSeconds?: number;
}

export function ClientLogosMarquee({ logos, durationSeconds = 138 }: ClientLogosMarqueeProps) {
  const { isDark } = useTheme();
  const normalizedLogos = useMemo(() => normalizeLogoItems(logos), [logos]);
  const [topRow, bottomRow] = useMemo(() => splitRows(normalizedLogos), [normalizedLogos]);
  const toneClass = isDark
    ? 'grayscale invert brightness-[2.85] contrast-[0.2] opacity-[0.94] drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]'
    : 'grayscale brightness-[0.9] contrast-[0.78] opacity-[0.72] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]';
  const edgeFade = isDark ? 'var(--surface-0)' : 'var(--surface-0)';

  return (
    <div className="relative w-full overflow-hidden py-2 sm:py-3">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-28 lg:w-36 bg-gradient-to-r to-transparent"
        style={{ backgroundImage: `linear-gradient(to right, ${edgeFade}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-28 lg:w-36 bg-gradient-to-l to-transparent"
        style={{ backgroundImage: `linear-gradient(to left, ${edgeFade}, transparent)` }}
      />
      <div className="space-y-4 sm:space-y-5">
        <MarqueeRow logos={topRow} direction="right" toneClass={toneClass} durationSeconds={durationSeconds} />
        <MarqueeRow logos={bottomRow} direction="left" toneClass={toneClass} durationSeconds={durationSeconds} />
      </div>
    </div>
  );
}
