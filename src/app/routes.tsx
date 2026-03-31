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
import { JobsIndex } from './public/pages/JobsIndex';
import { JobDetail } from './public/pages/JobDetail';
import { ResourcesIndex } from './public/pages/ResourcesIndex';
import { ResourceDetail } from './public/pages/ResourceDetail';
import { Contact } from './public/pages/Contact';
import { DynamicSitePage } from './public/pages/DynamicSitePage';
import { LegalDocumentPage } from './public/pages/LegalDocumentPage';
import { NotFoundPage } from './public/pages/NotFoundPage';

// Admin Pages
import { Dashboard } from './admin/pages/Dashboard';
import { ContactSubmissionsAdmin } from './admin/pages/ContactSubmissionsAdmin';
import { SEOSettingsAdmin } from './admin/pages/SEOSettingsAdmin';
import { AnalyticsSettingsAdmin } from './admin/pages/AnalyticsSettingsAdmin';
import { LegalPagesAdmin } from './admin/pages/LegalPagesAdmin';
import { CollectionAdmin } from './admin/pages/CollectionAdmin';
import { PagesAdmin } from './admin/pages/PagesAdmin';
import { JobApplicationsAdmin } from './admin/pages/JobApplicationsAdmin';
import { ContactSettingsAdmin } from './admin/pages/ContactSettingsAdmin';
import { MediaLibraryAdmin } from './admin/pages/MediaLibraryAdmin';
import { NavigationAdmin } from './admin/pages/NavigationAdmin';
import { MarketsAdmin } from './admin/pages/MarketsAdmin';
import { RedirectsAdmin } from './admin/pages/RedirectsAdmin';
import { GlobalSettingsAdmin } from './admin/pages/GlobalSettingsAdmin';
import { UsersAdmin } from './admin/pages/UsersAdmin';
import { LoginPage } from './admin/pages/LoginPage';
import { ProtectedRoute } from './admin/components/ProtectedRoute';
import { CollectionEditorPage } from './admin/pages/CollectionEditorPage';
import { PageEditorPage } from './admin/pages/PageEditorPage';

