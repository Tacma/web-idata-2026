import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../../shared/contexts/ThemeContext';

export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const blobs = [
    {
      id: 1,
      color: isDark ? 'from-blue-500/20 to-cyan-400/16' : 'from-blue-300/40 to-purple-300/40',
      size: 'w-[340px] h-[340px] md:w-[460px] md:h-[460px]',
      initialX: '-10%',
      initialY: '10%',
      duration: 30,
    },
    {
      id: 2,
      color: isDark ? 'from-fuchsia-500/18 to-purple-400/14' : 'from-purple-300/40 to-pink-300/40',
      size: 'w-[320px] h-[320px] md:w-[420px] md:h-[420px]',
      initialX: '70%',
      initialY: '20%',
      duration: 34,
    },
    {
      id: 3,
      color: isDark ? 'from-sky-500/18 to-indigo-500/14' : 'from-pink-300/40 to-blue-300/40',
      size: 'w-[300px] h-[300px] md:w-[440px] md:h-[440px]',
      initialX: '40%',
      initialY: '60%',
      duration: 32,
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--page-bg)] transition-colors duration-300">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute ${blob.size} rounded-full bg-gradient-to-br ${blob.color}`}
          style={{
            filter: isDark ? 'blur(72px)' : 'blur(40px)',
            left: blob.initialX,
            top: blob.initialY,
            willChange: shouldReduceMotion ? 'auto' : 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
          animate={shouldReduceMotion ? undefined : {
            x: [0, 60, -30, 40, 0],
            y: [0, -45, 35, -25, 0],
            scale: [1, 1.08, 0.96, 1.04, 1],
          }}
          transition={shouldReduceMotion ? undefined : {
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}
