# Guía de Pruebas - Cambio de Idioma

## ✅ IMPLEMENTACIÓN COMPLETADA

Se ha corregido la lógica del cambio de idioma en el Header para mantener al usuario en la misma página equivalente, preservando slugs, parámetros y anchors.

---

## 🎯 CASOS DE PRUEBA

### 1. HOME
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/` | `/en/` | `/es/` |
| `/en/` | `/en/` | `/es/` |

**Resultado esperado:** ✅ Mantiene en Home del nuevo idioma

---

### 2. SERVICIOS (Página Principal)
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/servicios/` | `/en/services/` | `/es/servicios/` |
| `/en/services/` | `/en/services/` | `/es/servicios/` |

**Resultado esperado:** ✅ Mapea correctamente servicios ↔ services

---

### 3. DETALLE DE SERVICIO
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/servicios/artificial-intelligence` | `/en/services/artificial-intelligence` | `/es/servicios/artificial-intelligence` |
| `/es/servicios/data-engineering` | `/en/services/data-engineering` | `/es/servicios/data-engineering` |
| `/es/servicios/data-strategy-governance` | `/en/services/data-strategy-governance` | `/es/servicios/data-strategy-governance` |
| `/en/services/data-platforms` | `/en/services/data-platforms` | `/es/servicios/data-platforms` |

**Resultado esperado:** ✅ Mantiene el slug del servicio y solo cambia la sección principal

---

### 4. CASOS (Página Principal)
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/casos/` | `/en/case-studies/` | `/es/casos/` |
| `/en/case-studies/` | `/en/case-studies/` | `/es/casos/` |

**Resultado esperado:** ✅ Mapea correctamente casos ↔ case-studies

---

### 5. DETALLE DE CASO
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/casos/cueros-velez` | `/en/case-studies/cueros-velez` | `/es/casos/cueros-velez` |
| `/es/casos/haceb` | `/en/case-studies/haceb` | `/es/casos/haceb` |
| `/es/casos/nadro` | `/en/case-studies/nadro` | `/es/casos/nadro` |

**Resultado esperado:** ✅ Mantiene el slug del caso y solo cambia la sección principal

---

### 6. INSIGHTS (Página Principal)
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/insights/` | `/en/insights/` | `/es/insights/` |
| `/en/insights/` | `/en/insights/` | `/es/insights/` |

**Resultado esperado:** ✅ insights se mantiene igual en ambos idiomas

---

### 7. DETALLE DE INSIGHT
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/insights/article-slug` | `/en/insights/article-slug` | `/es/insights/article-slug` |
| `/en/insights/another-article` | `/en/insights/another-article` | `/es/insights/another-article` |

**Resultado esperado:** ✅ Mantiene el slug del artículo

---

### 8. INDUSTRIAS
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/industrias/` | `/en/industries/` | `/es/industrias/` |
| `/es/industrias/retail` | `/en/industries/retail` | `/es/industrias/retail` |

**Resultado esperado:** ✅ Mapea industrias ↔ industries y mantiene slug

---

### 9. NOSOTROS / ABOUT
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/nosotros/` | `/en/about/` | `/es/nosotros/` |
| `/en/about/` | `/en/about/` | `/es/nosotros/` |

**Resultado esperado:** ✅ Mapea nosotros ↔ about

---

### 10. CONTACTO / CONTACT
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/contacto/` | `/en/contact/` | `/es/contacto/` |
| `/en/contact/` | `/en/contact/` | `/es/contacto/` |

**Resultado esperado:** ✅ Mapea contacto ↔ contact

---

### 11. RECURSOS / RESOURCES
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/recursos/` | `/en/resources/` | `/es/recursos/` |
| `/en/resources/` | `/en/resources/` | `/es/recursos/` |

**Resultado esperado:** ✅ Mapea recursos ↔ resources

---

### 12. TALENTO / CAREERS
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/talento/` | `/en/careers/` | `/es/talento/` |
| `/en/careers/` | `/en/careers/` | `/es/talento/` |

**Resultado esperado:** ✅ Mapea talento ↔ careers

---

