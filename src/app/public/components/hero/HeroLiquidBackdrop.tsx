import { useTheme } from '../../../shared/contexts/ThemeContext';
import { FluidWavesBackground } from '../../../shared/components/backgrounds/FluidWavesBackground';

export function HeroLiquidBackdrop() {
  const { isDark } = useTheme();
  const finalWash = isDark
    ? 'linear-gradient(180deg, rgba(8,10,24,0.08) 0%, rgba(3,4,12,0.28) 42%, rgba(2,3,10,0.58) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 26%, rgba(228,236,255,0.18) 54%, rgba(212,224,255,0.36) 100%)';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FluidWavesBackground
        intensity={1.08}
        speed={0.66}
        interactive={false}
        colorScheme={isDark ? 'dark' : 'light'}
      />
      <div
        className="absolute inset-0"
        style={{
          background: finalWash,
        }}
      />
    </div>
  );
}
