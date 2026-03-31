# Insights Components

Sistema modular de componentes para la sección de Insights (Blog) de iData.

## Componentes

### InsightsHero
Hero compacto con título y subtítulo bilingüe para la página principal de Insights.

### InsightsSearch
Barra de búsqueda que filtra artículos por título, contenido y tags.

### InsightsFilterTabs
Tabs horizontales para filtrar artículos por categoría. Scrollable en móvil.

### InsightsFeatured
Card destacada para mostrar el artículo principal (featured = true).

### InsightsCard
Card individual para artículos en el grid. Incluye imagen, categoría, título, excerpt, metadata y tags.

### InsightsGrid
Grid responsivo (1/2/3 columnas) que organiza las cards de artículos.

### InsightsPagination
Botón "Load More" para cargar más artículos de forma progresiva.

### InsightsTags
Muestra tags clickeables en la página de detalle del artículo.

### InsightsShare
Botón de compartir en LinkedIn solamente (siguiendo política de redes sociales oficiales de iData).

### ArticleShare
Componente de compartir para artículos con variantes vertical (sidebar sticky) y horizontal (mobile). Solo LinkedIn + botón copiar enlace.

### SocialShare
Componente simplificado para compartir en LinkedIn.

### InsightsRelated
Sección de artículos relacionados (3 cards) basados en categoría y tags.

### AllInsightsBanner
Carousel horizontal navegable con TODOS los artículos disponibles. Se muestra al final de cada detalle de artículo con navegación por flechas y botón "Ver todos". Excluye el artículo actual.

## Uso

```tsx
import {
  InsightsHero,
  InsightsSearch,
  InsightsFilterTabs,
  InsightsFeatured,
  InsightsGrid,
  InsightsPagination
} from './components/insights';
```

## Diseño

- Liquid glass effects (backdrop-filter blur)
- Animaciones suaves con Motion
- Responsive design (mobile-first)
- Micro-interacciones en hover/tap
- Consistente con el sistema de diseño Bento Grid de iData

## Bilingüe

Todos los componentes soportan español (ES) e inglés (EN) automáticamente mediante el contexto de idioma.