### 13. CON ANCHORS / HASH
| Ruta actual | Al cambiar a EN | Al cambiar a ES |
|-------------|-----------------|-----------------|
| `/es/servicios#tecnologias` | `/en/services#tecnologias` | `/es/servicios#tecnologias` |
| `/es/servicios/artificial-intelligence#beneficios` | `/en/services/artificial-intelligence#beneficios` | `/es/servicios/artificial-intelligence#beneficios` |
| `/es/casos#resultados` | `/en/case-studies#resultados` | `/es/casos#resultados` |

**Resultado esperado:** ✅ Preserva el anchor/hash en la nueva URL

---

## 🔧 LÓGICA IMPLEMENTADA

### Archivo: `/src/app/components/public/Header.tsx`

**Función `toggleLanguage`:**

1. **Extrae información actual:**
   - Idioma nuevo (opuesto al actual)
   - Path actual
   - Hash actual (si existe)

2. **Procesa los segmentos del path:**
   - Divide el path en segmentos
   - Remueve el idioma actual
   - Si estamos en Home, redirige al Home del nuevo idioma

3. **Mapea la sección principal:**
   - Usa el objeto `routeMapping` para convertir secciones
   - Ejemplos: `servicios` → `services`, `casos` → `case-studies`

4. **Preserva todo lo demás:**
   - Mantiene slugs de detalle (artificial-intelligence, cueros-velez, etc.)
   - Mantiene hash/anchors (#tecnologias, #beneficios, etc.)
   - Mantiene parámetros adicionales si existieran

5. **Navega y hace scroll:**
   - Usa `navigate()` de React Router
   - Hace scroll suave al top después de 100ms

---

## 📋 MAPEO DE RUTAS

```typescript
const routeMapping: Record<string, string> = {
  // ES → EN
  'servicios': 'services',
  'industrias': 'industries',
  'casos': 'case-studies',
  'nosotros': 'about',
  'contacto': 'contact',
  'recursos': 'resources',
  'talento': 'careers',
  
  // EN → ES
  'services': 'servicios',
  'industries': 'industrias',
  'case-studies': 'casos',
  'about': 'nosotros',
  'contact': 'contacto',
  'resources': 'recursos',
  'careers': 'talento',
  
  // Sin cambio
  'insights': 'insights',
};
```

---

## ✅ VALIDACIÓN MANUAL

Para validar correctamente, probar cada uno de estos escenarios:

1. **Desde Home:**
   - Ir a `/es/` → Cambiar a EN → Debe ir a `/en/`

2. **Desde página de servicios:**
   - Ir a `/es/servicios/` → Cambiar a EN → Debe ir a `/en/services/`

3. **Desde detalle de servicio:**
   - Ir a `/es/servicios/artificial-intelligence` → Cambiar a EN → Debe ir a `/en/services/artificial-intelligence`

4. **Desde página de casos:**
   - Ir a `/es/casos/` → Cambiar a EN → Debe ir a `/en/case-studies/`

5. **Desde detalle de caso:**
   - Ir a `/es/casos/cueros-velez` → Cambiar a EN → Debe ir a `/en/case-studies/cueros-velez`

6. **Desde insights:**
   - Ir a `/es/insights/` → Cambiar a EN → Debe ir a `/en/insights/`

7. **Con anchor:**
   - Ir a `/es/servicios#section` → Cambiar a EN → Debe ir a `/en/services#section`

8. **Ida y vuelta:**
   - Cambiar de ES a EN y luego de EN a ES debe regresar a la página equivalente original

---

## 🎯 RESULTADO FINAL

✅ El cambio de idioma es **profesional y consistente**

✅ **Preserva el contexto del usuario** en toda la navegación

✅ **No redirige al Home** excepto cuando es necesario

✅ **Mantiene slugs, anchors y parámetros**

✅ **Experiencia fluida** con scroll suave

---

## 📝 NOTAS IMPORTANTES

- **Todo contenido nuevo** debe existir en ES y EN
- **No crear páginas** solo en un idioma
- **Los slugs de detalle** se mantienen iguales en ambos idiomas (artificial-intelligence, cueros-velez, etc.)
- **Los anchors/hash** se preservan tal cual (pueden ser traducidos en el futuro si se requiere)
