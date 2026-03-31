import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Building2, Globe, Clock, Briefcase, X } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { emailConfig, emailTemplates } from '../../shared/config/emailConfig';
import contactHeroImage from 'figma:asset/683c3c060f30ddc97aad2f8f2fe317663df72155.png';

export function Contact() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();

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

  // SEO Content
  const seoTitle = language === 'es' ? 'Contacto - iData' : 'Contact - iData';
  const seoDescription = language === 'es'
    ? 'Estamos listos para ayudarte a transformar tus datos en decisiones estratégicas. Contáctanos para iniciar tu proyecto de Data & AI.'
    : 'We are ready to help you transform your data into strategic decisions. Contact us to start your Data & AI project.';

  // Hero Content
  const heroContent = {
    title: language === 'es' ? 'Hablemos' : "Let's talk",
    description: language === 'es'
      ? 'Estamos listos para ayudarte a transformar tus datos en decisiones estratégicas.'
      : 'We are ready to help you transform your data into strategic decisions.',
  };

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

  // Industries
  const industries = [
    { value: '', label: language === 'es' ? 'Selecciona una industria' : 'Select an industry' },
    { value: 'financial', label: language === 'es' ? 'Servicios Financieros' : 'Financial Services' },
    { value: 'retail', label: language === 'es' ? 'Retail & E-commerce' : 'Retail & E-commerce' },
    { value: 'healthcare', label: language === 'es' ? 'Salud' : 'Healthcare' },
    { value: 'manufacturing', label: language === 'es' ? 'Manufactura' : 'Manufacturing' },
    { value: 'telecommunications', label: language === 'es' ? 'Telecomunicaciones' : 'Telecommunications' },
    { value: 'energy', label: language === 'es' ? 'Energía' : 'Energy' },
    { value: 'government', label: language === 'es' ? 'Gobierno' : 'Government' },
    { value: 'education', label: language === 'es' ? 'Educación' : 'Education' },
    { value: 'other', label: language === 'es' ? 'Otra' : 'Other' },
  ];

  // Budget Ranges
  const budgetRanges = [
    { value: '', label: language === 'es' ? 'Selecciona un rango' : 'Select a range' },
    { value: 'under-25k', label: language === 'es' ? 'Menos de $25,000 USD' : 'Under $25,000 USD' },
    { value: '25k-50k', label: '$25,000 - $50,000 USD' },
    { value: '50k-100k', label: '$50,000 - $100,000 USD' },
    { value: '100k-250k', label: '$100,000 - $250,000 USD' },
    { value: '250k-500k', label: '$250,000 - $500,000 USD' },
    { value: 'over-500k', label: language === 'es' ? 'Más de $500,000 USD' : 'Over $500,000 USD' },
    { value: 'not-decided', label: language === 'es' ? 'Por definir' : 'To be determined' },
  ];

  // Timelines
  const timelines = [
    { value: '', label: language === 'es' ? 'Selecciona un plazo' : 'Select a timeline' },
    { value: 'urgent', label: language === 'es' ? 'Urgente (menos de 1 mes)' : 'Urgent (less than 1 month)' },
    { value: '1-3-months', label: language === 'es' ? '1-3 meses' : '1-3 months' },
    { value: '3-6-months', label: language === 'es' ? '3-6 meses' : '3-6 months' },
    { value: '6-12-months', label: language === 'es' ? '6-12 meses' : '6-12 months' },
    { value: 'over-12-months', label: language === 'es' ? 'Más de 12 meses' : 'Over 12 months' },
    { value: 'flexible', label: language === 'es' ? 'Flexible' : 'Flexible' },
  ];

  // Contact Information (would come from CMS in production)
  const contactInfo = [
    {
      icon: Mail,
      title: language === 'es' ? 'Email' : 'Email',
      content: 'info@idata.global',
      subContent: language === 'es' ? 'Respuesta en 24 horas' : 'Response in 24 hours',
    },
    {
      icon: Phone,
      title: language === 'es' ? 'Números de contacto' : 'Contact numbers',
      content: 'LATAM (+57) 300 571 3092',
      subContent: 'USA (+1) 303 901 9526',
      additionalContent: language === 'es' ? 'Administrativo (+57) 300 479 91 52' : 'Administrative (+57) 300 479 91 52',
    },
  ];

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

      // RULE 5: If source_type = home or general_cta
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

    if (projectType && !sourceType) {
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

      {/* SECTION 1: Hero Banner */}
      <section className="px-6 sm:px-8 lg:px-12 pt-8 pb-8 mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative min-h-[200px] rounded-3xl overflow-hidden shadow-xl flex items-center bg-gradient-to-br from-blue-900 via-purple-800 to-purple-900">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${contactHeroImage})`,
              }}
            />
            
            {/* Dark overlay for better text readability */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.4) 100%)',
                backdropFilter: 'blur(1px)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-12">
              <div className="max-w-3xl">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {heroContent.title}
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-gray-200 font-light leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {heroContent.description}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Contact Form + Info */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column: Form (3 columns) */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                  {language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
                </h2>

                {/* Contextual Banner - Shows source */}
                {showContextBanner && leadContext.source_title && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-purple-900">
                        {language === 'es' ? 'Estás contactándonos sobre:' : 'You are contacting us about:'}
                        <span className="font-medium ml-1">{leadContext.source_title}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setShowContextBanner(false)}
                      className="flex-shrink-0 text-purple-600 hover:text-purple-800 transition-colors"
                      aria-label={language === 'es' ? 'Cerrar' : 'Close'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Success/Error Messages */}
                <div id="form-result" className="mb-6">
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-green-900 mb-1">
                          {language === 'es' ? 'Gracias por tu mensaje.' : 'Thank you for your message.'}
                        </h3>
                        <p className="text-sm text-green-700">
                          {language === 'es'
                            ? 'Nuestro equipo te responderá pronto.'
                            : 'Our team will respond shortly.'}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-900 mb-1">
                          {language === 'es'
                            ? 'Hubo un problema enviando el mensaje.'
                            : 'There was a problem sending your message.'}
                        </h3>
                        <p className="text-sm text-red-700">
                          {language === 'es' ? 'Intenta nuevamente.' : 'Please try again.'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'es' ? 'Nombre' : 'First name'} *
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        required
                        minLength={2}
                        maxLength={50}
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'es' ? 'Apellido' : 'Last name'} *
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        required
                        minLength={2}
                        maxLength={50}
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'es' ? 'Teléfono' : 'Phone'} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        pattern="[0-9+\-\s()]{8,20}"
                        placeholder="+57 300 123 4567"
                        title={language === 'es' ? 'Formato: +57 300 123 4567' : 'Format: +57 300 123 4567'}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Company & Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'es' ? 'País' : 'Country'} *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        minLength={2}
                        maxLength={50}
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                      />
                    </div>
                  </div>

                  {/* Project Type & Industry */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="project_type" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'es' ? 'Tipo de proyecto' : 'Project type'}
                      </label>
                      <select
                        id="project_type"
                        name="project_type"
                        value={formData.project_type}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3cpath%20d%3D%22M7%207l3%203%203-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3c%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat cursor-pointer"
                      >
                        {projectTypes.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'es' ? 'Industria' : 'Industry'}
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3cpath%20d%3D%22M7%207l3%203%203-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3c%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat cursor-pointer"
                      >
                        {industries.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget_range" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'es' ? 'Presupuesto estimado' : 'Estimated budget'}
                      </label>
                      <select
                        id="budget_range"
                        name="budget_range"
                        value={formData.budget_range}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3cpath%20d%3D%22M7%207l3%203%203-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3c%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat cursor-pointer"
                      >
                        {budgetRanges.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'es' ? 'Plazo' : 'Timeline'}
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3cpath%20d%3D%22M7%207l3%203%203-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3c%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat cursor-pointer"
                      >
                        {timelines.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'es' ? 'Mensaje' : 'Message'} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      minLength={10}
                      maxLength={2000}
                      placeholder={language === 'es'
                        ? 'Cuéntanos sobre tu proyecto y cómo podemos ayudarte...'
                        : 'Tell us about your project and how we can help you...'}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 bg-white hover:border-gray-400 placeholder:text-gray-400"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {language === 'es' ? 'Mínimo 10 caracteres, máximo 2000' : 'Minimum 10 characters, maximum 2000'}
                    </p>
                  </div>

                  {/* Privacy Policy */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy_policy_acceptance"
                      name="privacy_policy_acceptance"
                      required
                      checked={formData.privacy_policy_acceptance}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="privacy_policy_acceptance" className="text-sm text-gray-600">
                      {language === 'es'
                        ? 'Acepto la política de privacidad y el tratamiento de mis datos personales para fines de contacto comercial.'
                        : 'I accept the privacy policy and the processing of my personal data for commercial contact purposes.'} *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {language === 'es' ? 'Enviando...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          {language === 'es' ? 'Enviar mensaje' : 'Send message'}
                          <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Right Column: Contact Information (2 columns) */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 lg:sticky lg:top-24"
              >
                {/* Intro Text */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
                  <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed">
                    {language === 'es'
                      ? 'Nuestro equipo está listo para ayudarte a resolver desafíos en analítica, datos e inteligencia artificial. Cuéntanos sobre tu proyecto y uno de nuestros especialistas se pondrá en contacto contigo.'
                      : 'Our team is ready to help you solve challenges in analytics, data and artificial intelligence. Tell us about your project and one of our specialists will get in touch with you.'}
                  </p>
                </div>

                {/* Contact Info Cards */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                  <h3 className="text-xl font-medium text-gray-900 mb-6">
                    {language === 'es' ? 'Información de contacto' : 'Contact information'}
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-2">{info.title}</h4>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-700 font-medium">{info.content}</p>
                              {info.subContent && (
                                <p className="text-sm text-gray-600">{info.subContent}</p>
                              )}
                              {(info as any).additionalContent && (
                                <p className="text-sm text-gray-600">{(info as any).additionalContent}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {language === 'es' ? 'Tiempo de respuesta' : 'Response time'}
                  </h4>
                  <p className="text-sm text-gray-700 font-light leading-relaxed">
                    {language === 'es'
                      ? 'Nuestro equipo responde todos los mensajes en un plazo máximo de 24 horas hábiles. Para consultas urgentes, puedes contactarnos directamente por teléfono.'
                      : 'Our team responds to all messages within 24 business hours. For urgent inquiries, you can contact us directly by phone.'}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Background blobs */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-50" />
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50" />

            {/* Card */}
            <div
              className="relative rounded-2xl md:rounded-3xl p-8 overflow-hidden border border-white/30"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0.85) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
              }}
            >
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl md:text-2xl lg:text-3xl mb-2 font-light leading-tight tracking-tight text-gray-900">
                      {language === 'es'
                        ? '¿Listo para transformar tu estrategia de datos?'
                        : 'Ready to transform your data strategy?'}
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed font-light">
                      {language === 'es'
                        ? 'Nuestro equipo te está esperando'
                        : 'Our team is waiting for you'}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-end md:flex-shrink-0">
                    <a
                      href="#contact-form"
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-250 hover:shadow-xl hover:scale-[1.02] active:scale-100 group whitespace-nowrap"
                    >
                      {language === 'es' ? 'Contactar ahora' : 'Contact us'}
                      <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}