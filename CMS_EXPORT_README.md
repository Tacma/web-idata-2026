# iData Global - CMS Exportable Code Guide

## 🎯 Overview

This CMS is built with **exportable, production-ready code** that works locally first and can later connect to a real backend without rebuilding the UI.

---

## 📂 Project Structure

```
/src/app/
├── admin/                          # Admin/CMS Module
│   ├── config/
│   │   └── dataProvider.ts         # Mock vs API mode switch
│   ├── mocks/
│   │   ├── services.mock.ts        # Service data
│   │   ├── contactSubmissions.mock.ts  # Contact submissions data
│   │   └── globalSettings.mock.ts  # Global configuration
│   ├── services/
│   │   ├── services.service.ts     # Service repository
│   │   ├── contactSubmissions.service.ts  # Submissions repository
│   │   └── globalSettings.service.ts  # Settings repository
│   ├── types/
│   │   └── index.ts                # TypeScript definitions (50+ interfaces)
│   ├── layouts/
│   │   └── AdminLayoutNew.tsx      # Admin layout (Spanish)
│   ├── pages/
│   │   ├── Dashboard.tsx           # Dashboard (uses real services)
│   │   ├── PagesAdmin.tsx          # Pages management
│   │   ├── ContactSubmissionsAdmin.tsx  # Leads management
│   │   ├── SEOSettingsAdmin.tsx    # SEO configuration
│   │   └── AnalyticsSettingsAdmin.tsx  # Analytics settings
│   └── components/                 # Reusable admin components
│
├── public/                         # Public Website Module
│   ├── layouts/
│   │   └── PublicLayout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   └── components/
│
├── shared/                         # Shared utilities
│   ├── components/
│   ├── types/
│   └── utils/
│
└── routes.tsx                      # React Router configuration
```

---

## 🔧 Data Provider Architecture

### Two Modes

The CMS supports two operational modes:

#### 1. **Mock Mode** (Current - for local development)
- Uses in-memory data stores
- No backend required
- Fully functional CRUD operations
- Perfect for code export and local testing

#### 2. **API Mode** (Future - for production)
- Connects to real backend API
- Same UI, same contracts
- Just change one config flag

### Configuration

**File:** `/src/app/admin/config/dataProvider.ts`

```typescript
export type DataProviderMode = 'mock' | 'api';

// Change this to switch modes
export const DATA_PROVIDER: DataProviderMode = 'mock';

// API URL for production
export const API_BASE_URL = 'http://localhost:3000/api';
```

---

## 🗂️ Service Layer Pattern

Every data collection follows this pattern:

### Example: Contact Submissions Service

**File:** `/src/app/admin/services/contactSubmissions.service.ts`

```typescript
import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { mockContactSubmissions } from '../mocks/contactSubmissions.mock';

// In-memory store for mock mode
let mockStore = [...mockContactSubmissions];

export async function getContactSubmissions() {
  if (DATA_PROVIDER === 'mock') {
    // Return from local store
    return Promise.resolve([...mockStore]);
  } else {
    // Fetch from API
    const response = await fetch(`${API_BASE_URL}/contact-submissions`);
    return response.json();
  }
}

export async function updateContactSubmissionStatus(id, status) {
  if (DATA_PROVIDER === 'mock') {
    // Update local store
    const index = mockStore.findIndex(s => s.id === id);
    mockStore[index] = { ...mockStore[index], status };
    return Promise.resolve(mockStore[index]);
  } else {
    // PATCH to API
    const response = await fetch(`${API_BASE_URL}/contact-submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    return response.json();
  }
}
```

### Benefits

✅ **Same interface** for mock and API modes  
✅ **Easy testing** without backend  
✅ **Simple migration** to production  
✅ **Type-safe** with TypeScript  

---

## 🌍 Language Configuration

### Admin Interface: Spanish Only

All admin navigation, labels, and UI text are in Spanish:
- Dashboard
- Servicios
- Industrias  
- Casos de éxito
- Configuración SEO
- etc.

### Public Website: English by Default

**Root URL behavior:**
- `/` → Redirects to `/en/` (English homepage)
- `/es/` → Spanish site
- `/en/` → English site

**Configured in:** `/src/app/routes.tsx`

```typescript
{
  path: '/',
  element: <Navigate to="/en/" replace />,
}
```

**Editable in global settings:**

```typescript
// mockGlobalConfiguration
default_public_language: 'en'  // or 'es'
```

---

## 📊 Real Data Connections

### Dashboard

**File:** `/src/app/admin/pages/Dashboard.tsx`

The dashboard uses real services:

```typescript
import { getContactSubmissionsStats } from '../services/contactSubmissions.service';
import { getServicesStats } from '../services/services.service';

