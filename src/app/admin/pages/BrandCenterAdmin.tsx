import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Globe2, Mail, Save, Share2, ShieldCheck, Sparkles } from 'lucide-react';
import { getContactSettings, saveContactSettings, type ContactSettings } from '../services/contactSettings.service';
import { getGlobalConfiguration, updateGlobalConfiguration } from '../services/globalSettings.service';
import { getSEOSettings, saveSEOSettings, type SEOSettings } from '../services/seoSettings.service';

function FriendlyField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-slate-800">{label}</span>
      {hint ? <span className="block text-xs text-slate-500">{hint}</span> : null}
      {children}
    </label>
  );
}

const inputClassName =
  'ui-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4387DF] focus:ring-4 focus:ring-[#4387DF]/10';

export function BrandCenterAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);
  const [globalConfig, setGlobalConfig] = useState<any | null>(null);
  const [seoSettings, setSeoSettings] = useState<SEOSettings | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const [contact, globalData, seo] = await Promise.all([
          getContactSettings(),
          getGlobalConfiguration(),
          getSEOSettings(),
        ]);

        if (!cancelled) {
          setContactSettings(contact);
          setGlobalConfig(globalData);
          setSeoSettings(seo);
        }
      } catch (error) {
        console.error('Error loading brand center:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const completion = useMemo(() => {
    if (!contactSettings || !globalConfig || !seoSettings) return 0;

    const checks = [
      seoSettings.brandName,
      seoSettings.organizationLegalName,
      globalConfig.marketing_email,
      globalConfig.careers_email,
      contactSettings.email,
      contactSettings.phone,
      contactSettings.address_es,
      contactSettings.socialMedia.linkedin,
      contactSettings.socialMedia.instagram,
      contactSettings.socialMedia.youtube,
      contactSettings.socialMedia.facebook,
    ];

    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }, [contactSettings, globalConfig, seoSettings]);

  async function handleSave() {
    if (!contactSettings || !globalConfig || !seoSettings) return;

    try {
      setSaving(true);

      const syncedSEOSettings: SEOSettings = {
        ...seoSettings,
        organizationEmail: contactSettings.email,
        organizationPhone: contactSettings.phone,
        facebookUrl: contactSettings.socialMedia.facebook || seoSettings.facebookUrl,
        linkedinUrl: contactSettings.socialMedia.linkedin || seoSettings.linkedinUrl,
        instagramUrl: contactSettings.socialMedia.instagram || seoSettings.instagramUrl,
        youtubeUrl: contactSettings.socialMedia.youtube || seoSettings.youtubeUrl,
      };

      const [savedContact, savedGlobal, savedSEO] = await Promise.all([
        saveContactSettings(contactSettings),
        updateGlobalConfiguration(globalConfig),
        saveSEOSettings(syncedSEOSettings),
      ]);

      setContactSettings(savedContact);
      setGlobalConfig(savedGlobal);
      setSeoSettings(savedSEO);
      alert('Centro de marca guardado correctamente');
    } catch (error) {
      console.error('Error saving brand center:', error);
      alert('No fue posible guardar el centro de marca');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !contactSettings || !globalConfig || !seoSettings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#4387DF] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.14),transparent_22%),radial-gradient(circle_at_top_right,rgba(196,181,253,0.22),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4387DF]">Base editable del sitio</p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
              Centro de marca y datos globales
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Aquí queda la información transversal del sitio como idioma base, correos, teléfono, dirección,
              redes sociales y datos de organización. Lo que ya existe en la web se conserva como base editable.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Completitud</p>
              <p className="mt-1 text-2xl font-light text-slate-950">{completion}%</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Guardando...' : 'Guardar centro de marca'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-2xl bg-[#4387DF]/10 p-3 text-[#4387DF]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Identidad principal</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Define cómo se presenta iData en ambos idiomas y qué idioma arranca primero.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FriendlyField label="Nombre visible de marca">
                <input
                  value={seoSettings.brandName}
                  onChange={(event) => setSeoSettings((current) => current ? { ...current, brandName: event.target.value } : current)}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Razón social">
                <input
                  value={seoSettings.organizationLegalName}
                  onChange={(event) => setSeoSettings((current) => current ? { ...current, organizationLegalName: event.target.value } : current)}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Idioma público por defecto" hint="Este idioma se usa como base cuando una persona entra al sitio.">
                <select
                  value={globalConfig.default_public_language}
                  onChange={(event) => setGlobalConfig((current: any) => ({ ...current, default_public_language: event.target.value }))}
                  className={inputClassName}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </FriendlyField>
              <FriendlyField label="Estrategia de rutas">
                <select
                  value={globalConfig.localized_route_strategy}
                  onChange={(event) => setGlobalConfig((current: any) => ({ ...current, localized_route_strategy: event.target.value }))}
                  className={inputClassName}
                >
                  <option value="prefix">Prefijos por idioma</option>
                  <option value="domain">Dominios por mercado</option>
                </select>
              </FriendlyField>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Correos y contacto principal</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Unifica los datos que se reutilizan en contacto, careers, schema y mensajes automáticos.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FriendlyField label="Correo general del sitio">
                <input
                  type="email"
                  value={contactSettings.email}
                  onChange={(event) => setContactSettings((current) => current ? { ...current, email: event.target.value } : current)}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Correo de marketing">
                <input
                  type="email"
                  value={globalConfig.marketing_email || ''}
                  onChange={(event) => setGlobalConfig((current: any) => ({ ...current, marketing_email: event.target.value }))}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Correo de careers">
                <input
                  type="email"
                  value={globalConfig.careers_email || ''}
                  onChange={(event) => setGlobalConfig((current: any) => ({ ...current, careers_email: event.target.value }))}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Teléfono comercial principal">
                <input
                  value={contactSettings.phone}
                  onChange={(event) => setContactSettings((current) => current ? { ...current, phone: event.target.value } : current)}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Teléfono administrativo">
                <input
                  value={contactSettings.administrativePhone}
                  onChange={(event) => setContactSettings((current) => current ? { ...current, administrativePhone: event.target.value } : current)}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Horario visible (ES)">
                <input
                  value={contactSettings.businessHours_es}
                  onChange={(event) => setContactSettings((current) => current ? { ...current, businessHours_es: event.target.value } : current)}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Ubicación visible (ES)">
                <input
                  value={contactSettings.address_es}
                  onChange={(event) => setContactSettings((current) => current ? { ...current, address_es: event.target.value } : current)}
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Ubicación visible (EN)">
                <input
                  value={contactSettings.address_en}
                  onChange={(event) => setContactSettings((current) => current ? { ...current, address_en: event.target.value } : current)}
                  className={inputClassName}
                />
              </FriendlyField>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-2xl bg-fuchsia-500/10 p-3 text-fuchsia-600">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Redes sociales globales</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Se reutilizan en contacto, footer, insights y otros módulos del front.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <FriendlyField label="Facebook">
                <input
                  value={contactSettings.socialMedia.facebook || ''}
                  onChange={(event) =>
                    setContactSettings((current) =>
                      current
                        ? { ...current, socialMedia: { ...current.socialMedia, facebook: event.target.value } }
                        : current
                    )
                  }
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="LinkedIn">
                <input
                  value={contactSettings.socialMedia.linkedin || ''}
                  onChange={(event) =>
                    setContactSettings((current) =>
                      current
                        ? { ...current, socialMedia: { ...current.socialMedia, linkedin: event.target.value } }
                        : current
                    )
                  }
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="Instagram">
                <input
                  value={contactSettings.socialMedia.instagram || ''}
                  onChange={(event) =>
                    setContactSettings((current) =>
                      current
                        ? { ...current, socialMedia: { ...current.socialMedia, instagram: event.target.value } }
                        : current
                    )
                  }
                  className={inputClassName}
                />
              </FriendlyField>
              <FriendlyField label="YouTube">
                <input
                  value={contactSettings.socialMedia.youtube || ''}
                  onChange={(event) =>
                    setContactSettings((current) =>
                      current
                        ? { ...current, socialMedia: { ...current.socialMedia, youtube: event.target.value } }
                        : current
                    )
                  }
                  className={inputClassName}
                />
              </FriendlyField>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white/10 p-3 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium">Dónde impacta esta información</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Esta capa alimenta el footer, la página de contacto, los datos estructurados de organización,
                  la información comercial pública y los accesos a redes del sitio.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="font-medium">Footer y contacto</span>
                <p className="mt-1 text-slate-400">Teléfonos, dirección y redes sociales.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="font-medium">Careers y formularios</span>
                <p className="mt-1 text-slate-400">Correo de careers y base de contacto institucional.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="font-medium">SEO y schema</span>
                <p className="mt-1 text-slate-400">Nombre de marca, razón social y datos de organización.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-600">
                <Globe2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Checklist editorial</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Lo mínimo que debería estar completo antes de publicar cambios grandes.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-600">
              <li className="rounded-2xl bg-slate-50 px-4 py-3">Marca y razón social alineadas.</li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3">Correos de marketing y careers vigentes.</li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3">Dirección y horario visibles en ambos idiomas.</li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3">Redes sociales actualizadas desde un solo lugar.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
