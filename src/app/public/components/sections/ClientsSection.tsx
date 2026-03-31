import { motion } from 'motion/react';
import type { HomeSection } from '../../../shared/types';

interface ClientsSectionProps {
  section: HomeSection;
}

export function ClientsSection({ section }: ClientsSectionProps) {
  const clients = section.config?.clients || [];
  
  if (clients.length === 0) return null;
  
  return (
    <section className="relative py-12 sm:py-16 px-6 sm:px-8 lg:px-12 bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Title - Subtle */}
        {section.title && (
          <motion.h3 
            className="text-center text-sm sm:text-base font-light text-gray-500 mb-8 sm:mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {section.title}
          </motion.h3>
        )}
        
        {/* Clients Logos - More subtle, tighter grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10 opacity-40">
          {clients.map((client: any, index: number) => (
            <motion.div 
              key={client.name || index}
              className="group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {client.logo ? (
                // If logo image exists
                <div className="relative w-24 sm:w-28 lg:w-32 h-12 sm:h-14 flex items-center justify-center">
                  <img 
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              ) : (
                // Fallback: text-based logo
                <span className="text-sm sm:text-base font-light text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                  {client.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
