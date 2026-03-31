import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import { LinkCTA } from '../../../shared/components/LinkCTA';
import { TextLink } from '../../../shared/components/TextLink';
import { motion } from 'motion/react';
import type { HomeSection } from '../../../shared/types';

interface MaturityJourneySectionProps {
  section: HomeSection;
}

// Fluid organic shapes that fill the container - like water/wind
const OrganicShape1 = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgba(255, 182, 217, 0.6)', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: 'rgba(255, 166, 232, 0.5)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgba(255, 229, 245, 0.4)', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="blur1">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      </filter>
    </defs>
    {/* Flowing water-like blob */}
    <motion.path
      d="M 0 150 Q 100 100, 200 120 T 400 140 L 400 300 L 0 300 Z"
      fill="url(#grad1)"
      filter="url(#blur1)"
      animate={{
        d: [
          "M 0 150 Q 100 100, 200 120 T 400 140 L 400 300 L 0 300 Z",
          "M 0 130 Q 100 160, 200 140 T 400 120 L 400 300 L 0 300 Z",
          "M 0 140 Q 100 110, 200 130 T 400 150 L 400 300 L 0 300 Z",
          "M 0 150 Q 100 100, 200 120 T 400 140 L 400 300 L 0 300 Z",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.path
      d="M 0 180 Q 100 140, 200 160 T 400 170 L 400 300 L 0 300 Z"
      fill="url(#grad1)"
      filter="url(#blur1)"
      opacity="0.6"
      animate={{
        d: [
          "M 0 180 Q 100 140, 200 160 T 400 170 L 400 300 L 0 300 Z",
          "M 0 160 Q 100 190, 200 170 T 400 150 L 400 300 L 0 300 Z",
          "M 0 170 Q 100 150, 200 165 T 400 180 L 400 300 L 0 300 Z",
          "M 0 180 Q 100 140, 200 160 T 400 170 L 400 300 L 0 300 Z",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    />
  </svg>
);

const OrganicShape2 = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgba(159, 168, 218, 0.6)', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: 'rgba(197, 202, 233, 0.5)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgba(232, 234, 246, 0.4)', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="blur2">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      </filter>
    </defs>
    {/* Wind-like flowing shapes */}
    <motion.ellipse
      cx="200"
      cy="150"
      rx="180"
      ry="90"
      fill="url(#grad2)"
      filter="url(#blur2)"
      animate={{
        rx: [180, 220, 190, 180],
        ry: [90, 70, 100, 90],
        cx: [200, 180, 220, 200],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.ellipse
      cx="200"
      cy="180"
      rx="160"
      ry="80"
      fill="url(#grad2)"
      filter="url(#blur2)"
      opacity="0.7"
      animate={{
        rx: [160, 140, 170, 160],
        ry: [80, 100, 75, 80],
        cx: [200, 220, 180, 200],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
  </svg>
);

const OrganicShape3 = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgba(129, 199, 132, 0.6)', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: 'rgba(165, 214, 167, 0.5)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgba(200, 230, 201, 0.4)', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="blur3">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      </filter>
    </defs>
    {/* Liquid-like flowing blob */}
    <motion.path
      d="M 0 120 Q 80 80, 160 100 T 320 110 Q 360 120, 400 140 L 400 300 L 0 300 Z"
      fill="url(#grad3)"
      filter="url(#blur3)"
      animate={{
        d: [
          "M 0 120 Q 80 80, 160 100 T 320 110 Q 360 120, 400 140 L 400 300 L 0 300 Z",
          "M 0 140 Q 80 110, 160 90 T 320 130 Q 360 100, 400 120 L 400 300 L 0 300 Z",
          "M 0 110 Q 80 130, 160 110 T 320 100 Q 360 140, 400 130 L 400 300 L 0 300 Z",
          "M 0 120 Q 80 80, 160 100 T 320 110 Q 360 120, 400 140 L 400 300 L 0 300 Z",
        ],
      }}
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.path
      d="M -50 160 Q 100 130, 200 150 T 400 160 L 400 300 L -50 300 Z"
      fill="url(#grad3)"
      filter="url(#blur3)"
      opacity="0.5"
      animate={{
        d: [
          "M -50 160 Q 100 130, 200 150 T 400 160 L 400 300 L -50 300 Z",
          "M -50 150 Q 100 170, 200 140 T 400 170 L 400 300 L -50 300 Z",
          "M -50 170 Q 100 140, 200 160 T 400 150 L 400 300 L -50 300 Z",
          "M -50 160 Q 100 130, 200 150 T 400 160 L 400 300 L -50 300 Z",
        ],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    />
  </svg>
);

const OrganicShape4 = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#81D4FA', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#4FC3F7', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#B3E5FC', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow4">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Multiple floating spheres */}
    <motion.circle
      cx="45"
      cy="45"
      r="18"
      fill="url(#grad4)"
      filter="url(#glow4)"
      animate={{
        cx: [45, 47, 45],
        cy: [45, 43, 45],
        r: [18, 20, 18],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.circle
      cx="75"
      cy="55"
      r="22"
      fill="url(#grad4)"
      filter="url(#glow4)"
      opacity="0.8"
      animate={{
        cx: [75, 73, 75],
        cy: [55, 57, 55],
        r: [22, 24, 22],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    />
    <motion.circle
      cx="58"
      cy="70"
      r="15"
      fill="url(#grad4)"
      filter="url(#glow4)"
      opacity="0.6"
      animate={{
        cx: [58, 60, 58],
        cy: [70, 68, 70],
        r: [15, 17, 15],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    {/* Highlights */}
    <circle cx="40" cy="40" r="5" fill="rgba(255, 255, 255, 0.7)" />
    <circle cx="70" cy="50" r="6" fill="rgba(255, 255, 255, 0.6)" />
  </svg>
);

export function MaturityJourneySection({ section }: MaturityJourneySectionProps) {
  // Default levels if not configured
  const levels = section.config?.levels || [
    {
      title: 'Data Foundations',
      description: 'Establish robust data infrastructure and governance',
      icon: 'database',
    },
    {
      title: 'Advanced Analytics',
      description: 'Transform data into actionable insights',
      icon: 'trending',
    },
    {
      title: 'AI-Driven Organization',
      description: 'Scale intelligence across your enterprise',
      icon: 'sparkles',
    },
  ];

  const getOrganicShape = (index: number) => {
    const shapes = [OrganicShape1, OrganicShape2, OrganicShape3, OrganicShape4];
    const ShapeComponent = shapes[index % shapes.length];
    return ShapeComponent;
  };

  return (
    <Section background="gray" padding="xl">
      <Container>
        {section.title && (
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-light text-gray-900 md:text-4xl">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-base text-gray-600 max-w-3xl mx-auto font-light">
                {section.subtitle}
              </p>
            )}
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {levels.map((level: any, index: number) => {
            // Gradient backgrounds for each card
            const gradients = [
              'bg-gradient-to-br from-pink-200/80 via-orange-200/60 to-pink-100/80', // Fundamentos
              'bg-gradient-to-br from-blue-200/80 via-purple-200/60 to-indigo-100/80', // Analítica
              'bg-gradient-to-br from-green-200/80 via-emerald-200/60 to-lime-100/80', // Organización
            ];
            
            return (
              <motion.div 
                key={index}
                className="theme-glass-surface relative rounded-3xl transition-all duration-300 group hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                {/* Organic shape container with gradient background - overflow visible */}
                <div className={`relative h-28 flex items-center justify-center overflow-visible rounded-t-3xl ${gradients[index]}`}>
                  <div className="absolute inset-0 w-full h-full">
                    {(() => {
                      const ShapeComponent = getOrganicShape(index);
                      return <ShapeComponent />;
                    })()}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-light text-[var(--glass-text-primary)]">
                    {level.title}
                  </h3>
                  <p className="mb-4 text-sm font-light leading-relaxed text-[var(--glass-text-secondary)]">
                    {level.description}
                  </p>

                  {/* Optional CTA - Using TextLink component for consistency */}
                  {level.ctaLabel && level.ctaHref && (
                    <TextLink to={level.ctaHref} className="text-sm font-light">
                      {level.ctaLabel}
                    </TextLink>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Optional section CTA */}
        {section.ctaLabel && section.ctaHref && (
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <LinkCTA to={section.ctaHref} variant="primary" size="lg">
              {section.ctaLabel}
            </LinkCTA>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
