import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { HomeSection } from '../../../shared/types';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import { PillButton } from '../../../shared/components/PillButton';

interface CTABandSectionProps {
  section: HomeSection;
}

export function CTABandSection({ section }: CTABandSectionProps) {
  return (
    <Section background="white" padding="xl">
      <Container>
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Background blobs/orbs with vibrant colors */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-50" />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-56 h-56 bg-pink-400 rounded-full blur-3xl opacity-30" />
          
          {/* Main glassmorphic card */}
          <div 
            className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 overflow-hidden border border-white/30"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0.85) 100%)',
              backdropFilter: 'blur(40px) saturate(150%)',
              WebkitBackdropFilter: 'blur(40px) saturate(150%)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
            }}
          >
            {/* Gradient overlay for depth */}
            <div 
              className="absolute inset-0 rounded-2xl md:rounded-3xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
              }}
            />
            
            <div className="relative">
              {/* Flex container: vertical en mobile, horizontal en desktop */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                
                {/* Left side: Title and subtitle */}
                <div className="flex-1 text-center md:text-left">
                  <motion.h2 
                    className="text-xl md:text-2xl lg:text-3xl mb-2 font-light leading-tight tracking-tight text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  {section.subtitle && (
                    <motion.p 
                      className="text-sm md:text-base text-gray-700 leading-relaxed font-light"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {section.subtitle}
                    </motion.p>
                  )}
                </div>
                
                {/* Right side: CTA Button */}
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
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-250 hover:shadow-xl hover:scale-[1.02] active:scale-100 group whitespace-nowrap"
                    >
                      {section.ctaLabel}
                      <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
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