import { motion } from 'motion/react';
import type { HomeSection } from '../../../shared/types';

// Partner logos
import databricksLogo from 'figma:asset/6707a99b3f00e8781810e4a2da4770218ad1d3d1.png';
import microsoftLogo from 'figma:asset/39c219b2f06de4cb5909c4a548597fc419ee1c9c.png';
import tdSynnexLogo from 'figma:asset/624953b8852fe92d4f63e7605e72b0549ba81c89.png';

interface PartnersSectionProps {
  section: HomeSection;
}

// Map partner names to imported logos
const partnerLogos: Record<string, string> = {
  'Microsoft': microsoftLogo,
  'Databricks': databricksLogo,
  'TD SYNNEX': tdSynnexLogo,
};

export function PartnersSection({ section }: PartnersSectionProps) {
  const partners = section.config?.partners || [];
  
  if (partners.length === 0) return null;
  
  return (
    <section className="relative py-6 sm:py-8 px-6 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Title and Subtitle */}
          <div>
            {section.config?.eyebrow && (
              <motion.p 
                className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {section.config.eyebrow}
              </motion.p>
            )}
            
            {section.title && (
              <motion.h2 
                className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {section.title}
              </motion.h2>
            )}
            
            {section.subtitle && (
              <motion.p 
                className="text-sm sm:text-base font-light text-gray-600 max-w-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {section.subtitle}
              </motion.p>
            )}
          </div>
          
          {/* Right Column - Partner Logos */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 justify-items-center">
            {partners.map((partner: any, index: number) => {
              const logoSrc = partnerLogos[partner.name] || partner.logo;
              // Microsoft logo should be double the size
              const isMicrosoft = partner.name === 'Microsoft';
              // TD SYNNEX should be centered in the third position
              const isCentered = index === 2;
              
              return (
                <motion.div 
                  key={partner.name || index}
                  className={`group relative ${isCentered ? 'col-span-2 justify-self-center' : ''}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  {logoSrc ? (
                    <div className={`relative flex items-center justify-center ${
                      isMicrosoft 
                        ? 'w-48 sm:w-56 lg:w-64 h-16 sm:h-20' 
                        : 'w-28 sm:w-32 lg:w-36 h-10 sm:h-12'
                    }`}>
                      <img 
                        src={logoSrc}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter grayscale opacity-50 hover:opacity-70 transition-all duration-500"
                      />
                    </div>
                  ) : (
                    <div className="relative px-5 py-2.5 bg-white/30 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-gray-300/70 transition-all duration-500">
                      <span className="text-base sm:text-lg font-light text-gray-400 group-hover:text-gray-600 transition-colors duration-500 tracking-tight">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
        </div>
        
      </div>
    </section>
  );
}