import { motion } from 'motion/react';
import { Share2, Linkedin } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface InsightsShareProps {
  title: string;
  url: string;
}

export function InsightsShare({ title, url }: InsightsShareProps) {
  const { language } = useLanguage();

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <motion.div
      className="border-t border-gray-200 pt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        {language === 'es' ? 'Compartir en LinkedIn' : 'Share on LinkedIn'}
      </h3>
      <div className="flex gap-3">
        <motion.a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-[#0A66C2]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
      </div>
    </motion.div>
  );
}