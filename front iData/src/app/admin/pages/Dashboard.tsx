import { 
  FileText, 
  BookOpen, 
  Briefcase, 
  Mail, 
  Send,
  AlertTriangle,
  TrendingUp,
  Users,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { getContactSubmissions, getContactSubmissionsStats } from '../services/contactSubmissions.service';
import { getServicesStats } from '../services/services.service';
import type { ContactSubmission } from '../types';

// This is the updated functional Dashboard that uses real services
export function Dashboard() {
  const [contactStats, setContactStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    last_30_days: 0
  });
  
  const [servicesStats, setServicesStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0
  });
  
  const [recentSubmissions, setRecentSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      
      // Load contact submissions stats
      const contactStatsData = await getContactSubmissionsStats();
      setContactStats(contactStatsData);
      
      // Load services stats
      const servicesStatsData = await getServicesStats();
      setServicesStats(servicesStatsData);
      
      // Load recent submissions
      const submissions = await getContactSubmissions();
      setRecentSubmissions(submissions.slice(0, 5));
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const quickStats = [
    {
      label: 'Páginas publicadas',
      value: 42,
      icon: FileText,
      color: 'blue',
      trend: '+3',
      href: '/admin/pages',
    },
    {
      label: 'Insights posts',
      value: 127,
      icon: BookOpen,
      color: 'purple',
      trend: '+12',
      href: '/admin/insights',
    },
    {
      label: 'Servicios publicados',
      value: servicesStats.published,
      icon: Briefcase,
      color: 'green',
      trend: `${servicesStats.featured} destacados`,
      href: '/admin/services',
    },
    {
      label: 'Leads (30 días)',
      value: contactStats.last_30_days,
      icon: Mail,
      color: 'orange',
      trend: `${contactStats.new} nuevos`,
      href: '/admin/contact-submissions',
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Vista general del contenido y actividad del sitio web iData Global
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-gray-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-light text-gray-900">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.trend}</span>
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

      {/* Recent Contact Submissions */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Últimos contactos</h3>
          <Link 
            to="/admin/contact-submissions"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Ver todos →
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {recentSubmissions.length > 0 ? (
            recentSubmissions.map((submission) => (
              <div key={submission.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {submission.first_name} {submission.last_name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{submission.company}</p>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                    {submission.source_type || 'general'}
                  </span>
                  <span>·</span>
                  <span>{submission.source_title || 'Contacto general'}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{formatDate(submission.created_at)}</p>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No hay contactos recientes</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones rápidas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            to="/admin/insights"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Crear nuevo Insight</p>
              <p className="text-xs text-gray-500">Publicar contenido de blog</p>
            </div>
          </Link>

          <Link
            to="/admin/services"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group"
          >
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Briefcase className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Gestionar servicios</p>
              <p className="text-xs text-gray-500">Editar servicios del sitio</p>
            </div>
          </Link>

          <Link
            to="/admin/seo-settings"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
          >
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Configurar SEO</p>
              <p className="text-xs text-gray-500">Optimizar metadata</p>
            </div>
          </Link>

          <Link
            to="/admin/analytics"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
          >
            <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Ver analítica</p>
              <p className="text-xs text-gray-500">Configuración de tracking</p>
            </div>
          </Link>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Estado del sistema</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">CMS Online</p>
              <p className="text-xs text-gray-500">Modo: {process.env.NODE_ENV === 'production' ? 'Producción' : 'Desarrollo'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{servicesStats.total} Servicios</p>
              <p className="text-xs text-gray-500">{servicesStats.published} publicados</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Modo de datos</p>
              <p className="text-xs text-gray-500">Mock local</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
