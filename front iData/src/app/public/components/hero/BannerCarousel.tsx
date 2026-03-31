import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hero images
import businessAnalytics from 'figma:asset/f13e93a5336016cfdd179a5fe66e5a9ffb036446.png';
import touchInterface from 'figma:asset/b86f9f238fc505b2a767d919802c20b3a7008a07.png';
import dataVisualization from 'figma:asset/31f47165e77b4832ecdf1b4454b8ab4690c8b1a8.png';

interface BannerSlide {
  id: string;
  number: string;
  title: string;
  bigText: string;
  subtitle: string;
  backgroundColor: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface BannerCarouselProps {
  slides: BannerSlide[];
  autoplayInterval?: number;
}

/**
 * Banner Carousel with horizontal wipe animation
 * Inspired by Daminko's liquid color transitions
 */
export function BannerCarousel({ 
  slides, 
  autoplayInterval = 5000 
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, autoplayInterval]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[420px] sm:h-[450px] lg:h-[480px] overflow-hidden group z-10">
      
      {/* Slides Container with wipe animation */}
      <div className="relative w-full h-full backdrop-blur-sm" style={{ backgroundColor: currentSlide.backgroundColor + '99' }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide.id}
            className="absolute inset-0 w-full h-full"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            exit={{ clipPath: 'inset(0 0% 0 100%)' }}
            transition={{
              duration: 1.2,
              ease: [0.65, 0, 0.35, 1], // Custom cubic-bezier for smooth wipe
            }}
            style={{
              backgroundColor: currentSlide.backgroundColor + '99',
            }}
          >
            {/* Background Image with Overlay - Banner 1 */}
            {currentIndex === 0 && (
              <>
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                >
                  <img
                    src={businessAnalytics}
                    alt="Business Analytics"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Dark Overlay for text readability */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.45) 60%, rgba(0, 0, 0, 0.3) 100%)',
                  }}
                />
              </>
            )}

            {/* Background Image with Overlay - Banner 2 */}
            {currentIndex === 1 && (
              <>
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                >
                  <img
                    src={touchInterface}
                    alt="Touch Interface Analytics"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Dark Overlay for text readability */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.45) 60%, rgba(0, 0, 0, 0.3) 100%)',
                  }}
                />
              </>
            )}

            {/* Background Image with Overlay - Banner 3 */}
            {currentIndex === 2 && (
              <>
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                >
                  <img
                    src={dataVisualization}
                    alt="Data Visualization"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Dark Overlay for text readability */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.45) 60%, rgba(0, 0, 0, 0.3) 100%)',
                  }}
                />
              </>
            )}

            {/* Content Container */}
            <div className="relative z-10 flex flex-col justify-center sm:justify-between h-full px-6 sm:px-8 lg:px-12 py-8 sm:pt-24 sm:pb-16 max-w-[1400px] mx-auto w-full">
              
              {/* Number - Top Left */}
              <motion.div
                className="text-white font-light mb-4 sm:mb-6"
                style={{
                  fontSize: 'clamp(36px, 6vw, 80px)',
                  lineHeight: 0.9,
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.65, 0, 0.35, 1]
                }}
              >
                {currentSlide.number}
              </motion.div>

              {/* Big Text Background - Massive typography */}
              <motion.div
                className="absolute inset-0 flex items-center overflow-hidden pointer-events-none"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.3,
                  duration: 1,
                  ease: [0.65, 0, 0.35, 1]
                }}
              >
                <div 
                  className="font-bold text-white whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(80px, 15vw, 200px)',
                    lineHeight: 0.9,
                    opacity: 0.15,
                    letterSpacing: '-0.02em',
                    paddingLeft: 'clamp(32px, 4vw, 64px)',
                  }}
                >
                  {currentSlide.bigText}
                </div>
              </motion.div>

              {/* Middle Content - Title and Subtitle */}
              <div className="relative flex-1 sm:flex-none flex flex-col justify-center">
                {/* Title */}
                <motion.h2
                  className="relative text-white font-light leading-tight mb-3 sm:mb-4 max-w-2xl"
                  style={{
                    fontSize: 'clamp(24px, 4vw, 48px)',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5,
                    duration: 0.8,
                    ease: [0.65, 0, 0.35, 1]
                  }}
                >
                  {currentSlide.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  className="relative text-white/90 text-sm sm:text-lg max-w-xl font-light leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.6,
                    duration: 0.8,
                    ease: [0.65, 0, 0.35, 1]
                  }}
                >
                  {currentSlide.subtitle}
                </motion.p>
              </div>

              {/* CTA Button - Desktop only, hidden on mobile */}
              {currentSlide.ctaLabel && (
                <motion.div
                  className="relative hidden sm:block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.7,
                    duration: 0.8,
                    ease: [0.65, 0, 0.35, 1]
                  }}
                >
                  <a
                    href={currentSlide.ctaHref}
                    className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
                  >
                    {currentSlide.ctaLabel}
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Desktop Only (on sides) */}
      <button
        onClick={goToPrev}
        className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/10 backdrop-blur-sm border border-white/10 items-center justify-center text-white/60 hover:text-white hover:bg-black/20 hover:border-white/20 hover:scale-110 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
      </button>

      <button
        onClick={goToNext}
        className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/10 backdrop-blur-sm border border-white/10 items-center justify-center text-white/60 hover:text-white hover:bg-black/20 hover:border-white/20 hover:scale-110 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
      </button>

      {/* Bottom Navigation - Mobile: Arrows + Dots + CTA centered, Desktop: Only Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20">
        {/* Mobile Layout: Stacked CTA + (Arrows + Dots) */}
        <div className="flex flex-col items-center gap-3 sm:hidden">
          {/* CTA Button for Mobile */}
          {currentSlide.ctaLabel && (
            <motion.div
              key={`mobile-cta-${currentSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.7,
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1]
              }}
            >
              <a
                href={currentSlide.ctaHref}
                className="inline-flex items-center px-8 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                {currentSlide.ctaLabel}
              </a>
            </motion.div>
          )}
          
          {/* Arrows + Dots for Mobile - Horizontal */}
          <div className="flex items-center gap-4">
            {/* Previous Arrow */}
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Desktop Layout: Only Dots */}
        <div className="hidden sm:flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}