import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { createJobApplication, type JobApplicationType } from '../../../../services/jobApplicationsService';
import { EXTERNAL_DATA_POLICY_URL } from '../../../shared/constants/legalLinks';

type Language = 'es' | 'en';

interface JobReference {
  id?: string | null;
  title_es?: string;
  title_en?: string;
  slug_es?: string;
  slug_en?: string;
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
  desired_area: string;
  desired_role: string;
  years_of_experience: string;
  availability: string;
  linkedin_url: string;
  portfolio_url: string;
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
  desired_area: '',
  desired_role: '',
  years_of_experience: '',
  availability: '',
  linkedin_url: '',
  portfolio_url: '',
  cover_letter: '',
  salary_expectation: '',
  consent_accepted: false,
};

const NAME_PATTERN = "[A-Za-zÀ-ÿ' -]+";
const PHONE_PATTERN = "[0-9+() -]{8,20}";

export function JobApplicationForm({
  language,
  applicationType,
  job,
  submitLabel,
  onSubmitted,
}: JobApplicationFormProps) {
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

  const appliedToLabel = useMemo(() => {
    if (applicationType === 'open') {
      return language === 'es' ? 'Aplicación espontánea' : 'Open application';
    }

    return language === 'es' ? job?.title_es || '' : job?.title_en || '';
  }, [applicationType, job, language]);

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

    setIsSubmitting(true);

    try {
      await createJobApplication({
        application_type: applicationType,
        job_id: applicationType === 'job' ? job?.id ?? null : null,
        job_title: applicationType === 'job' ? (language === 'es' ? job?.title_es : job?.title_en) ?? null : null,
        job_slug: applicationType === 'job' ? (language === 'es' ? job?.slug_es : job?.slug_en) ?? null : null,
        applied_to_label: appliedToLabel,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country.trim(),
        city: formData.city.trim(),
        desired_area: applicationType === 'open' ? formData.desired_area || undefined : undefined,
        desired_role: applicationType === 'open' ? formData.desired_role.trim() || undefined : undefined,
        years_of_experience: applicationType === 'job' ? formData.years_of_experience || undefined : undefined,
        availability: applicationType === 'job' ? formData.availability || undefined : undefined,
        linkedin_url: formData.linkedin_url.trim() || undefined,
        portfolio_url: formData.portfolio_url.trim() || undefined,
        cover_letter: formData.cover_letter.trim(),
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'es' ? 'Nombre' : 'First name'} *
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'es' ? 'Apellido' : 'Last name'} *
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'es' ? 'Correo electrónico' : 'Email'} *
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'es' ? 'Teléfono' : 'Phone'} *
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'es' ? 'País' : 'Country'} *
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'es' ? 'Ciudad' : 'City'} *
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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

        {applicationType === 'job' ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {language === 'es' ? 'Años de experiencia' : 'Years of experience'} *
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {language === 'es' ? 'Disponibilidad' : 'Availability'} *
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {language === 'es' ? 'Área de interés' : 'Desired area'}
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="desired_area"
                value={formData.desired_area}
                onChange={handleInputChange}
              >
                <option value="">{language === 'es' ? 'Selecciona un área' : 'Select an area'}</option>
                <option value="data-engineering">{language === 'es' ? 'Ingeniería de Datos' : 'Data Engineering'}</option>
                <option value="data-science">{language === 'es' ? 'Ciencia de Datos' : 'Data Science'}</option>
                <option value="analytics">{language === 'es' ? 'Analítica' : 'Analytics'}</option>
                <option value="ai-ml">{language === 'es' ? 'IA & ML' : 'AI & ML'}</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {language === 'es' ? 'Rol deseado' : 'Desired role'}
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength={100}
                name="desired_role"
                type="text"
                value={formData.desired_role}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">LinkedIn {applicationType === 'job' ? '*' : ''}</label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              name="linkedin_url"
              pattern="https://.*"
              placeholder="https://linkedin.com/in/..."
              required={applicationType === 'job'}
              title={language === 'es' ? 'Debe comenzar con https://' : 'Must start with https://'}
              type="url"
              value={formData.linkedin_url}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Portfolio</label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {language === 'es' ? 'CV / Hoja de vida' : 'Resume / CV'} * (PDF, máx. 5MB)
          </label>
          <input
            key={fileInputKey}
            accept=".pdf,application/pdf"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-purple-700 hover:file:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            type="file"
            onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
          />
          <p className="mt-1 text-xs text-gray-500">
            {resumeFile ? resumeFile.name : language === 'es' ? 'Solo archivos PDF.' : 'PDF files only.'}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {applicationType === 'job'
              ? language === 'es'
                ? '¿Por qué te interesa esta posición?'
                : 'Why are you interested in this position?'
              : language === 'es'
                ? 'Cuéntanos sobre ti'
                : 'Tell us about yourself'} *
          </label>
          <textarea
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            maxLength={1000}
            minLength={50}
            name="cover_letter"
            placeholder={
              applicationType === 'job'
                ? language === 'es'
                  ? 'Describe tu motivación y cómo tus habilidades se alinean con la vacante.'
                  : 'Describe your motivation and how your skills align with the role.'
                : language === 'es'
                  ? 'Cuéntanos tu experiencia, tus fortalezas y el tipo de oportunidad que buscas.'
                  : 'Tell us about your experience, strengths and the type of opportunity you are looking for.'
            }
            required
            rows={6}
            value={formData.cover_letter}
            onChange={handleInputChange}
          />
        </div>

        {applicationType === 'job' && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {language === 'es' ? 'Expectativa salarial' : 'Salary expectation'}
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              min={0}
              name="salary_expectation"
              placeholder={language === 'es' ? 'Ej: 5000 USD' : 'E.g. 5000 USD'}
              step={100}
              type="text"
              value={formData.salary_expectation}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className="flex items-start gap-3">
          <input
            checked={formData.consent_accepted}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            id={`job-consent-${applicationType}`}
            name="consent_accepted"
            required
            type="checkbox"
            onChange={handleInputChange}
          />
          <label className="text-sm text-gray-600" htmlFor={`job-consent-${applicationType}`}>
            {language === 'es' ? 'Acepto la ' : 'I accept the '}
            <a
              href={EXTERNAL_DATA_POLICY_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[#0088FF] hover:underline"
            >
              {language === 'es' ? 'política de privacidad y el tratamiento de mis datos personales' : 'privacy policy and the processing of my personal data'}
            </a>{' '}
            {language === 'es' ? 'para fines de reclutamiento.' : 'for recruitment purposes.'}{' '}
            *
          </label>
        </div>

        <div className="pt-4">
          <button
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-purple-700 hover:shadow-lg active:scale-100 disabled:cursor-not-allowed disabled:opacity-70"
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
