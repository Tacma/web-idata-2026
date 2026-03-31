# iData Corporate Website - Technical Architecture

This project contains the complete architectural foundation for the iData corporate website built in Figma Make. It includes a public multilingual website and an internal CMS admin panel.

## 🏗️ Architecture Overview

This is a **technical architecture project** prioritizing:
- ✅ Scalable data models
- ✅ Clean code organization
- ✅ SEO-ready infrastructure
- ✅ Database integration preparation
- ✅ Multilingual routing (ES/EN)

Visual design is minimal by design. This is a foundation for developers.

## 📁 Project Structure

```
/src/app/
├── types/              # TypeScript type definitions for all collections
├── data/               # Mock data (ready to be replaced with DB calls)
├── utils/              # Utilities (SEO, i18n, routing)
├── components/
│   ├── public/         # Public site components (Header, Footer, Breadcrumb)
│   └── admin/          # Admin CMS components (Layout, CollectionList)
├── pages/
│   ├── public/         # Public pages for ES/EN routes
│   └── admin/          # Admin panel pages (Dashboard, CRUD interfaces)
├── routes.ts           # React Router configuration
└── App.tsx             # Root application component
```

## 🌍 Multilingual Routes

All routes are prefixed with language code (`/es/` or `/en/`). Each language has independent:
- URLs and slugs
- Content and metadata
- SEO configuration
- Home page structure

### Public Routes

**Spanish (`/es/`):**
- `/es/` - Home
- `/es/servicios/` - Services index
- `/es/servicios/{slug-es}` - Service detail
- `/es/industrias/` - Industries
- `/es/industrias/{slug-es}` - Industry detail
- `/es/casos/` - Case studies
- `/es/casos/{slug-es}` - Case study detail
- `/es/insights/` - Blog
- `/es/insights/{slug-es}` - Blog post
- `/es/nosotros/` - About
- `/es/talento/` - Careers
- `/es/talento/ofertas/` - Jobs
- `/es/talento/ofertas/{slug-es}` - Job detail
- `/es/recursos/` - Resources
- `/es/recursos/{slug-es}` - Resource detail
- `/es/contacto/` - Contact

**English (`/en/`):**
- Same structure with English slugs (`/en/services/`, `/en/case-studies/`, etc.)

### Admin Routes

- `/admin` - Dashboard
- `/admin/home-sections` - Configure home page sections per language
- `/admin/services` - Manage services
- `/admin/service-categories` - Manage service categories (SEO clusters)
- `/admin/industries` - Manage industries
- `/admin/case-studies` - Manage case studies
- `/admin/blog-posts` - Manage blog posts
- `/admin/blog-categories` - Manage blog categories
- `/admin/jobs` - Manage job listings
- `/admin/team-members` - Manage team profiles
- `/admin/resources` - Manage resources
- `/admin/testimonials` - Manage testimonials

## 📊 Data Collections

All collections follow consistent patterns:

### Core Collections

1. **Services** - Service offerings with category assignment
2. **ServiceCategories** - Fixed SEO clusters (strategy-consulting, data-delivery, data-operations, cloud-services)
3. **Industries** - Industry verticals
4. **CaseStudies** - Success stories with industry/service references
5. **BlogPosts** - Insights articles with categories
6. **BlogCategories** - Blog taxonomy
7. **Jobs** - Career opportunities
8. **TeamMembers** - Team profiles
9. **Resources** - Downloadable resources (eBooks, whitepapers, etc.)
10. **Testimonials** - Client testimonials
11. **HomeSections** - Dynamic home page configuration per language

### Standard Fields Pattern

Every collection includes:
- `title_es` / `title_en` - Localized titles
- `slug_es` / `slug_en` - Independent URL slugs
- `seo_es` / `seo_en` - SEO metadata (metaTitle, metaDescription, ogImage, keywords)
- `status` - "draft" or "published"
- `order` - Manual sorting
- Content fields in both languages
- Timestamps (createdAt, updatedAt)

## 🔧 SEO Infrastructure

Built-in SEO support:
- Dynamic meta tags per page
- Canonical URLs
- Hreflang tags for language alternates
- Open Graph metadata
- Twitter Card metadata
- Schema.org structured data helpers
- Breadcrumb navigation

## 🎨 Home Sections System

The `HomeSections` collection allows complete customization of the home page per language.

**Available Section Types:**
- `hero` - Hero banner
- `featured-services` - Featured services grid
- `featured-industries` - Featured industries
- `featured-cases` - Success stories showcase
- `featured-insights` - Blog highlights
- `testimonials` - Client testimonials
- `logos` - Client logo grid
- `cta` - Call to action
- `stats` - Statistics/metrics
- `custom` - Custom HTML/JSON content

Each section can be activated/deactivated and reordered independently for ES and EN.

## 🗄️ Database Integration

The architecture is ready for database connection:

1. Replace `/src/app/data/mockData.ts` with actual API/database calls
2. All type definitions are in `/src/app/types/index.ts`
3. Consider using:
   - Supabase for PostgreSQL backend
   - Prisma ORM for type-safe queries
   - tRPC for end-to-end type safety
   - Or any REST/GraphQL API

## 🚀 Next Steps for Development

1. **Connect Database**: Replace mock data with real database
2. **Implement Admin Forms**: Build create/edit forms for each collection
3. **Add Authentication**: Protect admin routes
4. **Rich Text Editor**: Add editor for content fields
5. **Image Upload**: Implement image management
6. **API Integration**: Build backend endpoints
7. **Visual Design**: Apply brand identity and design system
8. **Content Migration**: Import existing content
9. **Performance**: Add caching, lazy loading, etc.
10. **Deployment**: Configure hosting and CI/CD

## 📝 Development Notes

- All pages are structurally complete but minimally styled
- Focus is on architecture, not aesthetics
- Code is organized for easy maintenance
- TypeScript ensures type safety across collections
- React Router v7 with data mode pattern
- Tailwind CSS v4 for styling

## 🛠️ Technologies

- React 18
- TypeScript
- React Router 7
- Tailwind CSS 4
- Lucide React (icons)
- Vite (build tool)

---

**This is a foundation project.** The technical architecture is solid and ready for:
- Backend integration
- Visual design application
- Production deployment
- Team collaboration
