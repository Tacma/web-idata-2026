# Plan de Implementación - Slugs Localizados para Servicios

## ✅ DECISIÓN TOMADA

Implementar **slugs completamente localizados** para mejor SEO y experiencia de usuario.

---

## 📊 ESTADO ACTUAL

### **Completado:**
✅ Agregado `slug_es` y `slug_en` a la interfaz `ServiceContent`  
✅ Primer servicio con slug localizado implementado:
- **Data Strategy & Governance**
  - `slug_es`: `estrategia-gobierno-datos`
  - `slug_en`: `data-strategy-governance`

### **Pendiente:**
⏸️ Actualizar slugs localizados de los demás servicios  
⏸️ Crear función de lookup bidireccional  
⏸️ Actualizar lógica de cambio de idioma en Header  
⏸️ Actualizar todas las referencias a slugs en URLs  

---

## 🎯 SLUGS PROPUESTOS

| Servicio | slug (ID) | slug_es | slug_en |
|----------|-----------|---------|---------|
| Data Strategy & Governance | `data-strategy-governance` | ✅ `estrategia-gobierno-datos` | `data-strategy-governance` |
| Data Engineering | `data-engineering` | `ingenieria-datos` | `data-engineering` |
| Advanced Analytics | `advanced-analytics` | `analitica-avanzada` | `advanced-analytics` |
| Artificial Intelligence | `artificial-intelligence` | `inteligencia-artificial` | `artificial-intelligence` |
| Data Platforms | `data-platforms` | `plataformas-datos` | `data-platforms` |
| Data Operations | `data-operations` | `operaciones-datos` | `data-operations` |

---

## 🔧 PASOS PARA COMPLETAR

### **1. Actualizar datos de servicios restantes**

```typescript
// En /src/app/public/pages/ServiceDetailPage.tsx
'data-engineering': {
  slug: 'data-engineering',
  slug_es: 'ingenieria-datos',     // ⭐ Actualizar
  slug_en: 'data-engineering',
  // ...
},
'advanced-analytics': {
  slug: 'advanced-analytics',
  slug_es: 'analitica-avanzada',   // ⭐ Actualizar
  slug_en: 'advanced-analytics',
  // ...
},
// ... rest
```

---

### **2. Crear función de lookup bidireccional**

Agregar al archivo `ServiceDetailPage.tsx`, antes del componente:

```typescript
// Función para buscar servicio por slug localizado
function findServiceByLocalizedSlug(
  slug: string, 
  language: Language
): ServiceContent | null {
  const field = language === 'es' ? 'slug_es' : 'slug_en';
  return Object.values(serviceContents).find(s => s[field] === slug) || null;
}

// Función para obtener el slug correcto según idioma
function getLocalizedSlug(service: ServiceContent, language: Language): string {
  return language === 'es' ? service.slug_es : service.slug_en;
}
```

---

### **3. Actualizar lógica de ServiceDetailPage**

Modificar el componente para buscar por slug localizado:

```typescript
export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  // Buscar por slug localizado en lugar de slug principal
  const serviceContent = slug ? findServiceByLocalizedSlug(slug, language) : null;
  
  // ... resto del código
}
```

---

### **4. Actualizar cambio de idioma en Header**

```typescript
// En /src/app/components/public/Header.tsx

const toggleLanguage = () => {
  const newLang = language === 'es' ? 'en' : 'es';
  const currentPath = location.pathname;
  const currentHash = location.hash;
  
  // Dividir path en segmentos
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  // Si no hay segmentos o el primero no es un idioma
  if (pathSegments.length === 0 || (pathSegments[0] !== 'es' && pathSegments[0] !== 'en')) {
    navigate(`/${newLang}/${currentHash}`);
    return;
  }
  
  // Remover el idioma actual
  pathSegments.shift();
  
  // Detectar si estamos en detalle de servicio
  const sectionSegment = pathSegments[0];
  const slugSegment = pathSegments[1];
  
  if ((sectionSegment === 'servicios' || sectionSegment === 'services') && slugSegment) {
    // Buscar el servicio por slug localizado actual
    const service = findServiceByLocalizedSlug(slugSegment, language);
    
    if (service) {
      // Obtener el slug del nuevo idioma
      const newSlug = getLocalizedSlug(service, newLang);
      const newSection = newLang === 'es' ? 'servicios' : 'services';
      const newPath = `/${newLang}/${newSection}/${newSlug}${currentHash}`;
      navigate(newPath);
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      return;
    }
  }
  
  // Mapear la primera sección (para páginas no-detalle)
  const firstSegment = pathSegments[0];
  const mappedSegment = routeMapping[firstSegment] || firstSegment;
  pathSegments[0] = mappedSegment;
  
  const newPath = `/${newLang}/${pathSegments.join('/')}${currentHash}`;
  navigate(newPath);
  
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
};
```

