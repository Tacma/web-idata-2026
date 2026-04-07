import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, Briefcase, CheckCircle, MapPin, Sparkles } from 'lucide-react';
import { createJobApplication, type JobApplicationType } from '../../../../services/jobApplicationsService';
import { EXTERNAL_DATA_POLICY_URL } from '../../../shared/constants/legalLinks';
import { useTheme } from '../../../shared/contexts/ThemeContext';

type Language = 'es' | 'en';

interface JobReference {
  id?: string | null;
  title_es?: string;
  title_en?: string;
  slug_es?: string;
  slug_en?: string;
  area_es?: string;
  area_en?: string;
  location_es?: string;
  location_en?: string;
  modality?: string;
  seniority?: string;
}

interface JobApplicationFormProps {
  language: Language;
  applicationType: JobApplicationType;
  job?: JobReference | null;
  submitLabel?: string;
  onSubmitted?: () => void;
}

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  full_name: string;
  location_label: string;
  desired_area: string;
  desired_role: string;
  experience_level: string;
  years_of_experience: string;
  availability: string;
  linkedin_url: string;
  portfolio_url: string;
  profile_link: string;
  cover_letter: string;
  salary_expectation: string;
  consent_accepted: boolean;
}

const initialFormState: FormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  full_name: '',
  location_label: '',
  desired_area: '',
  desired_role: '',
  experience_level: '',
  years_of_experience: '',
  availability: '',
  linkedin_url: '',
  portfolio_url: '',
  profile_link: '',
  cover_letter: '',
  salary_expectation: '',
  consent_accepted: false,
};

const NAME_PATTERN = "[A-Za-zÀ-ÿ' -]+";
const PHONE_PATTERN = "[0-9+() -]{8,20}";

const openAreaOptions = [
  { value: 'Data Engineering', labelEs: 'Data Engineering', labelEn: 'Data Engineering' },
  { value: 'Data Analytics / BI', labelEs: 'Data Analytics / BI', labelEn: 'Data Analytics / BI' },
  { value: 'Data Science / AI', labelEs: 'Data Science / AI', labelEn: 'Data Science / AI' },
  { value: 'Product / Project / Delivery', labelEs: 'Product / Project / Delivery', labelEn: 'Product / Project / Delivery' },
  { value: 'UX / UI / Design', labelEs: 'UX / UI / Design', labelEn: 'UX / UI / Design' },
  { value: 'Commercial / Business', labelEs: 'Commercial / Business', labelEn: 'Commercial / Business' },
  { value: 'Other', labelEs: 'Other', labelEn: 'Other' },
];

const experienceOptions = [
  { value: 'Junior', labelEs: 'Junior', labelEn: 'Junior' },
  { value: 'Mid-level', labelEs: 'Mid-level', labelEn: 'Mid-level' },
  { value: 'Senior', labelEs: 'Senior', labelEn: 'Senior' },
  { value: 'Lead / Manager', labelEs: 'Lead / Manager', labelEn: 'Lead / Manager' },
];

function splitFullName(fullName: string) {
  const sanitized = fullName.trim().replace(/\s+/g, ' ');
  if (!sanitized) {
    return { firstName: '', lastName: '' };
  }

  const parts = sanitized.split(' ');
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '.' };
  }

  return {
    firstName: parts.slice(0, -1).join(' '),
    lastName: parts.at(-1) || '.',
  };
}

function splitLocation(locationLabel: string) {
  const sanitized = locationLabel.trim();
  if (!sanitized) {
    return { city: '', country: '' };
  }

  const parts = sanitized
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return {
      city: parts[0],
      country: parts.slice(1).join(', '),
    };
  }

  return {
    city: sanitized,
    country: sanitized,
  };
}

function getModalityLabel(language: Language, modality?: string | null) {
  if (modality === 'hybrid') return language === 'es' ? 'Híbrido' : 'Hybrid';
  if (modality === 'onsite') return language === 'es' ? 'Presencial' : 'On-site';
  return language === 'es' ? 'Remoto' : 'Remote';
}

