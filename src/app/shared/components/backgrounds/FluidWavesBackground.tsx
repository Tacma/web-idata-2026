import { useEffect, useRef } from 'react';
import { useTheme, type Theme } from '../../contexts/ThemeContext';

type FluidWavesColorScheme = 'auto' | Theme;

interface FluidWavesBackgroundProps {
  className?: string;
  intensity?: number;
  speed?: number;
  interactive?: boolean;
  colorScheme?: FluidWavesColorScheme;
}

export function FluidWavesBackground({
  className = '',
  colorScheme = 'auto',
}: FluidWavesBackgroundProps) {
  const { theme } = useTheme();
  const resolvedTheme = colorScheme === 'auto' ? theme : colorScheme;
  const isDark = resolvedTheme === 'dark';
  const videoSrc = isDark
    ? '/assets/video/hero/home-fluid-shape-720p.mov'
    : '/assets/video/hero/home-iridescent-light.mp4';
  const videoFitClass = isDark
    ? 'object-cover object-[72%_50%] sm:object-contain sm:object-center'
    : 'object-cover object-[66%_50%] sm:object-cover sm:object-center';
  const videoMotionClass = isDark
    ? 'scale-[1.08] translate-x-[4%] sm:scale-[0.9] sm:-translate-x-[3%]'
    : 'scale-[1.08] translate-x-[4%] sm:scale-[0.96] sm:translate-x-[0%]';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) {
      return;
    }

    const transitionWindow = 1.85;
    const holdWindow = 0.18;
    const maxBlur = isDark ? 24 : 20;
    const minOpacity = 0;
    const baseScale = isDark ? 0.985 : 1;
    const clearFadeFrame = () => {
      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current);
        fadeFrameRef.current = null;
      }
    };

    const updateOpacity = () => {
      if (!video.duration) {
        fadeFrameRef.current = requestAnimationFrame(updateOpacity);
        return;
      }

      const fadeInProgress =
        video.currentTime <= holdWindow
          ? 0
          : Math.min((video.currentTime - holdWindow) / transitionWindow, 1);
      const fadeOutProgress =
        video.duration - video.currentTime <= holdWindow
          ? 0
          : Math.min((video.duration - video.currentTime - holdWindow) / transitionWindow, 1);
      const edgeProgress = Math.max(0, Math.min(fadeInProgress, fadeOutProgress));
      const easedProgress = edgeProgress * edgeProgress * (3 - 2 * edgeProgress);
      const blurValue = maxBlur * (1 - easedProgress);
      const opacityValue = minOpacity + (1 - minOpacity) * easedProgress;
      const scaleValue = baseScale + (1 - easedProgress) * 0.022;

      video.style.opacity = opacityValue.toFixed(3);
      video.style.filter = `blur(${blurValue.toFixed(2)}px) saturate(${(0.94 + easedProgress * 0.12).toFixed(3)})`;
      video.style.transform = `translateZ(0) scale(${scaleValue.toFixed(4)})`;
      fadeFrameRef.current = requestAnimationFrame(updateOpacity);
    };

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      video.style.opacity = '0';
      video.style.filter = `blur(${maxBlur}px) saturate(0.94)`;
      video.style.transform = `translateZ(0) scale(${(baseScale + 0.022).toFixed(4)})`;
      video.playbackRate = 1;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
      clearFadeFrame();
      fadeFrameRef.current = requestAnimationFrame(updateOpacity);
    };

    video.loop = true;
    video.muted = true;
    video.currentTime = 0;
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleLoadedMetadata);

    return () => {
      clearFadeFrame();
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleLoadedMetadata);
      video.pause();
    };
  }, [isDark, videoSrc]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? '#000000'
            : 'radial-gradient(circle at 18% 30%, rgba(244, 215, 247, 0.34) 0%, transparent 34%), radial-gradient(circle at 74% 28%, rgba(255, 214, 238, 0.32) 0%, transparent 28%), linear-gradient(90deg, #fbf4fb 0%, #f8eef8 52%, #f7eef9 100%)',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-end overflow-hidden">
        {videoSrc ? (
          <div className="relative h-[118%] w-[132%] sm:h-[104%] sm:w-[88%] md:h-[112%] md:w-[78%]">
            <video
              key={videoSrc}
              ref={videoRef}
              className={`absolute inset-0 h-full w-full will-change-[opacity,filter,transform] ${videoFitClass} ${videoMotionClass}`}
              autoPlay
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
              src={videoSrc}
            />

            <div
              className="absolute inset-0"
              style={{
                background: isDark
                  ? 'radial-gradient(circle at 60% 48%, rgba(255,242,252,0.05) 0%, rgba(255,255,255,0.01) 22%, rgba(0,0,0,0.08) 54%, rgba(0,0,0,0.72) 100%), linear-gradient(180deg, rgba(24,0,18,0.18) 0%, rgba(0,0,0,0.02) 30%, rgba(24,0,18,0.18) 100%)'
                  : 'radial-gradient(circle at 62% 42%, rgba(255,255,255,0.14) 0%, rgba(255,245,251,0.08) 24%, rgba(246,230,244,0.08) 58%, rgba(247,237,247,0.16) 100%), linear-gradient(180deg, rgba(247,236,246,0.12) 0%, rgba(247,236,246,0.02) 30%, rgba(248,235,246,0.16) 100%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        ) : null}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.78) 34%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.52) 100%)'
            : 'linear-gradient(90deg, rgba(251,244,251,0.94) 0%, rgba(248,238,248,0.82) 34%, rgba(248,238,248,0.22) 60%, rgba(247,239,249,0.26) 100%)',
        }}
      />
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 84% 48%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0.76) 100%), linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.18) 54%, rgba(0,0,0,0.66) 100%)'
            : 'radial-gradient(circle at 82% 48%, rgba(255,255,255,0) 0%, rgba(248,238,248,0.16) 58%, rgba(247,239,249,0.62) 100%), linear-gradient(90deg, rgba(251,244,251,0.88) 0%, rgba(248,238,248,0.16) 54%, rgba(247,239,249,0.54) 100%)',
        }}
      />
    </div>
  );
}