---

### **5. Actualizar referencias a slugs en URLs**

Buscar y reemplazar en todos los archivos:

**Antes:**
```typescript
to={`/${language}/services/${service.slug}`}
```

**Después:**
```typescript
to={`/${language}/services/${getLocalizedSlug(service, language)}`}
```

**Archivos a revisar:**
- `/src/app/public/pages/ServiceDetailPage.tsx` (sección "Otros servicios")
- `/src/app/public/pages/ServicesPage.tsx` (si existe)
- `/src/app/public/components/sections/HomeServicesSection.tsx` (si existe)
- Cualquier otro componente que enlace a servicios

---

### **6. Actualizar SEO meta tags**

```typescript
<SEOHead
  title={`${getLocalizedValue(serviceContent.title_es, serviceContent.title_en)} - iData`}
  description={getLocalizedValue(serviceContent.description_es, serviceContent.description_en)}
  canonical={`/${language}/${language === 'es' ? 'servicios' : 'services'}/${getLocalizedSlug(serviceContent, language)}`}
  alternateES={`/es/servicios/${serviceContent.slug_es}`}
  alternateEN={`/en/services/${serviceContent.slug_en}`}
  language={language}
/>
```

---

## 🧪 CASOS DE PRUEBA

Una vez implementado completamente, validar:

### **Test 1: Navegación directa con slug localizado**
```
ES: /es/servicios/estrategia-gobierno-datos → ✅ Muestra página correcta
EN: /en/services/data-strategy-governance → ✅ Muestra página correcta
```

### **Test 2: Cambio de idioma desde detalle**
```
Desde: /es/servicios/estrategia-gobierno-datos
Cambiar a EN: /en/services/data-strategy-governance ✅
Cambiar de vuelta a ES: /es/servicios/estrategia-gobierno-datos ✅
```

### **Test 3: Enlaces en "Otros servicios"**
```
Click en card de servicio:
ES: /es/servicios/ingenieria-datos ✅
EN: /en/services/data-engineering ✅
```

### **Test 4: Slug no encontrado**
```
/es/servicios/slug-inexistente → Muestra "Servicio no encontrado" ✅
```

---

## 📋 BENEFICIOS ESPERADOS

✅ **SEO mejorado** - URLs en idioma nativo  
✅ **Mejor UX** - Experiencia completamente localizada  
✅ **Profesionalismo** - Consistencia con sitio multiidioma  
✅ **Compartibilidad** - URLs más comprensibles  

---

## ⚠️ CONSIDERACIONES

### **Redirecciones (opcional)**
Si ya hay URLs publicadas con slugs en inglés en español, considerar agregar redirecciones 301:

```
/es/servicios/data-strategy-governance → 301 → /es/servicios/estrategia-gobierno-datos
```

### **Backup de slugs antiguos**
Mantener el campo `slug` como ID único para referencias internas y queries, independiente de los slugs de URL.

---

## 🚀 PRÓXIMOS PASOS

1. [ ] Completar slugs localizados de los 5 servicios restantes
2. [ ] Implementar función `findServiceByLocalizedSlug()`
3. [ ] Implementar función `getLocalizedSlug()`
4. [ ] Actualizar lógica de ServiceDetailPage
5. [ ] Actualizar lógica de cambio de idioma en Header
6. [ ] Actualizar todas las referencias a slugs
7. [ ] Actualizar SEO meta tags
8. [ ] Probar todos los casos de prueba
9. [ ] Documentar en guía de mantenimiento

---

## 📌 ESTADO

**Progreso:** 20% (1/6 servicios con slug localizado)  
**Estimación:** 2-3 horas para completar  
**Prioridad:** Media-Alta (mejora SEO significativa)
