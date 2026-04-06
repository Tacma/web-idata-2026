import { SearchX, ArrowLeft, Mail } from 'lucide-react';
import { useLocation } from 'react-router';
import { Container } from '../../shared/components/Container';
import { GlassCard } from '../../shared/components/GlassCard';
import { LinkCTA } from '../../shared/components/LinkCTA';
import { SEOHead } from '../../shared/components/SEOHead';
import type { Language } from '../../shared/types';
import { buildContactLink } from '../../shared/utils/contactLinks';

interface NotFoundPageProps {
  languageOverride?: Language;
  standalone?: boolean;
}

export function NotFoundPage({ languageOverride, standalone = false }: NotFoundPageProps) {
  const location = useLocation();
  const language: Language =
    languageOverride || (location.pathname.startsWith('/en') ? 'en' : 'es');

  const copy =
    language === 'es'
      ? {
          title: 'Página no encontrada',
          description:
            'La URL que intentaste abrir no existe o fue movida. Regresa al inicio, explora nuestros servicios o contáctanos.',
          eyebrow: 'Error 404',
          body:
            'Esta ruta no está publicada o ya no está disponible. Si llegaste desde un enlace externo, es posible que esté desactualizado.',
          primaryCta: 'Ir al inicio',
          secondaryCta: 'Ver servicios',
          tertiaryCta: 'Contactanos',
          tipsTitle: 'Puedes intentar con:',
          tips: [
            'Revisar la URL por si tiene un error de escritura.',
            'Volver al inicio y navegar desde el menú principal.',
            'Escribirnos si estabas buscando un servicio, recurso o vacante específica.',
          ],
        }
      : {
          title: 'Page not found',
          description:
            'The URL you tried to open does not exist or has moved. Go back home, explore our services or contact us.',
          eyebrow: 'Error 404',
          body:
            'This route is not published or is no longer available. If you arrived from an external link, it may be outdated.',
          primaryCta: 'Go home',
          secondaryCta: 'View services',
          tertiaryCta: 'Contact us',
          tipsTitle: 'You can try:',
          tips: [
            'Checking the URL for a typo.',
            'Going back to the homepage and browsing from the main navigation.',
            'Contacting us if you were looking for a specific service, resource or job opening.',
          ],
        };

  const homeUrl = language === 'es' ? '/es/' : '/en/';
  const servicesUrl = language === 'es' ? '/es/servicios' : '/en/services';
  const contactUrl = buildContactLink({
    language,
    sourceType: 'not_found',
    sourceTitle: location.pathname,
    sourceCtaLabel: copy.tertiaryCta,
    intent: 'navigation_help',
    referrerPath: location.pathname,
  });

  const content = (
    <div className={standalone ? 'min-h-screen bg-[var(--page-bg)]' : ''}>
      <section className={`${standalone ? 'pt-28' : 'pt-8'} pb-20`}>
        <Container size="xl">
          <div
            className="relative overflow-hidden rounded-[32px] border p-6 md:p-10"
            style={{
              borderColor: 'var(--line-soft)',
              background:
                'radial-gradient(circle at top left, rgba(67,135,223,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(142,50,245,0.12), transparent 30%), var(--surface-1)',
              boxShadow: '0 18px 60px rgba(15,23,42,0.10)',
            }}
          >
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#4387DF]/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#8E32F5]/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
              <div className="max-w-3xl">
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm"
                  style={{ borderColor: 'var(--line-soft)', background: 'var(--surface-1)', color: 'var(--text-soft)' }}
                >
                  <SearchX className="h-4 w-4 text-[#4387DF]" />
                  {copy.eyebrow}
                </div>
                <h1 className="mt-6 text-4xl font-light tracking-tight text-[var(--text-strong)] md:text-6xl">
                  {copy.title}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-soft)]">{copy.body}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <LinkCTA to={homeUrl} variant="primary">
                    {copy.primaryCta}
                  </LinkCTA>
                  <LinkCTA to={servicesUrl} variant="secondary">
                    {copy.secondaryCta}
                  </LinkCTA>
                  <LinkCTA to={contactUrl} variant="text" className="!text-[var(--text-body)]">
                    {copy.tertiaryCta}
                  </LinkCTA>
                </div>
              </div>

              <GlassCard variant="card" hover="none" className="rounded-[28px] border border-white/60 bg-white/80 p-6 md:p-7">
                <div className="flex items-center gap-3 text-[var(--text-strong)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-inverse)] text-[var(--surface-0)]">
                    <SearchX className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-faint)]">{copy.eyebrow}</p>
                    <p className="text-xl font-semibold">/{location.pathname.replace(/^\/+/, '') || ''}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-faint)]">
                    {copy.tipsTitle}
                  </h2>
                  <ul className="space-y-3 text-sm leading-7 text-[var(--text-soft)]">
                    {copy.tips.map((tip) => (
                      <li key={tip} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[var(--text-soft)]">
                  <ArrowLeft className="h-4 w-4 text-[#4387DF]" />
                  <span>{language === 'es' ? 'Vuelve a una sección publicada del sitio.' : 'Return to a published section of the site.'}</span>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[var(--text-soft)]">
                  <Mail className="h-4 w-4 text-[#4387DF]" />
                  <span>{language === 'es' ? 'Si era contenido importante, escríbenos y lo ubicamos.' : 'If this was important content, contact us and we will point you to it.'}</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );

  return (
    <>
      <SEOHead
        title={copy.title}
        description={copy.description}
        canonical={location.pathname || homeUrl}
        language={language}
        noIndex
        noFollow
        disableStructuredData
      />
      {content}
    </>
  );
}
