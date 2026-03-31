import { motion } from 'motion/react';
import { Share2, Linkedin } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const { language } = useLanguage();

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <motion.div
      className="py-8 border-t border-b border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Share2 className="w-5 h-5" />
          <span className="font-medium">
            {language === 'es' ? 'Compartir en LinkedIn' : 'Share on LinkedIn'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={linkedinShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}