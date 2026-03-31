import { createBrowserRouter, Navigate } from 'react-router';

// Layouts
import { PublicLayout } from './public/layouts/PublicLayout';
import { AdminLayoutNew } from './admin/layouts/AdminLayoutNew';

// Public Pages
import { Home } from './public/pages/Home';
import { About } from './public/pages/About';
import { ServicesPage } from './public/pages/ServicesPage';
import { ServiceCategory } from './public/pages/ServiceCategory';
import { ServiceDetail } from './public/pages/ServiceDetail';
import { ServiceDetailPage } from './public/pages/ServiceDetailPage';
import { PlaceholderPage } from './public/pages/PlaceholderPage';
import { IndustriesIndex } from './public/pages/IndustriesIndex';
import { IndustryDetail } from './public/pages/IndustryDetail';
import { CaseStudiesIndex } from './public/pages/CaseStudiesIndex';
import { CaseStudyDetail } from './public/pages/CaseStudyDetail';
import { InsightsIndex } from './public/pages/InsightsIndex';
import { InsightsDetail } from './public/pages/InsightsDetail';
import { Careers } from './public/pages/Careers';
import { JobDetail } from './public/pages/JobDetail';
import { ResourcesIndex } from './public/pages/ResourcesIndex';
import { ResourceDetail } from './public/pages/ResourceDetail';
import { Contact } from './public/pages/Contact';

// Admin Pages
import { Dashboard } from './admin/pages/Dashboard';
import { PagesAdmin } from './admin/pages/PagesAdmin';
import { ContactSubmissionsAdmin } from './admin/pages/ContactSubmissionsAdmin';
import { SEOSettingsAdmin } from './admin/pages/SEOSettingsAdmin';
import { AnalyticsSettingsAdmin } from './admin/pages/AnalyticsSettingsAdmin';
import { HomeSectionsAdmin } from './admin/pages/HomeSectionsAdmin';
import { CollectionAdmin } from './admin/pages/CollectionAdmin';
import { JobApplicationsAdmin } from './admin/pages/JobApplicationsAdmin';
import { ContactSettingsAdmin } from './admin/pages/ContactSettingsAdmin';
import { MediaLibraryAdmin } from './admin/pages/MediaLibraryAdmin';
import { NavigationAdmin } from './admin/pages/NavigationAdmin';
import { MarketsAdmin } from './admin/pages/MarketsAdmin';
import { RedirectsAdmin } from './admin/pages/RedirectsAdmin';
import { GlobalSettingsAdmin } from './admin/pages/GlobalSettingsAdmin';
import { UsersAdmin } from './admin/pages/UsersAdmin';

