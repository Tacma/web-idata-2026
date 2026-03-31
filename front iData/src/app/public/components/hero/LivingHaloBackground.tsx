import { motion } from 'motion/react';

export function LivingHaloBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clean white base */}
      <div className="absolute inset-0 bg-white" />

      {/* Giant organic blob wave - similar to Brix reference */}
      <svg
        className="absolute -top-[5%] -left-[10%] w-[140%] h-[110%]"
        viewBox="0 0 1400 1000"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Ultra-soft gooey filter for organic liquid effect */}
          <filter id="ultraGooey" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="15" result="softBlur" />
          </filter>

          {/* Subtle gradient for the giant blob - purple/lavender like Brix */}
          <radialGradient id="giantBlobGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#8B7FE8" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#A294F0" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#BDB4F8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4CDFC" stopOpacity="0.05" />
          </radialGradient>

          <radialGradient id="accentBlobGradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#7C6FD6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#9B8FE8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C4BAFF" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        <g filter="url(#ultraGooey)">
          {/* Main GIANT blob - diagonal wave from top-left to bottom-right */}
          <motion.ellipse
            cx="500"
            cy="250"
            rx="650"
            ry="450"
            fill="url(#giantBlobGradient)"
            animate={{
              cx: [500, 520, 480, 500],
              cy: [250, 270, 240, 250],
              rx: [650, 680, 630, 650],
              ry: [450, 480, 440, 450],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary large blob for depth */}
          <motion.ellipse
            cx="700"
            cy="350"
            rx="500"
            ry="400"
            fill="url(#accentBlobGradient)"
            animate={{
              cx: [700, 720, 680, 700],
              cy: [350, 370, 330, 350],
              rx: [500, 530, 490, 500],
              ry: [400, 420, 390, 400],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Tertiary blob - top accent */}
          <motion.ellipse
            cx="400"
            cy="150"
            rx="380"
            ry="320"
            fill="url(#giantBlobGradient)"
            animate={{
              cx: [400, 420, 390, 400],
              cy: [150, 170, 140, 150],
              rx: [380, 400, 370, 380],
              ry: [320, 340, 310, 320],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Additional small accent for organic feel */}
          <motion.circle
            cx="850"
            cy="200"
            r="200"
            fill="url(#accentBlobGradient)"
            animate={{
              cx: [850, 870, 840, 850],
              cy: [200, 220, 190, 200],
              r: [200, 220, 190, 200],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          {/* Bottom right accent */}
          <motion.ellipse
            cx="900"
            cy="500"
            rx="350"
            ry="280"
            fill="url(#giantBlobGradient)"
            animate={{
              cx: [900, 920, 890, 900],
              cy: [500, 520, 490, 500],
              rx: [350, 370, 340, 350],
              ry: [280, 300, 270, 280],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </g>
      </svg>

      {/* Additional CSS blur layers for ultra-soft effect like Brix */}
      <motion.div
        className="absolute -top-[10%] left-[0%] w-[1000px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 127, 232, 0.25) 0%, rgba(162, 148, 240, 0.15) 40%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[5%] left-[20%] w-[900px] h-[900px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124, 111, 214, 0.2) 0%, rgba(155, 143, 232, 0.12) 50%, transparent 75%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Subtle shimmer overlay */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(196, 186, 255, 0.15) 0%, rgba(212, 205, 252, 0.08) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
