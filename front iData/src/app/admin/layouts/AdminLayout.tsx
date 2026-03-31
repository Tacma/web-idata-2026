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
  Navigation,
  Search,
  BarChart3,
  Globe,
  Link2,
  Mail,
  ShieldCheck,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Home Sections', href: '/admin/home-sections', icon: Home },
  { name: 'Service Categories', href: '/admin/service-categories', icon: Layers },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Industries', href: '/admin/industries', icon: FolderOpen },
  { name: 'Case Studies', href: '/admin/case-studies', icon: FileText },
  { name: 'Blog Posts', href: '/admin/blog-posts', icon: BookOpen },
  { name: 'Blog Categories', href: '/admin/blog-categories', icon: Tags },
  { name: 'Jobs', href: '/admin/jobs', icon: JobsIcon },
  { name: 'Team Members', href: '/admin/team-members', icon: Users },
  { name: 'Resources', href: '/admin/resources', icon: Download },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
];

export function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">iData CMS</h1>
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
          <div className="h-full overflow-y-auto">
            {/* Logo */}
            <div className="hidden lg:block p-6 border-b border-gray-200">
              <Link to="/admin" className="text-2xl font-bold text-blue-600">
                iData CMS
              </Link>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${active 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Exit to Public Site Button */}
            <div className="p-4 border-t border-gray-200 mt-auto">
              <Link
                to="/es/"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Ver sitio público</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}