function Dashboard() {
  const [stats, setStats] = useState({});
  
  useEffect(() => {
    async function load() {
      const contactStats = await getContactSubmissionsStats();
      const servicesStats = await getServicesStats();
      setStats({ contactStats, servicesStats });
    }
    load();
  }, []);
  
  // Render stats...
}
```

✅ **No hardcoded numbers**  
✅ **Real data from services**  
✅ **Works in mock mode**  
✅ **Ready for API mode**  

---

## 🔐 Contact Form Routing

### Commercial Forms → marketing@idata.global

All commercial leads route to `marketing@idata.global`:
- Contact page
- Service CTAs
- Industry CTAs
- Case study CTAs
- Insight CTAs

### Careers Forms → Separate

Job applications route to configurable HR email (separate from commercial).

### Lead Metadata

Every contact submission includes:
- `source_type` - Where it came from
- `source_slug` - Specific item identifier
- `source_title` - Human-readable title
- `intent` - User intention
- `language` - ES or EN
- `market` - Market identifier

**Example:**

```typescript
{
  id: 'cs-001',
  first_name: 'María',
  last_name: 'González',
  email: 'm.gonzalez@company.com',
  company: 'Tech Corp',
  message: '...',
  
  // Lead metadata
  source_type: 'service',
  source_slug: 'data-analytics',
  source_title: 'Data Analytics',
  language: 'es',
  intent: 'service-inquiry',
  
  // Routing
  notification_recipient: 'marketing@idata.global'
}
```

---

## 🚀 Running Locally

### Current Setup (Mock Mode)

1. **Clone/Export the code**
2. **Install dependencies**: `npm install`
3. **Run development server**: `npm run dev`
4. **Admin access**: `http://localhost:5173/admin`
5. **Public site**: `http://localhost:5173/` (English by default)

### What Works Now

✅ Admin dashboard with real stats  
✅ Contact submissions list  
✅ Services management UI  
✅ SEO settings UI  
✅ Analytics settings UI  
✅ Full CRUD flows in mock mode  
✅ CSV export  
✅ Status updates  
✅ Spanish admin interface  
✅ English default public site  

---

## 🔄 Migrating to Production (API Mode)

### Step 1: Build Backend API

Create API endpoints matching the service signatures:

```
GET    /api/contact-submissions
GET    /api/contact-submissions/:id
PATCH  /api/contact-submissions/:id
DELETE /api/contact-submissions/:id

GET    /api/services
GET    /api/services/:id
POST   /api/services
PATCH  /api/services/:id
DELETE /api/services/:id

GET    /api/settings/seo
PATCH  /api/settings/seo

GET    /api/settings/global
PATCH  /api/settings/global
```

### Step 2: Switch Data Provider

**File:** `/src/app/admin/config/dataProvider.ts`

```typescript
// Change from 'mock' to 'api'
export const DATA_PROVIDER: DataProviderMode = 'api';

// Set your API URL
export const API_BASE_URL = 'https://api.idata.global';
```

### Step 3: That's It!

✅ Same UI  
✅ Same components  
✅ Same types  
✅ No code rewrite  

---

## 📝 Type System

### Complete TypeScript Definitions

**File:** `/src/app/admin/types/index.ts`

50+ interfaces covering:
- Services
- Industries
- Case Studies
- Insights
- Contact Submissions
- Job Applications
- Team Members
- SEO Settings
- Analytics Settings
- Global Configuration
- Markets
- Navigation
- Redirects

### Example Type

```typescript
interface Service {
  id: string;
  slug: string;
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  summary_es: string;
  summary_en: string;
  description_es: string;
  description_en: string;
  hero_content: LocalizedField<HeroContent>;
  content_blocks: ContentBlock[];
  features: LocalizedField<Feature[]>;
  cta_config: CTAConfig;
  contact_prefill_config: ContactPrefillConfig;
  seo: SEOFields;
  market_visibility: MarketVisibilityRules;
  status: ContentStatus;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}
```

---

## 📦 Mock Data

### Realistic Sample Data

**Files:**
- `/src/app/admin/mocks/services.mock.ts`
- `/src/app/admin/mocks/contactSubmissions.mock.ts`
- `/src/app/admin/mocks/globalSettings.mock.ts`

### Example: Contact Submission

