import { Link } from 'react-router';
import { 
  Briefcase, 
  Building2, 
  FileText, 
  BookOpen, 
  Users, 
  FolderOpen,
  MessageSquare,
  Home
} from 'lucide-react';
import { mockCollections } from '../../data/mockData';

export function Dashboard() {
  const stats = [
    {
      name: 'Services',
      count: mockCollections.services.length,
      icon: Briefcase,
      href: '/admin/services',
      color: 'bg-blue-500',
    },
    {
      name: 'Industries',
      count: mockCollections.industries.length,
      icon: Building2,
      href: '/admin/industries',
      color: 'bg-green-500',
    },
    {
      name: 'Case Studies',
      count: mockCollections.caseStudies.length,
      icon: FileText,
      href: '/admin/case-studies',
      color: 'bg-purple-500',
    },
    {
      name: 'Blog Posts',
      count: mockCollections.blogPosts.length,
      icon: BookOpen,
      href: '/admin/blog-posts',
      color: 'bg-orange-500',
    },
    {
      name: 'Jobs',
      count: mockCollections.jobs.length,
      icon: Users,
      href: '/admin/jobs',
      color: 'bg-pink-500',
    },
    {
      name: 'Resources',
      count: mockCollections.resources.length,
      icon: FolderOpen,
      href: '/admin/resources',
      color: 'bg-teal-500',
    },
    {
      name: 'Testimonials',
      count: mockCollections.testimonials.length,
      icon: MessageSquare,
      href: '/admin/testimonials',
      color: 'bg-indigo-500',
    },
    {
      name: 'Home Sections',
      count: mockCollections.homeSections.length,
      icon: Home,
      href: '/admin/home-sections',
      color: 'bg-red-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your iData website content and configuration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.count}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{stat.name}</h3>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-1">Configure Home Sections</h3>
            <p className="text-sm text-gray-600 mb-2">
              Set up the sections that will appear on your home page for each language
            </p>
            <Link to="/admin/home-sections" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage Home Sections →
            </Link>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-1">Add Your Services</h3>
            <p className="text-sm text-gray-600 mb-2">
              Create and organize your service offerings with multilingual content
            </p>
            <Link to="/admin/services" className="text-green-600 hover:text-green-800 text-sm font-medium">
              Manage Services →
            </Link>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-1">Publish Case Studies</h3>
            <p className="text-sm text-gray-600 mb-2">
              Showcase your success stories with detailed case studies
            </p>
            <Link to="/admin/case-studies" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Manage Case Studies →
            </Link>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold mb-1">Architecture Notes</h3>
            <p className="text-sm text-gray-600">
              This CMS is ready for database integration. All collections follow a consistent structure with:
            </p>
            <ul className="text-sm text-gray-600 list-disc list-inside mt-2 space-y-1">
              <li>Separate ES/EN content fields</li>
              <li>Independent slugs per language</li>
              <li>SEO metadata per language</li>
              <li>Status management (draft/published)</li>
              <li>Manual ordering capabilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
