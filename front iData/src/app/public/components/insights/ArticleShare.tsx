import { Linkedin, Link2 } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useState } from 'react';

interface ArticleShareProps {
  title: string;
  url: string;
  variant?: 'horizontal' | 'vertical';
}

export function ArticleShare({ title, url, variant = 'horizontal' }: ArticleShareProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const shareText = language === 'es' ? 'Compartir artículo' : 'Share article';
  const copiedText = language === 'es' ? 'Enlace copiado' : 'Link copied';

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Vertical variant for sticky sidebar
  if (variant === 'vertical') {
    return (
      <div className="flex flex-col items-center gap-4">
        {/* LinkedIn Share */}
        <a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-gray-100 hover:bg-[#0A66C2] text-gray-600 hover:text-white flex items-center justify-center transition-all hover:scale-110"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="w-11 h-11 rounded-full bg-gray-100 hover:bg-purple-600 text-gray-600 hover:text-white flex items-center justify-center transition-all hover:scale-110 relative group"
          aria-label="Copy link"
          title="Copy link"
        >
          <Link2 className="w-5 h-5" />
          {copied && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
              {copiedText}
            </span>
          )}
        </button>
      </div>
    );
  }

  // Horizontal variant for mobile
  return (
    <div className="border-t border-b border-gray-200 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-gray-700 font-medium">
          {shareText}
        </div>
        
        <div className="flex items-center gap-3">
          {/* LinkedIn Share */}
          <a
            href={linkedinShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-purple-100 hover:bg-[#0A66C2] text-purple-600 hover:text-white flex items-center justify-center transition-all"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-11 h-11 rounded-full bg-purple-100 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-all relative"
            aria-label="Copy link"
            title="Copy link"
          >
            <Link2 className="w-5 h-5" />
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                {copiedText}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}