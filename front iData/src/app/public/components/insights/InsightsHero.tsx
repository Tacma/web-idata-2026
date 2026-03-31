import { motion } from 'motion/react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import heroImage from 'figma:asset/0672d1e82b63fbb8a1b13c17fdbe095b353950ff.png';

export function InsightsHero() {
  const { language } = useLanguage();

  return (
    <section className="px-6 sm:px-8 lg:px-12 pt-8 pb-8 mt-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative min-h-[420px] rounded-3xl overflow-hidden shadow-xl flex items-center bg-gray-900">
          {/* Background Image with Parallax */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <img
              src={heroImage}
              alt="Insights"
              className="w-full h-full object-cover opacity-50"
            />
            {/* Glass overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.4) 100%)',
                backdropFilter: 'blur(1px)',
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-20">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Insights
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {language === 'es' 
                  ? 'Ideas, tendencias y experiencias sobre datos, analítica e inteligencia artificial.'
                  : 'Ideas, trends and experiences about data, analytics and artificial intelligence.'}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}