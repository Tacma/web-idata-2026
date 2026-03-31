# Plan de Migración de Assets - iData

## Resumen Ejecutivo
Este documento establece el plan completo para migrar los assets visuales del proyecto iData desde el sistema de Figma Make (imports `figma:asset/...`) hacia rutas públicas estándar (`/assets/...`) en producción.

## Estado Actual del Proyecto
- **Assets actuales**: 72 archivos PNG ubicados en `src/assets/` con nombres de hash
- **Imports activos**: 72 imports `figma:asset/hash.png` distribuidos en 12 archivos TypeScript/TSX
- **Estructura preparada**: Carpetas `public/assets/` creadas con jerarquía organizada
- **Estado de compilación**: ✅ Sin errores relacionados con assets (errores existentes solo en `scripts/seedSupabase.ts`)
- **Archivos bloqueados**: 0 (todos los imports resuelven correctamente en desarrollo)

## Convención Final de Rutas
### Estructura de Directorios
```
public/assets/
├── images/
│   ├── hero/           # Imágenes principales de páginas
│   ├── services/       # Iconos/ilustraciones de servicios
│   ├── case-studies/   # Imágenes de casos de estudio
│   ├── about/          # Contenido de página About
│   ├── team/           # Fotos del equipo
│   └── careers/        # Contenido de Careers
└── logos/
    ├── brand/          # Logo principal de iData
    ├── partners/       # Logos de partners tecnológicos
    └── clients/        # Logos de clientes
```

### Reglas de Nomenclatura
- **Formatos**: PNG para todas las imágenes
- **Nombres**: descriptivos en kebab-case (ej: `data-strategy.png`, `microsoft.png`)
- **Rutas públicas**: `/assets/[categoria]/[subcategoria]/[nombre].png`

## Estrategia de Reemplazo de Imports
### Patrón de Reemplazo
```typescript
// Antes (Figma Make)
import variableName from 'figma:asset/hash.png';

// Después (Rutas públicas)
import variableName from '/assets/categoria/subcategoria/nombre.png';
```

### Herramientas de Automatización
- **Archivo de mapeo**: `figma-asset-map.json` (generado desde template)
- **Script de migración**: Buscar/reemplazar basado en hash
- **Validación**: Verificación de existencia de archivos antes del reemplazo

## Orden Recomendado de Migración

### Fase 1: Logos (Prioridad Alta - Visibilidad Inmediata)
1. **Logos de brand** (Header, Footer)
2. **Logos de partners** (Services, Case Studies)
3. **Logos de clients** (Case Studies)

**Archivos afectados**: Header.tsx, Footer.tsx, ServicesPage.tsx, ServiceDetailPage.tsx, CaseStudiesIndex.tsx, CaseStudyDetail.tsx, PartnersSection.tsx

### Fase 2: Imágenes Hero (Prioridad Alta - Primera Impresión)
1. **Hero de páginas principales**
2. **Banners y carruseles**

**Archivos afectados**: Careers.tsx, About.tsx, IndustriesIndex.tsx, ServicesIndex.tsx, ServicesPage.tsx, Contact.tsx, CaseStudiesIndex.tsx, BannerCarousel.tsx, InsightsHero.tsx

### Fase 3: Contenido de Servicios (Prioridad Media)
1. **Iconos de servicios**
2. **Ilustraciones técnicas**

**Archivos afectados**: ServicesPage.tsx, ServiceDetailPage.tsx

### Fase 4: Contenido Secundario (Prioridad Baja)
1. **Fotos del equipo**
2. **Imágenes de about**
3. **Imágenes de case studies específicas**

**Archivos afectados**: About.tsx, CaseStudyDetail.tsx

## Validaciones Después de Cada Fase

### Validación Técnica
```bash
# Verificar build de producción
npm run build

# Verificar que no hay imports rotos
grep -r "figma:asset" src/ || echo "✅ No quedan imports figma:asset"

# Verificar existencia de archivos
find public/assets -name "*.png" | wc -l
```

### Validación Visual
- [ ] Header/Footer muestran logo correctamente
- [ ] Páginas hero cargan imágenes
- [ ] Secciones de partners/clients muestran logos
- [ ] No hay imágenes rotas (placeholders o errores 404)
- [ ] Responsive design mantiene proporciones

### Validación de Performance
- [ ] Tamaños de archivo optimizados (< 500KB por imagen)
- [ ] Formatos WebP/AVIF considerados para futuro
- [ ] Lazy loading implementado donde aplique

## Riesgos y Cómo Evitarlos

### Riesgo: Imports rotos durante migración
**Mitigación**: 
- Migrar por fases pequeñas
- Mantener backup del código
- Ejecutar build después de cada archivo modificado

### Riesgo: Assets finales no coinciden con nombres propuestos
**Mitigación**:
- Usar el template JSON como base flexible
- Ajustar rutas según assets reales recibidos
- Documentar cambios en el map

### Riesgo: Pérdida de calidad en assets finales
**Mitigación**:
- Verificar resolución y formato de assets entregados
- Comparar con assets actuales antes de reemplazar
- Mantener assets actuales como fallback temporal

### Riesgo: Problemas de cache en producción
**Mitigación**:
- Versionado de assets si es necesario
- Invalidación de cache en deployment
- Testing en staging environment

## Próximos Pasos Inmediatos

### Preparación (Antes de recibir assets)
1. ✅ Crear estructura `public/assets/`
2. ✅ Generar `FIGMA_ASSET_AUDIT.md`
3. ✅ Mejorar `figma-asset-map.template.json`
4. ✅ Crear este plan de migración

### Ejecución (Después de recibir assets)
1. **Recibir carpeta `public/assets`** con PNG finales
2. **Crear `figma-asset-map.json`** ajustado a assets reales
3. **Ejecutar migración por fases** según orden recomendado
4. **Validar cada fase** con build y testing visual
5. **Cleanup**: Eliminar carpeta `src/assets/` y archivos relacionados con Figma Make

## Checklist de Migración

### Pre-Migración
- [x] Estructura de carpetas creada
- [x] Inventario completo generado
- [x] Template JSON preparado
- [x] Plan de migración documentado

### Durante Migración
- [ ] Assets finales recibidos
- [ ] Map JSON actualizado
- [ ] Fase 1 completada (logos)
- [ ] Fase 2 completada (heroes)
- [ ] Fase 3 completada (servicios)
- [ ] Fase 4 completada (secundario)

### Post-Migración
- [ ] Build de producción exitoso
- [ ] Testing visual completo
- [ ] Performance verificada
- [ ] Cleanup realizado

## Notas Técnicas
- **Framework**: React + Vite + TypeScript
- **Assets actuales**: Resueltos por plugin de Figma Make en desarrollo
- **Assets futuros**: Servidos directamente desde `public/assets/` en producción
- **Compatibilidad**: Vite maneja rutas públicas automáticamente
- **SEO/Performance**: Rutas públicas optimizadas para CDN y caching

---

**Fecha de creación**: 15 de marzo de 2026
**Versión**: 1.0
**Responsable**: Engineer Senior - Migración Assets