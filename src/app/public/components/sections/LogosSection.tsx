import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import { motion } from 'motion/react';
import type { HomeSection } from '../../../shared/types';

interface LogosSectionProps {
  section: HomeSection;
}

export function LogosSection({ section }: LogosSectionProps) {
  const logos = section.config?.logos || [];
  
  if (logos.length === 0) return null;
  
  return (
    <Section background="white" padding="sm">
      <Container>
        {section.title && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              {section.title}
            </p>
          </motion.div>
        )}
        
        {/* Horizontal row like reference - subtle and clean */}
        <div className="flex flex-wrap justify-center items-center gap-x-10 lg:gap-x-14 gap-y-6 opacity-50">
          {logos.map((logo: any, index: number) => (
            <motion.div 
              key={index} 
              className="text-gray-400 font-medium text-sm tracking-wide hover:text-gray-600 transition-colors duration-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {logo.name}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}