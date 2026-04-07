import { motion } from 'motion/react';
import { cn } from '../../components/ui/utils';

interface InternalPageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  supportingText?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function InternalPageHero({
  title,
  description,
  eyebrow,
  supportingText,
  imageSrc,
  imageAlt = '',
  className,
}: InternalPageHeroProps) {
  return (
    <section className={cn('mt-20 px-6 pb-6 pt-6 sm:px-8 lg:px-12', className)}>
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950 shadow-[0_24px_70px_rgba(8,15,30,0.22)]">
          {imageSrc && (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.78)_0%,rgba(8,15,30,0.72)_46%,rgba(15,23,42,0.68)_100%)]" />
            </motion.div>
          )}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(194,72,255,0.16),transparent_32%)]" />

          <div className="relative flex min-h-[230px] items-center px-6 py-7 sm:min-h-[248px] sm:px-8 sm:py-8 lg:min-h-[264px] lg:px-10 lg:py-9">
            <div className="max-w-3xl">
              {eyebrow && (
                <motion.p
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300 sm:text-sm"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                >
                  {eyebrow}
                </motion.p>
              )}

              <motion.h1
                className="text-3xl font-light leading-[0.98] text-white sm:text-4xl lg:text-[3.15rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                {title}
              </motion.h1>

              <motion.p
                className="mt-3 max-w-3xl text-base leading-7 text-slate-100 sm:text-lg lg:line-clamp-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
              >
                {description}
              </motion.p>

              {supportingText && (
                <motion.p
                  className="mt-2 hidden max-w-2xl text-sm leading-6 text-slate-200/92 lg:line-clamp-2 xl:block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.24 }}
                >
                  {supportingText}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
