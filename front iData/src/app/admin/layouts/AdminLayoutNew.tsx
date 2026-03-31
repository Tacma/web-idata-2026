import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Briefcase, 
  FolderOpen,
  BookOpen,
  Tags,
  Users,
  Briefcase as JobsIcon,
  Download,
  MessageSquare,
  Home,
  Menu,
  X,
  ExternalLink,
  Settings,
  Image,
  Navigation as NavigationIcon,
  Search,
  BarChart3,
  Globe,
  Link2,
  Mail,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Info,
  Send
} from 'lucide-react';
import { useState } from 'react';

// Navigation structure with grouped sections (Spanish)
const navigationGroups = [
  {
    name: 'Resumen',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    ]
  },
  {
    name: 'Contenido',
    items: [
      { name: 'Páginas', href: '/admin/pages', icon: FileText },
      { name: 'Servicios', href: '/admin/services', icon: Briefcase },
      { name: 'Industrias', href: '/admin/industries', icon: FolderOpen },
      { name: 'Casos de éxito', href: '/admin/case-studies', icon: MessageSquare },
      { name: 'Insights', href: '/admin/insights', icon: BookOpen },
      { name: 'Categorías', href: '/admin/blog-categories', icon: Tags },
    ]
  },
  {
    name: 'Equipo y Empleo',
    items: [
      { name: 'Miembros del equipo', href: '/admin/team-members', icon: Users },
      { name: 'Vacantes', href: '/admin/jobs', icon: JobsIcon },
      { name: 'Aplicaciones', href: '/admin/job-applications', icon: Send },
    ]
  },
  {
    name: 'Leads y Contacto',
    items: [
      { name: 'Leads de contacto', href: '/admin/contact-submissions', icon: Mail },
      { name: 'Configuración de contacto', href: '/admin/contact-settings', icon: Settings },
    ]
  },
  {
    name: 'Medios y Recursos',
    items: [
      { name: 'Biblioteca de medios', href: '/admin/media-library', icon: Image },
      { name: 'Recursos', href: '/admin/resources', icon: Download },
    ]
  },
  {
    name: 'Configuración del Sitio',
    items: [
      { name: 'Navegación', href: '/admin/navigation', icon: NavigationIcon },
      { name: 'SEO y metadata', href: '/admin/seo-settings', icon: Search },
      { name: 'Analítica', href: '/admin/analytics', icon: BarChart3 },
      { name: 'Mercados y dominios', href: '/admin/markets', icon: Globe },
      { name: 'Redirecciones', href: '/admin/redirects', icon: Link2 },
      { name: 'Configuración global', href: '/admin/global-settings', icon: Settings },
    ]
  },
  {
    name: 'Administración',
    items: [
      { name: 'Usuarios y roles', href: '/admin/users', icon: ShieldCheck },
    ]
  },
];

export function AdminLayoutNew() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">iD</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">iData CMS</h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 hover:text-gray-900"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
            transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-64
          `}
        >
          <div className="h-full overflow-y-auto flex flex-col">
            {/* Logo */}
            <div className="hidden lg:block p-6 border-b border-gray-200">
              <Link to="/admin" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">iD</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">iData CMS</div>
                  <div className="text-xs text-gray-500">Administrador</div>
                </div>
              </Link>
            </div>

            {/* Navigation Groups */}
            <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
              {navigationGroups.map((group) => {
                const isGroupCollapsed = collapsedGroups[group.name];
                
                return (
                  <div key={group.name}>
                    <button
                      onClick={() => toggleGroup(group.name)}
                      className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                    >
                      <span>{group.name}</span>
                      {isGroupCollapsed ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    
                    {!isGroupCollapsed && (
                      <div className="mt-2 space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item.href, item.exact);
                          
                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => setIsSidebarOpen(false)}
                              className={`
                                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                                transition-all duration-150
                                ${active 
                                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }
                              `}
                            >
                              <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                              <span>{item.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <Link
                to="/en/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Ver sitio público</span>
              </Link>
              
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Modo: Mock local</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
