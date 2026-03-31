# Estado de Localización de Slugs - iData Global

## 📊 SITUACIÓN ACTUAL

### **Implementación:** Slugs en inglés en ambos idiomas

Todos los servicios usan el **mismo slug en ES y EN** (siempre en inglés):

```
ES: /es/servicios/data-strategy-governance
EN: /en/services/data-strategy-governance

ES: /es/servicios/artificial-intelligence
EN: /en/services/artificial-intelligence
```

### **Estructura de Datos**

Los servicios tienen campos `slug_es` y `slug_en` en la interfaz, pero actualmente tienen el mismo valor:

```typescript
interface ServiceContent {
  slug: string;           // ID principal (usado para queries)
  slug_es: string;        // Slug para URLs en español
  slug_en: string;        // Slug para URLs en inglés
  // ... otros campos
}
```

**Valores actuales:**
```typescript
{
  slug: 'data-strategy-governance',
  slug_es: 'data-strategy-governance',  // 👈 Mismo valor
  slug_en: 'data-strategy-governance',  // 👈 Mismo valor
}
```

---

## 🎯 OPCIÓN A: Mantener Slugs en Inglés (Actual)

### **Ventajas:**
✅ **Simplicidad técnica** - Un solo slug para todo  
✅ **Sin riesgo de enlaces rotos** - URLs consistentes  
✅ **Menor complejidad** - No requiere mapeo bidireccional  
✅ **Más fácil de mantener** - Un solo punto de verdad  

### **Desventajas:**
❌ **URLs no localizadas** - Siempre en inglés en español  
❌ **Menos SEO-friendly** - No optimizado para cada idioma  
❌ **Experiencia menos nativa** - Usuario ve términos en inglés  

### **Ejemplo:**
```
ES: /es/servicios/data-strategy-governance
EN: /en/services/data-strategy-governance
```

---

## 🌍 OPCIÓN B: Slugs Localizados Completos

### **Ventajas:**
✅ **URLs completamente localizadas** - Mejor UX  
✅ **SEO optimizado** - URLs en idioma nativo  
✅ **Experiencia profesional** - Todo traducido  
✅ **Mejores para compartir** - URLs más comprensibles  

### **Desventajas:**
❌ **Mayor complejidad técnica** - Requiere mapeo  
❌ **Riesgo de enlaces rotos** - Si no se mapea bien  
❌ **Más mantenimiento** - Dos slugs por servicio  
❌ **Requiere actualizar rutas** - Cambios en router  

### **Ejemplo:**
```
ES: /es/servicios/estrategia-gobierno-datos
EN: /en/services/data-strategy-governance

ES: /es/servicios/inteligencia-artificial
EN: /en/services/artificial-intelligence
```

---

## 🔧 PASOS PARA IMPLEMENTAR OPCIÓN B

Si decides implementar slugs completamente localizados:

### **1. Actualizar los datos de servicios**

```typescript
const serviceContents: Record<string, ServiceContent> = {
  'data-strategy-governance': {
    slug: 'data-strategy-governance',  // ID único (no cambia)
    slug_es: 'estrategia-gobierno-datos',  // ⭐ Nuevo slug en español
    slug_en: 'data-strategy-governance',    // Slug en inglés
    // ...
  },
  'artificial-intelligence': {
    slug: 'artificial-intelligence',
    slug_es: 'inteligencia-artificial',     // ⭐ Nuevo
    slug_en: 'artificial-intelligence',
    // ...
  },
  // ... rest
};
```

### **2. Crear función de lookup bidireccional**

```typescript
// Función para encontrar servicio por slug localizado
function findServiceByLocalizedSlug(slug: string, language: Language): ServiceContent | null {
  const field = language === 'es' ? 'slug_es' : 'slug_en';
  return Object.values(serviceContents).find(s => s[field] === slug) || null;
}
```

### **3. Actualizar ServiceDetailPage**

```typescript
export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  
  // Buscar por slug localizado en lugar de slug principal
  const serviceContent = findServiceByLocalizedSlug(slug, language);
  
  // ... rest
}
```

### **4. Actualizar lógica de cambio de idioma en Header**

```typescript
const toggleLanguage = () => {
  const newLang = language === 'es' ? 'en' : 'es';
  const currentPath = location.pathname;
  
  // Detectar si estamos en detalle de servicio
  const serviceMatch = currentPath.match(/\/(servicios|services)\/(.+)/);
  
  if (serviceMatch) {
    const currentSlug = serviceMatch[2];
    
    // Buscar el servicio por slug actual
    const service = findServiceByLocalizedSlug(currentSlug, language);
    
    if (service) {
      // Obtener slug del nuevo idioma
      const newSlug = newLang === 'es' ? service.slug_es : service.slug_en;
      const newPath = `/${newLang}/${newLang === 'es' ? 'servicios' : 'services'}/${newSlug}`;
      navigate(newPath);
      return;
    }
  }
  
  // ... resto del código
};
```

### **5. Actualizar todas las referencias a slugs**

Buscar todos los lugares donde se genera una URL a un servicio y usar el slug correcto:

```typescript
// Antes:
to={`/${language}/services/${service.slug}`}

// Después:
to={`/${language}/services/${language === 'es' ? service.slug_es : service.slug_en}`}
```

### **6. Actualizar rutas en el router**

```typescript
// El router debe aceptar cualquier slug y delegar la búsqueda al componente
{
  path: ':slug',
  Component: ServiceDetailPage,
}
```

---

## 📋 SLUGS PROPUESTOS (Si implementas Opción B)

### **Data Strategy & Governance**
- ES: `estrategia-gobierno-datos`
- EN: `data-strategy-governance`

### **Data Engineering**
- ES: `ingenieria-datos`
- EN: `data-engineering`

### **Advanced Analytics**
- ES: `analitica-avanzada`
- EN: `advanced-analytics`

### **Artificial Intelligence**
- ES: `inteligencia-artificial`
- EN: `artificial-intelligence`

### **Data Platforms**
- ES: `plataformas-datos`
- EN: `data-platforms`

### **Data Operations**
- ES: `operaciones-datos`
- EN: `data-operations`

---

## 💡 RECOMENDACIÓN

Para un sitio corporativo profesional como iData Global, **recomiendo Opción B (Slugs Localizados)** por:

1. ✅ Mejor SEO en cada mercado
2. ✅ Experiencia más profesional y localizada
3. ✅ URLs más compartibles y comprensibles
4. ✅ Consistencia con el resto del sitio multiidioma

**Esfuerzo de implementación:** 2-3 horas  
**Beneficio:** Alto (SEO + UX)

---

## 🚀 ESTADO ACTUAL

**✅ Infraestructura lista** - Los campos existen  
**⏸️ Pendiente:** Activar slugs localizados  
**📝 Decisión:** Pendiente de confirmación  

**Para activar:** Seguir los 6 pasos descritos arriba

---

## 📌 PRÓXIMOS PASOS

1. **Decidir:** ¿Activamos slugs localizados?
2. **Si SÍ:** Implementar los 6 pasos
3. **Si NO:** Documentar que se mantiene simple por diseño
4. **Validar:** Probar cambio de idioma en todos los servicios