function getSeniorityLabel(language: Language, seniority?: string | null) {
  if (!seniority) return '';

  const labels: Record<string, { es: string; en: string }> = {
    junior: { es: 'Junior', en: 'Junior' },
    mid: { es: 'Mid-level', en: 'Mid-level' },
    senior: { es: 'Senior', en: 'Senior' },
    lead: { es: 'Lead', en: 'Lead' },
    manager: { es: 'Manager', en: 'Manager' },
  };

  const normalized = labels[String(seniority).toLowerCase()];
  if (normalized) {
    return language === 'es' ? normalized.es : normalized.en;
  }

  return seniority;
}

export function JobApplicationForm({
  language,
  applicationType,
  job,
  submitLabel,
  onSubmitted,
}: JobApplicationFormProps) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setFormData(initialFormState);
    setResumeFile(null);
    setFileInputKey((value) => value + 1);
    setSubmitSuccess(false);
    setSubmitError('');
  }, [applicationType, job?.id, language]);

  const jobTitle = language === 'es' ? job?.title_es || '' : job?.title_en || '';
  const jobArea = language === 'es' ? job?.area_es || '' : job?.area_en || '';
  const jobLocation = language === 'es' ? job?.location_es || '' : job?.location_en || '';
  const jobModality = getModalityLabel(language, job?.modality);
  const jobLevel = getSeniorityLabel(language, job?.seniority);

  const appliedToLabel = useMemo(() => {
    if (applicationType === 'open') {
      return language === 'es' ? 'Aplicación espontánea' : 'Open application';
    }

    return jobTitle;
  }, [applicationType, jobTitle, language]);

  const labelClass = isDark ? 'text-slate-200' : 'text-slate-700';
  const inputClass = isDark
    ? 'border-white/10 bg-slate-950/70 text-white placeholder:text-slate-500 focus:ring-[#0088FF]/30'
    : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-[#0088FF]/25';
  const chipClass = isDark
    ? 'border-white/10 bg-white/6 text-slate-200'
    : 'border-slate-200 bg-slate-50 text-slate-700';
  const mutedTextClass = isDark ? 'text-slate-300' : 'text-slate-600';
  const subtleTextClass = isDark ? 'text-slate-400' : 'text-slate-500';

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked;
      setFormData((current) => ({ ...current, [name]: checked }));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setFormData(initialFormState);
    setResumeFile(null);
    setFileInputKey((value) => value + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitSuccess(false);
    setSubmitError('');

    if (!resumeFile) {
      setSubmitError(language === 'es' ? 'Adjunta tu hoja de vida en PDF.' : 'Please attach your resume in PDF format.');
      return;
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      setSubmitError(language === 'es' ? 'El archivo supera el máximo de 5MB.' : 'The file exceeds the 5MB limit.');
      return;
    }

    const openName = splitFullName(formData.full_name);
    const openLocation = splitLocation(formData.location_label);
    const profileLink = formData.profile_link.trim();
    const inferredLinkedin = profileLink.includes('linkedin.com') ? profileLink : '';
    const inferredPortfolio = profileLink && !profileLink.includes('linkedin.com') ? profileLink : '';

    setIsSubmitting(true);

    try {
      await createJobApplication({
        application_type: applicationType,
        job_id: applicationType === 'job' ? job?.id ?? null : null,
        job_title: applicationType === 'job' ? jobTitle || null : null,
        job_slug: applicationType === 'job' ? (language === 'es' ? job?.slug_es : job?.slug_en) ?? null : null,
        job_area: applicationType === 'job' ? jobArea || null : null,
        job_location: applicationType === 'job' ? jobLocation || null : null,
        job_modality: applicationType === 'job' ? jobModality || null : null,
        job_level: applicationType === 'job' ? jobLevel || null : null,
        spontaneous_application: applicationType === 'open',
        applied_to_label: appliedToLabel,
        first_name: applicationType === 'open' ? openName.firstName : formData.first_name.trim(),
        last_name: applicationType === 'open' ? openName.lastName : formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: applicationType === 'open' ? openLocation.country : formData.country.trim(),
        city: applicationType === 'open' ? openLocation.city : formData.city.trim(),
        desired_area: applicationType === 'open' ? formData.desired_area || undefined : undefined,
        desired_role: applicationType === 'open' ? undefined : undefined,
        experience_level: applicationType === 'open' ? formData.experience_level || undefined : undefined,
        years_of_experience: applicationType === 'job' ? formData.years_of_experience || undefined : undefined,
        availability: applicationType === 'job' ? formData.availability || undefined : undefined,
        linkedin_url: applicationType === 'open' ? inferredLinkedin || undefined : formData.linkedin_url.trim() || undefined,
        portfolio_url:
          applicationType === 'open'
            ? inferredPortfolio || undefined
            : formData.portfolio_url.trim() || undefined,
        cover_letter:
          applicationType === 'open'
            ? formData.cover_letter.trim() ||
              (language === 'es'
                ? 'Postulación espontánea enviada desde la página de Careers.'
                : 'Open application submitted from the Careers page.')
            : formData.cover_letter.trim(),
        salary_expectation: applicationType === 'job' ? formData.salary_expectation.trim() || undefined : undefined,
        consent_accepted: formData.consent_accepted,
        language,
        source_page: window.location.pathname,
        source_url: window.location.href,
        resume_file: resumeFile,
      });

      setSubmitSuccess(true);
      resetForm();
      onSubmitted?.();
    } catch (error) {
      console.error('Error submitting job application:', error);
      setSubmitError(
        language === 'es'
          ? 'No pudimos enviar tu postulación. Revisa el archivo y vuelve a intentarlo.'
          : 'We could not submit your application. Please review the file and try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <div className="space-y-6">
      {applicationType === 'job' && jobTitle && (
        <div className={`rounded-[28px] border p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/55' : 'border-slate-200 bg-white/85'}`}>
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-[#0088FF]/10 p-3 text-[#0088FF]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                  {language === 'es' ? 'Aplicando a' : 'Applying to'}
                </p>
                <p className={`mt-2 text-xl font-light ${isDark ? 'text-white' : 'text-slate-900'}`}>{jobTitle}</p>
              </div>
              <div className={`flex flex-wrap gap-2 text-sm ${mutedTextClass}`}>
                {jobArea && (
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${chipClass}`}>
                    <Briefcase className="h-4 w-4 text-[#0088FF]" />
                    {jobArea}
                  </span>
                )}
                {jobLocation && (
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${chipClass}`}>
                    <MapPin className="h-4 w-4 text-[#0088FF]" />
                    {jobLocation}
                  </span>
                )}
                {jobModality && <span className={`rounded-full border px-3 py-1.5 ${chipClass}`}>{jobModality}</span>}
                {jobLevel && <span className={`rounded-full border px-3 py-1.5 ${chipClass}`}>{jobLevel}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {submitSuccess && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-medium">
                  {language === 'es' ? 'Tu postulación fue recibida.' : 'Your application was received.'}
                </p>
                <p className="mt-1 text-green-700">
                  {language === 'es'
                    ? 'Nuestro equipo podrá verla en el inbox de postulaciones.'
                    : 'Our team can now review it in the applications inbox.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {submitError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <p>{submitError}</p>
            </div>
          </div>
        )}
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {applicationType === 'open' ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Nombre completo' : 'Full name'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  maxLength={80}
                  minLength={3}
                  name="full_name"
                  required
                  type="text"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Correo electrónico' : 'Email'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  maxLength={100}
                  name="email"
                  placeholder={language === 'es' ? 'tu@correo.com' : 'you@email.com'}
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Teléfono' : 'Phone'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  name="phone"
                  pattern={PHONE_PATTERN}
                  placeholder="+57 300 123 4567"
                  required
                  title={language === 'es' ? 'Formato: +57 300 123 4567' : 'Format: +57 300 123 4567'}
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Ubicación' : 'Location'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  maxLength={120}
                  name="location_label"
                  placeholder={language === 'es' ? 'Bogotá, Colombia' : 'Bogota, Colombia'}
                  required
                  type="text"
                  value={formData.location_label}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Área de interés' : 'Area of interest'} *
                </label>
                <select
                  className={`ui-select w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  name="desired_area"
                  required
                  value={formData.desired_area}
                  onChange={handleInputChange}
                >
                  <option value="">{language === 'es' ? 'Selecciona un área' : 'Select an area'}</option>
                  {openAreaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {language === 'es' ? option.labelEs : option.labelEn}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Nivel de experiencia' : 'Experience level'} *
                </label>
                <select
                  className={`ui-select w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  name="experience_level"
                  required
                  value={formData.experience_level}
                  onChange={handleInputChange}
                >
                  <option value="">{language === 'es' ? 'Selecciona un nivel' : 'Select a level'}</option>
                  {experienceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {language === 'es' ? option.labelEs : option.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          <div>
              <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                {language === 'es' ? 'LinkedIn o portfolio' : 'LinkedIn or portfolio'} *
              </label>
              <input
                className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                name="profile_link"
                pattern="https://.*"
                placeholder="https://linkedin.com/in/... | https://portfolio.com"
                required
                title={language === 'es' ? 'Debe comenzar con https://' : 'Must start with https://'}
                type="url"
                value={formData.profile_link}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Nombre' : 'First name'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  maxLength={50}
                  minLength={2}
                  name="first_name"
                  pattern={NAME_PATTERN}
                  required
                  title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Apellido' : 'Last name'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  maxLength={50}
                  minLength={2}
                  name="last_name"
                  pattern={NAME_PATTERN}
                  required
                  title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Correo electrónico' : 'Email'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  maxLength={100}
                  name="email"
                  placeholder={language === 'es' ? 'tu@correo.com' : 'you@email.com'}
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Teléfono' : 'Phone'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  name="phone"
                  pattern={PHONE_PATTERN}
                  placeholder="+57 300 123 4567"
                  required
                  title={language === 'es' ? 'Formato: +57 300 123 4567' : 'Format: +57 300 123 4567'}
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'País' : 'Country'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  maxLength={50}
                  minLength={2}
                  name="country"
                  pattern={NAME_PATTERN}
                  required
                  title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                  type="text"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Ciudad' : 'City'} *
                </label>
                <input
                  className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  maxLength={50}
                  minLength={2}
                  name="city"
                  pattern={NAME_PATTERN}
                  required
                  title={language === 'es' ? 'Solo letras y espacios' : 'Only letters and spaces'}
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Años de experiencia' : 'Years of experience'} *
                </label>
                <select
                  className={`ui-select w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  name="years_of_experience"
                  required
                  value={formData.years_of_experience}
                  onChange={handleInputChange}
                >
                  <option value="">{language === 'es' ? 'Selecciona' : 'Select'}</option>
                  <option value="0-2">0-2</option>
                  <option value="3-5">3-5</option>
                  <option value="6-10">6-10</option>
                  <option value="10+">10+</option>
                </select>
              </div>
              <div>
                <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
                  {language === 'es' ? 'Disponibilidad' : 'Availability'} *
                </label>
                <select
                  className={`ui-select w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleInputChange}
                >
                  <option value="">{language === 'es' ? 'Selecciona' : 'Select'}</option>
                  <option value="immediate">{language === 'es' ? 'Inmediata' : 'Immediate'}</option>
                  <option value="2-weeks">{language === 'es' ? '2 semanas' : '2 weeks'}</option>
                  <option value="1-month">{language === 'es' ? '1 mes' : '1 month'}</option>
                  <option value="negotiable">{language === 'es' ? 'A negociar' : 'Negotiable'}</option>
                </select>
              </div>
            </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={`mb-2 block text-sm font-medium ${labelClass}`}>LinkedIn *</label>
              <input
                className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  name="linkedin_url"
                  pattern="https://.*"
                  placeholder="https://linkedin.com/in/..."
                  required
                  title={language === 'es' ? 'Debe comenzar con https://' : 'Must start with https://'}
                  type="url"
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                />
            </div>
            <div>
              <label className={`mb-2 block text-sm font-medium ${labelClass}`}>Portfolio</label>
              <input
                className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
                  name="portfolio_url"
                  pattern="https://.*"
                  placeholder="https://..."
                  title={language === 'es' ? 'Debe comenzar con https://' : 'Must start with https://'}
                  type="url"
                  value={formData.portfolio_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>
        )}

        <div>
          <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
            {language === 'es' ? 'CV / Hoja de vida' : 'Resume / CV'} * (PDF, máx. 5MB)
          </label>
          <input
            key={fileInputKey}
            accept=".pdf,application/pdf"
            className={`w-full rounded-2xl border px-4 py-3 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#0088FF] hover:file:bg-[#0088FF]/15 focus:outline-none focus:ring-2 file:bg-[#0088FF]/10 ${inputClass}`}
            required
            type="file"
            onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
          />
          <p className={`mt-1 text-xs ${subtleTextClass}`}>
            {resumeFile ? resumeFile.name : language === 'es' ? 'Solo archivos PDF.' : 'PDF files only.'}
          </p>
        </div>

        <div>
          <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
            {applicationType === 'job'
              ? language === 'es'
                ? '¿Por qué te interesa esta posición?'
                : 'Why are you interested in this position?'
              : language === 'es'
                ? 'Mensaje breve'
                : 'Short message'}
            {applicationType === 'job' ? ' *' : ''}
          </label>
          <textarea
            className={`w-full resize-none rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
            maxLength={1000}
            minLength={applicationType === 'job' ? 50 : 0}
            name="cover_letter"
            placeholder={
              applicationType === 'job'
                ? language === 'es'
                  ? 'Describe tu motivación y cómo tus habilidades se alinean con la vacante.'
                  : 'Describe your motivation and how your skills align with the role.'
                : language === 'es'
                  ? 'Opcional. Cuéntanos brevemente qué tipo de oportunidad te gustaría encontrar en iData.'
                  : 'Optional. Briefly tell us what kind of opportunity you would like to find at iData.'
            }
            required={applicationType === 'job'}
            rows={applicationType === 'job' ? 6 : 5}
            value={formData.cover_letter}
            onChange={handleInputChange}
          />
        </div>

        {applicationType === 'job' && (
          <div>
            <label className={`mb-2 block text-sm font-medium ${labelClass}`}>
              {language === 'es' ? 'Expectativa salarial' : 'Salary expectation'}
            </label>
            <input
              className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 ${inputClass}`}
              name="salary_expectation"
              placeholder={language === 'es' ? 'Ej: 5000 USD' : 'E.g. 5000 USD'}
              type="text"
              value={formData.salary_expectation}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className={`flex items-start gap-3 rounded-2xl border px-4 py-4 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-slate-50/80'}`}>
          <input
            checked={formData.consent_accepted}
            className={`mt-1 h-4 w-4 rounded text-[#0088FF] focus:ring-[#0088FF] ${isDark ? 'border-white/20 bg-slate-950' : 'border-slate-300'}`}
            id={`job-consent-${applicationType}`}
            name="consent_accepted"
            required
            type="checkbox"
            onChange={handleInputChange}
          />
          <label className={`text-sm leading-relaxed ${mutedTextClass}`} htmlFor={`job-consent-${applicationType}`}>
            {language === 'es'
              ? 'Autorizo el tratamiento de mis datos personales para procesos de atracción y selección de talento de iData Global, de acuerdo con la '
              : 'I authorize the processing of my personal data for iData Global talent attraction and hiring processes, in accordance with the '}
            <a
              href={EXTERNAL_DATA_POLICY_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[#0088FF] hover:underline"
            >
              {language === 'es' ? 'política de privacidad y tratamiento de datos vigente' : 'current privacy and data processing policy'}
            </a>
            .
          </label>
        </div>

        <div className="pt-2">
          <button
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.01] hover:bg-slate-800 hover:shadow-[0_18px_34px_rgba(15,23,42,0.18)] active:scale-100 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting
              ? language === 'es'
                ? 'Enviando...'
                : 'Submitting...'
              : submitLabel || (language === 'es' ? 'Enviar aplicación' : 'Submit application')}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
