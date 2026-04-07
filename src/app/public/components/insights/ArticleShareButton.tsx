import { Share2, Linkedin, Link2, Mail, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useContactSettings } from '../../../shared/hooks/useContactSettings';
import { getManagedSocialMedia } from '../../../shared/utils/socialLinks';

interface ArticleShareButtonProps {
  title: string;
  url: string;
}

export function ArticleShareButton({ title, url }: ArticleShareButtonProps) {
  const { language } = useLanguage();
  const { settings: contactSettings } = useContactSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareButtonText = language === 'es' ? 'Compartir' : 'Share';
  const modalTitle = language === 'es' ? 'Compartir este artículo' : 'Share this article';
  const copiedText = language === 'es' ? '¡Enlace copiado!' : 'Link copied!';

  // Official iData social media links
  const managedSocialLinks = getManagedSocialMedia(contactSettings.socialMedia);

  // Share URLs
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  };

  const handleLinkedInShare = () => {
    window.open(linkedinShareUrl, '_blank', 'width=600,height=600');
  };

  const handleEmailShare = () => {
    window.location.href = emailShareUrl;
  };

  const handleSocialVisit = (platform: 'instagram' | 'linkedin' | 'youtube') => {
    window.open(managedSocialLinks[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100"
      >
        <Share2 className="w-4 h-4" />
        {shareButtonText}
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-xl font-light text-gray-900">
                    {modalTitle}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Share Options */}
                <div className="p-6 space-y-3">
                  {/* LinkedIn */}
                  <button
                    onClick={handleLinkedInShare}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">LinkedIn</p>
                      <p className="text-sm text-gray-500">
                        {language === 'es' ? 'Compartir en LinkedIn' : 'Share on LinkedIn'}
                      </p>
                    </div>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-600 hover:bg-purple-50 transition-all group relative"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center">
                      <Link2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">
                        {copied ? copiedText : (language === 'es' ? 'Copiar enlace' : 'Copy link')}
                      </p>
                      <p className="text-sm text-gray-500 truncate max-w-[280px]">
                        {url}
                      </p>
                    </div>
                  </button>

                  {/* Email */}
                  <button
                    onClick={handleEmailShare}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-600 text-white flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-500">
                        {language === 'es' ? 'Enviar por correo' : 'Send via email'}
                      </p>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-sm text-gray-500">
                        {language === 'es' ? 'Síguenos' : 'Follow us'}
                      </span>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* Instagram */}
                    <button
                      onClick={() => handleSocialVisit('instagram')}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-pink-500 hover:bg-pink-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-center">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-gray-600 group-hover:text-pink-600">Instagram</p>
                    </button>

                    {/* LinkedIn */}
                    <button
                      onClick={() => handleSocialVisit('linkedin')}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-gray-600 group-hover:text-[#0A66C2]">LinkedIn</p>
                    </button>

                    {/* YouTube */}
                    <button
                      onClick={() => handleSocialVisit('youtube')}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-red-600 hover:bg-red-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                        <Youtube className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-gray-600 group-hover:text-red-600">YouTube</p>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
