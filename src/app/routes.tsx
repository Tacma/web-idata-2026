import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

// Layouts
import { PublicLayout } from './public/layouts/PublicLayout';
import { AdminLayoutNew } from './admin/layouts/AdminLayoutNew';
import { ProtectedRoute } from './admin/components/ProtectedRoute';

const Home = lazy(() => import('./public/pages/Home').then((module) => ({ default: module.Home })));
const About = lazy(() => import('./public/pages/About').then((module) => ({ default: module.About })));
const ServicesPage = lazy(() => import('./public/pages/ServicesPage').then((module) => ({ default: module.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./public/pages/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })));
const IndustryDetail = lazy(() => import('./public/pages/IndustryDetail').then((module) => ({ default: module.IndustryDetail })));
const CaseStudiesIndex = lazy(() => import('./public/pages/CaseStudiesIndex').then((module) => ({ default: module.CaseStudiesIndex })));
const CaseStudyDetail = lazy(() => import('./public/pages/CaseStudyDetail').then((module) => ({ default: module.CaseStudyDetail })));
const InsightsIndex = lazy(() => import('./public/pages/InsightsIndex').then((module) => ({ default: module.InsightsIndex })));
const InsightsDetail = lazy(() => import('./public/pages/InsightsDetail').then((module) => ({ default: module.InsightsDetail })));
const EventDetail = lazy(() => import('./public/pages/EventDetail').then((module) => ({ default: module.EventDetail })));
const BuildDetail = lazy(() => import('./public/pages/BuildDetail').then((module) => ({ default: module.BuildDetail })));
const Careers = lazy(() => import('./public/pages/Careers').then((module) => ({ default: module.Careers })));
const JobsIndex = lazy(() => import('./public/pages/JobsIndex').then((module) => ({ default: module.JobsIndex })));
const JobDetail = lazy(() => import('./public/pages/JobDetail').then((module) => ({ default: module.JobDetail })));
const ResourcesIndex = lazy(() => import('./public/pages/ResourcesIndex').then((module) => ({ default: module.ResourcesIndex })));
const ResourceDetail = lazy(() => import('./public/pages/ResourceDetail').then((module) => ({ default: module.ResourceDetail })));
const Contact = lazy(() => import('./public/pages/Contact').then((module) => ({ default: module.Contact })));
const DynamicSitePage = lazy(() => import('./public/pages/DynamicSitePage').then((module) => ({ default: module.DynamicSitePage })));
const LegalDocumentPage = lazy(() => import('./public/pages/LegalDocumentPage').then((module) => ({ default: module.LegalDocumentPage })));
const NotFoundPage = lazy(() => import('./public/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

const Dashboard = lazy(() => import('./admin/pages/Dashboard').then((module) => ({ default: module.Dashboard })));
const ContactSubmissionsAdmin = lazy(() => import('./admin/pages/ContactSubmissionsAdmin').then((module) => ({ default: module.ContactSubmissionsAdmin })));
const SEOSettingsAdmin = lazy(() => import('./admin/pages/SEOSettingsAdmin').then((module) => ({ default: module.SEOSettingsAdmin })));
const AnalyticsSettingsAdmin = lazy(() => import('./admin/pages/AnalyticsSettingsAdmin').then((module) => ({ default: module.AnalyticsSettingsAdmin })));
const LegalPagesAdmin = lazy(() => import('./admin/pages/LegalPagesAdmin').then((module) => ({ default: module.LegalPagesAdmin })));
const CollectionAdmin = lazy(() => import('./admin/pages/CollectionAdmin').then((module) => ({ default: module.CollectionAdmin })));
const PagesAdmin = lazy(() => import('./admin/pages/PagesAdmin').then((module) => ({ default: module.PagesAdmin })));
const JobApplicationsAdmin = lazy(() => import('./admin/pages/JobApplicationsAdmin').then((module) => ({ default: module.JobApplicationsAdmin })));
const ContactSettingsAdmin = lazy(() => import('./admin/pages/ContactSettingsAdmin').then((module) => ({ default: module.ContactSettingsAdmin })));
const MediaLibraryAdmin = lazy(() => import('./admin/pages/MediaLibraryAdmin').then((module) => ({ default: module.MediaLibraryAdmin })));
const NavigationAdmin = lazy(() => import('./admin/pages/NavigationAdmin').then((module) => ({ default: module.NavigationAdmin })));
const MarketsAdmin = lazy(() => import('./admin/pages/MarketsAdmin').then((module) => ({ default: module.MarketsAdmin })));
const RedirectsAdmin = lazy(() => import('./admin/pages/RedirectsAdmin').then((module) => ({ default: module.RedirectsAdmin })));
const GlobalSettingsAdmin = lazy(() => import('./admin/pages/GlobalSettingsAdmin').then((module) => ({ default: module.GlobalSettingsAdmin })));
const UsersAdmin = lazy(() => import('./admin/pages/UsersAdmin').then((module) => ({ default: module.UsersAdmin })));
const LoginPage = lazy(() => import('./admin/pages/LoginPage').then((module) => ({ default: module.LoginPage })));
const CollectionEditorPage = lazy(() => import('./admin/pages/CollectionEditorPage').then((module) => ({ default: module.CollectionEditorPage })));
const PageEditorPage = lazy(() => import('./admin/pages/PageEditorPage').then((module) => ({ default: module.PageEditorPage })));
const BrandCenterAdmin = lazy(() => import('./admin/pages/BrandCenterAdmin').then((module) => ({ default: module.BrandCenterAdmin })));
const IntegrationsAdmin = lazy(() => import('./admin/pages/IntegrationsAdmin').then((module) => ({ default: module.IntegrationsAdmin })));
const AboutPageAdmin = lazy(() => import('./admin/pages/AboutPageAdmin').then((module) => ({ default: module.AboutPageAdmin })));
const ContactPageAdmin = lazy(() => import('./admin/pages/ContactPageAdmin').then((module) => ({ default: module.ContactPageAdmin })));
const HomePageAdmin = lazy(() => import('./admin/pages/HomePageAdmin').then((module) => ({ default: module.HomePageAdmin })));

function withRouteLoader(element: React.ReactNode, minHeightClass = 'min-h-[40vh]') {
  return (
    <Suspense
      fallback={
        <div className={`${minHeightClass} bg-transparent`} aria-busy="true" aria-live="polite" />
      }
    >
      {element}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  // Root redirect to English home (changed from Spanish)
  {
    path: '/',
    element: <Navigate to="/en/" replace />,
  },

  // Admin Routes
  {
    path: '/admin/login',
    element: withRouteLoader(<LoginPage />, 'min-h-screen'),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayoutNew />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: withRouteLoader(<Dashboard />) },
      { path: 'home-page', element: withRouteLoader(<HomePageAdmin />) },
      { path: 'brand', element: withRouteLoader(<BrandCenterAdmin />) },
      { path: 'integrations', element: withRouteLoader(<IntegrationsAdmin />) },
      { path: 'about-page', element: withRouteLoader(<AboutPageAdmin />) },
      { path: 'contact-page', element: withRouteLoader(<ContactPageAdmin />) },
      { path: 'pages', element: withRouteLoader(<PagesAdmin />) },
      { path: 'pages/new', element: withRouteLoader(<PageEditorPage />) },
      { path: 'pages/:id/edit', element: withRouteLoader(<PageEditorPage />) },
      { path: 'contact-submissions', element: withRouteLoader(<ContactSubmissionsAdmin />) },
      { path: 'seo-settings', element: withRouteLoader(<SEOSettingsAdmin />) },
      { path: 'legal-pages', element: withRouteLoader(<LegalPagesAdmin />) },
      { path: 'analytics', element: withRouteLoader(<AnalyticsSettingsAdmin />) },
      { 
        path: 'service-categories', 
        element: withRouteLoader(<CollectionAdmin collectionName="serviceCategories" title="Service Categories" />)
      },
      {
        path: 'service-categories/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="serviceCategories" />)
      },
      {
        path: 'service-categories/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="serviceCategories" />)
      },
      { 
        path: 'services', 
        element: withRouteLoader(<CollectionAdmin collectionName="services" title="Services" />)
      },
      {
        path: 'services/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="services" />)
      },
      {
        path: 'services/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="services" />)
      },
      { 
        path: 'partners', 
        element: withRouteLoader(<CollectionAdmin collectionName="partners" title="Partners" />)
      },
      {
        path: 'partners/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="partners" />)
      },
      {
        path: 'partners/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="partners" />)
      },
      { 
        path: 'industries', 
        element: withRouteLoader(<CollectionAdmin collectionName="industries" title="Industries" />)
      },
      {
        path: 'industries/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="industries" />)
      },
      {
        path: 'industries/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="industries" />)
      },
      { 
        path: 'case-studies', 
        element: withRouteLoader(<CollectionAdmin collectionName="caseStudies" title="Case Studies" />)
      },
      {
        path: 'case-studies/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="caseStudies" />)
      },
      {
        path: 'case-studies/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="caseStudies" />)
      },
      { 
        path: 'insights', 
        element: withRouteLoader(<CollectionAdmin collectionName="blogPosts" title="Insights" />)
      },
      {
        path: 'insights/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="blogPosts" />)
      },
      {
        path: 'insights/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="blogPosts" />)
      },
      {
        path: 'insight-events',
        element: withRouteLoader(<CollectionAdmin collectionName="insightEvents" title="Insight Events" />)
      },
      {
        path: 'insight-events/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="insightEvents" />)
      },
      {
        path: 'insight-events/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="insightEvents" />)
      },
      {
        path: 'insight-labs',
        element: withRouteLoader(<CollectionAdmin collectionName="insightLabs" title="Insight Radar" />)
      },
      {
        path: 'insight-labs/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="insightLabs" />)
      },
      {
        path: 'insight-labs/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="insightLabs" />)
      },
      { 
        path: 'blog-categories', 
        element: withRouteLoader(<CollectionAdmin collectionName="blogCategories" title="Blog Categories" />)
      },
      {
        path: 'blog-categories/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="blogCategories" />)
      },
      {
        path: 'blog-categories/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="blogCategories" />)
      },
      { 
        path: 'jobs', 
        element: withRouteLoader(<CollectionAdmin collectionName="jobs" title="Jobs" />)
      },
      {
        path: 'jobs/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="jobs" />)
      },
      {
        path: 'jobs/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="jobs" />)
      },
      { 
        path: 'team-members', 
        element: withRouteLoader(<CollectionAdmin collectionName="teamMembers" title="Team Members" />)
      },
      {
        path: 'team-members/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="teamMembers" />)
      },
      {
        path: 'team-members/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="teamMembers" />)
      },
      { 
        path: 'resources', 
        element: withRouteLoader(<CollectionAdmin collectionName="resources" title="Resources" />)
      },
      {
        path: 'resources/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="resources" />)
      },
      {
        path: 'resources/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="resources" />)
      },
      { 
        path: 'testimonials', 
        element: withRouteLoader(<CollectionAdmin collectionName="testimonials" title="Testimonials" />)
      },
      {
        path: 'testimonials/new',
        element: withRouteLoader(<CollectionEditorPage collectionName="testimonials" />)
      },
      {
        path: 'testimonials/:id/edit',
        element: withRouteLoader(<CollectionEditorPage collectionName="testimonials" />)
      },
      { 
        path: 'job-applications', 
        element: withRouteLoader(<JobApplicationsAdmin />)
      },
      { 
        path: 'contact-settings', 
        element: withRouteLoader(<ContactSettingsAdmin />)
      },
      { 
        path: 'media-library', 
        element: withRouteLoader(<MediaLibraryAdmin />)
      },
      { 
        path: 'navigation', 
        element: withRouteLoader(<NavigationAdmin />)
      },
      { 
        path: 'markets', 
        element: withRouteLoader(<MarketsAdmin />)
      },
      { 
        path: 'redirects', 
        element: withRouteLoader(<RedirectsAdmin />)
      },
      { 
        path: 'global-settings', 
        element: withRouteLoader(<GlobalSettingsAdmin />)
      },
      { 
        path: 'users', 
        element: withRouteLoader(<UsersAdmin />)
      },
    ],
  },

  // Spanish Public Routes
  {
    path: '/es',
    element: <PublicLayout />,
    children: [
      { index: true, element: withRouteLoader(<Home />) },
      
      // Services
      { path: 'servicios', element: withRouteLoader(<ServicesPage />) },
      { path: 'servicios/:slug', element: withRouteLoader(<ServiceDetailPage />) },
      
      // Industries
      { 
        path: 'industrias', 
        element: <Navigate to="/es/casos-de-exito" replace /> 
      },
      {
        path: 'casos-de-exito',
        element: withRouteLoader(<CaseStudiesIndex />)
      },
      { 
        path: 'industrias/:slug', 
        element: withRouteLoader(<IndustryDetail />)
      },
      
      // Case Studies
      { 
        path: 'casos', 
        element: <Navigate to="/es/casos-de-exito" replace /> 
      },
      { 
        path: 'casos/:slug', 
        element: withRouteLoader(<CaseStudyDetail />)
      },
      
      // Insights (Blog)
      { 
        path: 'insights', 
        element: withRouteLoader(<InsightsIndex />)
      },
      {
        path: 'insights/events/:slug',
        element: withRouteLoader(<EventDetail />)
      },
      {
        path: 'insights/builds/:slug',
        element: withRouteLoader(<BuildDetail />)
      },
      {
        path: 'insights/:slug', 
        element: withRouteLoader(<InsightsDetail />)
      },
      
      // About
      { 
        path: 'nosotros', 
        element: withRouteLoader(<About />)
      },
      
      // Careers
      { 
        path: 'trabaja-con-nosotros', 
        element: withRouteLoader(<Careers />)
      },
      {
        path: 'talento',
        element: withRouteLoader(<Careers />)
      },
      {
        path: 'trabaja-con-nosotros/ofertas',
        element: withRouteLoader(<JobsIndex />)
      },
      {
        path: 'talento/ofertas',
        element: withRouteLoader(<JobsIndex />)
      },
      { 
        path: 'trabaja-con-nosotros/:slug', 
        element: withRouteLoader(<JobDetail />)
      },
      {
        path: 'trabaja-con-nosotros/ofertas/:slug',
        element: withRouteLoader(<JobDetail />)
      },
      {
        path: 'talento/ofertas/:slug',
        element: withRouteLoader(<JobDetail />)
      },
      
      // Resources
      { 
        path: 'recursos', 
        element: withRouteLoader(<ResourcesIndex />)
      },
      { 
        path: 'recursos/:slug', 
        element: withRouteLoader(<ResourceDetail />)
      },
      
      // Contact
      { 
        path: 'contacto', 
        element: withRouteLoader(<Contact />)
      },
      {
        path: '404',
        element: withRouteLoader(<NotFoundPage languageOverride="es" />),
      },
      {
        path: 'politica-de-privacidad',
        element: withRouteLoader(
          <LegalDocumentPage
            documentKey="privacy"
            canonicalEs="/es/politica-de-privacidad/"
            canonicalEn="/en/privacy-policies/"
          />
        ),
      },
      {
        path: 'politicas-de-cookies',
        element: withRouteLoader(
          <LegalDocumentPage
            documentKey="cookies"
            canonicalEs="/es/politicas-de-cookies/"
            canonicalEn="/en/politicas-de-cookies/"
          />
        ),
      },
      {
        path: '*',
        element: withRouteLoader(<DynamicSitePage />)
      },
    ],
  },

  // English Public Routes
  {
    path: '/en',
    element: <PublicLayout />,
    children: [
      { index: true, element: withRouteLoader(<Home />) },
      
      // Services
      { path: 'services', element: withRouteLoader(<ServicesPage />) },
      { path: 'services/:slug', element: withRouteLoader(<ServiceDetailPage />) },
      
      // Industries
      { 
        path: 'industries', 
        element: <Navigate to="/en/case-studies" replace /> 
      },
      { 
        path: 'industries/:slug', 
        element: withRouteLoader(<IndustryDetail />)
      },
      
      // Case Studies
      { 
        path: 'case-studies', 
        element: withRouteLoader(<CaseStudiesIndex />)
      },
      { 
        path: 'case-studies/:slug', 
        element: withRouteLoader(<CaseStudyDetail />)
      },
      
      // Insights (Blog)
      { 
        path: 'insights', 
        element: withRouteLoader(<InsightsIndex />)
      },
      {
        path: 'insights/events/:slug',
        element: withRouteLoader(<EventDetail />)
      },
      {
        path: 'insights/builds/:slug',
        element: withRouteLoader(<BuildDetail />)
      },
      {
        path: 'insights/:slug', 
        element: withRouteLoader(<InsightsDetail />)
      },
      
      // About
      { 
        path: 'about', 
        element: withRouteLoader(<About />)
      },
      
      // Careers
      { 
        path: 'work-with-us', 
        element: withRouteLoader(<Careers />)
      },
      {
        path: 'careers',
        element: withRouteLoader(<Careers />)
      },
      {
        path: 'work-with-us/jobs',
        element: withRouteLoader(<JobsIndex />)
      },
      {
        path: 'careers/jobs',
        element: withRouteLoader(<JobsIndex />)
      },
      { 
        path: 'work-with-us/:slug', 
        element: withRouteLoader(<JobDetail />)
      },
      {
        path: 'work-with-us/jobs/:slug',
        element: withRouteLoader(<JobDetail />)
      },
      {
        path: 'careers/jobs/:slug',
        element: withRouteLoader(<JobDetail />)
      },
      
      // Resources
      { 
        path: 'resources', 
        element: withRouteLoader(<ResourcesIndex />)
      },
      { 
        path: 'resources/:slug', 
        element: withRouteLoader(<ResourceDetail />)
      },
      
      // Contact
      { 
        path: 'contact', 
        element: withRouteLoader(<Contact />)
      },
      {
        path: '404',
        element: withRouteLoader(<NotFoundPage languageOverride="en" />),
      },
      {
        path: 'privacy-policies',
        element: withRouteLoader(
          <LegalDocumentPage
            documentKey="privacy"
            canonicalEs="/es/politica-de-privacidad/"
            canonicalEn="/en/privacy-policies/"
          />
        ),
      },
      {
        path: 'privacy-policy',
        element: withRouteLoader(
          <LegalDocumentPage
            documentKey="privacy"
            canonicalEs="/es/politica-de-privacidad/"
            canonicalEn="/en/privacy-policies/"
          />
        ),
      },
      {
        path: 'politicas-de-cookies',
        element: withRouteLoader(
          <LegalDocumentPage
            documentKey="cookies"
            canonicalEs="/es/politicas-de-cookies/"
            canonicalEn="/en/politicas-de-cookies/"
          />
        ),
      },
      {
        path: 'cookie-policy',
        element: withRouteLoader(
          <LegalDocumentPage
            documentKey="cookies"
            canonicalEs="/es/politicas-de-cookies/"
            canonicalEn="/en/politicas-de-cookies/"
          />
        ),
      },
      {
        path: '*',
        element: withRouteLoader(<DynamicSitePage />)
      },
    ],
  },

  // 404 catch-all - redirect to English (default language)
  {
    path: '*',
    element: withRouteLoader(<NotFoundPage languageOverride="en" standalone />, 'min-h-screen'),
  },
]);
