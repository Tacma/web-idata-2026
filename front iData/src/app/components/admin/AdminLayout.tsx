import { Link, Outlet, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  FileText, 
  BookOpen, 
  Users, 
  FolderOpen,
  MessageSquare,
  Home,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Home Sections', href: '/admin/home-sections', icon: Home },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Service Categories', href: '/admin/service-categories', icon: Briefcase },
  { name: 'Industries', href: '/admin/industries', icon: Building2 },
  { name: 'Case Studies', href: '/admin/case-studies', icon: FileText },
  { name: 'Blog Posts', href: '/admin/blog-posts', icon: BookOpen },
  { name: 'Blog Categories', href: '/admin/blog-categories', icon: BookOpen },
  { name: 'Jobs', href: '/admin/jobs', icon: Users },
  { name: 'Team Members', href: '/admin/team-members', icon: Users },
  { name: 'Resources', href: '/admin/resources', icon: FolderOpen },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
];

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 w-64 bg-gray-900 text-white z-50 transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
            <Link to="/admin" className="text-xl font-bold">
              iData CMS
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                        ${isActive 
                          ? 'bg-gray-800 text-white' 
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <Link
              to="/es/"
              className="block text-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← View Public Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin Panel</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
