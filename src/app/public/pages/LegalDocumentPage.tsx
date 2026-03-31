import { useEffect, useState } from 'react';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { SEOHead } from '../../shared/components/SEOHead';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import {
  getLegalPagesSettings,
  type LegalPageDocument,
  type LegalPagesSettings,
} from '../../admin/services/legalPages.service';

interface LegalDocumentPageProps {
  documentKey: keyof LegalPagesSettings;
  canonicalEs: string;
  canonicalEn: string;
}

export function LegalDocumentPage({
  documentKey,
  canonicalEs,
  canonicalEn,
}: LegalDocumentPageProps) {
  const { language } = useLanguage();
  const [document, setDocument] = useState<LegalPageDocument | null>(null);

  useEffect(() => {
    let mounted = true;

    void getLegalPagesSettings().then((settings) => {
      if (mounted) {
        setDocument(settings[documentKey]);
      }
    }).catch((error) => {
      console.error('Error loading legal document:', error);
    });

    return () => {
      mounted = false;
    };
  }, [documentKey]);

  if (!document) {
    return null;
  }

  const current = {
    seoTitle: language === 'es' ? document.seoTitle_es : document.seoTitle_en,
    seoDescription: language === 'es' ? document.seoDescription_es : document.seoDescription_en,
    title: language === 'es' ? document.title_es : document.title_en,
    intro: language === 'es' ? document.intro_es : document.intro_en,
    bodyHtml: language === 'es' ? document.bodyHtml_es : document.bodyHtml_en,
  };

  return (
    <>
      <SEOHead
        title={current.seoTitle}
        description={current.seoDescription}
        canonical={language === 'es' ? canonicalEs : canonicalEn}
        alternateES={canonicalEs}
        alternateEN={canonicalEn}
        language={language}
      />

      <div className="relative">
        <section className="pt-28 pb-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: current.title }]} />
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
                {current.title}
              </h1>
              <p className="mt-5 text-lg text-gray-600 leading-8">{current.intro}</p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[28px] border border-gray-200 bg-white/90 shadow-sm">
              <div
                className="legal-document px-6 py-8 md:px-10 md:py-10 space-y-10 prose prose-gray max-w-none prose-h2:text-2xl prose-h2:font-medium prose-h2:text-gray-900 prose-p:text-base prose-p:leading-8 prose-p:text-gray-600 prose-ul:text-base prose-ul:text-gray-600 prose-li:leading-7"
                dangerouslySetInnerHTML={{ __html: current.bodyHtml }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
