import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, Users } from 'lucide-react';
import { SEOHead } from '../../shared/components/SEOHead';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { EXTERNAL_DATA_POLICY_URL } from '../../shared/constants/legalLinks';
import { getInsightEventBySlug, getInsightEvents } from '../../../services/insightMomentumService';
import { useTheme } from '../../shared/contexts/ThemeContext';

function formatEventDate(value: string | undefined, language: 'es' | 'en') {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(language === 'es' ? 'es-CO' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<any | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    notes: '',
    dataConsent: false,
    updatesConsent: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) {
        if (!cancelled) {
          setEvent(null);
          setRelatedEvents([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);

      try {
        const [currentEvent, events] = await Promise.all([
          getInsightEventBySlug(language, slug),
          getInsightEvents(language),
        ]);

        if (!cancelled) {
          setEvent(currentEvent);
          setRelatedEvents(events.filter((item) => item.slug !== slug).slice(0, 3));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading event detail:', error);
        if (!cancelled) {
          setEvent(null);
          setRelatedEvents([]);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language, slug]);

  if (!loading && !event) {
    return <Navigate to={`/${language}/insights/`} replace />;
  }

  if (loading || !event) return null;

  const formattedDate = formatEventDate(event.isoDate, language);

  return (
    <>
      <SEOHead
        title={`${event.title} - iData`}
        description={event.description}
        canonical={`/${language}/insights/events/${event.slug}/`}
        alternateES={`/es/insights/events/${event.slug}/`}
        alternateEN={`/en/insights/events/${event.slug}/`}
        language={language}
      />

      <section className={`pb-16 pt-28 md:pt-32 ${isDark ? 'bg-[linear-gradient(180deg,#07101d_0%,#0b1527_100%)]' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <Link
              to={`/${language}/insights/#${language === 'es' ? 'eventos' : 'events'}`}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${isDark ? 'border-white/12 bg-white/6 text-slate-200 hover:border-white/20 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'}`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{language === 'es' ? 'Volver a eventos' : 'Back to events'}</span>
            </Link>
          </div>

          <div className={`relative overflow-hidden rounded-[32px] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-8 ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(10,20,38,0.96)_0%,rgba(12,22,40,0.94)_100%)] shadow-[0_24px_60px_rgba(2,6,23,0.32)]' : 'border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]'}`}>
            <div className={`pointer-events-none absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.12),transparent_26%),radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_34%)]' : 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.08),transparent_26%),radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_34%)]'}`} />
            <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_380px]">
              <div>
                <div className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'border-sky-300/20 bg-sky-400/10 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-700'}`}>
                  {language === 'es' ? 'Agenda del evento' : 'Event agenda'}
                </div>
                <h1 className={`mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[0.94] tracking-[-0.05em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {event.title}
                </h1>
                <p className={`mt-4 max-w-3xl text-lg leading-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {event.description}
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className={`rounded-[22px] border p-4 ${isDark ? 'border-sky-300/16 bg-[linear-gradient(180deg,rgba(9,25,44,0.92)_0%,rgba(9,20,36,0.92)_100%)]' : 'border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]'}`}>
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-sky-600" />
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                          {language === 'es' ? 'Fecha y hora' : 'Date and time'}
                        </p>
                        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-[22px] border p-4 ${isDark ? 'border-fuchsia-300/16 bg-[linear-gradient(180deg,rgba(33,18,45,0.92)_0%,rgba(20,16,35,0.92)_100%)]' : 'border-fuchsia-100 bg-[linear-gradient(180deg,#ffffff_0%,#fff8fd_100%)]'}`}>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-fuchsia-600" />
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                          {language === 'es' ? 'Formato y lugar' : 'Format and location'}
                        </p>
                        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.format}</p>
                        <p className={`text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{event.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-[22px] border p-4 ${isDark ? 'border-cyan-300/16 bg-[linear-gradient(180deg,rgba(10,28,44,0.92)_0%,rgba(9,20,36,0.92)_100%)]' : 'border-cyan-100 bg-[linear-gradient(180deg,#ffffff_0%,#f6fcff_100%)]'}`}>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-cyan-600" />
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                          {language === 'es' ? 'Perfil recomendado' : 'Recommended audience'}
                        </p>
                        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.audience.join(' · ')}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-[22px] border p-4 ${isDark ? 'border-emerald-300/16 bg-[linear-gradient(180deg,rgba(10,32,28,0.92)_0%,rgba(9,20,24,0.92)_100%)]' : 'border-emerald-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fffb_100%)]'}`}>
                    <div className="flex items-center gap-3">
                      <Clock3 className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                          {language === 'es' ? 'Consideraciones' : 'Notes'}
                        </p>
                        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.seatsNote}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <div className={`rounded-[24px] border p-5 backdrop-blur-sm ${isDark ? 'border-sky-300/16 bg-[#0f1a2d]/88' : 'border-sky-100 bg-white/90'}`}>
                    <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                      {language === 'es' ? 'Lo que verás' : 'What you will cover'}
                    </p>
                    <div className="mt-4 space-y-4">
                      {event.agenda.map((item, index) => (
                        <div key={`${item.time}-${item.title}`} className="flex gap-4">
                          <div className="flex w-16 shrink-0 flex-col items-center">
                            <div className={`flex min-h-[72px] w-full items-center justify-center rounded-[18px] border px-3 py-1 text-center text-xs font-semibold ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                              {item.time}
                            </div>
                            {index < event.agenda.length - 1 ? (
                              <div className={`mt-2 h-full w-px ${isDark ? 'bg-white/12' : 'bg-slate-200'}`} />
                            ) : null}
                          </div>
                          <div className="pt-1">
                            <h2 className={`text-base font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>{item.title}</h2>
                            <p className={`mt-1 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className={`rounded-[24px] border p-5 backdrop-blur-sm ${isDark ? 'border-fuchsia-300/16 bg-[#171428]/88' : 'border-fuchsia-100 bg-white/90'}`}>
                      <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                        {language === 'es' ? 'Qué te llevas' : 'What you will take away'}
                      </p>
                      <ul className="mt-4 space-y-3">
                        {event.takeaways.map((item) => (
                          <li key={item} className={`flex gap-3 text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`rounded-[24px] border p-5 backdrop-blur-sm ${isDark ? 'border-cyan-300/16 bg-[#101b2d]/88' : 'border-cyan-100 bg-white/90'}`}>
                      <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                        {language === 'es' ? 'Quiénes participan' : 'Who is joining'}
                      </p>
                      <div className="mt-4 space-y-3">
                        {event.speakers.map((speaker) => (
                          <div key={`${speaker.name}-${speaker.role}`} className={`rounded-[18px] border px-4 py-3 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-slate-50/90'}`}>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>{speaker.name}</p>
                            <p className={`mt-1 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{speaker.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <aside>
                <div className={`sticky top-28 rounded-[28px] border p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(11,21,38,0.98)_0%,rgba(14,22,40,0.96)_54%,rgba(22,18,35,0.96)_100%)] shadow-[0_24px_54px_rgba(2,6,23,0.34)]' : 'border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_54%,#fff7fc_100%)]'}`}>
                  <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                    {event.registrationTitle}
                  </p>
                  <h2 className={`mt-3 text-2xl font-medium tracking-[-0.03em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {language === 'es' ? 'Inscripción rápida' : 'Quick registration'}
                  </h2>
                  <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {event.registrationDescription}
                  </p>

                  {isSubmitted ? (
                    <div className={`mt-6 rounded-[22px] border p-5 ${isDark ? 'border-emerald-300/20 bg-[linear-gradient(180deg,rgba(10,32,28,0.96)_0%,rgba(8,22,20,0.96)_100%)]' : 'border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#f7fffb_100%)]'}`}>
                      <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-emerald-200' : 'text-emerald-700'}`}>
                        {language === 'es' ? 'Inscripción confirmada' : 'Registration confirmed'}
                      </p>
                      <h3 className={`mt-3 text-xl font-medium tracking-[-0.03em] ${isDark ? 'text-emerald-50' : 'text-emerald-950'}`}>
                        {language === 'es' ? 'Ya te inscribiste a este evento.' : 'You are already registered for this event.'}
                      </h3>
                      <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-emerald-100/90' : 'text-emerald-900'}`}>
                        {language === 'es'
                          ? `Gracias ${form.fullName}. Recibirás un correo de confirmación en ${form.email} con la información general de tu asistencia y los siguientes pasos.`
                          : `Thank you ${form.fullName}. You will receive a confirmation email at ${form.email} with general attendance information and next steps.`}
                      </p>
                      <div className={`mt-4 rounded-[18px] border p-4 ${isDark ? 'border-emerald-300/16 bg-white/6' : 'border-emerald-200 bg-white/80'}`}>
                        <p className={`text-sm font-medium ${isDark ? 'text-emerald-50' : 'text-emerald-950'}`}>{event.title}</p>
                        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-emerald-100/90' : 'text-emerald-900'}`}>{formattedDate}</p>
                        <p className={`text-sm leading-6 ${isDark ? 'text-emerald-100/80' : 'text-emerald-800'}`}>{event.location}</p>
                        {form.updatesConsent && (
                          <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-emerald-100/80' : 'text-emerald-800'}`}>
                            {language === 'es'
                              ? 'También quedaste suscrito para recibir próximos eventos y novedades de iData.'
                              : 'You are also subscribed to receive upcoming events and iData updates.'}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <form
                      className="mt-6 space-y-4"
                      onSubmit={(eventSubmit) => {
                        eventSubmit.preventDefault();
                        setIsSubmitted(true);
                      }}
                    >
                      <div>
                        <label className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {language === 'es' ? 'Nombre completo' : 'Full name'}
                        </label>
                        <Input
                          value={form.fullName}
                          onChange={(eventChange) => setForm((current) => ({ ...current, fullName: eventChange.target.value }))}
                          placeholder={language === 'es' ? 'Tu nombre y apellido' : 'Your full name'}
                          className={`min-h-12 rounded-xl ${isDark ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-gray-200 bg-white'}`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Email</label>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(eventChange) => setForm((current) => ({ ...current, email: eventChange.target.value }))}
                          placeholder="nombre@empresa.com"
                          className={`min-h-12 rounded-xl ${isDark ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-gray-200 bg-white'}`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {language === 'es' ? 'Empresa' : 'Company'}
                        </label>
                        <Input
                          value={form.company}
                          onChange={(eventChange) => setForm((current) => ({ ...current, company: eventChange.target.value }))}
                          placeholder={language === 'es' ? 'Nombre de tu empresa' : 'Your company name'}
                          className={`min-h-12 rounded-xl ${isDark ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-gray-200 bg-white'}`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {language === 'es' ? 'Cargo' : 'Role'}
                        </label>
                        <Input
                          value={form.role}
                          onChange={(eventChange) => setForm((current) => ({ ...current, role: eventChange.target.value }))}
                          placeholder={language === 'es' ? 'Ej. CTO, Data Lead, COO' : 'e.g. CTO, Data Lead, COO'}
                          className={`min-h-12 rounded-xl ${isDark ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-gray-200 bg-white'}`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {language === 'es' ? 'Mensaje opcional' : 'Optional note'}
                        </label>
                        <Textarea
                          rows={3}
                          value={form.notes}
                          onChange={(eventChange) => setForm((current) => ({ ...current, notes: eventChange.target.value }))}
                          placeholder={language === 'es' ? 'Cuéntanos qué te interesa revisar en el evento.' : 'Tell us what you want to review in the event.'}
                          className={`rounded-xl ${isDark ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-gray-200 bg-white'}`}
                        />
                      </div>

                      <div className={`space-y-4 rounded-[22px] border p-4 ${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200 bg-white'}`}>
                        <label className="flex items-start gap-3">
                          <Checkbox
                            checked={form.dataConsent}
                            onCheckedChange={(checked) => setForm((current) => ({ ...current, dataConsent: checked === true }))}
                            required
                          />
                          <span className={`text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                            {language === 'es' ? 'Acepto el tratamiento de mis datos personales de acuerdo con la ' : 'I accept the processing of my personal data according to the '}
                            <a className={`font-medium underline-offset-4 hover:underline ${isDark ? 'text-sky-300' : 'text-sky-700'}`} href={EXTERNAL_DATA_POLICY_URL} target="_blank" rel="noreferrer">
                              {language === 'es' ? 'política de privacidad' : 'privacy policy'}
                            </a>
                            .
                          </span>
                        </label>

                        <label className="flex items-start gap-3">
                          <Checkbox
                            checked={form.updatesConsent}
                            onCheckedChange={(checked) => setForm((current) => ({ ...current, updatesConsent: checked === true }))}
                          />
                          <span className={`text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                            {language === 'es'
                              ? 'Quiero recibir información de próximos eventos, invitaciones y novedades de iData.'
                              : 'I want to receive information about upcoming events, invitations, and iData updates.'}
                          </span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:scale-[1.02] active:scale-100"
                      >
                        <span>{language === 'es' ? 'Inscribirme al evento' : 'Register for the event'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              </aside>
            </div>
          </div>

          {relatedEvents.length > 0 && (
            <div className={`mt-8 rounded-[32px] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-8 ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(10,20,38,0.96),rgba(12,22,40,0.94))] shadow-[0_24px_60px_rgba(2,6,23,0.32)]' : 'border-slate-200 bg-white'}`}>
              <div className="mb-5">
                <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                  {language === 'es' ? 'Otros eventos' : 'Other events'}
                </p>
                <h2 className={`mt-2 text-2xl font-medium tracking-[-0.03em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {language === 'es' ? 'Otros eventos que te podrían interesar' : 'Other events you may be interested in'}
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {relatedEvents.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`relative overflow-hidden rounded-[24px] border p-5 transition hover:-translate-y-0.5 ${
                      isDark
                        ? index % 3 === 0
                          ? 'border-sky-300/16 bg-[linear-gradient(180deg,rgba(8,18,34,0.98)_0%,rgba(9,30,52,0.96)_100%)]'
                          : index % 3 === 1
                            ? 'border-fuchsia-300/16 bg-[linear-gradient(180deg,rgba(17,16,34,0.98)_0%,rgba(36,18,48,0.94)_100%)]'
                            : 'border-cyan-300/16 bg-[linear-gradient(180deg,rgba(8,18,34,0.98)_0%,rgba(10,28,44,0.94)_100%)]'
                        :
                      index % 3 === 0
                        ? 'border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]'
                        : index % 3 === 1
                          ? 'border-fuchsia-100 bg-[linear-gradient(180deg,#ffffff_0%,#fff8fc_100%)]'
                          : 'border-cyan-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fcff_100%)]'
                    }`}
                  >
                    <div className={`absolute inset-y-0 left-0 w-1.5 ${
                      index % 3 === 0 ? 'bg-sky-300' : index % 3 === 1 ? 'bg-fuchsia-300' : 'bg-cyan-300'
                    }`} />
                    <div className="pl-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${
                            index % 3 === 0 ? isDark ? 'text-sky-300' : 'text-sky-600' : index % 3 === 1 ? isDark ? 'text-fuchsia-300' : 'text-fuchsia-600' : isDark ? 'text-cyan-300' : 'text-cyan-600'
                          }`}>
                            {item.label}
                          </p>
                          <p className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.meta}
                          </p>
                        </div>
                      </div>
                      <h3 className={`mt-4 text-xl font-medium leading-[1.08] tracking-[-0.04em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {item.title}
                      </h3>
                      <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
                      <span className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold ${isDark ? 'border-white/12 bg-white/6 text-white' : 'border-slate-200 bg-white text-slate-950'}`}>
                        <span>{language === 'es' ? 'Ver evento' : 'View event'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
