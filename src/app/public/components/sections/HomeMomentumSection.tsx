import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CalendarDays, Newspaper, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Language } from '../../../shared/types';
import { Checkbox } from '../../../components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { getPublished as getPublishedBlogPosts } from '../../../../services/blogService';
import { getInsightEvents, getInsightLabs } from '../../../../services/insightMomentumService';
import { EXTERNAL_DATA_POLICY_URL } from '../../../shared/constants/legalLinks';
import { useTheme } from '../../../shared/contexts/ThemeContext';

interface HomeMomentumSectionProps {
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

interface MomentumItem {
  category: 'events' | 'news' | 'labs';
  eyebrow: string;
  label: string;
  title: string;
  description: string;
  href: string;
  backgroundImage?: string | null;
  accentClass: string;
  panelClass: string;
  meta: string;
}

function formatPublishDate(value: string | undefined, language: Language) {
  if (!value) return language === 'es' ? 'Próximamente' : 'Coming soon';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return language === 'es' ? 'Actualidad iData' : 'iData update';
  }

  return new Intl.DateTimeFormat(language === 'es' ? 'es-CO' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function HomeMomentumSection({ language, getLocalizedValue }: HomeMomentumSectionProps) {
  const { isDark } = useTheme();
  const [articles, setArticles] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [labs, setLabs] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionForm, setSubscriptionForm] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    country: '',
    interests: '',
    notes: '',
    updatesConsent: false,
    privacyConsent: false,
  });
  const insightsHref = `/${language}/insights/`;
  const privacyHref = EXTERNAL_DATA_POLICY_URL;
  const cookiesHref = EXTERNAL_DATA_POLICY_URL;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [blogPosts, eventsData, labsData] = await Promise.all([
          getPublishedBlogPosts(language),
          getInsightEvents(language),
          getInsightLabs(language),
        ]);
        if (!cancelled) {
          setArticles(blogPosts.slice(0, 3));
          setEvents(eventsData);
          setLabs(labsData);
        }
      } catch (error) {
        console.error('Error loading momentum insights:', error);
        if (!cancelled) {
          setArticles([]);
          setEvents([]);
          setLabs([]);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language]);

  const newsCards = useMemo(() => {
    if (articles.length > 0) {
      return articles.map((article, index) => ({
        title: getLocalizedValue(article.title_es, article.title_en),
        description: getLocalizedValue(article.excerpt_es, article.excerpt_en),
        date: formatPublishDate(article.published_date, language),
        href: `/${language}/insights/${getLocalizedValue(article.slug_es, article.slug_en)}`,
        image: article.featuredImage || article.featured_image || null,
        label:
          index === 0
            ? language === 'es'
              ? 'Publicación reciente'
              : 'Recent publish'
            : language === 'es'
              ? 'Insight destacado'
              : 'Featured insight',
      }));
    }

    return [
      {
        title: language === 'es' ? 'Nuevos insights sobre modernización de datos' : 'New insights on data modernization',
        description: language === 'es'
          ? 'Conoce cómo estamos abordando hojas de ruta cloud, gobierno y adopción de IA en organizaciones regionales.'
          : 'See how we are approaching cloud roadmaps, governance, and AI adoption across regional organizations.',
        date: language === 'es' ? 'Actualización editorial' : 'Editorial update',
        href: insightsHref,
        image: null,
        label: language === 'es' ? 'Publicación reciente' : 'Recent publish',
      },
      {
        title: language === 'es' ? 'Tendencias que estamos siguiendo en Data & AI' : 'Data & AI trends we are tracking',
        description: language === 'es'
          ? 'Explora las ideas, noticias y aprendizajes más recientes que estamos compartiendo desde iData.'
          : 'Explore the latest ideas, news, and learnings we are sharing from iData.',
        date: language === 'es' ? 'Últimas noticias' : 'Latest updates',
        href: insightsHref,
        image: null,
        label: language === 'es' ? 'Radar editorial' : 'Editorial radar',
      },
      {
        title: language === 'es' ? 'Cómo están evolucionando las plataformas modernas' : 'How modern platforms are evolving',
        description: language === 'es'
          ? 'Una mirada rápida a las prioridades tecnológicas que estamos viendo en equipos de datos e IA.'
          : 'A quick look at the technology priorities we are seeing across data and AI teams.',
        date: language === 'es' ? 'Lectura recomendada' : 'Recommended read',
        href: insightsHref,
        image: null,
        label: language === 'es' ? 'Selección iData' : 'iData pick',
      },
    ];
  }, [articles, getLocalizedValue, insightsHref, language]);

  const spotlightItems = useMemo<MomentumItem[]>(
    () => {
      if (!events[0] || !labs[0] || !newsCards[0]) return [];

      return [
        {
          category: 'events',
          eyebrow: language === 'es' ? 'Próximo evento' : 'Upcoming event',
          label: events[0].label,
          title: events[0].title,
          description: events[0].description,
          href: events[0].href,
          backgroundImage: events[0].image,
          accentClass: 'bg-sky-100 text-sky-700 border-sky-200',
          panelClass: 'from-sky-500/34 via-cyan-400/24 to-sky-950/18',
          meta: events[0].meta,
        },
        {
          category: 'news',
          eyebrow: language === 'es' ? 'Última noticia' : 'Latest story',
          label: newsCards[0].label,
          title: newsCards[0].title,
          description: newsCards[0].description,
          href: newsCards[0].href,
          backgroundImage: newsCards[0].image,
          accentClass: 'bg-slate-100 text-slate-700 border-slate-200',
          panelClass: 'from-slate-600/30 via-indigo-500/22 to-slate-950/20',
          meta: newsCards[0].date,
        },
        {
          category: 'labs',
          eyebrow: language === 'es' ? 'Ahora construyendo' : 'Now building',
          label: labs[0].label,
          title: labs[0].title,
          description: labs[0].description,
          href: labs[0].href,
          backgroundImage: labs[0].image,
          accentClass: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
          panelClass: 'from-fuchsia-500/34 via-violet-500/24 to-slate-950/16',
          meta: labs[0].meta,
        },
      ];
    },
    [events, labs, language, newsCards]
  );

  useEffect(() => {
    if (spotlightItems.length === 0) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % spotlightItems.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [spotlightItems.length]);

  const activeItem = spotlightItems[activeIndex] || spotlightItems[0];
  const hasBackdropImage = Boolean(activeItem?.backgroundImage);
  const sectionEyebrow = language === 'es' ? 'Noticias y eventos' : 'News and events';
  const sectionTitle = language === 'es' ? 'Noticias y eventos iData' : 'iData news and events';
  const sectionDescription = language === 'es'
    ? 'Entérate aquí de lo último que está pasando en iData, los próximos eventos y en qué estamos trabajando ahora.'
    : 'Stay up to date with the latest at iData, upcoming events, and what we are currently building.';

  if (spotlightItems.length === 0) {
    return null;
  }

  function updateFormField<Key extends keyof typeof subscriptionForm>(field: Key, value: (typeof subscriptionForm)[Key]) {
    setSubscriptionForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubscribeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubscribed(true);
  }

  return (
    <section className="relative overflow-hidden px-5 py-12 sm:px-8 lg:px-12 lg:py-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.08),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          className="mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-500 dark:text-sky-300">
            {sectionEyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(2.1rem,10vw,4.7rem)] font-light leading-[0.92] tracking-[-0.06em] text-[var(--text-strong)]">
            {sectionTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-body)]">
            {sectionDescription}
          </p>
          <Dialog
            open={isSubscribeOpen}
            onOpenChange={(open) => {
              setIsSubscribeOpen(open);
              if (!open) setIsSubscribed(false);
            }}
          >
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--surface-0)] px-6 py-3 text-sm font-medium text-[var(--text-strong)] transition-all duration-300 hover:border-sky-300/40 hover:bg-[var(--surface-1)] sm:w-auto"
              >
                <span>{language === 'es' ? 'Suscribirme a noticias y eventos' : 'Subscribe to news and events'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[88vh] max-w-[min(720px,calc(100%-1.5rem))] overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-0 shadow-[0_32px_90px_rgba(15,23,42,0.22)]">
              <div className="p-6 sm:p-7">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-slate-950">
                    {language === 'es' ? 'Suscríbete a noticias y eventos de iData' : 'Subscribe to iData news and events'}
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-6 text-slate-600">
                    {language === 'es'
                      ? 'Recibe invitaciones, novedades editoriales y señales de lo que estamos desarrollando. Completa tus datos y autoriza el tratamiento de información para enviarte actualizaciones.'
                      : 'Receive invitations, editorial updates, and signals about what we are building. Fill in your details and authorize data processing so we can send you updates.'}
                  </DialogDescription>
                </DialogHeader>

                {isSubscribed ? (
                  <div className="mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                      {language === 'es' ? 'Suscripción registrada' : 'Subscription recorded'}
                    </p>
                    <p className="mt-3 text-base leading-7 text-emerald-950">
                      {language === 'es'
                        ? 'Gracias. Tu interés quedó registrado y este flujo ya está listo para conectarse con la base de datos o tu herramienta de email marketing.'
                        : 'Thank you. Your interest has been recorded, and this flow is ready to connect to a database or your email marketing tool.'}
                    </p>
                  </div>
                ) : (
                  <form className="mt-6 space-y-5" onSubmit={handleSubscribeSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="subscribe-full-name">
                          {language === 'es' ? 'Nombre completo' : 'Full name'}
                        </label>
                        <Input
                          id="subscribe-full-name"
                          value={subscriptionForm.fullName}
                          onChange={(event) => updateFormField('fullName', event.target.value)}
                          placeholder={language === 'es' ? 'Tu nombre y apellido' : 'Your full name'}
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="subscribe-email">
                          Email
                        </label>
                        <Input
                          id="subscribe-email"
                          type="email"
                          value={subscriptionForm.email}
                          onChange={(event) => updateFormField('email', event.target.value)}
                          placeholder="nombre@empresa.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="subscribe-company">
                          {language === 'es' ? 'Empresa' : 'Company'}
                        </label>
                        <Input
                          id="subscribe-company"
                          value={subscriptionForm.company}
                          onChange={(event) => updateFormField('company', event.target.value)}
                          placeholder={language === 'es' ? 'Nombre de tu organización' : 'Your organization name'}
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="subscribe-role">
                          {language === 'es' ? 'Cargo' : 'Role'}
                        </label>
                        <Input
                          id="subscribe-role"
                          value={subscriptionForm.role}
                          onChange={(event) => updateFormField('role', event.target.value)}
                          placeholder={language === 'es' ? 'Ej. CTO, Data Lead, CEO' : 'e.g. CTO, Data Lead, CEO'}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="subscribe-country">
                          {language === 'es' ? 'País' : 'Country'}
                        </label>
                        <Input
                          id="subscribe-country"
                          value={subscriptionForm.country}
                          onChange={(event) => updateFormField('country', event.target.value)}
                          placeholder={language === 'es' ? 'País o región' : 'Country or region'}
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="subscribe-interests">
                          {language === 'es' ? 'Intereses' : 'Interests'}
                        </label>
                        <Input
                          id="subscribe-interests"
                          value={subscriptionForm.interests}
                          onChange={(event) => updateFormField('interests', event.target.value)}
                          placeholder={language === 'es' ? 'Eventos, IA, data platforms, etc.' : 'Events, AI, data platforms, etc.'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900" htmlFor="subscribe-notes">
                        {language === 'es' ? 'Comentarios adicionales' : 'Additional notes'}
                      </label>
                      <Textarea
                        id="subscribe-notes"
                        value={subscriptionForm.notes}
                        onChange={(event) => updateFormField('notes', event.target.value)}
                        placeholder={language === 'es'
                          ? 'Cuéntanos qué tipo de noticias, eventos o temas te interesa recibir.'
                          : 'Tell us what kind of news, events, or topics you would like to receive.'}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-4 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
                      <label className="flex items-start gap-3">
                        <Checkbox
                          checked={subscriptionForm.updatesConsent}
                          onCheckedChange={(checked) => updateFormField('updatesConsent', checked === true)}
                          required
                        />
                        <span className="text-sm leading-6 text-slate-700">
                          {language === 'es'
                            ? 'Autorizo a iData para enviarme noticias, invitaciones a eventos, contenido editorial y comunicaciones relacionadas con Data & AI.'
                            : 'I authorize iData to send me news, event invitations, editorial content, and communications related to Data & AI.'}
                        </span>
                      </label>

                      <label className="flex items-start gap-3">
                        <Checkbox
                          checked={subscriptionForm.privacyConsent}
                          onCheckedChange={(checked) => updateFormField('privacyConsent', checked === true)}
                          required
                        />
                        <span className="text-sm leading-6 text-slate-700">
                          {language === 'es' ? 'Acepto la ' : 'I accept the '}
                          <a className="font-medium text-sky-700 underline-offset-4 hover:underline" href={privacyHref} target="_blank" rel="noreferrer">
                            {language === 'es' ? 'política de privacidad' : 'privacy policy'}
                          </a>
                          {language === 'es' ? ', el tratamiento de mis datos personales y he leído la ' : ', the processing of my personal data, and I have read the '}
                          <a className="font-medium text-sky-700 underline-offset-4 hover:underline" href={cookiesHref} target="_blank" rel="noreferrer">
                            {language === 'es' ? 'política de cookies' : 'cookie policy'}
                          </a>
                          .
                        </span>
                      </label>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-5 text-slate-500">
                        {language === 'es'
                          ? 'Este formulario abre el flujo de suscripción y deja lista la captura de datos para integrarla con tu CRM, email marketing o base de datos.'
                          : 'This form opens the subscription flow and leaves data capture ready to integrate with your CRM, email marketing, or database.'}
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-800"
                      >
                        <span>{language === 'es' ? 'Suscribirme' : 'Subscribe'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,1.52fr)_minmax(320px,0.78fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[var(--line-soft)] bg-[var(--surface-1)] p-5 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[34px] sm:p-8"
          >
            {hasBackdropImage && (
              <div className="pointer-events-none absolute inset-0">
                <img
                  src={activeItem.backgroundImage || ''}
                  alt={activeItem.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className={`pointer-events-none absolute inset-0 ${hasBackdropImage ? isDark ? 'bg-slate-950/60' : 'bg-slate-950/48' : ''}`} />
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeItem.panelClass} ${hasBackdropImage ? 'opacity-100 mix-blend-screen' : ''}`} />
            <div className={`pointer-events-none absolute inset-0 ${hasBackdropImage ? `bg-gradient-to-t ${activeItem.panelClass} ${isDark ? 'opacity-100' : 'opacity-90'}` : ''}`} />
            <div className={`pointer-events-none absolute inset-0 ${hasBackdropImage ? isDark ? 'bg-[linear-gradient(90deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.48)_45%,rgba(2,6,23,0.24)_100%)]' : 'bg-[linear-gradient(90deg,rgba(2,6,23,0.68)_0%,rgba(2,6,23,0.32)_45%,rgba(2,6,23,0.18)_100%)]' : ''}`} />
            <div className={`pointer-events-none absolute -right-10 top-8 h-44 w-44 rounded-full blur-3xl ${hasBackdropImage ? isDark ? 'bg-white/8' : 'bg-white/12' : isDark ? 'bg-sky-300/10' : 'bg-white/40'}`} />

            <div className="relative scrollbar-hide -mx-1 flex flex-nowrap items-center gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
              {spotlightItems.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.category}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`shrink-0 rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:px-4 sm:text-xs sm:tracking-[0.2em] ${
                      isActive
                        ? 'border-[var(--text-strong)] bg-[var(--text-strong)] text-[var(--surface-0)] shadow-[0_12px_30px_rgba(15,23,42,0.18)]'
                        : hasBackdropImage
                          ? 'border-white/18 bg-white/10 text-white/88 backdrop-blur-md hover:border-white/30 hover:text-white'
                          : 'border-[var(--line-soft)] bg-[var(--surface-0)] text-[var(--text-body)] hover:border-[var(--line-strong)] hover:text-[var(--text-strong)]'
                    }`}
                  >
                    {item.eyebrow}
                  </button>
                );
              })}
            </div>

            <div className="relative mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_180px] xl:flex-1">
              <div className="flex h-full min-h-0 flex-col justify-between lg:min-h-[420px]">
                <div className="flex flex-1 items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeItem.category}-${activeIndex}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="flex w-full flex-col"
                    >
                      <div className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px] sm:tracking-[0.22em] ${hasBackdropImage ? 'border-white/20 bg-white/12 text-white backdrop-blur-md' : activeItem.accentClass}`}>
                        {activeItem.label}
                      </div>
                      <h3 className={`mt-4 max-w-2xl text-[clamp(2rem,12vw,3.8rem)] font-light leading-[0.95] tracking-[-0.05em] sm:mt-5 ${hasBackdropImage ? 'text-white' : 'text-[var(--text-strong)]'}`}>
                        {activeItem.title}
                      </h3>
                      <p className={`mt-4 max-w-2xl text-[15px] leading-7 sm:mt-5 sm:text-base sm:leading-8 ${hasBackdropImage ? 'text-white/82' : 'text-[var(--text-body)]'}`}>
                        {activeItem.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-5 flex flex-col gap-5 sm:mt-6 sm:gap-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    <span className={`w-fit rounded-full border px-4 py-2 text-sm ${hasBackdropImage ? 'border-white/18 bg-white/10 text-white/88 backdrop-blur-md' : 'border-[var(--line-soft)] bg-[var(--surface-0)] text-[var(--text-body)]'}`}>
                      {activeItem.meta}
                    </span>
                    <Link
                      to={activeItem.href}
                      className={`group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 sm:w-auto ${hasBackdropImage ? 'border border-white/14 bg-white text-slate-950 hover:bg-white/92' : 'bg-[var(--text-strong)] text-[var(--surface-0)] hover:opacity-90'}`}
                    >
                      <span>{language === 'es' ? 'Explorar actualización' : 'Explore update'}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  <div className="relative flex justify-center gap-2 sm:justify-start">
                    {spotlightItems.map((item, index) => (
                      <button
                        key={`${item.category}-progress`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === activeIndex ? 'w-16 bg-[var(--text-strong)]' : 'w-6 bg-[var(--line-strong)]'
                        }`}
                        aria-label={`${item.eyebrow} ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:content-center">
                {spotlightItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  const Icon = item.category === 'events' ? CalendarDays : item.category === 'news' ? Newspaper : Sparkles;
                  const nodeAccentClass =
                    item.category === 'events'
                      ? 'border-sky-300/70 text-sky-100'
                      : item.category === 'news'
                        ? 'border-indigo-300/70 text-indigo-100'
                        : 'border-fuchsia-300/70 text-fuchsia-100';

                  return (
                    <button
                      key={`${item.category}-node`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`w-full rounded-[18px] border p-3 text-left transition-all duration-300 sm:rounded-[22px] sm:p-4 ${
                        isActive
                          ? `${isDark ? 'bg-[#08111f]/92 text-white shadow-[0_18px_40px_rgba(2,6,23,0.36)]' : 'bg-slate-950/78 text-white shadow-[0_18px_40px_rgba(2,6,23,0.24)]'} backdrop-blur-md ${nodeAccentClass}`
                          : `${isDark ? 'bg-[#101a2d]/92 text-slate-100 hover:bg-[#13203a]' : 'bg-white/92 text-slate-700 hover:bg-white'} ${item.category === 'events'
                            ? isDark ? 'border-sky-300/30' : 'border-sky-300/80'
                            : item.category === 'news'
                              ? isDark ? 'border-indigo-300/30' : 'border-indigo-300/80'
                              : isDark ? 'border-fuchsia-300/30' : 'border-fuchsia-300/80'}`
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80 sm:mt-6 sm:text-[11px] sm:tracking-[0.22em]">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-1.5 text-xs font-medium leading-4 sm:mt-2 sm:text-sm sm:leading-5">
                        {item.category === 'events'
                          ? language === 'es'
                            ? 'Evento'
                            : 'Event'
                          : item.category === 'news'
                            ? language === 'es'
                              ? 'Noticia'
                              : 'Story'
                            : language === 'es'
                              ? 'Desarrollo'
                              : 'Build'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="grid h-full grid-cols-1 gap-4 xl:max-w-[500px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-[24px] border border-[var(--line-soft)] bg-[var(--surface-1)] p-4 shadow-[0_18px_42px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:rounded-[26px]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-500 dark:text-sky-300">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-strong)]">
                      {language === 'es' ? 'Próximos eventos' : 'Upcoming events'}
                    </p>
                    <p className="text-sm text-[var(--text-soft)]">
                      {language === 'es' ? 'Agenda breve' : 'Short agenda'}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-[var(--line-soft)] bg-[var(--surface-0)] px-3 py-1 text-xs text-[var(--text-soft)]">
                  {events.length}
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                {events.map((event) => (
                  <Link
                    key={event.title}
                    to={event.href}
                    className="group block rounded-[18px] border border-[var(--line-soft)] bg-[var(--surface-0)] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/40"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-500 dark:text-sky-300">{event.label}</p>
                    <h3 className="mt-1.5 text-[15px] font-medium leading-5 text-[var(--text-strong)]">{event.title}</h3>
                    <p className="mt-1.5 text-sm leading-5 text-[var(--text-body)]">{event.meta}</p>
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-[24px] border border-[var(--line-soft)] bg-[var(--surface-1)] p-4 shadow-[0_18px_42px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:rounded-[26px]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/12 text-fuchsia-600 dark:text-fuchsia-300">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-strong)]">
                    {language === 'es' ? 'Noticias y novedades' : 'News and updates'}
                  </p>
                  <p className="text-sm text-[var(--text-soft)]">
                    {language === 'es' ? 'Señales rápidas del equipo' : 'Quick signals from the team'}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-2.5">
                {[newsCards[0], labs[0]].filter(Boolean).map((item, index) => (
                  <Link
                    key={`${item.title}-${index}`}
                    to={item.href}
                    className="group flex items-start gap-4 rounded-[18px] border border-[var(--line-soft)] bg-[var(--surface-0)] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(168,85,247,0.06)]"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--text-strong)]" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">
                        {'date' in item ? item.date : item.label}
                      </p>
                      <h3 className="mt-1.5 text-[15px] font-medium leading-5 text-[var(--text-strong)]">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                to={insightsHref}
                className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--surface-0)] px-5 py-2.5 text-sm font-medium text-[var(--text-strong)] transition-all duration-300 hover:border-sky-300/40 hover:bg-[var(--surface-1)] sm:w-auto"
              >
                <span>{language === 'es' ? 'Ver todos los insights' : 'View all insights'}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
