import { 
  FileText, 
  BookOpen, 
  Briefcase, 
  Mail, 
  Send,
  AlertTriangle,
  Globe,
  TrendingUp,
  Users,
  Eye,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router';

// Mock data - In production, this would come from API/database
const dashboardStats = {
  total_published_pages: 42,
  total_insights_posts: 127,
  total_active_jobs: 8,
  total_contact_submissions: 345,
  total_job_applications: 89,
  content_pending_translation: 12,
  seo_issues_count: 7,
  broken_links_count: 3,
  pages_missing_market_config: 5,
};

const recentSubmissions = [
  {
    id: '1',
    name: 'María González',
    email: 'm.gonzalez@empresa.com',
    company: 'Tech Corp',
    source_type: 'service',
    source_title: 'Data Analytics',
    submitted_at: '2026-03-13T14:30:00Z',
    status: 'new',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'j.smith@company.com',
    company: 'Global Solutions',
    source_type: 'case_study',
    source_title: 'Retail Transformation',
    submitted_at: '2026-03-13T12:15:00Z',
    status: 'contacted',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana.m@startup.io',
    company: 'DataStart',
    source_type: 'home',
    source_title: 'General Inquiry',
    submitted_at: '2026-03-13T09:45:00Z',
    status: 'new',
  },
];

const recentJobApplications = [
  {
    id: '1',
    name: 'Carlos Ramírez',
    job_title: 'Senior Data Engineer',
    submitted_at: '2026-03-13T16:00:00Z',
    status: 'new',
  },
  {
    id: '2',
    name: 'Laura Fernández',
    job_title: 'Data Analyst',
    submitted_at: '2026-03-13T11:30:00Z',
    status: 'reviewing',
  },
];

const contentIssues = [
  { type: 'missing_translation', count: 12, severity: 'warning', label: 'Contenido pendiente de traducción' },
  { type: 'missing_seo', count: 7, severity: 'critical', label: 'Páginas sin meta description' },
  { type: 'broken_links', count: 3, severity: 'critical', label: 'Links rotos detectados' },
  { type: 'missing_market', count: 5, severity: 'warning', label: 'Sin configuración de mercado' },
];

const quickStats = [
  {
    label: 'Páginas publicadas',
    value: dashboardStats.total_published_pages,
    icon: FileText,
    color: 'blue',
    trend: '+3',
    href: '/admin/pages',
  },
  {
    label: 'Insights posts',
    value: dashboardStats.total_insights_posts,
    icon: BookOpen,
    color: 'purple',
    trend: '+12',
    href: '/admin/insights',
  },
  {
    label: 'Trabajos activos',
    value: dashboardStats.total_active_jobs,
    icon: Briefcase,
    color: 'green',
    trend: '+2',
    href: '/admin/jobs',
  },
  {
    label: 'Leads (30 días)',
    value: dashboardStats.total_contact_submissions,
    icon: Mail,
    color: 'orange',
    trend: '+45',
    href: '/admin/contact-submissions',
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    new: { label: 'Nuevo', color: 'bg-blue-100 text-blue-700' },
    contacted: { label: 'Contactado', color: 'bg-green-100 text-green-700' },
    qualified: { label: 'Calificado', color: 'bg-purple-100 text-purple-700' },
    reviewing: { label: 'Revisando', color: 'bg-yellow-100 text-yellow-700' },
    interview: { label: 'Entrevista', color: 'bg-indigo-100 text-indigo-700' },
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
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

export function DashboardNew() {
  return (
    <div className=\"space-y-8\">
      {/* Header */}
      <div>
        <h1 className=\"text-3xl font-light text-gray-900\">Dashboard</h1>
        <p className=\"mt-2 text-sm text-gray-600\">
          Vista general del contenido y actividad del sitio web iData Global
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\">
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
              className=\"bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-gray-300 group\"
            >
              <div className=\"flex items-start justify-between\">
                <div className=\"flex-1\">
                  <p className=\"text-sm font-medium text-gray-600\">{stat.label}</p>
                  <p className=\"mt-2 text-3xl font-light text-gray-900\">{stat.value}</p>
                  <div className=\"mt-2 flex items-center gap-1 text-xs text-green-600\">
                    <TrendingUp className=\"w-3 h-3\" />
                    <span>{stat.trend} este mes</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Issues Alert */}
      {contentIssues.some(issue => issue.count > 0) && (
        <div className=\"bg-amber-50 border border-amber-200 rounded-xl p-6\">
          <div className=\"flex items-start gap-3\">
            <AlertTriangle className=\"w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5\" />
            <div className=\"flex-1\">
              <h3 className=\"text-sm font-medium text-amber-900 mb-3\">
                Problemas de contenido detectados
              </h3>
              <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3\">
                {contentIssues.map((issue) => (
                  <div key={issue.type} className=\"bg-white rounded-lg p-3 border border-amber-200\">
                    <div className=\"flex items-center justify-between mb-1\">
                      <span className=\"text-2xl font-bold text-amber-900\">{issue.count}</span>
                      {issue.severity === 'critical' && (
                        <XCircle className=\"w-4 h-4 text-red-500\" />
                      )}
                    </div>
                    <p className=\"text-xs text-gray-600\">{issue.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">
        {/* Recent Contact Submissions */}
        <div className=\"bg-white rounded-xl border border-gray-200 overflow-hidden\">
          <div className=\"px-6 py-4 border-b border-gray-200 flex items-center justify-between\">
            <h3 className=\"text-lg font-medium text-gray-900\">Últimos contactos</h3>
            <Link 
              to=\"/admin/contact-submissions\"
              className=\"text-sm font-medium text-blue-600 hover:text-blue-700\"
            >
              Ver todos →
            </Link>
          </div>
          <div className=\"divide-y divide-gray-200\">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className=\"px-6 py-4 hover:bg-gray-50 transition-colors\">
                <div className=\"flex items-start justify-between mb-2\">
                  <div className=\"flex-1\">
                    <p className=\"text-sm font-medium text-gray-900\">{submission.name}</p>
                    <p className=\"text-xs text-gray-500 mt-0.5\">{submission.company}</p>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>
                <div className=\"flex items-center gap-2 text-xs text-gray-500 mt-2\">
                  <span className=\"inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded\">
                    {submission.source_type}
                  </span>
                  <span>·</span>
                  <span>{submission.source_title}</span>
                </div>
                <p className=\"text-xs text-gray-400 mt-2\">{formatDate(submission.submitted_at)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Job Applications */}
        <div className=\"bg-white rounded-xl border border-gray-200 overflow-hidden\">
          <div className=\"px-6 py-4 border-b border-gray-200 flex items-center justify-between\">
            <h3 className=\"text-lg font-medium text-gray-900\">Aplicaciones recientes</h3>
            <Link 
              to=\"/admin/job-applications\"
              className=\"text-sm font-medium text-blue-600 hover:text-blue-700\"
            >
              Ver todas →
            </Link>
          </div>
          <div className=\"divide-y divide-gray-200\">
            {recentJobApplications.map((application) => (
              <div key={application.id} className=\"px-6 py-4 hover:bg-gray-50 transition-colors\">
                <div className=\"flex items-start justify-between mb-2\">
                  <div className=\"flex-1\">
                    <p className=\"text-sm font-medium text-gray-900\">{application.name}</p>
                    <p className=\"text-xs text-gray-500 mt-0.5\">{application.job_title}</p>
                  </div>
                  {getStatusBadge(application.status)}
                </div>
                <p className=\"text-xs text-gray-400 mt-2\">{formatDate(application.submitted_at)}</p>
              </div>
            ))}
            
            {/* Empty state if no applications */}
            {recentJobApplications.length === 0 && (
              <div className=\"px-6 py-12 text-center\">
                <Send className=\"w-12 h-12 text-gray-300 mx-auto mb-3\" />
                <p className=\"text-sm text-gray-500\">No hay aplicaciones recientes</p>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Summary */}
        <div className=\"bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6\">
          <div className=\"flex items-center gap-3 mb-4\">
            <div className=\"p-2 bg-blue-600 rounded-lg\">
              <TrendingUp className=\"w-5 h-5 text-white\" />
            </div>
            <div>
              <h3 className=\"text-lg font-medium text-gray-900\">Analytics</h3>
              <p className=\"text-xs text-gray-600\">Últimos 30 días</p>
            </div>
          </div>
          
          <div className=\"space-y-4\">
            <div className=\"bg-white bg-opacity-60 rounded-lg p-4\">
              <div className=\"flex items-center justify-between mb-2\">
                <span className=\"text-sm text-gray-600\">Visitas totales</span>
                <Eye className=\"w-4 h-4 text-gray-400\" />
              </div>
              <p className=\"text-2xl font-light text-gray-900\">24,563</p>
              <p className=\"text-xs text-green-600 mt-1\">+12.5% vs mes anterior</p>
            </div>
            
            <div className=\"bg-white bg-opacity-60 rounded-lg p-4\">
              <div className=\"flex items-center justify-between mb-2\">
                <span className=\"text-sm text-gray-600\">Tasa de conversión</span>
                <CheckCircle className=\"w-4 h-4 text-gray-400\" />
              </div>
              <p className=\"text-2xl font-light text-gray-900\">3.2%</p>
              <p className=\"text-xs text-green-600 mt-1\">+0.8% vs mes anterior</p>
            </div>
          </div>

          <Link
            to=\"/admin/analytics\"
            className=\"mt-4 block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors\"
          >
            Ver analytics completo
          </Link>
        </div>

        {/* Quick Actions */}
        <div className=\"bg-white rounded-xl border border-gray-200 p-6\">
          <h3 className=\"text-lg font-medium text-gray-900 mb-4\">Acciones rápidas</h3>
          
          <div className=\"space-y-3\">
            <Link
              to=\"/admin/insights\"
              className=\"flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group\"
            >
              <div className=\"p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors\">
                <BookOpen className=\"w-4 h-4 text-blue-600\" />
              </div>
              <div className=\"flex-1\">
                <p className=\"text-sm font-medium text-gray-900\">Crear nuevo Insight</p>
                <p className=\"text-xs text-gray-500\">Publicar contenido de blog</p>
              </div>
            </Link>

            <Link
              to=\"/admin/jobs\"
              className=\"flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group\"
            >
              <div className=\"p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors\">
                <Briefcase className=\"w-4 h-4 text-green-600\" />
              </div>
              <div className=\"flex-1\">
                <p className=\"text-sm font-medium text-gray-900\">Publicar trabajo</p>
                <p className=\"text-xs text-gray-500\">Crear nueva vacante</p>
              </div>
            </Link>

            <Link
              to=\"/admin/media-library\"
              className=\"flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group\"
            >
              <div className=\"p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors\">
                <FileText className=\"w-4 h-4 text-purple-600\" />
              </div>
              <div className=\"flex-1\">
                <p className=\"text-sm font-medium text-gray-900\">Subir medios</p>
                <p className=\"text-xs text-gray-500\">Gestionar imágenes y archivos</p>
              </div>
            </Link>

            <Link
              to=\"/admin/seo-settings\"
              className=\"flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group\"
            >
              <div className=\"p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors\">
                <Globe className=\"w-4 h-4 text-orange-600\" />
              </div>
              <div className=\"flex-1\">
                <p className=\"text-sm font-medium text-gray-900\">Configurar SEO</p>
                <p className=\"text-xs text-gray-500\">Optimizar metadata</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className=\"bg-white rounded-xl border border-gray-200 p-6\">
        <h3 className=\"text-lg font-medium text-gray-900 mb-4\">Estado del sistema</h3>
        
        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-4\">
          <div className=\"flex items-center gap-3\">
            <div className=\"w-10 h-10 bg-green-100 rounded-full flex items-center justify-center\">
              <CheckCircle className=\"w-5 h-5 text-green-600\" />
            </div>
            <div>
              <p className=\"text-sm font-medium text-gray-900\">CMS Online</p>
              <p className=\"text-xs text-gray-500\">Funcionando correctamente</p>
            </div>
          </div>

          <div className=\"flex items-center gap-3\">
            <div className=\"w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center\">
              <Globe className=\"w-5 h-5 text-blue-600\" />
            </div>
            <div>
              <p className=\"text-sm font-medium text-gray-900\">2 Mercados activos</p>
              <p className=\"text-xs text-gray-500\">Global, LATAM</p>
            </div>
          </div>

          <div className=\"flex items-center gap-3\">
            <div className=\"w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center\">
              <Users className=\"w-5 h-5 text-purple-600\" />
            </div>
            <div>
              <p className=\"text-sm font-medium text-gray-900\">3 Usuarios admin</p>
              <p className=\"text-xs text-gray-500\">Con acceso activo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