export const router = createBrowserRouter([
  // Root redirect to English home (changed from Spanish)
  {
    path: '/',
    element: <Navigate to="/en/" replace />,
  },

  // Admin Routes
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayoutNew />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'pages', element: <PagesAdmin /> },
      { path: 'pages/new', element: <PageEditorPage /> },
      { path: 'pages/:id/edit', element: <PageEditorPage /> },
      { path: 'contact-submissions', element: <ContactSubmissionsAdmin /> },
      { path: 'seo-settings', element: <SEOSettingsAdmin /> },
      { path: 'legal-pages', element: <LegalPagesAdmin /> },
      { path: 'analytics', element: <AnalyticsSettingsAdmin /> },
      { 
        path: 'service-categories', 
        element: <CollectionAdmin collectionName="serviceCategories" title="Service Categories" /> 
      },
      {
        path: 'service-categories/new',
        element: <CollectionEditorPage collectionName="serviceCategories" />
      },
      {
        path: 'service-categories/:id/edit',
        element: <CollectionEditorPage collectionName="serviceCategories" />
      },
      { 
        path: 'services', 
        element: <CollectionAdmin collectionName="services" title="Services" /> 
      },
      {
        path: 'services/new',
        element: <CollectionEditorPage collectionName="services" />
      },
      {
        path: 'services/:id/edit',
        element: <CollectionEditorPage collectionName="services" />
      },
      { 
        path: 'partners', 
        element: <CollectionAdmin collectionName="partners" title="Partners" /> 
      },
      {
        path: 'partners/new',
        element: <CollectionEditorPage collectionName="partners" />
      },
      {
        path: 'partners/:id/edit',
        element: <CollectionEditorPage collectionName="partners" />
      },
      { 
        path: 'industries', 
        element: <CollectionAdmin collectionName="industries" title="Industries" /> 
      },
      {
        path: 'industries/new',
        element: <CollectionEditorPage collectionName="industries" />
      },
      {
        path: 'industries/:id/edit',
        element: <CollectionEditorPage collectionName="industries" />
      },
      { 
        path: 'case-studies', 
        element: <CollectionAdmin collectionName="caseStudies" title="Case Studies" /> 
      },
      {
        path: 'case-studies/new',
        element: <CollectionEditorPage collectionName="caseStudies" />
      },
      {
        path: 'case-studies/:id/edit',
        element: <CollectionEditorPage collectionName="caseStudies" />
      },
      { 
        path: 'insights', 
        element: <CollectionAdmin collectionName="blogPosts" title="Insights" /> 
      },
      {
        path: 'insights/new',
        element: <CollectionEditorPage collectionName="blogPosts" />
      },
      {
        path: 'insights/:id/edit',
        element: <CollectionEditorPage collectionName="blogPosts" />
      },
      { 
        path: 'blog-categories', 
        element: <CollectionAdmin collectionName="blogCategories" title="Blog Categories" /> 
      },
      {
        path: 'blog-categories/new',
        element: <CollectionEditorPage collectionName="blogCategories" />
      },
      {
        path: 'blog-categories/:id/edit',
        element: <CollectionEditorPage collectionName="blogCategories" />
      },
      { 
        path: 'jobs', 
        element: <CollectionAdmin collectionName="jobs" title="Jobs" /> 
      },
      {
        path: 'jobs/new',
        element: <CollectionEditorPage collectionName="jobs" />
      },
      {
        path: 'jobs/:id/edit',
        element: <CollectionEditorPage collectionName="jobs" />
      },
      { 
        path: 'team-members', 
        element: <CollectionAdmin collectionName="teamMembers" title="Team Members" /> 
      },
      {
        path: 'team-members/new',
        element: <CollectionEditorPage collectionName="teamMembers" />
      },
      {
        path: 'team-members/:id/edit',
        element: <CollectionEditorPage collectionName="teamMembers" />
      },
      { 
        path: 'resources', 
        element: <CollectionAdmin collectionName="resources" title="Resources" /> 
      },
      {
        path: 'resources/new',
        element: <CollectionEditorPage collectionName="resources" />
      },
      {
        path: 'resources/:id/edit',
        element: <CollectionEditorPage collectionName="resources" />
      },
      { 
        path: 'testimonials', 
        element: <CollectionAdmin collectionName="testimonials" title="Testimonials" /> 
      },
      {
        path: 'testimonials/new',
        element: <CollectionEditorPage collectionName="testimonials" />
      },
      {
        path: 'testimonials/:id/edit',
        element: <CollectionEditorPage collectionName="testimonials" />
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
        element: <Navigate to="/es/casos-de-exito" replace /> 
      },
      {
        path: 'casos-de-exito',
        element: <CaseStudiesIndex />
      },
      { 
        path: 'industrias/:slug', 
        element: <IndustryDetail /> 
      },
      
      // Case Studies
      { 
        path: 'casos', 
        element: <Navigate to="/es/casos-de-exito" replace /> 
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
        path: 'talento',
        element: <Careers />
      },
      {
        path: 'trabaja-con-nosotros/ofertas',
        element: <JobsIndex />
      },
      {
        path: 'talento/ofertas',
        element: <JobsIndex />
      },
      { 
        path: 'trabaja-con-nosotros/:slug', 
        element: <JobDetail /> 
      },
      {
        path: 'trabaja-con-nosotros/ofertas/:slug',
        element: <JobDetail />
      },
      {
        path: 'talento/ofertas/:slug',
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
      {
        path: '404',
        element: <NotFoundPage languageOverride="es" />,
      },
      {
        path: 'politica-de-privacidad',
        element: (
          <LegalDocumentPage
            documentKey="privacy"
            canonicalEs="/es/politica-de-privacidad/"
            canonicalEn="/en/privacy-policies/"
          />
        ),
      },
      {
        path: 'politicas-de-cookies',
        element: (
          <LegalDocumentPage
            documentKey="cookies"
            canonicalEs="/es/politicas-de-cookies/"
            canonicalEn="/en/politicas-de-cookies/"
          />
        ),
      },
      {
        path: '*',
        element: <DynamicSitePage />
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
        element: <Navigate to="/en/case-studies" replace /> 
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
        path: 'careers',
        element: <Careers />
      },
      {
        path: 'work-with-us/jobs',
        element: <JobsIndex />
      },
      {
        path: 'careers/jobs',
        element: <JobsIndex />
      },
      { 
        path: 'work-with-us/:slug', 
        element: <JobDetail /> 
      },
      {
        path: 'work-with-us/jobs/:slug',
        element: <JobDetail />
      },
      {
        path: 'careers/jobs/:slug',
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
      {
        path: '404',
        element: <NotFoundPage languageOverride="en" />,
      },
      {
        path: 'privacy-policies',
        element: (
          <LegalDocumentPage
            documentKey="privacy"
            canonicalEs="/es/politica-de-privacidad/"
            canonicalEn="/en/privacy-policies/"
          />
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <LegalDocumentPage
            documentKey="privacy"
            canonicalEs="/es/politica-de-privacidad/"
            canonicalEn="/en/privacy-policies/"
          />
        ),
      },
      {
        path: 'politicas-de-cookies',
        element: (
          <LegalDocumentPage
            documentKey="cookies"
            canonicalEs="/es/politicas-de-cookies/"
            canonicalEn="/en/politicas-de-cookies/"
          />
        ),
      },
      {
        path: 'cookie-policy',
        element: (
          <LegalDocumentPage
            documentKey="cookies"
            canonicalEs="/es/politicas-de-cookies/"
            canonicalEn="/en/politicas-de-cookies/"
          />
        ),
      },
      {
        path: '*',
        element: <DynamicSitePage />
      },
    ],
  },

  // 404 catch-all - redirect to English (default language)
  {
    path: '*',
    element: <NotFoundPage languageOverride="en" standalone />,
  },
]);
