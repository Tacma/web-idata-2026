import { BookOpen, FileText, Globe2, Mail, Palette, Search, Send, Sparkles, TrendingUp, Workflow } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { getContactSubmissions, getContactSubmissionsStats } from '../services/contactSubmissions.service';
import { getServicesStats } from '../services/services.service';
import type { ContactSubmission } from '../types';

export function Dashboard() {
  const [contactStats, setContactStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    last_30_days: 0,
  });
  const [servicesStats, setServicesStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboardData() {
      try {
        setLoading(true);
        const [contactStatsData, servicesStatsData, submissions] = await Promise.all([
          getContactSubmissionsStats(),
          getServicesStats(),
          getContactSubmissions(),
        ]);

        if (!cancelled) {
          setContactStats(contactStatsData);
          setServicesStats(servicesStatsData);
          setRecentSubmissions(submissions.slice(0, 5));
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      cancelled = true;
    };
  }, []);

  const quickStats = [
    {
      label: 'Centro de marca',
      value: 'Global',
      icon: Palette,
      color: 'blue',
      trend: 'Correos, redes y datos base',
      href: '/admin/brand',
    },
    {
      label: 'Páginas y secciones',
      value: 42,
      icon: FileText,
      color: 'purple',
      trend: 'Base editable del sitio',
      href: '/admin/pages',
    },
    {
      label: 'SEO y Google',
      value: 'Live',
      icon: Search,
      color: 'green',
      trend: 'Indexación y medición',
      href: '/admin/integrations',
    },
    {
      label: 'Servicios publicados',
      value: servicesStats.published,
      icon: Send,
      color: 'orange',
      trend: `${servicesStats.featured} destacados`,
      href: '/admin/services',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Nuevo', color: 'bg-blue-100 text-blue-700' },
      contacted: { label: 'Contactado', color: 'bg-green-100 text-green-700' },
      qualified: { label: 'Calificado', color: 'bg-purple-100 text-purple-700' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#4387DF] border-t-transparent" />
          <p className="text-gray-600">Cargando centro de control...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.15),transparent_22%),radial-gradient(circle_at_top_right,rgba(196,181,253,0.2),transparent_26%),linear-gradient(180deg,#ffffff,#f8fafc)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4387DF]">Administrador editorial</p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
              Administra el sitio sin tocar su estructura
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Este panel deja la web actual como base editable y organiza el trabajo por módulos claros:
              marca, páginas, oportunidades, leads e integraciones.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Actividad de leads</p>
            <p className="mt-1 text-3xl font-light text-slate-950">{contactStats.last_30_days}</p>
            <p className="mt-1 text-sm text-slate-500">en los últimos 30 días</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500',
            purple: 'bg-purple-500',
            green: 'bg-green-500',
            orange: 'bg-orange-500',
          };

          return (
            <Link
              key={stat.label}
              to={stat.href}
              className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-light text-slate-950">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div className={`rounded-2xl p-3 ${colorClasses[stat.color as keyof typeof colorClasses]} bg-opacity-10`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-medium text-slate-950">Accesos rápidos</h2>
          <p className="mt-1 text-sm text-slate-500">Los módulos clave para editar la base del sitio.</p>

          <div className="mt-5 grid gap-3">
            <Link to="/admin/brand" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-white">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-[#4387DF]" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Marca y datos globales</p>
                  <p className="text-xs text-slate-500">Redes, contacto, correos, idioma base y organización.</p>
                </div>
              </div>
            </Link>
            <Link to="/admin/pages" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-white">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-violet-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Páginas y secciones</p>
                  <p className="text-xs text-slate-500">La página actual queda como base editable y no se pierde.</p>
                </div>
              </div>
            </Link>
            <Link to="/admin/jobs" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-white">
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Vacantes y formularios</p>
                  <p className="text-xs text-slate-500">Oportunidades activas, detalle de oferta y aplicaciones.</p>
                </div>
              </div>
            </Link>
            <Link to="/admin/integrations" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-white">
              <div className="flex items-center gap-3">
                <Workflow className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">SEO, Google e integraciones</p>
                  <p className="text-xs text-slate-500">Search Console, GA4, GTM, robots y medición.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-slate-950">Lo más reciente</h2>
              <p className="mt-1 text-sm text-slate-500">Mensajes nuevos entrando al sitio.</p>
            </div>
            <Link to="/admin/contact-submissions" className="text-sm font-medium text-[#4387DF] hover:text-[#3272c4]">
              Ver todos
            </Link>
          </div>

          <div className="mt-5 divide-y divide-slate-200">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((submission) => (
                <div key={submission.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {submission.first_name} {submission.last_name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{submission.company}</p>
                    </div>
                    {getStatusBadge(submission.status)}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1">{submission.source_type || 'general'}</span>
                    <span>{submission.source_title || 'Contacto general'}</span>
                    <span>{formatDate(submission.created_at)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-slate-500">
                <Mail className="mx-auto mb-4 h-10 w-10 text-slate-300" />
                <p>No hay contactos recientes</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Globe2 className="h-5 w-5 text-sky-600" />
            <h3 className="text-lg font-medium text-slate-950">Mercados y routing</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Configura idioma por defecto, dominios por mercado y redirecciones sin tocar el código.
          </p>
          <Link to="/admin/markets" className="mt-4 inline-flex text-sm font-medium text-[#4387DF]">Ir a mercados</Link>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-violet-600" />
            <h3 className="text-lg font-medium text-slate-950">Contenido bilingüe</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Los textos siguen editándose por idioma, pero ahora la entrada editorial está organizada por módulos.
          </p>
          <Link to="/admin/pages" className="mt-4 inline-flex text-sm font-medium text-[#4387DF]">Ir a páginas</Link>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Workflow className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-medium text-slate-950">Integración con APIs</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Vacantes, formularios, SEO y medición ya quedan en módulos separados para operar el sitio con más orden.
          </p>
          <Link to="/admin/integrations" className="mt-4 inline-flex text-sm font-medium text-[#4387DF]">Ir a integraciones</Link>
        </div>
      </div>
    </div>
  );
}
