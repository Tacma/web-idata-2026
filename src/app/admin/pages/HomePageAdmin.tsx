import { Link } from 'react-router';
import { ArrowRight, FileText, LayoutTemplate, Search } from 'lucide-react';

const cards = [
  {
    title: 'Secciones de Inicio',
    description: 'Edita el hero, bloques de valor, logos, CTA y demás piezas que ya construyen la página principal.',
    href: '/admin/pages/home/edit',
    icon: LayoutTemplate,
  },
  {
    title: 'SEO de Inicio',
    description: 'Ajusta título, descripción y metadata base de la portada sin tocar estructura.',
    href: '/admin/pages/home/edit',
    icon: Search,
  },
  {
    title: 'Registro de página',
    description: 'Confirma visibilidad, rutas y estado editorial de la página inicial.',
    href: '/admin/pages',
    icon: FileText,
  },
];

export function HomePageAdmin() {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.16),transparent_20%),radial-gradient(circle_at_top_right,rgba(196,181,253,0.18),transparent_24%),linear-gradient(180deg,#ffffff,#f8fafc)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4387DF]">Página base editable</p>
        <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">Contenido de Inicio</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          La página principal ya está conectada a `home_sections`, así que el contenido visible del sitio se conserva como base editable.
          Aquí te dejamos una entrada clara para administrarla sin tener que navegar como un CMS técnico.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.href}
              className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl font-medium text-slate-950">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#4387DF]">
                Abrir módulo
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
