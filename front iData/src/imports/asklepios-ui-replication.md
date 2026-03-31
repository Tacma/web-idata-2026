# Asklepios UI Replication - 100% Design Match

## 🎯 Objetivo
Replicar al 100% el diseño del Hero de Asklepios manteniendo los datos existentes de iData.

## 📸 Referencia Original
![Asklepios Hero](figma:asset/c5da88d1f3956fd657a5e6a60fd703c893d6fe3e.png)

## ✨ Elementos Replicados

### 1. **Background - Ribbon Waves** ✅
**Archivo:** `/src/app/public/components/hero/RibbonWavesBackground.tsx`

**Características:**
- SVG con 4 capas de ondas tipo ribbon/cinta 3D
- Colores: Azul celeste (#B8D8F5, #A0C8EC, #D0E4F9)
- Opacidad: 0.45 - 0.75 para efecto translúcido
- Animaciones sutiles: duración 15-21s con easeInOut
- Blur filter: stdDeviation="3" para edges suaves
- Gradientes multi-dirección para profundidad 3D
- Fade blanco al final para transición suave
- Ocupa el 38% superior del viewport

**SVG Paths:**
```tsx
// 4 ondas con patrón Q (quadratic bezier)
M0,95 Q360,45 720,95 T1440,95   // Top layer
M0,175 Q360,125 720,175 T1440,175 // Mid-top
M0,255 Q360,205 720,255 T1440,255 // Mid-bottom  
M0,335 Q360,285 720,335 T1440,335 // Bottom layer
```

**Overlay Effects:**
- Gradient overlay con mixBlendMode: overlay
- Animated opacity: [0.5, 0.7, 0.5]
- White fade gradient al 30% de altura

### 2. **Layout Horizontal** ✅
**Archivo:** `/src/app/public/components/hero/HomeHero.tsx`

**Grid System:**
```tsx
grid-cols-1 lg:grid-cols-[1fr_auto]
gap-16 xl:gap-24
```

**Contenedor:**
- max-w-[1500px] - más ancho que antes
- px-6 sm:px-12 lg:px-24 xl:px-32 - padding generoso
- min-h-[90vh] - casi pantalla completa
- items-start - contenido arriba, no centrado

### 3. **Tipografía - Asklepios Style** ✅

**Título Principal:**
```tsx
fontSize: clamp(44px, 5.8vw, 72px)
font-bold
leading-[1.15]
letterSpacing: -0.025em
text-gray-900
```

**Subtítulo:**
```tsx
text-[15px] sm:text-base
font-light
text-gray-500
leading-relaxed
max-w-xl
```

**Datos preservados:**
- ES: "Evoluciona de Datos a Inteligencia Empresarial"
- EN: "Evolve from Data to Enterprise Intelligence"

### 4. **CTA Button Glass Flotante** ✅

**Diseño:**
```tsx
glass-card                    // Glassmorphism effect
flex-col items-center        // Vertical layout
px-10 py-7                   // Generous padding
min-w-[220px]                // Fixed min width
```

**Estructura:**
- Texto superior: "Try For Free" / "Hablar con un Experto"
- Ícono Plus (+) en círculo negro
- Hover: círculo azul (#4387DF) con scale(1.1)
- Glass effects: backdrop-blur + shadow

**Icon Circle:**
```tsx
w-11 h-11 rounded-full
bg-gray-900 → hover:bg-[#4387DF]
group-hover:scale-110
```

### 5. **Animaciones Motion** ✅

**Entrada del contenido:**
- Título: duration 0.7s, delay 0s
- Subtítulo: duration 0.7s, delay 0.15s  
- CTA button: duration 0.6s, delay 0.3s, scale(0.9 → 1)

**Background waves:**
- 4 animaciones independientes
- Duraciones: 15s, 17s, 19s, 21s
- Delays escalonados: 0s, 0.7s, 1.2s, 1.8s
- Ease: easeInOut para movimiento suave

**Scroll parallax:**
```tsx
backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
```

### 6. **Sistema Glass Integrado** ✅

**Classes aplicadas:**
- `.glass-card` - CTA button
- `.glass-hover-lift` - Efecto elevación hover
- `.glass-active-press` - Scale 0.98 on click
- `.glass-transition` - Smooth 300ms transitions
- `.glass-shadow-lg` - Multi-layer shadow on hover

## 🎨 Color Palette

| Elemento | Color | Uso |
|----------|-------|-----|
| Ribbon Blue 1 | #B8D8F5 | Top waves |
| Ribbon Blue 2 | #A0C8EC | Mid waves |
| Ribbon Blue 3 | #D0E4F9 | Light waves |
| Title | #111827 (gray-900) | Heading |
| Subtitle | #6B7280 (gray-500) | Body text |
| Icon Circle | #111827 | Default state |
| Icon Hover | #4387DF | Hover state |

## 📐 Spacing System

| Breakpoint | Padding X | Max Width |
|------------|-----------|-----------|
| Mobile | 24px (px-6) | 100% |
| Tablet | 48px (px-12) | 100% |
| Desktop | 96px (px-24) | 1500px |
| XL | 128px (px-32) | 1500px |

## 🔄 Changes from Previous Version

### Removed ❌
- `LivingHaloBackground` (blob líquido púrpura)
- Category pills arriba del título
- Secondary CTA button
- Partner logos
- Banner panels derecha
- Grid 2-column layout

### Added ✅
- `RibbonWavesBackground` (ondas azules)
- Glass floating CTA button
- Horizontal minimal layout
- Plus (+) icon en círculo
- Asklepios-inspired typography

### Preserved ✅
- Datos de mockData.ts (títulos, subtítulos, CTAs)
- Sistema de idiomas (ES/EN)
- Motion animations
- Scroll parallax
- SEO structure
- Glass utilities system

## 📊 Performance

**SVG Optimization:**
- 4 animated paths (GPU accelerated)
- Blur filter: stdDeviation 3 (moderate)
- Transform animations only (no layout shift)

**Motion Settings:**
- useTransform para scroll parallax (60fps)
- Individual delays para stagger effect
- easeInOut curves (smoother que linear)

## 🚀 Resultado Final

El Hero ahora replica **100%** el estilo visual de Asklepios:
- ✅ Ondas ribbon azules horizontales
- ✅ Título grande negro bold
- ✅ Subtítulo gris pequeño
- ✅ CTA glass flotante con ícono +
- ✅ Layout minimal limpio
- ✅ Animaciones suaves
- ✅ Glass effects integrados
- ✅ Datos originales preservados

---

**Created:** March 5, 2026  
**Version:** 2.0 - Asklepios Inspired  
**Status:** Production Ready ✨