```typescript
{
  id: 'cs-001',
  first_name: 'María',
  last_name: 'González',
  email: 'm.gonzalez@techcorp.com',
  company: 'Tech Corp LATAM',
  country: 'Colombia',
  phone: '+57 300 123 4567',
  project_type: 'data-analytics',
  industry: 'financial',
  message: 'Hola, estoy interesada en Data Analytics...',
  source_type: 'service',
  source_slug: 'data-analytics',
  source_title: 'Data Analytics',
  language: 'es',
  status: 'new',
  notification_recipient: 'marketing@idata.global',
  created_at: '2026-03-13T14:30:00Z',
  updated_at: '2026-03-13T14:30:00Z'
}
```

---

## ✅ Quality Standards

### Code Export Quality

✅ **TypeScript everywhere**  
✅ **No Figma-only dependencies**  
✅ **Real data abstractions**  
✅ **Functional CRUD operations**  
✅ **Separated UI from data access**  
✅ **Reusable components**  
✅ **Clean naming conventions**  
✅ **Centralized configuration**  
✅ **No hardcoded values**  

### Development-Friendly

✅ **Works locally out of the box**  
✅ **No backend required to start**  
✅ **Easy to understand structure**  
✅ **Clear upgrade path to production**  
✅ **Well-documented**  

---

## 🎨 Admin UI (Spanish)

### Navigation Groups

1. **Resumen** - Dashboard
2. **Contenido** - Páginas, Servicios, Industrias, Casos de éxito, Insights, Categorías
3. **Equipo y Empleo** - Miembros del equipo, Vacantes, Aplicaciones
4. **Leads y Contacto** - Leads de contacto, Configuración de contacto
5. **Medios y Recursos** - Biblioteca de medios, Recursos
6. **Configuración del Sitio** - Navegación, SEO, Analítica, Mercados, Redirecciones, Configuración global
7. **Administración** - Usuarios y roles

---

## 🌐 Global Settings

### Editable Configuration

```typescript
interface GlobalConfiguration {
  default_public_language: 'es' | 'en';
  root_domain_language_mode: 'redirect' | 'default';
  marketing_email: string;
  careers_email: string;
  contact_phones: ContactPhone[];
  social_links: SocialLink[];
}
```

### Current Defaults

```typescript
{
  default_public_language: 'en',
  marketing_email: 'marketing@idata.global',
  careers_email: 'careers@idata.global',
  contact_phones: [
    { label: 'LATAM', number: '+57 300 571 3092' },
    { label: 'USA', number: '+1 303 901 9526' },
    { label: 'Administrative', number: '+57 300 479 91 52' }
  ],
  social_links: [
    { platform: 'linkedin', url: 'https://linkedin.com/...', enabled: true },
    { platform: 'instagram', url: 'https://instagram.com/...', enabled: true },
    { platform: 'youtube', url: 'https://youtube.com/...', enabled: true }
  ]
}
```

---

## 📚 Documentation

### Key Files

1. **`/CMS_ARCHITECTURE_IMPLEMENTATION.md`** - Complete architecture documentation
2. **`/CMS_EXPORT_README.md`** (this file) - Export and usage guide
3. **`/AUDIT_REPORT.md`** - Navigation audit results
4. **`/src/app/admin/types/index.ts`** - Type definitions reference

---

## 🚀 Next Steps for Backend Integration

### When Ready for Lovable/Backend

1. ✅ Code is already exportable and structured
2. ✅ Types are defined
3. ✅ Services have clean contracts
4. ⏳ Build backend API matching service signatures
5. ⏳ Switch `DATA_PROVIDER` to `'api'`
6. ⏳ Configure `API_BASE_URL`
7. ✅ Done! No UI rewrite needed

---

## 💡 Key Principles

1. **Local-first** - Works without backend
2. **Type-safe** - TypeScript everywhere
3. **Separation of concerns** - UI ≠ Data
4. **Easy migration** - Mock → API with one flag
5. **Production-ready** - Not just a prototype
6. **Spanish admin** - Native Spanish interface
7. **English default** - Public site defaults to English
8. **Real connections** - Dashboard reads from services
9. **Exportable** - No Figma-only dependencies
10. **Maintainable** - Clean, documented code

---

**Built for:** iData Global  
**Mode:** Mock (local runtime ready)  
**Admin Language:** Spanish  
**Public Default:** English  
**Status:** ✅ Ready for code export  
**Backend Ready:** ⏳ Waiting for API implementation  

---

**Happy coding! 🚀**
