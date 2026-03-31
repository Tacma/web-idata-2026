import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: string;
  subtitle: string;
  backgroundColor: string;
  backgroundImage?: string;
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

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[330px] sm:h-[368px] lg:h-[400px] overflow-hidden group z-10 bg-[#03050E]">
      
      {/* Slides Container with wipe animation */}
      <div
        className="relative w-full h-full backdrop-blur-sm"
        style={{
          background:
            'radial-gradient(circle at 18% 22%, rgba(32,58,168,0.26) 0%, rgba(5,8,20,0.96) 42%, rgba(1,2,8,1) 100%)',
        }}
      >
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
            style={{ backgroundColor: 'transparent' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(170,187,255,0.16),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(44,96,255,0.16),_transparent_26%)]" />

            {currentSlide.backgroundImage && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              >
                <img
                  src={currentSlide.backgroundImage}
                  alt="Hero banner"
                  className="w-full h-full object-cover opacity-58 mix-blend-screen"
                />
              </motion.div>
            )}

            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(112deg, rgba(1, 2, 8, 0.94) 0%, rgba(5, 9, 22, 0.82) 52%, rgba(9, 14, 28, 0.46) 100%)',
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(104deg, rgba(0,0,0,0) 18%, rgba(76,104,255,0.18) 34%, rgba(255,255,255,0.1) 43%, rgba(0,0,0,0) 55%)',
              }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex h-full items-center px-6 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full">
              <motion.p
                className="max-w-2xl text-white font-bold leading-[1.08] tracking-[-0.03em] drop-shadow-[0_8px_24px_rgba(0,0,0,0.32)]"
                style={{
                  fontSize: 'clamp(1.45rem, 3.4vw, 3rem)',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45,
                  duration: 0.9,
                  ease: [0.65, 0, 0.35, 1]
                }}
              >
                {currentSlide.subtitle}
              </motion.p>
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

    </div>
  );
}
