import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, X, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { emailConfig, emailTemplates } from '../../shared/config/emailConfig';
import { getByKey as getPageByKey } from '../../../services/pagesService';
import { useContactSettings } from '../../shared/hooks/useContactSettings';
import { EXTERNAL_DATA_POLICY_URL } from '../../shared/constants/legalLinks';
import { buildWhatsAppRegionUrl, getActiveWhatsAppRegions, getLocalizedRegionAvailability, getLocalizedRegionHelper, getLocalizedRegionName } from '../../shared/utils/whatsapp';
import { getManagedSocialLinks } from '../../shared/utils/socialLinks';
import { defaultContactPageContent, getContactPageContent, type ContactPageContent } from '../../admin/services/contactPageContent.service';

const NAME_PATTERN = "[A-Za-zÀ-ÿ' -]+";
const PHONE_PATTERN = "[0-9+() -]{8,20}";

export function Contact() {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { settings: contactSettings } = useContactSettings();
  const activeWhatsAppRegions = [...contactSettings.whatsapp.regions]
    .filter((region) => region.isActive)
    .sort((a, b) => a.order - b.order);
  const primaryWhatsAppRegion = activeWhatsAppRegions[0];
  const secondaryWhatsAppRegion = activeWhatsAppRegions[1];
  const [searchParams] = useSearchParams();
  const [pageRecord, setPageRecord] = useState<any | null>(null);
  const [pageContent, setPageContent] = useState<ContactPageContent>(defaultContactPageContent);

  // Lead context state (hidden metadata from URL params)
  const [leadContext, setLeadContext] = useState({
    source_type: '',
    source_slug: '',
    source_title: '',
    source_url: '',
    source_language: '',
    source_cta_label: '',
    intent: '',
    campaign_id: '',
    referrer_path: '',
  });

  // Contextual banner (can be dismissed)
  const [showContextBanner, setShowContextBanner] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    country: '',
    phone: '',
    project_type: '',
    industry: '',
    budget_range: '',
    timeline: '',
    message: '',
    privacy_policy_acceptance: false,
  });

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPageRecord() {
      try {
        const [record, content] = await Promise.all([
          getPageByKey('contact'),
          getContactPageContent().catch(() => defaultContactPageContent),
        ]);
        if (!cancelled) {
          setPageRecord(record);
          setPageContent(content);
        }
      } catch (error) {
        console.error('Error loading contact page metadata:', error);
      }
    }

    loadPageRecord();

    return () => {
      cancelled = true;
    };
  }, []);

  // SEO Content
  const seoTitle = pageRecord
    ? (language === 'es' ? pageRecord.title_es : pageRecord.title_en)
    : language === 'es' ? 'Contacto - iData' : 'Contact - iData';
  const seoDescription = pageRecord
    ? (language === 'es' ? pageRecord.description_es : pageRecord.description_en)
    : language === 'es'
      ? 'Estamos listos para ayudarte a transformar tus datos en decisiones estratégicas. Contáctanos para iniciar tu proyecto de Data & AI.'
      : 'We are ready to help you transform your data into strategic decisions. Contact us to start your Data & AI project.';

  // Project Types
  const projectTypes = [
    { value: '', label: language === 'es' ? 'Selecciona un tipo' : 'Select a type' },
    { value: 'data-analytics', label: language === 'es' ? 'Analítica de Datos' : 'Data Analytics' },
    { value: 'data-engineering', label: language === 'es' ? 'Ingeniería de Datos' : 'Data Engineering' },
    { value: 'ai-ml', label: language === 'es' ? 'Inteligencia Artificial & ML' : 'Artificial Intelligence & ML' },
    { value: 'data-strategy', label: language === 'es' ? 'Estrategia de Datos' : 'Data Strategy' },
    { value: 'data-governance', label: language === 'es' ? 'Gobierno de Datos' : 'Data Governance' },
    { value: 'bi-visualization', label: language === 'es' ? 'BI & Visualización' : 'BI & Visualization' },
    { value: 'other', label: language === 'es' ? 'Otro' : 'Other' },
  ];

  // Contact Information (would come from CMS in production)
  const contactInfo = [
    {
      icon: Mail,
      title: language === 'es' ? 'Email' : 'Email',
      content: contactSettings.email,
      subContent: language === 'es' ? 'Respuesta en 24 horas hábiles' : 'Response within 24 business hours',
    },
    {
      icon: Phone,
      title: language === 'es' ? 'Números de contacto' : 'Contact numbers',
      content: primaryWhatsAppRegion
        ? `${language === 'es' ? primaryWhatsAppRegion.name_es : primaryWhatsAppRegion.name_en} ${primaryWhatsAppRegion.phoneNumber}`
        : contactSettings.phone,
      subContent: secondaryWhatsAppRegion
        ? `${language === 'es' ? secondaryWhatsAppRegion.name_es : secondaryWhatsAppRegion.name_en} ${secondaryWhatsAppRegion.phoneNumber}`
        : `USA ${contactSettings.administrativePhone || '+1 303 901 9526'}`,
      additionalContent:
        language === 'es'
          ? `Administrativo ${contactSettings.administrativePhone}`
          : `Administrative ${contactSettings.administrativePhone}`,
    },
    {
      icon: MapPin,
      title: language === 'es' ? 'Ubicación principal' : 'Primary location',
      content: language === 'es' ? contactSettings.address_es : contactSettings.address_en,
      subContent:
        language === 'es' ? contactSettings.businessHours_es : contactSettings.businessHours_en,
    },
  ];

  const socialLinks = getManagedSocialLinks(contactSettings.socialMedia).map((item) => ({
    ...item,
    icon:
      item.key === 'facebook'
        ? Facebook
        : item.key === 'linkedin'
          ? Linkedin
          : item.key === 'instagram'
            ? Instagram
            : Youtube,
  }));

  const compactWhatsAppRegions = getActiveWhatsAppRegions(contactSettings.whatsapp);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);

    try {
      // In production, this would:
      // 1. Store submission in database (contact_submissions collection)
      // 2. Send notification email to marketing@idata.global (from emailConfig)
      // 3. Send confirmation email to user
      
      // Prepare submission data with lead context metadata
      const submissionData = {
        // User form data
        ...formData,
        
        // System fields
        language,
        source_page: `/${language}/${language === 'es' ? 'contacto' : 'contact'}/`,
        submitted_at: new Date().toISOString(),
        status: 'new',
        
        // Lead context metadata (tracking where the lead came from)
        source_type: leadContext.source_type,
        source_slug: leadContext.source_slug,
        source_title: leadContext.source_title,
        source_url: leadContext.source_url,
        source_language: leadContext.source_language,
        source_cta_label: leadContext.source_cta_label,
        intent: leadContext.intent,
        campaign_id: leadContext.campaign_id,
        referrer_path: leadContext.referrer_path,
        prefill_used: !!(leadContext.source_type), // Boolean: was prefill logic applied?
        
        // Email routing configuration
        notification_recipient: emailConfig.commercial.recipient, // marketing@idata.global
        notification_subject: leadContext.source_type && leadContext.source_title
          ? `New website lead — ${leadContext.source_type} — ${leadContext.source_title}`
          : 'New website lead from Contact form',
        confirmation_subject: emailTemplates.commercialConfirmation.subject[language],
        confirmation_body: emailTemplates.commercialConfirmation.body[language],
      };

      console.log('Form submission data with lead context:', submissionData);
      console.log('Email will be sent to:', emailConfig.commercial.recipient);
      console.log('Email subject:', submissionData.notification_subject);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // SUCCESS - In production, handle actual API response
      setSubmitSuccess(true);
      
      // Reset form and lead context
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        country: '',
        phone: '',
        project_type: '',
        industry: '',
        budget_range: '',
        timeline: '',
        message: '',
        privacy_policy_acceptance: false,
      });
      
      setShowContextBanner(false);

      // Scroll to success message
      setTimeout(() => {
        document.getElementById('form-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle URL parameters and smart prefill logic
  useEffect(() => {
    // Extract URL params
    const sourceType = searchParams.get('source_type') || '';
    const sourceSlug = searchParams.get('source_slug') || '';
    const sourceTitle = searchParams.get('source_title') || '';
    const sourceUrl = searchParams.get('source_url') || '';
    const sourceLanguage = searchParams.get('source_language') || language;
    const sourceCtaLabel = searchParams.get('source_cta_label') || '';
    const intent = searchParams.get('intent') || '';
    const campaignId = searchParams.get('campaign_id') || '';
    const referrerPath = searchParams.get('referrer_path') || '';

    // Store lead context
    if (sourceType || sourceSlug || sourceTitle) {
      setLeadContext({
        source_type: sourceType,
        source_slug: sourceSlug,
        source_title: sourceTitle,
        source_url: sourceUrl,
        source_language: sourceLanguage,
        source_cta_label: sourceCtaLabel,
        intent: intent,
        campaign_id: campaignId,
        referrer_path: referrerPath,
      });

      // Show context banner
      setShowContextBanner(true);

      // PREFILL LOGIC BASED ON SOURCE TYPE
      
      // RULE 1: If source_type = service
      if (sourceType === 'service' && sourceSlug) {
        // Map service slugs to project types
        const serviceToProjectType: Record<string, string> = {
          'data-operations': 'data-engineering',
          'data-delivery': 'data-analytics',
          'strategy-consulting': 'data-strategy',
          'cloud-services': 'data-engineering',
          'cloud-services-provider': 'data-engineering',
          'data-engineering': 'data-engineering',
          'data-analytics': 'data-analytics',
          'ai-ml': 'ai-ml',
        };

        const mappedProjectType = serviceToProjectType[sourceSlug] || '';
        
        setFormData(prev => ({
          ...prev,
          project_type: mappedProjectType,
          message: language === 'es'
            ? `Hola, quiero recibir más información sobre el servicio de ${sourceTitle}.`
            : `Hello, I would like to receive more information about the ${sourceTitle} service.`,
        }));
      }

      // RULE 2: If source_type = industry
      else if (sourceType === 'industry' && sourceSlug) {
        // Map industry slugs
        const industrySlugMap: Record<string, string> = {
          'retail-manufacturing': 'retail',
          'financial-services': 'financial',
          'healthcare': 'healthcare',
          'telecomunicaciones': 'telecommunications',
          'energia': 'energy',
          'government': 'government',
        };

        const mappedIndustry = industrySlugMap[sourceSlug] || sourceSlug;
        
        setFormData(prev => ({
          ...prev,
          industry: mappedIndustry,
          message: language === 'es'
            ? `Hola, quiero hablar con iData sobre soluciones para la industria ${sourceTitle}.`
            : `Hello, I would like to talk with iData about solutions for the ${sourceTitle} industry.`,
        }));
      }

      // RULE 3: If source_type = case_study
      else if (sourceType === 'case_study' && sourceTitle) {
        setFormData(prev => ({
          ...prev,
          message: language === 'es'
            ? `Hola, vi el caso de éxito ${sourceTitle} y me gustaría conocer una solución similar para mi empresa.`
            : `Hello, I saw the ${sourceTitle} case study and would like to explore a similar solution for my company.`,
        }));
      }

      // RULE 4: If source_type = insight
      else if (sourceType === 'insight' && sourceTitle) {
        setFormData(prev => ({
          ...prev,
          message: language === 'es'
            ? `Hola, leí el insight "${sourceTitle}" y me gustaría hablar con un especialista sobre este tema.`
            : `Hello, I read the insight "${sourceTitle}" and would like to speak with a specialist about this topic.`,
        }));
      }

      // RULE 5: If source_type = insight_build
      else if (sourceType === 'insight_build' && sourceTitle) {
        setFormData(prev => ({
          ...prev,
          project_type: 'data-strategy',
          message: language === 'es'
            ? `Hola, quiero desarrollar un producto similar a "${sourceTitle}" y me gustaría conversar sobre cómo aterrizarlo en mi contexto.`
            : `Hello, I want to build a product similar to "${sourceTitle}" and would like to discuss how to adapt it to my context.`,
        }));
      }

      // RULE 6: If source_type = event
      else if (sourceType === 'event' && sourceTitle) {
        setFormData(prev => ({
          ...prev,
          message: language === 'es'
            ? `Hola, vi el evento "${sourceTitle}" y quiero hablar sobre una iniciativa relacionada para mi organización.`
            : `Hello, I saw the event "${sourceTitle}" and want to talk about a related initiative for my organization.`,
        }));
      }

      // RULE 7: Resource follow-up
      else if (sourceType === 'resource' && sourceTitle) {
        setFormData(prev => ({
          ...prev,
          message: language === 'es'
            ? `Hola, vi el recurso "${sourceTitle}" y quiero conversar sobre cómo aplicarlo en mi organización.`
            : `Hello, I saw the resource "${sourceTitle}" and want to talk about how to apply it in my organization.`,
        }));
      }

      // RULE 8: Regional / general navigation sources
      else if (sourceType === 'commercial_team' && sourceTitle) {
        setFormData(prev => ({
          ...prev,
          message: language === 'es'
            ? `Hola, quiero hablar con el equipo comercial de iData para ${sourceTitle}.`
            : `Hello, I would like to speak with the iData commercial team for ${sourceTitle}.`,
        }));
      }

      else if (sourceType === 'careers') {
        setFormData(prev => ({
          ...prev,
          message: language === 'es'
            ? 'Hola, quiero compartir mi perfil y conocer oportunidades para colaborar con iData.'
            : 'Hello, I would like to share my profile and explore opportunities to collaborate with iData.',
        }));
      }

      else if (sourceType === 'about' || sourceType === 'services_page' || sourceType === 'industry_hub' || sourceType === 'not_found') {
        setFormData(prev => ({
          ...prev,
          message: language === 'es'
            ? `Hola, quiero conversar con iData sobre ${sourceTitle || 'una iniciativa de datos e IA'}.`
            : `Hello, I would like to talk with iData about ${sourceTitle || 'a data and AI initiative'}.`,
        }));
      }

      // RULE 9: If source_type = home or general_cta
      else if (sourceType === 'home' || sourceType === 'general_cta') {
        setFormData(prev => ({
          ...prev,
          message: language === 'es'
            ? 'Hola, me gustaría recibir más información sobre los servicios de iData.'
            : 'Hello, I would like to receive more information about iData\'s services.',
        }));
      }
    }

    // Also support legacy direct param prefill
    const projectType = searchParams.get('project_type');
    const industry = searchParams.get('industry');
    const budgetRange = searchParams.get('budget_range');
    const timeline = searchParams.get('timeline');

    const legacyService = searchParams.get('service');

    if (legacyService && !sourceType) {
      const serviceToProjectType: Record<string, string> = {
        'data-operations': 'data-engineering',
        'data-delivery': 'data-analytics',
        'strategy-consulting': 'data-strategy',
        'cloud-services': 'data-engineering',
        'cloud-services-provider': 'data-engineering',
        'data-engineering': 'data-engineering',
        'data-analytics': 'data-analytics',
        'ai-ml': 'ai-ml',
      };

      setLeadContext(prev => ({
        ...prev,
        source_type: 'service',
        source_slug: legacyService,
        source_title: legacyService,
        source_language: language,
      }));

      setShowContextBanner(true);
      setFormData(prev => ({
        ...prev,
        project_type: serviceToProjectType[legacyService] || prev.project_type,
        message: language === 'es'
          ? `Hola, quiero recibir más información sobre el servicio ${legacyService}.`
          : `Hello, I would like to receive more information about the ${legacyService} service.`,
      }));
    }

    if (projectType && !sourceType && !legacyService) {
      setFormData(prev => ({ ...prev, project_type: projectType }));
    }
    if (industry && !sourceType) {
      setFormData(prev => ({ ...prev, industry: industry }));
    }
    if (budgetRange) {
      setFormData(prev => ({ ...prev, budget_range: budgetRange }));
    }
    if (timeline) {
      setFormData(prev => ({ ...prev, timeline: timeline }));
    }
  }, [searchParams, language]);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`/${language}/${language === 'es' ? 'contacto' : 'contact'}/`}
        alternateES="/es/contacto/"
        alternateEN="/en/contact/"
        language={language}
      />
      <section id="contact-form" className={`py-20 md:pt-24 md:pb-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className={`rounded-[28px] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isDark ? 'border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_22%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_22%),linear-gradient(180deg,#0f172a,#020617)]' : 'border-purple-100 bg-gradient-to-r from-green-50 via-white to-blue-50'}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                {language === 'es' ? pageContent.directEyebrow_es : pageContent.directEyebrow_en}
              </p>
              <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <h2 className={`text-2xl font-light tracking-[-0.05em] md:text-3xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'es' ? pageContent.directTitle_es : pageContent.directTitle_en}
                </h2>
              </div>

              <div className="mt-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-4">
                  {compactWhatsAppRegions.map((region) => {
                    const regionName = getLocalizedRegionName(region, language);
                    const helperText = getLocalizedRegionHelper(region, language);
                    const availabilityText = getLocalizedRegionAvailability(region, language);
                    const regionFlags: Record<string, string> = {
                      'central-america': '🌎',
                      centralamerica: '🌎',
                      chile: '🇨🇱',
                      colombia: '🇨🇴',
                      usa: '🇺🇸',
                    };
                    const regionFlag = regionFlags[region.slug] || regionFlags[region.id] || '🌐';

                    return (
                      <button
                        key={region.id}
                        type="button"
                        onClick={() => window.open(buildWhatsAppRegionUrl(region, language), '_blank', 'noopener,noreferrer')}
                        className={`min-w-[248px] rounded-[22px] border px-4 py-4 text-left shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.10)] sm:min-w-[268px] ${isDark ? 'border-emerald-400/20 bg-slate-900/90 hover:border-emerald-300/40' : 'border-emerald-200 bg-white hover:border-emerald-300'}`}
                      >
                        <div className="flex flex-col items-start gap-3">
                          <span className="text-2xl leading-none" aria-hidden="true">
                            {regionFlag}
                          </span>
                          <div className="space-y-2">
                            <p className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{regionName}</p>
                            {helperText && <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{helperText}</p>}
                          </div>
                          {availabilityText && (
                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${isDark ? 'bg-emerald-500/12 text-emerald-300' : 'bg-emerald-50 text-emerald-600'}`}>
                              {availabilityText}
                            </span>
                          )}
                        </div>
                        <div className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}>
                          WhatsApp
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-2xl border p-8 shadow-xl ${isDark ? 'border-white/10 bg-slate-900' : 'border-gray-200 bg-white'}`}
              >
                <div className="mb-6">
                  <h1 className={`text-2xl md:text-3xl font-light ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'es' ? pageContent.formTitle_es : pageContent.formTitle_en}
                  </h1>
                  <p className={`mt-3 text-sm md:text-base ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                    {language === 'es' ? pageContent.formDescription_es : pageContent.formDescription_en}
                  </p>
                </div>

                {showContextBanner && leadContext.source_title && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 flex items-start justify-between gap-3 rounded-xl border p-4 ${isDark ? 'border-purple-400/20 bg-purple-500/10' : 'border-purple-200 bg-purple-50'}`}
                  >
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-purple-100' : 'text-purple-900'}`}>
                        {language === 'es' ? 'Estás contactándonos sobre:' : 'You are contacting us about:'}
                        <span className="ml-1 font-medium">{leadContext.source_title}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setShowContextBanner(false)}
                      className={`flex-shrink-0 transition-colors ${isDark ? 'text-purple-300 hover:text-purple-100' : 'text-purple-600 hover:text-purple-800'}`}
                      aria-label={language === 'es' ? 'Cerrar' : 'Close'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                <div id="form-result" className="mb-6">
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 rounded-xl border p-4 ${isDark ? 'border-green-400/20 bg-green-500/10' : 'border-green-200 bg-green-50'}`}
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <div>
                        <h3 className={`mb-1 font-medium ${isDark ? 'text-green-100' : 'text-green-900'}`}>
                          {language === 'es' ? pageContent.successTitle_es : pageContent.successTitle_en}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-700'}`}>
                          {language === 'es' ? pageContent.successDescription_es : pageContent.successDescription_en}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 rounded-xl border p-4 ${isDark ? 'border-red-400/20 bg-red-500/10' : 'border-red-200 bg-red-50'}`}
                    >
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                      <div>
                        <h3 className={`mb-1 font-medium ${isDark ? 'text-red-100' : 'text-red-900'}`}>
                          {language === 'es' ? pageContent.errorTitle_es : pageContent.errorTitle_en}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-red-200' : 'text-red-700'}`}>
                          {language === 'es' ? pageContent.errorDescription_es : pageContent.errorDescription_en}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="first_name" className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                        {language === 'es' ? 'Nombre' : 'First name'} *
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        required
                        minLength={2}
                        maxLength={50}
                        pattern={NAME_PATTERN}
                        title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border px-4 py-3.5 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? 'border-white/10 bg-slate-950 text-white hover:border-white/20' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                        {language === 'es' ? 'Apellido' : 'Last name'} *
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        required
                        minLength={2}
                        maxLength={50}
                        pattern={NAME_PATTERN}
                        title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border px-4 py-3.5 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? 'border-white/10 bg-slate-950 text-white hover:border-white/20' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                        {language === 'es' ? 'Correo electrónico' : 'Email'} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        maxLength={100}
                        placeholder={language === 'es' ? 'tu@empresa.com' : 'you@company.com'}
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border px-4 py-3.5 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? 'border-white/10 bg-slate-950 text-white placeholder:text-slate-500 hover:border-white/20' : 'border-gray-300 bg-white hover:border-gray-400 placeholder:text-gray-400'}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                        {language === 'es' ? 'Teléfono' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern={PHONE_PATTERN}
                        placeholder="+57 300 123 4567"
                        title={language === 'es' ? 'Formato: +57 300 123 4567' : 'Format: +57 300 123 4567'}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border px-4 py-3.5 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? 'border-white/10 bg-slate-950 text-white placeholder:text-slate-500 hover:border-white/20' : 'border-gray-300 bg-white hover:border-gray-400 placeholder:text-gray-400'}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="company" className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                        {language === 'es' ? 'Empresa' : 'Company'} *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        minLength={2}
                        maxLength={100}
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border px-4 py-3.5 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? 'border-white/10 bg-slate-950 text-white hover:border-white/20' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="project_type" className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                        {language === 'es' ? 'Tipo de necesidad' : 'Type of need'}
                      </label>
                      <select
                        id="project_type"
                        name="project_type"
                        value={formData.project_type}
                        onChange={handleInputChange}
                        className={`ui-select w-full rounded-xl border py-3.5 pl-4 transition-all duration-200 cursor-pointer focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? 'border-white/10 bg-slate-950 text-white hover:border-white/20' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                      >
                        {projectTypes.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                      {language === 'es' ? pageContent.formMessageLabel_es : pageContent.formMessageLabel_en} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      minLength={10}
                      maxLength={1200}
                      placeholder={language === 'es'
                        ? pageContent.formMessagePlaceholder_es
                        : pageContent.formMessagePlaceholder_en}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full resize-none rounded-xl border px-4 py-3.5 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? 'border-white/10 bg-slate-950 text-white placeholder:text-slate-500 hover:border-white/20' : 'border-gray-300 bg-white hover:border-gray-400 placeholder:text-gray-400'}`}
                    />
                    <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      {language === 'es' ? 'Mínimo 10 caracteres, máximo 1200' : 'Minimum 10 characters, maximum 1200'}
                    </p>
                  </div>

                  <div className="hidden">
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                    <input type="text" id="industry" name="industry" value={formData.industry} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                    <input type="text" id="budget_range" name="budget_range" value={formData.budget_range} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                    <input type="text" id="timeline" name="timeline" value={formData.timeline} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy_policy_acceptance"
                      name="privacy_policy_acceptance"
                      required
                      checked={formData.privacy_policy_acceptance}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="privacy_policy_acceptance" className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                      {language === 'es' ? 'Acepto la ' : 'I accept the '}
                      <a
                        href={EXTERNAL_DATA_POLICY_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0088FF] hover:underline"
                      >
                        {language === 'es' ? 'política de privacidad' : 'privacy policy'}
                      </a>
                      {language === 'es'
                        ? ' y el tratamiento de mis datos personales para fines de contacto comercial.'
                        : ' '}
                      <span>{language === 'es' ? pageContent.privacyText_es : pageContent.privacyText_en}</span> *
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-purple-700 hover:shadow-lg active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                    >
                          {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          {language === 'es' ? 'Enviando...' : 'Sending...'}
                        </>
                        ) : (
                          <>
                          {language === 'es' ? pageContent.submitLabel_es : pageContent.submitLabel_en}
                          <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 lg:sticky lg:top-24"
              >
                <div className={`rounded-2xl border p-8 shadow-xl ${isDark ? 'border-white/10 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                  <h3 className={`mb-6 text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'es' ? pageContent.contactInfoTitle_es : pageContent.contactInfoTitle_en}
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${isDark ? 'bg-white/8' : 'bg-purple-100'}`}>
                            <Icon className={`h-6 w-6 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`mb-2 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{info.title}</h4>
                            <div className="space-y-1">
                              <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{info.content}</p>
                              {info.subContent && <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{info.subContent}</p>}
                              {(info as any).additionalContent && (
                                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{(info as any).additionalContent}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {socialLinks.length > 0 && (
                  <div className={`rounded-2xl border p-8 shadow-xl ${isDark ? 'border-white/10 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                    <h3 className={`mb-3 text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'es' ? pageContent.socialTitle_es : pageContent.socialTitle_en}
                    </h3>
                    <p className={`mb-5 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                      {language === 'es' ? pageContent.socialDescription_es : pageContent.socialDescription_en}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.key}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isDark ? 'border-white/10 bg-slate-950 text-slate-200 hover:border-purple-300/30 hover:bg-purple-500/10 hover:text-purple-200' : 'border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700'}`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className={`rounded-2xl border p-6 ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,#111827,#0f172a)]' : 'border-purple-100 bg-gradient-to-br from-purple-50 to-blue-50'}`}>
                  <h4 className={`mb-3 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'es' ? pageContent.responseTitle_es : pageContent.responseTitle_en}
                  </h4>
                  <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    {language === 'es' ? pageContent.responseDescription_es : pageContent.responseDescription_en}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
