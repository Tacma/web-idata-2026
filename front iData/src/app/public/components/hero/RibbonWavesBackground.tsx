import { motion } from 'motion/react';

/**
 * Ribbon-style 3D waves background inspired by Asklepios
 * Creates flowing horizontal ribbons with soft blue gradient
 */
export function RibbonWavesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clean white base */}
      <div className="absolute inset-0 bg-white" />

      {/* SVG Ribbon Waves */}
      <svg
        className="absolute top-0 left-0 w-full h-[38%]"
        viewBox="0 0 1440 420"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Soft blue gradient for ribbons - Asklepios inspired */}
          <linearGradient id="ribbonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8D8F5" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#A0C8EC" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#D0E4F9" stopOpacity="0.55" />
          </linearGradient>

          <linearGradient id="ribbonGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8E0FA" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#AED4F2" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#DCF0FF" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="ribbonGradient3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#A4D0F4" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#BCE0F8" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#D4ECFC" stopOpacity="0.45" />
          </linearGradient>

          {/* Subtle blur for soft edges */}
          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* First ribbon wave - top layer */}
        <motion.path
          d="M0,95 Q360,45 720,95 T1440,95 L1440,0 L0,0 Z"
          fill="url(#ribbonGradient1)"
          filter="url(#softBlur)"
          animate={{
            d: [
              "M0,95 Q360,45 720,95 T1440,95 L1440,0 L0,0 Z",
              "M0,110 Q360,60 720,110 T1440,110 L1440,0 L0,0 Z",
              "M0,95 Q360,45 720,95 T1440,95 L1440,0 L0,0 Z",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Second ribbon wave - middle layer */}
        <motion.path
          d="M0,175 Q360,125 720,175 T1440,175 L1440,55 L0,55 Z"
          fill="url(#ribbonGradient2)"
          filter="url(#softBlur)"
          animate={{
            d: [
              "M0,175 Q360,125 720,175 T1440,175 L1440,55 L0,55 Z",
              "M0,155 Q360,105 720,155 T1440,155 L1440,55 L0,55 Z",
              "M0,175 Q360,125 720,175 T1440,175 L1440,55 L0,55 Z",
            ],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
        />

        {/* Third ribbon wave - bottom layer */}
        <motion.path
          d="M0,255 Q360,205 720,255 T1440,255 L1440,115 L0,115 Z"
          fill="url(#ribbonGradient3)"
          filter="url(#softBlur)"
          animate={{
            d: [
              "M0,255 Q360,205 720,255 T1440,255 L1440,115 L0,115 Z",
              "M0,235 Q360,185 720,235 T1440,235 L1440,115 L0,115 Z",
              "M0,255 Q360,205 720,255 T1440,255 L1440,115 L0,115 Z",
            ],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        />

        {/* Fourth ribbon wave - deepest layer with fade */}
        <motion.path
          d="M0,335 Q360,285 720,335 T1440,335 L1440,175 L0,175 Z"
          fill="url(#ribbonGradient1)"
          opacity="0.35"
          filter="url(#softBlur)"
          animate={{
            d: [
              "M0,335 Q360,285 720,335 T1440,335 L1440,175 L0,175 Z",
              "M0,315 Q360,265 720,315 T1440,315 L1440,175 L0,175 Z",
              "M0,335 Q360,285 720,335 T1440,335 L1440,175 L0,175 Z",
            ],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8,
          }}
        />
      </svg>

      {/* Additional CSS gradient overlay for depth */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[38%]"
        style={{
          background: 'linear-gradient(135deg, rgba(184, 212, 241, 0.35) 0%, rgba(160, 196, 232, 0.45) 50%, rgba(212, 228, 247, 0.25) 100%)',
          mixBlendMode: 'overlay',
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft white fade at bottom of waves */}
      <div
        className="absolute top-[30%] left-0 w-full h-[18%]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, white 100%)',
        }}
      />
    </div>
  );
}
