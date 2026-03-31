import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { t } from '../../shared/utils/i18n';

interface PlaceholderPageProps {
  title: string;
  description: string;
  canonical: string;
  alternateES: string;
  alternateEN: string;
  breadcrumbLabel: string;
}

export function PlaceholderPage({ 
  title, 
  description, 
  canonical, 
  alternateES,
  alternateEN,
  breadcrumbLabel 
}: PlaceholderPageProps) {
  const { language } = useLanguage();

  const breadcrumbItems = [{ label: breadcrumbLabel }];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        alternateES={alternateES}
        alternateEN={alternateEN}
        language={language}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <h1 className="text-4xl font-light text-gray-900 mb-4">{breadcrumbLabel}</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <p className="text-blue-900 text-lg">
            {language === 'es' 
              ? 'Esta página está estructuralmente configurada pero la implementación de UI está pendiente. La ruta, modelo de datos y estructura SEO están listos.'
              : 'This page is structurally configured but UI implementation is pending. The route, data model, and SEO structure are ready.'
            }
          </p>
        </div>
      </div>
    </>
  );
}