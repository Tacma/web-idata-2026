import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { HomeSection } from '../../../shared/types';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import { useTheme } from '../../../shared/contexts/ThemeContext';

interface CTABandSectionProps {
  section: HomeSection;
}

export function CTABandSection({ section }: CTABandSectionProps) {
  const { isDark } = useTheme();

  return (
    <Section background={isDark ? 'gray' : 'white'} padding="lg">
      <Container>
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={`pointer-events-none absolute -left-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full blur-3xl ${isDark ? 'bg-sky-400/16' : 'bg-blue-300/45'}`} />
          <div className={`pointer-events-none absolute -right-14 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full blur-3xl ${isDark ? 'bg-violet-400/18' : 'bg-violet-300/45'}`} />
          <div className={`pointer-events-none absolute left-1/2 top-4 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl ${isDark ? 'bg-fuchsia-300/12' : 'bg-rose-200/35'}`} />
          
          <div className={`relative overflow-hidden rounded-[2rem] border p-5 backdrop-blur-xl md:rounded-[2.25rem] md:p-6 lg:px-8 lg:py-7 ${isDark ? 'border-white/12 bg-[linear-gradient(135deg,rgba(15,23,42,0.84),rgba(17,24,39,0.94))] shadow-[0_24px_60px_rgba(0,0,0,0.34)]' : 'border-white/80 bg-white/78 shadow-[0_22px_60px_rgba(15,23,42,0.12)]'}`}>
            <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]' : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.94))]'}`} />
            <div className={`absolute inset-x-0 top-0 h-px ${isDark ? 'bg-white/16' : 'bg-white/95'}`} />
            
            <div className="relative">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
                <div className="flex-1 text-center md:text-left">
                  <motion.h2 
                    className={`text-balance text-2xl font-light leading-[1.05] tracking-[-0.06em] md:text-[2rem] lg:text-[3.1rem] ${isDark ? 'text-white' : 'text-slate-900'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  {section.subtitle && (
                    <motion.p 
                      className={`mt-3 text-sm font-normal leading-relaxed md:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {section.subtitle}
                    </motion.p>
                  )}
                </div>
                
                {section.ctaLabel && section.ctaHref && (
                  <motion.div
                    className="flex justify-center md:justify-end md:flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Link
                      to={section.ctaHref}
                      className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all duration-250 hover:scale-[1.02] active:scale-100 md:px-8 md:py-4 md:text-base ${isDark ? 'bg-white text-slate-950 hover:bg-slate-100 hover:shadow-[0_18px_34px_rgba(255,255,255,0.12)]' : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-[0_18px_34px_rgba(15,23,42,0.22)]'}`}
                    >
                      {section.ctaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