export const router = createBrowserRouter([
  // Root redirect to English home (changed from Spanish)
  {
    path: '/',
    element: <Navigate to="/en/" replace />,
  },

  // Admin Routes (all in Spanish)
  {
    path: '/admin',
    element: <AdminLayoutNew />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'pages', element: <PagesAdmin /> },
      { path: 'contact-submissions', element: <ContactSubmissionsAdmin /> },
      { path: 'seo-settings', element: <SEOSettingsAdmin /> },
      { path: 'analytics', element: <AnalyticsSettingsAdmin /> },
      { path: 'home-sections', element: <HomeSectionsAdmin /> },
      { 
        path: 'service-categories', 
        element: <CollectionAdmin collectionName="serviceCategories" title="Service Categories" /> 
      },
      { 
        path: 'services', 
        element: <CollectionAdmin collectionName="services" title="Services" /> 
      },
      { 
        path: 'industries', 
        element: <CollectionAdmin collectionName="industries" title="Industries" /> 
      },
      { 
        path: 'case-studies', 
        element: <CollectionAdmin collectionName="caseStudies" title="Case Studies" /> 
      },
      { 
        path: 'blog-posts', 
        element: <CollectionAdmin collectionName="blogPosts" title="Blog Posts" /> 
      },
      { 
        path: 'blog-categories', 
        element: <CollectionAdmin collectionName="blogCategories" title="Blog Categories" /> 
      },
      { 
        path: 'jobs', 
        element: <CollectionAdmin collectionName="jobs" title="Jobs" /> 
      },
      { 
        path: 'team-members', 
        element: <CollectionAdmin collectionName="teamMembers" title="Team Members" /> 
      },
      { 
        path: 'resources', 
        element: <CollectionAdmin collectionName="resources" title="Resources" /> 
      },
      { 
        path: 'testimonials', 
        element: <CollectionAdmin collectionName="testimonials" title="Testimonials" /> 
      },
      { 
        path: 'job-applications', 
        element: <JobApplicationsAdmin /> 
      },
      { 
        path: 'contact-settings', 
        element: <ContactSettingsAdmin /> 
      },
      { 
        path: 'media-library', 
        element: <MediaLibraryAdmin /> 
      },
      { 
        path: 'navigation', 
        element: <NavigationAdmin /> 
      },
      { 
        path: 'markets', 
        element: <MarketsAdmin /> 
      },
      { 
        path: 'redirects', 
        element: <RedirectsAdmin /> 
      },
      { 
        path: 'global-settings', 
        element: <GlobalSettingsAdmin /> 
      },
      { 
        path: 'users', 
        element: <UsersAdmin /> 
      },
    ],
  },

  // Spanish Public Routes
  {
    path: '/es',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      
      // Services
      { path: 'servicios', element: <ServicesPage /> },
      { path: 'servicios/:slug', element: <ServiceDetailPage /> },
      
      // Industries
      { 
        path: 'industrias', 
        element: <IndustriesIndex /> 
      },
      { 
        path: 'industrias/:slug', 
        element: <IndustryDetail /> 
      },
      
      // Case Studies
      { 
        path: 'casos', 
        element: <CaseStudiesIndex /> 
      },
      { 
        path: 'casos/:slug', 
        element: <CaseStudyDetail /> 
      },
      
      // Insights (Blog)
      { 
        path: 'insights', 
        element: <InsightsIndex /> 
      },
      { 
        path: 'insights/:slug', 
        element: <InsightsDetail /> 
      },
      
      // About
      { 
        path: 'nosotros', 
        element: <About /> 
      },
      
      // Careers
      { 
        path: 'trabaja-con-nosotros', 
        element: <Careers /> 
      },
      { 
        path: 'trabaja-con-nosotros/:slug', 
        element: <JobDetail /> 
      },
      
      // Resources
      { 
        path: 'recursos', 
        element: <ResourcesIndex /> 
      },
      { 
        path: 'recursos/:slug', 
        element: <ResourceDetail /> 
      },
      
      // Contact
      { 
        path: 'contacto', 
        element: <Contact /> 
      },
    ],
  },

  // English Public Routes
  {
    path: '/en',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      
      // Services
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      
      // Industries
      { 
        path: 'industries', 
        element: <IndustriesIndex /> 
      },
      { 
        path: 'industries/:slug', 
        element: <IndustryDetail /> 
      },
      
      // Case Studies
      { 
        path: 'case-studies', 
        element: <CaseStudiesIndex /> 
      },
      { 
        path: 'case-studies/:slug', 
        element: <CaseStudyDetail /> 
      },
      
      // Insights (Blog)
      { 
        path: 'insights', 
        element: <InsightsIndex /> 
      },
      { 
        path: 'insights/:slug', 
        element: <InsightsDetail /> 
      },
      
      // About
      { 
        path: 'about', 
        element: <About /> 
      },
      
      // Careers
      { 
        path: 'work-with-us', 
        element: <Careers /> 
      },
      { 
        path: 'work-with-us/:slug', 
        element: <JobDetail /> 
      },
      
      // Resources
      { 
        path: 'resources', 
        element: <ResourcesIndex /> 
      },
      { 
        path: 'resources/:slug', 
        element: <ResourceDetail /> 
      },
      
      // Contact
      { 
        path: 'contact', 
        element: <Contact /> 
      },
    ],
  },

  // 404 catch-all - redirect to English (default language)
  {
    path: '*',
    element: <Navigate to="/en/" replace />,
  },
]);