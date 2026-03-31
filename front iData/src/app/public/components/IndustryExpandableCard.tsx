import { motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import type { Industry } from '../../shared/types';
import type { LucideIcon } from 'lucide-react';

interface IndustryExpandableCardProps {
  industry: Industry;
  icon: LucideIcon;
  isExpanded: boolean;
  onClick: () => void;
  onClose: () => void;
}

export function IndustryExpandableCard({
  industry,
  icon: Icon,
  isExpanded,
  onClick,
  onClose,
}: IndustryExpandableCardProps) {
  const { language, getLocalizedValue } = useLanguage();

  const title = getLocalizedValue(industry.title_es, industry.title_en);
  const excerpt = getLocalizedValue(industry.excerpt_es, industry.excerpt_en);
  const content = getLocalizedValue(industry.content_es, industry.content_en);
  const challenges = getLocalizedValue(industry.challenges_es || [], industry.challenges_en || []);
  const value = getLocalizedValue(industry.value_es || [], industry.value_en || []);

  const labels = {
    viewMore: language === 'es' ? 'Ver más' : 'View more',
    keyChallenges: language === 'es' ? 'Desafíos clave' : 'Key challenges',
    challenges: language === 'es' ? 'Desafíos' : 'Challenges',
    howWeHelp: language === 'es' ? 'Cómo ayudamos' : 'How we help',
    talkToExpert: language === 'es' ? 'Hablar con un experto' : 'Talk to an expert',
    viewServices: language === 'es' ? 'Ver servicios' : 'View services',
  };

  if (isExpanded) {
    return (
      <motion.div
        layout
        className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1 sm:row-span-2 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="glass-card h-full rounded-3xl p-6 sm:p-8 overflow-visible sm:overflow-y-auto relative"
          style={{
            boxShadow: 'var(--glass-shadow-xl)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-10 border border-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Icon & Title */}
          <div className="flex items-start gap-5 mb-6">
            <div className="flex items-center justify-center flex-shrink-0">
              <Icon className="w-14 h-14 text-blue-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1 pr-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-base text-gray-700 font-light leading-relaxed">
                {excerpt}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              {content}
            </p>
          </div>

          {/* Key Challenges */}
          {challenges.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {labels.keyChallenges}
              </h4>
              <div className="flex flex-wrap gap-3">
                {challenges.map((challenge, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-50/80 text-blue-700 rounded-lg text-sm font-medium border border-blue-100/50"
                  >
                    {challenge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* How We Help */}
          {value.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {labels.howWeHelp}
              </h4>
              <ul className="space-y-3">
                {value.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span className="text-base text-gray-700 font-light leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={`/${language}/${language === 'es' ? 'contacto' : 'contact'}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100 group"
            >
              {labels.talkToExpert}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={`/${language}/${language === 'es' ? 'servicios' : 'services'}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-300/60 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-300 group backdrop-blur-sm bg-white/30"
            >
              {labels.viewServices}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="col-span-1 row-span-1"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onClick}
        className="group block w-full h-full text-left"
      >
        <div
          className="glass-card h-full rounded-2xl p-6 min-h-[240px] sm:min-h-[280px] flex flex-col relative overflow-hidden"
        >
          {/* Icon */}
          <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {title}
          </h3>

          {/* Challenges Section */}
          {challenges.length > 0 && (
            <div className="mb-auto">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
                {labels.challenges}
              </p>
              <ul className="space-y-2">
                {challenges.slice(0, 3).map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 font-light leading-relaxed">
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="inline-flex items-center gap-2 text-blue-600 font-medium mt-4 group-hover:gap-3 transition-all duration-300">
            <span className="text-sm">{labels.viewMore}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </button>
    </motion.div>
  );
}